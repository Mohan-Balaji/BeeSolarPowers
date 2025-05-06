# Deploying BEE SOLAR POWERS Backend to Render

This guide will walk you through deploying your BEE SOLAR POWERS backend to Render's free tier.

## What is Render?

Render is a cloud provider that offers free hosting for web services, including Node.js applications. The free tier includes:
- 750 hours of runtime per month (enough for a single service)
- Automatic HTTPS and SSL certificate management
- Custom domains
- Continuous deployment from Git

## Step 1: Prepare Your Backend Code

1. Make sure your backend code is in a separate `/backend` directory
2. Ensure you have a proper `package.json` with these scripts:
   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/server/index.js"
   }
   ```
3. Make sure your server listens on the port provided by Render:
   ```typescript
   const port = process.env.PORT || 3000;
   ```

## Step 2: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email if needed

## Step 3: Create a New Web Service

1. From your Render dashboard, click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: bee-solar-backend
   - **Environment**: Node
   - **Region**: Choose the region closest to your users (e.g., Singapore for Indian audience)
   - **Branch**: main (or your deployment branch)
   - **Root Directory**: ./backend (if using a monorepo)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

## Step 4: Configure Environment Variables

1. Scroll down to "Environment Variables"
2. Add the following:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `NODE_ENV`: production
   - `SESSION_SECRET`: A secure random string
   - `PORT`: 3000
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL (e.g., https://bee-solar-powers.vercel.app)

## Step 5: Deploy Your Service

1. Click "Create Web Service"
2. Wait for the build and deployment to complete (may take a few minutes)
3. Render will provide you with a URL like `https://bee-solar-backend.onrender.com`

## Step 6: Configure Your Frontend

1. In your frontend code, update your API base URL to point to your Render backend:
   ```typescript
   // In frontend/src/lib/apiClient.ts
   export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bee-solar-backend.onrender.com';
   ```

2. Add this environment variable to your Vercel project:
   - `VITE_API_URL`: https://bee-solar-backend.onrender.com

## Step 7: Handle CORS on Your Backend

Make sure your backend handles CORS correctly:

```typescript
// In server/index.ts
app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.CORS_ALLOWED_ORIGINS || 'https://bee-solar-powers.vercel.app',
    'http://localhost:5173' // For local development
  ];
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});
```

## Step 8: Troubleshooting Common Issues

### Service Fails to Start
1. Check Render logs
2. Make sure your start command and build command are correct
3. Verify all environment variables are set correctly

### Database Connection Issues
1. Double-check your `DATABASE_URL` environment variable
2. Make sure your database provider (Neon) allows connections from Render's IPs
3. Check database credentials and access rights

### CORS Errors
1. Verify your CORS setup in the backend
2. Make sure the frontend URL is correctly added to allowed origins
3. Check browser console for specific CORS error messages

## Step 9: Optimizing Your Render Deployment

### Prevent Free Tier Sleep
Render free tier services sleep after 15 minutes of inactivity.

To minimize this:
1. Set up a simple ping service to keep your backend alive:
   ```typescript
   // Create a simple endpoint for health checks
   app.get('/health', (req, res) => {
     res.status(200).send('OK');
   });
   ```

2. Use a service like UptimeRobot to ping your /health endpoint every 10 minutes

### Database Connection Management
For serverless environments, optimize your database connections:

```typescript
// In db/index.ts
import { Pool } from 'pg';

let pool: Pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

// Add a cleanup handler for proper shutdown
process.on('SIGTERM', async () => {
  console.log('Closing DB pool...');
  if (pool) {
    await pool.end();
  }
  process.exit(0);
});
```

## Step 10: Setting Up a Custom Domain (Optional)

1. From your Render dashboard, go to your web service
2. Click "Settings" → "Custom Domain"
3. Click "Add Custom Domain"
4. Enter your domain (e.g., api.beesolarpowers.com)
5. Follow Render's instructions to update your DNS settings

## Need Further Help?

If you encounter any issues during deployment:

1. Check the Render logs for your service
2. Visit [Render's documentation](https://render.com/docs)
3. Check your browser's developer console for frontend-related errors