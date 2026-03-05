const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { protect, restrictTo, restrictToIp } = require('../middleware/auth');
const { sendQuoteEmail } = require('../services/emailService');

// POST /api/quotes - Submit quote request
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    // Accept BOTH flat format (old) AND nested format (new frontend sends nested)
    // Nested format: { customerInfo: {name, email, phone, company}, boxRequirements: {type, quantity, ...} }
    // Flat format:   { name, email, phone, boxType, quantity, ... }

    let name, email, phone, company,
      boxType, quantity, length, width, height,
      printing, printColors, specialRequirements, useCase;

    if (body.customerInfo) {
      // Nested format from get-quote.js frontend
      name = body.customerInfo.name;
      email = body.customerInfo.email;
      phone = body.customerInfo.phone;
      company = body.customerInfo.company;

      boxType = body.boxRequirements?.type;
      quantity = body.boxRequirements?.quantity;
      length = body.boxRequirements?.dimensions?.length;
      width = body.boxRequirements?.dimensions?.width;
      height = body.boxRequirements?.dimensions?.height;
      printing = body.boxRequirements?.printingRequired;
      printColors = body.boxRequirements?.colors;

      specialRequirements = body.additionalDetails?.specialRequirements;
      useCase = body.additionalDetails?.useCase;
    } else {
      // Flat format
      ({
        name, email, phone, company,
        boxType, quantity, length, width, height,
        printing, printColors, specialRequirements
      } = body);
    }

    // Validate required fields
    if (!name || !email || !phone || !boxType || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields (name, email, phone, boxType, quantity)',
      });
    }

    // Validate boxType matches the schema enum
    const validBoxTypes = ['3-ply', '5-ply', '7-ply', 'custom'];
    const normalizedBoxType = validBoxTypes.includes(boxType) ? boxType : 'custom';

    // Map to the nested Quote schema structure
    const quote = await Quote.create({
      customerInfo: {
        name,
        email,
        phone,
        company: company || '',
      },
      boxRequirements: {
        type: normalizedBoxType,
        quantity: parseInt(quantity) || 0,
        printingRequired: printing === true || printing === 'true' || printing === 'yes',
        dimensions: {
          length: length ? parseFloat(length) : undefined,
          width: width ? parseFloat(width) : undefined,
          height: height ? parseFloat(height) : undefined,
          unit: 'inch',
        },
        colors: printColors || '',
      },
      additionalDetails: {
        useCase: useCase || '',
        specialRequirements: specialRequirements || '',
      },
      status: 'pending',
    });

    // Send email notification (non-blocking)
    try {
      await sendQuoteEmail({
        name, email, phone, company,
        boxType: normalizedBoxType, quantity, length, width, height,
        printing, printColors, specialRequirements
      });
      console.log('✅ Quote email sent to admin');
    } catch (emailError) {
      console.error('❌ Quote email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully! We will contact you within 24-48 hours.',
      data: quote,
    });
  } catch (error) {
    console.error('Quote form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again.',
      error: error.message,
    });
  }
});

// GET /api/quotes - Get all quotes (admin only)
router.get('/', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    // Flatten the nested structure for the admin panel
    const flatQuotes = quotes.map(q => ({
      _id: q._id,
      name: q.customerInfo?.name,
      email: q.customerInfo?.email,
      phone: q.customerInfo?.phone,
      company: q.customerInfo?.company,
      boxType: q.boxRequirements?.type,
      quantity: q.boxRequirements?.quantity,
      printing: q.boxRequirements?.printingRequired,
      printColors: q.boxRequirements?.colors,
      dimensions: q.boxRequirements?.dimensions,
      specialRequirements: q.additionalDetails?.specialRequirements,
      status: q.status,
      createdAt: q.createdAt,
    }));

    res.json({ success: true, data: flatQuotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/quotes/:id - Update quote status
router.put('/:id', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/quotes/:id - Delete quote
router.delete('/:id', protect, restrictTo('admin'), restrictToIp, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
