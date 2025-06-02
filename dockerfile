# Use official Bun image
FROM oven/bun:1.1.0-slim AS base

# Install system dependencies for native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy application files
COPY . .

# Build application
RUN bun run build

# Production stage
FROM base AS production

# Expose port
EXPOSE 3000

# Run application
CMD ["bun", "run", ".output/server/index.mjs"]