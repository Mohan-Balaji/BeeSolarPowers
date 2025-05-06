// custom-build.js - Script to properly prepare files for Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting custom build process for Vercel deployment...');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
  console.log('Created dist directory');
}

if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public');
  console.log('Created dist/public directory');
}

// Build the client
console.log('Building client...');
try {
  execSync('cd client && npm install && npx vite build', { stdio: 'inherit' });
  console.log('Client build successful');
} catch (error) {
  console.error('Client build failed:', error);
  process.exit(1);
}

// Copy client build to dist/public
console.log('Copying client build to dist/public...');
try {
  execSync('cp -r client/dist/* dist/public/', { stdio: 'inherit' });
  console.log('Client files copied successfully');
} catch (error) {
  console.error('Failed to copy client files:', error);
  process.exit(1);
}

// Build the server
console.log('Building server...');
try {
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  console.log('Server build successful');
} catch (error) {
  console.error('Server build failed:', error);
  process.exit(1);
}

console.log('Custom build process completed successfully!');