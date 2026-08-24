# Network

## OSI Model
1. Physical Layer
   - Transmit raw binary (bits) as signals through wire
     - Cables, Hubs, Repeaters
2. Data Layer
   - Manages node-to-node physical delivery and frames data using MAC address
     - Ethernet, Wi-Fi
3. Network Layer
   - Routes data packets across different networks using logical addresses
     - IP, ICMP
4. Transport Layer
   - Handles end-to-end delivery, sequencing, and error checking
     - TCP, UDP
5. Session Layer
   - Opens, Manages, Closes communication sessions
     - NetBIOS, APIs
6. Presentation Layer
   - Translate, Encrypts, and compresses data
     - SSL/TLS, JPEG
7. Application Layer
   - Interacts directly with software and end users
     - HTTP, DNS, FTP

## IPs
- IPv4 주소는 32bit, 8bit씩 4옥텟(octet)으로 구성되며 0-255 범위 십진수로 표현 (예: 192.168.1.1)
  - Public IP(공인 IP): 인터넷 상에서 고유하게 식별되는 주소
  - Private IP(사설 IP): 내부망 전용 주소, 대역 3개 — 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

## Subnets
> 하나의 거대한 네트워크를 작은 단위로 쪼갠 것.

- Subnet Masks (CIDR)
  - CIDR(Classless Inter-Domain Routing): IP 주소 뒤에 `/숫자`로 네트워크 부분 비트 수를 표시하는 표기법
  - 서브넷 마스크는 IP 주소 중 "네트워크 부분"과 "호스트 부분"을 구분해주는 역할

### Example
- `192.168.1.0/24` → 앞 24bit(192.168.1)가 네트워크, 나머지 8bit가 호스트 → 이 서브넷에서 사용 가능한 호스트: 192.168.1.1 ~ 192.168.1.254 (총 254개, .0은 네트워크 주소, .255는 브로드캐스트 주소)
- `/24`를 두 개의 `/25`로 쪼개면 각각 126개 호스트를 쓸 수 있는 서브넷 2개로 분리 가능 — 이게 "서브네팅"

## Switch
- L2(데이터링크 계층) 장비, MAC 주소 테이블 기반으로 같은 네트워크 내 장비 간 프레임(frame) 전달
  - Managed switch: VLAN 태깅, 포트별 설정 가능 / Unmanaged switch: 설정 불가, 단순 연결만

## Router
- L3(네트워크 계층) 장비, IP 라우팅 테이블 기반으로 서로 다른 네트워크 간 패킷(packet) 전달
  - Static routing(정적): 관리자가 경로 직접 지정 / Dynamic routing(동적): OSPF/BGP 등 프로토콜로 자동 경로 계산

## DHCP
- Dynamic Host Configuration Protocol — 클라이언트에게 IP를 자동 할당하는 프로토콜
  - DORA 과정: Discover(요청) → Offer(제안) → Request(선택) → Acknowledge(확정)
  - Scope(할당 가능 IP 범위), Lease time(임대 기간) 개념

## OSPF
- Open Shortest Path First — Link-state routing protocol(링크 상태 프로토콜), Area 기반으로 라우팅 정보 교환
  - Interior Gateway Protocol(내부 게이트웨이 프로토콜) — 한 조직/사이트 내부 라우팅에 사용
  - Cost 기반 최단 경로 계산 (Dijkstra 알고리즘)

## BGP
- Border Gateway Protocol — Path-vector protocol, 서로 다른 AS(Autonomous System, 자율 시스템) 간 라우팅에 사용
  - Exterior Gateway Protocol(외부 게이트웨이 프로토콜) — 인터넷 백본, 멀티사이트 간 라우팅에 사용됨

## WAN vs LAN
- LAN(Local Area Network): 한 사이트 내부 네트워크
- WAN(Wide Area Network): 여러 사이트를 연결하는 광역 네트워크 (지사 간 연결 시 Site-to-Site VPN 등으로 구현)

---

# Email Authentication (SPF / DKIM / DMARC)

## SPF
> Sender Policy Framework — 발신 허용 서버의 IP를 DNS TXT record에 등록해서, 그 IP가 아닌 곳에서 온 메일(스푸핑)을 걸러낼 수 있게 하는 인증 방식.

## DKIM
> DomainKeys Identified Mail — 이메일 헤더에 digital signature(디지털 서명)를 추가하고, 수신 측이 발신 도메인의 public key(DNS에 등록)로 서명을 검증해 메일이 변조되지 않았음을 확인하는 방식.

## DMARC
> Domain-based Message Authentication, Reporting & Conformance — SPF/DKIM 검증이 실패했을 때 어떻게 처리할지(policy: none / quarantine / reject) 지정하고, 실패 리포트를 받을 주소(rua)를 설정하는 상위 정책. SPF·DKIM 단독으로는 "실패 시 뭘 할지"가 정해지지 않는데, DMARC가 그 규칙을 정함.

---

# Windows

## AD (Active Directory) & DS (Domain Service)
- 사용자/컴퓨터/그룹 계정을 중앙에서 관리하는 디렉토리 서비스(directory service)
  - 구조: Domain(도메인) → Tree(트리) → Forest(포레스트) 계층으로 확장

## GPO
- Group Policy Object — 사용자/컴퓨터에 정책을 중앙에서 배포·강제하는 메커니즘
  - Computer Config, User Config 두 섹션으로 구성 (아래 항목 참고)

## NTFS
- New Technology File System — Windows 파일 시스템, 파일/폴더 단위로 세밀한 권한(permission) 설정 가능
  - NTFS 권한 vs Share 권한: 원격으로 접근할 때는 두 권한 중 더 제한적인 쪽이 최종 적용됨

## FSMO
- Flexible Single Master Operations — AD에서 충돌 방지를 위해 특정 작업을 DC(Domain Controller) 하나만 수행하도록 지정한 5개 역할
  - Schema Master(스키마 마스터): AD 스키마 변경 담당
  - Domain Naming Master(도메인 이름 마스터): 도메인 추가/제거 관리
  - RID Master(RID 마스터): 보안 식별자(SID) 풀 할당
  - PDC Emulator(PDC 에뮬레이터): 시간 동기화, 비밀번호 변경 우선 처리
  - Infrastructure Master(인프라 마스터): 도메인 간 그룹-사용자 참조 갱신

## Computer Config
- GPO 중 **부팅(machine startup) 시점**에 적용되는 설정
  - 예: 방화벽 정책, 소프트웨어 배포, 보안 설정

## User Config
- GPO 중 **로그온(user logon) 시점**에 적용되는 설정
  - 예: 바탕화면 배경, 드라이브 매핑, 시작 메뉴 설정
  - 적용 순서: 부팅 시 Computer Config 먼저 → 로그인 시 User Config

## Powershell
- cmdlet: 동사-명사 구조 명령어 (`Get-`, `Set-`, `New-`, `Remove-`)
  - 파이프라인(`|`): 한 cmdlet의 출력을 다음 cmdlet의 입력으로 전달
  - `Import-Csv` / `Export-Csv`: CSV 데이터 읽기/쓰기
  - 예: `Import-Csv users.csv | ForEach-Object { New-ADUser -Name $_.Name -Department $_.Dept }`

---

# Linux

## Bash
- Linux/Unix의 기본 셸(shell)이자 스크립팅 언어
  - 조건문(if), 반복문(for/while), 종료 코드(exit code: 0=성공)

## systemd
- 서비스 시작/중지/상태를 관리하는 init 시스템
  - `systemctl status|start|stop|enable <service>`

## 로그 확인
- `journalctl`: systemd 기반 로그 조회
  - `/var/log/` 하위 개별 로그 파일들 (syslog, auth.log 등)

## 패키지 관리
- Debian 계열: `apt update` (목록 갱신) → `apt upgrade` (업데이트) → `apt install <pkg>` (설치)

## 권한 관리
- `chmod`: 파일 권한(읽기/쓰기/실행) 변경
- `chown`: 파일 소유자 변경
- `sudo`: 관리자 권한으로 명령 실행

## SSH
- Secure Shell — 원격 서버 접속 프로토콜
  - 키 기반 인증(key-based, 더 안전) vs 패스워드 인증

## 텍스트 처리 도구
- `grep`: 패턴 검색
- `awk`: 필드 단위 텍스트 가공
- `sed`: 텍스트 치환/편집
- `cut`: 특정 열(컬럼) 추출

## Cron
- 정해진 시간에 스크립트를 자동 실행하는 스케줄러
  - crontab 문법: `분 시 일 월 요일 명령어`
  - 예: NetOps Monitor의 ping_monitor.sh가 cron으로 주기 실행되며 결과를 SNS로 알림