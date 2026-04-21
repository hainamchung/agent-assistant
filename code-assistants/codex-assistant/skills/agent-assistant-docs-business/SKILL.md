---
name: agent-assistant-docs-business
description: "📊 Business Docs — Business documentation files. Use when user types /docs:business."
---

# /docs:business

> Activates Agent Assistant `/docs:business` workflow.

## Rules

1. **Load first**: `~/.codex/skills/agent-assistant/rules/CORE.md` — follow all 10 Laws
2. **Agents**: Spawn via Codex native multi-agent (`~/.codex/agents/`)
3. **Skills**: Resolve from `~/.codex/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.codex/skills/agent-assistant/commands/docs/business.md`
