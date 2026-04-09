---
schema-version: "1.0"
description: ⚡ Quick Answer — Direct response from codebase context
version: "1.0"
category: knowledge
execution-mode: execute
topology: pipeline
---

# /ask:fast — Quick Question Answering

> **MISSION**: Provide fast, accurate answers using codebase context and existing knowledge.

<question>$ARGUMENTS</question>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 EXECUTION MODEL

> **Reference: RUNTIME.md (Execution Model)`

```yaml
execution_model:
  principle: "Role-Based Hybrid — EMBODY for context-dependent agents, SUB-AGENT for independence-dependent agents."
  for_each_phase:
    EMBODY_MODE: "IF agent.category IN [meta, execution, investigation, support] → EMBODY (shared context)"
    SUB_AGENT_MODE: "IF agent.category IN [validation, research] → SUB-AGENT with Context Briefing"
  rules:
    - ❌ NEVER use SUB-AGENT for context-dependent agents (execution/meta/investigation/support)
    - ✅ ALWAYS use SUB-AGENT for independence-dependent agents (validation/research) when tool exists
    - ⚠️ FALLBACK: All EMBODY + Anti-Bias Protocol when sub-agent tool unavailable
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: CONTEXT GATHERING

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `scouter`                            |
| **Goal**  | Find relevant code and documentation |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant files identified
- [ ] Context gathered
- [ ] Information sufficient (if not → escalate to `/ask:hard`)

---

## 🎭 Phase 2: ANSWER FORMULATION

| Attribute | Value                            |
| --------- | -------------------------------- |
| **Agent** | `researcher`                     |
| **Goal**  | Formulate clear, accurate answer |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Answer formulated
- [ ] Sources cited
- [ ] Confidence level noted

---

## ESCALATION

| Condition                  | Route To     |
| -------------------------- | ------------ |
| Insufficient context       | `/ask:hard`  |
| Requires external research | `/ask:hard`  |
| Implementation needed      | `/code:fast` |

---

## COMPLETION

Present answer with:

1. ✅ **Answered** — Question resolved
2. 🔬 **Deep Dive** → `/ask:hard` for more detail
3. 💻 **Implement** → Route to implementation workflow
