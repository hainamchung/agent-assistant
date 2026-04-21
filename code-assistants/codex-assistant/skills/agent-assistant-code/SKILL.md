---
name: agent-assistant-code
description: "💻 Code Router — Route to implementation workflows. Use when user types /code."
---

# /code

> Activates Agent Assistant `/code` workflow.

## Rules

1. **Load first**: `~/.codex/skills/agent-assistant/rules/CORE.md` — follow all 10 Laws
2. **Agents**: Spawn via Codex native multi-agent (`~/.codex/agents/`)
3. **Skills**: Resolve from `~/.codex/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.codex/skills/agent-assistant/commands/code.md`
