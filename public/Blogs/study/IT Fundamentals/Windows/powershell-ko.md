# Powershell
> PowerShell 은 Bash와 달리 String이 아닌 Object 기반으로 Pipeline Data를 전달

## Cmdlet Naming Convention (Cmdlet 명명 규칙)
> Powershell 의 모든 기본 명령어(Cmdlet)은 Verb-Noun 구조

- **Get**: 정보조회 (`Get-Process`, `Get-Service`, `Get-Content`)
- **Set / Update**: 설정 변경 (`Set-ExecutionPolicy`, `Set-Content`)
- **Start / Stop**: 프로세스 및 서비스 제어 (`Start-Service`, `Stop-Process`)
- **New / Remove**: 리소스 생성 및 삭제 (`New-Item`, `Remove-Item`)

### Example
```powershell
# 예시: 특정 서비스 상태 조회 및 중지
Get-Service -Name "W3SVC"
Stop-Service -Name "W3SVC" -Force
```

## Variables & Data Types 
> 변수명은 항상 `$` 기호로 시작하며 시본적으로 Type이 자동 지정.   
> 명시적 타입 (Strongly Typed) 가능

### Example
```powershell
# 변수 선언 및 할당
$serviceName = "web-prod-01"
$port = 443
$isProduction = $true

# Array / Hash Table
$ports = @(80, 443, 8080)
$config = @{
    Environment = "Production"
    MaxConnections = 100
}

# String Interpolation
Write-Host "Connecting to $serverName on port $port"
Write-Host "Target Environment: $($config.Environment)"
```

## Pipeline
> Object 를 옮김

### Example
```powershell
# CPU 사용량이 높은 프로세스 상위 5개 추출
# $_ 는 파이프라인을 지나가는 현재 객체(Current Object)를 의미함
Get-Process | Where-Object { $_.CPU -gt 5 } | Sort-Object CPU -Descending | Select-Object -First 5 -Property Name, CPU, Id
```

## Comparison Operators
| Operator      | Meaning                 | Example                    |
| :------------ | :---------------------- | :------------------------- |
| `-eq`         | Equal                   | `$status -eq "Running"`    |
| `-ne`         | Not Equal               | `$port -ne 80`             |
| `-gt` / `-ge` | Greater Than / or Equal | `$cpu -gt 80`              |
| `-lt` / `-le` | Less Than / or Equal    | `$count -le 10`            |
| `-like`       | Wildcard Matching       | `$name -like "*nginx*"`    |
| `-match`      | Regex Matching          | `$log -match "^ERR[0-9]+"` |

## Control Flow
```powershell
# 1. Conditionals (조건문)
$threshold = 90
$currentCpu = 95

if ($currentCpu -ge $threshold) {
    Write-Warning "CPU usage exceeded threshold: $currentCpu%"
} elseif ($currentCpu -ge 70) {
    Write-Host "CPU usage is moderate: $currentCpu%"
} else {
    Write-Host "CPU usage is normal."
}

# 2. Loops (반복문)
$services = @("W3SVC", "Spooler", "wuauserv")

foreach ($svc in $services) {
    $status = (Get-Service -Name $svc -ErrorAction SilentlyContinue).Status
    if ($status -eq "Running") {
        Write-Host "Service $svc is ACTIVE"
    } else {
        Write-Warning "Service $svc is NOT running"
    }
}
```

## Functions & Parameters (함수 및 파라미터)
> 재사용 가능한 스크립트 블록을 정의할 때 param 블록을 사용하여 입력을 받음

### Example
```powershell
function Test-PortConnection {
    param (
        [Parameter(Mandatory=$true)]
        [string]$TargetHost,

        [int]$Port = 443
    )

    Write-Host "Testing connection to $TargetHost on port $Port..."
    $result = Test-NetConnection -ComputerName $TargetHost -Port $Port

    if ($result.TcpTestSucceeded) {
        Write-Host "Connection Successful!" -ForegroundColor Green
    } else {
        Write-Error "Connection Failed to $TargetHost:$Port"
    }
}

# 함수 호출 예시
Test-PortConnection -TargetHost "example.com" -Port 443
```

## Error Handling (예외 처리)
> PowerShell에서 non-terminating error(중단되지 않는 에러)를 `catch` 블록으로 넘기려면 `-ErrorAction Stop` 옵션을 지정하거나 `$ErrorActionPreference`를 변경해야 함

### Example
```powershell
# 에러 발생 시 진행을 멈추고 catch 블록으로 이동하도록 설정
$ErrorActionPreference = "Stop"

try {
    # 존재하지 않는 파일 읽기 시도
    $logData = Get-Content -Path "C:\logs\non_existent_file.log"
} catch {
    # $_ 변수에 예외 객체 정보가 담김
    Write-Error "Failed to read log file. Message: $($_.Exception.Message)"
} finally {
    Write-Host "Cleanup or log file processing step completed."
}
```