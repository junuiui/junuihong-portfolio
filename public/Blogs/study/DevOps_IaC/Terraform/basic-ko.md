# Terraform 기본

## 작동 원리 및 핵심 구성
- `Declarative`: 인프라의 현재 상태를 어떻게 만들 것인가에 대한 과정이 아니라, "최종적으로 어떤 상태여야 하는거" 를 HCL 로 정의. (**What**)
  - Imperative: 절차 (**How**)
- **State File** (`terraform.tfstate`): 실제 배포된 인프라의 현재 상태를 기록하는 JSON 파일. Terraform은 HCL 코드와 tfstate를 비교하여 변경 사항 (Diff)를 꼐산

## 주요 Workflow 명령어
1. `terraform init`: Provider Plugins download 및 backend 초기화
2. `terraform plan`: 코드 변경 사항이 실제 인프라에 적용될 때 생성/수정/삭제될 자원 예고 (Dry-run)
3. `terraform apply`: 인프라 실제 생성 및 수정 반영 (tfstate 업데이트)
4. `terraform delete`: 생성된 모든 인프라 자원 삭제

### Example
```terraform
# 1. Provider 설정 (Azure 예시)
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 2. 변수 정의 (Variables)
variable "location" {
  type        = string
  default     = "East US"
  description = "Azure Region target"
}

# 3. 인프라 자원 선언 (Resource)
# azurerm_resource_group 타입의 자원을 "rg"라는 내부 이름으로 생성
resource "azurerm_resource_group" "rg" {
  name     = "d3-devops-rg"
  location = var.location
}

# 4. 출력값 정의 (Outputs)
output "resource_group_id" {
  value       = azurerm_resource_group.rg.id
  description = "The ID of the created Resource Group"
}
```