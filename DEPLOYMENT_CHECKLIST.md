# ✅ Deployment Checklist

## Backend Deployment (Render)

- [ ] Go to https://render.com
- [ ] Sign up with GitHub account
- [ ] Create new Web Service
- [ ] Connect to: `mahdee123/T-shirt-Brand` repository
- [ ] Set Name: `tshirt-brand-api`
- [ ] Set Root Directory: `backend` (optional, Render will figure it out)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Add Environment Variables (click Advanced):
  - [ ] MONGODB_URI = `mongodb+srv://mahdeereshid_db_user:mahrita123%40@mhadee.yiywnor.mongodb.net/tshirt_brand`
  - [ ] JWT_SECRET = `your_super_secret_key_change_in_production_2024`
  - [ ] NODE_ENV = `production`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Copy your Backend URL (looks like: `https://tshirt-brand-api-xxxx.onrender.com`)

## Frontend Update (Vercel)

- [ ] Go to https://vercel.com/dashboard
- [ ] Select your T-Shirt Brand project
- [ ] Click Settings → Environment Variables
- [ ] Add/Update `NEXT_PUBLIC_API_URL`:
  - [ ] Value: `https://YOUR-BACKEND-URL/api` (replace with Render URL)
- [ ] Save
- [ ] Go to Deployments
- [ ] Click menu on latest deployment → Redeploy
- [ ] Wait for deployment (2-3 minutes)
- [ ] ✅ DONE!

## Verification

- [ ] Visit your Vercel frontend URL
- [ ] Homepage loads
- [ ] Products display
- [ ] Can add items to cart
- [ ] Cart counter updates
- [ ] Can click on a product
- [ ] Can proceed to checkout
- [ ] ✅ Everything works!

## Troubleshooting

If you see 404 errors:
1. Check backend URL in Vercel env vars
2. Make sure URL is correct: `https://...onrender.com/api`
3. Ensure backend is running on Render
4. Redeploy frontend on Vercel

If backend won't deploy on Render:
1. Check logs in Render dashboard
2. Verify environment variables are set
3. Make sure build command is: `npm install`
4. Make sure start command is: `node server.js`
