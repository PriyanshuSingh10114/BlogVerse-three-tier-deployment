# Stage 1: Install dependencies and prune
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prune devDependencies to keep production layer small
RUN npm prune --production

# Stage 2: Minimal Production Image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy pruned dependencies and application files with node ownership
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/server.js ./
COPY --from=builder --chown=node:node /app/package.json ./

USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:5000/api/health || exit 1

CMD ["node", "server.js"]
