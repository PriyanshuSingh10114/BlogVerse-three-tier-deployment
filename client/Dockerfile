# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve the application with non-root Nginx
FROM nginx:alpine

# Create non-root user and group
RUN addgroup -g 101 -S nginxgroup && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginxgroup -g nginxgroup nginxuser

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder --chown=nginxuser:nginxgroup /app/dist /usr/share/nginx/html

# Grant required permissions to non-root user
RUN touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxgroup /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginxuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
