## 1) Firewall Basic Principles
> A network security system that allows (**Allow/Pass**) or blocks (**Deny/Drop**) traffic based on predefined security rules.

### Inbound vs. Outbound Rules
- **Inbound Rules (Reception)**: Controls traffic coming from the external network into the internal network (or server).
  - *Purpose*: To prevent unauthorized access to your servers or PCs
  - *Example*: Allowing only port 80 (HTTP) and 443 (HTTPS) for an external web server entry.
- **Outbound Rules (Transmission)**: Controls traffic going from the internal network out to the external internet.
  - *Purpose*: To stop infected internal devices from talking to malicious external "Command & Control" (C2) servers.
  - *Example*: Blocking internal servers from connecting to external malicious C2 servers by only allowing specific necessary ports.

### Stateful vs. Stateless Inspection

| Feature | Stateless Inspection | Stateful Inspection |
| :--- | :--- | :--- |
| **Analysis Level** | Examines individual packets in isolation. | Analyzes the full context of traffic and data patterns. |
| **Context** | Does not remember the request/response relationship. | Tracks the state of active network connections (State Table). |
| **Response Handling**| Requires explicit rules for both ways. | Automatically allows inbound response packets for outbound requests. |
| **Security/Resource**| Faster, less resource-intensive; lower security. | Robust security; requires more processing power and memory. |
