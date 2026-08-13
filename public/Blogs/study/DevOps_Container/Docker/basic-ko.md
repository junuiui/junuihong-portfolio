# 1. Containers vs. Virtual Machines & Docker Concepts

## 💡 Image vs. Container
* **Image**: 애플리케이션 코드, 런타임, 의존성, 환경 변수, 설정 파일을 포함하는 **정적이고 불변하는 읽기 전용(Read-only) 템플릿**입니다.
  * *예시*: `python:3.11-slim` 이미지는 Debian Linux 베이스와 최소한의 Python 3.11 환경만 포함된 고정된 청사진 역할을 합니다.
* **Container**: 호스트 OS 위에서 프로세스로 실행되는 **격리되고 실행 가능한 이미지의 인스턴스**입니다. Docker는 기본 이미지 레이어 위에 얇은 **쓰기 가능 레이어(Writable Layer)** 를 추가합니다.
  * *예시*: `docker run -d -p 8080:8080 python-app` 명령어를 실행하면 `python-app` 이미지로부터 라이브 컨테이너 인스턴스가 생성됩니다.

---

## Architectural Comparison: Container vs. VM

| 속성 (Attribute) | 가상 머신 (Virtual Machine, VM) | 컨테이너 (Container) |
| :--- | :--- | :--- |
| **추상화 수준** | 하드웨어 수준 가상화 | OS 수준 가상화 (커널 공유) |
| **격리 메커니즘** | 하이퍼바이저 (예: ESXi, Hyper-V, KVM) | Linux Namespaces 및 cgroups |
| **게스트 OS 요구사항** | VM마다 전체 Guest OS 필요 | Guest OS 없음 (호스트 커널 공유) |
| **부팅 시간** | 수 분 (Minutes) | 수 초 또는 밀리초 (Seconds/Milliseconds) |
| **리소스 오버헤드** | 높음 (수 기가바이트 RAM, 전용 CPU) | 낮음 (수 메가바이트 RAM, 공유 CPU) |

> **현실 세계 비유**
> * **VM**: 전기, 배관, 기초 공사가 모두 독립된 **개별 주택**을 구매하는 것과 같습니다.
> * **컨테이너**: 하나의 대형 아파트 단지에서 **단독 호실을 렌더**하는 것과 같습니다. 개인 주거 공간은 독립되어 있지만, 건물의 기초 구조, 수도관, 전선은 공유합니다.

---

## Key Dockerfile Directives Explained

### `FROM`
* 빌드의 베이스 이미지를 정의합니다.
* *예시*: `FROM python:3.11-slim`
* *상세*: full distribution 태그보다 `slim`이나 `alpine` 같은 최소형 베이스 이미지를 권장합니다. 일반 `python:3.11` 이미지는 약 1GB인 반면, `python:3.11-slim`은 약 150MB입니다. 
* *주의*: `alpine`은 `glibc` 대신 `musl libc`를 사용하므로, `numpy`나 `psycopg2` 같은 C 기반 Python 확장 패키지 컴파일 시 오류가 발생할 수 있습니다.

### `RUN`
* 이미지 빌드 중에 명령어를 실행하고 그 결과를 새로운 이미지 레이어로 커밋합니다.
* *예시*: `RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*`
* *상세*: `apt-get update`와 `apt-get install`은 항상 `&&`를 사용해 **한 줄의 RUN 명령어로 체이닝**해야 합니다. 줄을 나누면 Docker가 `apt-get update` 레이어를 캐싱하여 이후 패키지 설치 시 실패하거나 오래된 버전이 설치될 수 있습니다.

### `CMD` vs `ENTRYPOINT`
* **`ENTRYPOINT`**: 컨테이너가 시작될 때 항상 실행될 메인 명령어를 설정합니다.
* **`CMD`**: `ENTRYPOINT`에 전달할 기본 인자를 설정하거나, `ENTRYPOINT`가 생략된 경우의 기본 명령어를 설정합니다.

**최전선 모범 사례 (조합 사용 예시)**
```dockerfile
ENTRYPOINT ["python3", "app.py"]
CMD ["--port", "5000"]
```
* **기본 실행** (`docker run my-image`): `python3 app.py --port 5000` 실행
* **인자 재정의** (`docker run my-image --port 8080`): `python3 app.py --port 8080` 실행 (`ENTRYPOINT`는 유지되고 `CMD`만 CLI 입력값으로 대체됨)

**Exec Form vs. Shell Form**
항상 문자열 포맷(Shell Form: `executable param1`) 대신 JSON 배열 포맷(**Exec Form**: `["executable", "param1"]`)을 사용하세요. Exec Form은 프로세스를 **PID 1**로 직접 실행하므로, 정상 종료를 위한 `SIGTERM` 같은 표준 리눅스 시그널을 올바르게 수신할 수 있습니다.

## Example

```docker
# Step 1: Base Image (Using lightweight distribution)
FROM python:3.11-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency lockfile first to leverage layer caching
COPY requirements.txt .

# Step 4: Install dependencies without storing pip cache
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy application source code
COPY . .

# Step 6: Create a non-root user for container security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Step 7: Document container port
EXPOSE 5000

# Step 8: Execution command in Exec Form
CMD ["python", "app.py"]
```
---
---

# 2. Systems Administration & Troubleshooting Commands

## Linux Core Operations

### 프로세스 관리 (Process Management)
* `ps aux | grep <process_name>`: 실행 중인 프로세스 목록을 조회합니다.
  * *예시*: `ps aux | grep nginx` (Nginx 활성화 여부 확인 및 사용자, PID, CPU%, Memory% 표시)
* `top` / `htop`: 시스템 리소스 사용량(CPU 코어, 메모리 소비, 실행 중인 작업)을 실시간으로 표시합니다.
* `kill -15 <PID>` vs `kill -9 <PID>`
  * `kill -15` (SIGTERM): 프로세스에 안전한 종료를 요청하여 리소스를 정리할 기회를 줍니다.
  * `kill -9` (SIGKILL): 리소스 정리 없이 커널 수준에서 프로세스를 즉시 강제 종료합니다.
* `systemctl status/start/stop/restart <service>`: systemd 백그라운드 서비스를 제어합니다.
  * *예시*: `systemctl restart docker` (Docker 데몬 서비스 재시작)

### 파일 권한 및 소유권 (File Permissions and Ownership)
* `chmod <octal> <file>`: 읽기(4), 쓰기(2), 실행(1) 값을 조합하여 파일 권한을 변경합니다.
  * *예시*: `chmod 755 deploy.sh` (소유자에게는 읽기/쓰기/실행(7), 그룹 및 기타 사용자에게는 읽기/실행(5) 권한 부여)
* `chown <user>:<group> <path>`: 파일이나 디렉토리의 소유자와 그룹을 변경합니다.
  * *예시*: `chown -R appuser:appgroup /var/www/app` (해당 디렉토리 내부까지 재귀적으로 소유권 변경)

### 로그 점검 및 분석 (Log Inspection & Analysis)
* `tail -f -n 100 /var/log/syslog`: 로그 파일의 마지막 100줄을 실시간으로 스트리밍합니다.
* `journalctl -u <service_name> --since "10 minutes ago"`: systemd-journald가 수집한 로그를 쿼리합니다.
  * *예시*: `journalctl -u nginx --since "1 hour ago" | grep -i "error"` (지난 1시간 동안의 Nginx 로그 중 에러 메시지만 필터링)

---

## Windows Server Management (PowerShell)
*D3 Security 배포 워크플로우는 대상 Windows 엔터프라이즈 환경을 포함합니다. 일반적인 관리 작업을 위해 아래 PowerShell 대응 명령어를 연습하세요.*

### 프로세스 관리 (Process Management)
* **프로세스 목록 조회**: `Get-Process -Name "node"`
* **프로세스 강제 종료**: `Stop-Process -Name "node" -Force`

### 서비스 관리 (Service Management)
* **서비스 상태 확인**: `Get-Service -Name "W3SVC"` (IIS 웹 서비스)
* **서비스 재시작**: `Restart-Service -Name "W3SVC"`

### 로그 점검 (Log Inspection)
* **이벤트 로그 쿼리**: `Get-WinEvent -LogName Application -MaxEvents 20`
* **에러 로그 필터링**: `Get-WinEvent -FilterHashtable @{LogName='System'; Level=2; StartTime=(Get-Date).AddHours(-1)}` *(Level 2는 'Error' 이벤트를 의미합니다)*
