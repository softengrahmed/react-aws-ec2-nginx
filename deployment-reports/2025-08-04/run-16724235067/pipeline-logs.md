# Pipeline Execution Logs

**Run ID:** 16724235067  
**Timestamp:** 2025-08-04 13:18:11 UTC  
**Workflow:** 🚀 Resilient React Serverless Pipeline  
**Event:** push  
**Branch:** main  

## 📁 Detailed Log Files

### Build Stage Logs
- **File:** [`logs/build-log-16724235067.txt`](./logs/build-log-16724235067.txt)
- **Content:** React application build process, npm operations, and build strategies
- **Attempts:** 1
- **Recoveries:** 0
- **Status:** true

### Deployment Stage Logs  
- **File:** [`logs/deploy-log-16724235067.txt`](./logs/deploy-log-16724235067.txt)
- **Content:** AWS S3 deployment, CloudFront/Website setup, and resource configuration
- **Strategy:** s3_website
- **Attempts:** 1
- **Recoveries:** 0
- **Status:** success
- **Frontend URL:** http://react-serverless-16724235067.s3-website-us-east-1.amazonaws.com
- **CloudFront URL:** 

### API Stage Logs
- **File:** [`logs/api-log-16724235067.txt`](./logs/api-log-16724235067.txt)
- **Content:** AWS Lambda function creation, API Gateway setup, and serverless configuration
- **Attempts:** 0  
- **Recoveries:** 0
- **API URL:** 

### Verification Stage Logs
- **File:** [`logs/verify-log-16724235067.txt`](./logs/verify-log-16724235067.txt)
- **Content:** Deployment verification, URL testing, and connectivity diagnostics
- **Attempts:** 1
- **Recoveries:** 0  
- **Status:** success

## 📊 Summary
- **Total Recoveries:** 0
- **Overall Status:** SUCCESS
- **Monthly Cost:** $0.00
- **Log Files Generated:** 4

## 🔍 Log File Details

All log files contain:
- Precise timestamps for each operation
- Stage-specific identifiers ([BUILD-STAGE], [DEPLOY-STAGE], etc.)
- Detailed error messages and recovery steps
- Resource configuration and validation results
- Performance metrics and timing information

## 📖 How to Read the Logs

1. **Build Logs:** Track npm operations, dependency installation, and build strategies
2. **Deploy Logs:** Monitor S3 bucket creation, file uploads, and hosting configuration
3. **API Logs:** Follow Lambda function creation, IAM role setup, and API Gateway configuration
4. **Verify Logs:** See connectivity tests, response validation, and endpoint verification
