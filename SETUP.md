# Quick Start Guide

## Installation & Setup

### 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install
```

Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/tshirt_brand
JWT_SECRET=super_secret_key_2024
PORT=5000
NODE_ENV=development
```

Start MongoDB (if running locally):
```bash
mongod
```

Then start the backend:
```bash
npm run dev
```

### 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

## URLs

- **Frontend (User Panel)**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Admin Login**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:5000/api

## Initial Setup Steps

1. Create first admin account:
   - Use Postman or curl to call:
   ```
   POST http://localhost:5000/api/auth/register
   Body: {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

2. Login to admin dashboard:
   - Go to http://localhost:3000/admin/login
   - Use the credentials from step 1

3. Add categories:
   - Go to http://localhost:3000/admin/categories
   - Create at least one category (e.g., "T-Shirts", "Hoodies")

4. Add products:
   - Go to http://localhost:3000/admin/products
   - Add products with images, prices, sizes, stock

5. Test user flow:
   - Go to http://localhost:3000
   - Browse products
   - Add to cart
   - Proceed to checkout
   - Place order (Cash on Delivery)

## File Structure Overview

```
backend/
  ├── models/
  │   ├── Admin.js
  │   ├── Category.js
  │   ├── Product.js
  │   └── Order.js
  ├── routes/
  │   ├── auth.js
  │   ├── categories.js
  │   ├── products.js
  │   └── orders.js
  ├── middleware/
  │   └── auth.js
  ├── server.js
  ├── package.json
  └── .env

frontend/
  ├── pages/
  │   ├── _app.js
  │   ├── _document.js
  │   ├── index.js (home)
  │   ├── search.js
  │   ├── cart.js
  │   ├── checkout.js
  │   ├── product/
  │   │   └── [id].js
  │   ├── order-success/
  │   │   └── [orderId].js
  │   └── admin/
  │       ├── login.js
  │       ├── index.js (dashboard)
  │       ├── categories.js
  │       ├── products.js
  │       └── orders.js
  ├── components/
  │   ├── Layout.js
  │   ├── CategoryFilter.js
  │   └── ProductCard.js
  ├── lib/
  │   ├── api.js
  │   └── cart-context.js
  ├── styles/
  │   └── globals.css
  └── package.json
```

## Features Implemented

✅ Mobile-first responsive design
✅ Black & white color scheme
✅ Home page with category filter
✅ Search functionality
✅ Product details with image gallery
✅ Shopping cart (localStorage)
✅ Guest checkout (no login required)
✅ Cash on Delivery payment
✅ Order confirmation page
✅ Admin login
✅ Category management
✅ Product management (CRUD)
✅ Order management with status tracking
✅ Dashboard with statistics

## Important Notes

- **JWT Secret**: Change in production!
- **MongoDB**: Ensure MongoDB is running before starting backend
- **Paths**: All paths are relative from their respective directories
- **Environment Variables**: Create `.env` files in both backend and frontend
- **CORS**: Backend allows requests from frontend URLs
- **Cart**: Stored in browser localStorage (survives page refresh, not synced across devices)

## Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongod`
- Verify PORT 5000 is available
- Check `.env` file exists with correct MONGODB_URI

### Frontend won't start
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Ensure backend is running on port 5000

### API calls failing
- Check backend is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local` matches backend URL
- Check browser console for CORS errors

### Admin login failing
- Ensure you created admin account via `/api/auth/register`
- Check password matches
- Verify JWT_SECRET in backend `.env`
