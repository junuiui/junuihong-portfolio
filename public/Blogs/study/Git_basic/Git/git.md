# Version Control

## What is Git?
> **Git is a distributed version control system (DVCS)** designed to track changes in source code during software development. Unlike older centralized systems, every developer's computer stores the entire history of the project, allowing for offline work, faster operations, and powerful branching capabilities.

## Git basic commands

### add
> The git add command moves changes from your working directory to the Staging Area. This tells Git which modifications you want to include in the next snapshot.

```bash
# Stage 
git add <filename>

# Stage all changes
git add .
```

### commit
> The git commit command captures a permanent snapshot of the staged changes and saves it to the Local Repository history. Every commit requires a message explaining what changed and why.

```bash
# Commit staged changes with a message
git commit -m '<message>'
```

## Git branch
> A Branch is essentially a lightweight, movable pointer to a specific commit. It allows developers to diverge from the main line of development and work on new features, bug fixes, or experiments in isolation without affecting the stable source code

```
graph LR
    A((Commit 1)) --> B((Commit 2))
    B --> C((Commit 3 - main))
    B --> D((Commit 4 - feature))
    D --> E((Commit 5 - feature))
```

> **Core Concept**: Branches make *parallel development* seamless. Multiple developers can work on `feature/login`, `feature/payment`, and `bugfix/logout` simultaneously

```bash
# Create a new branch
git branch feature/login

# Switch to the new branch
git switch feature/login   # Or older: git checkout feature/login

# Create and switch to a branch at the same time
git switch -c feature/login  # Or older: git checkout -b feature/login

# List all local branches
git branch
```

## Merge vs Rebase: Combining Branches
> Both `git merge` and `git rebase` serve the same purpose: integrating changes from one branch into another. However, they achieve this in completely different ways, resulting in distinct project histories

| Features | Git Merge | Git Rebase |
| :- | :- | :- |
| **Mechanism** | Combines the tips of both branches, creating a new merge commit | Moves the entire branch history to begin at the tip of the target branch. |
| **History** | **Non-destructive**. Preserves the exact chronological history of how code was developed. | **Rewrites history**. Creates a clean, perfectly linear commit history. |
| **Traceability** | Easy to see when a branch was integrated because of the merge commit. | Hides the branch context; looks like all work happened sequentially on one line. |
| **Rule of Thumb** | Best for shared/public branches where changing history is dangerous. | Best for local/private feature branches to clean up history before pushing. |

### Visual Comparison
> **Merge**: Retains the original branch structure and creates a "tie-in" commit (M).  
> **Rebase**: Plucks your feature commits (C1, C2) and replays them on top of the latest target commit (B), generating brand new commit hashes (C1', C2').

## Local vs. Remote Repositories: Push, Fetch, and Pull
> A Remote Repository (hosted on GitHub, GitLab, Bitbucket) acts as a centralized source of truth. Your Local Repository interacts with it using dedicated synchronization commands.

```
graph LR
    subgraph Local Machine
        A[Local Repository History]
    end
    subgraph Remote Platform GitHub/GitLab
        B[Remote Repository History]
    end
    
    A -- git push --> B
    B -- git fetch --> A
    B -- git pull "fetch + merge" --> A
```

- `git push`: Uploads your local branch commits to the remote repository. This shares your updates with the team.
- `git fetch`: Downloads the latest history, branches, and tags from the remote repository to your local computer, but does not modify your working code. It updates your tracking pointers (like origin/main), allowing you to inspect changes before safely integrating them.
- `git pull`: Downloads and immediately merges remote changes into your current active local branch. It is a shortcut command that performs a git fetch followed immediately by a git merge.

## Git’s 3-Tree Architecture
> Git manages your project files using three distinct states, often called "trees" or "areas." Understanding how files move between them is essential to mastering Git.

```
graph LR
    WD[1. Working Directory] -- git add --> SA[2. Staging Area]
    SA -- git commit --> RP[3. Local Repository]
    RP -- git checkout/switch --> WD
```

- **Working Directory (Sandbox)**
  - **What it is**: The actual files on your computer's hard drive that you can see and edit in your IDE (VS Code, IntelliJ, etc.).
  - **State**: Changes here are untracked or modified but not yet safely saved by Git.
- **Staging Area / Index (The On-Deck Circle)**
  - **What it is**: A hidden binary file managed by Git that acts as a preparation zone. It stores a list of exactly what changes will go into your next commit.
  - **State**: Files here are staged. It allows you to select only specific files (or even specific lines) to save, keeping your commits organized.
- **Local Repository / Git Directory (The Safe Vault)**
  - **What it is**: The .git folder inside your project. It stores your project's permanent history, commit metadata, and compressed file snapshots.
  - **State**: Files here are committed. Once a change reaches this stage, it is securely locked into the project timeline.