#!/bin/bash

# SK Printers Website - Automated Setup Script
# This script will help you set up the project quickly

echo "🚀 SK Printers Website - Automated Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
else
    echo -e "${GREEN}✓ Node.js is installed: $(node --version)${NC}"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
else
    echo -e "${GREEN}✓ npm is installed: $(npm --version)${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo "⚙️  Setting up environment variables..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local file${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your MongoDB connection string${NC}"
else
    echo -e "${YELLOW}⚠️  .env.local already exists${NC}"
fi

echo ""
echo "Creating uploads directory..."
mkdir -p uploads/products uploads/blogs uploads/general
echo -e "${GREEN}✓ Uploads directory created${NC}"

echo ""
echo "========================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your MongoDB URI"
echo "2. Run: npm run dev:all"
echo "3. Open http://localhost:3000"
echo ""
echo "For detailed instructions, see START_HERE.md"
echo "========================================"
