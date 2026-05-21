# Getting Started

> **File**: `documents/knowledge-overview/04-getting-started.md`
> **Purpose**: Prerequisites, installation, configuration, and first run

---

## Prerequisites

### System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Node.js** | >= 18.0.0 | Latest LTS |
| **npm** | Latest | Latest |
| **Git** | Any recent | Latest |
| **OS** | macOS, Linux, Windows | macOS/Linux |

### Verify Installation

```bash
# Check Node.js version
node --version
# Expected: v18.x.x or higher

# Check npm version
npm --version
# Expected: 9.x.x or higher

# Check git version
git --version
# Expected: 2.x.x or higher
```

---

## Installation

### Option 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant

# Install dependencies
npm install
```

### Option 2: npm Package (Coming Soon)

```bash
# Install globally (when published)
npm install -g @namch/agent-assistant
```

---

## CLI Installation

After cloning, install Agent Assistant to your AI coding platforms:

```bash
# Install to all supported platforms
node cli/install.js

# List available platforms
node cli/install.js --list

# Uninstall from all platforms
node cli/install.js --uninstall
```

### Platform-Specific Installation

The CLI automatically installs to:
- **Cursor**: `~/.cursor/`
- **GitHub Copilot**: `~/.copilot/`
- **Claude Code**: `~/.claude/`
- **Antigravity/Gemini**: `~/.antigravity/` and `~/.gemini/`
- **Codex**: `~/.codex/`
- **Kiro**: `~/.kiro/`
- **Qwen**: `~/.qwen/`

---

## Project Structure

After installation, verify the structure:

```bash
# View project root
ls -la

# Expected directories:
# agents/       - 21 specialist agents
# agents/teams/ - 18 Golden Triangle teams
# commands/     - 14 commands with variants
# rules/        - 8 orchestration rules
# matrix-skills/ - Skill tier registry
# skills/       - 1400+ domain skills
# code-assistants/ - Platform configurations
# cli/          - CLI installer
# web/          - React documentation site
# documents/    - Project documentation
```

---

## First Run Commands

### 1. Test CLI

```bash
# Verify installation
node cli/install.js --list
```

### 2. Start Web Documentation

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

Expected output:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 3. Explore the Codebase

```bash
# View available commands
ls commands/

# View available agents
ls agents/

# View available teams
ls agents/teams/
```

---

## Configuration

### Environment Variables

Create a `.env` file for local development:

```bash
# Optional: Custom platform paths
CURSOR_PATH=~/.{TOOL}
COPILOT_PATH=~/.github/copilot
CLAUDE_PATH=~/.claude
ANTIGRAVITY_PATH=~/.antigravity
CODEX_PATH=~/.codex
```

### Platform Configuration Files

Each platform has a configuration folder in `code-assistants/`:

| Platform | Path |
|----------|------|
| Cursor | `code-assistants/cursor/` |
| GitHub Copilot | `code-assistants/copilot/` |
| Claude Code | `code-assistants/claude/` |
| Antigravity | `code-assistants/antigravity/` |
| Codex | `code-assistants/codex/` |
| Kiro | `code-assistants/kiro/` |
| Qwen | `code-assistants/qwen/` |

---

## Using Commands

### Command Syntax

```bash
/command           # Fast variant (default)
/command:fast     # Explicit fast variant
/command:hard     # Hard variant (complex tasks)
/command:team     # Team variant (Golden Triangle)
```

### Examples

```bash
# Quick fix (fast variant)
/fix

# Complex implementation (hard variant)
/cook:hard

# Critical feature (team variant)
/build:team
```

---

## Next Steps

### For New Developers

1. Read `01-project-identity.md` — Understand the project vision
2. Read `../knowledge-architecture/01-system-overview.md` — Understand the architecture
3. Review `rules/CORE.md` — Core orchestration rules
4. Pick a command to explore — Start with `/fix` or `/cook`

### For Project Managers

1. Read `01-project-identity.md` — Project overview
2. Review `03-features.md` — Complete feature list
3. Explore `agents/teams/` — Team definitions
4. Review `commands/` — Available commands

### For Contributors

1. Read `../knowledge-standards/01-code-style.md` — Code style guide
2. Read `../knowledge-standards/03-git-workflow.md` — Git workflow
3. Review `rules/` — All orchestration rules
4. Pick an agent to specialize in

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `node: command not found` | Install Node.js 18+ from nodejs.org |
| `npm install` fails | Clear cache: `npm cache clean --force` |
| CLI not working | Check Node.js version: `node --version` |
| Web won't start | Navigate to `web/` directory first |

### Getting Help

| Resource | URL |
|----------|-----|
| GitHub Issues | https://github.com/hainamchung/agent-assistant/issues |
| Documentation | `documents/` folder |
| Rules | `rules/` folder |

---

## Evidence Sources

- `package.json` — NPM scripts and dependencies
- `web/package.json` — Web dependencies
- `cli/install.js` — CLI implementation
- `code-assistants/*/` — Platform configurations
- `README.md` — Original getting started guide
