---
schema-version: "1.0"
description: ⚡ Quick Implementation — Direct coding without planning phase
version: "1.0"
category: engineering
execution-mode: execute
topology: pipeline
---

# /code:fast — Rapid Implementation

> **MISSION**: Implement quickly with minimal overhead for well-defined tasks.

<task>$ARGUMENTS</task>

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

## ⚠️ CRITICAL: PHASE CONTINUITY RULES

```yaml
phase_continuity:
  rule: "If prior plan exists, MUST follow it"

  check_for_files:
    - "./reports/{topic}/plans/PLAN-{task}"

  enforcement:
    - If plan file exists → READ and FOLLOW it
    - If no plan → Proceed with inline approach
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

**Phase Dependencies**: P1 → P2 → P3 (sequential pipeline)

---

## 🎭 Phase 1: CONTEXT SCAN

| Attribute | Value                                       |
| --------- | ------------------------------------------- |
| **Agent** | `scouter`                                   |
| **Goal**  | Find relevant code patterns and conventions |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant files identified
- [ ] Patterns understood
- [ ] Conventions noted
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## 🎭 Phase 2: IMPLEMENTATION

| Attribute | Value                                                      |
| --------- | ---------------------------------------------------------- |
| **Agent** | Route by domain: `frontend-engineer` \| `backend-engineer` |
| **Goal**  | Implement the feature/fix                                  |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for appropriate domain engineer. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/[domain]-engineer.md`
> EMBODY [domain-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Code implemented
- [ ] Follows existing patterns
- [ ] Compiles without errors
- [ ] **METHODOLOGY CHECK**: Output aligns with the engineer agent's Thinking Protocol

---

## 🎭 Phase 3: QUICK VALIDATION

| Attribute | Value                              |
| --------- | ---------------------------------- |
| **Agent** | `tester`                           |
| **Goal**  | Basic validation of implementation |

### ⚡ EXECUTION MODEL

**Enhanced (when available):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**Standard (default):**

> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Basic functionality verified
- [ ] No obvious errors
- [ ] Ready for review
- [ ] **METHODOLOGY CHECK**: Output aligns with `tester` Thinking Protocol

---

## ESCALATION

| Condition                       | Route To            |
| ------------------------------- | ------------------- |
| Task more complex than expected | `/code:hard`        |
| Architectural decision needed   | `/plan:hard`        |
| Security concern                | `security-engineer` |

---

## COMPLETION

Present implementation with:

1. ✅ **Done** — Implementation complete
2. 🧪 **Test** → `/test:fast`
3. 🔍 **Review** → `/review:fast`
