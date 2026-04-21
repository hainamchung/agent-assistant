---
description: "🔺 Team Fix — Golden Triangle adversarial collaboration for maximum quality issue resolution"
version: "2.0"
category: debugging
execution-mode: execute
---

# /fix:team — Golden Triangle Issue Resolution

> **MISSION**: Maximum quality issue resolution through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **TEAMS.md** — Golden Triangle protocol (MANDATORY)

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: Load `SKILLS.md` on-demand for fitness calculation and dynamic discovery.

---

## 🔀 TIERED EXECUTION

> Reference: AGENTS.md (Tiered Execution) + TEAMS.md (Golden Triangle Protocol)

| Tier       | When                          | Action                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------- |
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer      |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead  |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

**TIER 2 Golden Triangle Embodiment** (per TEAMS.md):
```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → dispatch
2. EMBODY Executor → implement assigned tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submissions → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor again → fix/defend → EMBODY Reviewer → re-check
5. Repeat steps 3–4 max 3 rounds
6. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output
```

---

## 📬 MAILBOX — Central Communication Hub

**Location**: `./reports/{topic}/MAILBOX-{date}.md`

All 3 triangle agents READ from and APPEND to this file. Never overwrite — append only.

**Message Format**:
```markdown
---
## [{TIMESTAMP}] {MESSAGE_TYPE} | {AGENT} → {TARGET}
**Phase**: {phase number}
**Task**: {task ID from Shared Task List}
**Content**:
{message body}
---
```

**Message Types**:

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | Review result: PASS or FAIL with findings       |
| DEFENSE           | Executor  | Reviewer  | Defend implementation against FAIL findings     |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## 📁 DELIVERABLE FILES

| Phase / Team       | Output                                         |
| ------------------ | ---------------------------------------------- |
| Phase 1 (Invest.)  | `./reports/{topic}/debugs/INVESTIGATION-{issue}`    |
| Phase 2 (RCA)      | `./reports/{topic}/debugs/DEBUG-{issue}`            |
| Phase 3 (Plan)     | `./reports/{topic}/plans/PLAN-{issue}`              |
| Phase 5 (Test)     | `./reports/{topic}/qa/QA-{issue}`                   |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                        | Requires                         | Blocking    |
| ---------------------------- | -------------------------------- | ----------- |
| P1: Investigation            | User issue report                | No          |
| P2: Root Cause Analysis      | P1 investigation findings        | **YES**     |
| P3: Fix Planning             | P2 confirmed root cause          | **YES**     |
| P4: Implementation           | **PLAN file**                    | **YES**     |
| P5: Testing & Verification   | PLAN + Code changes              | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Within each phase:

```
1. Spawn Golden Triangle (Tech Lead + Executor + Reviewer)
2. Tech Lead decomposes → publishes Shared Task List
3. Executor implements → posts SUBMISSION to Mailbox
4. Reviewer critiques → posts REVIEW to Mailbox
5. Debate loop: fix/defend → re-review (max 3 rounds)
6. Consensus reached → Tech Lead posts DECISION → Phase output released
```

**Consensus Stamp Format** (required to close each phase):
```
✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓
```

Format: rules/PHASES.md § Phase output structure + rules/TEAMS.md § Golden Triangle Phase Output Format.

---

## 🔺 GOLDEN TRIANGLE LOOP — Universal Protocol

> Every phase below follows this exact loop. Deviations are PROHIBITED.

```
┌─────────────────────────────────────────────────────────────────────┐
│  GOLDEN TRIANGLE LOOP                                               │
│                                                                     │
│  1. Tech Lead decomposes phase goal into tasks                      │
│     → Publishes Shared Task List                                    │
│     → Posts TASK_ASSIGNMENT to Mailbox for each task                │
│                                                                     │
│  2. Executor works each task                                        │
│     → Posts SUBMISSION to Mailbox per task                          │
│     → Includes: what was done, files/artifacts, approach, notes     │
│                                                                     │
│  3. Reviewer reviews each SUBMISSION                                │
│     → Posts REVIEW to Mailbox: PASS or FAIL                         │
│     → FAIL includes: findings table, severity, required actions     │
│                                                                     │
│  4. IF FAIL (debate loop, max 3 rounds):                            │
│     → Executor reads findings                                       │
│     → For each finding: Fix (if valid) or DEFENSE (if disputed)     │
│     → Posts RESUBMISSION or DEFENSE to Mailbox                      │
│     → Reviewer re-reviews → back to step 3                          │
│     → After 3 rounds without resolution → ESCALATION to Tech Lead  │
│                                                                     │
│  5. IF PASS:                                                        │
│     → Reviewer posts APPROVAL to Mailbox                            │
│     → Task marked ✅ in Shared Task List                            │
│                                                                     │
│  6. After ALL tasks complete:                                       │
│     → Tech Lead verifies integration/coherence                      │
│     → Tech Lead posts DECISION with consensus stamp                 │
│     → Phase output released                                         │
│                                                                     │
│  OUTPUT: ✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Phase 1: INVESTIGATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `debugger`                           | Decompose: triage bug, define investigation areas, coordinate |
| Executor  | `scouter`                            | Execute: codebase analysis, trace error paths, identify root cause candidates |
| Reviewer  | `researcher` (Devil's Advocate)      | Challenge: question root cause hypotheses, find alternative explanations |

**Triangle Loop**:
1. `debugger` triages the issue → decomposes into investigation areas: reproduction steps, error tracing, code path analysis, environmental factors
2. `debugger` posts TASK_ASSIGNMENT to Mailbox for each area → dispatches to `scouter`
3. `scouter` investigates each area deeply → posts SUBMISSION to Mailbox with per-area findings:
   - Reproduction results (consistent? intermittent?)
   - Error trace with call stack analysis
   - Code paths traversed and fault candidates
   - Recent changes near fault zone (git blame, recent commits)
   - Environmental variables (config, dependencies, state)
4. `researcher` reviews each SUBMISSION → posts REVIEW to Mailbox:
   - Are the root cause candidates plausible or is correlation confused with causation?
   - Are there alternative explanations not yet explored?
   - Is the evidence chain complete or are there gaps?
   - Could the symptoms mask a deeper systemic issue?
5. If REVIEW = FAIL → `scouter` addresses gaps or defends findings → posts RESUBMISSION/DEFENSE
6. `researcher` re-reviews → max 3 rounds → ESCALATION to `debugger` if unresolved
7. `debugger` synthesizes all approved findings into unified investigation report

**Deliverable**: `./reports/{topic}/debugs/INVESTIGATION-{issue}`
**Exit Criteria**: Bug reproduced, error paths traced, root cause candidates identified, hypotheses challenged, evidence chain documented
**Consensus**: ✅ CONSENSUS: debugger ✓ | scouter ✓ | researcher ✓

---

## 🎭 Phase 2: ROOT CAUSE ANALYSIS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                                    | Mission                                                    |
| --------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `debugger`                                               | Synthesize investigation → confirm root cause → plan fix approach |
| Executor  | `backend-engineer` / `frontend-engineer` (context-dependent) | Execute: deep-dive into root cause, validate hypothesis with code evidence |
| Reviewer  | `reviewer`                                               | Challenge: verify root cause is correct, check for related issues, regression risk |

**Executor Selection**:
```
IF bug is in server logic, API, database, middleware → backend-engineer
IF bug is in UI rendering, state, events, client logic → frontend-engineer
IF unclear → debugger (Tech Lead) decides based on P1 investigation findings
```

**Prerequisite**: **READ** `./reports/{topic}/debugs/INVESTIGATION-{issue}`

**Triangle Loop**:
1. `debugger` reads investigation report → selects top root cause candidate(s) → decomposes validation tasks:
   - Hypothesis validation with code evidence
   - Impact scope analysis (what else does this affect?)
   - Related issue scan (is this a symptom of a larger pattern?)
2. `debugger` posts TASK_ASSIGNMENT to Mailbox → dispatches to executor
3. Executor deep-dives into each root cause candidate → posts SUBMISSION with:
   - Code evidence proving/disproving each hypothesis
   - Exact lines of code causing the fault
   - Trigger conditions (what input/state causes the fault)
   - Impact scope: all affected components, endpoints, or flows
   - Related issues discovered during analysis
4. `reviewer` reviews each SUBMISSION → posts REVIEW:
   - Is the root cause truly confirmed or just the most obvious suspect?
   - Are there related issues that share the same root cause?
   - What is the regression risk of fixing this area?
   - Could fixing this break something else?
   - Is the impact assessment complete?
5. Debate loop if FAIL → executor defends or deepens analysis → max 3 rounds
6. `debugger` synthesizes confirmed root cause into authoritative debug report

**Deliverable**: `./reports/{topic}/debugs/DEBUG-{issue}`
**Exit Criteria**: Root cause confirmed with code evidence, impact scope documented, regression risk assessed, related issues cataloged
**Consensus**: ✅ CONSENSUS: debugger ✓ | {executor} ✓ | reviewer ✓

---

## 🎭 Phase 3: FIX PLANNING — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `planner`                            | Decompose: plan fix steps, define acceptance criteria, rollback strategy |
| Executor  | `researcher`                         | Execute: research fix approaches, evaluate trade-offs, draft plan sections |
| Reviewer  | `tech-lead` (feasibility critic)     | Challenge: question approach, verify no side effects, check regression risk |

**Prerequisite**: **READ** `./reports/{topic}/debugs/DEBUG-{issue}`

**Triangle Loop**:
1. `planner` reads debug report → decomposes fix planning into sections:
   - Fix approach evaluation (multiple strategies)
   - Implementation task breakdown
   - Rollback strategy
   - Acceptance criteria derived from root cause
   - Risk matrix
2. `planner` posts TASK_ASSIGNMENT to Mailbox → dispatches to `researcher`
3. `researcher` researches and drafts each plan section → posts SUBMISSION per section:
   - Fix approaches compared (minimal patch vs. refactor vs. redesign)
   - Trade-off analysis: risk, effort, long-term maintainability
   - Implementation tasks with ordering and dependencies
   - Rollback steps with verification criteria
   - Acceptance criteria: how to prove the bug is fixed
4. `tech-lead` reviews each plan section → posts REVIEW:
   - Is the fix approach proportional to the bug severity?
   - Are there side effects not accounted for?
   - Is the rollback strategy actually viable under failure?
   - Are estimates realistic?
   - Does the fix address root cause or just symptoms?
   - Will the fix introduce new technical debt?
5. Debate loop if FAIL → `researcher` adjusts or defends → max 3 rounds
6. `planner` synthesizes all approved sections into final fix plan

**Deliverable**: `./reports/{topic}/plans/PLAN-{issue}`
**Exit Criteria**: Fix approach selected, implementation steps defined, rollback strategy verified, acceptance criteria set, risks mitigated
**Consensus**: ✅ CONSENSUS: planner ✓ | researcher ✓ | tech-lead ✓

---

---

## 🎭 Phase 4: IMPLEMENTATION — 🔺 GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

### Team Selection

```
IF fix spans frontend + backend →
  Tech Lead: tech-lead
  Executor: backend-engineer (then frontend-engineer, sequential)
  Reviewer: reviewer

IF fix is backend-only →
  Tech Lead: tech-lead
  Executor: backend-engineer
  Reviewer: reviewer

IF fix is frontend-only →
  Tech Lead: tech-lead
  Executor: frontend-engineer
  Reviewer: reviewer

IF fix is game-related →
  Tech Lead: tech-lead
  Executor: game-engineer
  Reviewer: reviewer

IF fix is mobile-related →
  Tech Lead: tech-lead
  Executor: mobile-engineer
  Reviewer: reviewer

IF other domain → Consult TEAMS.md roster for correct triangle
```

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                              | Load fix plan → decompose into implementation tasks → coordinate all work |
| Executor  | `backend-engineer` / `frontend-engineer` / `game-engineer` / `mobile-engineer` | Implement fix EXACTLY per plan → submit via Mailbox        |
| Reviewer  | `reviewer`                               | Review EVERY change: correctness, no regression, security, plan compliance |

**Prerequisite**: **READ and FOLLOW** `./reports/{topic}/plans/PLAN-{issue}`

### GOLDEN TRIANGLE IMPLEMENTATION LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 4: FIX IMPLEMENTATION LOOP — FOLLOW EXACTLY                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads PLAN-{issue}.md                            ║
║  ─────────────────────────────────────────                           ║
║  - Load full fix plan into working context                           ║
║  - Identify all implementation tasks from plan                       ║
║  - Determine task ordering and dependencies                          ║
║  - Cross-reference with DEBUG-{issue}.md root cause                  ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  ─────────────────────────────────────────                           ║
║  - Break plan into atomic fix tasks                                  ║
║  - Order by priority and dependency                                  ║
║  - Format: [ID] [Status] [Description] [Files] [Acceptance]         ║
║  - Post Shared Task List in Mailbox as TASK_ASSIGNMENT               ║
║                                                                      ║
║  STEP 3: Tech Lead dispatches ALL tasks to Executor                  ║
║  ─────────────────────────────────────────                           ║
║  - Posts TASK_ASSIGNMENT to Mailbox for each task                    ║
║  - Each assignment includes:                                         ║
║    • Task ID and description                                         ║
║    • Exact files to create/modify                                    ║
║    • Root cause reference from DEBUG report                          ║
║    • Acceptance criteria from plan                                   ║
║    • Dependencies on other tasks                                     ║
║                                                                      ║
║  STEP 4: FOR EACH TASK — Executor implements                         ║
║  ─────────────────────────────────────────                           ║
║  a. Executor reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Executor implements fix EXACTLY as plan specifies                ║
║  c. Executor posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ What was fixed: {description}         │                         ║
║     │ Files changed: {list of files}        │                         ║
║     │ Root cause addressed: {reference}     │                         ║
║     │ Approach taken: {rationale}           │                         ║
║     │ Self-review notes: {any concerns}     │                         ║
║     │ Plan step reference: {which plan step}│                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Reviewer reviews each SUBMISSION                            ║
║  ─────────────────────────────────────────                           ║
║  d. Reviewer reads SUBMISSION from Mailbox                           ║
║  e. Reviewer checks against ALL 6 dimensions:                        ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. CORRECTNESS — Does fix resolve the root cause?     │         ║
║     │ 2. REGRESSION — Could this break adjacent features?   │         ║
║     │ 3. SECURITY — Injection, auth, input validation?      │         ║
║     │ 4. PLAN COMPLIANCE — Matches plan spec exactly?       │         ║
║     │ 5. CODE QUALITY — Naming, structure, DRY, SOLID?      │         ║
║     │ 6. ROLLBACK SAFETY — Can this change be safely undone?│         ║
║     └──────────────────────────────────────────────────────┘         ║
║  f. Reviewer posts REVIEW to Mailbox:                                ║
║     ┌──────────────────────────────────────┐                         ║
║     │ REVIEW                                │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ Status: PASS or FAIL                  │                         ║
║     │ Findings:                             │                         ║
║     │ | # | Finding | Severity | Action |   │                         ║
║     │ |---|---------|----------|--------|   │                         ║
║     │ | 1 | ...     | CRITICAL | Fix    |   │                         ║
║     │ | 2 | ...     | MINOR    | Suggest|   │                         ║
║     │ Required actions: {list}              │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 6: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  ─────────────────────────────────────────                           ║
║  g. Executor reads REVIEW findings from Mailbox                      ║
║  h. For EACH finding:                                                ║
║     - If VALID → Fix the code → Note what was fixed                  ║
║     - If DISPUTED → Write DEFENSE with evidence:                     ║
║       "Finding #2 is invalid because [evidence/reasoning]"           ║
║  i. Executor posts RESUBMISSION or DEFENSE to Mailbox:               ║
║     ┌──────────────────────────────────────┐                         ║
║     │ RESUBMISSION / DEFENSE                │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ Round: {1/2/3}                        │                         ║
║     │ Fixes applied: {list}                 │                         ║
║     │ Defended findings: {list + evidence}  │                         ║
║     └──────────────────────────────────────┘                         ║
║  j. Reviewer re-reviews → posts new REVIEW → back to step (e)        ║
║  k. After round 3 without resolution:                                ║
║     → Reviewer posts ESCALATION to Mailbox                           ║
║     → Tech Lead reads all debate history                             ║
║     → Tech Lead posts ARBITRATION with binding resolution            ║
║                                                                      ║
║  STEP 7: IF PASS                                                     ║
║  ─────────────────                                                   ║
║  l. Reviewer posts APPROVAL to Mailbox                               ║
║  m. Tech Lead marks task ✅ in Shared Task List                      ║
║  n. Move to next task → back to step (a)                             ║
║                                                                      ║
║  STEP 8: After ALL tasks complete                                    ║
║  ─────────────────────────────                                       ║
║  o. Tech Lead verifies full integration:                             ║
║     - All tasks ✅ in Shared Task List                               ║
║     - No cross-task conflicts                                        ║
║     - Fix addresses root cause (not just symptoms)                   ║
║     - Rollback path remains viable                                   ║
║  p. Tech Lead posts DECISION to Mailbox:                             ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 4 — Implementation             │                         ║
║     │ Status: COMPLETE                      │                         ║
║     │ Tasks completed: {count}/{total}      │                         ║
║     │ Disputes resolved: {count}            │                         ║
║     │ Arbitrations needed: {count}          │                         ║
║     │ ✅ CONSENSUS: tech-lead ✓ |           │                         ║
║     │    {executor} ✓ | reviewer ✓          │                         ║
║     └──────────────────────────────────────┘                         ║
║  q. Phase output released                                            ║
╚══════════════════════════════════════════════════════════════════════╝
```

### STRICT PLAN ADHERENCE (ENFORCED BY REVIEWER)

```
1. READ PLAN FIRST — every task MUST trace to a plan step
2. IF step seems wrong → STOP → Executor posts ESCALATION to Mailbox
   → Tech Lead evaluates → Request Re-Planning or Override
3. NO unauthorized deviations — Reviewer explicitly checks for this:
   "Does this SUBMISSION match the plan step? Any additions not in plan?"
4. Deviations found by Reviewer → automatic FAIL with:
   Severity: CRITICAL | Action: "Remove unauthorized code or get plan amended"
```

**Exit Criteria**: All fix tasks implemented, all reviews passed, no unauthorized deviations, root cause addressed, integration verified
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | {executor} ✓ | reviewer ✓

---

## 🎭 Phase 5: TESTING & VERIFICATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tester`                             | Decompose: test strategy for fix verification + regression testing |
| Executor  | `tester` (self-implements tests)     | Execute: write tests proving fix, run regression suite, generate coverage |
| Reviewer  | `security-engineer`                  | Challenge: edge cases, security implications, verify no regressions introduced |

**Prerequisite**: **READ** `PLAN-{issue}.md` + `DEBUG-{issue}.md` + implementation changes

**Triangle Loop**:
1. `tester` (as Tech Lead) reads plan + debug report + code changes → decomposes into test strategy:
   - Fix verification tests (prove the bug is fixed)
   - Regression tests (prove nothing else broke)
   - Edge case tests (boundary conditions near the fault)
   - Security test cases (if fix touches auth, input, or data flow)
   - Performance baseline assertions (if fix touches hot paths)
2. `tester` (as Tech Lead) posts TASK_ASSIGNMENT to Mailbox with test plan
3. `tester` (as Executor) writes and runs all tests → posts SUBMISSION per test category:
   - Tests written (file list)
   - Tests passed / failed
   - Coverage percentage for changed files
   - Root cause verification results
4. `security-engineer` reviews test submissions → posts REVIEW:
   - Does the fix verification test actually prove the root cause is resolved?
   - Are regression tests covering adjacent functionality?
   - Edge cases: what inputs/states near the fault boundary are untested?
   - Security: if the fix area handles user input or auth, are security tests present?
   - Could the fix be bypassed or cause a new vulnerability?
5. Debate loop if FAIL → fix gaps or defend → max 3 rounds
6. `tester` (as Tech Lead) synthesizes final QA report

**ROOT CAUSE VERIFICATION** (MANDATORY):
```
FOR EACH symptom in DEBUG-{issue}.md:
  → tester: Write test reproducing original bug (must FAIL without fix, PASS with fix)
  → security-engineer: Confirm test truly validates root cause fix (not a trivial pass)
  → Document: "Symptom X → Test: {test name} → Root Cause Y → Verified: {pass/fail}"
```

**REGRESSION VERIFICATION** (MANDATORY):
```
FOR EACH affected component in DEBUG-{issue}.md:
  → tester: Write regression test for adjacent functionality
  → security-engineer: Verify no new attack surface introduced
  → Document: "Component X → Regression Test: {test name} → Status: {pass/fail}"
```

**Deliverable**: `./reports/{topic}/qa/QA-{issue}`
**Exit Criteria**: Fix verified against root cause, regression tests pass, security validated, edge cases covered, no new vulnerabilities
**Consensus**: ✅ CONSENSUS: tester ✓ | tester(exec) ✓ | security-engineer ✓

---

## ✅ COMPLETION

Present final issue resolution report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Issue Resolution Report: {issue}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Investigation | debugger / scouter / researcher | ✅ | {n} |
| P2: Root Cause Analysis | debugger / {executor} / reviewer | ✅ | {n} |
| P3: Fix Planning | planner / researcher / tech-lead | ✅ | {n} |
| P4: Implementation | tech-lead / {executor} / reviewer | ✅ | {n} |
| P5: Testing & Verification | tester / tester / security-engineer | ✅ | {n} |

## Root Cause Summary
- **Root Cause**: {confirmed root cause from DEBUG report}
- **Fix Applied**: {fix approach from PLAN}
- **Verification**: {test proving fix from QA}

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Fixed** — Issue resolved (triangle-validated across all phases)
2. 🔄 **Rollback** — Rollback plan verified and documented
3. 🚀 **Deploy** → `/deploy:preview`
4. 📝 **Docs** → `/docs:core`
```
