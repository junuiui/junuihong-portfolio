## OSI 7 Layers (Open Systems Interconnection 7 Layers)
> A standardized conceptual framework created by the ISO that breaks down network communications into 7 distinct layers.  
> During transmission, data moves from the top layer to the bottom layer through a process called **Encapsulation**, and reverses through **Decapsulation** at the receiver.

### 1. Physical Layer (Layer 1)
- **Role**: Transmits raw **Bit** streams (0s and 1s) over physical media using electrical, mechanical, or optical signaling.
- **Key Functions**: Bit synchronization, line configuration, and physical topology management.
- **Data Unit (PDU)**: Bit
- **Equipment**: Hubs, Cables (UTP, Fiber-optic), Repeaters, Network Interface Cards (NIC).

### 2. Data Link Layer (Layer 2)
- **Role**: Provides node-to-node data transfer across the same local network and handles physical addressing.
- **Key Functions**: 
  - **MAC Addressing**: Uses physical hardware addresses to identify destination nodes.
  - **Framing**: Packages bits into discrete frames with headers and trailers.
  - **Error Control**: Detects damaged or lost frames using mechanisms like CRC (Cyclic Redundancy Check).
  - **Flow Control**: Prevents a fast sender from overwhelming a slow receiver within the local link.
- **Data Unit (PDU)**: Frame
- **Equipment**: L2 Switches, Bridges.

### 3. Network Layer (Layer 3)
- **Role**: Handles logical addressing and determines the best physical path for data to travel across different networks.
- **Key Functions**:
  - **Routing**: Determines the optimal path from source to destination using routing algorithms.
  - **Logical Addressing**: Assigns IP addresses (IPv4/IPv6) to identify devices across distinct networks.
  - **Fragmentation**: Breaks down packets if they are larger than the Maximum Transmission Unit (MTU) of the underlying network.
- **Data Unit (PDU)**: Packet
- **Equipment**: Routers, L3 Switches.

### 4. Transport Layer (Layer 4)
- **Role**: Ensures reliable, end-to-end data transmission and error recovery between host applications.
- **Key Functions**:
  - **Process Identification**: Uses **Port Numbers** to map incoming data to the correct software process/application.
  - **Segmentation & Reassembly**: Divides large blocks of data from upper layers into smaller units and puts them back together in order.
  - **Reliability & Flow/Congestion Control**: Managed by protocols like TCP via sequence numbers and acknowledgments.
- **Data Unit (PDU)**: Segment (for TCP) / Datagram (for UDP)
- **Protocols**: TCP, UDP.

### 5. Session Layer (Layer 5)
- **Role**: Establishes, manages, maintains, and terminates communication sessions between local and remote applications.
- **Key Functions**:
  - **Dialogue Control**: Manages whether the communication is simplex, half-duplex, or full-duplex.
  - **Synchronization**: Inserts checkpoints into the data stream so that in case of a crash, transmission can resume from the last checkpoint rather than starting over.
- **Data Unit (PDU)**: Data
- **Protocols**: NetBIOS, RPC, SOCKS.

### 6. Presentation Layer (Layer 6)
- **Role**: Formats and translates data to ensure that the application layer can read it, acting as the network's data translator.
- **Key Functions**:
  - **Translation**: Converts data between different system formats (e.g., ASCII to EBCDIC, or handling byte ordering).
  - **Encryption / Decryption**: Secures data for transmission (e.g., SSL/TLS processes).
  - **Compression**: Reduces the size of data to maximize network throughput (e.g., JPEG, MPEG, ZIP).
- **Data Unit (PDU)**: Data
- **Protocols / Formats**: SSL/TLS, JPEG, MPEG, ASCII.

### 7. Application Layer (Layer 7)
- **Role**: Serves as the window for users and application processes to access network services directly.
- **Key Functions**:
  - **User Interface**: Interacts directly with software applications (like web browsers or email clients).
  - **Resource Sharing**: Enables file transfers, remote access, email distribution, and database services.
- **Data Unit (PDU)**: Data
- **Protocols**: HTTP, HTTPS, SSH, FTP, DNS, SMTP, DHCP.


### Real-World Example: The Delivery Story
> Think of sending a letter to understand how data travels through these layers:

- **Layer 7 (Application)**: You write the actual content of the letter.
- **Layer 6 (Presentation)**: You translate the letter into the recipient's language or encrypt it so only they can read it.
- **Layer 5 (Session)**: You and the recipient agree on communication rules (e.g., exchanging letters once a month).
- **Layer 4 (Transport)**: You choose a reliable service (like Registered Mail) to ensure it arrives safely.
- **Layer 3 (Network)**: The postal service determines the most efficient route between cities using the street address.
- **Layer 2 (Data Link)**: The local post office sorts the letter for final delivery to the specific mailbox.
- **Layer 1 (Physical)**: The postman physically carries the letter along roads or via flight to the destination.