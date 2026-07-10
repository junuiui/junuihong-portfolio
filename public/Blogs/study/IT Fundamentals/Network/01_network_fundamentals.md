ref: [Cisco Networking Basics](https://www.netacad.com/courses/networking-basics?courseLang=en-US)

# Part 1: Network Fundamentals & Home Networks

## Module 1. Communications in a Connected World

### 1.1. Network Types
- **Internet**
  - worldwide collection of interconnected networks (internetwork or internet for short)

### 1.2. Data Transmission
- **Bit**
  - `0` or `1`
  - stored and transmitted as one of two possible discrete states
- **Methods of Data Transmission**
  - `Electrical signals` - Transmission is achieved by representing data as electrical pulses on copper wire.
  - `Optical signals` - Transmission is achieved by converting the electrical signals into light pulses.
  - `Wireless signals` - Transmission is achieved by using infrared, microwave, or radio waves through the air.

### 1.3. Bandwidth and Throughput
- **Bandwidth**
  - capacity of a medium to carry data
  - measures the amount of data that can flow from one place to another in a given amount of time
  - Measured in the number of bits that (theoretically) can be sent across the media in a second
- **Throughput**
  - measure of the transfer of bits across the media over a given period of time
  - Does not usually match the specified bandwidth
  - Factors influence throughput including:
    - The amount of data being sent and received over the connection
    - The types of data being transmitted
    - The latency created by the number of network devices encountered between source and destination
- **Latency** 
  - refers to the amount of time, including delays, for data to travel from one given point to another.

---

## Module 2. Network Components, Types, and Connections

### 2.1 Clients and Servers
- **Clients**
  - Computer hardware or software devices that request and receive services or resources from a server. Examples include web browsers and email apps
- **Servers**
  - hosts that have software installed which enable them to provide information, like email or web pages, to other hosts on the network
- **P2P Networks**
  - **Definition**: 
    - Networks where computers function as both servers and clients simultaneously without needing dedicated central servers.
  - **Simplest Form**: 
    - Two directly connected computers using a wired or wireless connection to exchange data.
  - **Larger Scale**: 
    - Multiple PCs interconnected using a network device like a switch.
  - **Advantages**: 
    - Easy to set up, less complex, lower cost, and ideal for simple tasks like file transfers or printer sharing.
  - **Disadvantages**: 
    - No centralized administration, less secure, not scalable, and host performance can slow down under heavy loads.
- **P2P Applications**
  - **Definition**: 
    - Applications allowing a device to act as both a client and a server within the same communication (e.g., Instant Messaging).
  - **Requirements**: 
    - Each end device must provide a user interface and run a background service.
  - **Hybrid Systems**: 
    - Use a centralized directory index server to look up resource locations, while the actual file sharing remains decentralized between peers.
*   **Multiple Roles in the Network**
    *   **Server Multi-tasking**: 
        *   A single computer running server software can serve multiple clients at once or run multiple server types (e.g., Web, Email, and File server combined).
    *   **Client Multi-tasking**: 
        *   A single host can run multiple client apps simultaneously, allowing a user to browse the web, check email, and stream music at the same time.


### 2.2 Network Components
*   **Devices**
    *   **End Devices (Hosts)**: 
        *   The source or destination of a message over the network (e.g., PCs, laptops, smartphones, IP phones, network printers).
    *   **Intermediary Devices**: 
        *   Connect end devices to the network or connect multiple networks together (e.g., switches, routers, wireless access points, firewalls).
    *   **Functions**: 
        *   Intermediary devices regenerate data signals, maintain pathways, and direct traffic based on destination addresses.
*   **Media**
    *   **Definition**: 
        *   The physical channel or pathway through which data travels from source to destination.
    *   **Metallic Wires (Copper)**: 
        *   Data is encoded into electrical impulses (e.g., Twisted-pair cabling, Coaxial cable).
    *   **Glass/Plastic Fibres (Fibre-Optic)**: 
        *   Data is encoded as pulses of light, ideal for high-speed, long-distance transmissions.
    *   **Wireless Transmission**: 
        *   Data is encoded using electromagnetic wavelengths (e.g., Wi-Fi, Bluetooth, Cellular).
*   **Services and Protocols**
    *   **Services**: 
        *   Network programs that provide functionalities like web browsing, file sharing, or hosting voice traffic.
    *   **Protocols**: 
        *   The formal rules that govern how devices communicate across a network (e.g., HTTP, TCP, IP).

### 2.3 ISP Connectivity Options
*   **Home and Small Office Options (SOHO)**
    *   **Cable**: 
        *   Provided by television cable service providers, offering high-bandwidth, always-on internet over coaxial/fibre lines.
    *   **DSL (Digital Subscriber Line)**: 
        *   Runs over standard telephone lines, offering high-bandwidth, always-on connections with separate channels for voice and data.
    *   **Cellular**: 
        *   Uses mobile phone networks (e.g., 4G, 5G, 6G) to provide wireless internet access.
    *   **Satellite**: 
        *   Requires a clear line of sight to a satellite, providing internet to rural or remote areas where landline options are unavailable.
    *   **Dial-up**: 
        *   An older, low-bandwidth option that uses any phone line and a modem, interrupting phone services while connected.
*   **Business Connectivity Options**
    *   **Dedicated Leased Line**: 
        *   Reserved circuits directly connecting geographically separated offices for private voice and/or data networking.
    *   **Metro Ethernet**: 
        *   High-speed copper or fibre extensions from an ISP to an organization's premises, scaling up to gigabit speeds.
    *   **Business DSL**: 
        *   Provides secure, high-bandwidth connections optimized for businesses, often with symmetrical upload and download speeds.
    *   **Satellite**: 
        *   Used as a backup or primary connection for remote corporate branches or industrial sites.
Use code with caution.

---

## Module 3. Wireless and Mobile Networks
- **Status**: Not Started

### 3.x. (Enter Sub-modules Here)
- [ ] WLAN standards, frequencies, and mobile network concepts

---

## Module 4. Build a Home Network
- **Status**: Not Started

### 4.x. (Enter Sub-modules Here)
- [ ] SOHO router setup and basic configurations

---

## 📝 Checkpoint Exam: Build a Small Network
- [ ] Integrated review notes for Modules 1–4
- [ ] Mock test questions & mistakes log
