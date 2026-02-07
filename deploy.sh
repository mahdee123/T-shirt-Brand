#!/bin/bash

# T-Shirt Brand - Automated Deployment Guide
# This script helps deploy both frontend and backend

echo "================================================"
echo "T-Shirt Brand E-Commerce - Deployment Setup"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "ERROR: Please run this from the project root directory"
    exit 1
fi

echo "✓ Project detected"
echo ""
echo "This guide will help you deploy:"
echo "  1. Backend to Render (FREE)"
echo "  2. Frontend to Vercel (already configured)"
echo ""

# Create deployment config
mkdir -p .deployment

# Backend deployment config
cat > .deployment/render-backend.md << 'EOF'
# Deploy Backend to Render

## Step 1: Create Account
1. Go to https://render.com
2. Click "Sign Up"
3. Use GitHub to sign up (recommended)

## Step 2: Create Web Service
1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub repository (mahdee123/T-shirt-Brand)

## Step 3: Configure Service
Fill in these details:
- **Name:** tshirt-brand-api
- **Runtime:** Node
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && node server.js`
- **Root Directory:** Leave empty (or `/`)

## Step 4: Add Environment Variables
Click "Advanced" and add these:

```
MONGODB_URI=mongodb+srv://mahdeereshid_db_user:mahrita123%40@mhadee.yiywnor.mongodb.net/tshirt_brand
JWT_SECRET=your_super_secret_key_change_in_production_2024
NODE_ENV=production
PORT=10000
```

## Step 5: Deploy
Click "Create Web Service"

⏳ Wait 3-5 minutes for deployment

## Step 6: Copy Your URL
Once deployed, Render will give you a URL like:
`https://tshirt-brand-api.onrender.com`

Copy this URL!
EOF

# Frontend deployment config
cat > .deployment/vercel-frontend.md << 'EOF'
# Update Frontend on Vercel

## Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your project (if not created, import from GitHub)

## Step 2: Update Environment Variable
1. Click "Settings"
2. Go to "Environment Variables"
3. Find or create: `NEXT_PUBLIC_API_URL`
4. Set value to: `https://YOUR-BACKEND-URL/api`
   (Replace YOUR-BACKEND-URL with the URL from Render)
5. Click "Save"

## Step 3: Redeploy
1. Go to "Deployments"
2. Click the three dots on latest deployment
3. Click "Redeploy"

⏳ Wait 2-3 minutes

✅ Done! Your app should now work!
EOF

echo "✓ Deployment guides created in .deployment/"
echo ""
echo "================================================"
echo "NEXT STEPS:"
echo "================================================"
echo ""
echo "1. BACKEND DEPLOYMENT (Render):"
echo "   → Read: .deployment/render-backend.md"
echo "   → URL needed: Your Render backend URL"
echo ""
echo "2. FRONTEND UPDATE (Vercel):"
echo "   → Read: .deployment/vercel-frontend.md"
echo "   → Use backend URL from step 1"
echo ""
echo "3. VERIFY:"
echo "   → Visit your Vercel frontend"
echo "   → Check if products load"
echo "   → Try adding to cart"
echo ""
echo "Need help? Check the guides above!"
echo ""
