# Complete Vercel Deployment Guide for BEE SOLAR POWERS

## Problem Fix: Website Showing Code Instead of Rendering

If your website is displaying raw JavaScript code instead of the actual website, follow these steps to fix it.

## Step 1: Proper Project Configuration

1. Make sure your project has the following file structure on GitHub:
   ```
   ├── client/
   │   ├── public/
   │   │   ├── robots.txt
   │   │   └── sitemap.xml
   │   ├── src/
   │   │   └── (all React components)
   │   └── index.html
   ├── db/
   │   └── (database files)
   ├── server/
   │   └── (API and server files)
   ├── shared/
   │   └── (shared schema)
   ├── package.json
   └── vercel.json (create this file)
   ```

2. Create a `vercel.json` file in the root of your project with this content:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/dist/index.js"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/public/$1"
       }
     ]
   }
   ```

## Step 2: Set Up Vercel Account and Project

1. Create an account on [Vercel](https://vercel.com) if you don't already have one
2. Connect your GitHub account to Vercel
3. Import your repository as a new project
4. Configure the deployment as follows:
   - Framework Preset: Select "Other" 
   - Build Command: Use `npm run build`
   - Output Directory: Keep blank (the vercel.json file will handle this)
   - Install Command: `npm install`

## Step 3: Configure Environment Variables

In the Vercel dashboard, add these required environment variables:

1. `DATABASE_URL`: Your full Neon database connection string
   - Format: `postgresql://username:password@hostname:port/database_name`
   - Use the same connection string as your development database or create a new one

2. `SESSION_SECRET`: Generate a secure random string
   - In a terminal, run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Copy the output and paste it as the value

3. Add any other environment variables your application needs

## Step 4: Deploy Your Application

1. Click the "Deploy" button
2. Wait for the build and deployment to complete
3. Vercel will provide a URL where your site is deployed
4. Test that both the frontend and API routes are working correctly

## Step 5: Connect Your Custom Domain

1. In the Vercel dashboard, go to your project settings
2. Click on "Domains"
3. Add your custom domain (e.g., beesolarpowers.com)
4. Follow Vercel's instructions to update your DNS settings at GoDaddy:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Set TTL to automatic or the lowest available value

## Step 6: Fixing Display Issues

If you're still seeing code instead of your website:

1. In your Vercel project settings, go to the "Git" tab
2. Under "Build & Development Settings", verify:
   - Build Command: `npm run build`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

2. Try a forced rebuild:
   - In Vercel's dashboard, go to "Deployments"
   - Find your latest deployment
   - Click the three dots menu (⋮)
   - Select "Redeploy" and check "Clear cache and redeploy"

## Troubleshooting Common Issues

### Issue: API routes not working
- Check that your routes in vercel.json are correct
- Make sure your server is correctly handling the base path

### Issue: Static assets missing
- Verify that the client build correctly generates files in the `dist/public` directory
- Check that references to static assets use the correct paths

### Issue: Database connection failing
- Double-check your DATABASE_URL environment variable
- Ensure your Neon database allows connections from Vercel's IP range

### Issue: Authentication problems
- Verify that SESSION_SECRET is set correctly
- Check for any CORS issues between your frontend and API

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Database Connection Guide](https://neon.tech/docs/connect/connect-from-vercel)
- [Full Stack React Deployment Best Practices](https://vercel.com/guides/deploying-react-with-vercel)