---
title: Team System
type: entity
tags: [team, collaboration, golden-triangle, coordination, adversarial, consensus]
created: 2026-05-20
updated: 2026-05-20
sources:
  - rules/TEAMS.md
  - rules/AGENTS.md
  - .documents/knowledge-domain/01-entities.md:266-288
  - .documents/knowledge-overview/03-features.md:110-131
---

# Team System

The Team System organizes agents into 18 Golden Triangle teams for adversarial collaboration on complex tasks. Each team follows the Golden Triangle pattern — a 3-role structure (Tech Lead, Executor, Reviewer) that ensures every significant deliverable is designed, implemented, and adversarially reviewed before completion.

Quality emerges from structured tension between an Executor who builds and a Reviewer who challenges, orchestrated by a Tech Lead who arbitrates.

---

## Core Principle

Every team phase spawns exactly **3 agent roles** — no more, no less.

```
┌──────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                                │
│  └── invokes Golden Triangle for Phase N                     │
│                                                              │
│       ┌─────────────────────────────────┐                    │
│       │         TECH LEAD                │                    │
│       │   Decomposes · Arbitrates       │                    │
│       │   Synthesizes · FINAL AUTHORITY │                    │
│       └──────────┬──────────┬───────────┘                    │
│                  │          │                                 │
│          ┌───────▼──┐  ┌───▼────────┐                        │
│          │ EXECUTOR  │  │ REVIEWER   │                        │
│          │ Builds    │◄─┤ Challenges │                        │
│          │ Defends   │──►│ Validates  │                        │
│          └──────────┘  └───────────┘                         │
│                  ▲          ▲                                 │
│                  └──── MAILBOX ──┘                                │
└──────────────────────────────────────────────────────────────┘
```

---

## C8 Foundation Enforcement

These checkpoints are **BLOCKING** — no phase may proceed without satisfying all three:

| ID | Rule | Enforcement |
|----|------|-------------|
| C8-TEAMS-01 | Mailbox is append-only and required for all inter-agent exchanges | BLOCK |
| C8-TEAMS-02 | Debate is capped at 3 rounds; unresolved disputes must escalate to Tech Lead arbitration | BLOCK |
| C8-TEAMS-03 | Phase output requires explicit consensus stamp before release | BLOCK |

---

## Team Reference

### All 18 Team Domains

| # | Team ID | Domain | Tech Lead | Executor | Reviewer | Primary Use Case |
|---|---------|--------|-----------|----------|----------|------------------|
| 1 | `backend-team` | Backend | `tech-lead` | `backend-engineer` | `reviewer` | APIs, server logic, backend features |
| 2 | `frontend-team` | Frontend | `tech-lead` | `frontend-engineer` | `reviewer` | UI components, client-side features |
| 3 | `fullstack-team` | Full-stack | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` | End-to-end features |
| 4 | `database-team` | Database | `tech-lead` | `database-architect` | `reviewer` + security lens | Schema design, migrations, queries |
| 5 | `debug-team` | Debugging | `debugger` | `backend-engineer` | `reviewer` (root-cause validator) | Root cause analysis, issue resolution |
| 6 | `design-team` | Design | `designer` | `frontend-engineer` | `reviewer` + UX/a11y lens | UI/UX design, component specs |
| 7 | `devops-team` | DevOps | `devops-engineer` | `backend-engineer` | `security-engineer` | CI/CD, infrastructure, deployment |
| 8 | `docs-team` | Docs | `docs-manager` | `researcher` | `reviewer` (accuracy + completeness) | Technical writing, API docs |
| 9 | `game-team` | Games | `tech-lead` | `game-engineer` | `reviewer` (game arch + 60fps) | Game development, engines, physics, ECS |
| 10 | `mobile-team` | Mobile | `tech-lead` | `mobile-engineer` | `reviewer` (UX + platform) | iOS, Android, React Native, Flutter |
| 11 | `performance-team` | Performance | `performance-engineer` | `backend-engineer` | `reviewer` (measurement + regression) | Profiling, optimization, load testing |
| 12 | `planning-team` | Planning | `planner` | `researcher` | `tech-lead` (feasibility critic) | Architecture planning, task decomposition |
| 13 | `project-team` | Project | `project-manager` | `business-analyst` | `tech-lead` (feasibility critic) | Project planning, risk, delivery |
| 14 | `qa-team` | Quality | `tester` | `tester` (self-implements) | `security-engineer` + `performance-engineer` | Test strategy, coverage, quality |
| 15 | `report-team` | Reporting | `reporter` | `scouter` | `reviewer` (data accuracy + insight) | Status reports, metrics, analytics |
| 16 | `research-team` | Research | `researcher` | `scouter` | `brainstormer` (Devil's Advocate) | Discovery, codebase analysis, patterns |
| 17 | `security-team` | Security | `security-engineer` | `backend-engineer` | `reviewer` (pen-test mindset) | Security assessment, vulnerability audit |
| 18 | `wiki-team` | Wiki | `wiki-architect` | `wiki-extractor` | `wiki-reviewer` | Wiki generation, entity extraction, documentation quality |

### Team Selection Logic

```
IF workflow specifies a team domain → USE that domain's row from roster
ELSE IF phase maps to a domain     → USE default mapping
ELSE                                → HALT, ask Orchestrator for team assignment
```

### Fullstack Special Case

The `fullstack` domain spawns **two Executors** (backend + frontend). They share the Mailbox and take turns submitting. Reviewer reviews each submission independently. Tech Lead coordinates integration between the two.

---

## Team Composition

### Tech Lead Role

The Tech Lead decomposes tasks, coordinates execution, and arbitrates disputes. The Tech Lead does not implement — they architect, coordinate, and synthesize. They own the quality of every deliverable that leaves the team.

| Attribute | Description |
|-----------|-------------|
| **Function** | Task decomposer, work coordinator, dispute arbitrator, final output synthesizer |
| **Authority** | FINAL on all decisions — overrides Executor and Reviewer when consensus fails |
| **Actions** | Produces Shared Task List, reads all Mailbox exchanges, issues binding DECISION |
| **Personality** | Pragmatic, decisive, plan-focused. Minimizes debate rounds. Ships quality work. |
| **Source** | `agents/teams/{domain}-team/techlead.md` |

### Executor Role

The Executor implements assigned tasks, self-reviews before submission, and defends or fixes based on reviewer feedback. The Executor is the only role that writes code or content.

| Attribute | Description |
|-----------|-------------|
| **Function** | Direct implementer — builds, codes, and creates the actual deliverable |
| **Authority** | Owns implementation decisions. Can and MUST defend work when Reviewer is wrong. |
| **Actions** | Implements tasks, posts SUBMISSION to Mailbox, posts DEFENSE with evidence when challenged |
| **Personality** | Builder mindset. Pragmatic, evidence-driven. Does NOT blindly accept all feedback. Pushes back with technical proof when Reviewer's critique is incorrect or over-engineered. |
| **Source** | `agents/teams/{domain}-team/executor.md` |

### Reviewer Role

The Reviewer is the adversarial quality gate. They challenge every submission, find real accuracy problems, coverage gaps, and navigation failures. They must be skeptical by default and approve only when quality bar is met.

| Attribute | Description |
|-----------|-------------|
| **Function** | Quality gatekeeper with Devil's Advocate mindset |
| **Authority** | Can FAIL submissions and demand fixes. Can escalate unresolved disputes to Tech Lead. |
| **Actions** | Reviews submissions, posts REVIEW (PASS/FAIL) to Mailbox, re-checks fixes and defenses |
| **Personality** | Skeptical, thorough, demanding. Assumes defects exist until proven otherwise. Checks security, performance, correctness, edge cases. Does NOT rubber-stamp. |
| **Source** | `agents/teams/{domain}-team/reviewer.md` |

### Agent Categories

Each team member belongs to one of five categories:

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | `tech-lead`, `planner`, `wiki-architect` | Coordinate, plan — never implement |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect` | Implementation |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger`, `wiki-reviewer` | QA |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer`, `wiki-extractor` | Investigation |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | Support |

---

## Team Size Constraints

**Always exactly 3.** No more, no less.

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Tech Lead count | 1 | Single point of authority and synthesis |
| Executor count | 1 | Single implementer (except `fullstack` = 2 taking turns) |
| Reviewer count | 1 | Single quality gatekeeper with focused expertise |
| Total agents | 3 | Minimum viable adversarial collaboration |

```
IF only 1 perspective needed → Single agent, not a team
IF 4+ perspectives needed   → Run multiple Golden Triangles sequentially per phase
                              (each triangle handles one concern domain)
NEVER spawn 4+ agents in one triangle
```

---

## Communication Protocol

All agent communication flows through two shared artifacts:

| Artifact | Owner | Purpose |
|----------|-------|---------|
| **Shared Task List** | Tech Lead | State management for the phase's tasks — assignments, status, priorities |
| **Mailbox** | All agents (append-only) | `./.reports/{topic}/MAILBOX-{date}.md` — communication log for submissions, reviews, defenses, decisions |

### Mailbox Rules

- Mailbox is **append-only** — no agent may edit or delete prior exchanges
- All agents read the full Mailbox to maintain shared context
- Tech Lead manages the Shared Task List; Executor and Reviewer read it
- One Mailbox per phase execution, timestamped by date
- **Size management**: If Mailbox exceeds 500 lines, Tech Lead creates a new segment per phase:
  - Current phase: `./.reports/{topic}/MAILBOX-{date}-P{n}.md`
  - Archived phase: `./.reports/{topic}/MAILBOX-{date}-P{n}-FINAL.md`
  - Each phase starts with a fresh, focused Mailbox

### Mailbox Exchange Types

| Type | Direction | Purpose |
|------|-----------|---------|
| `TASK_ASSIGNMENT` | Tech Lead → All | Shared Task List with task assignments and context |
| `SUBMISSION` | Executor → Reviewer | Implementation summary, files changed, approach |
| `REVIEW` | Reviewer → Executor | Findings with PASS or FAIL status |
| `DEFENSE` | Executor → Reviewer | Technical evidence defending or fixing issues |
| `ESCALATION` | Reviewer → Tech Lead | Unresolved dispute requiring arbitration |
| `APPROVAL` | Reviewer → Tech Lead | Submission accepted after fixes or valid defense |
| `DECISION` | Tech Lead → All | Final binding decision with consensus stamp |

---

## Debate Mechanism

No 4th agent is needed. Adversarial tension is **hardcoded** into Executor and Reviewer personalities.

```
┌─────────────────────────────────────────────────────────────┐
│  DEBATE FLOW                                                │
│                                                             │
│  Executor implements ──► Reviewer critiques                 │
│       │                       │                             │
│       │  ┌────────────────────┘                             │
│       │  │                                                  │
│       ▼  ▼                                                  │
│  Executor DEFENDS (with evidence) ─── OR ─── FIXES          │
│       │                                                     │
│       ▼                                                     │
│  Reviewer re-checks ──► PASS ──► Consensus                  │
│       │                                                     │
│       └──► FAIL ──► Loop (max 3 rounds)                     │
│                        │                                    │
│                        ▼                                    │
│              Tech Lead ARBITRATES (binding)                  │
└─────────────────────────────────────────────────────────────┘
```

### Defense Rules

- **Max debate rounds**: 3. After round 3 without agreement, Tech Lead reads all Mailbox exchanges and makes a **binding decision**. No further debate.
- Executor MUST defend with **technical evidence** (benchmarks, specs, code references)
- "I disagree" without proof = automatic FAIL, Reviewer wins
- Reviewer MUST consider valid evidence. Rejecting proven-correct work = escalation to Tech Lead
- Tech Lead evaluates **evidence quality**, not seniority or role

---

## Team Execution Flow

```
1. Tech Lead decomposes task
   → Publishes Shared Task List with assignments
   → Posts TASK_ASSIGNMENT to Mailbox

2. Executor receives task
   → Implements deliverable
   → Posts SUBMISSION to Mailbox: description, files changed, approach

3. Reviewer reads submission
   → Reviews for quality, security, performance, correctness
   → Posts REVIEW to Mailbox: findings, PASS or FAIL

4. IF FAIL:
   a. Executor reads review findings
   b. For each finding, Executor either:
      — FIXES the issue and resubmits, OR
      — DEFENDS with technical evidence via Mailbox
   c. IF defense posted:
      — Reviewer considers evidence → accepts defense OR rejects with counter-evidence
      — IF unresolved after re-check → Reviewer escalates to Tech Lead
   d. Return to step 3 (max 3 rounds total)

5. IF PASS (or max 3 rounds reached):
   → Tech Lead reads ALL Mailbox exchanges
   → Evaluates evidence from both sides if disputes exist
   → Makes final synthesis decision
   → Posts DECISION to Mailbox with approved output

6. Phase output released with CONSENSUS stamp
   → All three agents sign off
   → Deliverable is final
```

### Iteration Limit

Each task is capped at **3 debate rounds maximum**. After 3 rounds without resolution, Tech Lead must arbitrate with a binding decision.

---

## Consensus Protocol

Output is released **ONLY** when one of these conditions is met:

| Condition | Trigger |
|-----------|---------|
| **Clean pass** | Reviewer explicitly APPROVED Executor's submission (no disputes) |
| **Resolved pass** | Reviewer APPROVED after Executor fixed issues or defended successfully |
| **Arbitrated pass** | Tech Lead overrode after max 3 rounds — documents reasoning |

### Consensus Stamp Format

```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Without this stamp, no phase output is released.** If any agent has not signed off, Tech Lead must resolve the gap before proceeding.

---

## Tiered Execution

### TIER 1 — Sub-agent Spawn (preferred)

```
1. Orchestrator spawns Tech Lead as sub-agent
2. Tech Lead spawns Executor as sub-agent
3. Tech Lead spawns Reviewer as sub-agent
4. Communication flows via Mailbox file (./.reports/{topic}/MAILBOX-{date}.md)
5. Debate loop runs until consensus or max rounds
6. Tech Lead collects final output and returns to Orchestrator
```

### TIER 2 — Sequential Embodiment (fallback)

```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → post TASK_ASSIGNMENT
2. EMBODY Executor → implement tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submission → post REVIEW to Mailbox (PASS/FAIL)
4. IF FAIL:
   a. Re-EMBODY Executor → read findings → FIX or DEFEND → post to Mailbox
   b. Re-EMBODY Reviewer → re-check → post updated REVIEW
   c. Repeat steps 4a-4b (max 3 total rounds)
5. EMBODY Tech Lead → read all Mailbox exchanges → arbitrate if needed → synthesize
6. Post DECISION with consensus stamp
```

### Prohibited Actions

```
❌ FORBIDDEN: Using TIER 2 when runSubagent is available
❌ FORBIDDEN: Skipping the Reviewer step (all work MUST be reviewed)
❌ FORBIDDEN: Executor and Reviewer directly modifying each other's outputs
✅ REQUIRED: Attempt TIER 1 first, log reason if falling back to TIER 2
✅ REQUIRED: Mailbox used for ALL inter-agent communication in both tiers
```

---

## Shared Task List Format

**Tech Lead MUST produce this before any Executor work begins.**

```markdown
## 📋 Shared Task List — {Phase Name}

| ID | Task | Assigned To | Status | Priority | Round |
|----|------|-------------|--------|----------|-------|
| T1 | {task description} | `executor` | ⏳ | H | 1 |
| T2 | {task description} | `executor` | ⏳ | M | 1 |
```

### Status Icons

| Icon | Meaning |
|------|---------|
| ⏳ | Pending — not started |
| 🔄 | In Progress — Executor working |
| ✅ | Complete + Approved — passed review |
| ❌ | Blocked — dependency or unresolved issue |
| 🔁 | Revision Needed — failed review, requires fix |

### Rules

- All implementation tasks are assigned to `executor` (there is only one Executor per triangle)
- Tech Lead updates status as the debate loop progresses
- `Round` tracks which debate round the task is on (1, 2, or 3)
- A task is ✅ only when Reviewer has approved OR Tech Lead has arbitrated

---

## Mailbox File Format

**File**: `./.reports/{topic}/MAILBOX-{date}.md`

```markdown
# 📬 MAILBOX — {Phase Name} — {date}

## Exchange #1
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `tech-lead` | `all` | TASK_ASSIGNMENT | {time} |

**Content:**
[Shared Task List with assignments and context]

---

## Exchange #2
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `executor` | `reviewer` | SUBMISSION | {time} |

**Content:**
[Description of what was implemented, files changed, approach taken]

---

## Exchange #3
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `reviewer` | `executor` | REVIEW | {time} |

**Status:** ❌ FAIL
**Findings:**
- [Issue 1: severity HIGH — description — required fix]
- [Issue 2: severity MEDIUM — description — required fix]

---

## Exchange #4
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `executor` | `reviewer` | DEFENSE | {time} |

**Content:**
[Fix applied for Issue 1 — files changed, approach]
[Technical evidence defending approach for Issue 2 — benchmarks, spec references, rationale]

---

## Exchange #5
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `reviewer` | `tech-lead` | APPROVAL | {time} |

**Status:** ✅ PASS
Executor addressed Issue 1. Defense for Issue 2 accepted — evidence verified.

---

## Exchange #6
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `tech-lead` | `all` | DECISION | {time} |

**Status:** ✅ CONSENSUS REACHED
**Summary:** [Final output approved — merged deliverable description]
**Signatures:** TechLead ✓ | Executor ✓ | Reviewer ✓
```

### Mailbox Rules

- Append-only — no agent may edit prior exchanges
- Every exchange MUST have From, To, Type, and Timestamp
- REVIEW exchanges MUST include explicit PASS or FAIL status
- DEFENSE exchanges MUST include technical evidence (not just disagreement)
- DECISION exchanges MUST include the consensus stamp

---

## Team Phase Output Format

```markdown
## 🎭 Phase {N}: {name} — 🔺 GOLDEN TRIANGLE

### Triangle: `{team-domain}`
**Tech Lead**: `{agent}` | **Executor**: `{agent}` | **Reviewer**: `{agent}`

### 📋 Task List
| ID | Task | Status | Round |
|----|------|--------|-------|
| T1 | {task} | ✅ | 2 |
| T2 | {task} | ✅ | 1 |

### 🔨 Executor Output
{Implementation summary — what was built, approach taken, key decisions}

### 🔍 Review Cycle
**Round 1**: ❌ FAIL — {findings summary: what failed, severity}
**Round 2**: ✅ PASS — {resolution summary: what was fixed, what was defended}

### 📬 Debate Log
{Key Mailbox exchanges — defenses raised, escalations, resolutions. Brief, not full Mailbox.}

### 🤝 Consensus
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
**Decision**: {Final approved output description}

### Exit Criteria
- [x] {criterion_1} — verified by `{agent}`
- [x] {criterion_2} — verified by `{agent}`

### ✅ Phase complete — Golden Triangle approved
**Deliverable**: {consolidated summary of approved output}
```

---

## Wiki Team

The `wiki-team` is a specialized Golden Triangle team for documentation generation:

| Role | Agent | Function |
|------|-------|----------|
| Tech Lead | `wiki-architect` | Decomposes wiki generation into extraction and writing tasks |
| Executor | `wiki-extractor` | Extracts code knowledge and generates wiki pages |
| Reviewer | `wiki-reviewer` | Adversarially reviews every wiki page for accuracy and completeness |

The wiki-team follows the same Golden Triangle pattern as all other teams but is specialized for documentation work with additional wiki-specific quality standards:
- Coverage thresholds (minimum content density per page)
- Wikilink validation (all links must resolve)
- Frontmatter requirements (title, type, tags, dates)
- Source citation enforcement

### Wiki Team File Structure

```
agents/teams/wiki-team/
├── techlead.md    # Wiki Architect — decomposes, coordinates, arbitrates
├── executor.md   # Wiki Extractor — extracts, writes, defends
└── reviewer.md    # Wiki Reviewer — validates accuracy, completeness, coverage
```

See [[Golden Triangle]] for the full adversarial collaboration pattern.

---

## When to Use Teams

### Decision Tree

```
IS task complex with multiple concerns (security + performance + correctness)?
├─ YES → :team (Golden Triangle)
└─ NO
   IS quality critical and adversarial review needed?
   ├─ YES → :team (Golden Triangle)
   └─ NO
      IS task simple and single-domain?
      ├─ YES → Single-agent variant (:fast, :hard)
      └─ NO  → Single-agent variant with manual review step
```

### Variant Comparison

| Variant | Execution Mode | Agents | When |
|---------|----------------|--------|------|
| `:fast` | Single agent | 1 | Speed priority, simple tasks |
| `:hard` | Single agent | 1 | Standard quality, focused tasks |
| `:team` | Golden Triangle | 3 | Maximum quality, adversarial review, complex tasks |

**Do NOT use `:team` for**:
- Simple single-domain tasks where one agent suffices
- Time-critical hotfixes where coordination overhead exceeds benefit
- Pure research or brainstorming with no reviewable deliverable

---

## Error Handling

| Error | Symptom | Recovery |
|-------|---------|----------|
| Executor fails to produce deliverable | SUBMISSION never posted to Mailbox | Tech Lead posts DECISION: phase blocked. Re-dispatches task or produces minimal viable output. |
| Reviewer is too strict (fails valid work 3 times) | Max rounds hit, all submissions rejected | Tech Lead reads all evidence, makes binding DECISION. Documents why Reviewer's standards were overridden. |
| Reviewer rubber-stamps (passes without scrutiny) | REVIEW contains no specific findings | Tech Lead rejects the PASS, re-invokes Reviewer with explicit checklist: security, performance, correctness, edge cases. |
| Consensus impossible after max rounds | 3 rounds exhausted, still FAIL | Tech Lead makes binding DECISION based on cumulative Mailbox evidence. Logs "ARBITRATED — no consensus." |
| TIER 1 spawn fails for any agent | Sub-agent creation error | Fall back to TIER 2 (sequential embodiment) for the failed agent only. Log reason. |
| Mailbox file cannot be created | File system error | Use inline communication within the phase output. Log degraded mode. |
| All agents fail | No usable output from any role | Tech Lead produces minimal viable output solo, flags incident for Orchestrator review. |

### Escalation Path

```
Executor → Reviewer → Tech Lead → Orchestrator
```

---

## Integration with Existing Rules

| Rule File | Integration Point |
|-----------|-------------------|
| [[Agent System]] | All three roles follow agent categories and context isolation rules. TIER 1/2 applies per-agent within the triangle. |
| [[Rule System]] | Golden Triangle respects all 10 Orchestration Laws. Tech Lead is bound by L7 (meta agents delegate). Executor and Reviewer follow L3 (complete assigned scope). |
| [[Skill System]] | Executor resolves skills independently via HSOL for implementation. Reviewer resolves skills for review checklists. Tech Lead does NOT resolve skills — only coordinates. |

---

## Golden Triangle vs. Old Team Model

| Aspect | Old Model (Team Lead + Teammates) | Golden Triangle |
|--------|-----------------------------------|-----------------|
| Team size | 3-6 agents | Always exactly 3 |
| Quality mechanism | Team Lead review only | Adversarial Executor vs. Reviewer debate |
| Conflict resolution | Team Lead decides, no debate | Structured 3-round debate with evidence |
| Roles | Flexible teammates, no fixed roles | Fixed: Tech Lead, Executor, Reviewer |
| Communication | Ad-hoc Mailbox messages | Structured exchange types with PASS/FAIL |
| Consensus | Implicit (Team Lead merges) | Explicit stamp required from all 3 agents |
| Failure mode | Silent quality gaps | Reviewer catches gaps OR Tech Lead arbitrates |
| Defense mechanism | None — teammates accept all feedback | Executor MUST defend valid work with evidence |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│  GOLDEN TRIANGLE — CHEAT SHEET                              │
│                                                             │
│  ALWAYS 3 AGENTS: Tech Lead · Executor · Reviewer           │
│  MAX 3 DEBATE ROUNDS: Implement → Review → Fix/Defend       │
│  MAILBOX: ./.reports/{topic}/MAILBOX-{date}.md (append-only) │
│  CONSENSUS: ✅ TechLead ✓ | Executor ✓ | Reviewer ✓         │
│                                                             │
│  Tech Lead = FINAL AUTHORITY (arbitrates, synthesizes)      │
│  Executor  = BUILDER + DEFENDER (implements, pushes back)    │
│  Reviewer  = DEVIL'S ADVOCATE (challenges, validates)       │
│                                                             │
│  NO output without consensus stamp                          │
│  NO defense without technical evidence                      │
│  NO rubber-stamp reviews (Tech Lead rejects empty passes)   │
│  NO more than 3 rounds (Tech Lead decides at round 3)       │
└─────────────────────────────────────────────────────────────┘
```

---

## Self-Check

Before every team phase, verify:

```
□ Is :team variant explicitly invoked?
□ Is the correct team domain identified from the roster?
□ Are exactly 3 roles assigned (Tech Lead + Executor + Reviewer)?
□ Has Tech Lead produced the Shared Task List BEFORE dispatch?
□ Is the Mailbox file initialized at ./.reports/{topic}/MAILBOX-{date}.md?
□ Is TIER 1 attempted first? (TIER 2 only on spawn failure)
□ Is the debate loop capped at 3 rounds?
□ Does every REVIEW contain explicit PASS/FAIL?
□ Does every DEFENSE contain technical evidence?
□ Is the consensus stamp present before phase output is released?
□ Does the final deliverable meet all exit criteria?
□ Are all Mailbox exchanges preserved (append-only, no deletions)?
□ If Mailbox exceeded 500 lines, was it rotated per phase?
```

---

## Related Pages

- [[Golden Triangle]] — The adversarial collaboration pattern
- [[Agent System]] — 21 agents that make up team members
- [[Rule System]] — 10 Orchestration Laws that govern all execution
- [[Skill System]] — HSOL skill resolution for implementation tasks
