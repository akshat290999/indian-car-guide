#!/bin/bash

# Exit immediately if any command fails
set -e

# 1. LIVE PRODUCTION DETAILS
BUCKET_NAME="indian-car-guide-frontend-1779267092"
DISTRIBUTION_ID="E3R33265D081BW"

echo "=========================================="
echo "🚀 STARTING LIVE AWS PRODUCTION DEPLOYMENT"
echo "=========================================="

echo "📦 1/3 Compiling fresh React application (Vite)..."
npm run build

echo "☁️ 2/3 Syncing fresh 'dist' folder directly to live S3 bucket..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "🧹 3/3 Invalidating CloudFront cache to force updates live..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "🌍 Check your live site: https://d1m68rrd1mp2k5.cloudfront.net"
echo "⏳ Give it 30-60 seconds for the cache wipe to sync globally."
echo "=========================================="