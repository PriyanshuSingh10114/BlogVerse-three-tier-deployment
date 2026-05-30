# Stage 1: Build & Prune
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Install ALL dependencies (including dev) for potential build steps
RUN npm ci

COPY . .

# Prune devDependencies to keep image small
RUN npm prune --production

# Stage 2: Production Image
FROM node:20-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

# Secure the container by running as the restricted "node" user
USER node

EXPOSE 5000

CMD ["node", "server.js"]
