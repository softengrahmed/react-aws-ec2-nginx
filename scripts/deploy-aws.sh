#!/bin/bash

# AWS Serverless Deployment Script for React Application
# Designed for AWS CloudShell or CodeBuild execution
# Budget Tier: $5-25/month with optimizations

set -e

# Configuration
APP_NAME="react-app-serverless"
AWS_REGION="${AWS_REGION:-us-east-1}"
ENVIRONMENT="${ENVIRONMENT:-staging}"
BUILD_DIR="./build"

# Color output for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Validate prerequisites
log_info "Validating AWS CLI configuration..."
if ! aws sts get-caller-identity &>/dev/null; then
    log_error "AWS CLI not configured. Please configure AWS credentials."
fi

# Generate unique identifiers
TIMESTAMP=$(date +%Y%m%d%H%M%S)
DEPLOYMENT_ID="deploy-${TIMESTAMP}-${RANDOM}"
S3_BUCKET="${APP_NAME}-${ENVIRONMENT}-$(aws sts get-caller-identity --query Account --output text)"
CLOUDFRONT_COMMENT="${APP_NAME} ${ENVIRONMENT} Distribution"

log_info "Starting deployment: ${DEPLOYMENT_ID}"
log_info "Environment: ${ENVIRONMENT}"
log_info "Region: ${AWS_REGION}"

# Build application if not already built
if [ ! -d "$BUILD_DIR" ]; then
    log_info "Building React application..."
    npm install --legacy-peer-deps
    npm run build
fi

# Create S3 bucket
log_info "Setting up S bologS3 bucket: ${S3_BUCKET}"
if ! aws s3api head-bucket --bucket "${S3_BUCKET}" 2>/dev/null; then
    log_info "Creating S3 bucket..."
    if [ "${AWS_REGION}" == "us-east-1" ]; then
        aws s3api create-bucket --bucket "${S3_BUCKET}" --region "${AWS_REGION}"
    else
        aws s3api create-bucket --bucket "${S3_BUCKET}" --region "${AWS_REGION}" \
            --create-bucket-configuration LocationConstraint="${AWS_REGION}"
    fi
    
    # Enable versioning for rollback capability
    aws s3api put-bucket-versioning --bucket "${S3_BUCKET}" \
        --versioning-configuration Status=Enabled
    
    # Configure for static website hosting
    aws s3 website "s3://${S3_BUCKET}" \
        --index-document index.html \
        --error-document error.html
    
    # Add bucket policy for CloudFront access
    cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${S3_BUCKET}/*"
        }
    ]
}
EOF
    aws s3api put-bucket-policy --bucket "${S3_BUCKET}" --policy file:///tmp/bucket-policy.json
fi

# Upload files to S3
log_info "Uploading files to S3..."
aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "service-worker.js" \
    --exclude "manifest.json"

# Upload HTML files with different cache settings
aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" \
    --exclude "*" \
    --include "*.html" \
    --include "service-worker.js" \
    --include "manifest.json" \
    --cache-control "public, max-age=0, must-revalidate" \
    --content-type "text/html"

# Check for existing CloudFront distribution
log_info "Checking for existing CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='${CLOUDFRONT_COMMENT}'].Id" \
    --output text)

if [ -z "${DISTRIBUTION_ID}" ]; then
    log_info "Creating CloudFront distribution..."
    
    # Create CloudFront distribution configuration
    cat > /tmp/cf-config.json <<EOF
{
    "CallerReference": "${DEPLOYMENT_ID}",
    "Comment": "${CLOUDFRONT_COMMENT}",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-${S3_BUCKET}",
                "DomainName": "${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 1,
                        "Items": ["TLSv1.2"]
                    }
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-${S3_BUCKET}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {"Forward": "none"},
            "Headers": {
                "Quantity": 0
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true,
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        }
    },
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
    }
}
EOF
    
    DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config file:///tmp/cf-config.json \
        --query 'Distribution.Id' \
        --output text)
    
    log_info "CloudFront distribution created: ${DISTRIBUTION_ID}"
    log_info "Waiting for distribution to be deployed (this may take 10-15 minutes)..."
else
    log_info "Using existing CloudFront distribution: ${DISTRIBUTION_ID}"
    
    # Invalidate cache
    log_info "Creating cache invalidation..."
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "${DISTRIBUTION_ID}" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    log_info "Cache invalidation created: ${INVALIDATION_ID}"
fi

# Get CloudFront domain
CF_DOMAIN=$(aws cloudfront get-distribution \
    --id "${DISTRIBUTION_ID}" \
    --query 'Distribution.DomainName' \
    --output text)

# Create deployment summary
log_info "\n========== DEPLOYMENT COMPLETE =========="
log_info "Deployment ID: ${DEPLOYMENT_ID}"
log_info "S3 Bucket: ${S3_BUCKET}"
log_info "CloudFront Distribution: ${DISTRIBUTION_ID}"
log_info "CloudFront URL: https://${CF_DOMAIN}"
log_info "S3 Website URL: http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com"
log_info "========================================="

# Save deployment info
cat > deployment-info.json <<EOF
{
    "deploymentId": "${DEPLOYMENT_ID}",
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "environment": "${ENVIRONMENT}",
    "region": "${AWS_REGION}",
    "s3Bucket": "${S3_BUCKET}",
    "cloudFrontId": "${DISTRIBUTION_ID}",
    "cloudFrontUrl": "https://${CF_DOMAIN}",
    "s3WebsiteUrl": "http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com"
}
EOF

log_info "Deployment info saved to deployment-info.json"
log_info "Access your application at: https://${CF_DOMAIN}"