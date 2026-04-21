---
description: "🔺 Team Feature — Golden Triangle parallel agent collaboration for maximum quality"
version: "2.0"
category: engineering
execution-mode: execute
---

# /cook:team — Golden Triangle Feature Development

> **MISSION**: Maximum quality feature development through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<feature>$ARGUMENTS</feature>

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

| Phase / Team    | Output                                          |
| --------------- | ----------------------------------------------- |
| Phase 1 (Disc.) | `./reports/{topic}/brainstorms/BRAINSTORM-{feature}` |
| Phase 2 (Res.)  | `./reports/{topic}/researchers/RESEARCH-{feature}`   |
| Phase 2 (Res.)  | `./reports/{topic}/scouts/SCOUT-{feature}`           |
| Phase 4 (Des.)  | `./reports/{topic}/designs/DESIGN-{feature}`         |
| Phase 5 (Plan)  | `./reports/{topic}/plans/PLAN-{feature}`             |
| ALL Phases       | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                        | Requires                         | Blocking    |
| ---------------------------- | -------------------------------- | ----------- |
| P1: Requirements & Discovery | User request                     | No          |
| P2: Research & Patterns      | P1 requirements                  | No          |
| P3: Database Design          | Data requirements from P1/P2     | Conditional |
| P4: Design                   | Scout findings from P2           | Conditional |
| P5: Planning                 | RESEARCH + SCOUT + DESIGN        | **YES**     |
| P6: Implementation           | **PLAN file**                    | **YES**     |
| P7: Testing & Review         | PLAN + Code + Tests              | **YES**     |

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

## 🎭 Phase 1: REQUIREMENTS & DISCOVERY — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `researcher`                         | Decompose: requirements gathering, codebase survey, prior art |
| Executor  | `scouter`                            | Execute: deep codebase analysis, map architecture, identify integration points |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: poke holes in findings, identify missed requirements, question assumptions |

**Triangle Loop**:
1. `researcher` decomposes discovery into areas: functional requirements, non-functional requirements, codebase context, prior art
2. `researcher` posts TASK_ASSIGNMENT to Mailbox for each area → dispatches to `scouter`
3. `scouter` surveys codebase deeply → posts SUBMISSION to Mailbox with findings per area
4. `brainstormer` reviews each SUBMISSION → posts REVIEW to Mailbox:
   - Are requirements complete? Any edge cases missed?
   - Are assumptions validated or just guesses?
   - What user scenarios are unaccounted for?
5. If REVIEW = FAIL → `scouter` addresses gaps or defends findings → posts RESUBMISSION/DEFENSE
6. `brainstormer` re-reviews → max 3 rounds → ESCALATION to `researcher` if unresolved
7. `researcher` synthesizes all approved findings into unified requirements document

**Deliverable**: Requirements + discovery report in `./reports/{topic}/brainstorms/BRAINSTORM-{feature}`
**Exit Criteria**: All requirements captured, codebase understood, gaps identified, assumptions challenged
**Consensus**: ✅ CONSENSUS: researcher ✓ | scouter ✓ | brainstormer ✓

---

## 🎭 Phase 2: RESEARCH & PATTERNS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `researcher`                         | Decompose: pattern research areas, technology evaluation criteria |
| Executor  | `researcher` (self-executes research)| Execute: deep-dive patterns, libraries, best practices, alternatives |
| Reviewer  | `tech-lead` (feasibility critic)     | Challenge: assess feasibility, question complexity, verify patterns fit existing codebase |

**Triangle Loop**:
1. `researcher` (as Tech Lead) identifies research areas → Shared Task List → Mailbox
2. `researcher` (as Executor) deep-dives each area → posts SUBMISSION with findings, comparisons, trade-offs
3. `tech-lead` reviews each research finding → posts REVIEW:
   - Does this pattern actually fit our codebase?
   - Is the complexity justified for our scale?
   - Are there simpler alternatives overlooked?
   - Will this introduce maintenance burden?
4. Debate loop if FAIL → `researcher` defends or pivots → max 3 rounds
5. `researcher` (as Tech Lead) synthesizes approved research into final deliverables

**Deliverable**: `./reports/{topic}/researchers/RESEARCH-{feature}` + `./reports/{topic}/scouts/SCOUT-{feature}`
**Exit Criteria**: Patterns researched, alternatives documented, feasibility validated by tech-lead
**Consensus**: ✅ CONSENSUS: researcher ✓ | researcher(exec) ✓ | tech-lead ✓

---

## 🎭 Phase 3: DATABASE DESIGN (IF DATA CHANGES) — 🔺 GOLDEN TRIANGLE

> **Trigger**: Feature involves database changes, new models, or migrations. Skip if no data changes.

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Decompose: schema design tasks, migration planning, data validation rules |
| Executor  | `database-architect`                 | Execute: design schema, write migrations, plan indexes, define constraints |
| Reviewer  | `reviewer` + security/perf lens      | Challenge: SQL injection risks, N+1 queries, missing indexes, data integrity holes |

**Triangle Loop**:
1. `tech-lead` decomposes database work → Shared Task List → TASK_ASSIGNMENT to Mailbox
2. `database-architect` designs schema, relations, migrations → posts SUBMISSION with:
   - Schema diagram / ERD description
   - Migration scripts
   - Index strategy
   - Query patterns for common operations
3. `reviewer` reviews with security + performance lens → posts REVIEW:
   - Any SQL injection vectors in query patterns?
   - Missing indexes for expected query patterns?
   - N+1 query risks in relation design?
   - Data integrity: foreign keys, constraints, cascades correct?
   - Encryption at rest for sensitive fields?
4. Debate loop if FAIL → `database-architect` fixes or defends → max 3 rounds
5. `tech-lead` arbitrates any disputes → posts DECISION

**Deliverable**: Approved schema design + migration plan
**Exit Criteria**: Schema designed, security reviewed, performance validated, migrations planned
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | database-architect ✓ | reviewer ✓

---

## 🎭 Phase 4: DESIGN (IF UI NEEDED) — 🔺 GOLDEN TRIANGLE

> **Trigger**: Feature has UI components. Skip if backend-only.

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `designer`                           | Decompose: UI components, interaction flows, design system tokens |
| Executor  | `frontend-engineer`                  | Execute: create design specs, component structures, responsive layouts |
| Reviewer  | `reviewer` + UX/accessibility lens   | Challenge: accessibility issues, UX friction, design inconsistencies, mobile gaps |

**Triangle Loop**:
1. `designer` decomposes UI work into components → Shared Task List → TASK_ASSIGNMENT to Mailbox
2. `frontend-engineer` creates design specs per component → posts SUBMISSION with:
   - Component hierarchy and props
   - Responsive behavior description
   - State management approach
   - Interaction patterns
3. `reviewer` reviews with UX/a11y lens → posts REVIEW:
   - WCAG 2.1 AA compliance?
   - Keyboard navigation complete?
   - Screen reader compatibility?
   - Consistent with existing design system?
   - Mobile-first responsive handling?
4. Debate loop if FAIL → fixes/defenses → max 3 rounds
5. `designer` synthesizes into final design spec

**Deliverable**: `./reports/{topic}/designs/DESIGN-{feature}`
**Exit Criteria**: Design complete, accessibility validated, technical feasibility confirmed
**Consensus**: ✅ CONSENSUS: designer ✓ | frontend-engineer ✓ | reviewer ✓

---

## 🎭 Phase 5: PLANNING — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `planner`                            | Decompose: plan creation with all dependencies, task ordering, effort estimation |
| Executor  | `researcher`                         | Execute: fill knowledge gaps, validate approaches, draft plan sections |
| Reviewer  | `tech-lead` (feasibility critic)     | Challenge: question estimates, find risks, verify technical approach is sound |

**Prerequisite**: **READ** RESEARCH + SCOUT + DESIGN files before starting.

**Triangle Loop**:
1. `planner` reads all prior deliverables → decomposes plan into sections → Shared Task List → TASK_ASSIGNMENT
2. `researcher` drafts plan sections, fills knowledge gaps → posts SUBMISSION per section:
   - Implementation tasks with ordering
   - Dependencies between tasks
   - Risk assessment per task
   - Acceptance criteria
3. `tech-lead` reviews each plan section → posts REVIEW:
   - Are estimates realistic or optimistic?
   - Are risks identified and mitigated?
   - Does the technical approach fit the codebase?
   - Are there hidden dependencies?
   - Is rollback strategy adequate?
4. Debate loop if FAIL → `researcher` adjusts or defends → max 3 rounds
5. `planner` synthesizes all approved sections into final plan

**Deliverable**: `./reports/{topic}/plans/PLAN-{feature}`
**Exit Criteria**: Plan complete, technically validated, risks mitigated, acceptance criteria defined
**Consensus**: ✅ CONSENSUS: planner ✓ | researcher ✓ | tech-lead ✓

---

## 🎭 Phase 6: IMPLEMENTATION — 🔺 GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

### Team Selection

```
IF fullstack (frontend + backend) →
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

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Load PLAN → decompose into implementation tasks → Shared Task List → coordinate all work |
| Executor  | `backend-engineer` / `frontend-engineer` / `game-engineer` / `mobile-engineer` | Follow plan EXACTLY → implement each task → submit via Mailbox |
| Reviewer  | `reviewer`                           | Review EVERY submission → check code quality, security, performance, plan compliance |

**Prerequisite**: **READ and FOLLOW** `./reports/{topic}/plans/PLAN-{feature}`

### GOLDEN TRIANGLE IMPLEMENTATION LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 6: IMPLEMENTATION LOOP — FOLLOW EXACTLY                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads PLAN-{feature}.md                          ║
║  ─────────────────────────────────────────                           ║
║  - Load full plan into working context                               ║
║  - Identify all implementation tasks                                 ║
║  - Determine task ordering and dependencies                          ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  ─────────────────────────────────────────                           ║
║  - Break plan into atomic implementation tasks                       ║
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
║    • Acceptance criteria from plan                                   ║
║    • Dependencies on other tasks                                     ║
║                                                                      ║
║  STEP 4: FOR EACH TASK — Executor implements                         ║
║  ─────────────────────────────────────────                           ║
║  a. Executor reads TASK_ASSIGNMENT from Mailbox                      ║
║  b. Executor implements task EXACTLY as plan specifies               ║
║  c. Executor posts SUBMISSION to Mailbox:                            ║
║     ┌──────────────────────────────────────┐                         ║
║     │ SUBMISSION                            │                         ║
║     │ Task: {task ID}                       │                         ║
║     │ What was implemented: {description}   │                         ║
║     │ Files changed: {list of files}        │                         ║
║     │ Approach taken: {rationale}           │                         ║
║     │ Self-review notes: {any concerns}     │                         ║
║     │ Plan step reference: {which plan step}│                         ║
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
║     │ 4. PLAN COMPLIANCE — Matches plan spec exactly?       │         ║
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
║  m. Tech Lead marks task ✅ in Shared Task List                      ║
║  n. Move to next task → back to step (a)                             ║
║                                                                      ║
║  STEP 8: After ALL tasks complete                                    ║
║  ─────────────────────────────                                       ║
║  o. Tech Lead verifies full integration:                             ║
║     - All tasks ✅ in Shared Task List                               ║
║     - No cross-task conflicts                                        ║
║     - API contracts match between backend and frontend               ║
║  p. Tech Lead posts DECISION to Mailbox:                             ║
║     ┌──────────────────────────────────────┐                         ║
║     │ DECISION                              │                         ║
║     │ Phase: 6 — Implementation             │                         ║
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

**Exit Criteria**: All plan tasks implemented, all reviews passed, no unauthorized deviations, integration verified
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | {executor} ✓ | reviewer ✓

---

## 🎭 Phase 7: TESTING & REVIEW — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                           | Mission                                                    |
| --------- | ----------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tester`                                        | Decompose: test strategy, coverage targets, acceptance verification plan |
| Executor  | `tester` (self-implements tests)                | Execute: write tests, run tests, generate coverage report  |
| Reviewer  | `reviewer` + security/performance combined lens | Challenge: test gaps, missing security tests, perf benchmarks not met |

**Triangle Loop**:
1. `tester` (as Tech Lead) reads PLAN + implementation → decomposes into test strategy:
   - Unit tests per module
   - Integration tests per API endpoint
   - E2E tests per user flow
   - Security test cases (injection, auth bypass, IDOR)
   - Performance baseline assertions
2. `tester` (as Tech Lead) posts TASK_ASSIGNMENT to Mailbox with test plan
3. `tester` (as Executor) writes and runs tests → posts SUBMISSION per test category:
   - Tests written (file list)
   - Tests passed / failed
   - Coverage percentage
   - Plan checkpoint verification results
4. `reviewer` reviews test submissions with combined security + performance lens → posts REVIEW:
   - Coverage sufficient? Any untested critical paths?
   - Security test cases: SQL injection, XSS, CSRF, auth bypass covered?
   - Performance assertions: response time, memory, query count baselines?
   - Plan acceptance criteria: every criterion has a corresponding test?
5. Debate loop if FAIL → fix gaps or defend → max 3 rounds
6. `tester` (as Tech Lead) synthesizes final QA report

**PLAN CHECKPOINT VERIFICATION** (MANDATORY):
```
FOR EACH acceptance criterion in PLAN-{feature}.md:
  → tester: Write test that specifically verifies this criterion
  → reviewer: Confirm test actually validates the criterion (not a trivial pass)
  → Document: "AC-{id} → Test: {test name} → Verified: {pass/fail}"
```

**Deliverable**: Test results + coverage report + QA summary
**Exit Criteria**: All tests pass, coverage meets threshold, security validated, performance acceptable, all plan acceptance criteria verified
**Consensus**: ✅ CONSENSUS: tester ✓ | tester(exec) ✓ | reviewer ✓

---

## ✅ COMPLETION

Present final feature report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Feature Report: {feature}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Requirements | researcher / scouter / brainstormer | ✅ | {n} |
| P2: Research | researcher / researcher / tech-lead | ✅ | {n} |
| P3: Database | tech-lead / database-architect / reviewer | ✅ or SKIPPED | {n} |
| P4: Design | designer / frontend-engineer / reviewer | ✅ or SKIPPED | {n} |
| P5: Planning | planner / researcher / tech-lead | ✅ | {n} |
| P6: Implementation | tech-lead / {executor} / reviewer | ✅ | {n} |
| P7: Testing | tester / tester / reviewer | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ✅ **Done** — Feature complete (triangle-validated across all phases)
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
```
