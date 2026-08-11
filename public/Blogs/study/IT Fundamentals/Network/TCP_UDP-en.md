## TCP
> *Transmission Control Protocol*  
> A network protocol used to send data **reliably** over the Internet.
> It operates on top of IP and features establishing a connection before exchanging data.

### 4 Key Characteristics of TCP
1. **Connection-Oriented**
    - The sender and receiver must establish a connection before sending data.
2. **Reliability**
    - Ensures that data is not lost or delivered out of order.
3. **Flow Control**
    - Adjusts the sender's data transmission rate to match the receiver's processing speed.
4. **Congestion Control**
    - Reduces transmission speed when the network is congested to prevent network collapse.

### Connection Establishment and Termination (Handshake)
> TCP goes through a process of exchanging confirmations when opening and closing connections to ensure reliability.

#### 3-Way Handshake (Connection)
> A 3-step process to verify that both sides are ready for communication before data transfer.
1. `SYN`: *Sender* sends a "**Let's connect**" request signal to *Receiver*.
2. `SYN-ACK`: *Receiver* accepts the request, sending a "**Ready**" signal along with an acknowledgment.
3. `ACK`: *Sender* sends a final "**Confirmed**" response, and the connection is established.

#### 4-Way Handshake (Termination)
1. `FIN`: *Sender* sends a termination request, stating "No more data to send."
2. `ACK`: *Receiver* sends a confirmation response and delivers any remaining data.
3. `FIN`: *Receiver* sends its own termination request once all its data has been transmitted.
4. `ACK`: *Sender* sends the final confirmation response, and the connection is completely closed.

### Reliability Mechanisms
- **Sequence Number**
  - Assigns a number to each packet so data can be reassembled in the correct order even if it arrives mixed up.
- **Acknowledgment** - ACK
  - *Receiver* notifies the Sender that the data has been successfully received.
- **Retransmission**
  - *Sender* retransmits the packet if it does not receive an ACK within a certain period of time.
- **Sliding Window**
  - *Sender* sends multiple packets continuously, up to the available buffer space (`Window Size`) that the *Receiver* can handle.

### TCP Header
> Control information (Header) is attached for communication management.  
> The base size is **20 Bytes** (= 160 bits).

- Source/Destination Port
  - Port numbers of the source and destination processes (applications).
- Sequence Number
  - The sequence number of the data being transmitted.
- Acknowledgment Number
  - The sequence number of the next data packet expected to be received.
- Window Size
  - The buffer size that the receiver can accept at one time.
- Flags (SYN, ACK, FIN ..)
  - Bit information indicating the purpose of the packet (connection request, acknowledgment, termination, etc.).

## UDP
> *User Datagram Protocol*  
> A network protocol used to send data quickly in a **connectionless** manner over the Internet.
> It operates on top of IP and features transmitting data unilaterally without establishing a connection.

### 4 Key Characteristics of UDP
1. **Connectionless**
    - The sender and receiver do not establish a connection before sending data.
2. **Unreliability**
    - Does not guarantee data delivery if packets are lost or arrive out of order.
3. **No Flow Control**
    - Sender unilaterally transmits data without considering the Receiver's processing speed.
4. **No Congestion Control**
    - Continuously transmits data at the configured rate regardless of network congestion.

### Data Transmission Process (No Handshake)
> UDP prioritizes speed over reliability, so there is no connection establishment or termination process.
- *Sender* transmits packets immediately without checking if the *Receiver* is ready to receive data.
- *Receiver* does not send back an acknowledgment (ACK) notifying that data was successfully received.

### Simplicity Mechanisms
- **Datagram**
  - Each packet (datagram) is independent and can be transmitted through different routes.
- **Minimal Overhead**
  - Delivers very low latency because it lacks features like acknowledgments, flow control, and congestion control.
- **Checksum**
  - Performs minimal error checking to see if data was corrupted during transmission (corrupted packets are simply discarded).

### UDP Header
> Control information is minimal, resulting in a very small Header size.  
> The fixed size is only **8 Bytes** (= 64 bits).

- Source Port
  - Port number of the source process (application).
- Destination Port
  - Port number of the destination process (application).
- Length
  - Total length of the datagram, including both the UDP header and the data (in Bytes).
- Checksum
  - Bit information used for error checking of the header and data (optional).

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
