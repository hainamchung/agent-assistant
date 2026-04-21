<div align="center">
  <img src="https://agent-assistant-ten.vercel.app/assets/logo.svg" alt="Agent Assistant Logo" width="120" height="auto" />
</div>

# Agent Assistant

**Multi-agent orchestration for AI coding assistants**

Transform one AI into a coordinated team of 21 specialist agents with structured workflows and 1400+ domain skills.

[![npm (scoped)](https://img.shields.io/npm/v/@namch/agent-assistant?label=npm%20global)](https://www.npmjs.com/package/@namch/agent-assistant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## Why Agent Assistant?

| 🎯 Feature                      | What It Does                                                                                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One-Time Setup, Forever Use** | Configure once at global level (`~/.cursor/`, `~/.claude/`, etc.) and it auto-applies to ALL your projects. No more repetitive config for every new repo.                                      |
| **Sub-Agent Orchestration**     | When supported (Claude Code, Cursor Max mode), the main agent spawns specialized sub-agents to handle tasks **in parallel** — backend, frontend, testing, security all working simultaneously. |
| **Multi-Platform Support**      | Works seamlessly across **Cursor**, **GitHub Copilot**, **Claude Code**, **Codex**, and **Antigravity/Gemini**. Same workflows, any tool.                                                                 |
| **Matrix Skill Discovery (HSOL)** | Injects the right skills by profile and request; optional dynamic discovery (find-skills) for `hard`/`team` when matrix fitness &lt; 0.8. 1400+ matrix skills, zero manual config. |

### The Goal

> **Code less, deliver more.** Reduce token costs by 85%, cut bugs by 70%, and stop wasting time on repetitive tasks.

---

## Quick Results

| Metric                | Improvement       |
| --------------------- | ----------------- |
| ⏰ Time-to-Production | **70% faster**    |
| 🐛 Bug Rate           | **70% reduction** |
| 💰 Token Cost         | **85% savings**   |

---

## Installation

### Global Package (Recommended)

```bash
npm install -g @namch/agent-assistant@latest

# After installing globally, run:

agent-assistant install cursor # Setup for Cursor
agent-assistant install claude # Setup for Claude Code
agent-assistant install copilot # Setup for GitHub Copilot
agent-assistant install antigravity # Setup for Antigravity/Gemini
agent-assistant install codex # Setup for Codex
agent-assistant install --all # Setup for ALL tools
```

### From Source

```bash
# Clone
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant

# Install for your tool(s)
node cli/install.js install cursor      # Cursor
node cli/install.js install claude      # Claude Code
node cli/install.js install copilot     # GitHub Copilot
node cli/install.js install antigravity # Antigravity/Gemini
node cli/install.js install codex       # Codex
node cli/install.js install --all       # All tools
```

That's it. The framework installs globally and works across all your projects.

## Uninstall

### Remove configurations

```bash
agent-assistant uninstall cursor      # Remove from Cursor
agent-assistant uninstall claude      # Remove from Claude Code
agent-assistant uninstall copilot     # Remove from GitHub Copilot
agent-assistant uninstall antigravity # Remove from Antigravity/Gemini
agent-assistant uninstall codex       # Remove from Codex
agent-assistant uninstall --all       # Remove from ALL tools
```

### Remove global package

```bash
npm uninstall -g @namch/agent-assistant
```

### From Source

```bash
cd agent-assistant
node cli/install.js uninstall cursor      # Remove from Cursor
node cli/install.js uninstall claude      # Remove from Claude Code
node cli/install.js uninstall copilot     # Remove from GitHub Copilot
node cli/install.js uninstall antigravity # Remove from Antigravity/Gemini
node cli/install.js uninstall codex       # Remove from Codex
node cli/install.js uninstall --all   # Remove from all tools
# Then remove the directory
cd ..
rm -rf agent-assistant
```

---

## Quick Start

### 1. Generate Project Docs (Recommended)

```bash
/docs:core       # Technical docs for AI context
/docs:business   # Business requirements
```

Creates `./documents/` files that agents reference. Without docs, agents work generically. With docs, they follow YOUR patterns.

### 2. Start Building

```bash
/cook:fast "add dark mode toggle"           # Simple feature
/cook:hard "implement OAuth 2.0"            # Complex feature with all quality gates
/fix "payment fails on Safari"              # Bug fix
/plan "build notification system"           # Implementation plan
/test:hard "user registration flow"         # Generate tests
/review "audit auth module"                 # Code review
/report "status report for sprint"          # Reporting (create/update reports)
```

### Variants

| Variant | Use For          | Agents                     |
| ------- | ---------------- | -------------------------- |
| `:fast` | Simple tasks     | 2-3 agents                 |
| `:hard` | Complex features | 5-8 agents + quality gates |
| `:team` | Team workflows   | All agents, structured phases |

## Commands Reference

| Category    | Commands                                                 |
| ----------- | -------------------------------------------------------- |
| **Build**   | `/cook`, `/code`, `/fix`                                 |
| **Quality** | `/test`, `/review`, `/debug`                             |
| **Plan**    | `/plan`, `/brainstorm`, `/design`                        |
| **Docs**    | `/docs:core`, `/docs:business`, `/docs:audit`            |
| **Report**  | `/report:fast`, `/report:hard`, `/report:team`           |
| **Deploy**  | `/deploy:check`, `/deploy:preview`, `/deploy:production` |

---

## 21 Specialist Agents

| Domain             | Agents                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **Implementation** | backend-engineer, frontend-engineer, mobile-engineer, game-engineer                                 |
| **Architecture**   | tech-lead, database-architect                                                                       |
| **Quality**        | tester, reviewer, debugger, security-engineer                                                       |
| **Planning**       | planner, brainstormer, business-analyst                                                             |
| **Support**        | designer, devops-engineer, docs-manager, performance-engineer, researcher, scouter, project-manager, **reporter** |

---

## Matrix Skill Discovery

Agents don't have hardcoded skills. They declare a **profile**, and the Matrix automatically injects relevant skills:

```yaml
# Agent declares:
profile: "backend:execution"

# Matrix resolves → 20+ backend skills injected automatically
```

**1400+ skills** across 19 domains. Add a new skill once, all relevant agents get it instantly.

---

## Project Structure

```
agent-assistant/
├── agents/          # 21 specialist agents
├── commands/        # 50+ workflow commands (routers + variants: fast, hard, team)
├── rules/           # 8 orchestration rules
├── matrix-skills/   # 19 domain skill registries
├── skills/          # 1400+ domain skills
└── cli/             # Installer
```

---

## Supported Tools

| Tool           | Status  | Install Path  |
| -------------- | ------- | ------------- |
| Cursor         | ✅ Full | `~/.cursor/`  |
| Claude Code    | ✅ Full | `~/.claude/`  |
| GitHub Copilot | ✅ Full | `~/.copilot/` |
| Antigravity    | ✅ Full | `~/.gemini/`  |
| Codex          | ✅ Full | `~/.codex/`   |

---

## Contributing

1. Fork → Branch → Commit (`feat:`, `fix:`, `docs:`) → PR
2. Areas: Agents, Commands, Skills, Matrix, Docs, Bug fixes

---

## Support

If this helps you ship faster, consider buying me a coffee!

<a href="https://buymeacoffee.com/hainamchuns" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217">
</a>

<br/>
<img src="https://agent-assistant-ten.vercel.app/assets/buymeacoffee-qr.png" alt="Buy Me A Coffee QR Code" width="150" />
<br/>
<img src="https://agent-assistant-ten.vercel.app/assets/IMG_20260126_202557.png" alt="QR Code" width="150" />

---

## License

MIT — [NamCH](https://github.com/hainamchung) — [Issues](https://github.com/hainamchung/agent-assistant/issues)

<div align="center">

**Agent Assistant** — _Code less. Deliver more._

</div>
