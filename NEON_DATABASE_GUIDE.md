# Setting Up Neon Database for BEE SOLAR POWERS

This guide will help you set up a free Neon PostgreSQL database for your BEE SOLAR POWERS application deployment.

## What is Neon?

Neon is a serverless PostgreSQL service with a generous free tier that includes:
- 3 GB of database storage
- Unlimited API requests
- Unlimited branches
- Autoscaling compute resources
- No credit card required

## Step 1: Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" and create an account (you can use GitHub, Google, or email)
3. Verify your email if needed

## Step 2: Create a New Project

1. After logging in, click "New Project"
2. Enter "BEE-SOLAR-POWERS" as the project name
3. Select a region closest to your target audience (e.g., Mumbai for Indian customers)
4. Click "Create Project"

## Step 3: Get Your Connection String

1. Once your project is created, you'll see a connection string that looks like:
   ```
   postgres://[user]:[password]@[hostname]/[database]
   ```
2. Save this connection string - you'll need it for deployment

## Step 4: Create Database Schema

You have two options to create your database schema:

### Option 1: Use Drizzle Push (Recommended)

1. In your backend project, set the `DATABASE_URL` environment variable to your Neon connection string
2. Run the database migration command:
   ```
   npm run db:push
   ```
3. Seed your database with initial data:
   ```
   npm run db:seed
   ```

### Option 2: Manual SQL Import

If you need to manually import SQL:

1. From your Neon dashboard, click on your project
2. Go to the "SQL Editor" tab
3. Paste your schema SQL and click "Run"

## Step 5: Configure Environment Variables

When deploying your application, you'll need to set these environment variables:

1. For your backend (Render, Railway, etc.):
   ```
   DATABASE_URL=postgres://[user]:[password]@[hostname]/[database]
   ```

2. Additional configuration for Neon with Node.js:
   ```
   PGHOST=[hostname without port]
   PGUSER=[user]
   PGPASSWORD=[password]
   PGDATABASE=[database]
   ```

## Step 6: Optimize for Production

For best performance with Neon:

1. Use connection pooling:
   ```typescript
   import { Pool } from 'pg';
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     max: 20, // maximum number of clients
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000,
   });
   ```

2. Set up a proper closing mechanism:
   ```typescript
   process.on('SIGINT', async () => {
     await pool.end();
     process.exit(0);
   });
   ```

## Step 7: Monitor Your Database

1. From your Neon dashboard, you can:
   - Monitor active connections
   - View query history and performance
   - Set up branching for development environments
   - Create backups

## Troubleshooting Common Issues

### Connection Timeouts
- Check if your IP is whitelisted (Neon allows connections from anywhere by default)
- Verify your connection string is correct

### "Too Many Connections" Errors
- Implement proper connection pooling
- Close unused connections

### Slow Query Performance
- Use the Neon dashboard to identify slow queries
- Add appropriate indexes to your tables

## Need Help?

If you encounter any issues with your Neon database:

1. Check the [Neon documentation](https://neon.tech/docs)
2. Visit the [Neon community forum](https://community.neon.tech/)
3. Reach out to Neon support through their website