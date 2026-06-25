# IAM Core 

## 1. Identity & Access

|대상|핵심 특징|시험 포인트|
|-|-|-|
|User| Real Person (1:1) | 장기 자격 증명 (PW, Access Key) 사용|
|Group| 유저들의 집합 | 권한 관리의 효율성. 유저 개인이 아닌 그룹에 정책 부여|
|Role| 서비스 (EC2, Lambda) 또는 외부인 | 임시 자격 증명. 가장 안전. `AssumeRole` 과정 필요|

---

### Policy

- **Effect**
  - `Allow` 가 기본.
  - 하나라도 `Deny`가 있으면 무조건 차단 (`Deny Priority`)
- **Resource**
  - `arn:aws:s3:::bucket` (버킷)
  - `arn:aws:s3:::bucket/*` (객체 수준)
- **Condition**
  - `aws:SourceIP` (특정 IP)
  - `aws:RequestedRegion` (특정 Region)

---

## 2. 조직 관리 및 거버넌스 (Organizations & Governance)

- **SCP** (Service Control Policy)
  - **역할**
    - 계정이 사용할 수 있는 **최대 권한 (Guardrail)** 을 정의.
  - **특징**
    - `IAM` 정책이 아무리 `Allow` 여도 `SCP` 에서 `Deny` 하면 절대 물가. 
    - `Management Account`에는 적용 안됨
  - **시나리오**
    - 모든 개발팀 계정에서 특정 비싼 instance 사용을 전사적으로 막고 싶다
      - **SCP** 적용

- **AWS Control Tower**
  - **역할**
    - 여러 계정을 `Best Practice`에 맞춰 *자동으로 셋업* 해주는 서비스
  - **Guardrails**
    - `Preventive` (SCP 기반, 아예 못하게 막음)와 `Detective` (Config 기반, 위반 사항 찾아냄)로 구분

---

## 3. 엔터프라이즈 자격 증명 (Enterprise Identity)

- **IAM Identity Center (SSO)**
  - **핵심**
    - 한 번의 로그인으로 여러 AWS 계정과 비지니스 앱 (Slack 등) 접속
  - **Permission Sets**
    - 중앙에서 여러 계정에 적용할 권한 묶음을 관리함
- **Directory Service** (Active Directory 연동)
  - **AD Connector**
    - OnPremise AD 로 로그인을 전달 (proxy) 만 함. 정보 저장 안함
  - **Managed Microsoft AD**
    - AWS 위에서 진짜 AD를 돌림. 
    - OnPremise AD 와 Trust Relationship 형성 가능
  - **Simple AD**
    - 저렴하지만 신뢰 관계 형성 불가
    - 소규모용

---

## 4. 보안 감사 및 베스트 프랙티스 (Audit & Best Practices)
- **Credential Report**
  - 계정 수준 보고서.
  - 누가 MFA 안했나 확인
- **Access Advisor**
  - 유저 수준
  - 실제로 이 권한을 썼나? 확인하여 *Least Privilege* (최소 권한 원칙) 실현
- **Permission Boundary**
  - 유저가 가질 수 있는 최대 한계선 설정.
  - 유저가 스스로 Admin 권한을 만드는 것을 방지할 때 사용

---

# Scenario Drill
1. IAM 정책은 완벽한데 EC2에서 S3 접근이 안 된다. 원인은?
   - 상위 SCP 에서 Deny. Permission Boundary 에 해당 권한이 빠져있을 수 있음

2. 다른 계정의 S3 버킷에 파일을 올려야 하는데, 내 계정의 DynamoDB 접근 권한도 유지해야 한다면?
   - 타겟 계정의 S3에 **Resource-based Policy(버킷 정책)** 를 설정하여 나를 허용하게 함. 
   - (Role을 쓰면 기존 내 권한을 일시 포기해야 하므로 부적절)
   
3. 전사적으로 특정 리전 이외의 리소스 생성을 금지하고 싶다.
   - `Organizations SCP`에서 `Condition`으로 `aws:RequestedRegion`을 제한함
