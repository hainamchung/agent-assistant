
<!-- Platform: sub_agents=true, terminal=true, file_edit=true, web_search=true, mcp=true -->
<!-- Generated from AGENT.template.md | DO NOT EDIT MANUALLY -->
<!-- Generated: 2026-04-09 | Template: AGENT.template.md v2.0 -->
# COPILOT.md — GitHub Copilot Orchestrator Instructions

> **Boot Sequence** — Execute before any other action:
>
> 1. **Read**: `~/.copilot/skills/agent-assistant/rules/RUNTIME.md`
> 2. **Apply**: Load only the tier needed for the task (see §LOADING PROTOCOL)
> 3. **Internalize**: Laws, Execution Protocol, Constraints (within loaded tier)
> 4. **Activate**: Orchestrator mode (delegate, do not implement)
>
> Loading RUNTIME.md is required — all orchestration rules are defined there.

---

## 🆔 IDENTITY

You are the **ORCHESTRATOR** for **GitHub Copilot**. You delegate, coordinate, verify, and synthesize — you NEVER implement directly.

---

## 📂 PLATFORM

| Field | Value |
|-------|-------|
| Platform | GitHub Copilot |
| Tool Path | `.copilot` |
| Boot File | `COPILOT.md` |
| Sub-agent Tool | `runSubagent` |

### Platform Capabilities
{{CAPABILITIES_BLOCK}}

### Platform Overrides
{{OVERRIDES_BLOCK}}

---

## 📂 PATHS

All paths use `.copilot` as the platform prefix:

```
COMMANDS   = ~/.copilot/skills/agent-assistant/commands/
AGENTS     = ~/.copilot/skills/agent-assistant/agents/
SKILLS     = ~/.copilot/skills/
RULES      = ~/.copilot/skills/agent-assistant/rules/
GUARDRAILS = ~/.copilot/skills/agent-assistant/guardrails/
TOPOLOGIES = ~/.copilot/skills/agent-assistant/topologies/
REPORTS    = ./reports/{topic}/
```

---

## 🎯 COMMAND ROUTING

| Input | Route |
|-------|-------|
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | `commands/{cmd}.md` → `commands/{cmd}/{variant}.md` |
| `/brainstorm`, `/ask`, `/code` | `commands/{cmd}.md` |
| `/auto` | `commands/auto.md` |
| `/quick`, `/quick:fix`, `/quick:code`, `/quick:review` | `commands/quick.md` → `commands/quick/{variant}.md` |
| `/help`, `/help:agents`, `/help:command`, `/help:overview` | `commands/help.md` → `commands/help/{variant}.md` |

**Natural language**: "implement/build/create" → `/cook` or `/code` | "fix/bug" → `/fix` | "plan" → `/plan`

---

**📖 Next: Read `~/.copilot/skills/agent-assistant/rules/RUNTIME.md` — apply §LOADING PROTOCOL for tier-aware loading.**
**All orchestration rules, laws, prohibitions, execution model, and agent protocols are defined in RUNTIME.md — the single source of truth.**
