---
title: Getting Started
type: chronicle
tags: [onboarding, getting-started, installation, tutorial]
created: 2026-05-20
updated: 2026-05-20
---

# Getting Started

This guide walks you through setting up Agent Assistant and running your first commands. By the end, you will have Agent Assistant installed across your configured platforms and understand the basic command syntax.

---

## Prerequisites

Before installing Agent Assistant, ensure you have:

| Requirement | Version | Purpose |
|-----------|--------|---------|
| Node.js | >= 18.0.0 | Runtime for CLI installer |
| npm | Latest recommended | Package management |
| git | Any recent version | Version control |
| OS | macOS, Linux, or Windows | Platform compatibility |

**Verify your setup**:

```bash
node --version   # Should output v18.0.0 or higher
npm --version    # Should output a version number
git --version   # Should output a version number
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd agent-assistant
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all npm dependencies for the CLI package.

### Step 3: Install to Platforms

```bash
node cli/install.js
```

This installs Agent Assistant to all detected platforms:

```
Installing to:
  - Cursor: ~/.cursor/ ✅
  - GitHub Copilot: ~/.github/copilot/ ✅
  - Claude Code: ~/.claude/ ✅
```

The installer will report status for each platform. If a platform directory is not found, it is skipped gracefully.

**Source**: `documents/knowledge-overview/04-getting-started.md:1-100`

---

## Verifying Installation

### List Installed Platforms

```bash
node cli/install.js --list
```

Expected output:

```
Installed platforms:
  - Cursor: ~/.cursor/ ✅
  - GitHub Copilot: ~/.github/copilot/ ✅
  - Claude Code: ~/.claude/ ✅
  - Antigravity: ~/.antigravity/ ⏭️ (not detected)
  - Codex: ~/.codex/ ⏭️ (not detected)
```

---

## Basic Usage

### Command Syntax

All commands follow this format:

```
/command:variant [parameters]
```

| Component | Required | Default | Example |
|-----------|----------|---------|---------|
| `/command` | Yes | — | `/cook` |
| `:variant` | No | `fast` | `:hard` |
| `[parameters]` | Depends | — | `"add user authentication"` |

### Quick Examples

```bash
# Quick documentation fix (fast — default)
/fix "correct typo in README"

# Complex feature implementation (hard variant)
/cook:hard "implement user authentication with JWT"

# Critical bug fix with adversarial review (team variant)
/fix:team "patch authentication bypass vulnerability"
```

---

## Running the Web Application

The web application provides a visual interface for exploring agents and teams.

### Start the Development Server

```bash
cd web
npm install
npm run dev
```

The web server starts on **http://localhost:5173**.

### Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with project overview |
| `/docs` | Documentation browser |
| `/installation` | Installation guide |
| `/features/agent-teams` | Interactive agent and team visualization |

---

## Uninstalling

To remove Agent Assistant from all platforms:

```bash
node cli/install.js --uninstall
```

This removes all installed files from platform directories. No data or configuration is deleted.

---

## Troubleshooting

### Node Version Error

**Problem**: `node: --check` fails with version error

**Solution**: Upgrade Node.js to >= 18.0.0

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18
```

### npm Cache Issues

**Problem**: Installation fails with network errors

**Solution**: Clear npm cache and retry

```bash
npm cache clean --force
npm install
```

### Wrong Working Directory

**Problem**: `cli/install.js` cannot find files

**Solution**: Ensure you are in the project root directory

```bash
pwd   # Should be the agent-assistant directory
ls cli/install.js   # Should list the file
```

---

## Next Steps

Now that Agent Assistant is installed, explore these resources:

- [[Project Overview]] — Understand the project purpose and architecture
- [[Command System]] — Learn all 14 commands and their variants
- [[Agent System]] — Explore the 21 specialist agents
- [[Directory Structure]] — Navigate the codebase
- [[Architecture Overview]] — Deep dive into the architecture

---

## Related Pages

- [[CLI Installer]] — CLI reference and advanced usage
- [[Web Application]] — Web app architecture and features
