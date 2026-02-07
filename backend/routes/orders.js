const express = require('express');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Generate unique order ID
function generateOrderId() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Create order (user)
router.post('/', async (req, res) => {
  try {
    const { customerName, phoneNumber, deliveryAddress, items } = req.body;

    if (!customerName || !phoneNumber || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = generateOrderId();

    const order = new Order({
      orderId,
      customerName,
      phoneNumber,
      deliveryAddress,
      items,
      totalAmount,
      status: 'pending',
      paymentMethod: 'COD'
    });

    await order.save();
    await order.populate('items.product');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID (admin only)
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats (admin only)
router.get('/stats/overview', authenticateAdmin, async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: 'pending' });
    const delivered = await Order.countDocuments({ status: 'delivered' });

    res.json({ total, pending, delivered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
