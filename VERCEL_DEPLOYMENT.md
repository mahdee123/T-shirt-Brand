# Vercel Deployment Guide

## Frontend (Vercel) ✅ Done
Your frontend is already on Vercel!

## Backend Deployment (Choose One)

### Option 1: Deploy to Render (Recommended - FREE)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** tshirt-brand-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Region:** Choose closest to you

6. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     ```
     MONGODB_URI=mongodb+srv://mahdeereshid_db_user:mahrita123%40@mhadee.yiywnor.mongodb.net/tshirt_brand
     JWT_SECRET=your_super_secret_key_change_in_production_2024
     NODE_ENV=production
     ```

7. Deploy! You'll get a URL like: `https://tshirt-brand-backend.onrender.com`

### Option 2: Deploy to Heroku
1. Go to https://www.heroku.com
2. Create a new app
3. Connect GitHub repository
4. Add environment variables in Settings
5. Deploy!

## Update Vercel with Backend URL

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-backend-url.onrender.com/api` (replace with your actual backend URL)
4. Redeploy on Vercel

## Test the Connection
After deployment, visit your frontend and try to load a product. If it works, you're all set!

## Troubleshooting
- Check browser console for errors (F12 → Console)
- Make sure backend URL is correct in Vercel env vars
- Ensure backend is running on the deployment platform
