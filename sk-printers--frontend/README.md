# SK Printers - B2B Manufacturing Website

🏭 **Professional B2B Website for Cardboard Box Manufacturing**

A complete, production-ready full-stack website with Next.js frontend, Express backend, MongoDB database, and admin CMS.

## 🚀 Features

### Frontend
- ✅ Modern, responsive design with Tailwind CSS
- ✅ SEO optimized with next-seo
- ✅ Instant price calculator
- ✅ Product catalog with filters
- ✅ Blog system with categories
- ✅ Case studies showcase
- ✅ Contact forms & quote requests
- ✅ Customer testimonials
- ✅ Smooth animations with Framer Motion
- ✅ Mobile-first responsive design

### Backend & Admin
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ Admin dashboard for content management
- ✅ Blog post management (CRUD)
- ✅ Product management
- ✅ Quote request handling
- ✅ Contact form submissions
- ✅ Analytics dashboard
- ✅ File upload system

### SEO & Marketing
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ XML sitemap generation
- ✅ Structured data (Schema.org)
- ✅ Google Analytics integration
- ✅ Blog for content marketing
- ✅ Fast page load times

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 16+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed
- A code editor (VS Code recommended)

## 🛠️ Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and update with your values:
```env
# MongoDB - Choose ONE option:

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/sk-printers

# Option B: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sk-printers

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-2024

# API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Email (for contact forms - Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Admin Credentials (change these!)
ADMIN_EMAIL=admin@skprinters.com
ADMIN_PASSWORD=SecurePassword123!

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Step 3: Start MongoDB (if using local)

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 4: Run the Application

**Option A: Run Frontend and Backend Together (Recommended)**
```bash
npm run dev:all
```

**Option B: Run Separately**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### Step 5: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Panel:** http://localhost:3000/admin

## 📁 Project Structure

```
sk-printers-website/
├── components/           # React components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── home/            # Homepage sections
│   ├── common/          # Reusable components
│   └── admin/           # Admin dashboard components
├── pages/               # Next.js pages
│   ├── api/            # API routes (if using Next.js API)
│   ├── blog/           # Blog pages
│   ├── products/       # Product pages
│   ├── admin/          # Admin pages
│   └── index.js        # Homepage
├── server/             # Backend Express server
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & upload middleware
│   ├── controllers/   # Route controllers
│   └── index.js       # Server entry point
├── styles/            # CSS files
├── public/            # Static files
├── lib/               # Utility functions
└── uploads/           # Uploaded files

```

## 🗄️ Database Models

The application includes these MongoDB models:
- **User** - Admin authentication
- **Product** - Cardboard box products
- **Blog** - Blog posts with SEO
- **Quote** - Customer quote requests
- **Contact** - Contact form submissions
- **Testimonial** - Customer testimonials
- **CaseStudy** - Success stories

## 🔑 Admin Access

Default admin credentials (change these immediately!):
- **Email:** admin@skprinters.com
- **Password:** Admin@123

To create a new admin user via API:
```bash
POST http://localhost:5000/api/auth/register
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "secure-password",
  "role": "admin"
}
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy Backend

**Option A: Railway**
1. Go to [Railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Add environment variables
4. Deploy

**Option B: Heroku**
```bash
heroku create sk-printers-api
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

**Option C: DigitalOcean/AWS**
- Use PM2 for process management
- Set up Nginx as reverse proxy
- Configure SSL with Let's Encrypt

### MongoDB Atlas Setup (Production Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string and update .env

## 📝 API Documentation

### Authentication
```
POST /api/auth/register - Register user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user
```

### Products
```
GET /api/products - Get all products
GET /api/products/:slug - Get single product
POST /api/products - Create product (admin)
PUT /api/products/:id - Update product (admin)
DELETE /api/products/:id - Delete product (admin)
```

### Blogs
```
GET /api/blogs - Get all blogs
GET /api/blogs/:slug - Get single blog
POST /api/blogs - Create blog (admin)
PUT /api/blogs/:id - Update blog (admin)
DELETE /api/blogs/:id - Delete blog (admin)
```

### Quotes
```
POST /api/quotes - Submit quote request
GET /api/quotes - Get all quotes (admin)
PUT /api/quotes/:id - Update quote (admin)
```

### Full API documentation available at: `/api/docs` (when implemented)

## 🎨 Customization

### Update Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_COLOR',
    // ... etc
  },
}
```

### Add Your Logo
Replace files in `/public/images/`:
- `logo.png` - Main logo
- `logo-white.png` - White version for dark backgrounds

### Update Company Info
Edit `lib/constants.js` for company details, contact info, social links, etc.

## 📧 Contact Form Setup (Gmail)

1. Enable 2-Factor Authentication in Gmail
2. Generate App Password:
   - Go to Google Account → Security → App Passwords
   - Generate password for "Mail"
3. Update `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

## 🔧 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string is correct
- For Atlas, verify IP whitelist

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

## 📊 SEO Optimization Checklist

- ✅ Unique title tags for each page
- ✅ Meta descriptions (150-160 characters)
- ✅ Semantic HTML structure (H1, H2, etc.)
- ✅ Alt text for all images
- ✅ Fast page load (< 3 seconds)
- ✅ Mobile responsive
- ✅ SSL certificate (HTTPS)
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Structured data markup
- ✅ Internal linking
- ✅ Blog for content marketing

## 🔒 Security Best Practices

- Change default admin credentials immediately
- Use strong JWT secret (min 32 characters)
- Enable HTTPS in production
- Sanitize user inputs
- Rate limit API endpoints
- Regular security updates
- Backup database regularly

## 📈 Performance Optimization

- Image optimization (use Next.js Image component)
- Code splitting
- Lazy loading
- CDN for static assets
- Database indexing
- Caching strategies

## 🆘 Support & Help

For issues or questions:
1. Check the documentation
2. Search existing issues on GitHub
3. Create a new issue with details

## 📄 License

Proprietary - SK Printers 2024

## 🤝 Contributing

This is a private project for SK Printers.

---

**Built with ❤️ for SK Printers**

Need help? Contact: support@skprinters.com
#   n e w s k p r i n t e r  
 #   n e w s k p r i n t e r  
 #   n e w  
 