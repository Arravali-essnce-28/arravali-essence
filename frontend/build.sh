#!/bin/bash

echo "🚀 Building Arravali Essence for Production..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Create deployment directory
echo "📁 Creating deployment package..."
mkdir -p deployment
cp -r dist/* deployment/

echo "✅ Build complete! Files ready in ./deployment/"
echo "🌐 Frontend built successfully for production!"
