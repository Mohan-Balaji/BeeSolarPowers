# Complete Vercel Deployment Guide for BEE SOLAR POWERS

This guide will help you deploy your entire BEE SOLAR POWERS application (frontend and backend) to Vercel.

## Step 1: Prepare Your Project

Ensure you have the following files correctly set up:

1. `vercel.json` (already created)
2. `client/package.json` with a `vercel-build` script (already created)
3. CORS headers in server/index.ts (already added)

## Step 2: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

## Step 3: Import Your Project

1. Click "Add New" → "Project"
2. Select your BEE SOLAR POWERS repository
3. Vercel will detect your vercel.json configuration

## Step 4: Configure Environment Variables

Add these required environment variables:

1. `DATABASE_URL`: Your full Neon database connection string
   ```
   postgresql://username:password@hostname:port/database_name
   ```

2. `SESSION_SECRET`: A secure random string
   - Generate one by running: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Copy the output and paste it as the value

## Step 5: Deploy

1. Click "Deploy"
2. Wait for the build and deployment process to complete
3. Vercel will provide a URL for your deployed application

## Step 6: Verify Your Deployment

1. Visit the provided Vercel URL
2. Check that:
   - The frontend loads correctly
   - You can navigate to different pages
   - API endpoints are working (try logging in)

## Step 7: Connect Your Custom Domain

1. From your project dashboard in Vercel, go to "Settings" → "Domains"
2. Click "Add" and enter your domain (e.g., beesolarpowers.com)
3. Follow Vercel's instructions to configure your DNS settings at GoDaddy:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or follow the instructions for an A record if you're using the apex domain

## Step 8: SSL Configuration

1. Vercel provides free SSL certificates automatically
2. No additional configuration is needed

## Troubleshooting

If your website shows raw code instead of the actual website:

1. Check your vercel.json file is correctly configured
2. Make sure your client build is successful
3. In the Vercel dashboard, go to "Deployments" → click on your latest deployment → "Functions"
4. Check for errors in the build logs

## Checking for Errors

1. In Vercel dashboard, go to "Deployments"
2. Click on your latest deployment
3. Select "Functions" or "Builds" tab to see detailed logs
4. Look for any errors in red text

## Updating Your Deployment

Any changes pushed to your connected GitHub repository will trigger automatic deployments.

## Need More Help?

If you encounter any issues, please provide:
1. Screenshots of any error messages
2. Build logs from the Vercel dashboard
3. Specific URLs that are not working as expected

With this information, I can help you diagnose and fix the deployment issues.