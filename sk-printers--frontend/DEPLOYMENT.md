# 🚀 Complete Deployment Guide - SK Printers Website

This guide will help you deploy your SK Printers website to production in under 30 minutes.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup (Database)](#mongodb-setup)
3. [Deploy Frontend to Vercel](#deploy-frontend)
4. [Deploy Backend API](#deploy-backend)
5. [Configure Environment Variables](#environment-variables)
6. [Post-Deployment Setup](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have accounts on:
- ✅ GitHub (free)
- ✅ Vercel (free)
- ✅ MongoDB Atlas (free)
- ✅ Railway.app OR Render.com (free) - for backend

---

## 1. MongoDB Setup (Database)

### Step 1.1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google or email
3. Select **FREE** tier (M0 Sandbox)
4. Choose cloud provider: **AWS**
5. Choose region: **Mumbai (ap-south-1)** (or closest to India)
6. Cluster Name: `sk-printers-cluster`
7. Click **Create Cluster** (takes 3-5 minutes)

### Step 1.2: Configure Database Access

1. In Atlas dashboard, go to **Database Access**
2. Click **Add New Database User**
   - Username: `skprinters-admin`
   - Password: Click **Autogenerate Secure Password** (SAVE THIS!)
   - Database User Privileges: **Read and write to any database**
3. Click **Add User**

### Step 1.3: Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### Step 1.4: Get Connection String

1. Go to **Database** → Click **Connect**
2. Choose **Connect your application**
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `sk-printers`

Example:
```
mongodb+srv://skprinters-admin:YOUR_PASSWORD@sk-printers-cluster.xxxxx.mongodb.net/sk-printers?retryWrites=true&w=majority
```

**SAVE THIS CONNECTION STRING!** You'll need it later.

---

## 2. Deploy Frontend to Vercel

### Step 2.1: Push Code to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SK Printers website"

# Create repository on GitHub
# Go to github.com → New Repository → sk-printers-website

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/sk-printers-website.git
git branch -M main
git push -u origin main
```

### Step 2.2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your `sk-printers-website` repository
5. Configure Project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `next build`
   - Output Directory: `.next`

### Step 2.3: Add Environment Variables in Vercel

Click **Environment Variables** and add these:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | Production |
| `JWT_SECRET` | Generate random 32+ char string | Production |
| `NEXT_PUBLIC_API_URL` | (Leave empty for now, add after backend deployment) | Production |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (you'll get this) | Production |

To generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

6. Click **Deploy**
7. Wait 2-3 minutes
8. Your site will be live at: `https://YOUR_PROJECT.vercel.app`

**SAVE YOUR VERCEL URL!**

---

## 3. Deploy Backend API

### Option A: Deploy to Railway.app (Recommended)

#### Step 3A.1: Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **New Project**
4. Select **Deploy from GitHub repo**
5. Connect your `sk-printers-website` repository

#### Step 3A.2: Configure Backend Service

1. After importing, Railway will try to detect the app
2. Click **Settings**
3. **Root Directory**: Leave empty
4. **Start Command**: `node server/index.js`
5. **Build Command**: Leave empty

#### Step 3A.3: Add Environment Variables

Go to **Variables** tab and add:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-jwt-secret-from-vercel
PORT=5000
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=your-vercel-url
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@skprinters.com
ADMIN_PASSWORD=SecurePassword123!
```

#### Step 3A.4: Deploy

1. Click **Deploy**
2. Railway will provide a URL: `https://your-app.railway.app`
3. **SAVE THIS URL!** This is your API URL

### Option B: Deploy to Render.com (Alternative)

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click **New** → **Web Service**
4. Connect repository
5. Settings:
   - Name: `sk-printers-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
6. Add environment variables (same as Railway)
7. Click **Create Web Service**

---

## 4. Configure Environment Variables

### Update Vercel with Backend URL

1. Go back to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.railway.app/api
   ```
5. Go to **Deployments** → Click ⋯ on latest → **Redeploy**

---

## 5. Post-Deployment Setup

### 5.1: Test the Application

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Check homepage loads correctly
3. Test API health: `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status": "OK", "message": "SK Printers API is running"}`

### 5.2: Create Admin Account

Use Postman or curl:

```bash
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@skprinters.com",
    "password": "SecurePassword123!",
    "role": "admin"
  }'
```

OR visit: `https://your-site.vercel.app/admin/register` (if you created this page)

### 5.3: Login to Admin Panel

1. Go to `https://your-site.vercel.app/admin`
2. Login with admin credentials
3. Start adding content!

### 5.4: Add Sample Data

Use the admin panel to add:
- ✅ 5-10 products
- ✅ 3-5 blog posts
- ✅ 2-3 testimonials
- ✅ 1-2 case studies

---

## 6. SEO & Performance Optimization

### 6.1: Add Google Analytics

1. Create Google Analytics account
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Redeploy

### 6.2: Configure Custom Domain (Optional)

1. Buy domain from Namecheap/GoDaddy
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as shown

### 6.3: Generate Sitemap

1. Create `pages/sitemap.xml.js`:
```javascript
// This will auto-generate sitemap
export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://yoursite.com</loc>
        <priority>1.0</priority>
      </url>
      <!-- Add more URLs -->
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
```

2. Submit to Google Search Console

---

## 7. Troubleshooting

### Issue: "MongoDB connection failed"

**Solution:**
- Check connection string is correct
- Ensure password doesn't have special characters (use URL encoding)
- Verify IP whitelist includes 0.0.0.0/0

### Issue: "API requests failing"

**Solution:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check backend is running: visit `/api/health`
- Check CORS settings in backend

### Issue: "Images not loading"

**Solution:**
- Images should be in `/public/images/`
- Use Next.js Image component: `import Image from 'next/image'`
- Check file paths are correct

### Issue: "Build failing on Vercel"

**Solution:**
```bash
# Run locally to check
npm run build

# If errors, fix them and push again
git add .
git commit -m "Fix build errors"
git push
```

---

## 📋 Deployment Checklist

Before going live:

- [ ] Database is set up and accessible
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured
- [ ] API health endpoint works
- [ ] Admin account created
- [ ] Sample products added
- [ ] Blog posts published
- [ ] Contact form tested
- [ ] All pages loading correctly
- [ ] Mobile responsive
- [ ] Google Analytics added
- [ ] SEO meta tags verified

---

## 🎉 You're Live!

Your website is now deployed and accessible worldwide!

### Next Steps:
1. Share your website URL
2. Start adding real content
3. Market your business
4. Monitor analytics
5. Regular backups of MongoDB

### Support

Need help? Create an issue on GitHub or contact technical support.

---

**Congratulations! 🚀 Your SK Printers website is now LIVE!**
