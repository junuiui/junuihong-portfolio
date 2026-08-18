# CI/CD Pipeline 기본 개념 


## CI/CD 핵심 개념
- **CI** (Continuous Integration): 개발자가 작성한 코드를 중앙 Repo에 주기적으로 병합하고, 자동화된 `Build`와 `Test`를 거쳐 코드의 결함을 조기에 발견하는 프로세스
- **CD** (Continuous Delivery / Deployment)
  - `Continuous Delivery`: 빌드 및 테스트를 통과한 코드가 Production 배포 직전 단계 (Staging)까지 자동으로 준비되는 과정
  - `Continuous Deployment`: 사람의 개입 없이 테스팅 환경을 통과한 코드가 Production 까지 자동 배포

## Pipeline 주요 구성 요소
1. `Trigger`: Pipeline을 실행시키는 이벤트 (`git push`, PR merge, Schedule)
2. `Runner / Agent`: Pipeline Job이 실제 실행되는 격리된 VM / Container
3. `Job`: 동일한 Runner 순차적으로 실행되는 Step들의 집합 
4. `Step`: Shell Script 실행이나 정의된 Action/Task 를 수행하는 최소 실행 단위

### Example
```yaml
name: CI/CD Preview

# Trigger
on:
    push:
        branches: [ "main" ]

# Jobs
jobs:
    build-and-test-code:
        # Select OS
        runs-on: ubuntu-latest

        steps:
            # Code Checkout
            - name: Checkout Repo
            uses: actions/checkout@v3
            
            # Runtime Environment
            - name: Set up Python
            uses: actions/setup-python@v4
            with:
                python-version: "3.11"
            
            # Dependencies Install and Build
            - name: Install Dependencies
            run: |
                python -m pip install --upgrade pip
                pip install -r requirements.txt
            
            # Automate testing
            - name: Run Unit tests
            run: |
                pytest tests/
    
    deploy: 
        # build-and-test-code Job이 성공하면 실행
        needs: build-and-test-code
        runs-on: ubuntu-latest

        steps:
            - name: Deploy to Target Server
              run: |
                echo "Deploying application to production server"

```