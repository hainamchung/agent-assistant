---
description: "Help — Discover commands, agents, and system capabilities"
version: "1.0"
schema-version: "1.0"
category: support
execution-mode: router
topology: pipeline
---

# /help — System Help & Discovery

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — NANO tier only (Identity, Paths, Command Routing)

**⛔ Do not run any routing until loaded.**

---

## Routing

| Input | Route |
|-------|-------|
| `/help` (no args) | `help/overview.md` |
| `/help {command}` (cook, fix, plan, etc.) | `help/command.md` with command={arg} |
| `/help agents` | `help/agents.md` |
| `/help rules` | `help/overview.md` §Rules section |
| `/help skills` | `help/overview.md` §Skills section |

## Fallback

If topic is not recognized → route to `help/overview.md` and prepend:
> ⚠️ Topic "{input}" not found. Showing system overview.
