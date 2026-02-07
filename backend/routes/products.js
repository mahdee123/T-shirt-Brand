const express = require('express');
const Product = require('../models/Product');
const { authenticateAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload product image (admin only)
router.post('/upload', authenticateAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
});

// Error handling middleware for multer - must be after routes
const errorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  } else if (error) {
    return res.status(400).json({ error: error.message || 'Upload failed' });
  }
  next();
};

router.use(errorHandler);

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let products = Product.find(query).populate('category');

    // Sort
    if (sortBy === 'price_low') {
      products = products.sort({ price: 1 });
    } else if (sortBy === 'price_high') {
      products = products.sort({ price: -1 });
    } else {
      products = products.sort({ createdAt: -1 });
    }

    const result = await products.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, price, sizes, stock, description, images } = req.body;

    if (!name || !category || !price || !sizes || stock === undefined) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const product = new Product({
      name,
      category,
      price,
      sizes,
      stock,
      description,
      images: images || []
    });

    await product.save();
    await product.populate('category');
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit product (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, price, sizes, stock, description, images } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, sizes, stock, description, images },
      { new: true }
    ).populate('category');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
