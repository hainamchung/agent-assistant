# Agent Assistant CLI

Command-line installer for the Agent Assistant Framework.

## Overview

This CLI tool installs the Agent Assistant framework for different AI coding tools. It copies the necessary files (agents, commands, skills, rules) to the appropriate locations for each tool.

## Supported Tools

| Tool            | Install Location     | Description                 |
| --------------- | -------------------- | --------------------------- |
| **Cursor**      | `~/.cursor/`         | Cursor AI Editor            |
| **Copilot**     | `~/.copilot/skills/` | GitHub Copilot in VS Code   |
| **Antigravity** | `~/.gemini/`         | Google Antigravity / Gemini |
| **Claude**      | `~/.claude/`         | Anthropic Claude CLI        |
| **Codex**       | `~/.codex/`          | OpenAI Codex CLI            |

## Installation

### Option 1: Run directly from repository

```bash
# Clone the repository
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant

# Install for a specific tool
node cli/install.js install cursor
node cli/install.js install copilot
node cli/install.js install antigravity

# Or install for all tools
node cli/install.js install --all
```

### Option 2: Using npm scripts

```bash
# Install for specific tools
npm run install:cursor
npm run install:copilot
npm run install:antigravity

# Install for all tools
npm run install:all
```

## Usage

```
Usage: agent-assistant <command> [options]

Commands:
  install [tool]     Install for a specific tool (cursor, copilot, antigravity, claude, codex)
  install --all      Install for all supported tools
  uninstall [tool]   Uninstall from a specific tool
  list               List supported tools and installation status
  help               Show help message

Examples:
  agent-assistant install cursor
  agent-assistant install claude
  agent-assistant install --all
  agent-assistant uninstall copilot
  agent-assistant list
```

## Commands

### install

Install the Agent Assistant framework for one or more tools.

```bash
# Install for Cursor
agent-assistant install cursor

# Install for GitHub Copilot
agent-assistant install copilot

# Install for Antigravity/Gemini
agent-assistant install antigravity

# Install for Claude Code
agent-assistant install claude

# Install for Codex
agent-assistant install codex

# Install for all tools
agent-assistant install --all

# Interactive mode (prompts for selection)
agent-assistant install
```

### uninstall

Remove the Agent Assistant framework from a tool.

```bash
# Uninstall from Cursor
agent-assistant uninstall cursor

# Uninstall from all tools
agent-assistant uninstall --all
```

### list

Show supported tools and their installation status.

```bash
agent-assistant list
```

Example output:

```
📋 Supported Tools:

  cursor       Cursor AI Editor              ✅ Installed
  copilot      GitHub Copilot                ✅ Installed
  antigravity  Google Antigravity / Gemini   ✅ Installed
  claude       Claude Code                   ✅ Installed
  codex        OpenAI Codex CLI              ✅ Installed
```

## What Gets Installed

### For Cursor

| Content        | Location                              |
| -------------- | ------------------------------------- |
| Global Rules   | `~/.cursor/rules/agent-assistant.mdc` |
| Commands       | `~/.cursor/commands/`                 |
| Skills         | `~/.cursor/skills/`                   |
| Agents         | `~/.cursor/agents/`                   |
| Core Framework | `~/.cursor/skills/agent-assistant/`   |

### For GitHub Copilot

| Content          | Location                                                     |
| ---------------- | ------------------------------------------------------------ |
| Agent Definition | `~/.copilot/skills/agent-assistant/agent-assistant.agent.md` |
| Core Framework   | `~/.copilot/skills/agent-assistant/`                         |
| Skills           | `~/.copilot/skills/`                                         |
| Native Agents    | `~/.copilot/skills/agents/`                                  |

### For Antigravity (Gemini)

| Content          | Location                                                  |
| ---------------- | --------------------------------------------------------- |
| Global Rules     | `~/.gemini/GEMINI.md`                                     |
| Agent Definition | `~/.gemini/antigravity/agents/AntigravityGlobal.agent.md` |
| Core Framework   | `~/.gemini/antigravity/skills/agent-assistant/`           |
| Skills           | `~/.gemini/antigravity/skills/`                           |
| Workflows        | `~/.gemini/antigravity/workflows/`                        |

### For Claude Code

| Content        | Location                            |
| -------------- | ----------------------------------- |
| Global Rules   | `~/.claude/CLAUDE.md`               |
| Commands       | `~/.claude/commands/`               |
| Skills         | `~/.claude/skills/`                 |
| Agents         | `~/.claude/agents/`                 |
| Core Framework | `~/.claude/skills/agent-assistant/` |

### For Codex

| Content        | Location                            |
| -------------- | ----------------------------------- |
| Global Rules   | `~/.codex/AGENTS.md` (primary), `~/.codex/CODEX.md` (compat) |
| Commands       | `~/.codex/commands/`               |
| Skills         | `~/.codex/skills/`                 |
| Agents         | `~/.codex/agents/`                 |
| Core Framework | `~/.codex/skills/agent-assistant/` |

## Path Replacements

The installer automatically replaces placeholder paths in all Markdown files:

| Placeholder               | Replacement                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| `{TOOL}`                  | Tool-specific path (e.g., `cursor`, `copilot`, `codex`, `gemini/antigravity`) |
| `{TOOL}/agent-assistant/` | Full path to agent-assistant directory                               |

## Requirements

- Node.js 18.0.0 or higher
- Write permissions to home directory

## Troubleshooting

### Permission Denied

If you get permission errors, ensure you have write access to the target directories:

```bash
# Check permissions
ls -la ~/.cursor/
ls -la ~/.copilot/
ls -la ~/.gemini/
ls -la ~/.codex/

# Create directories if needed
mkdir -p ~/.cursor/skills
mkdir -p ~/.copilot/skills
mkdir -p ~/.gemini/antigravity/skills
mkdir -p ~/.codex/skills
```

### Files Not Found

If the installer reports missing source files, ensure you're running from the repository root or have the complete package:

```bash
# Verify directory structure
ls -la agents/
ls -la commands/
ls -la skills/
```

### Tool Not Detecting Framework

After installation, you may need to:

1. **Restart the AI tool** or VS Code
2. **Reload the window** (Cmd+Shift+P → "Reload Window")
3. **Check the tool's documentation** for how to enable custom rules/agents

## License

MIT License - Part of the Agent Assistant Framework.
