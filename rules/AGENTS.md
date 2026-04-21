# 🤖 AGENTS

> **LOAD**: When delegating to agents | **PURPOSE**: Agent handling protocol

---

## TIERED EXECUTION

### TIER 1: Sub-agent (MANDATORY when tool exists)

```yaml
1. Prepare handoff:
   include: requirements, task, acceptance criteria, constraints
   exclude: internal reasoning, failed attempts

2. Skills analysis: (output required)
   "🎯 Skills Analysis: {simple|complex} → {using X | skipping}"

3. Invoke: runSubagent(agent_name, context)

4. Verify: format matches, criteria met

5. On error: fallback to TIER 2, log reason
```

### TIER 2: EMBODY (Fallback only)

```yaml
permitted_when:
  - Tool Discovery found NO sub-agent tools
  - Sub-agent tool returned system error

forbidden_reasons:
  - Task seems "simple"
  - "Save tokens"
  - "Efficiency"

execution:
  1. Log: "⚠️ TIER 2: {reason}"
  2. READ agent file COMPLETELY
  3. EXTRACT: Directive, Protocol, Constraints, Format
  4. ANNOUNCE embodiment (see format below)
  5. EXECUTE as agent (follow THEIR protocol)
  6. EXIT embodiment, continue as orchestrator
```

**Embodiment Announcement Format**:
```markdown
📋 EMBODIED: `{agent}`
**Directive**: {core directive verbatim}
**Protocol**: {thinking protocol summary}
**Constraints**: {key constraints}
```

---

## TOOL DISCOVERY (First delegation only)

```markdown
## 🔍 Tool Discovery
| Check | Result |
|-------|--------|
| Sub-agent tool | ✅ / ❌ |
| Execution tier | TIER 1 / TIER 2 |
```

**Cache**: Tool discovery result is cached for session. Do not re-check.

---

## CONTEXT MODEL COMPARISON

| Aspect | TIER 1: Sub-agent | TIER 2: EMBODY |
|--------|-------------------|----------------|
| Priority | ⭐ MANDATORY | 🔄 Fallback |
| Context | Fresh, isolated | Shared with parent |
| Quality | ✅ Optimal | ⚠️ Risk of pollution |
| Parallel | Yes | No (sequential) |
| Availability | Platform-dependent | Always available |

---

## COMPLETION GUARANTEE

```yaml
rule: "EVERY delegation request WILL be fulfilled"

mechanism:
  - TIER 1 is primary when available
  - TIER 2 is fallback when TIER 1 fails
  - EMBODY always works (read + transform)

result:
  - NO task is ever skipped
  - NO delegation ever fails completely
  - System is future-proof
```

---

## AGENT CATEGORIES

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | tech-lead, planner | Coordinate, never implement |
| **execution** | backend-engineer, frontend-engineer, mobile-engineer, game-engineer, database-architect | Implementation |
| **validation** | tester, reviewer, security-engineer, performance-engineer, debugger | QA |
| **research** | researcher, scouter, brainstormer, designer | Investigation |
| **support** | docs-manager, devops-engineer, business-analyst, project-manager, reporter | Support |

---

## 🔺 AGENT TEAMS — GOLDEN TRIANGLE (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol and debate mechanism.
> Teams spawn exactly **3 agents per phase**: Tech Lead + Executor + Reviewer.
> Adversarial collaboration produces higher quality than parallel cooperation.

### Golden Triangle Roster

| Domain | Tech Lead | Executor | Reviewer | Use When |
|--------|-----------|----------|----------|----------|
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

### Golden Triangle vs Single Agent

| When | Use |
|------|-----|
| Standard `:fast`, `:hard` variants | Single agent per phase |
| `:team` variant | Golden Triangle per phase |
| User explicitly requests team review/collaboration | `:team` variant |
| Maximum quality with adversarial debate is priority | `:team` variant |

### Golden Triangle Definitions Location

```
agents/teams/{team-name}/
├── techlead.md    # Coordinator, decomposer, arbitrator
├── executor.md    # Builder, implementer, defender
└── reviewer.md    # Devil's advocate, quality gatekeeper
```

### Communication Protocol

- **Shared Task List**: Published by Tech Lead at phase start, tracks task status
- **Mailbox**: `./reports/{topic}/MAILBOX-{date}.md` — append-only log of all exchanges
- **Debate**: Max 3 rounds per task → Tech Lead arbitrates
- **Consensus**: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓` required to release output

---

## TASK → AGENT MAPPING

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

---

## CONTEXT ISOLATION (Clean Handoffs)

```
INCLUDE:
  - Original requirements (verbatim)
  - Decisions from prior phases
  - Concrete deliverables
  - Current state
  - Deliverable size directive (single file vs chunked)

EXCLUDE:
  - Internal reasoning
  - Failed attempts
  - Alternatives not selected
```

### Deliverable Size Directive (MANDATORY in handoff)

```
WHEN delegating to any agent that produces deliverables:
  ADD to handoff context:
    "DELIVERABLE SIZE: If output exceeds 150 lines or has ≥ 4 major sections,
     use CHUNKED strategy: create folder with 00-index.md first, then each
     section file sequentially. Never create a single file > 200 lines.
     Never create multiple files in parallel."
```

---

## RECURSIVE DELEGATION

```
IF agent.category == "meta" OR agent.handoffs.length > 0:
  → This is a MANAGER agent
  → MUST delegate to specialists
  → NEVER implement directly
```

---

## ANTI-LAZY FALLBACK DETECTION

```yaml
detection:
  - Choosing TIER 2 without attempting TIER 1
  - Justifying EMBODY with "task is simple"
  - Mentioning "efficiency" when choosing EMBODY

correction:
  1. STOP
  2. Log: "⚠️ LAZY FALLBACK DETECTED"
  3. Attempt TIER 1 first
  4. Only use TIER 2 if TIER 1 actually fails

strict_rules:
  ❌ NEVER assess task as "too simple" for sub-agent
  ❌ NEVER prioritize tokens over context isolation
  ✅ ALWAYS use sub-agent when tool exists
  ✅ ALWAYS log sub-agent attempt before any EMBODY
```
