# Deploying BEE SOLAR POWERS to Vercel with Neon Database

This guide will help you deploy your React + Express application to Vercel while connecting to your existing Neon PostgreSQL database.

## Prerequisites

1. A Vercel account (create one at [vercel.com](https://vercel.com) if you don't have one)
2. Your existing Neon database credentials
3. Your project code pushed to a GitHub repository

## Step 1: Prepare Your Project for Deployment

### 1.1. Create a `vercel.json` Configuration File

Create a `vercel.json` file in the root of your project with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

### 1.2. Update `package.json` Scripts

Make sure your root `package.json` has the following scripts:

```json
"scripts": {
  "dev": "tsx server/index.ts",
  "build": "npm run build:client",
  "build:client": "cd client && npm run build",
  "start": "node dist/server/index.js"
}
```

### 1.3. Update Client-Side Code

Ensure that all API requests in your frontend code are using relative paths (starting with `/api`), not absolute URLs.

## Step 2: Connect to Your Existing Neon Database

### 2.1. Get Your Neon Database Connection String

1. Log in to your Neon dashboard at [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Go to the "Connection Details" tab
4. Copy the connection string that looks like: `postgres://user:password@hostname/database`

### 2.2. Add the Environment Variables to Vercel

When deploying on Vercel, you'll need to add the following environment variables:

1. `DATABASE_URL`: Your Neon connection string
2. `SESSION_SECRET`: A random string for session encryption
3. Any other environment variables your application uses

## Step 3: Deploy to Vercel

### 3.1. Push Your Code to GitHub

Make sure all your code changes are committed and pushed to GitHub.

### 3.2. Import Your Project to Vercel

1. Log in to [Vercel](https://vercel.com)
2. Click "Add New..." and select "Project"
3. Choose your GitHub repository
4. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: Leave empty (handled by vercel.json)
   - Install Command: `npm install`
5. Add all the required environment variables (DATABASE_URL, SESSION_SECRET, etc.)
6. Click "Deploy"

## Step 4: Verify the Deployment

After deployment completes:

1. Visit your new Vercel URL to verify the frontend is working
2. Try to log in with existing credentials to verify database connectivity
3. Check the deployment logs if there are any issues

## Common Issues and Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your DATABASE_URL is correctly set in Vercel's environment variables
2. Make sure your Neon database allows connections from Vercel's IP ranges
3. Check if your Neon database has any connection limits

### CORS Issues

If you encounter CORS issues:

1. Make sure your backend API is set up to allow requests from your Vercel domain
2. Update your CORS configuration in `server/index.ts`:

```typescript
app.use(cors({
  origin: [
    'https://your-vercel-domain.vercel.app',
    'https://your-custom-domain.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : ''
  ].filter(Boolean),
  credentials: true
}));
```

### PostgreSQL Sessions

If you're using PostgreSQL for session storage, make sure your database connection for sessions is properly set up:

```typescript
// In server/auth.ts or where you set up sessions:
app.use(session({
  store: new PostgresqlStore({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  }),
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));
```

## Accessing Your Existing Neon Database

Your existing Neon database should be accessible from your Vercel deployment once you've added the correct DATABASE_URL environment variable. All data should remain intact. 

If you need to administer your database:

1. Use the Neon web console for database operations
2. For more complex operations, connect using a tool like pgAdmin or DBeaver using your connection details

## Customizing Your Deployment

### Custom Domain

To use a custom domain:

1. Go to your Vercel project settings
2. Click on "Domains"
3. Add your custom domain and follow the verification steps

### Environment Variables

You can update environment variables at any time:

1. Go to your Vercel project settings
2. Click on "Environment Variables"
3. Add, edit, or remove variables as needed
4. Deploy again to apply changes

## Next Steps

- Set up automatic deployments from GitHub
- Configure environment variables for different deployment environments (preview, production)
- Set up monitoring and error tracking for your production deployment

For more help, refer to the [Vercel documentation](https://vercel.com/docs) or [Neon documentation](https://neon.tech/docs/).