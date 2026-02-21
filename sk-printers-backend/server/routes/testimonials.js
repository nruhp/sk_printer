const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, active = 'true' } = req.query;
    
    let query = {};
    if (featured) query.isFeatured = featured === 'true';
    if (active) query.isActive = active === 'true';

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/testimonials
// @desc    Create testimonial
// @access  Private/Admin
router.post('/', protect, restrictTo('admin'), upload.single('image'), async (req, res) => {
  try {
    const testimonialData = req.body;
    
    if (req.file) {
      testimonialData.image = {
        url: `/uploads/${req.file.filename}`,
        alt: testimonialData.clientName,
      };
    }

    const testimonial = await Testimonial.create(testimonialData);

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
