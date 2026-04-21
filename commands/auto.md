---
description: 🤖 Autonomous Execution — Full workflow automation
version: "1.0"
category: meta
execution-mode: router
---

# /auto — Autonomous Workflow Orchestrator

> **ROUTER DIRECTIVE**: Analyze task and autonomously execute complete workflow without user intervention between phases.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
1. Analyze task type
2. Determine optimal workflow
3. Execute all phases autonomously
4. Report only final result
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: TASK ANALYSIS

| Attribute | Value |
|-----------|-------|
| **Agent** | `tech-lead` |
| **Goal** | Classify task and select workflow |

### ⚡ ADAPTIVE EXECUTION

**IF platform supports subagents:**
> Delegate to `tech-lead` subagent. Do NOT read agent file directly.

**ELSE (EMBODY fallback):**
> Load `{AGENTS_PATH}/tech-lead.md`
> EMBODY [tech-lead] — Apply methodology from agent file.

**Exit Criteria:**

- [ ] Task type identified
- [ ] Workflow selected
- [ ] Execution plan created

---

## 🎭 Phase 2: AUTONOMOUS EXECUTION

Execute selected workflow phases without pause:

| Task Type   | Workflow                       |
| ----------- | ------------------------------ |
| Bug/Error   | `/debug:fast` or `/debug:hard` |
| New Feature | `/code:hard`                   |
| Question    | `/ask:fast` or `/ask:hard`     |
| Planning    | `/plan:fast` or `/plan:hard`   |
| Testing     | `/test:fast` or `/test:hard`   |

---

## 🎭 Phase 3: FINAL REPORT

| Attribute | Value |
|-----------|-------|
| **Agent** | `tech-lead` |
| **Goal** | Synthesize results and present summary |

### ⚡ ADAPTIVE EXECUTION

**IF platform supports subagents:**
> Delegate to `tech-lead` subagent. Do NOT read agent file directly.

**ELSE (EMBODY fallback):**
> Load `{AGENTS_PATH}/tech-lead.md`
> EMBODY [tech-lead] — Apply methodology from agent file.

**Exit Criteria:**

- [ ] All phases completed
- [ ] Results synthesized
- [ ] Summary presented

---

## COMPLETION

Present final result with:

1. ✅ **Done** — Task complete
2. 🔄 **Continue** — Follow-up actions available
