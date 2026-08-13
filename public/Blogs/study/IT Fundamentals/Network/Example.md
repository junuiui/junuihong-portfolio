# Examples

## 1. Entering "example.com"

1. URL Parsing & Local Cache Check
   - Parse Protocol (`HTTPS`), **Host** (`example.com`), **Port** (`443`)
   - Check Browser Cache & OS Hosts file / DNS Cache

2. DNS Lookup (Domain -> IP)
   1. Local DNS Server Query
   2. Recursive Query (If cache miss)
      - Root Name Server (`.`) -> TLD Name Server (`.com`) -> Authoritative Name Server (`example.com`)
   3. Return Target IP Address & Cache with TTL

3. TCP 3-way Handshake (Layer 4 Reliability)
   1. `SYN`: Client -> Server (`Port 443, seq=X`)
   2. `SYN-ACK`: Server -> Client (`seq=Y, ack=X+1`)
   3. `ACK`: Client -> Server (`ack=Y+1`) -> ESTABLISHED

4. TLS Handshake (Layer 6 Security)
   1. `ClientHello`: TLS Version, Cipher Suites, Client Random Data
   2. `ServerHello` & Certificate: Selected Cipher Suite, Server Certificate, Server Random Data
   3. Cert Verification & Key Exchange: Verify Certificate with CA Public Key, Exchange Keys to generate Symmetric Session Key
   4. Finished: Encryption Ready

5. HTTP Request / Response (Layer 7 Application)
   1. HTTP Request: Client sends encrypted GET request (e.g. GET / HTTP/1.1)
   2. Server Processing: Decrypt request and process
   3. HTTP Response: Server returns encrypted response (e.g. 200 OK + HTML Body)

6. Rendering & Connection Termination
   - Browser renders HTML/CSS/JS
   - TCP 4-way Handshake (FIN -> ACK -> FIN -> ACK) to close connection