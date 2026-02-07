# T-Shirt Brand eCommerce

A minimal, mobile-first T-shirt eCommerce platform with black & white design.

## Features

### User Panel
- Home page with category filter
- Search functionality
- Product details with image gallery
- Shopping cart (localStorage-based)
- Checkout with guest checkout
- Order confirmation

### Admin Dashboard
- Admin authentication (email/password)
- Dashboard with order statistics
- Category management (CRUD)
- Product management (CRUD)
- Order management with status tracking

## Tech Stack

### Backend
- Node.js + Express
- MongoDB
- JWT authentication
- CORS enabled

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Axios

## Getting Started

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/tshirt_brand
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

3. Start MongoDB (if local):
```bash
mongod
```

4. Run backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin account (setup only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add category (admin)
- `PUT /api/categories/:id` - Edit category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Add product (admin)
- `PUT /api/products/:id` - Edit product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order (guest)
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order details (admin)
- `PUT /api/orders/:id` - Update order status (admin)
- `GET /api/orders/stats/overview` - Get dashboard stats (admin)

## Project Structure

```
tshirt_brand/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server file
│   └── package.json
│
└── frontend/
    ├── pages/           # Next.js pages
    │   ├── admin/       # Admin pages
    │   ├── product/     # Product details
    │   └── order-success/
    ├── components/      # React components
    ├── lib/            # Utilities (API, cart context)
    ├── styles/         # CSS files
    └── package.json
```

## Design Theme

- **Background**: White (#FFFFFF)
- **Text**: Black (#000000)
- **Borders**: Light Gray
- **Buttons**: Black background, white text
- **No animations, shadows, or decorations**

## Notes

- No user signup/login (guest checkout only)
- Cash on Delivery only
- Admin dashboard on separate URL (`/admin`)
- Cart stored in localStorage
- Mobile-first responsive design

## Security Notes

- Change JWT_SECRET before production
- Use HTTPS in production
- Add rate limiting for APIs
- Validate all inputs server-side
- Use environment variables for sensitive data
