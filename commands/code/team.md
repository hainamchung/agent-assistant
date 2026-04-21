---
description: "🔺 Team Code — Golden Triangle adversarial collaboration for maximum quality coding"
version: "2.0"
category: engineering
execution-mode: execute
---

# /code:team — Golden Triangle Code Implementation

> **MISSION**: Maximum quality code implementation through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.
>
> **KEY DIFFERENCE FROM /cook:team**: No research, no design, no planning phases.
> Pure coding: scope → implement → verify. Use when you know WHAT to build and just need it BUILT RIGHT.

<task>$ARGUMENTS</task>

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

| Phase / Team      | Output                                          |
| ----------------- | ----------------------------------------------- |
| Phase 1 (Scope)   | Shared Task List in Mailbox                     |
| Phase 2 (Impl.)   | Code changes + review trail in Mailbox          |
| Phase 3 (Verify)  | `./reports/{topic}/reviews/REVIEW-{task}`            |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                     | Requires                         | Blocking    |
| ------------------------- | -------------------------------- | ----------- |
| P1: Scope Analysis        | User request                     | No          |
| P2: Implementation        | Scope + Task List from P1        | **YES**     |
| P3: Verification          | Code changes from P2             | **YES**     |

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

## 🎭 Phase 1: SCOPE ANALYSIS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Decompose: analyze scope, identify affected files, define task list |
| Executor  | `scouter`                            | Execute: scan codebase, map dependencies, identify integration points |
| Reviewer  | `reviewer` (Devil's Advocate)        | Challenge: scope correct? Missing dependencies? Breaking changes? |

**Triangle Loop**:
1. `tech-lead` reads user request → decomposes into scope areas: affected modules, files to change, dependencies, risks
2. `tech-lead` posts TASK_ASSIGNMENT to Mailbox → dispatches to `scouter`
3. `scouter` scans codebase deeply → posts SUBMISSION to Mailbox with:
   - Files to create/modify (exact paths)
   - Dependency map (what depends on what)
   - Integration points (APIs, imports, shared state)
   - Existing patterns to follow
   - Potential side effects
4. `reviewer` reviews SUBMISSION → posts REVIEW to Mailbox:
   - Is the scope complete or are files missing?
   - Are there hidden dependencies not mapped?
   - Will these changes break existing functionality?
   - Are there cross-cutting concerns (auth, logging, error handling)?
5. If REVIEW = FAIL → `scouter` addresses gaps or defends → posts RESUBMISSION/DEFENSE
6. `reviewer` re-reviews → max 3 rounds → ESCALATION to `tech-lead` if unresolved
7. `tech-lead` synthesizes into final Shared Task List for Phase 2

**Deliverable**: Scoped task list with affected files, dependencies, and integration points
**Exit Criteria**: All affected files identified, dependencies mapped, risks surfaced, task list ready
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | scouter ✓ | reviewer ✓

---

## 🎭 Phase 2: IMPLEMENTATION — 🔺 GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

### Team Selection

```
IF fullstack (frontend + backend changes) →
  Tech Lead: tech-lead
  Executor: backend-engineer (then frontend-engineer, sequential)
  Reviewer: reviewer

IF backend-only →
  Tech Lead: tech-lead
  Executor: backend-engineer
  Reviewer: reviewer

IF frontend-only →
  Tech Lead: tech-lead
  Executor: frontend-engineer
  Reviewer: reviewer

IF game development →
  Tech Lead: tech-lead
  Executor: game-engineer
  Reviewer: reviewer

IF mobile development →
  Tech Lead: tech-lead
  Executor: mobile-engineer
  Reviewer: reviewer

IF other domain → Consult TEAMS.md roster for correct triangle
```

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                              | Load scope → decompose into coding tasks → coordinate all work |
| Executor  | `backend-engineer` / `frontend-engineer` / `game-engineer` / `mobile-engineer` | Implement code changes → submit via Mailbox |
| Reviewer  | `reviewer`                               | Review EVERY submission: correctness, security, performance, style |

**Prerequisite**: **READ** Phase 1 scope output (task list + dependency map) before starting.

### GOLDEN TRIANGLE IMPLEMENTATION LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 2: IMPLEMENTATION LOOP — FOLLOW EXACTLY                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads Phase 1 scope output                       ║
║  ─────────────────────────────────────────                           ║
║  - Load full task list from Phase 1                                  ║
║  - Identify all coding tasks                                         ║
║  - Determine task ordering and dependencies                          ║
║                                                                      ║
║  STEP 2: Tech Lead creates Implementation Task List                  ║
║  ─────────────────────────────────────────                           ║
║  - Break scope into atomic coding tasks                              ║
║  - Order by dependency (foundations first, then consumers)           ║
║  - Format: [ID] [Status] [Description] [Files] [Acceptance]         ║
║  - Post Task List in Mailbox as TASK_ASSIGNMENT                      ║
║                                                                      ║
║  STEP 3: Tech Lead dispatches ALL tasks to Executor                  ║
║  ─────────────────────────────────────────                           ║
║  - Posts TASK_ASSIGNMENT to Mailbox for each task                    ║
║  - Each assignment includes:                                         ║
║    • Task ID and description                                         ║
║    • Exact files to create/modify                                    ║
║    • Acceptance criteria                                             ║
║    • Dependencies on other tasks                                     ║
║    • Patterns to follow (from Phase 1 codebase scan)                 ║
║                                                                      ║
║  STEP 4: FOR EACH TASK — Executor implements                         ║
║  ─────────────────────────────────────────                           ║
║  a. Executor reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Executor implements task following existing patterns              ║
║  c. Executor posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ What was implemented: {description}   │                         ║
║     │ Files changed: {list of files}        │                         ║
║     │ Approach taken: {rationale}           │                         ║
║     │ Self-review notes: {any concerns}     │                         ║
║     └──────────────────────────────────────┘                         ║
║                                                                      ║
║  STEP 5: Reviewer reviews each SUBMISSION                            ║
║  ─────────────────────────────────────────                           ║
║  d. Reviewer reads SUBMISSION from Mailbox                           ║
║  e. Reviewer checks against ALL 5 dimensions:                        ║
║     ┌──────────────────────────────────────────────────────┐         ║
║     │ 1. CORRECTNESS — Does it work? Edge cases handled?    │         ║
║     │ 2. SECURITY — Injection, auth, input validation?      │         ║
║     │ 3. PERFORMANCE — N+1 queries, unnecessary loops?      │         ║
║     │ 4. SCOPE COMPLIANCE — Matches scoped task exactly?    │         ║
║     │ 5. CODE QUALITY — Naming, structure, DRY, SOLID?      │         ║
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
║  m. Tech Lead marks task ✅ in Task List                             ║
║  n. Move to next task → back to step (a)                             ║
║                                                                      ║
║  STEP 8: After ALL tasks complete                                    ║
║  ─────────────────────────────                                       ║
║  o. Tech Lead verifies full integration:                             ║
║     - All tasks ✅ in Task List                                      ║
║     - No cross-task conflicts                                        ║
║     - API contracts match between modules                            ║
║  p. Tech Lead posts DECISION to Mailbox:                             ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 2 — Implementation             │                         ║
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

### SCOPE ADHERENCE (ENFORCED BY REVIEWER)

```
1. READ SCOPE FIRST — every task MUST trace to Phase 1 scope
2. IF task seems wrong → STOP → Executor posts ESCALATION to Mailbox
   → Tech Lead evaluates → Re-scope or Override
3. NO scope creep — Reviewer explicitly checks for this:
   "Does this SUBMISSION stay within scoped changes? Any additions not in scope?"
4. Scope creep found by Reviewer → automatic FAIL with:
   Severity: CRITICAL | Action: "Remove out-of-scope code or get scope amended"
```

**Exit Criteria**: All scoped tasks implemented, all reviews passed, no unauthorized scope creep, integration verified
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | {executor} ✓ | reviewer ✓

---

## 🎭 Phase 3: VERIFICATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                        | Mission                                                    |
| --------- | -------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tester`                                     | Decompose: verification strategy, test what was changed    |
| Executor  | `tester` (self-implements tests)             | Execute: write tests, run tests, generate coverage report  |
| Reviewer  | `security-engineer`                          | Challenge: edge cases, regressions, security implications  |

**Triangle Loop**:
1. `tester` (as Tech Lead) reads Phase 2 implementation output → decomposes verification into:
   - Unit tests for changed/new functions
   - Integration tests for affected endpoints or modules
   - Regression checks for dependent code
   - Edge case validation
2. `tester` (as Tech Lead) posts TASK_ASSIGNMENT to Mailbox with test plan
3. `tester` (as Executor) writes and runs tests → posts SUBMISSION per test category:
   - Tests written (file list)
   - Tests passed / failed
   - Coverage percentage for changed files
   - Edge cases validated
4. `security-engineer` reviews test submissions → posts REVIEW:
   - Are security-sensitive paths tested (auth, input validation, injection)?
   - Are edge cases truly edge cases or happy paths in disguise?
   - Are there regression risks in dependent code not covered?
   - Are error paths and failure modes tested?
5. Debate loop if FAIL → `tester` fixes gaps or defends → max 3 rounds
6. `tester` (as Tech Lead) synthesizes final verification report

**Deliverable**: `./reports/{topic}/reviews/REVIEW-{task}`
**Exit Criteria**: All tests pass, changed code covered, security validated, no regressions detected
**Consensus**: ✅ CONSENSUS: tester ✓ | tester(exec) ✓ | security-engineer ✓

---

## ✅ COMPLETION

Present final code implementation report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Code Report: {task}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Scope Analysis | tech-lead / scouter / reviewer | ✅ | {n} |
| P2: Implementation | tech-lead / {executor} / reviewer | ✅ | {n} |
| P3: Verification | tester / tester / security-engineer | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Files Changed
{list of all files created/modified}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Done** — Code complete (triangle-validated across all phases)
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
4. ❌ **Changes required** — Critical issues found → `/fix:team`
5. 🧪 **Test gaps** — Insufficient coverage → `/test:team`
```
