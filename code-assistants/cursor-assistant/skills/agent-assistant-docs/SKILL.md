---
name: agent-assistant-docs
description: "📝 Docs — Full documentation suite (all sub-commands sequentially). Use when user types /docs."
---

# /docs

> Activates Agent Assistant `/docs` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/docs.md`
