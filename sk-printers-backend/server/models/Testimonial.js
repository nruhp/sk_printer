const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    alt: String,
  },
  companyLogo: String,
  projectDetails: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
