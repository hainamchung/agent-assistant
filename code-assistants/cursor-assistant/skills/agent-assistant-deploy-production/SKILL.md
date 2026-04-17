---
name: agent-assistant-deploy-production
description: "🚀 Deploy Production — Production release with safety gates. Use when user types /deploy:production."
---

# /deploy:production

> Activates Agent Assistant `/deploy:production` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/deploy/production.md`
