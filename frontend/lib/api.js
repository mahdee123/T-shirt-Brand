import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const apiClient = {
  // Categories
  getCategories: () => api.get('/categories'),
  
  // Products
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Orders
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Auth
  loginAdmin: (email, password) => api.post('/auth/login', { email, password }),
  registerAdmin: (email, password) => api.post('/auth/register', { email, password }),
  
  // Admin - Orders
  getOrders: (token) => api.get('/orders', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getOrderById: (id, token) => api.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateOrderStatus: (id, status, token) => api.put(`/orders/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getOrdersStats: (token) => api.get('/orders/stats/overview', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Admin - Categories
  createCategory: (name, token) => api.post('/categories', { name }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateCategory: (id, name, token) => api.put(`/categories/${id}`, { name }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteCategory: (id, token) => api.delete(`/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Admin - Products
  createProduct: (productData, token) => api.post('/products', productData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProduct: (id, productData, token) => api.put(`/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteProduct: (id, token) => api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

export default api;
