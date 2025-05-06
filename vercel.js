// vercel.js - Vercel serverless function for the homepage
export default function handler(req, res) {
  // Redirect to the static build output
  return res.redirect('/dist/public/index.html');
}