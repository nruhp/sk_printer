const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/blogs
// @desc    Get all blogs (published only for public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, tag, featured, search, page = 1, limit = 10 } = req.query;
    
    let query = { isPublished: true };
    
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (featured) query.isFeatured = featured === 'true';
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content'); // Exclude full content in list view

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/blogs/related/:slug
// @desc    Get related blogs
// @access  Public
router.get('/related/:slug', async (req, res) => {
  try {
    const currentBlog = await Blog.findOne({ slug: req.params.slug });
    
    if (!currentBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Find related blogs by category or tags
    const relatedBlogs = await Blog.find({
      _id: { $ne: currentBlog._id },
      isPublished: true,
      $or: [
        { category: currentBlog.category },
        { tags: { $in: currentBlog.tags } },
      ],
    })
      .limit(3)
      .select('-content');

    res.json({
      success: true,
      data: relatedBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private/Admin
router.post('/', protect, restrictTo('admin'), upload.single('featuredImage'), async (req, res) => {
  try {
    const blogData = req.body;
    
    // Handle uploaded featured image
    if (req.file) {
      blogData.featuredImage = {
        url: `/uploads/${req.file.filename}`,
        alt: blogData.title,
      };
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
