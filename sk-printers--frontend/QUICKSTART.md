# ⚡ Quick Start Guide - SK Printers Website

Get up and running in 5 minutes!

## 🚀 Super Fast Setup

### Step 1: Install Dependencies (2 minutes)

```bash
cd sk-printers-website
npm install
```

### Step 2: Setup Database (1 minute)

**Option A: Use MongoDB Atlas (Recommended - Cloud)**
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (takes 3 mins)
4. Get connection string

**Option B: Use Local MongoDB**
```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

### Step 3: Configure Environment (30 seconds)

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local and add your MongoDB URI
# If using local: MONGODB_URI=mongodb://localhost:27017/sk-printers
# If using Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sk-printers
```

### Step 4: Run the Application (30 seconds)

```bash
# Run both frontend and backend together
npm run dev:all
```

OR run separately:

Terminal 1:
```bash
npm run dev      # Frontend on http://localhost:3000
```

Terminal 2:
```bash
npm run server   # Backend on http://localhost:5000
```

### Step 5: Access Your Site! 🎉

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API:** http://localhost:5000/api/health

## 📝 Default Admin Login

Email: `admin@skprinters.com`
Password: `Admin@123`

**⚠️ IMPORTANT: Change these credentials immediately in production!**

## 🎯 What's Next?

1. ✅ Add your logo to `/public/images/logo.png`
2. ✅ Update brand colors in `tailwind.config.js`
3. ✅ Add products via admin panel
4. ✅ Write blog posts
5. ✅ Customize content
6. ✅ Deploy (see DEPLOYMENT.md)

## 🆘 Common Issues

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
npx kill-port 3000
```

### "MongoDB connection error"
- Check MongoDB is running: `mongod`
- Verify connection string in `.env.local`

## 📚 Need More Help?

- Full Documentation: See `README.md`
- Deployment Guide: See `DEPLOYMENT.md`
- File Structure: Check `/docs/structure.md`

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
primary: {
  600: '#dc2626', // Your brand color
}
```

### Add Logo
Replace `/public/images/logo.png` with your logo

### Update Company Info
Edit company details in components/layout/Layout.js

---

**You're all set! Happy building! 🚀**

Need help? Contact: support@skprinters.com
