---
name: agent-assistant-docs-business
description: "📊 Business Docs — Business documentation files. Use when user types /docs:business."
---

# /docs:business

> Activates Agent Assistant `/docs:business` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/docs/business.md`
