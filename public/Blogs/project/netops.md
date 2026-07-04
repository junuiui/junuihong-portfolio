# NetOps Monitor 




# ping_monitor.sh
## CLI Usage & Operational Documentation
> ping_monitor.sh is a production-ready, lightweight network polling agent designed to capture core ICMP transport metrics and streaming telemetry directly into a PostgreSQL instance. It supports configuration via both command-line flags (highest priority) and system environment variables.

### Commands (How to use)
```bash
./ping_monitor.sh [--target <hosts>] [--count <packets>] [--interval <seconds>] [--run-once]
```

#### Command-Line Flags
Flag | Argument | Description | Default Value
-|-|-|-|
`--target` | string | Space-separated list of target domains or IP addresses | `"8.8.8.8 1.1.1.1"` |
`--count` | integer | Number of ICMP Echo Request packets sent per target | `5` |
`--interval` | integer | Cool-down period (in seconds) between sequential probe cycles | `60` |
`--run-once | None | Executed as a single-shot routine instead of an infinite daemon loop | Disabled (Loop Mode) |

---

## Environment Variables & Database Configuration
> Ideal for decoupling configurations when deploying via systemd services or Docker containers

### Network Tuning Variables
```bash
# Example of inline environment variable override
LOG_LEVEL=DEBUG PING_INTERVAL=30 ./ping_monitor.sh
```
- `PING_TARGETS`: Space-separated infrastructure targets to probe (e.g., `"8.8.8.8 1.1.1.1 example.com"`)
- `PING_COUNT`: Number of packets per cycle.
- `PING_INTERVAL`: Delays between loops.
- `RUN_MODE`: Explicitly set to loop or once.
- `LOG_LEVEL`: Output filtering capability (`DEBUG` | `INFO` | `WARN` | `ERROR`). Default is `INFO`.

### Data Ingestion (PostgreSQL) variables
```bash
# Example of inline configuration override for database and telemetry
DB_PASSWORD="secure_password" LOG_LEVEL=DEBUG ./ping_monitor.sh --run-once
```
- `DB_HOST`: Target database hostname or IP address (Default: `localhost`).
- `DB_PORT`: PostgreSQL engine port (Default: `5432`).
- `DB_NAME`: Destination database container name (Default: `netops`).
- `DB_USER`: Authentication database user (Default: `netops_user`).
- `DB_PASSWORD`: Database credential payload (Required; no default value). Passed via secure internal `PGPASSWORD` mask to prevent interactive TTY prompts.

---

## Metric State Mapping
> The agent dynamically evaluates target availability and network health, outputting one of three standardized states:
- `ok`: 0% packet loss. Network connectivity is optimal.
- `degraded`: Packet loss > 0% but < 100%. Signifies link instability, jitter, or high network congestion.
- `unreachable`: 100% packet loss. Target is completely down or dropping all ICMP traffic.

---

## Execution Architectures
### Managed Cron Execution (One-Shot Architecture)
> Recommended for standard system metrics collections where scheduling is handled externally by the OS daemon.
```bash
# Run every minute, appending logs to a persistent target directory
* * * * * /opt/netops/scripts/ping_monitor.sh >> /var/log/netops/ping.log 2>&1

# to test this configuration via CLI:
DB_PASSWORD="your_password" ./ping_monitor.sh --target "8.8.8.8 google.com" --run-once
```

### Long-Lived System Daemon (Loop Architecture)
> Runs indefinitely inside a process control manager, polling endpoints at high frequencies.
```bash
DB_PASSWORD="your_password" ./ping_monitor.sh --target "1.1.1.1" --interval 10
```

---

## Operational Execution Examples
### Ad-Hoc Validation (Single-shot Mode)
> Useful for cron integration or one-time network diagnostics

```bash
./ping_monitor.sh --target "8.8.8.8 google.com" --count 3 --run-once
```

### Long-Lived Monitoring Daemon (Default)
> Runs indefinitely inside the terminal or screen/tmux session, probing targets every 10 seconds

```bash
./ping_monitor.sh --target "1.1.1.1" --interval 10
```

### Troubleshooting / Verbose Debug Mode
> Forces the script to print raw execution stats and payload handling details
```bash
LOG_LEVEL=DEBUG ./ping_monitor.sh --target "8.8.8.8" --count 2 --run-once
```

---

## Signal Handling & Operational Lifecycle
> The script implements native POSIX signal trapping to guarantee data consistency and graceful exits during infrastructure scaling or deployments.

- `SIGINT` (Ctrl+C) / `SIGTERM`: Trapped instantly. The script breaks the current loop, logs Shutdown signal received. Exiting gracefully..., and exits with code 0.
- Exit Codes:
  - `0`: Successful execution / Graceful termination.
  - `1`: Critical Dependency Missing (e.g., `ping` or `awk` missing from path).
  - `2`: Invalid/Unknown Command-line Argument.

---

# dns_monitor.sh
## CLI Usage & Operational Documentation: DNS Monitor

`dns_monitor.sh` is an infrastructure-grade, lightweight DNS telemetry agent designed to monitor upstream recursive nameservers and private host resolution speeds. It records latency metrics and RCODE metrics directly into a PostgreSQL cluster.


### Commands (How to use)
```bash
./dns_monitor.sh [--target <domain>] [--resolver <ip>] [--record-type <type>] [--interval <seconds>] [--run-once]
```

#### Command-Line Flags
Flag|Argument|Description|Default Value|
-|-|-|-|
`--target`|string|Space-separated list of target domain names to resolve.|`"google.com cloudflare.com"`|
`--resolver`|string|IP address of the nameserver to query. Leaves blank for system default | `""` (System Default) |
`--record-type`| string | DNS query type (`A \| AAAA \| MX \| CNAME \| TXT \| NS`) |`"A"`|
`--interval`|integer|Cool-down period (in seconds) between sequential probe cycles.|60|
`--run-once`|None|Executes as a single-shot routine instead of an infinite daemon loop.|Disabled (Loop Mode)|

---

## Environment Variables & Database Configuration
> Environment variables control backend connectivity and core configs, ideal for systemd service encapsulation or automated runtime bindings.

```bash
# Example of ad-hoc testing against a custom resolver
DB_PASSWORD="secure_pass" DNS_RESOLVER="8.8.8.8" ./dns_monitor.sh --run-once
```

### Network Tuning Variables

| Variable Name | Description | Default / Requirements |
| :--- | :--- | :--- |
| `DNS_TARGETS` | Target domains to resolve. | |
| `DNS_RESOLVER` | Upstream recursive resolver IP (passed to dig as `@<resolver>`). | |
| `DNS_RECORD_TYPE` | Target DNS resource record classification. | |
| `DNS_TIMEOUT_SEC` | Max query timeout threshold in seconds before dropping. | `5` |
| `RUN_MODE` | Determines execution lifecycle (`loop` \| `once`). | |

### Data Ingestion (PostgreSQL) Variables

| Variable Name | Description | Default / Requirements |
| :--- | :--- | :--- |
| `DB_HOST` | Target database hostname or IP address. | `localhost` |
| `DB_PORT` | PostgreSQL engine port. | `5432` |
| `DB_NAME` | Destination database name. | `netops` |
| `DB_USER` | Authentication database user. | `netops_user` |
| `DB_PASSWORD` | Database credential payload. Passed via secure internal `PGPASSWORD` mask to prevent interactive prompts. | **Required** (No default) |


---

## Telemetry State Mapping
> The agent dynamically evaluates DNS header return values (RCODE), mapping results into five distinct status levels inside the database schema:

- `ok`: `RCODE: NOERROR` with an populated answer section. Query resolved successfully.
- `nodata`: `RCODE: NOERROR` but with an empty answer section. Domain exists, but the specific requested record type does not.
- `nxdomain`: Non-Existent Domain. Target domain is not registered or found in the zone authority.
- `servfail`: Nameserver encountered a structural runtime error or zone synchronization failure.
- `timeout`: Query timed out based on DNS_TIMEOUT_SEC.

---

## Execution Architectures

### Ad-Hoc Core Testing (Single-Shot Mode)
```bash
DB_PASSWORD="your_password" ./dns_monitor.sh --target "github.com openbounds.com" --record-type A --run-once
```

### Long-Lived System Daemon (Loop Architecture)
> Runs indefinitely inside a process control manager, polling target namespaced every 30 seconds
```bash
DB_PASSWORD="your_password" ./dns_monitor.sh --target "google.com" --interval 30
```

### Automated Cron Management
```bash
# Run every minute, appending monitoring metrics to the standard log architecture
* * * * * /opt/netops/scripts/dns_monitor.sh >> /var/log/netops/dns.log 2>&1
```

---

## Relational Database Output Schema (`dns_results`)
> The ingestion telemetry payload maps directly to the tracking parameters structured while the target PostgreSQL cluster:


| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `target` | TEXT | The domain namespace being queried. |
| `record_type` | TEXT | Resource record query classification (A, CNAME, etc.). |
| `resolver` | TEXT | Target nameserver address or system_default. |
| `probed_at` | TIMESTAMPTZ | Absolute tracking timestamp in strict UTC timezone. |
| `resolution_ms` | NUMERIC | Pure internal resolving time latency in milliseconds. |
| `resolved_ips` | TEXT | Comma-separated array string of returning payload assets. |
| `status` | TEXT | Standardized health metrics (ok \| nodata \| nxdomain \| timeout \| ...). |
| `raw_status_code` | TEXT | Raw standard Network RCODE payload text (e.g., NOERROR). |
