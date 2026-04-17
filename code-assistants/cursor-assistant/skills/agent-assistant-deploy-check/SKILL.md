---
name: agent-assistant-deploy-check
description: "✅ Deploy Check — Pre-deployment readiness verification. Use when user types /deploy:check."
---

# /deploy:check

> Activates Agent Assistant `/deploy:check` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/deploy/check.md`
