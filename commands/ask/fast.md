---
description: ⚡ Quick Answer — Direct response from codebase context
version: "1.0"
category: knowledge
execution-mode: execute
---

# /ask:fast — Quick Question Answering

> **MISSION**: Provide fast, accurate answers using codebase context and existing knowledge.

<question>$ARGUMENTS</question>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."
  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists → MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error—NOT complexity/preference/speed"
  anti_lazy_fallback:
    - ❌ NEVER use Tier 2 when Tier 1 tool is available
    - ✅ ALWAYS attempt Tier 1 first when tool exists
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

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

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

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

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
