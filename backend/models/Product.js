const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  sizes: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL'],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    maxlength: 200
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 3;
      },
      message: 'Maximum 3 images allowed'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
