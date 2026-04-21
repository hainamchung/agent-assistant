---
description: ⚡ Quick Implementation — Direct coding without planning phase
version: "1.0"
category: engineering
execution-mode: execute
---

# /code:fast — Rapid Implementation

> **MISSION**: Implement quickly with minimal overhead for well-defined tasks.

<task>$ARGUMENTS</task>

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

---

## 🎭 Phase 1: CONTEXT SCAN

| Attribute | Value                                       |
| --------- | ------------------------------------------- |
| **Agent** | `scouter`                                   |
| **Goal**  | Find relevant code patterns and conventions |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

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

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for appropriate domain engineer. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

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

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

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
