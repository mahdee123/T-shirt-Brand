# API Testing Guide

Use these examples to test the API with Postman, curl, or similar tools.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## AUTH ENDPOINTS

### 1. Create Admin Account (First Time Setup)

**Endpoint**: `POST /auth/register`

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response** (201):
```json
{
  "message": "Admin created",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com"
  }
}
```

---

### 2. Admin Login

**Endpoint**: `POST /auth/login`

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com"
  }
}
```

**Save the token** and use it for all admin endpoints!

---

## CATEGORY ENDPOINTS

### 1. Get All Categories (Public)

**Endpoint**: `GET /categories`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "T-Shirts",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Hoodies",
    "createdAt": "2024-01-15T10:35:00Z"
  }
]
```

---

### 2. Create Category (Admin Only)

**Endpoint**: `POST /categories`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
Content-Type: application/json
```

**Request**:
```json
{
  "name": "Vintage T-Shirts"
}
```

**Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Vintage T-Shirts",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

---

### 3. Edit Category (Admin Only)

**Endpoint**: `PUT /categories/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
Content-Type: application/json
```

**Request**:
```json
{
  "name": "Premium T-Shirts"
}
```

**Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Premium T-Shirts",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### 4. Delete Category (Admin Only)

**Endpoint**: `DELETE /categories/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
```

**Response** (200):
```json
{
  "message": "Category deleted"
}
```

---

## PRODUCT ENDPOINTS

### 1. Get All Products (Public)

**Endpoint**: `GET /products`

**Query Parameters**:
- `category=507f1f77bcf86cd799439012` (filter by category)
- `search=black` (search by name)
- `minPrice=10` (price range)
- `maxPrice=50` (price range)
- `sortBy=price_low` or `price_high` (sorting)

**Example**: `GET /products?search=black&sortBy=price_low`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Classic Black T-Shirt",
    "category": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "T-Shirts"
    },
    "price": 25,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 100,
    "description": "Comfortable everyday t-shirt",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "createdAt": "2024-01-15T12:00:00Z"
  }
]
```

---

### 2. Get Single Product (Public)

**Endpoint**: `GET /products/:id`

**Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Classic Black T-Shirt",
  "category": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "T-Shirts"
  },
  "price": 25,
  "sizes": ["S", "M", "L", "XL"],
  "stock": 100,
  "description": "Comfortable everyday t-shirt",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "createdAt": "2024-01-15T12:00:00Z"
}
```

---

### 3. Create Product (Admin Only)

**Endpoint**: `POST /products`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
Content-Type: application/json
```

**Request**:
```json
{
  "name": "Classic Black T-Shirt",
  "category": "507f1f77bcf86cd799439012",
  "price": 25.99,
  "sizes": ["S", "M", "L", "XL"],
  "stock": 100,
  "description": "Comfortable everyday t-shirt made from 100% cotton",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ]
}
```

**Response** (201): Same as single product response

---

### 4. Edit Product (Admin Only)

**Endpoint**: `PUT /products/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
Content-Type: application/json
```

**Request**: Same format as Create Product

**Response** (200): Updated product object

---

### 5. Delete Product (Admin Only)

**Endpoint**: `DELETE /products/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
```

**Response** (200):
```json
{
  "message": "Product deleted"
}
```

---

## ORDER ENDPOINTS

### 1. Create Order (Public - Guest Checkout)

**Endpoint**: `POST /orders`

**Request**:
```json
{
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "deliveryAddress": "123 Main Street, City, State 12345",
  "items": [
    {
      "product": "507f1f77bcf86cd799439020",
      "quantity": 2,
      "size": "M",
      "price": 25.99
    },
    {
      "product": "507f1f77bcf86cd799439021",
      "quantity": 1,
      "size": "L",
      "price": 35.99
    }
  ]
}
```

**Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "orderId": "ORD-1705340400000-ABC123XYZ",
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "deliveryAddress": "123 Main Street, City, State 12345",
  "totalAmount": 87.97,
  "status": "pending",
  "paymentMethod": "COD",
  "items": [
    {
      "product": "507f1f77bcf86cd799439020",
      "quantity": 2,
      "size": "M",
      "price": 25.99
    },
    {
      "product": "507f1f77bcf86cd799439021",
      "quantity": 1,
      "size": "L",
      "price": 35.99
    }
  ],
  "createdAt": "2024-01-15T13:00:00Z",
  "updatedAt": "2024-01-15T13:00:00Z"
}
```

**Important**: Save the `orderId` to show to the customer!

---

### 2. Get All Orders (Admin Only)

**Endpoint**: `GET /orders`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
```

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "orderId": "ORD-1705340400000-ABC123XYZ",
    "customerName": "John Doe",
    "phoneNumber": "+1234567890",
    "deliveryAddress": "123 Main Street, City, State 12345",
    "totalAmount": 87.97,
    "status": "pending",
    "paymentMethod": "COD",
    "items": [...],
    "createdAt": "2024-01-15T13:00:00Z",
    "updatedAt": "2024-01-15T13:00:00Z"
  }
]
```

---

### 3. Get Single Order (Admin Only)

**Endpoint**: `GET /orders/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
```

**Response** (200): Single order object (as shown above)

---

### 4. Update Order Status (Admin Only)

**Endpoint**: `PUT /orders/:id`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
Content-Type: application/json
```

**Request**:
```json
{
  "status": "delivered"
}
```

**Valid Status Values**: `pending` or `delivered`

**Response** (200): Updated order object with new status

---

### 5. Get Dashboard Stats (Admin Only)

**Endpoint**: `GET /orders/stats/overview`

**Headers**:
```
Authorization: Bearer TOKEN_HERE
```

**Response** (200):
```json
{
  "total": 15,
  "pending": 8,
  "delivered": 7
}
```

---

## CURL Examples

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Category"}'
```

### Search Products
```bash
curl "http://localhost:5000/api/products?search=black&sortBy=price_low"
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "phoneNumber": "+1234567890",
    "deliveryAddress": "123 Main St",
    "items": [{"product": "ID_HERE", "quantity": 1, "size": "M", "price": 25}]
  }'
```

---

## Error Responses

### Validation Error (400)
```json
{
  "error": "Category name required"
}
```

### Unauthorized (401)
```json
{
  "error": "No token provided"
}
```

### Not Found (404)
```json
{
  "error": "Product not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error message"
}
```

---

## Testing Flow

1. **Create Admin** (one time):
   ```
   POST /auth/register → Save credentials
   ```

2. **Login**:
   ```
   POST /auth/login → Save JWT token
   ```

3. **Create Category**:
   ```
   POST /categories → Save category ID
   ```

4. **Create Product**:
   ```
   POST /products → Use category ID from step 3, Save product ID
   ```

5. **Create Order** (without auth):
   ```
   POST /orders → Use product ID from step 4
   ```

6. **View Orders** (with auth):
   ```
   GET /orders → Use JWT token from step 2
   ```

7. **Update Order Status**:
   ```
   PUT /orders/:id → Use JWT token
   ```

---

**Happy Testing!**
