- [EC2 (Elastic Compute Cloud)](#ec2-elastic-compute-cloud)
  - [What is?](#what-is)
  - [When to Use](#when-to-use)
- [Types of purchasing options \& Instances](#types-of-purchasing-options--instances)
  - [Purchasing Options](#purchasing-options)
  - [Instance Families](#instance-families)
- [Good to know](#good-to-know)

# EC2 (Elastic Compute Cloud)
## What is?
- Virtual Machine Service that is virtual server which AWS provides
- Having Root/Admin administrative to have their own Compute/OS

## When to Use
- Use EC2 when you need absolute control over the operating system environment, custom network configurations, or specific kernel modifications that managed or serverless services cannot accommodate.

---

# Types of purchasing options & Instances
## Purchasing Options
- **On-Demand**
  - No Contract
  - Pay for usage (seconds/minutes)
  - Good for unpredictable short-term usage
- **Reserved Instances / Saving Plans**
  - 1 / 3 years contract (72% Saving)
  - Good for Steady-state 
- **Spot Instance**
  - Using unused resources from AWS (90% Saving)
  - But, if AWS needed those resources (2 minutes notification), Termination
  - Good for *stateless* or *batching*

## Instance Families
- **General Purpose**
  - `M`, `T`
    - Balanced - CPU, Memory, Network 
    - Good for small webserver
- **Compute Optimized**
  - `C` - Computing
    - High-performance processor
    - good for Big data, encoding
- **Memory Optimized**
  - `R`, `X` - Optimized Memory
    - Big Memory Data 
    - Good for Redis, Big database

---

# Good to know
- **EBS** vs **Instance Store**
  - **EBS**
    - Virtual Network Disk
    - Persistent Storage - Data survives instance STOP. (Note: Check 'Delete on Termination' attribute when terminating)
  - **Instance Store**
    - Internal disk physically attached to the host hardware.
    - Ephemeral Storage - Permanent Data Loss if instance STOPS or encounters Host Error. Only survives REBOOT.
- **IMDS**
  - Metadata address (`http://169.254.169.254/latest/meta-data/`) to query `Instance ID`, `IP`, `IAM ROLE` inside the EC2 instance.
  - **IMDSv2** utilizes token-based authentication to prevent SSRF vulnerabilities.