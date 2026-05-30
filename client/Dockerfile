# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for layer caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Create non-root user for Nginx
RUN addgroup -g 101 -S nginxgroup && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginxgroup -g nginxgroup nginxuser

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Use non-root user
USER nginxuser

CMD ["nginx", "-g", "daemon off;"]
