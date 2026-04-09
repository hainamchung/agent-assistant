---
schema-version: "1.0"
description: ⚡⚡⚡ Research Answer — External research with comprehensive analysis
version: "1.0"
category: knowledge
execution-mode: execute
topology: pipeline
---

# /ask:hard — Research-Backed Answering

> **MISSION**: Provide comprehensive, research-backed answers through multi-source analysis.

<question>$ARGUMENTS</question>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**LOAD on-demand** (when entering relevant phase):
- `VALIDATION-GATES.md` — Phase gates block progression until exit criteria pass
- `AGENT-JOURNALS.md` — Agents record decisions/observations inline (max 3/phase)
- `CONDITIONAL-HANDOFFS.md` — Guard expressions route work dynamically on errors/complexity

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

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

## 🎭 Phase 1: QUESTION ANALYSIS

| Attribute | Value                                       |
| --------- | ------------------------------------------- |
| **Agent** | `brainstormer`                              |
| **Goal**  | Decompose question into research components |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Question scope defined
- [ ] Research areas identified
- [ ] Success criteria established

---

## 🎭 Phase 2: CODEBASE ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Map relevant codebase context |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant code found
- [ ] Patterns documented
- [ ] Internal context complete

---

## 🎭 Phase 3: EXTERNAL RESEARCH

| Attribute | Value                                        |
| --------- | -------------------------------------------- |
| **Agent** | `researcher`                                 |
| **Goal**  | Research external sources and best practices |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] External sources consulted
- [ ] Best practices identified
- [ ] Sources documented

---

## 🎭 Phase 4: SYNTHESIS

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `researcher`                    |
| **Goal**  | Synthesize comprehensive answer |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] All sources synthesized
- [ ] Answer comprehensive
- [ ] Actionable recommendations included

---

## COMPLETION

Present research report with:

1. ✅ **Answered** — Question resolved
2. 📋 **Plan** → `/plan:hard` if implementation needed
3. 💻 **Implement** → `/code:hard` for complex implementation
