# 🔺 TEAMS — Streamlined Review Protocol

> **VERSION**: 2.0 | **LOAD**: When `:team` variant is invoked
>
> Full Golden Triangle debate protocol archived in `rules/archive/TEAMS.md`.

---

## CORE PRINCIPLE

Every `:team` phase spawns exactly **3 agent roles**: Tech Lead + Executor + Reviewer.
Quality emerges from structured review, not ceremony.

---

## THE THREE ROLES

| Role | Agent | Function |
|------|-------|----------|
| **Tech Lead** | Varies by domain | Decomposes task, coordinates, synthesizes output |
| **Executor** | Varies by domain | Implements the deliverable |
| **Reviewer** | Varies by domain | Reviews against 5-dimension checklist |

---

## TEAM ROSTER

| Domain | Tech Lead | Executor | Reviewer |
|--------|-----------|----------|----------|
| backend | `tech-lead` | `backend-engineer` | `reviewer` |
| frontend | `tech-lead` | `frontend-engineer` | `reviewer` |
| fullstack | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` |
| database | `tech-lead` | `database-architect` | `reviewer` |
| research | `researcher` | `scouter` | `brainstormer` |
| planning | `planner` | `researcher` | `tech-lead` |
| qa | `tester` | `tester` | `security-engineer` + `performance-engineer` |
| design | `designer` | `frontend-engineer` | `reviewer` |
| debug | `debugger` | `backend-engineer` | `reviewer` |
| devops | `devops-engineer` | `backend-engineer` | `security-engineer` |
| docs | `docs-manager` | `researcher` | `reviewer` |
| report | `reporter` | `scouter` | `reviewer` |
| game | `tech-lead` | `game-engineer` | `reviewer` |
| mobile | `tech-lead` | `mobile-engineer` | `reviewer` |
| performance | `performance-engineer` | `backend-engineer` | `reviewer` |
| project | `project-manager` | `business-analyst` | `reviewer` |
| security | `security-engineer` | `backend-engineer` | `reviewer` |
| review | `tech-lead` | `scouter` + `reviewer` | `security-engineer` |

---

## Dynamic Team Assembly (Signal-Based)

> Teams can be selected dynamically by matching task description keywords against
> team signals. The team with the highest signal match score is suggested. If no
> signals match or scores tie, fall back to the command's default team roster.

| Domain | Signals (+) | Signals (-) |
|--------|-------------|-------------|
| backend | REST, API, endpoint, database, migration, server, middleware | UI, CSS, animation, mobile, game |
| frontend | React, CSS, UI, component, layout, responsive, DOM | SQL, migration, server, infrastructure |
| fullstack | full-stack, end-to-end, both frontend and backend | — |
| database | schema, query, ETL, data model, SQL, ORM, migration | UI, CSS, animation |
| research | research, analysis, benchmark, comparison, evaluation | implementation, deploy |
| planning | plan, strategy, roadmap, architecture, approach | implementation, deploy |
| qa | test, QA, regression, coverage, bug, quality | deploy, infrastructure |
| design | UX, UI design, wireframe, prototype, Figma, layout | SQL, server, CI |
| debug | debug, trace, error, crash, investigation, stack trace | deploy, design |
| devops | CI, CD, Docker, deploy, infrastructure, Kubernetes | UI, mobile, game |
| docs | documentation, README, API docs, spec, guide, changelog | CI, deploy |
| report | report, analysis, metrics, summary, assessment | implementation, deploy |
| game | game, Unity, Unreal, 2D, 3D, physics, sprite, game loop | SQL, server, CI |
| mobile | mobile, iOS, Android, React Native, Flutter, Swift, Kotlin | SQL, server, CI |
| performance | performance, latency, throughput, profiling, optimization, benchmark | UI, design |
| project | project management, milestone, sprint, timeline, resource, Gantt | implementation, code |
| security | security, vulnerability, OWASP, penetration, audit, CVE, hardening | UI, design, game |
| review | review, code review, PR, audit, quality check, inspect, assess | implementation, deploy |

**Tiebreaker**: Most specific signal match wins. If still tied, prefer the team that appears first in the TEAM ROSTER table.

---

## CAPABILITY BUNDLES

> For composite tasks, pre-configured agent bundles override individual routing.
> **LOAD**: `rules/CAPABILITY-BUNDLES.md` when task matches a known bundle pattern.

---

## REVIEW PROTOCOL (EMBODY Execution — Fallback)

```
1. Tech Lead reads requirements → decomposes into subtasks
2. Executor implements each subtask → produces deliverable
3. Reviewer applies 5-dimension checklist (see below)
4. IF issues found → Executor revises (1 revision max)
5. Tech Lead synthesizes final output
```

### 5-Dimension Review Checklist

| # | Dimension | Key Questions |
|---|-----------|---------------|
| 1 | **Correctness** | Does it meet requirements? Edge cases handled? |
| 2 | **Completeness** | All subtasks addressed? Nothing missing? |
| 3 | **Quality** | Code standards, patterns, readability? DRY, SOLID? |
| 4 | **Security** | OWASP violations? Injection risks? Auth gaps? |
| 5 | **Coherence** | Fits broader system? Consistent with existing code? |

### Structured Disagreement

Reviewer may raise formal objections beyond PASS/FAIL:

```
### OBJECTION
**Category**: {over-engineering | security-risk | missing-requirement | performance | incorrect-approach}
**Severity**: {blocking | advisory}
**Evidence**: {specific evidence from deliverable}
**Alternative**: {proposed alternative approach}
```

**Resolution protocol**:
1. **Blocking** objections MUST be resolved before phase completion
2. **Advisory** objections are documented but don't block progress
3. If executor and reviewer disagree after 1 revision → Tech Lead arbitrates (final decision)
4. Resolution (accepted/rejected + reason) documented in phase output
5. OBJECTION does NOT reset the 1-revision-max rule — still only 1 revision total

---

## PHASE OUTPUT FORMAT

```markdown
## 🎭 Phase {N}: {name} — 🔺 TEAM

### 🔺 Team Assignment
| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `{agent}` | {mission} |
| Executor | `{agent}` | {mission} |
| Reviewer | `{agent}` | {mission} |

### Review Summary ({N}/5 dimensions passed)
| # | Dimension | Status | Notes |
|---|-----------|--------|-------|
| 1 | Correctness | ✅/❌ | {notes} |
| 2 | Completeness | ✅/❌ | {notes} |
| 3 | Quality | ✅/❌ | {notes} |
| 4 | Security | ✅/❌ | {notes} |
| 5 | Coherence | ✅/❌ | {notes} |

### ✅ Phase {N} complete
**Deliverable**: {summary}
```

---

## SUB-AGENT EXECUTION [AUTO-ACTIVATING]

Team commands use the **Role-Based Hybrid** execution model:
- **Tech Lead + Executor**: EMBODY (meta/execution categories — need shared context)
- **Reviewer**: SUB-AGENT with Context Briefing (validation category — needs independence)
- **Fallback** (sub-agent unavailable): Reviewer uses EMBODY + Anti-Bias Protocol

When sub-agent spawning is available, this section formalizes the shared
Mailbox specification. Load the full Golden Triangle protocol from
`rules/archive/TEAMS.md` for reference on:
- Mailbox-based communication
- Multi-round debate (up to 3 rounds)

---

## 🔄 DEVIATION — Plan Deviation Negotiation

When an agent discovers the plan cannot be followed as written:

### When to Deviate
- Required file/API doesn't exist or has changed
- Estimated effort was wrong by > 2x
- Security concern discovered during implementation
- Dependency not met (blocked by external factor)

### DEVIATION Block Format

```
DEVIATION:
  agent: {agent-name}
  plan-step: {step reference from plan}
  reason: {what changed}
  original: {what the plan said to do}
  proposed: {what the agent wants to do instead}
  impact: none|schedule|scope|risk
  urgency: blocking|advisory
```

### Resolution

| Urgency | Action |
|---------|--------|
| `blocking` | HALT workflow. Tech Lead reviews. If approved → continue with deviation. If rejected → escalate to user. |
| `advisory` | LOG deviation. Continue with proposed change. Tech Lead reviews post-hoc. |

### DEVIATION vs OBJECTION
- **OBJECTION**: Agent disagrees with another agent's *output quality*
- **DEVIATION**: Agent cannot follow the *plan as written*
- Escalation and arbitration

---

## Consensus Stamps

### Purpose
Standardized notation for recording multi-agent consensus in `:team` workflows.
Used by evaluators and reviewers to mark their verdict consistently.

### Format
```
{DECISION} — Consensus Stamp
  Evaluators: {agent1}, {agent2}[, ...]
  Score: {weighted score}/5.0
  Rating: {EXCELLENT | GOOD | ACCEPTABLE | NEEDS-WORK}
  Conditions: {list of conditions, or "None"}
  Dissent: {dissenting opinion, or "None"}
  Date: {YYYY-MM-DD}
```

### Decisions
| Stamp | Meaning | Action |
|-------|---------|--------|
| `APPROVE` | All evaluators agree. No blocking issues. | Proceed to next phase. |
| `APPROVE-WITH-CONDITIONS` | Approved if listed conditions are resolved. | Address conditions, then proceed. No re-review needed. |
| `REVISE` | Significant issues found. Needs rework. | Rework and re-submit for review. |
| `REJECT` | Fundamental problems. Cannot proceed. | Major rework required. Full re-review. |

### Example
```
APPROVE-WITH-CONDITIONS — Consensus Stamp
  Evaluators: reviewer, security-engineer
  Score: 3.8/5.0
  Rating: GOOD
  Conditions:
    1. Add missing schema-version frontmatter to 3 files
    2. Fix R102 handoff warning in debugger.md
  Dissent: None
  Date: 2025-04-15
```

### Rules
1. **Minimum evaluators**: 2 for `:team` variant (1 domain expert + 1 cross-functional)
2. **Dissent**: Must be recorded even if overruled (transparency requirement)
3. **Conditions**: Numbered, specific, testable — no vague "improve quality"
4. **Score**: Uses `rules/EVALUATION.md` methodology if available; otherwise plain text assessment
5. **Stamp location**: At the END of the deliverable file, after all content
6. **Role disambiguation**: When an agent fills a non-default role, use `{agent}:{role}` notation in Evaluators field. Example: `Evaluators: researcher:tech-lead, scouter:executor` — this clarifies which hat each agent wore during evaluation

---

## Voice Coherence (Team-Level)

When operating as a team:
- Load `rules/VOICE-COHERENCE.md` for full adaptation rules
- Lead agent sets base tone; others follow ±`deviation_tolerance` levels
- Command type sets formality floor (see VOICE-COHERENCE.md §2)
- Persona overrides apply when `formality_adaptation: false`
