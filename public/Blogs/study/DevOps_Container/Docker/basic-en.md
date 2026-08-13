# 1. Containers vs. Virtual Machines & Docker Concepts

## Image vs. Container
* **Image**: A static, immutable, read-only template containing the application code, runtime, dependencies, environment variables, and configuration files.
  * *Example*: The `python:3.11-slim` image serves as a frozen blueprint containing only the Debian Linux base and a minimal Python 3.11 installation.
* **Container**: An isolated, runnable instance of an image executed as a process on the host OS. Docker adds a thin read-write layer (Writable Layer) on top of the underlying image layers.
  * *Example*: Running `docker run -d -p 8080:8080 python-app` spins up a live container instance from your `python-app` image.

---

## Architectural Comparison: Container vs. VM

| Attribute | Virtual Machine (VM) | Container |
| :--- | :--- | :--- |
| **Abstraction Level** | Hardware-level virtualization | OS-level virtualization (Kernel sharing) |
| **Isolation Mechanism** | Hypervisor (e.g., ESXi, Hyper-V, KVM) | Linux Namespaces and cgroups |
| **Guest OS Requirement** | Requires a full Guest OS per VM | No Guest OS; shares host kernel |
| **Boot Time** | Minutes | Seconds or milliseconds |
| **Resource Overhead** | High (Gigabytes of RAM, dedicated CPU) | Low (Megabytes of RAM, shared CPU) |

> **Real-World Analogy**
> * **VM**: A VM is like buying an entirely separate house with its own plumbing, electrical grid, and foundation.
> * **Container**: A container is like renting an apartment in a complex: you have your own private living space, but you share the main building's structural foundation, water mains, and power lines.

---

## Key Dockerfile Directives Explained

### FROM
* Defines the base image for the build.
* *Example*: `FROM python:3.11-slim`
* *Detail*: Always prefer minimal base images like `slim` or `alpine` over full distribution tags. A standard `python:3.11` image can be around 1 GB, while `python:3.11-slim` is roughly 150 MB. 
* *Note*: `alpine` uses `musl libc` instead of `glibc`, which can occasionally cause compilation issues with C-based Python extensions like `numpy` or `psycopg2`.

### RUN
* Executes commands during the image build time and commits the results as a new image layer.
* *Example*: `RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*`
* *Detail*: Always chain `apt-get update` and `apt-get install` in a single RUN instruction using `&&`. If split into separate lines, Docker caches the `apt-get update` layer, causing subsequent package installations to fail or install outdated versions.

### CMD vs. ENTRYPOINT
* **ENTRYPOINT**: Sets the main command that will always run when the container starts.
* **CMD**: Sets default arguments passed to the `ENTRYPOINT`, or acts as a default command if `ENTRYPOINT` is omitted.

**Best Practice Example (Combining Both)**
```dockerfile
ENTRYPOINT ["python3", "app.py"]
CMD ["--port", "5000"]
```
* **Default execution** (`docker run my-image`): Runs `python3 app.py --port 5000`.
* **Overriding arguments** (`docker run my-image --port 8080`): Runs `python3 app.py --port 8080`. The `ENTRYPOINT` remains intact while `CMD` is replaced by the CLI input.

**Exec Form vs. Shell Form**
Always use the JSON array format (**Exec Form**: `["executable", "param1"]`) instead of string format (Shell Form: `executable param1`). Exec Form spawns the process directly as **PID 1**, allowing it to receive standard Linux signals like `SIGTERM` for graceful shutdowns.

```docker
# Step 1: Base Image (Using lightweight distribution)
FROM python:3.11-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency lockfile first to leverage layer caching
COPY requirements.txt .

# Step 4: Install dependencies without storing pip cache
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy application source code
COPY . .

# Step 6: Create a non-root user for container security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Step 7: Document container port
EXPOSE 5000

# Step 8: Execution command in Exec Form
CMD ["python", "app.py"]
```
---
---

# 2. Systems Administration & Troubleshooting Commands

## Linux Core Operations

### Process Management
* `ps aux | grep <process_name>`: Lists running processes.
  * *Example*: `ps aux | grep nginx` checks if the Nginx process is active, showing user, PID, CPU%, and Memory%.
* `top` / `htop`: Displays real-time system resource usage (CPU cores, memory consumption, running tasks).
* `kill -15 <PID>` vs `kill -9 <PID>`
  * `kill -15` (SIGTERM): Requests a graceful termination, allowing the process to clean up resources.
  * `kill -9` (SIGKILL): Forces an immediate kernel-level termination without cleanup.
* `systemctl status/start/stop/restart <service>`: Controls systemd background services.
  * *Example*: `systemctl restart docker` reloads the Docker daemon service.

### File Permissions and Ownership
* `chmod <octal> <file>`: Modifies file permissions using read (4), write (2), and execute (1) values.
  * *Example*: `chmod 755 deploy.sh` sets owner rights to Read/Write/Execute (7), and Group/Others to Read/Execute (5).
* `chown <user>:<group> <path>`: Changes owner and group assignments.
  * *Example*: `chown -R appuser:appgroup /var/www/app` recursively changes directory ownership.

### Log Inspection & Analysis
* `tail -f -n 100 /var/log/syslog`: Streams the last 100 lines of a log file in real time.
* `journalctl -u <service_name> --since "10 minutes ago"`: Queries logs collected by systemd-journald.
  * *Example*: `journalctl -u nginx --since "1 hour ago" | grep -i "error"` filters Nginx logs from the past hour specifically for errors.

---

## Windows Server Management (PowerShell)
*D3 Security deployment workflows involve target Windows enterprise environments. Practice these PowerShell equivalents for common administrative tasks:*

### Process Management
* **List Process**: `Get-Process -Name "node"`
* **Kill Process**: `Stop-Process -Name "node" -Force`

### Service Management
* **Check Service**: `Get-Service -Name "W3SVC"` (IIS Web Service)
* **Restart Service**: `Restart-Service -Name "W3SVC"`

### Log Inspection
* **Query Event Log**: `Get-WinEvent -LogName Application -MaxEvents 20`
* **Filter Errors**: `Get-WinEvent -FilterHashtable @{LogName='System'; Level=2; StartTime=(Get-Date).AddHours(-1)}` *(Level 2 represents Error events).*
