## 2) NAT (Network Address Translation)
> A technique used on routers or firewalls to translate private IP addresses into a public IP address for internet communication.

### Why Private IPs cannot access the Internet directly
- **Unroutable IP (RFC 1918)**: Private address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are reserved for internal use only. Public internet routers are configured to discard these packets, meaning they cannot be routed across the backbone.
- **Address Conservation**: NAT allows multiple internal devices to share a single public IP, slowing the exhaustion of the limited IPv4 address space.
- **Security**: Private addresses are hidden from the internet, providing a layer of isolation and protection against direct external threats.

### 3 Primary Types of NAT
1.  **Static NAT (One-to-One)**: Permanent mapping of a single private IP to a single public IP. Used for servers that need a consistent external presence.
2.  **Dynamic NAT (Many-to-Many)**: Maps private IPs to a "pool" of public IPs on a first-come, first-served basis.
3.  **PAT / NAT Overload (Many-to-One)**: The most common type; it maps multiple private IPs to a **single public IP** using unique **Source Port** numbers to distinguish each session.

### How NAT Works (The Mechanism)
1.  **Request Phase**: An internal device sends a request; the router replaces the private source IP with its own **Public IP**.
2.  **PAT/Overload**: The router assigns a unique **Source Port** to track the conversation.
3.  **NAT Table Logging**: The router records the mapping between the original private IP/port and the translated public IP/port in a NAT table.
4.  **Response Phase**: When an external server responds, the router consults the **NAT Table** using the destination port to identify the correct internal device.

### Security Benefits
*   **Obscuring Internal Topology**: NAT masks internal private IP addresses from the public internet, making it difficult for threats to target specific internal devices.
*   **Unsolicited Traffic Filtering**: Inbound connections with no existing NAT table entry are typically dropped, providing a basic level of protection.