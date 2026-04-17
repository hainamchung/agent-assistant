---
name: agent-assistant-auto
description: "🤖 Autonomous Execution — Full workflow automation. Use when user types /auto."
---

# /auto

> Activates Agent Assistant `/auto` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/auto.md`
