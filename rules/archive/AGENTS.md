# 🤖 AGENTS

> **VERSION**: 1.0 | **LOAD**: When delegating to agents | **PURPOSE**: Agent definitions, tiered execution protocol

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

## CONTEXT MODEL

| Aspect | TIER 1: Sub-agent | TIER 2: EMBODY |
|--------|-------------------|----------------|
| Priority | ⭐ MANDATORY | 🔄 Fallback |
| Context | Fresh, isolated | Shared with parent |
| Parallel | Yes | No (sequential) |
| Availability | Platform-dependent | Always available |

---

## COMPLETION GUARANTEE

TIER 1 primary → TIER 2 fallback → EMBODY always works. NO task is ever skipped or fails completely.

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

> **GOLDEN TRIANGLE ROSTER & PROTOCOL**: See [TEAMS.md](./TEAMS.md) → Team Roster and full debate mechanism.
> Teams spawn exactly **3 agents per phase**: Tech Lead + Executor + Reviewer.

### Golden Triangle vs Single Agent

| When | Use |
|------|-----|
| Standard `:fast`, `:hard` variants | Single agent per phase |
| `:team` variant | Golden Triangle per phase |
| User explicitly requests team review/collaboration | `:team` variant |
| Maximum quality with adversarial debate is priority | `:team` variant |

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
strict_rules:
  ❌ NEVER assess task as "too simple" for sub-agent
  ❌ NEVER prioritize tokens over context isolation
  ✅ ALWAYS use sub-agent when tool exists
  ✅ ALWAYS log sub-agent attempt before any EMBODY
violation: STOP → Log "⚠️ LAZY FALLBACK DETECTED" → Attempt TIER 1
```
