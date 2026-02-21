const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const Product = require('../models/Product');
const Blog = require('../models/Blog');
const Quote = require('../models/Quote');
const Contact = require('../models/Contact');
const Testimonial = require('../models/Testimonial');
const CaseStudy = require('../models/CaseStudy');

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard/stats', protect, restrictTo('admin'), async (req, res) => {
  try {
    const stats = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Blog.countDocuments({ isPublished: true }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'pending' }),
      Contact.countDocuments({ status: 'new' }),
      Testimonial.countDocuments({ isActive: true }),
      CaseStudy.countDocuments({ isPublished: true }),
    ]);

    // Get recent quotes
    const recentQuotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customerInfo.name customerInfo.email boxRequirements.quantity status createdAt');

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    // Get blog views analytics
    const topBlogs = await Blog.find({ isPublished: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title slug views publishedAt');

    res.json({
      success: true,
      data: {
        summary: {
          totalProducts: stats[0],
          totalBlogs: stats[1],
          totalQuotes: stats[2],
          pendingQuotes: stats[3],
          newContacts: stats[4],
          totalTestimonials: stats[5],
          totalCaseStudies: stats[6],
        },
        recentQuotes,
        recentContacts,
        topBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/admin/dashboard/analytics
// @desc    Get analytics data
// @access  Private/Admin
router.get('/dashboard/analytics', protect, restrictTo('admin'), async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Quotes over time
    const quotesOverTime = await Quote.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Quotes by status
    const quotesByStatus = await Quote.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        quotesOverTime,
        quotesByStatus,
        productsByCategory,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
