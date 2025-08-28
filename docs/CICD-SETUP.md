# CI/CD Pipeline Setup Documentation

## Overview

This repository now includes a comprehensive CI/CD pipeline for deploying a React application to AWS Serverless infrastructure (S3 + CloudFront) with a budget-friendly approach ($15-20/month).

## 🚀 Quick Start

### Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **GitHub Secrets**: Configure the following secrets in your repository:
   - `AWS_ACCESS_KEY_ID` (required)
   - `AWS_SECRET_ACCESS_KEY` (required)
   - `SNYK_TOKEN` (optional, for enhanced security scanning)

### Setting Up AWS Credentials

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   ```
   AWS_ACCESS_KEY_ID: Your AWS access key
   AWS_SECRET_ACCESS_KEY: Your AWS secret key
   ```

### IAM Permissions Required

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "cloudfront:*",
        "iam:CreateServiceLinkedRole",
        "iam:GetRole",
        "cloudwatch:PutMetricAlarm",
        "cloudwatch:DeleteAlarms",
        "cloudwatch:DescribeAlarms"
      ],
      "Resource": "*"
    }
  ]
}
```

## 📋 Pipeline Features

### Core Features (Always Included)
- ✅ **Progressive Retry System**: 3-attempt strategy with intelligent backoff
- ✅ **Multi-Stage Architecture**: Build → Test → Scan → Deploy → Verify
- ✅ **Comprehensive Logging**: Structured logs with timestamps
- ✅ **Artifact Management**: Automated log preservation
- ✅ **Cost Optimization**: Resource cleanup and monitoring

### Selected Features
- 🔒 **Security Scanning**: NPM audit, Semgrep, Snyk integration
- 📊 **Quality Gates**: Code coverage (60% threshold), build size limits (10MB)
- 🐳 **Container Security**: Trivy scanning for Docker images

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   GitHub    │────▶│   S3 Bucket │────▶│  CloudFront  │
│   Actions   │     │   (Static)  │     │    (CDN)     │
└─────────────┘     └─────────────┘     └──────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│ CloudWatch  │     │   Backups   │     │    Users     │
│  Monitoring │     │  (Versions) │     │  (HTTPS)     │
└─────────────┘     └─────────────┘     └──────────────┘
```

## 🔄 Workflow Triggers

1. **Automatic Deployment**:
   - Push to `main` branch → Production deployment
   - Push to `develop` branch → Staging deployment

2. **Pull Request Checks**:
   - Security scanning
   - Quality gates
   - Build verification

3. **Manual Deployment**:
   - Use workflow dispatch in GitHub Actions
   - Select environment (staging/production)

## 💰 Cost Breakdown

### Estimated Monthly Costs ($15-20)
- **S3 Storage**: ~$1-2 (for 10GB with moderate traffic)
- **CloudFront**: ~$5-10 (for 100GB transfer)
- **CloudWatch**: ~$1-2 (basic monitoring)
- **GitHub Actions**: Free tier (2000 minutes/month)
- **Buffer**: ~$5-6 for unexpected usage

### Cost Optimization Tips
1. Use CloudFront caching aggressively
2. Enable S3 lifecycle policies
3. Clean up old deployments regularly
4. Monitor CloudWatch costs

## 🚀 Deployment Process

### Automatic Deployment
1. Make changes to your React app
2. Commit and push to `develop` or `main`
3. GitHub Actions automatically:
   - Builds the application
   - Runs tests and security scans
   - Deploys to AWS
   - Provides deployment URLs

### Manual Deployment
1. Go to Actions tab in GitHub
2. Select "Main CI/CD Pipeline"
3. Click "Run workflow"
4. Select branch and environment
5. Click "Run workflow"

## 📊 Monitoring & Alerts

### CloudWatch Dashboards
The pipeline automatically sets up:
- Application availability monitoring
- CloudFront distribution metrics
- S3 bucket metrics
- Cost tracking

### Setting Up Alerts
1. Access AWS CloudWatch Console
2. Navigate to Alarms
3. Set thresholds for:
   - Monthly spend > $25
   - Error rate > 1%
   - Response time > 2s

## 🔒 Security Best Practices

1. **Secrets Management**:
   - Never commit AWS credentials
   - Use GitHub Secrets for sensitive data
   - Rotate credentials regularly

2. **Access Control**:
   - Use least privilege IAM policies
   - Enable MFA on AWS account
   - Review access logs regularly

3. **Dependency Scanning**:
   - Regular npm audit runs
   - Automated security updates
   - Vulnerability notifications

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check Node version compatibility
   node --version  # Should be 18.x
   
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Deployment Failures**:
   - Check AWS credentials in GitHub Secrets
   - Verify IAM permissions
   - Check S3 bucket naming (must be globally unique)

3. **CloudFront 403 Errors**:
   - Verify S3 bucket policy
   - Check CloudFront origin settings
   - Wait for distribution deployment (15-20 mins)

## 📝 Maintenance Tasks

### Weekly
- Review security scan results
- Check cost reports
- Clean up old artifacts

### Monthly
- Update dependencies
- Review and optimize CloudFront caching
- Audit AWS resources

### Quarterly
- Rotate AWS credentials
- Review IAM policies
- Performance optimization

## 🔗 Useful Links

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Best Practices](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

## 📧 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review GitHub Actions logs
3. Open an issue in the repository

---

**Last Updated**: August 28, 2025
**Pipeline Version**: 3.0
**Budget Tier**: Budget ($5-25/month)