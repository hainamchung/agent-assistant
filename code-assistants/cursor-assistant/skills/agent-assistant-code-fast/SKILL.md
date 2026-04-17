---
name: agent-assistant-code-fast
description: "⚡ Quick Implementation — Direct coding without planning phase. Use when user types /code:fast."
---

# /code:fast

> Activates Agent Assistant `/code:fast` workflow.

## Rules

1. **Load first**: `~/.cursor/skills/agent-assistant/rules/RUNTIME.md` — follow all Laws
2. **Agents**: Spawn via Cursor native multi-agent (`~/.cursor/agents/`)
3. **Skills**: Resolve from `~/.cursor/skills/agent-assistant/matrix-skills/`

## Workflow

**Load and follow**: `~/.cursor/skills/agent-assistant/commands/code/fast.md`
