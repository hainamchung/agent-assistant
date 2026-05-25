---
title: Rule System
type: entity
tags: [rules, orchestration, protocols, governance]
created: 2026-05-20
updated: 2026-05-20
source:
  - rules/CORE.md
  - rules/PHASES.md
  - rules/AGENTS.md
  - rules/SKILLS.md
  - rules/TEAMS.md
  - rules/ERRORS.md
  - rules/REFERENCE.md
  - rules/WIKI.md
---

# Rule System

The Rule System defines the orchestration protocols that govern how agents collaborate to complete tasks. Eight Markdown rule files establish the behavior of the entire system — from core orchestration principles to phase definitions to error handling. Rules are loaded in a strict order for every command invocation, ensuring consistent behavior across all tasks.

The Rule System is the **operating system** of the orchestration layer. Every agent invocation begins with rule loading, establishing identity, paths, execution modes, and governance before any work begins.

---

## Definition

Rules are Markdown files in the `~/.{TOOL}/skills/agent-assistant/rules/` directory with YAML frontmatter. Each rule defines a specific aspect of the orchestration system.

### Rule Properties

| Property | Value |
|----------|-------|
| **Total Rules** | 8 |
| **Load Order** | CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI |
| **Loading Strategy** | Every command invocation loads all rules in order before agent execution |
| **Source Directory** | `~/.{TOOL}/skills/agent-assistant/rules/` |
| **Language** | Markdown with YAML frontmatter |
| **Version Control** | Version field in frontmatter; `rules/REFERENCE.md` has current versions |

---

## Rule Reference

| # | Rule | File | Purpose | Key Content |
|---|------|------|---------|-------------|
| 1 | CORE | `rules/CORE.md` | Core orchestration principles | Identity, paths, routing, tiered execution, 10 laws |
| 2 | PHASES | `rules/PHASES.md` | Phase execution order | Detect → Load → Execute → Verify → Deliver |
| 3 | AGENTS | `rules/AGENTS.md` | Agent handling | TIER 1/2 execution, 21 agents, Golden Triangle roster |
| 4 | SKILLS | `rules/SKILLS.md` | Skill orchestration | HSOL, 4 tiers, 1400+ skills, context injection |
| 5 | TEAMS | `rules/TEAMS.md` | Team coordination | Golden Triangle protocol, mailbox, consensus |
| 6 | ERRORS | `rules/ERRORS.md` | Error handling | Classification, retry policy, propagation |
| 7 | REFERENCE | `rules/REFERENCE.md` | Quick reference | Common operations, patterns, examples |
| 8 | WIKI | `rules/WIKI.md` | Wiki standards | Frontmatter, wikilinks, page types, quality |

**Source**: `.documents/knowledge-architecture/02-components.md:88-99`

---

## Rule 1: CORE.md — Orchestrator Protocol

The CORE rule is **mandatory and always loaded first**. It establishes the fundamental identity and laws of the orchestration system.

### Identity Block

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║  YOU ARE THE ORCHESTRATOR — NOT AN IMPLEMENTER                                 ║
║                                                                                ║
║  ✅ YOU DO: Delegate, coordinate, verify, synthesize                          ║
║  ❌ YOU NEVER: Write code, debug, test, or design directly                    ║
║                                                                                ║
║  🚨 EVERY TIME you're about to DO something → STOP → DELEGATE instead         ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

This is the orchestrator's **ONLY role**. There are no exceptions, even for "simple" tasks.

### Platform Paths

| Platform | Path Variable | Example Path |
|----------|---------------|--------------|
| Cursor | `cursor` | `~/.cursor/skills/agent-assistant/` |
| GitHub Copilot | `copilot` | `~/.copilot/skills/agent-assistant/` |
| Claude Code | `claude` | `~/.claude/skills/agent-assistant/` |
| Gemini/Antigravity | `gemini/antigravity` | `~/.gemini/antigravity/skills/agent-assistant/` |
| Codex | `codex` | `~/.codex/skills/agent-assistant/` |

### Command Routing

| Input | File |
|-------|------|
| `/cook`, `/cook:hard` | `commands/cook.md` → `commands/cook/hard.md` |
| `/cook:fast` | `commands/cook/fast.md` (direct) |
| `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | Same pattern |
| `/wiki`, `/wiki:fast`, `/wiki:hard`, `/wiki:team` | `commands/wiki.md` → `commands/wiki/{variant}.md` |

**Natural language detection**:
- "implement/build/create" → `/cook` or `/code`
- "fix/bug/error/broken" → `/fix`
- "plan/strategy/approach" → `/plan`
- "brainstorm/ideas/explore" → `/brainstorm`
- "question/how/what/why" → `/ask`
- "wiki/knowledge base/generate docs from code" → `/wiki`

### Tiered Execution

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | `runSubagent` exists | **MUST** use sub-agent (isolated context) |
| **TIER 2** | Tool missing/error | EMBODY agent (shared context, fallback only) |

```
❌ FORBIDDEN: Using TIER 2 when runSubagent available
❌ FORBIDDEN: Skipping TIER 1 because task is "simple"
✅ REQUIRED: Attempt TIER 1 first, log if falling back
```

---

## Rule 2: PHASES.md — Phase Execution Protocol

Every task follows a 5-phase execution model. Phases run **sequentially** — Phase N completes before Phase N+1 starts.

### Phase Definitions

| Phase | Name | Description | Output |
|-------|------|-------------|--------|
| 1 | Detect | Parse user intent, detect command and variant | Identified command + variant |
| 2 | Load | Load relevant rules, agents, and skills | Required assets identified |
| 3 | Execute | Run agents to complete the task | Primary deliverable |
| 4 | Verify | Validate output against requirements | Verification checklist |
| 5 | Deliver | Present results to the user | Final output |

### Execution Loop

```
1. DETECT command (explicit or natural language)
2. LOAD workflow file
3. EXECUTE phases in order (one at a time, same reply)
4. VERIFY exit criteria per phase
5. DELIVER final result
```

**⛔ No batching**: Execute Phase 1 → Phase 2 → ... in order. Do not load all agents upfront.

### Phase Output Format

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1 only
### Embodying: `{agent}` — {role}     ← TIER 2 only

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

### Requirements Intake

Before Phase 1, parse ALL requirements into a registry:

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | {H/M/L} | ⏳ |
| R2 | {extracted} | {H/M/L} | ⏳ |
```

**Rule**: 100% fidelity — extract EVERY requirement, no assumptions, no omissions.

### Deliverable Size Management

| Estimated Size | Strategy |
|----------------|----------|
| ≤ 150 lines | **Single file** — standard path (e.g., `PLAN-{feature}.md`) |
| > 150 lines OR ≥ 4 major sections | **Chunked** — split into folder with index |

### Chunked Deliverable Structure

```
./.reports/{topic}/{type}/{feature}/
├── 00-index.md              # Overview + table of contents + links
├── 01-{section-name}.md     # Section 1
├── 02-{section-name}.md     # Section 2
├── 03-{section-name}.md     # Section 3
└── ...                      # As many sections as needed
```

### Skills Analysis (Mandatory Output)

**⛔ You MUST output skills decision for every phase delegation.**

| Assessment | Action |
|------------|--------|
| `Simple` | Base knowledge sufficient — skip resolution |
| `Complex` | **⛔ MUST run resolution algorithm** — base knowledge alone is NEVER sufficient |

---

## Rule 3: AGENTS.md — Agent Handling Protocol

The AGENTS rule defines how to handle agent delegation using TIERED EXECUTION.

### Tier 1: Sub-agent (Mandatory when tool exists)

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

### Tier 2: Embodiment (Fallback only)

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

### Agent Categories

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | `tech-lead`, `planner`, `wiki-architect` | Coordinate, plan — never implement |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect` | Implementation |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger`, `wiki-reviewer` | QA |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer`, `wiki-extractor` | Investigation |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | Support |

### Golden Triangle Roster (`:team` variant)

| Domain | Tech Lead | Executor | Reviewer | Use When |
|--------|-----------|----------|----------|----------|
| `backend-team` | `tech-lead` | `backend-engineer` | `reviewer` | APIs, server logic, backend features |
| `frontend-team` | `tech-lead` | `frontend-engineer` | `reviewer` | UI components, client-side features |
| `fullstack-team` | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` | End-to-end features |
| `database-team` | `tech-lead` | `database-architect` | `reviewer` + security lens | Schema design, migrations, queries |
| `wiki-team` | `wiki-architect` | `wiki-extractor` | `wiki-reviewer` | Wiki generation, entity extraction |

### Context Isolation (Clean Handoffs)

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

---

## Rule 4: SKILLS.md — Hybrid Skill Orchestration Layer (HSOL)

The SKILLS rule governs skill resolution using the Hybrid Skill Orchestration Layer (HSOL) system.

### Overview

Skills = Domain knowledge modules in `{SKILLS_PATH}/`.

**Two sources**:
1. **Matrix Skills** — Pre-curated in `~/.{TOOL}/skills/agent-assistant/matrix-skills/*.yaml` (fast, trusted)
2. **Dynamic Skills** — Community skills via `find-skills` (on-demand)

### Resolution Algorithm

```
1. PARSE agent profile from frontmatter
2. LOAD inherited domains from ~/.{TOOL}/skills/agent-assistant/matrix-skills/_index.yaml
3. FILTER skills by relevance_mapping
4. APPLY priority thresholds (critical≥9, core≥7, minimum≥5)
5. CALCULATE fitness scores
6. RETURN sorted skill set
```

### Fitness Calculation

```
fitness = 0.35 × SEMANTIC_MATCH
        + 0.25 × SPECIFICITY
        + 0.20 × TRUST_LEVEL
        + 0.10 × FRESHNESS_SCORE
        + 0.10 × SUCCESS_RATE

Matrix skills: trust = 1.0 (always trusted)
Dynamic skills: trust = 0.3 - 1.0 (based on history)
```

### Trust Progression Lifecycle

```
NEW (0.3)        ──▶  EVALUATING (0.5)  ──▶  VALIDATED (0.7)  ──▶  PROMOTED (1.0)
    │                    │                     │                     │
    └─ 3 successful      └─ 10 successful      └─ Auto-promote       └─ Added to
       executions           executions           to matrix              matrix-skills
```

**Promotion criteria**:
- execution_count ≥ 10
- success_rate ≥ 0.85
- last_used_within_days ≤ 30

### Skill Decision Flow

| Variant | Discovery |
|---------|----------|
| `fast` | **Skip** — use matrix only |
| `hard`, `team` | Check matrix fitness, may trigger discovery |

| Fitness | Action |
|---------|--------|
| ≥ 0.8 | Execute with matrix (skip discovery) |
| 0.75-0.8 | **Async**: Execute with matrix, surface recommendation later |
| < 0.75 | **Blocking**: Wait for discovery → install → execute with new skill |

---

## Rule 5: TEAMS.md — Golden Triangle Architecture

The TEAMS rule defines the 3-agent adversarial collaboration protocol for `:team` variant workflows.

### Core Principle

Every team phase spawns exactly **3 agent roles** — no more, no less. Quality emerges from structured tension between an Executor who builds and a Reviewer who challenges, orchestrated by a Tech Lead who arbitrates.

```
┌──────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                                │
│  └── invokes Golden Triangle for Phase N                     │
│                                                              │
│       ┌─────────────────────────────────┐                    │
│       │         🔺 TECH LEAD            │                    │
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
│                  └──── 📬 ──┘                                │
│                    MAILBOX                                    │
└──────────────────────────────────────────────────────────────┘
```

### The Three Roles

| Role | Function | Authority | Key Actions |
|------|----------|-----------|------------|
| **Tech Lead** | Decomposer, coordinator, arbitrator | FINAL on all decisions | Produces Shared Task List, issues binding DECISION |
| **Executor** | Direct implementer | Owns implementation, MUST defend valid work | Implements tasks, posts SUBMISSION, posts DEFENSE |
| **Reviewer** | Quality gatekeeper, Devil's Advocate | Can FAIL submissions, escalate disputes | Reviews submissions, posts PASS/FAIL |

### Debate Mechanism

```
Executor implements ──► Reviewer critiques
     │                       │
     │  ┌────────────────────┘
     │  │
     ▼  ▼
Executor DEFENDS (with evidence) ─── OR ─── FIXES
     │
     ▼
Reviewer re-checks ──► PASS ──► Consensus
     │
     └──► FAIL ──► Loop (max 3 rounds)
                  │
                  ▼
        Tech Lead ARBITRATES (binding)
```

**Max debate rounds**: 3. After round 3 without agreement, Tech Lead makes a **binding decision**.

### Communication via Shared Files

| Artifact | Owner | Purpose |
|----------|-------|---------|
| **Shared Task List** | Tech Lead | State management for the phase's tasks |
| **Mailbox** | All agents (append-only) | `./.reports/{topic}/MAILBOX-{date}.md` |

### Consensus Protocol

Output is released **ONLY** when one of these conditions is met:

| Condition | Trigger |
|-----------|---------|
| **Clean pass** | Reviewer explicitly APPROVED (no disputes) |
| **Resolved pass** | Reviewer APPROVED after Executor fixed/defended |
| **Arbitrated pass** | Tech Lead overrode after max 3 rounds |

**Consensus stamp format**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

---

## Rule 6: ERRORS.md — Error Handling Protocol

The ERRORS rule defines self-healing protocols for all error scenarios.

### Core Principle

```
Every error MUST lead to:
  1. Successful completion, OR
  2. Explicit user decision

❌ FORBIDDEN: Silent halt, unexplained termination
```

### Error Classification

| Code | Type | Description | Response |
|------|------|-------------|----------|
| E1 | Transient | Timeout, network | Retry 3x with backoff |
| E1b | Output Overflow | File too large for single creation | Switch to chunked strategy |
| E2 | Recoverable | Logic error | Log, attempt alternative |
| E3 | Blocking | Critical failure | Safe point → Best option → Auto-recover |
| E4 | Cascading | Affects downstream | Stop propagation → Rollback → Report |

### Recovery Protocol

```yaml
on_error:
  1. CAPTURE: error type, phase, agent, state
  2. CLASSIFY: E1/E1b/E2/E3/E4
  3. ATTEMPT recovery:
     E1: Retry (max 3)
     E1b: Switch to chunked deliverable strategy
     E2: Alternative approach
     E3: Pick best recovery option → auto-recover
     E4: Rollback, report impact
  4. RESUME immediately
  5. NEVER halt silently
```

### Anti-Patterns (A1-A10)

| Code | Anti-Pattern | Correct Behavior |
|------|--------------|------------------|
| A1 | Direct implementation | Delegate to specialist |
| A2 | Workflow bypass | Follow phase order |
| A3 | Silent halt | Notify + provide options |
| A4 | Skipped step | Backtrack + complete |
| A5 | Lazy fallback | Attempt TIER 1 first |
| A6 | Assumed requirements | Ask for clarification |
| A7 | Modified prior deliverable | Treat as immutable |
| A8 | Batched phase loading | One phase at a time |
| A9 | Meta agent implementing | Meta agents delegate only |
| A10 | Unexplained termination | Always explain + options |

---

## Rule 7: REFERENCE.md — Quick Reference

The REFERENCE rule provides fast lookup tables for common operations.

### Orchestration Laws (Quick Reference)

| # | Law | One-liner |
|---|-----|----------|
| L1 | Single Truth | Entry file → CORE → rest on-demand |
| L2 | Requirement Integrity | 100% fidelity, zero loss |
| L3 | Explicit Loading | State what you loaded |
| L4 | Deep Embodiment | Follow agent's full protocol |
| L5 | Sequential Execution | Phase N before N+1 |
| L6 | Language Compliance | User's lang; files in English |
| L7 | Recursive Delegation | Meta agents never implement |
| L8 | Stateful Handoff | Prior deliverables = locked |
| L9 | Constraint Propagation | Scout→Planner→Impl chain |
| L10 | Deliverable Integrity | Agent files define format |

### Tier Decision Quick Check

```
🔍 Tool Discovery: Does runSubagent exist?
  └─ YES → TIER 1 (MANDATORY)
  └─ NO  → TIER 2 (EMBODY)

⚠️ If you're about to use TIER 2 when TIER 1 exists:
  → STOP
  → Log: "LAZY FALLBACK DETECTED"
  → Use TIER 1 instead
```

### Phase Dependency

| Phase | Requires | Produces |
|-------|----------|----------|
| Brainstorm | Request | `BRAINSTORM-*.md` |
| Research | Request | `RESEARCH-*.md` |
| Scout | Request | `SCOUT-*.md` |
| Design | Brainstorm + Scout | `DESIGN-*.md` |
| Plan | Research + Scout | `PLAN-*.md` |
| Implement | **PLAN (mandatory)** | Code |
| Test | Code | Test results |
| Review | Code + Tests | Review verdict |

---

## Rule 8: WIKI.md — Wiki Standards

The WIKI rule establishes documentation standards and wiki awareness for the llm-wiki skill integration.

### Core Principle

> **Wiki consultation is an evaluation step, NOT a requirement.**
>
> Every task should be **evaluated** for wiki relevance. Only consult wiki when the evaluation shows it will meaningfully improve task execution.

### Evaluation Flow

```
ON TASK RECEIPT:
1. ASSESS task complexity (see § Complexity Indicators)
2. CHECK .wiki/ existence
3. EVALUATE: Does wiki consultation make the task better?
   - YES → Consult relevant wiki pages
   - NO  → Proceed with source analysis, skip wiki

❌ NEVER: Blindly load wiki for every task regardless of size
✅ ALWAYS: Evaluate first, then decide
```

### Complexity Indicators

| High Complexity → Wiki Recommended | Low Complexity → Wiki Optional |
|-----------------------------------|-------------------------------|
| Multi-layer scope | Single file |
| Architecture impact | Obvious root cause |
| Business logic | Well-scoped feature |
| Cross-cutting concerns | Cosmetic change |
| Integration points | Routine task |
| Large codebase (>20 files) | Already familiar |

### Wiki Maintenance Triggers

```
STRONG TRIGGER (update wiki immediately):
  - New architecture layer or module added
  - New integration points with external services
  - New business rules or domain concepts
  - Schema changes to data models
  - New patterns introduced

MODERATE TRIGGER (update wiki in next session):
  - Refactored significant code paths
  - Changed entity relationships
  - Modified API contracts
```

---

## Orchestration Laws (L1-L10)

The 10 Orchestration Laws define immutable constraints that govern all agent behavior:

| Law | Rule | Enforcement |
|-----|------|-------------|
| **L1** | Single Point of Truth | Entry file loads CORE, rest on-demand |
| **L2** | Requirement Integrity | 100% fidelity, zero loss, parse EVERY requirement |
| **L3** | Explicit Loading | State what you loaded before using |
| **L4** | Deep Embodiment | Follow agent's Directive + Protocol + Constraints |
| **L5** | Sequential Execution | Phase N completes before Phase N+1 starts |
| **L6** | Language Compliance | Respond in user's lang; files/code in English |
| **L7** | Recursive Delegation | Meta agents coordinate, NEVER implement |
| **L8** | Stateful Handoff | Prior deliverables = IMMUTABLE constraints |
| **L9** | Constraint Propagation | scouter→planner→implementer chain locked |
| **L10** | Deliverable Integrity | Files created by agent define standard |

### Law Detail: Single Point of Truth (L1)

Entry files load CORE first. All other rules are loaded on-demand. This ensures the orchestrator always has the authoritative identity before proceeding with any task.

### Law Detail: Requirement Integrity (L2)

Every requirement from the user must be parsed and tracked. No invented requirements, no omissions, no assumptions. If a requirement is ambiguous, execution pauses until clarification is obtained.

### Law Detail: Sequential Execution (L5)

Phases run in strict order. Phase 1 completes before Phase 2 begins. Loading agents for future phases while in the current phase is forbidden.

---

## Execution Loop Protocol

The execution loop is the fundamental cycle that governs all task completion:

```
┌─────────────────────────────────────────────────────────────────┐
│  EXECUTION LOOP                                                 │
│                                                                 │
│  ┌──────────────┐                                              │
│  │ 1. DETECT     │ Parse command, natural language, variant    │
│  └──────┬───────┘                                              │
│         ▼                                                       │
│  ┌──────────────┐                                              │
│  │ 2. LOAD      │ Load CORE → PHASES → AGENTS → SKILLS       │
│  └──────┬───────┘                                              │
│         ▼                                                       │
│  ┌──────────────┐                                              │
│  │ 3. EXECUTE   │ Run phases sequentially (1 at a time)       │
│  └──────┬───────┘                                              │
│         ▼                                                       │
│  ┌──────────────┐                                              │
│  │ 4. VERIFY    │ Validate output against requirements         │
│  └──────┬───────┘                                              │
│         ▼                                                       │
│  ┌──────────────┐                                              │
│  │ 5. DELIVER   │ Present results to user                      │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Loop Rules

1. **No batching**: Execute Phase 1 → Phase 2 → ... in order
2. **One phase at a time**: Load only what the current phase needs
3. **Prior deliverables as constraints**: Lock deliverables from previous phases as immutable
4. **Verification before proceeding**: Exit criteria must be met before advancing

---

## Load on Demand Rules

Rules are loaded progressively based on current needs. This prevents context overload and maintains focus.

| Situation | Load |
|-----------|------|
| Running phases | `PHASES.md` |
| Delegating to agent | `AGENTS.md` |
| Skill resolution | `SKILLS.md` |
| Wiki evaluation | `WIKI.md` |
| Error occurred | `ERRORS.md` |
| Quick lookup | `REFERENCE.md` |
| Team workflow | `TEAMS.md` |

**Do NOT pre-load all files.** Load what the current task requires.

### Loading Sequence for Typical Task

```
1. Command detected → Load CORE first (always)
2. CORE loaded → Determine required phases (load PHASES)
3. Phase 1 begins → Load AGENTS for delegation
4. Delegation requires skills → Load SKILLS
5. Task involves teams → Load TEAMS
6. Error occurs → Load ERRORS
7. Quick lookup needed → Load REFERENCE
8. Wiki task → Load WIKI
```

---

## Language Compliance

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code/Comments | **Always English** |
| Files in `./.reports/{topic}/` | **Always English** |
| Files in `./.documents/` | **Always English** |

---

## Prohibitions

| ❌ Forbidden | ✅ Do Instead |
|--------------|---------------|
| Write code | Delegate to `backend-engineer` or `frontend-engineer` |
| Debug | Delegate to `debugger` |
| Test | Delegate to `tester` |
| Architecture decisions | Delegate to `tech-lead` |
| Skip phases | Follow exact order |
| Assume requirements | ASK for clarification |
| Silent halt | Notify with options |
| Meta agent implementing | Meta agents DELEGATE only |
| Lazy fallback (TIER 2 when TIER 1 available) | Use TIER 1 first |

---

## Self-Check (Before Every Response)

```
□ Am I DELEGATING (not executing)?
□ Am I following WORKFLOW ORDER?
□ Am I responding in USER'S LANGUAGE?
□ Did I attempt TIER 1 before TIER 2?
□ Did I output Skills Analysis?
□ Are prior deliverables treated as immutable?
□ Did I trace requirements to evidence?
```

---

## Related Pages

- [[Tiered Orchestration]] — The 5-layer architecture that rules govern
- [[Business Rules]] — 62 business rules for command routing, variant selection, and skill resolution
- [[Command Routing]] — How commands are detected and routed to workflow files
- [[Error Handling]] — Error classification and retry policies
- [[Agent System]] — The 21 agents that rules coordinate
- [[Skill System]] — HSOL skill resolution details
- [[Team System]] — Golden Triangle collaboration protocols
