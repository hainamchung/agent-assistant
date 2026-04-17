---
name: agent-assistant-plan
description: "📋 Plan Router — Route to planning workflows. Use when user types /plan."
---

# /plan

> Activates Agent Assistant `/plan` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/plan.md`
