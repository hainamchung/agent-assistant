---
name: agent-assistant-ask
description: "❓ Ask Router — Route questions to answer workflows. Use when user types /ask."
---

# /ask

> Activates Agent Assistant `/ask` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/ask.md`
