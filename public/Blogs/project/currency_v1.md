# Currency Insight Tracker v1
> Automated Event-Driven Serverless Architecture with Infrastructure as Code Governance

## 1. Executive Summary
*Currency Insight Tracker v1* is a **serverless web application** that automatically collects, stores, and displays global exchange rate data.   
The system automatically fetches updates every day and shows historical charts on a user dashboard. Because it uses a serverless cloud structure, it only runs when needed, which keeps operation costs near zero.

- **Role**: Cloud / DevOps Engineer (Sole Developer)
- **Core Metrics**: Saved 40% in hosting costs compared to using a standard permanent server (EC2) and automated 100% of the setup using code to stop manual mistakes.

---

## 2. Architecture & Data Flow
The project is divided into three simple layers: the frontend website, the backend API, and the daily automated data collector.

![v1 Diagram](/v1_diagram.jpg)

### Website Delivery
- Users open the React website through *Amazon CloudFront*.
- *Amazon CloudFront* delivers the web files globally from a private *Amazon S3 bucket*.
- Access is managed by *Origin Access Control* (OAC), meaning the *S3 bucket* is completely blocked from the public internet for security.

### Backend API & User Queries
- When a user looks at historical data on the dashboard, the request goes to *Amazon API Gateway*.
- *API Gateway* starts an *AWS Lambda* function that handles the backend logic.
- The *Lambda function* reads the requested data from *Amazon DynamoDB* and sends it back to the website.

### Daily Data Ingestion
- *Amazon EventBridge* acts as a timer to start a data-collection *AWS Lambda* function every day.
- This function downloads the latest exchange rates from an external financial API and saves the data into the database.
  
---
## 3. The Problems & Why
Building cloud services by manually clicking buttons in the AWS Console causes problems with replication, high costs, and slow speed. This project was made to solve three main issues:

### Problem 1: Manual Setup and Mistakes
- **Problem**: Setting up cloud resources manually makes it hard to recreate the same setup later and often leads to configuration mistakes.
- **Solution**: Used *Terraform* to write down the entire infrastructure as code. This allows the system to build the exact same environment automatically every time.

### Problem 2: Fixed Costs for Low Traffic
- **Problem**: Paying for a standard continuous cloud server means getting billed 24/7, even when no users are visiting the site.
- **Solution**: Chose AWS serverless services (*Lambda*, *API Gateway*, *DynamoDB*) with a pay-per-use plan. If no one uses the app, the cost drops to almost zero.

### Problem 3: Slow Website Load Times
- **Problem**: Loading website files from one far-away data center makes the app slow for international users.
- **Solution**: Connected the *S3 storage bucket* to *Amazon CloudFront*. This copies the website files to servers all over the world so users can open the site instantly.

## 4. Technical Decisions & Deep Dive
### Keeping S3 Private: Origin Access Control (OAC)
- **Decision**: Kept the *S3 storage* bucket completely private and allowed access only through CloudFront.
- **Why**: Making an *S3 bucket* public can expose files to unauthorized users. By using *OAC*, only CloudFront is allowed to read files from the bucket, making the website much more secure.

### Choosing NoSQL: Amazon DynamoDB
- **Decision**: Used *Amazon DynamoDB* in on-demand mode to store time-series exchange rate data.
- **Why**: Exchange rate tracking requires saving new numbers daily and quick lookups. *DynamoDB* handles this data very fast without the high cost or complex setup of traditional databases.

### Splitting Lambda Roles
- **Decision**: Created two separate *AWS Lambda* functions with their own access permissions.
- **Why**: Following basic security rules, the *API function* is only allowed to read from the database, while the daily data-collector function is only allowed to write to it. If one function fails, the other remains safe.

## 5. CI/CD
Whenever new code is pushed to GitHub, a continuous deployment pipeline built with GitHub Actions automatically deploys the changes to AWS without any manual work.

### Pipeline Highlights
- **Secure Credentials**: Sensitive keys and API links are safely saved inside GitHub Environment Secrets to keep them hidden from the public.
- **Faster Builds**: The pipeline uses Node.js 24 and caches dependencies to save time during deployment.
- **Instant Updates**: The pipeline automatically clears the CloudFront cache right after uploading new files, ensuring users see website changes immediately.

```yaml
name: Deploy Frontend to S3 and CloudFront

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: aws-currency
    defaults:
      run:
        working-directory: ./front

    steps:
      - name: Checkout Code
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'npm'
          cache-dependency-path: './front/package-lock.json'

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v6.1.0
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync ./dist s3://${{ secrets.S3_BUCKET_NAME }} --delete

      - name: CloudFront Invalidation
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

## 6. Retrospective
### Lessons Learned
- **Cost Efficiency**: The pay-per-use serverless system worked as planned, keeping bills extremely low during development.
- **Easy Management with Code**: Using Terraform made it incredibly easy to update cloud settings later, proving that managing infrastructure with code is essential.
### System Limitations
- **Cold Starts**: When the application was not used for a while, the next user had to wait a few seconds for AWS Lambda to start up, making the performance inconsistent.
- **No Network Boundary**: Because the serverless functions used open public internet links, there was no private corporate network to isolate internal database traffic.

## Next Steps
To fix the startup delays, create a secure private network, and use modern Docker containers, this project evolved into Currency Insight Tracker 2. The new version moves the backend into a private custom VPC using AWS ECS Fargate for permanent uptime and better network security.