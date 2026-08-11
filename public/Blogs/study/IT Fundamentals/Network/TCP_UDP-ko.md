# TCP & UDP

## TCP
> *Transmission Control Protocol*  
> 인터넷에서 Data를 **신뢰성** 있게 보내기 위해 사용하는 Network Protocol
> IP 위에서 동작하며, 연결을 먼저 맺은 후 데이터를 주고받는 특징

### TCP 4 특징
1. **Connection Oriented** (연결 지향형)
    - Data를 보내기 전 송신측과 수신측이 서로 연결을 먼저 확립해야 함
2. **Reliability** (신뢰성)
    - Data가 중간에 유실되거나 순서가 바뀌지 않도록 보장
3. **Flow Control** (흐름 제어)
    - Receiver의 처리 속도에 맞춰 Sender의 Data 전송량을 조절
4. **Congestion Control** (혼잡 제어)
    - 네트워크가 혼잡해지면 전송 속도를 줄여 네트워크 붕괴를 막음

### 연결 및 해제 과정 (Handshake)
> TCP 는 신뢰성을 확보하기 위해 연결을 맺고 끊을 때 확답을 주고받는 과정을 거침

#### 3-Way Handshake (연결)
> 데이터 전송 전, 양측의 통신 준비가 되었는지 3단계를 거쳐 확인
1. `SYN`: *Sender*가 *Receiver*에 "**연결하자**" 라는 요청 신호를 보냄
2. `SYN-ACK`: *Receiver*가 요청을 수락하며 "**준비됨**" 신호와 응답을 보냄
3. `ACK`: *Sender*가 "**확인**" 이라는 마지막 응답을 보내고 연결이 완료됨

#### 4-Way Handshake (해제)
1. `FIN`: *Sender* 가 "더 보낼 데이터가 없다" 며 종료 요청을 보냄
2. `ACK`: *Receiver* 가 확인 응답을 보내고, 남은 데이터가 있다면 마저 보냄
3. `FIN`: *Receiver* 도 보낼 데이터를 모두 전송하면 종료 요청을 보냄
4. `ACK`: *Sender* 측이 최종 확인 응답을 보낸 후 연결이 완전히 닫힘 

### 신뢰성 보장 매커니즘
- **Sequence Number** (일련번호)
  - Packet 마다 번호를 부여하여 Data가 뒤죽박죽 도착해도 원래 순서대로 재조립
- **Acknowledgment** - ACK (확인 응답)
  - *Receiver*가 Data를 잘 받았다고 Sender 에게 알림
- **Retransmission** (재전송)
  - *Sender* 측이 일정 시간 동안 ACK를 받지 못하면 해당 Packet을 다시 보냄
- **Sliding Window** (슬라이딩 윈도우)
  - `Receiver`측이 처리할 수 있는 여유 공간 (Window size)만큼 Data를 한 번에 연속해서 보냄

### TCP Header
> 통신 제어를 위한 정보 (Header)가 붙음  
> 기본 크기는 **20 Bytes** (= 160 bits)

- Source/Destination Port
  - 출발지와 목적지의 프로세스 (application) Port Number
- Sequence Number
  - 전송되는 데이터의 순서 번호
- Acknowledgment Number
  - 다음에 받기를 기대하는 데이터의 순서 번호
- Window Size
  - 수신측이 한 번에 받을 수 있는 Buffer Size
- Flags (SYN, ACK, FIN ..)
  - 패킷의 목적 (연결 요청, 응답, 종료 등)을 나타내는 bit 정보

## UDP
> *User Datagram Protocol*  
> 인터넷에서 데이터를 **비연결성** 방식으로 빠르게 보내기 위해 사용하는 Network Protocol
> IP 위에서 동작하며, 연결을 맺지 않고 일방적으로 데이터를 전송하는 특징

### UDP 4 특징
1. **Connectionless** (비연결형)
    - 데이터를 보내기 전 송신측과 수신측이 서로 연결을 확립하지 않음
2. **Unreliability** (비신뢰성)
    - 데이터가 중간에 유실되거나 순서가 바뀌어도 이를 보장하지 않음
3. **No Flow Control** (흐름 제어 없음)
    - Receiver의 처리 속도를 고려하지 않고 Sender가 데이터를 일방적으로 보냄
4. **No Congestion Control** (혼잡 제어 없음)
    - 네트워크가 혼잡하든 아니든 상관없이 설정된 속도로 데이터를 계속 전송

### 데이터 전송 과정 (No Handshake)
> UDP는 신뢰성보다 속도를 중요시하므로 연결을 맺고 끊는 과정이 전혀 없음
- *Sender*는 *Receiver*가 데이터를 받을 준비가 되었는지 확인하지 않고 패킷을 바로 전송함
- *Receiver* 역시 데이터를 잘 받았다는 확인 응답(ACK)을 송신측에 보내지 않음

### 단순성 보장 매커니즘
- **Datagram** (데이터그램 단위 전송)
  - 각각의 패킷(데이터그램)이 독립적인 관계를 가지며, 서로 다른 경로로 전송될 수 있음
- **Minimal Overhead** (최소한의 오버헤드)
  - 확인 응답, 흐름 제어, 혼잡 제어 등의 기능이 없기 때문에 지연 시간(Latency)이 매우 짧음
- **Checksum** (체크섬)
  - 데이터가 전송 중에 손상되었는지 최소한의 오류 검사만 수행 (손상된 패킷은 단순히 폐기)

### UDP Header
> 통신 제어를 위한 정보가 거의 없어 Header 크기가 매우 작음  
> 고정 크기는 단 **8 Bytes** (= 64 bits)

- Source Port
  - 출발지 프로세스 (application) Port Number
- Destination Port
  - 목적지 프로세스 (application) Port Number
- Length
  - UDP 헤더와 데이터를 합친 전체 데이터그램의 길이 (Bytes 단위)
- Checksum
  - 헤더와 데이터의 오류 검사를 위해 사용되는 비트 정보 (선택 사항)

## Comparison Table
> TCP and UDP comparison at a glance

| Metric | TCP (*Transmission Control Protocol*) | UDP (*User Datagram Protocol*) |
| :--- | :--- | :--- |
| **Connection Type** | Connection-oriented (3-way handshake) | Connectionless (No handshake) |
| **Reliability** | High (Guarantees delivery via ACKs) | Low (Best-effort delivery) |
| **Data Sequencing** | Guaranteed (Reordered by Seq Number) | Not guaranteed (May arrive out of order) |
| **Speed & Throughput**| Slower (Due to connection setup & tracking) | Much faster (No connection overhead) |
| **Flow Control** | Yes (Sliding Window) | No |
| **Congestion Control**| Yes | No |
| **Header Size** | 20 to 60 Bytes (Variable) | 8 Bytes (Fixed) |
| **Transmission Type** | Byte stream | Packet (Datagram) discrete units |
| **Common Use Cases** | Web browsing (HTTP/HTTPS), Email, File transfer | Video streaming, Gaming, DNS, VoIP |
