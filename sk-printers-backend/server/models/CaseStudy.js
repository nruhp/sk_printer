const mongoose = require('mongoose');
const slugify = require('slugify');

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  client: {
    name: {
      type: String,
      required: true,
    },
    industry: String,
    logo: String,
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
  metrics: [{
    label: String,
    value: String,
    icon: String,
  }],
  images: [{
    url: String,
    alt: String,
    caption: String,
  }],
  featuredImage: {
    url: String,
    alt: String,
  },
  productUsed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  testimonial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Testimonial',
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

caseStudySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
