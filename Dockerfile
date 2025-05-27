# Build stage for React client
FROM node:18-alpine AS client-builder

WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/

# Install root dependencies first
RUN npm install

# Install client dependencies
RUN npm install --workspace=client

# Copy client source
COPY client/ ./client/

# Build client
RUN npm run build:client

# Build stage for Node.js server
FROM node:18-alpine AS server-builder

WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/

# Install root dependencies
RUN npm install

# Install server dependencies  
RUN npm install --workspace=server --only=production

# Copy server source
COPY server/ ./server/

# Final stage
FROM node:18-alpine

WORKDIR /app

# Copy built client from client builder
COPY --from=client-builder /app/client/build ./client/build

# Copy server files and dependencies
COPY --from=server-builder /app/server ./server
COPY --from=server-builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server/index.js"]