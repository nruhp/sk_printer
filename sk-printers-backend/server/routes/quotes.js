const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { sendQuoteEmail } = require('../services/emailService');

// POST /api/quotes - Submit quote request
router.post('/', async (req, res) => {
  try {
    const {
      name, email, phone, company,
      boxType, quantity, length, width, height,
      printing, printColors, specialRequirements
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !boxType || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // Save to database
    const quote = await Quote.create({
      name, email, phone, company,
      boxType, quantity, length, width, height,
      printing, printColors, specialRequirements,
      status: 'pending',
    });

    // Send email notification
    try {
      await sendQuoteEmail({
        name, email, phone, company,
        boxType, quantity, length, width, height,
        printing, printColors, specialRequirements
      });
      console.log('✅ Quote email sent to admin');
    } catch (emailError) {
      console.error('❌ Quote email sending failed:', emailError.message);
      // Don't fail the request if email fails
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
    });
  }
});

// GET /api/quotes - Get all quotes (admin only)
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/quotes/:id - Update quote status
router.put('/:id', async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/quotes/:id - Delete quote
router.delete('/:id', async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
