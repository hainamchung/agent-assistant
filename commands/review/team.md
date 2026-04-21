---
description: "🔺 Team Review — Golden Triangle adversarial collaboration for maximum quality code review"
version: "2.0"
category: quality
execution-mode: execute
---

# /review:team — Golden Triangle Code Review

> **MISSION**: Maximum quality code review through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Findings are released ONLY
> upon consensus after debate.

<scope>$ARGUMENTS</scope>

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
1. EMBODY Tech Lead → decompose → Shared Task List → dispatch
2. EMBODY Executor → execute → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review → post REVIEW to Mailbox
4. IF FAIL → EMBODY Executor → fix/defend → EMBODY Reviewer → re-check (max 3 rounds)
5. EMBODY Tech Lead → arbitrate if needed → post DECISION → synthesize output
```

---

## 📬 MAILBOX & DELIVERABLES

**Mailbox**: `./reports/{topic}/MAILBOX-{date}.md` — All triangle agents READ/APPEND. Never overwrite.
**Protocol**: See TEAMS.md § Mailbox Message Types (TASK_ASSIGNMENT, SUBMISSION, REVIEW, DEFENSE, RESUBMISSION, APPROVAL, ESCALATION, ARBITRATION, DECISION).

| Phase / Team     | Output                                          |
| ---------------- | ----------------------------------------------- |
| Phase 1 (Scope)  | `./reports/{topic}/scouts/SCOUT-{scope}`             |
| Phase 2 (Review) | Review findings in Mailbox                      |
| Phase 3 (Plan)   | `./reports/{topic}/reviews/REVIEW-REPORT-{scope}`    |
| Phase 4 (Summary)| `./reports/{topic}/reviews/REVIEW-{scope}`           |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                             | Requires                        | Blocking    |
| --------------------------------- | ------------------------------- | ----------- |
| P1: Scope & Context               | User scope / PR / files         | No          |
| P2: Code Quality Review           | Scout findings from P1          | **YES**     |
| P3: Improvement Plan              | All review findings from P2     | **YES**     |
| P4: Summary & Recommendations     | Improvement plan from P3        | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Within each phase follow the Golden Triangle Loop (TEAMS.md § Golden Triangle Protocol):

```
1. Spawn Golden Triangle (Tech Lead + Executor + Reviewer)
2. Tech Lead decomposes → publishes Shared Task List
3. Executor executes → posts SUBMISSION to Mailbox
4. Reviewer critiques → posts REVIEW to Mailbox
5. Debate loop: fix/defend → re-review (max 3 rounds)
6. Consensus → Tech Lead posts DECISION → Phase output released
```

**Consensus Stamp** (required per phase): `✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓`

**Plan Compliance**: If `./reports/{topic}/plans/PLAN-{scope}` exists → verify code matches plan, flag deviations.

---

## 🎭 Phase 1: SCOPE & CONTEXT — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `reviewer`                           | Decompose: review scope, files to review, review dimensions |
| Executor  | `scouter`                            | Execute: map changed files, identify blast radius, trace dependencies |
| Reviewer  | `tech-lead` (Devil's Advocate)       | Challenge: scope complete? Missing files? Architecture impact assessed? |

**Triangle Loop**:
1. `reviewer` decomposes scope into areas: changed files, dependency graph, architecture impact, plan compliance baseline
2. `reviewer` posts TASK_ASSIGNMENT → dispatches to `scouter`
3. `scouter` surveys codebase → posts SUBMISSION with findings per area:
   - All changed files with line-level diff summary
   - Call chain trace: callers and callees of changed functions
   - Blast radius: downstream components affected by changes
   - Recent churn: files with high change frequency (risk indicator)
   - Architecture layer mapping: which layers are touched
4. `tech-lead` reviews each SUBMISSION → posts REVIEW:
   - Is the blast radius complete or are downstream effects missing?
   - Are there untouched files that SHOULD have changed (consistency gap)?
   - Is the architecture impact properly assessed?
   - Are there hidden coupling risks not surfaced?
5. If FAIL → `scouter` addresses gaps or defends → RESUBMISSION/DEFENSE
6. Max 3 rounds → ESCALATION to `reviewer` if unresolved
7. `reviewer` synthesizes approved findings into unified scope document

**Deliverable**: `./reports/{topic}/scouts/SCOUT-{scope}`
**Exit Criteria**: Review scope mapped, blast radius assessed, dependencies traced, focus areas flagged
**Consensus**: ✅ CONSENSUS: reviewer ✓ | scouter ✓ | tech-lead ✓

---

## 🎭 Phase 2: CODE QUALITY REVIEW — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                                     | Mission                                                    |
| --------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `reviewer`                                                | Coordinate: assign review dimensions, synthesize findings  |
| Executor  | `reviewer` (self-implements deep review)                  | Execute: line-by-line code review across ALL dimensions    |
| Reviewer  | `security-engineer` + `performance-engineer` (combined)   | Challenge: security vulnerabilities? Performance concerns? Code standards? |

**Prerequisite**: **READ** `./reports/{topic}/scouts/SCOUT-{scope}`

### 5 REVIEW DIMENSIONS (ALL MANDATORY)

```
┌──────────────────────────────────────────────────────────────┐
│ 1. CORRECTNESS — Logic sound? Edge cases handled? Tests?     │
│ 2. SECURITY (OWASP) — Injection, auth, input validation?    │
│ 3. PERFORMANCE — N+1 queries, memory leaks, complexity?     │
│ 4. ARCHITECTURE COMPLIANCE — Patterns, layer boundaries?     │
│ 5. CODE QUALITY — Naming, DRY, SOLID, readability?          │
└──────────────────────────────────────────────────────────────┘
```

### GOLDEN TRIANGLE REVIEW LOOP (CRITICAL — Step by Step)

```
╔══════════════════════════════════════════════════════════════════════╗
║  PHASE 2: CODE REVIEW LOOP — FOLLOW EXACTLY                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STEP 1: Tech Lead reads SCOUT-{scope}.md                           ║
║  - Load scope and blast radius into context                          ║
║  - Identify all files requiring review                               ║
║  - Prioritize by risk (highest first)                                ║
║                                                                      ║
║  STEP 2: Tech Lead creates Shared Task List                          ║
║  - Break review into per-file/module tasks                           ║
║  - Format: [ID] [Status] [File/Module] [Dimensions] [Risk Level]    ║
║  - Post as TASK_ASSIGNMENT to Mailbox                                ║
║                                                                      ║
║  STEP 3: FOR EACH TASK — Executor performs deep review               ║
║  a. Read TASK_ASSIGNMENT from Mailbox                                ║
║  b. Review code line-by-line across ALL 5 dimensions                 ║
║  c. Post SUBMISSION to Mailbox:                                      ║
║     │ Task: {ID} | File(s): {list} | Lines: {range}                 ║
║     │ Findings:                                                      ║
║     │ | # | Dim  | Sev  | File:Line | Issue      |                   ║
║     │ |---|------|------|-----------|------------|                   ║
║     │ | 1 | SEC  | CRIT | app.ts:42 | SQLi       |                   ║
║     │ | 2 | PERF | WARN | db.ts:18  | N+1 query  |                   ║
║     │ Positive notes: {what's done well}                             ║
║     │ Plan compliance: {if PLAN exists}                              ║
║                                                                      ║
║  STEP 4: Reviewer challenges each SUBMISSION (combined lens)         ║
║  d. Read SUBMISSION from Mailbox                                     ║
║  e. Apply triple lens:                                               ║
║     SECURITY: OWASP missed? Auth gaps? Injection? Secrets?          ║
║     PERFORMANCE: Complexity? N+1? Memory leaks? Caching?            ║
║     STANDARDS: Naming? Error handling? Concurrency? Observability?  ║
║  f. Post REVIEW to Mailbox:                                          ║
║     │ Task: {ID} | Status: PASS or FAIL                             ║
║     │ Additional findings: {table}                                   ║
║     │ Disputed executor findings: {list}                             ║
║     │ Confirmed executor findings: {list}                            ║
║     │ Required actions: {list}                                       ║
║                                                                      ║
║  STEP 5: IF FAIL — Debate Loop (max 3 rounds)                       ║
║  g. Executor reads REVIEW findings                                   ║
║  h. For EACH finding:                                                ║
║     - VALID → Accept, upgrade severity                               ║
║     - DISPUTED → DEFENSE with evidence                               ║
║  i. Post RESUBMISSION/DEFENSE:                                       ║
║     │ Round: {1/2/3} | Accepted: {list} | Defended: {list+evidence} ║
║  j. Reviewer re-reviews → back to (d)                                ║
║  k. Round 3 unresolved → ESCALATION → Tech Lead ARBITRATION         ║
║                                                                      ║
║  STEP 6: IF PASS → APPROVAL → mark ✅ → next task                   ║
║                                                                      ║
║  STEP 7: ALL tasks complete                                          ║
║  - Tech Lead consolidates: merge findings, deduplicate, group by dim ║
║  - Post DECISION:                                                    ║
║     │ Phase: 2 | Tasks: {n}/{total} | CRIT={n} WARN={n} INFO={n}   ║
║     │ Disputes: {n} | Arbitrations: {n}                             ║
║     │ ✅ CONSENSUS: reviewer ✓ | reviewer(exec) ✓ | security+perf ✓║
║  - Release consolidated findings table                               ║
╚══════════════════════════════════════════════════════════════════════╝
```

**PLAN COMPLIANCE** (if PLAN exists):
```
FOR EACH phase in PLAN-{scope}.md:
  - Verify code implements plan spec → "Plan Phase X → Code Y → ✅/⚠️/❌"
```

**Exit Criteria**: All files reviewed across 5 dimensions, findings severity-ranked, security + performance validated
**Consensus**: ✅ CONSENSUS: reviewer ✓ | reviewer(exec) ✓ | security+perf ✓

---

## 🎭 Phase 3: IMPROVEMENT PLAN — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Synthesize: prioritize findings, create improvement plan   |
| Executor  | `planner`                            | Execute: write REVIEW-REPORT-{scope}.md with prioritized issues |
| Reviewer  | `reviewer`                           | Challenge: priorities correct? Severity accurate? Missing improvements? |

**Prerequisite**: All Phase 2 findings consolidated in Mailbox.

**Triangle Loop**:
1. `tech-lead` reads Phase 2 findings → decomposes into improvement areas:
   - Critical issues (must fix before merge)
   - Warnings (should fix, tech debt if deferred)
   - Suggestions (opportunistic improvements)
   - Plan deviations (if PLAN exists)
2. `tech-lead` posts TASK_ASSIGNMENT → dispatches to `planner`
3. `planner` writes structured improvement plan → posts SUBMISSION:
   - Prioritized issue table with effort estimates
   - Fix recommendations per issue (specific, actionable)
   - Dependency order: which fixes must come first
   - Risk of NOT fixing: business + technical impact per issue
4. `reviewer` reviews improvement plan → posts REVIEW:
   - Severity ratings accurate or inflated/deflated?
   - Fix recommendations correct and complete?
   - Phase 2 findings dropped or downgraded without justification?
   - Priority ordering sound (critical before cosmetic)?
5. Debate loop if FAIL → `planner` adjusts or defends → max 3 rounds
6. `tech-lead` synthesizes final improvement plan

**Deliverable**: `./reports/{topic}/reviews/REVIEW-REPORT-{scope}`
**Exit Criteria**: All findings prioritized, fix recommendations documented, effort estimated, nothing dropped
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | planner ✓ | reviewer ✓

---

## 🎭 Phase 4: SUMMARY & RECOMMENDATIONS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Final synthesis: orchestrate executive summary creation     |
| Executor  | `reporter`                           | Execute: executive summary, risk assessment, recommended actions |
| Reviewer  | `business-analyst`                   | Challenge: business impact? Stakeholder communication? Actionable? |

**Prerequisite**: **READ** `./reports/{topic}/reviews/REVIEW-REPORT-{scope}`

**Triangle Loop**:
1. `tech-lead` decomposes summary: verdict, risk matrix, actions, stakeholder brief
2. `tech-lead` posts TASK_ASSIGNMENT → dispatches to `reporter`
3. `reporter` writes final review report → posts SUBMISSION:
   ```markdown
   # Code Review: {scope}
   ## Verdict: ✅ APPROVED / ⚠️ APPROVED WITH CONDITIONS / ❌ CHANGES REQUIRED
   ## Executive Summary
   {2-3 sentence overview of code quality, key risks, recommendation}
   ## Risk Assessment
   | Risk | Severity | Likelihood | Business Impact | Mitigation |
   ## Critical Issues ({count}) — MUST fix
   | # | Category | File:Line | Description | Fix | Effort |
   ## Warnings ({count}) — SHOULD fix
   | # | Category | File:Line | Description | Fix | Effort |
   ## Suggestions ({count}) — COULD improve
   | # | Category | File:Line | Description | Fix | Effort |
   ## Security Summary
   Vulnerabilities: {count by severity} | OWASP: {categories}
   ## Performance Summary
   Bottlenecks: {count} | Impact: {description}
   ## Plan Compliance (if applicable)
   Phases verified: {X}/{Y} | Deviations: {list or "None"}
   ## Recommended Actions
   1. {action} — Owner: {who} — Priority: {P0/P1/P2}
   ```
4. `business-analyst` reviews final report → posts REVIEW:
   - Business impact clearly communicated?
   - Non-technical stakeholder would understand verdict?
   - Recommended actions concrete and assignable?
   - Risk assessment calibrated (not alarmist or dismissive)?
5. Debate loop if FAIL → `reporter` adjusts or defends → max 3 rounds
6. `tech-lead` approves final report

**Deliverable**: `./reports/{topic}/reviews/REVIEW-{scope}`
**Exit Criteria**: Executive summary complete, verdict issued, all findings actionable, stakeholder-ready
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | reporter ✓ | business-analyst ✓

---

## ✅ COMPLETION

Present final review report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Review Report: {scope}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Scope & Context | reviewer / scouter / tech-lead | ✅ | {n} |
| P2: Code Quality Review | reviewer / reviewer / security+perf | ✅ | {n} |
| P3: Improvement Plan | tech-lead / planner / reviewer | ✅ | {n} |
| P4: Summary | tech-lead / reporter / business-analyst | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`
```

**Verdict Routing**:

1. ✅ **Approved** — Code ready to merge
2. ⚠️ **Approved with conditions** — Minor fixes needed → `/fix:fast`
3. ❌ **Changes required** — Critical issues → `/fix:hard` or `/fix:team`
4. 🔒 **Security block** — Security vulnerabilities must be resolved → `/fix:hard`
5. 🧪 **Test gaps** — Insufficient coverage → `/test:team`
