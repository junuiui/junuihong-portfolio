# IAM Core 

## 1. Identity & Access

|Target|Key Characteristics|Interview / Exam Points|
|-|-|-|
|User| Real Person (1:1 relationship) | Uses long-lived credentials (Passwords, Access Keys).|
|Group| Collection of Users | Maximizes efficiency in permission management. Policies are attached to the group, not individual users.|
|Role| AWS Services (EC2, Lambda) or External Identities | Uses temporary credentials. Most secure approach; requires the `AssumeRole` process.|

---

### Policy

- **Effect**
  - Defaults to `Allow`.
  - An explicit `Deny` overrides any allows (**Deny Priority** / **Explicit Deny**).
- **Resource**
  - `arn:aws:s3:::bucket` (Bucket-level permissions)
  - `arn:aws:s3:::bucket/*` (Object-level permissions)
- **Condition**
  - `aws:SourceIP` (Restricts access to specific IP addresses)
  - `aws:RequestedRegion` (Restricts access to specific AWS Regions)

---

## 2. Organizations & Governance

- **SCP** (Service Control Policy)
  - **Role:**
    - Defines the maximum available permissions (**Guardrail**) for member accounts.
  - **Key Characteristics:**
    - Even if an `IAM Policy` explicitly states `Allow`, access is strictly blocked if the `SCP` states `Deny`.
    - Does not apply to the **Management Account** (Root account).
  - **Scenario:**
    - To centrally prohibit all development team accounts from launching expensive instance types across the entire organization -> Apply an **SCP**.

- **AWS Control Tower**
  - **Role:**
    - A managed service that automates the setup of multi-account environments based on AWS **Best Practices**.
  - **Guardrails:**
    - Categorized into **Preventive Guardrails** (SCP-based, completely blocks unauthorized actions) and **Detective Guardrails** (AWS Config-based, identifies and flags compliance violations).

---

## 3. Enterprise Identity

- **IAM Identity Center (SSO)**
  - **Core Concept:**
    - Enables users to log into multiple AWS accounts and business applications (e.g., Slack) with a single set of credentials.
  - **Permission Sets:**
    - Centrally manages a collection of permissions that can be assigned across various AWS accounts.
- **Directory Service** (Active Directory Integration)
  - **AD Connector:**
    - Acts strictly as a proxy redirecting authentication requests to an On-Premises AD. It does not cache or store any directory information.
  - **Managed Microsoft AD:**
    - Runs an actual Microsoft Active Directory service inside the AWS cloud. It allows you to establish a **Trust Relationship** with your On-Premises AD.
  - **Simple AD:**
    - A low-cost, standalone directory service. It does not support trust relationships and is designed for small-scale environments.

---

## 4. Audit & Best Practices
- **Credential Report**
  - An account-level audit report. Used to inspect credential usage and check which users do not have **MFA** enabled.
- **Access Advisor**
  - A user-level utility. Inspects when a specific permission was last accessed to help enforce the **Principle of Least Privilege**.
- **Permissions Boundary**
  - Sets the absolute ceiling for maximum permissions an IAM entity can possess. It is primarily used to prevent delegated administrators from elevating their own privileges to full Admin.

---

# Scenario Drill

### Q1. The IAM policy is configured correctly, but an EC2 instance still cannot access S3. What are the potential root causes?
**A:** Access could be blocked by a higher-level **SCP (Service Control Policy)** at the AWS Organizations level, or the required S3 permission might be missing from the instance's **Permissions Boundary**.

---

### Q2. You need to upload files to an S3 bucket in a different AWS account, but you must also retain your current account's access to a DynamoDB table. How would you design this?
**A:** I would configure a **Resource-based Policy (Bucket Policy)** on the destination S3 bucket in the target account to explicitly grant cross-account write permissions to my IAM identity. *Using an IAM Role in this scenario is inappropriate because assuming a cross-account role would require me to temporarily drop my current account's DynamoDB permissions.*

---

### Q3. How do you globally prohibit the creation of resources outside of a few specific AWS regions across the entire company?
**A:** I would implement a centralized **Organizations SCP** utilizing a `Deny` effect coupled with a `Condition` block that targets `aws:RequestedRegion`, blocking any API requests that do not match the whitelisted regions.