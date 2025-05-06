# Split Deployment Guide for BEE SOLAR POWERS

As you mentioned, Vercel primarily supports frontend applications, while full-stack applications require a separate backend deployment. This guide will help you split and deploy your application properly.

## Step 1: Separate Your Project

### Frontend (for Vercel)
1. Create a new folder structure:
```
frontend/
├── public/        (copy from client/public/)
├── src/           (copy from client/src/)
├── package.json   (modified version of your current package.json)
├── vite.config.ts (modified version)
└── tsconfig.json  (modified version)
```

2. Create a simplified package.json for the frontend:
```json
{
  "name": "bee-solar-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@tanstack/react-query": "^5.8.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-day-picker": "^8.9.1",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^1.3.0",
    "react-hook-form": "^7.48.2",
    "react-icons": "^4.11.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^2.12.1",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

3. Modify vite.config.ts:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
```

### Backend (for Render, Railway, etc.)
1. Create a new folder structure:
```
backend/
├── server/       (copy your server/ folder)
├── db/           (copy your db/ folder)
├── shared/       (copy your shared/ folder)
├── package.json  (modified version)
└── tsconfig.json (modified version)
```

2. Create a simplified package.json for the backend:
```json
{
  "name": "bee-solar-backend",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server/index.js",
    "dev": "tsx server/index.ts",
    "db:push": "drizzle-kit push:pg",
    "db:seed": "tsx db/seed.ts"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.6.0",
    "connect-pg-simple": "^9.0.1",
    "drizzle-orm": "^0.28.6",
    "drizzle-zod": "^0.5.1",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "zod": "^3.22.4",
    "zod-validation-error": "^1.5.0"
  },
  "devDependencies": {
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/node": "^20.9.2",
    "@types/passport": "^1.0.15",
    "@types/passport-local": "^1.0.38",
    "drizzle-kit": "^0.19.13",
    "tsx": "^4.1.3",
    "typescript": "^5.2.2"
  }
}
```

3. Update CORS settings in server/index.ts:
```typescript
app.use((req, res, next) => {
  // Allow requests from your frontend domain
  const allowedOrigins = [
    'https://your-frontend-domain.vercel.app', 
    'http://localhost:5173'  // For local development
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

4. Add a Procfile for Render:
```
web: npm run start
```

## Step 2: Update API Client Configuration

1. In your frontend code, create an apiClient.ts file:

```typescript
// frontend/src/lib/apiClient.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com';

export async function apiRequest(method: string, path: string, body?: any) {
  const url = `${API_BASE_URL}${path}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies/sessions
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(url, options);
  
  // Handle non-OK responses
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  
  // If no content, return empty object
  if (response.status === 204) {
    return {};
  }
  
  // Otherwise parse JSON
  return await response.json();
}
```

2. Update your queryClient.ts configuration:

```typescript
import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "./apiClient";

export async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error(res.statusText || "Something went wrong");
  }
}

export async function apiRequest(
  method: string,
  path: string,
  body?: any
): Promise<Response> {
  const url = `${API_BASE_URL}${path}`;
  
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  await throwIfResNotOk(res);
  return res;
}

// Rest of your queryClient configuration...
```

## Step 3: Deploy the Frontend to Vercel

1. Push your frontend folder to GitHub

2. In Vercel:
   - Create a new project
   - Connect to your GitHub repository
   - Set the root directory to `/frontend`
   - Add the environment variable:
     - `VITE_API_URL`: Your backend URL (e.g., https://bee-solar-backend.onrender.com)
   - Deploy

## Step 4: Deploy the Backend to Render

1. Push your backend folder to GitHub

2. In Render:
   - Create a new Web Service
   - Connect to your GitHub repository
   - Set the root directory to `/backend`
   - Set the build command: `npm install && npm run build`
   - Set the start command: `npm run start`
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string 
     - `SESSION_SECRET`: A secure random string
     - `NODE_ENV`: "production"
     - `CORS_ALLOWED_ORIGINS`: Your frontend URL (e.g., https://bee-solar-frontend.vercel.app)
   - Deploy

## Step 5: Test the Deployment

1. Visit your Vercel deployed frontend URL
2. Try logging in or registering a user
3. Test all functionality that uses the backend API

## Troubleshooting Common Issues

### CORS Errors
If you see CORS errors in the browser console:
1. Double-check your CORS configuration in the backend
2. Ensure your frontend URL is properly added to the allowed origins
3. Make sure credentials are properly handled on both ends

### Cookie/Session Issues
For authentication to work across domains:
1. Update your session configuration in the backend:
```typescript
const sessionSettings = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: storage.sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
};
```

### Database Connection Issues
If your backend can't connect to the database:
1. Check if the `DATABASE_URL` environment variable is correctly set
2. Ensure your database provider (e.g., Neon) allows connections from your backend host
3. Check for firewall or network restrictions

## Alternative Backend Hosting Options

### Railway (Free tier available)
1. Create an account at railway.app
2. Import your GitHub repository
3. Set the root directory to `/backend`
4. Add the necessary environment variables
5. Deploy

### Fly.io (Free tier available)
1. Create an account at fly.io
2. Install the flyctl CLI
3. Initialize your project with `fly launch`
4. Deploy with `fly deploy`

## Need Help?

If you encounter any issues during deployment, check:
1. Logs in the Vercel or Render dashboard
2. Network requests in your browser's developer tools
3. Make sure all environment variables are correctly set

Feel free to reach out for further assistance!