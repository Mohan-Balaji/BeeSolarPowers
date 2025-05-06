# Special Steps for Vercel Deployment

If you're having trouble with your Vercel deployment showing raw code instead of the actual website, follow these steps:

## Quick Fix Steps

1. **Download your project** from GitHub or Replit

2. **Prepare your project** for Vercel deployment:
   - Make sure all files are committed to your GitHub repository
   - Add the `vercel.json` file we created to your repository

3. **Edit package.json** by adding this new script:
   ```json
   "vercel-build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
   ```

4. **In Vercel Project Settings:**
   - Set Build Command to: `npm run vercel-build`
   - Set Output Directory to: `dist`
   - Add all required environment variables:
     - `DATABASE_URL`
     - `SESSION_SECRET`

5. **After deployment:**
   - If you still see code, go to your deployment settings
   - Click "Redeploy" with the "Clear cache and redeploy" option checked

## Why This Works

The issue is likely that Vercel is serving the raw server-side code instead of running it properly. These steps ensure:

1. The build process creates both client and server builds properly
2. The routing configuration tells Vercel how to handle different types of requests
3. The environment variables ensure your application can connect to databases and services

## Need More Help?

If these steps don't resolve the issue, contact Vercel support with the following information:
- Your repository URL
- The error messages from your Vercel deployment logs
- The current configuration of your Vercel project