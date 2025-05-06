#!/bin/bash

# Install dependencies
npm install

# Build the client
npm run build

# Create the necessary directories
mkdir -p dist/public

# The client build output is already in dist/public from the Vite config

# Build the server
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"