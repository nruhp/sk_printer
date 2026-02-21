const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/case-studies
// @desc    Get all case studies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, published = 'true', tag } = req.query;
    
    let query = {};
    if (featured) query.isFeatured = featured === 'true';
    if (published) query.isPublished = published === 'true';
    if (tag) query.tags = tag;

    const caseStudies = await CaseStudy.find(query)
      .sort({ createdAt: -1 })
      .populate('productUsed', 'name slug')
      .populate('testimonial');

    res.json({
      success: true,
      count: caseStudies.length,
      data: caseStudies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/case-studies/:slug
// @desc    Get single case study
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    })
      .populate('productUsed', 'name slug category features')
      .populate('testimonial');

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    res.json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/case-studies
// @desc    Create case study
// @access  Private/Admin
router.post('/', protect, restrictTo('admin'), upload.array('images', 5), async (req, res) => {
  try {
    const caseStudyData = req.body;
    
    if (req.files && req.files.length > 0) {
      caseStudyData.images = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        alt: caseStudyData.title,
        caption: '',
      }));
      
      caseStudyData.featuredImage = {
        url: caseStudyData.images[0].url,
        alt: caseStudyData.title,
      };
    }

    const caseStudy = await CaseStudy.create(caseStudyData);

    res.status(201).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/case-studies/:id
// @desc    Update case study
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    res.json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/case-studies/:id
// @desc    Delete case study
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    res.json({
      success: true,
      message: 'Case study deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
