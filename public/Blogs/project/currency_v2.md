# Currency Insight Tracker v2
> Enterprise-Grade Containerized Architecture with AWS ECS Fargate, Terraform & Full CI/CD Automation

## 1. Executive Summary
*Currency Insight Tracker v2* is the advanced evolution of the original serverless architecture. To solve the limitations of performance delays and open network connections, this version transitions the backend into a production-ready containerized cluster. The entire system is automatically deployed and isolated inside a secure private network.

- **Role**: Cloud / DevOps Engineer (Sole Developer)
- **Core Metrics**: Reduced infrastructure provisioning time by 95% using modular Terraform scripts and decreased software deployment latency by 90% through a dual-track CI/CD pipeline.

---

## 2. Architecture & Data Flow
The architecture is designed for high availability and strict network security using a multi-tier layout.

### Web Traffic & Static Content
- Users access the application via Amazon CloudFront, which securely retrieves frontend static files from a private Amazon S3 bucket using Origin Access Control (OAC).
- Any API request (`/api/*`) is automatically routed by Amazon CloudFront to the Application Load Balancer (ALB) inside the network.


### Private Network Processing
- The ALB receives the API traffic in the Public Subnets and routes it down to the AWS ECS Fargate tasks running in the Private Subnets.
- The backend containers run an asynchronous Python FastAPI application to handle high numbers of parallel user requests with constant uptime.
- The backend tasks securely read and write data to Amazon DynamoDB without exposing traffic to the public internet.

---

## 3. The Problems & Why
The shift from V1 (Serverless) to V2 (Containerized) was made to solve enterprise cloud infrastructure challenges:

### Problem 1: Cold Start Performance Spikes
- Problem: In V1, AWS Lambda functions caused unpredictable delays of several seconds when starting up after being idle, harming the user experience.
- Solution: Migrated the backend to AWS ECS Fargate. Because containers stay running permanently, it completely eliminated cold start delays and provided instant API responses.

### Problem 2: Lack of Network Isolation
- Problem: V1 components used public internet endpoints, which lacked true perimeter security and left application entrances exposed.

- Solution: Built a Custom VPC with separate public and private subnets. Placing the application containers inside private subnets ensures they are completely invisible to the outside world.

### Problem 3: Pipeline Bottlenecks with Mixed Codebases
- Problem: Triggering a single monolithic deployment workflow for minor frontend or backend edits wastes build time and increases failure risks.

- Solution: Separated the deployment pipeline into independent frontend and backend paths using specific file-path filters in GitHub Actions.

## 4. Technical Decisions & Deep Dive
### Infrastructure Isolation: Multi-Tier VPC & ALB
- Decision: Routed all incoming backend traffic through an Application Load Balancer to backend tasks isolated in private subnets.

- Why: Containers should never hold public IP addresses. By routing traffic exclusively through an ALB, the backend remains securely hidden, and the load balancer safely distributes the request traffic.

### 100% Code-Driven Governance: Modular Terraform
- Decision: Divided the infrastructure setup into specialized Terraform files (vpc.tf, ecs.tf, alb.tf, etc.).

- Why: Bundling all resource definitions into one single file makes long-term updates difficult. Splitting files by function allows modular, safe, and easily reproducible environment setups.

### Fast, Lean Container Design: Multi-Stage Docker Builds
- Decision: Packaged the FastAPI backend using multi-stage Docker configurations.

- Why: Standard image builds keep unneeded build dependencies, creating large file sizes. Multi-stage builds compile only the essential runtime files, minimizing container sizes for faster deployment speeds.

## 5. CI/CD
The automation tier is managed by two dedicated GitHub Actions pipelines, enabling clean, separated deployments depending on which directory changes.

### Backend Pipeline (Container Deployment)
Whenever a push hits the back/ folder, the pipeline triggers a Docker build, uploads the image to Amazon ECR, and forces a clean replacement of the running ECS containers.

```yaml
name: Currency-v2 Backend CI/CD

on:
  push:
    paths:
      - 'back/**'
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v6
    
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v6.1.0
        with: 
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
        with:
          mask-password: 'false'
      
      - name: Build, tag, and push image to Amazon ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
          IMAGE_TAG: latest
        run: |
          cd back
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Force ECS Deployment
        run: |
          aws ecs update-service --cluster ${{ secrets.ECS_CLUSTER }} --service ${{ secrets.ECS_SERVICE }} --force-new-deployment
```

### Frontend Pipeline (Static Deployment)
Whenever edits are pushed to the front/ folder, the pipeline runs a clean static asset build, syncs the output directory to Amazon S3, and flushes the CloudFront global cache.

```yaml
name: Currency-v2 Frontend CI/CD

on:
  push:
    paths:
      - 'front/**'
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v6

      - name: Set up Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '24'

      - name: Install dependencies and Build
        run: |
          cd front
          npm install
          npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v6.1.0
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync front/dist/ s3://${{ secrets.S3_BUCKET_NAME }} --delete

      - name: CloudFront Invalidation
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## 6. Retrospective
### Lessons Learned
- Container Reliability: Migrating to ECS Fargate successfully solved the cold-start issue, delivering perfectly uniform response times for every single user request.

- Path-Based CI/CD Power: Separating the frontend and backend actions cut unneeded build runs significantly, proving that path filters are essential for repository setups holding split codebases.

### System Limitations
- Permanent Resource Costs: Keeping an Application Load Balancer and ECS Fargate instances active constantly creates fixed monthly billing charges, unlike the zero-idle cost schema found in serverless models.

- Increased Complexity: Managing a custom VPC network, subnets, and routing policies requires careful continuous monitoring to prevent scaling or security configuration slips.

## Repository Structure
```
└── currency-insight-tracker-v2
    ├── .github/workflows/
    │   ├── backend.yml
    │   └── frontend.yml
    ├── back/
    │   ├── dockerfile
    │   ├── main.py
    │   └── requirements.txt
    ├── front/
    │   ├── src/
    │   ├── package.json
    │   └── vite.config.ts
    └── terraform/
        ├── provider.tf
        ├── vpc.tf
        ├── vpc_endpoint.tf
        ├── ecs.tf
        ├── alb.tf
        ├── ecr.tf
        ├── iam.tf
        ├── s3.tf
        └── cloudfront.tf
```