---
name: agent-assistant-docs-audit
description: "🔒 Audit Docs — Security and compliance documentation. Use when user types /docs:audit."
---

# /docs:audit

> Activates Agent Assistant `/docs:audit` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/docs/audit.md`
