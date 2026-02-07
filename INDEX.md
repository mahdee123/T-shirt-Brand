# 🚀 T-Shirt Brand eCommerce - START HERE

Welcome! This is your complete, production-ready T-shirt eCommerce platform.

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
# From the root tshirt_brand directory
npm run setup

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Start MongoDB
```bash
mongod
```

### Step 3: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

### Step 4: Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Output: ready - started server on 0.0.0.0:3000
```

### Step 5: Create Admin Account
In another terminal:
```bash
cd backend
node scripts/create-admin.js
```

Follow the prompts, or create manually via:
```bash
POST http://localhost:5000/api/auth/register
Body: { "email": "admin@example.com", "password": "password123" }
```

### Step 6: Access the Platform
- **User Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
  - Email: admin@example.com
  - Password: password123

---

## 📚 Documentation

Read these files in order:

1. **[SETUP.md](SETUP.md)** ← Detailed setup instructions
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** ← System overview (ASCII diagrams)
3. **[DOCUMENTATION.md](DOCUMENTATION.md)** ← Full technical documentation
4. **[API_TESTING.md](API_TESTING.md)** ← API endpoints with examples
5. **[DEPLOYMENT.md](DEPLOYMENT.md)** ← How to deploy to production
6. **[BUILD_SUMMARY.md](BUILD_SUMMARY.md)** ← What was built summary

---

## 🎯 What You Get

### User Panel (Frontend)
- ✅ Home with category filter & search
- ✅ Product details with image gallery
- ✅ Shopping cart (localStorage)
- ✅ Guest checkout (no login)
- ✅ Order confirmation
- ✅ Mobile-responsive design
- ✅ Black & white minimalist theme

### Admin Dashboard (Frontend)
- ✅ Separate /admin URL
- ✅ Admin login authentication
- ✅ Dashboard with statistics
- ✅ Category management (CRUD)
- ✅ Product management (CRUD)
- ✅ Order management & status tracking

### Backend API (Express + MongoDB)
- ✅ RESTful endpoints
- ✅ JWT authentication
- ✅ Complete database schema
- ✅ CORS enabled
- ✅ Production ready

---

## 📁 Project Structure

```
tshirt_brand/
├── backend/              # Node.js + Express API
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication
│   ├── scripts/          # Helper scripts
│   ├── .env              # EDIT: Database URI, JWT secret
│   └── server.js
│
├── frontend/             # Next.js + React + Tailwind
│   ├── pages/            # 11 pages (6 user, 5 admin)
│   ├── components/       # Reusable components
│   ├── lib/              # API client, cart context
│   ├── styles/           # CSS & Tailwind config
│   └── .env.local        # EDIT: API URL
│
└── README.md            # This file!
```

---

## 🏃 Your First Test

1. **Add a Category**
   - Go to http://localhost:3000/admin/login
   - Login with your admin credentials
   - Go to Categories
   - Add a category: "T-Shirts"

2. **Add a Product**
   - Go to Products
   - Click "Add Product"
   - Fill in:
     - Name: "Classic Black T-Shirt"
     - Category: "T-Shirts"
     - Price: 25.99
     - Sizes: Select S, M, L, XL
     - Stock: 100
     - Image URL: Any image URL from the web
   - Click "Add Product"

3. **Buy as Customer**
   - Go to http://localhost:3000
   - You should see your product
   - Click on it
   - Select size and quantity
   - Add to cart
   - Go to checkout
   - Fill in name, phone, address
   - Place order (COD)
   - See order confirmation

4. **Check Order in Admin**
   - Go to http://localhost:3000/admin
   - Go to Orders
   - Click on your order
   - Update status to "Delivered"

---

## 🔑 Key Features

### For Customers
- Search products by name
- Filter by category
- Sort by price
- View product details with images
- Add to cart
- Modify cart
- Checkout (no login needed!)
- Cash on Delivery payment
- Order confirmation with ID

### For Admin
- Manage categories
- Manage products (with images)
- Track orders
- Update order status
- View order statistics

---

## 🛠️ Technology Stack

**Backend**: Node.js, Express, MongoDB, JWT  
**Frontend**: Next.js, React, Tailwind CSS, Axios  
**Design**: Black & White, Mobile-First, No animations

---

## 📋 Common Tasks

### Change the Brand Name
Edit [frontend/components/Layout.js](frontend/components/Layout.js):
```javascript
<span className="text-xl font-bold">T-Shirt Brand</span>
// Change "T-Shirt Brand" to your name
```

### Change the API URL
Edit [frontend/.env.local](frontend/.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Change the Database
Edit [backend/.env](backend/.env):
```
MONGODB_URI=mongodb://localhost:27017/tshirt_brand
```

### Change Admin Credentials
After logging in, create a new admin via API:
```bash
POST http://localhost:5000/api/auth/register
{ "email": "newemail@example.com", "password": "newpassword" }
```

---

## ⚠️ Important Before Production

1. **Change JWT Secret**: Edit `backend/.env`
   ```
   JWT_SECRET=change-this-to-a-random-string
   ```

2. **Use HTTPS**: Configure SSL/TLS on your domain

3. **Configure CORS**: Update backend for your domain

4. **Set NODE_ENV**: Set to `production` in backend

5. **Database Backups**: Set up MongoDB backups

See [DEPLOYMENT.md](DEPLOYMENT.md) for full checklist.

---

## 🆘 Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check PORT 5000 is available
- Verify `.env` file exists with MONGODB_URI

### Frontend won't load
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for errors

### Can't login
- Ensure admin was created via `create-admin.js`
- Verify email and password are correct
- Check JWT_SECRET in backend `.env`

### Products not showing
- Check category was created first
- Products need valid category ID
- Check images are valid URLs

See [SETUP.md](SETUP.md) for more troubleshooting.

---

## 📞 File Locations Quick Reference

| What | Where |
|------|-------|
| Backend routes | `backend/routes/` |
| Frontend pages | `frontend/pages/` |
| Database schemas | `backend/models/` |
| Environment vars | `backend/.env`, `frontend/.env.local` |
| Components | `frontend/components/` |
| Styles | `frontend/styles/globals.css` |
| API client | `frontend/lib/api.js` |

---

## 🎓 Learn More

- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Tailwind CSS**: https://tailwindcss.com

---

## 📊 API Overview

### Public Routes (No Auth)
- `GET /api/categories` - List categories
- `GET /api/products` - List products
- `GET /api/products/:id` - Product details
- `POST /api/orders` - Create order
- `POST /api/auth/register` - Create admin (first time only)

### Admin Routes (Auth Required)
- `POST /api/auth/login` - Admin login
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Edit category
- `DELETE /api/categories/:id` - Delete category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Edit product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - List orders
- `PUT /api/orders/:id` - Update order status

Full API docs in [API_TESTING.md](API_TESTING.md)

---

## 🚀 You're All Set!

Your complete T-shirt eCommerce platform is ready to use.

**Next Steps**:
1. ✅ Install dependencies (`npm run setup`)
2. ✅ Start MongoDB (`mongod`)
3. ✅ Start backend (`cd backend && npm run dev`)
4. ✅ Start frontend (`cd frontend && npm run dev`)
5. ✅ Create admin account (`node scripts/create-admin.js`)
6. ✅ Visit http://localhost:3000
7. ✅ Read [SETUP.md](SETUP.md) for details

---

**Happy Building! 🎉**

For questions, check the documentation files above or review the code - it's well-commented!

---

*Version 1.0.0 | Built with ❤️ for your T-shirt brand*
