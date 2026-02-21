const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: true,
    enum: ['3-ply', '5-ply', '7-ply', 'custom'],
  },
  type: {
    type: String,
    required: true,
    enum: ['corrugated', 'printed', 'plain', 'die-cut', 'custom'],
  },
  specifications: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['mm', 'cm', 'inch'],
      default: 'mm',
    },
    weight: Number,
    material: String,
    color: String,
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true,
    },
    minQuantity: {
      type: Number,
      default: 100,
    },
    bulkDiscounts: [{
      quantity: Number,
      discount: Number, // percentage
    }],
  },
  features: [String],
  applications: [String],
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean,
  }],
  technicalSpecs: {
    burstStrength: String,
    edgeCrushTest: String,
    compression: String,
    moistureResistance: String,
  },
  certifications: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
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

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
