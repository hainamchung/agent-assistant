---
name: agent-assistant-debug
description: "🐛 Debug Router — Route to debugging workflows. Use when user types /debug."
---

# /debug

> Activates Agent Assistant `/debug` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/debug.md`
