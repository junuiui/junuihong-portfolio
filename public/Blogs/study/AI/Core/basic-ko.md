# AI

## AI (Artificial Intelligence) 핵심 개념 & 루프 (Agent Loop)
> Agent AI 는 고정된 규칙을 따르는 기존 자동화 프로그램과 달리,  
> **스스로 목표를 설정하고 환경 변화에 유연하게 대응**하는 시스템  
> 그 중심에는 지속해서 반복되는 `Perceive-Plan-Act-Observe` Loop

- `Perceive` (인지): 외부 환경의 데이터나 사용자의 입력을 받아들임. (Text Query, System Log)
- `Plan` (계획): 인지한 정보를 바탕으로 목표를 달성하기 위한 최적의 단계별 수행 계획을 수립함. Memory 와 LLM의 추론 능력을 활용
- `Act` (행동): 계획된 지침에 따라 실제 행동을 수행. 주로 외부 도구 (API, DB 조회 등)을 호출하거나 텍스트 답변을 생성
- `Observe` (관찰): 행동의 결과로 바뀐 환경이나 데이터의 피드백을 확인. 이 결과는 다음 루프의 인지 (Perceive) 단계로 들어가며, 계획을 수정하는 기반이 됨. 

## ReAct Pattern (Reasoning + Acting)
> ReAct는 Reasoning과 Acting을 번갈아 가며 수행하도록 유도하는 LLM 프롬프팅 및 아키텍처 패턴  
> LLM 이 복잡한 문제를 풀 때 "생각"과 "액션"을 분리하여 정확도를 높힘.

- `Thought`: 현재 상황에서 무엇을 해야 하는지, 어떤 정보가 부족한지 LLM 스스로 추론
- `Action`: 필요한 정보를 얻기 위해 특정 도구(tool)를 호출하는 명령을 내림
- `Observation`: 도구 구동 결과(데이터)를 받아와 확인함
  

## Tool-use / Function Calling & RAG 기본 구조
> Agent 가 현실 세계 문제를 해결하려면 외부 기능 (tool)을 자유자재로 쓸 수 있어야 함.

- `Tool-use` / `Function Calling`: LLM이 스스로 판단 하여 특정 API의 이름과 필요한 Parameter를 JSON 형태로 출력하는 기술. 모델이 직접 코드를 *실행하진 못하지만*, 실행할 수 있는 정형화된 "명령서"를 만들어 주면 백엔드 시스템이 이를 실행.
- `RAG` (Retrieval-Augmented Generation): LLM의 지식 한계를 극복하기 위해 사내 문서나 DB에서 관련 정보를 먼저 검색 (*Retrieval*)한 뒤, 그 내용을 프롬프트에 붙여서 답변을 생성(*Generation*) 하는 기법
- Agent 내에서의 결합: RAG 역시 Agent 입장에서는 하나의 "Search Tool" 로 취급됨. Agent는 ReAct Loop 속에서 `Action: Vector_DB_Search(...)`를 호출하여 지식을 보강한 뒤 최종 의사결정을 함.

## Multi-Agent Issues
> 복잡한 태스크를 해결하기 위해 여러 개의 에이전트를 협업시킬 때 다음과 같은 구조적 문제가 발생합니다.

- `State Sharing` (상태 공유): 에이전트 'A'가 알아낸 정보나 작업 상태를 에이전트 'B'가 실시간으로 공유받아야 흐름이 끊기지 않습니다. 이를 위해 전역 메모리(Global State Cluster)나 공유 데이터베이스(Blackboard Architecture)를 구축해 상태 정보를 동기화해야 합니다.
- `Orchestration` (오케스트레이션): 여러 에이전트의 제어권을 조율하는 문제입니다. 한 에이전트가 독점하지 않도록 중앙 통제관(Central Controller)을 두거나, 에이전트 간 계층 구조(Hierarchical)를 설계하거나, 순차적으로 토큰을 넘기는 체인(Chain) 형태의 제어가 필요합니다.
- `Infinite Loop Prevention` (무한 루프 방지): 에이전트 A와 B가 서로 잘못된 결과물(Observation)을 주고받으며 무한히 Thought -> Action을 반복하는 현상입니다. 이를 막기 위해 최대 루프 횟수 제한(Max Iterations), 토큰 비용 상한선 설정, 이전 상태 복사본 비교를 통한 교착상태(Deadlock) 감지 알고리즘을 반드시 구현해야 합니다.

## SOAR + AI Agent
- `SOAR` (Security Orchestration, Automation, Response)
  - 보안 장비 (SIEM, Firewall)에서 발생하는 수많은 경고를 단일 플랫폼으로 수집하고, 표준화된 대응 절차(Playbook)에 따라 자동으로 대응하는 보안 자동화 시스템
- 결합의 필요성
  - 기존 `SOAR`는 사람이 미리 짜둔 고정된 룰(if-then) 기반의 플레이북으로만 작동. 변칙적인 해킹 공격이나 예측 못한 로그 패턴이 나오면 대응이 불가능함. 여기에 판단력과 유연성을 갖춘 AI Agent 가 결합되면 Playbook 사각지대를 메우고 동적인 위협 분석과 자율 대응이 가능해짐

## [시나리오 명] 자율형 침해 위협 분석 및 격리 프로세스 (SOAR + AI Agent)

본 문서는 사내 보안 인프라(SOAR)와 AI 에이전트(Agentic AI)가 결합하여 침해 위협을 자율적으로 탐지, 분석 및 격리하는 가상의 보안 조치 시나리오를 ReAct 패턴 기반으로 기술한 명세서입니다.

---

### [단계 1] 알람 발생 및 인지 (Perceive)

*   **상황 발생**: 사내 **SIEM**(보안 정보 이벤트 관리) 시스템에서 보안 알람이 발생합니다.
*   **위협 유형**: 외부 특정 IP로부터 사내 웹서버로 단시간 내에 비정상적인 대량의 API 요청 유입 (SQL Injection 의심 코드 포함).
*   **심각도**: **상 (High)**
*   **시스템 연동**: **SOAR** 플랫폼이 이 알람을 실시간 수집하고, 즉시 담당 **AI 분석 에이전트**에게 관련 컨텍스트를 전달합니다.
    *   *공격자 IP*: `198.51.100.45`
    *   *타깃 서버*: `web_01`
    *   *발생 시각*: `2026-08-16 13:30:00` (UTC)

---

### [단계 2] 1차 추론 및 로그 조회 도구 호출 (Thought & Action)

AI 에이전트는 수신된 알람 데이터를 바탕으로 내부 **ReAct** 루프를 시작합니다.

*   **Thought (추론)**: 
    > "단순 오탐(False Positive)인지 실제 공격인지 확인하려면 해당 웹서버의 상세 웹 애플리케이션 로그와 네트워크 패킷 기록을 정밀 조사해야겠다."
*   **Action (행동)**: 사내 로그 저장소(Elasticsearch)에 접근할 수 있는 전용 기능 호출.
    *   *호출 도구*: `Fetch_Server_Logs`
    *   *매개변수*: `target_server="web_01"`, `time_range="recent_30m"`

---

### [단계 3] 결과 관찰 및 추가 도구 활용 (Observe & Act)

*   **Observation (관찰)**: 
    *   `Fetch_Server_Logs` 도구로부터 최근 30분간의 웹서버 로그 데이터 500줄이 리턴됨.
    *   로그 내 데이터베이스 구조를 탈취하려는 **'UNION SELECT' 구문** 및 **시스템 에러 발생 기록**이 명확히 포착됨.
*   **Thought (추론)**: 
    > "실제 SQL 인젝션 공격이 맞다. 이제 이 공격 원격 IP가 과거에 악성 행위를 한 적이 있는 알려진 침해지표(IOC)인지 교차 검증해야겠다."
*   **Action (행동)**: 외부 위협 인텔리전스 인프라와 연동된 API 호출.
    *   *호출 도구*: `Check_Threat_Intel`
    *   *매개변수*: `ip="198.51.100.45"`

---

### [단계 4] IOC 판별 및 심층 분석 (Observe & Thought)

*   **Observation (관찰)**: 
    *   외부 위협 정보 사이트(Threat Intel) 피드백 수신.
    *   해당 IP의 **위험 점수 95점** 확인 (악성 봇넷 유포지 및 스캐너로 등록된 이력 존재).
*   **Thought (추론)**: 
    > "종합 분석 결과, 이 이벤트는 명백한 악성 공격(True Positive)이다. 타깃 서버 내부의 데이터가 실제로 유출되었는지 점검함과 동시에, 추가 피해를 막기 위해 방화벽 차단과 세션 격리가 즉시 필요한 시점이다."

---

### [단계 5] 대응 액션 자동 실행 및 사후 보고 (Act & Final Observation)

*   **Action 1 (차단)**: 사내 방화벽 제어 API 도구를 호출하여 공격자 IP를 즉시 차단합니다.
    *   *호출 도구*: `Block_IP`
    *   *매개변수*: `ip="198.51.100.45"`, `duration="permanent"`
*   **Action 2 (격리)**: 위험에 노출되었던 웹서버의 세션을 강제 종료하고 인프라적으로 격리합니다.
    *   *호출 도구*: `Isolate_Host`
    *   *매개변수*: `target_server="web_01"`
*   **Final Thought (최종 추론)**: 
    > "인프라 보호 조치가 완료되었다. 보안 관제 부서에 제출할 사고 조사 보고서를 작성하자."
*   **최종 출력 (Final Output)**: 
    *   에이전트는 최초 알람 내용, 수집한 로그 증거, 위협 인텔리전스 판별 결과, 방화벽 차단 및 격리 내역을 타임라인 순으로 깔끔하게 정리한 **'사고 분석 및 조치 보고서'**를 자동으로 생성합니다.
    *   생성된 문서를 **SOAR 대시보드**에 업로드하고, 사내 협업 툴(**Slack**)을 통해 관제 요원에게 실시간 알림을 보낸 뒤 루프를 최종 종료합니다.
