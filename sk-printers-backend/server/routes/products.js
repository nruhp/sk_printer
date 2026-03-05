const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, restrictTo, restrictToIp } = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, type, featured, active } = req.query;

    let query = {};

    if (category) query.category = category;
    if (type) query.type = type;
    if (featured) query.isFeatured = featured === 'true';
    // Only filter by active if explicitly passed; admin fetches all
    if (active !== undefined) query.isActive = active === 'true';

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/products/:slug
// @desc    Get single product by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
// NOTE: No multer middleware — admin form sends JSON, not multipart/form-data
router.post('/', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    const body = req.body;

    // Map the simplified admin form fields to the Product schema structure
    const productData = {
      name: body.name,
      description: body.description,
      category: body.category || '3-ply',
      type: body.type || 'corrugated',
      pricing: {
        basePrice: parseFloat(body.price || body.basePrice || 0),
        minQuantity: parseInt(body.minOrder || body.minQuantity || 100),
      },
      isActive: body.stock !== 'out-of-stock',
      isFeatured: body.isFeatured === 'true' || body.isFeatured === true,
    };

    const product = await Product.create(productData);

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error saving product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    const body = req.body;
    const updateData = { ...body };

    if (body.price !== undefined) {
      updateData.pricing = {
        basePrice: parseFloat(body.price),
        minQuantity: parseInt(body.minOrder || 100),
      };
      delete updateData.price;
      delete updateData.minOrder;
    }

    if (body.stock !== undefined) {
      updateData.isActive = body.stock !== 'out-of-stock';
      delete updateData.stock;
    }

    if (!updateData.type) {
      updateData.type = 'corrugated';
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
