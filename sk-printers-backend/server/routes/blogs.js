const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, restrictTo } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all published blogs (public) or all blogs (admin with ?all=true)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, tag, featured, search, page = 1, limit = 10, all } = req.query;

    // If ?all=true is passed (admin panel), return all blogs regardless of publish status
    let query = all === 'true' ? {} : { isPublished: true };

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (featured) query.isFeatured = featured === 'true';

    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content');

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/blogs/related/:slug
// @desc    Get related blogs (MUST be before /:slug to avoid conflict)
// @access  Public
router.get('/related/:slug', async (req, res) => {
  try {
    const currentBlog = await Blog.findOne({ slug: req.params.slug });

    if (!currentBlog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

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

    res.json({ success: true, data: relatedBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Increment views using findByIdAndUpdate to avoid triggering pre-save hooks
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private/Admin
// NOTE: No multer middleware here - admin form sends JSON, not multipart/form-data
router.post('/', protect, restrictTo('admin'), async (req, res) => {
  try {
    const body = req.body;

    const blogData = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      category: body.category,
      tags: Array.isArray(body.tags)
        ? body.tags
        : (body.tags ? body.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      isPublished: body.status === 'published' || body.isPublished === true || body.isPublished === 'true',
      isFeatured: body.isFeatured === true || body.isFeatured === 'true',
      readTime: body.readTime ? parseInt(body.readTime) : undefined,
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error saving blog:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const body = req.body;
    const updateData = { ...body };

    // Map `status` field to `isPublished`
    if (body.status !== undefined) {
      updateData.isPublished = body.status === 'published';
      delete updateData.status;
    }

    // Parse tags if they come as a comma-separated string
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
