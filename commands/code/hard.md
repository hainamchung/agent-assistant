---
description: ⚡⚡⚡ Full Development Cycle — Plan → Implement → Test → Review
version: "1.0"
category: engineering
execution-mode: execute
---

# /code:hard — Full Development Cycle

> **MISSION**: Execute complete development workflow with planning, implementation, testing, and review.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 📌 PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES

**Before starting Phase 1**, resolve whether the user is **coding from an existing plan**. If yes, **do not** run research, scout, or brainstorm.

### Detection

- User message references a plan: e.g. `@plan`, `@PLAN-...`, path like `./reports/{topic}/plans/PLAN-{name}`, or phrases like "according to plan", "follow the plan", "code from plan", "implement per plan".
- Or a plan file already exists for this task at `./reports/{topic}/plans/PLAN-{task}` (derive `{task}` from `$ARGUMENTS` or from the referenced file name).

### Resolution

1. **CHECK**: Does a valid plan file exist (user-provided path or `./reports/{topic}/plans/PLAN-{task}`)?
2. **IF YES**:
   - **SKIP** Phase 1 (Requirements/Brainstorm), Phase 2 (Scout), Phase 3 (Planning).
   - **ANNOUNCE**: "✅ Plan provided/found — skipping research, scout, and planning. Proceeding to implementation."
   - **GO TO**: Verification Checkpoint (Context Optimization) → then Phase 4 (Implementation) → Phase 5 (Testing) → Phase 6 (Review).
3. **IF NO**: Run phases in order: Phase 1 → 2 → 3 → Checkpoint → 4 → 5 → 6.

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."

  tool_discovery: "Check runSubagent availability BEFORE first delegation"

  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists → MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error—NOT complexity/preference/speed"

  anti_lazy_fallback:
    - ❌ NEVER use Tier 2 when Tier 1 tool is available
    - ✅ ALWAYS attempt Tier 1 first when tool exists
    - ✅ ALWAYS log justification for Tier 2 fallback
```

---

## ⚠️ CRITICAL: PHASE CONTINUITY RULES

```yaml
phase_continuity:
  rule: "Each phase MUST reference and follow outputs from prior phases"

  check_for_files:
    - "./reports/{topic}/brainstorms/BRAINSTORM-{task}"
    - "./reports/{topic}/scouts/SCOUT-{task}"
    - "./reports/{topic}/plans/PLAN-{task}"

  enforcement:
    - Phase 3 (Planning) MUST incorporate Scout findings
    - Phase 4 (Implementation) MUST follow the Plan file exactly
    - Phase 5 (Testing) MUST verify all plan checkpoints
    - If prior phase file missing → Agent MUST create it
```

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

## 🔗 INPUT REQUIREMENTS & VERIFICATION MATRIX

```yaml
phase_dependencies:
  phase_1_requirements:
    input_required: "User Request"
    blocking: false

  phase_2_scout:
    input_required: "User Request"
    blocking: false
    output: "./reports/{topic}/scouts/SCOUT-{task}"

  phase_3_planning:
    input_required:
      - "./reports/{topic}/scouts/SCOUT-{task}"
    blocking: true
    verification: "Plan MUST cite Scout findings"
    output: "./reports/{topic}/plans/PLAN-{task}"

  phase_4_implementation:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}" # MANDATORY
    blocking: true
    verification: "Implementation MUST follow plan step-by-step"
    deviation_protocol: "STOP → Document → Request Re-Planning"

  phase_5_testing:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}"
      - "Code changes from Phase 4"
    blocking: true
    verification: "Tests MUST cover all plan checkpoints"

  phase_6_review:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}"
      - "Code + Tests"
    blocking: true
    verification: "Code MUST match plan intent"
```

## 🛑 BLOCKING ENFORCEMENT

```
BEFORE entering any BLOCKING phase:
  1. CHECK: Does required input file exist?
  2. IF missing:
     a. OUTPUT: "⛔ BLOCKED: Missing [{file}]"
     b. ROUTE to creating agent
     c. WAIT for creation
  3. IF exists:
     a. READ and LOCK as constraint
     b. PROCEED
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: REQUIREMENTS ANALYSIS

| Attribute   | Value                             |
| ----------- | --------------------------------- |
| **Agent**   | `brainstormer`                    |
| **Goal**    | Clarify requirements if ambiguous |
| **Trigger** | If requirements unclear           |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] Scope defined
- [ ] Acceptance criteria established
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## 🎭 Phase 2: CODEBASE ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Full codebase context mapping |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Architecture understood
- [ ] Patterns documented
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns as constraints)

---

## 🎭 Phase 3: IMPLEMENTATION PLANNING

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `planner`                  |
| **Goal**  | Create implementation plan |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `planner`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/planner.md`
> EMBODY [planner] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Plan created
- [ ] Steps defined
- [ ] Risks identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `planner` Thinking Protocol (constraint consumption, complexity scoring)

---

---

## 🎭 Phase 4: IMPLEMENTATION

| Attribute | Value                               |
| --------- | ----------------------------------- |
| **Agent** | `tech-lead` → routes to specialists |
| **Goal**  | Execute plan with specialist agents |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tech-lead`. Context: ISOLATED.
> Tech-lead will spawn specialist subagents as needed.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tech-lead.md`
> EMBODY [tech-lead] — Requires logged system error justification.
> Then recursively EMBODY specialists as needed.

### 🔗 INPUT REQUIREMENTS (BLOCKING)

```yaml
required_inputs:
  mandatory:
    - file: "./reports/{topic}/plans/PLAN-{task}"
      action: "READ first, FOLLOW exactly"
      if_missing: "STOP → Route to planner"
```

### ⚡ STRICT ADHERENCE DIRECTIVE

```
1. READ plan completely BEFORE any implementation
2. FOR EACH plan step:
   a. Implement EXACTLY as specified
   b. Mark complete: `- [ ]` → `- [x]`
3. IF deviation needed:
   a. STOP
   b. REQUEST Re-Planning
   c. DO NOT proceed with own interpretation
```

**Exit Criteria:**

- [ ] All plan steps executed
- [ ] Code complete
- [ ] Documentation updated
- [ ] **Each plan step has corresponding implementation**
- [ ] **No unauthorized deviations**
- [ ] **METHODOLOGY CHECK**: Output aligns with `tech-lead` Thinking Protocol (proper delegation, drift detection)

---

## 🎭 Phase 5: TESTING

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `tester`              |
| **Goal**  | Comprehensive testing |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Tests written
- [ ] All tests pass
- [ ] Coverage adequate
- [ ] **METHODOLOGY CHECK**: Output aligns with `tester` Thinking Protocol (test pyramid, determinism verification)

---

## 🎭 Phase 6: REVIEW

| Attribute | Value               |
| --------- | ------------------- |
| **Agent** | `reviewer`          |
| **Goal**  | Code quality review |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Code reviewed
- [ ] Standards met
- [ ] No blocking issues
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol (plan compliance check, priority matrix)

---

## COMPLETION

Present implementation report with:

1. ✅ **Done** — Feature complete
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
