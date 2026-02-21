const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  customerInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: String,
    website: String,
  },
  boxRequirements: {
    type: {
      type: String,
      required: true,
      enum: ['3-ply', '5-ply', '7-ply', 'custom'],
    },
    printingRequired: {
      type: Boolean,
      default: false,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['mm', 'cm', 'inch'],
        default: 'mm',
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    colors: String,
    finishType: String,
  },
  additionalDetails: {
    useCase: String,
    targetPrice: Number,
    deliveryTimeline: String,
    shippingAddress: String,
    specialRequirements: String,
  },
  attachments: [{
    url: String,
    filename: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'converted', 'rejected'],
    default: 'pending',
  },
  quotedPrice: Number,
  quotedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

quoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quote', quoteSchema);
