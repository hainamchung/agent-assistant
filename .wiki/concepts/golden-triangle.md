---
title: Golden Triangle
type: concept
tags: [pattern, team, collaboration, quality, adversarial]
created: 2026-05-20
updated: 2026-05-20
---

# Golden Triangle

The Golden Triangle is the adversarial team coordination pattern at the heart of Agent Assistant's quality assurance. It structures every significant deliverable through 3 roles — Tech Lead (architecture), Executor (implementation), and Reviewer (quality) — with a debate loop that catches defects before they ship. The adversarial nature is intentional: the Reviewer's job is to challenge, the Executor's job is to defend or fix.

---

## Definition

An adversarial 3-role team pattern where every significant deliverable is designed by a Tech Lead, implemented by an Executor, and adversarially reviewed by a Reviewer. The pattern enforces quality through debate rather than hope.

- **Pattern Type**: Team Pattern / Architecture Pattern
- **Roles**: Tech Lead (coordinator), Executor (implementer), Reviewer (adversarial quality gate)
- **Quality Gates**: Security (OWASP Top 10), Performance (<200ms), Testing (>80% coverage), Linting
- **Iteration Limit**: 3 rounds maximum per task
- **Source**: `.documents/knowledge-architecture/04-design-patterns.md:69-137`

---

## Context and Motivation

Most development workflows treat review as a rubber stamp — code is written, then briefly glanced at before merging. This approach misses subtle bugs, architectural misalignments, and quality issues that only surface in production.

The Golden Triangle addresses this by making the Reviewer an adversarial role:
- The Reviewer assumes every submission is wrong until proven otherwise
- The Reviewer challenges every claim, verifies every source citation, and tests every assertion
- The Executor is required to defend with evidence or fix the issues

The debate loop (up to 3 rounds) ensures that genuine issues are resolved and genuine disagreements are escalated to the Tech Lead for arbitration.

---

## Core Principle

Every team phase spawns exactly **3 agent roles** — no more, no less. Quality emerges from structured tension between an Executor who builds and a Reviewer who challenges, orchestrated by a Tech Lead who arbitrates.

```
┌──────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                                │
│  └── invokes Golden Triangle for Phase N                     │
│                                                              │
│       ┌─────────────────────────────────┐                   │
│       │         🔺 TECH LEAD            │                   │
│       │   Decomposes · Arbitrates       │                   │
│       │   Synthesizes · FINAL AUTHORITY │                   │
│       └──────────┬──────────┬───────────┘                   │
│                  │          │                               │
│          ┌───────▼──┐  ┌───▼────────┐                      │
│          │ EXECUTOR  │  │ REVIEWER   │                      │
│          │ Builds    │◄─┤ Challenges │                      │
│          │ Defends   │──►│ Validates  │                      │
│          └──────────┘  └───────────┘                       │
│                  ▲          ▲                               │
│                  └──── 📬 ──┘                               │
│                    MAILBOX                                  │
└──────────────────────────────────────────────────────────────┘
```

*Source*: `rules/TEAMS.md:16-40`

---

## Role Definitions

### Tech Lead

The Tech Lead decomposes tasks, coordinates execution, and arbitrates disputes. They do not implement — they architect, coordinate, and synthesize. They own the quality of every deliverable that leaves the team.

**Responsibilities**:
- Break down the overall task into subtasks
- Assign subtasks to the Executor
- Monitor the debate between Executor and Reviewer
- Intervene when debate exceeds 3 rounds
- Arbitrate disputes with binding decisions
- Synthesize approved subtasks into the final deliverable
- Apply the consensus stamp before releasing

**Authority**: Final — all decisions are binding

### Executor

The Executor implements assigned subtasks, self-reviews before submission, and responds to reviewer feedback. The Executor is the only role that writes code or content.

**Responsibilities**:
- Read all task requirements and source materials
- Implement the subtask to publication quality
- Self-review against quality standards before submitting
- Submit work to the Reviewer with full context
- Respond to reviewer feedback — fix valid issues, defend invalid ones
- Iterate based on reviewer feedback (up to 3 rounds)

**Authority**: Implementation — choices within task scope

### Reviewer

The Reviewer is the adversarial quality gate. They challenge every submission, find real accuracy problems, and approve only when the quality bar is met. They must be skeptical by default.

**Responsibilities**:
- Read all source materials themselves (not just the Executor's citations)
- Verify every claim against source code
- Challenge anything that cannot be verified
- Post structured review findings with severity levels
- Escalate unresolved disputes to Tech Lead

**Authority**: Approval — can block delivery until quality bar is met

---

## Agent Categories

The Golden Triangle roles draw from five agent categories defined in [[Agent System]]:

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | `tech-lead`, `planner`, `wiki-architect` | Coordinate, plan — never implement |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect` | Implementation |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger`, `wiki-reviewer` | QA |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer`, `wiki-extractor` | Investigation |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | Support |

*Source*: `rules/AGENTS.md:101-109`

---

## Quality Gates

Every Golden Triangle deliverable must pass these quality gates:

| Gate | Requirement | Tool/Method |
|------|-------------|-------------|
| Security | OWASP Top 10 vulnerabilities addressed | security-engineer review |
| Performance | Operations complete in <200ms | profiling, benchmarking |
| Testing | >80% code coverage | test runner |
| Linting | Zero lint errors | ESLint, `node --check` |

---

## Execution Flow

```
1. Tech Lead decomposes task
   └─ → Shared Task List published to Mailbox
2. Executor picks up task
   └─ → Implements subtask
   └─ → Self-reviews against quality standards
   └─ → Posts SUBMISSION to Mailbox
3. Reviewer receives submission
   └─ → Reads source materials independently
   └─ → Posts REVIEW to Mailbox
       ├─ PASS → posts APPROVAL to Tech Lead
       └─ FAIL → posts findings to Mailbox
           └─ → Executor fixes or defends → back to step 3
              (loop up to 3 times)
              └─ → After 3 rounds without resolution
                  └─ → ESCALATION to Tech Lead
4. Tech Lead arbitrates (if needed)
   └─ → Evaluates both positions with evidence
   └─ → Posts ARBITRATION to Mailbox (binding)
5. Consensus reached
   └─ → Tech Lead marks task approved in Shared Task List
   └─ → Move to next task
6. All tasks complete
   └─ → Tech Lead synthesizes output
   └─ → Posts DECISION with consensus stamp
```

---

## The Debate Mechanism

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

**Max debate rounds**: 3. After round 3 without agreement, Tech Lead reads all Mailbox exchanges and makes a **binding decision**. No further debate.

**Defense rules**:
- Executor MUST defend with **technical evidence** (benchmarks, specs, code references)
- "I disagree" without proof = automatic FAIL, Reviewer wins
- Reviewer MUST consider valid evidence. Rejecting proven-correct work = escalation to Tech Lead
- Tech Lead evaluates **evidence quality**, not seniority or role

*Source*: `rules/TEAMS.md:75-106`

---

## Communication via Shared Files

All agent communication flows through two shared artifacts:

| Artifact | Owner | Purpose |
|----------|-------|---------|
| **Shared Task List** | Tech Lead | State management for the phase's tasks — assignments, status, priorities |
| **Mailbox** | All agents (append-only) | `./.reports/{topic}/MAILBOX-{date}.md` — communication log for submissions, reviews, defenses, decisions |

**Rules**:
- Mailbox is **append-only** — no agent may edit or delete prior exchanges
- All agents read the full Mailbox to maintain shared context
- Tech Lead manages the Shared Task List; Executor and Reviewer read it
- One Mailbox per phase execution, timestamped by date
- **Size management**: If Mailbox exceeds 500 lines, Tech Lead creates a new segment per phase:
  - Current phase: `./.reports/{topic}/MAILBOX-{date}-P{n}.md`
  - Archived phase: `./.reports/{topic}/MAILBOX-{date}-P{n}-FINAL.md`
  - Each phase starts with a fresh, focused Mailbox

---

## Mailbox Communication

All Triangle communication flows through a central Mailbox:

| Message Type | Sender | Receiver | Purpose |
|-------------|--------|---------|---------|
| TASK_ASSIGNMENT | Tech Lead | Executor | Assign task with requirements |
| SUBMISSION | Executor | Reviewer | Submit completed work |
| REVIEW | Reviewer | Executor | Challenge with findings |
| DEFENSE | Executor | Reviewer | Defend against findings |
| RESUBMISSION | Executor | Reviewer | Fixed submission |
| APPROVAL | Reviewer | Tech Lead | Task approved |
| ESCALATION | Reviewer | Tech Lead | Unresolved dispute |
| ARBITRATION | Tech Lead | All | Binding dispute resolution |
| DECISION | Tech Lead | All | Phase complete with consensus |

---

## Consensus Protocol

Output is released **ONLY** when one of these conditions is met:

| Condition | Trigger |
|-----------|---------|
| **Clean pass** | Reviewer explicitly APPROVED Executor's submission (no disputes) |
| **Resolved pass** | Reviewer APPROVED after Executor fixed issues or defended successfully |
| **Arbitrated pass** | Tech Lead overrode after max 3 rounds — documents reasoning |

**Consensus stamp format**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Without this stamp, no phase output is released.** If any agent has not signed off, Tech Lead must resolve the gap before proceeding.

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

### Team vs Single Agent

| When | Use |
|------|-----|
| Standard `:fast`, `:hard` variants | Single agent per phase |
| `:team` variant | Golden Triangle per phase |
| User explicitly requests team review/collaboration | `:team` variant |
| Maximum quality with adversarial debate is priority | `:team` variant |

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

*Source*: `rules/TEAMS.md:411-439`

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

*Source*: `rules/TEAMS.md:442-458`

---

## Team Roster (18 Teams)

18 teams implement the Golden Triangle pattern across different domains:

| Team Domain | Tech Lead | Executor | Reviewer | Use When |
|-------------|-----------|----------|----------|----------|
| `backend-team` | `tech-lead` | `backend-engineer` | `reviewer` | APIs, server logic, backend features |
| `frontend-team` | `tech-lead` | `frontend-engineer` | `reviewer` | UI components, client-side features |
| `fullstack-team` | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` | End-to-end features |
| `database-team` | `tech-lead` | `database-architect` | `reviewer` + security lens | Schema design, migrations, queries |
| `research-team` | `researcher` | `scouter` | `brainstormer` (Devil's Advocate) | Discovery, codebase analysis, patterns |
| `planning-team` | `planner` | `researcher` | `tech-lead` (feasibility critic) | Architecture planning, task decomposition |
| `qa-team` | `tester` | `tester` (self-implements) | `security-engineer` + `performance-engineer` | Test strategy, coverage, quality |
| `design-team` | `designer` | `frontend-engineer` | `reviewer` + UX/a11y lens | UI/UX design, component specs |
| `debug-team` | `debugger` | `backend-engineer` | `reviewer` (root-cause validator) | Root cause analysis, issue resolution |
| `devops-team` | `devops-engineer` | `backend-engineer` | `security-engineer` | CI/CD, infrastructure, deployment |
| `security-team` | `security-engineer` | `backend-engineer` | `reviewer` (pen-test mindset) | Security assessment, vulnerability audit |
| `game-team` | `tech-lead` | `game-engineer` | `reviewer` (game arch + 60fps) | Game development, engines, physics, ECS |
| `mobile-team` | `tech-lead` | `mobile-engineer` | `reviewer` (UX + platform) | iOS, Android, React Native, Flutter |
| `performance-team` | `performance-engineer` | `backend-engineer` | `reviewer` (measurement + regression) | Profiling, optimization, load testing |
| `docs-team` | `docs-manager` | `researcher` | `reviewer` (accuracy + completeness) | Technical writing, API docs, architecture docs |
| `project-team` | `project-manager` | `business-analyst` | `tech-lead` (feasibility critic) | Project planning, risk, delivery |
| `report-team` | `reporter` | `scouter` | `reviewer` (data accuracy + insight) | Status reports, metrics, analytics |
| `wiki-team` | `wiki-architect` | `wiki-extractor` | `wiki-reviewer` | Wiki generation, entity extraction, documentation quality |

### Fullstack Special Case

The `fullstack` domain spawns **two Executors** (backend + frontend). They share the Mailbox and take turns submitting. Reviewer reviews each submission independently. Tech Lead coordinates integration between the two.

*Source*: `rules/AGENTS.md:121-140`, `rules/TEAMS.md:188-221`

---

## Wiki Team — Golden Triangle Definitions

The `wiki-team` implements the Golden Triangle for wiki generation tasks:

```
agents/teams/wiki-team/
├── techlead.md    # Wiki Architect role — decomposes, coordinates, arbitrates
├── executor.md    # Wiki Extractor role — extracts, writes, defends
└── reviewer.md    # Wiki Reviewer role — validates accuracy, completeness, coverage
```

### Wiki Team Role Mapping

| Role | Agent | Responsibility |
|------|-------|----------------|
| Tech Lead | `wiki-architect` | Decomposes wiki generation into extraction tasks, coordinates wiki-team, arbitrates disputes |
| Executor | `wiki-extractor` | Extracts content from source documents, writes wiki pages, defends content choices |
| Reviewer | `wiki-reviewer` | Validates accuracy against sources, checks completeness, ensures cross-references work |

### Communication Protocol

- **Shared Task List**: Published by Tech Lead at phase start, tracks extraction status
- **Mailbox**: `./.reports/{topic}/MAILBOX-{date}.md` — append-only log of all exchanges
- **Debate**: Max 3 rounds per task → Tech Lead arbitrates
- **Consensus**: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓` required to release output

*Source*: `rules/AGENTS.md:151-171`

---

## Task → Agent Mapping

| Task | Agent |
|------|-------|
| API, backend logic | `backend-engineer` |
| UI, components | `frontend-engineer` |
| Database schema | `database-architect` |
| Security | `security-engineer` |
| Testing | `tester` |
| Code review | `reviewer` |
| Debugging | `debugger` |
| Planning | `planner` |
| Research | `researcher` |
| Codebase analysis | `scouter` |
| Documentation | `docs-manager` |
| Deployment | `devops-engineer` |
| Reports | `reporter` |
| Project management | `project-manager` |
| Business analysis | `business-analyst` |
| Design | `designer` |
| Brainstorming | `brainstormer` |
| Game development | `game-engineer` |
| Mobile development | `mobile-engineer` |
| Technical leadership | `tech-lead` |
| Wiki generation | `wiki-architect`, `wiki-extractor`, `wiki-reviewer` |

*Source*: `rules/AGENTS.md:175-199`

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

*Source*: `rules/TEAMS.md:462-472`

---

## Integration with Existing Rules

The Golden Triangle integrates with the broader [[Agent System]] through these integration points:

| Rule File | Integration Point |
|-----------|-------------------|
| `CORE.md` | Golden Triangle respects all 10 Orchestration Laws. Tech Lead is bound by L7 (meta agents delegate). Executor and Reviewer follow L3 (complete assigned scope). |
| `PHASES.md` | Golden Triangle output extends phase format. Exit criteria verification unchanged. Each phase can use a triangle. |
| `AGENTS.md` | All three roles follow agent categories and context isolation rules. TIER 1/2 applies per-agent within the triangle. |
| `SKILLS.md` | Executor resolves skills independently via HSOL for implementation. Reviewer resolves skills for review checklists. Tech Lead does NOT resolve skills — only coordinates. |
| `ERRORS.md` | Triangle errors follow standard error recovery. Escalation path: Executor → Reviewer → Tech Lead → Orchestrator. |

See [[Command System]] for how the `:team` variant invokes the Golden Triangle. See [[Workflow System]] for workflow-level integration.

*Source*: `rules/TEAMS.md:476-484`

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

*Source*: `rules/TEAMS.md:509-520`

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
│  Tech Lead = FINAL AUTHORITY (arbitrates, synthesizes)       │
│  Executor  = BUILDER + DEFENDER (implements, pushes back)    │
│  Reviewer  = DEVIL'S ADVOCATE (challenges, validates)        │
│                                                             │
│  NO output without consensus stamp                          │
│  NO defense without technical evidence                      │
│  NO rubber-stamp reviews (Tech Lead rejects empty passes)   │
│  NO more than 3 rounds (Tech Lead decides at round 3)       │
└─────────────────────────────────────────────────────────────┘
```

*Source*: `rules/TEAMS.md:524-544`

---

## Related Pages

- [[Team System]] — All 18 Golden Triangle teams with full roster
- [[Agent System]] — Agents that serve as team members
- [[Command System]] — Commands that invoke the team variant
- [[Actor Map]] — Actor definitions for workflow mapping
- [[Workflow System]] — Workflow-level Golden Triangle integration
