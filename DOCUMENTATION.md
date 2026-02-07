# T-Shirt Brand eCommerce Platform - Complete Documentation

## Project Overview

A minimal, mobile-first eCommerce platform specifically designed for a T-shirt brand. The platform is built with a clean black & white design, no animations or extra decorations, and includes both a user-facing storefront and a separate admin dashboard.

## Architecture

### Backend (Node.js + Express)
- RESTful API on `http://localhost:5000`
- MongoDB database
- JWT-based admin authentication
- CORS-enabled for frontend communication

### Frontend (Next.js + React)
- User Panel: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin`
- Tailwind CSS for styling (black & white theme)
- Client-side cart management using Context API

## Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date
}
```

### Category Collection
```javascript
{
  _id: ObjectId,
  name: String (unique),
  createdAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: ObjectId (ref: Category),
  price: Number,
  sizes: [String] // ['S', 'M', 'L', 'XL']
  stock: Number,
  description: String (max 200 chars),
  images: [String] (max 3 URLs),
  createdAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique, format: ORD-timestamp-random),
  customerName: String,
  phoneNumber: String,
  deliveryAddress: String,
  totalAmount: Number,
  status: String ('pending' or 'delivered'),
  paymentMethod: String ('COD'),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      size: String,
      price: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## User Panel Features

### Home Page (`/`)
- Brand logo and header
- Search bar with real-time redirect to search results
- Cart icon with item count badge
- Horizontal scrollable category filter
- Product grid with:
  - Product image
  - Product name
  - Price
- Sorting options: Newest, Price Low-High, Price High-Low

### Search Page (`/search?q=query`)
- Shows products matching search query
- Same sorting and filtering capabilities as home page

### Product Details Page (`/product/[id]`)
- Full-size product image with gallery (max 3 images)
- Product name and price
- Short description (max 2 lines)
- Size selector (S, M, L, XL)
- Quantity selector with +/- buttons
- Add to Cart button
- Stock status display

### Shopping Cart Page (`/cart`)
- List of items with:
  - Product image (thumbnail)
  - Product name
  - Selected size
  - Price per item
  - Quantity with +/- controls
  - Remove button
- Order summary with:
  - Item count
  - Total price
  - Checkout button

### Checkout Page (`/checkout`)
- Guest checkout form (no login required)
- Fields:
  - Full Name
  - Phone Number
  - Full Delivery Address
- Payment method: Cash on Delivery (COD) displayed
- Place Order button
- Validation for required fields

### Order Success Page (`/order-success/[orderId]`)
- Order confirmation message
- Order ID displayed prominently
- Payment method (COD) confirmation
- Continue Shopping button to return to home

## Admin Dashboard Features

### Admin Login Page (`/admin/login`)
- Email and password input
- JWT token stored in localStorage
- Redirect to dashboard on successful login
- Error messages for invalid credentials

### Dashboard Page (`/admin`)
- Three stat cards:
  - Total Orders
  - Pending Orders
  - Delivered Orders
- Navigation cards to:
  - Categories management
  - Products management
  - Orders management

### Category Management (`/admin/categories`)
- Add New Category form
- Categories list table with:
  - Category name
  - Edit button (inline editing)
  - Delete button with confirmation
- Validation for duplicate category names

### Product Management (`/admin/products`)
- Add/Edit Product form with fields:
  - Product name
  - Category dropdown
  - Price (number)
  - Available sizes (checkboxes for S, M, L, XL)
  - Stock quantity
  - Description (max 200 chars)
  - Product images (max 3 URLs)
- Products list table with:
  - Name
  - Category
  - Price
  - Stock quantity
  - Edit button
  - Delete button with confirmation
- Image preview thumbnails with remove option

### Order Management (`/admin/orders`)
- Orders list table with:
  - Order ID
  - Customer name
  - Total amount
  - Status badge (pending in orange, delivered in green)
- Click row to view order details sidebar showing:
  - Order ID
  - Customer name
  - Phone number
  - Delivery address
  - Total amount
  - Items list with product name, size, quantity, price
  - Status dropdown to update order status

## API Endpoints

### Authentication Routes

**POST /api/auth/login**
- Request: `{ email, password }`
- Response: `{ token, admin: { id, email } }`
- Used by: Admin login page

**POST /api/auth/register**
- Request: `{ email, password }`
- Response: `{ message, admin: { id, email } }`
- Used for: Initial admin account creation (via script)

### Category Routes

**GET /api/categories**
- Response: Array of categories
- Public (no auth required)
- Used by: Home page filter, Admin categories page

**POST /api/categories**
- Requires: JWT token in Authorization header
- Request: `{ name }`
- Response: Created category object
- Used by: Admin categories page

**PUT /api/categories/:id**
- Requires: JWT token
- Request: `{ name }`
- Response: Updated category object
- Used by: Admin categories page

**DELETE /api/categories/:id**
- Requires: JWT token
- Response: `{ message }`
- Used by: Admin categories page

### Product Routes

**GET /api/products**
- Query params: `category`, `search`, `minPrice`, `maxPrice`, `sortBy`
- Response: Array of products (populated with category)
- Public (no auth required)
- Used by: Home page, search page, admin products list

**GET /api/products/:id**
- Response: Single product object (populated with category)
- Public (no auth required)
- Used by: Product details page

**POST /api/products**
- Requires: JWT token
- Request: `{ name, category, price, sizes, stock, description, images }`
- Response: Created product object
- Used by: Admin products page

**PUT /api/products/:id**
- Requires: JWT token
- Request: `{ name, category, price, sizes, stock, description, images }`
- Response: Updated product object
- Used by: Admin products page

**DELETE /api/products/:id**
- Requires: JWT token
- Response: `{ message }`
- Used by: Admin products page

### Order Routes

**POST /api/orders**
- Request: `{ customerName, phoneNumber, deliveryAddress, items }`
  - items: Array of `{ product, quantity, size, price }`
- Response: Created order object (with generated orderId)
- Public (no auth required)
- Used by: Checkout page

**GET /api/orders**
- Requires: JWT token
- Response: Array of all orders (populated with items.product)
- Used by: Admin orders page

**GET /api/orders/:id**
- Requires: JWT token
- Response: Single order object (populated with items.product)
- Used by: Admin order details

**PUT /api/orders/:id**
- Requires: JWT token
- Request: `{ status }`
- Response: Updated order object
- Used by: Admin orders page

**GET /api/orders/stats/overview**
- Requires: JWT token
- Response: `{ total, pending, delivered }`
- Used by: Admin dashboard

## Technology Stack Details

### Backend Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT creation and verification
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing

### Frontend Dependencies
- **next**: React framework with SSG/SSR
- **react**: UI library
- **react-dom**: React DOM renderer
- **axios**: HTTP client
- **tailwindcss**: Utility-first CSS framework

## Key Features & Design Decisions

### No User Authentication
- Only guest checkout
- No user accounts or profiles
- Simpler UX for customers
- Reduced server complexity

### Cart Management
- Stored in browser localStorage
- Persists across page refreshes
- Not synced across devices (guest only)
- No backend cart synchronization needed

### Admin Separation
- Admin dashboard at `/admin` URL path
- Separate authentication from user panel
- Protected routes with JWT verification
- Admin token stored in localStorage

### Minimal Design
- Black (#000000) text on White (#FFFFFF) background
- Light gray borders
- No animations or transitions
- No gradients or shadows
- Clean typography with high contrast
- Mobile-first responsive design

### Single Payment Method
- Cash on Delivery (COD) only
- No payment gateway integration
- Simple checkout flow
- Status tracking (pending/delivered) for admin

## File Organization

```
tshirt_brand/
├── README.md                    # Project overview
├── SETUP.md                     # Setup instructions
├── .gitignore
│
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── scripts/
│   │   └── create-admin.js      # Admin creation helper
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env                     # (create this)
│
└── frontend/
    ├── pages/
    │   ├── _app.js              # App wrapper with CartProvider
    │   ├── _document.js
    │   ├── index.js             # Home page
    │   ├── search.js            # Search results
    │   ├── cart.js              # Shopping cart
    │   ├── checkout.js          # Checkout form
    │   ├── product/
    │   │   └── [id].js          # Product details
    │   ├── order-success/
    │   │   └── [orderId].js     # Order confirmation
    │   └── admin/
    │       ├── login.js         # Admin login
    │       ├── index.js         # Dashboard
    │       ├── categories.js    # Category management
    │       ├── products.js      # Product management
    │       └── orders.js        # Order management
    ├── components/
    │   ├── Layout.js            # Main layout wrapper
    │   ├── CategoryFilter.js    # Category selector
    │   ├── Header.js            # (deprecated, use Layout)
    │   └── ProductCard.js       # Product grid item
    ├── lib/
    │   ├── api.js               # Axios instance & methods
    │   └── cart-context.js      # Cart Context & Provider
    ├── styles/
    │   └── globals.css          # Tailwind & global styles
    ├── public/                  # Static files
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .babelrc
    ├── .env.local              # (create this)
    └── .env.example
```

## Styling System

### Tailwind CSS Configuration
- Custom color palette with strict black/white/gray only
- No animations or transitions
- No shadows or decorative effects
- Mobile-first responsive breakpoints
- Utility classes for consistent spacing

### Global Styles (globals.css)
- CSS reset and box-sizing
- Font family setup
- Button and input styling
- No gradients or effects

## Security Considerations

### Backend
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- CORS configured for specific origins
- Environment variables for secrets
- Input validation on all endpoints
- Authentication middleware on protected routes

### Frontend
- Token stored in localStorage (subject to XSS)
- HTTPS required in production
- No sensitive data in localStorage beyond JWT

### Before Production
1. Change JWT_SECRET to a strong random value
2. Set up HTTPS/SSL
3. Configure CORS properly for your domain
4. Add rate limiting to API endpoints
5. Add request validation/sanitization
6. Set up database backups
7. Configure proper MongoDB authentication
8. Use environment-specific configurations

## Testing the Application

### Manual Testing Checklist

**User Flow**
- [ ] Home page loads with products
- [ ] Search works and shows correct results
- [ ] Category filter works
- [ ] Product sorting (price low-high, high-low) works
- [ ] Product details page loads with images
- [ ] Can add product to cart
- [ ] Cart shows correct items and total
- [ ] Can modify quantity in cart
- [ ] Can remove items from cart
- [ ] Checkout form validates required fields
- [ ] Order is created successfully
- [ ] Order success page shows Order ID

**Admin Flow**
- [ ] Admin login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Dashboard shows correct stats
- [ ] Can add category
- [ ] Can edit category
- [ ] Can delete category
- [ ] Can add product
- [ ] Can upload product images
- [ ] Can edit product
- [ ] Can delete product
- [ ] Can view orders list
- [ ] Can click order to see details
- [ ] Can update order status
- [ ] Logout clears token and redirects

## Performance Optimization Ideas (Future)

- Image optimization/compression
- Lazy loading product images
- Product pagination
- Caching with Redis
- Database indexing on frequently queried fields
- API response compression
- CDN for image hosting
- Code splitting in Next.js

## Potential Enhancements (Future)

- Email notifications for orders
- Wishlist functionality
- Product reviews and ratings
- Order tracking with SMS/Email updates
- Advanced analytics
- Inventory management alerts
- Bulk product import/export
- Multiple admin accounts with roles
- Product variants (color, material, etc.)
- Coupon/discount codes

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Author**: AI Assistant  
**License**: MIT
