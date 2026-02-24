const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
// Tries .env.local first (local dev), then falls back to system env vars (production)
dotenv.config({ path: require('path').join(__dirname, '../.env.local') });
dotenv.config(); // also load .env if present

const app = express();

// 2. Updated CORS configuration for your live Vercel domain
app.use(cors({
  origin: [
    "https://neww-y4k9.vercel.app",
    "https://sk-printer.vercel.app",
    "http://localhost:3000",
    /\.vercel\.app$/  // Allows all Vercel preview deployments
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 3. Database connection with safety check
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in environment variables');
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/case-studies', require('./routes/caseStudies'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'SK Printers API is running',
    timestamp: new Date().toISOString()
  });
});

// Test email endpoint (for debugging SMTP)
app.get('/api/test-email', async (req, res) => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    socketTimeout: 15000,
    dnsLookupIpVersion: 'ipv4first',
    family: 4,
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'SK Printers - Email Test',
      text: `Email test at ${new Date().toISOString()}. Config: user=${process.env.EMAIL_USER}, admin=${process.env.ADMIN_EMAIL}`,
    });
    res.json({ success: true, message: 'Test email sent!', to: process.env.ADMIN_EMAIL });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, code: error.code });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;