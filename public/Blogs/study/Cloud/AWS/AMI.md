# AMI (Amazon Machine Image)

## Overview
- *customization* of an EC2 instance
  - You add your own software, configuration, operating system, monitoring
  - Faster boot / configuration time because all your software is pre-packed
- Can be copied across region
- You can launch EC2 instances from:
  - **A Public AMI**: AWS provided
  - **Your own AM**I: you make and maintain them yourself
  - **an AWS Marketplace AMI**: someone else made
- Auto Scaling
- Recovery

## Process
- Start EC2 instance and customize
- Stop the instance (for data integrity) - *Important*
- Build an AMI - this will also create EBS Snapshot
- Launch instances from other AMIs
