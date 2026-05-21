---
title: Command Routing
type: concept
tags: [pattern, routing, execution, variants, complexity, agents, tiered]
created: 2026-05-20
updated: 2026-05-20
sources:
  - rules/CORE.md
  - rules/AGENTS.md
  - documents/business/business-features/03-feature-specifications.md
  - commands/wiki.md
---

# Command Routing

Command Routing is the execution pattern that scales Agent Assistant's processing with task complexity. It provides three execution variants — fast, hard, and team — that range from a single specialist agent to a full Golden Triangle adversarial team. The appropriate variant is selected based on task scope, risk level, and quality requirements.

---

## Definition

A three-tier variant execution system where each command (`/cook`, `/fix`, `/plan`, etc.) can be executed at different levels of agent involvement and review depth. The system scales from quick 2-agent tasks to full adversarial team reviews.

- **Pattern Type**: Execution Pattern
- **Variants**: fast (2–3 agents), hard (5–8 agents), team (Golden Triangle)
- **Selection**: Automatic based on task complexity, or explicit via `/command:variant`
- **Source**: `rules/CORE.md`, `documents/knowledge-architecture/03-data-flow.md:72-79`, `documents/knowledge-architecture/04-design-patterns.md:220-297`

---

## Context and Motivation

Not every task needs the same level of scrutiny. A quick documentation fix needs different treatment than a redesign of the authentication system. Command Routing solves this by providing three tiers of execution:

- **fast** — for quick wins and low-risk changes
- **hard** — for complex work requiring multiple specialists
- **team** — for high-stakes work requiring adversarial review

This tiered approach means:
- Simple tasks complete quickly without overhead
- Complex tasks get the thorough review they need
- The system scales quality investment proportional to task risk

---

## Platform Resolution

Command Routing works across multiple AI coding platforms. The base paths resolve to platform-specific locations:

| Platform | Tool | Example Path |
|----------|------|--------------|
| Cursor | `cursor` | `~/.cursor/skills/agent-assistant/` |
| GitHub Copilot | `copilot` | `~/.copilot/skills/agent-assistant/` |
| Claude Code | `claude` | `~/.claude/skills/agent-assistant/` |
| Gemini/Antigravity | `gemini/antigravity` | `~/.gemini/antigravity/skills/agent-assistant/` |
| Codex | `codex` | `~/.codex/skills/agent-assistant/` |

**Path Variables**:
- `COMMANDS` = `~/.{TOOL}/skills/agent-assistant/commands/`
- `AGENTS` = `~/.{TOOL}/skills/agent-assistant/agents/`
- `SKILLS` = `~/.{TOOL}/skills/`
- `RULES` = `~/.{TOOL}/skills/agent-assistant/rules/`
- `REPORTS` = `./reports/{topic}/`

---

## Command Routing Table

The command system routes user input to appropriate workflow files based on the detected command and variant.

### Explicit Commands

| Input | Routing |
|-------|---------|
| `/cook` | `commands/cook.md` |
| `/cook:fast` | `commands/cook/fast.md` (direct load) |
| `/cook:hard` | `commands/cook.md` → `commands/cook/hard.md` |
| `/cook:team` | `commands/cook.md` → `commands/cook/team.md` |
| `/fix` | `commands/fix.md` |
| `/fix:fast` | `commands/fix/fast.md` |
| `/fix:hard` | `commands/fix.md` → `commands/fix/hard.md` |
| `/plan` | `commands/plan.md` |
| `/plan:hard` | `commands/plan.md` → `commands/plan/hard.md` |
| `/debug` | `commands/debug.md` |
| `/test` | `commands/test.md` |
| `/review` | `commands/review.md` |
| `/docs` | `commands/docs.md` |
| `/docs:core` | `commands/docs/core.md` (direct load) |
| `/docs:business` | `commands/docs/business.md` |
| `/docs:audit` | `commands/docs/audit.md` |
| `/design` | `commands/design.md` |
| `/deploy` | `commands/deploy.md` |
| `/deploy:check` | `commands/deploy/check.md` |
| `/deploy:preview` | `commands/deploy/preview.md` |
| `/deploy:production` | `commands/deploy/production.md` |
| `/deploy:rollback` | `commands/deploy/rollback.md` |
| `/report` | `commands/report.md` |
| `/report:fast` | `commands/report/fast.md` |
| `/report:hard` | `commands/report.md` → `commands/report/hard.md` |
| `/report:team` | `commands/report.md` → `commands/report/team.md` |
| `/wiki` | `commands/wiki.md` |
| `/wiki:fast` | `commands/wiki.md` → `commands/wiki/fast.md` |
| `/wiki:hard` | `commands/wiki.md` → `commands/wiki/hard.md` |
| `/wiki:team` | `commands/wiki.md` → `commands/wiki/team.md` |
| `/brainstorm` | `commands/brainstorm.md` → variant |
| `/ask` | `commands/ask.md` → variant |
| `/code` | `commands/code.md` → variant |

### Variant Syntax

Both syntax forms are equivalent:
- `/cook:fast` — colon separator
- `/cook/fast` — slash separator

### Team Variant Support

The `:team` variant is supported only where `commands/{cmd}/team.md` exists. Not all commands have team variants.

---

## Natural Language Detection

When users don't use explicit commands, the system detects intent from natural language:

| Pattern | Detected Command | Example |
|---------|------------------|---------|
| `implement`, `build`, `create` | `/cook` or `/code` | "implement OAuth login" |
| `fix`, `bug`, `error`, `broken` | `/fix` | "fix the authentication bug" |
| `plan`, `strategy`, `approach` | `/plan` | "plan the migration" |
| `brainstorm`, `ideas`, `explore` | `/brainstorm` | "brainstorm features for v2" |
| `question`, `how`, `what`, `why` | `/ask` | "how does caching work?" |
| `code`, `snippet`, `generate` | `/code` | "generate a REST client" |
| `investigate`, `research`, `look up` | `/ask` or `/report` | "research GraphQL options" |
| `design`, `ui`, `ux`, `mockup` | `/design` | "design the dashboard" |
| `document`, `docs`, `readme`, `spec` | `/docs` | "document the API" |
| `wiki`, `knowledge base` | `/wiki` | "generate docs from code" |

**Precedence**: Exact command match takes priority over natural language detection.

---

## TIERED EXECUTION

Command Routing uses a mandatory two-tier execution system for agent delegation. This ensures optimal context isolation and quality.

### Tier Comparison

| Aspect | TIER 1: Sub-agent | TIER 2: EMBODY |
|--------|-------------------|----------------|
| **Trigger** | `runSubagent` tool available | Tool missing/error |
| **Context** | Fresh, isolated | Shared with parent |
| **Priority** | PRIMARY (mandatory) | FALLBACK only |
| **Parallel Execution** | Yes | No (sequential) |
| **Quality** | Optimal | Risk of pollution |

### Tier 1: Sub-agent (Mandatory)

```yaml
1. Prepare handoff:
   include: requirements, task, acceptance criteria, constraints
   exclude: internal reasoning, failed attempts

2. Invoke: runSubagent(agent_name, context)

3. Verify: format matches, criteria met

4. On error: fallback to TIER 2, log reason
```

### Tier 2: EMBODY (Fallback Only)

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
  4. ANNOUNCE embodiment
  5. EXECUTE as agent
  6. EXIT embodiment, continue as orchestrator
```

### Enforcement Rules

```
❌ FORBIDDEN: Using TIER 2 when runSubagent available
❌ FORBIDDEN: Skipping TIER 1 because task is "simple"
✅ REQUIRED: Attempt TIER 1 first, log if falling back
```

**Anti-Lazy Fallback Detection**:
- Choosing TIER 2 without attempting TIER 1
- Justifying EMBODY with "task is simple"
- Mentioning "efficiency" when choosing EMBODY

---

## Command → Agent Mapping

Each command routes to appropriate agents based on task requirements.

### By Task Type

| Task | Primary Agent | Supporting Agents |
|------|---------------|-------------------|
| API, backend logic | `backend-engineer` | `reviewer` |
| UI, components | `frontend-engineer` | `reviewer` |
| Database schema | `database-architect` | `reviewer`, `security-engineer` |
| Security assessment | `security-engineer` | `reviewer` |
| Testing | `tester` | `security-engineer`, `performance-engineer` |
| Code review | `reviewer` | — |
| Debugging | `debugger` | `backend-engineer` |
| Planning | `planner` | `researcher` |
| Research | `researcher` | `scouter` |
| Codebase analysis | `scouter` | — |
| Documentation | `docs-manager` | `researcher` |
| Deployment | `devops-engineer` | `backend-engineer` |
| Reports | `reporter` | `scouter` |
| Project management | `project-manager` | `business-analyst` |
| Business analysis | `business-analyst` | `planner` |
| Design | `designer` | `frontend-engineer` |
| Brainstorming | `brainstormer` | — |
| Game development | `game-engineer` | `reviewer` |
| Mobile development | `mobile-engineer` | `reviewer` |
| Technical leadership | `tech-lead` | — |
|| Wiki generation | `wiki-architect`, `wiki-extractor`, `wiki-reviewer` | — |

### By Agent Category

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | `tech-lead`, `database-architect`, `planner`, `wiki-architect` | Coordinate, plan — never implement |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer` | Implementation |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger`, `wiki-reviewer` | QA |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer`, `wiki-extractor` | Investigation |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | Support |

---

## Execution Loop

All commands follow a consistent execution loop:

```
1. DETECT command (explicit or natural language)
2. LOAD workflow file
3. EXECUTE phases in order (one at a time, same reply)
4. VERIFY exit criteria per phase
5. DELIVER final result
```

**Phase Execution Rules**:
- Execute Phase 1 → Phase 2 → ... in order
- Do not load all agents upfront
- Complete Phase N before Phase N+1 starts
- Verify exit criteria before phase completion

---

## Variant Details

### fast (Default)

The fast variant provides minimal overhead for simple, low-risk tasks.

**Agent Count**: 2–3 agents
**Review**: Self-review only (the executing agent reviews their own work)
**Appropriate For**:
- Quick fixes and bug patches
- Simple feature additions
- Documentation corrections
- Straightforward refactoring

**Example**: `/fix "correct typo in error message"`

### hard

The hard variant brings in multiple specialists for complex work.

**Agent Count**: 5–8 agents
**Review**: Standard review (one iteration from a reviewer agent)
**Appropriate For**:
- Complex features with multiple components
- Cross-cutting changes affecting multiple systems
- Significant refactoring
- Work requiring multiple specializations

**Example**: `/cook:hard "implement real-time notifications"`

### team (Golden Triangle)

The team variant invokes the full [[Golden Triangle]] adversarial review cycle.

**Agent Count**: 3 roles (Tech Lead + Executor + Reviewer) plus relevant specialists
**Review**: Adversarial (debate loop, up to 3 rounds)
**Quality Gates**: Security (OWASP Top 10), Performance (<200ms), Testing (>80% coverage), Linting
**Appropriate For**:
- Architectural decisions
- Security-sensitive changes
- Critical bug fixes
- Any work where the cost of failure is high

**Example**: `/cook:team "redesign the authentication system"`

**Consensus Stamp**: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓`

---

## Variant Selection

### Explicit Selection

Users explicitly specify the variant in the command:

```
/cook          # Uses fast (default)
/cook:fast     # Explicitly fast
/cook:hard     # Explicitly hard
/cook:team     # Explicitly team
```

### Automatic Selection

The system can automatically select the appropriate variant based on task analysis:

| Signal | Likely Variant |
|--------|---------------|
| Single file, simple change | fast |
| Multiple files, moderate complexity | hard |
| Security-sensitive, architectural, cross-system | team |
| User explicitly requests thoroughness | team |

---

## Escalation Path

When complexity exceeds the current variant's capacity, escalation occurs:

```
fast → hard
  ↓
hard → team
  ↓
team → Tech Lead arbitration (if Golden Triangle debate exceeds 3 rounds)
```

Escalation is triggered by:
- Task complexity exceeding variant scope
- Quality gates failing at the current level
- Unresolved disagreements requiring Tech Lead decision

---

## Execution Flow by Variant

### fast Execution

```
1. Command Layer detects fast variant
2. Rule Layer loads protocols
3. Agent Layer selects 2–3 relevant agents
4. Agents execute task with self-review
5. Output delivered
```

### hard Execution

```
1. Command Layer detects hard variant
2. Rule Layer loads protocols
3. Agent Layer selects 5–8 relevant agents
4. Primary agent leads, specialists support
5. Reviewer agent reviews output
6. Output delivered
```

### team Execution

```
1. Command Layer detects team variant
2. Rule Layer loads team protocols
3. Team Layer initiates Golden Triangle:
   a. Tech Lead decomposes task
   b. Executor implements
   c. Reviewer adversarially reviews
   d. Debate loop (up to 3 rounds)
   e. Consensus or arbitration
4. Tech Lead synthesizes output
5. Output delivered with consensus stamp
```

---

## Orchestration Laws Reference

Command Routing operates under the [[Tiered Orchestration]] framework governed by 10 orchestration laws:

| Law | Name | Rule |
|-----|------|------|
| L1 | Single Point of Truth | Entry file loads CORE, rest on-demand |
| L2 | Requirement Integrity | 100% fidelity, zero loss, parse EVERY requirement |
| L3 | Explicit Loading | State what you loaded before using |
| L4 | Deep Embodiment | Follow agent's Directive + Protocol + Constraints |
| L5 | Sequential Execution | Phase N completes before N+1 starts |
| L6 | Language Compliance | Respond in user's lang; files/code in English |
| L7 | Recursive Delegation | Meta agents coordinate, NEVER implement |
| L8 | Stateful Handoff | Prior deliverables = IMMUTABLE constraints |
| L9 | Constraint Propagation | scouter→planner→implementer chain locked |
| L10 | Deliverable Integrity | Files created by agent define standard |

---

## Feature Specification Reference

This concept implements the following feature specifications from `documents/business/business-features/03-feature-specifications.md`:

### F1: Command Routing System

```yaml
Command Routing:
  input_types:
    - explicit: "/command" or "/command:variant"
    - natural_language: Full pattern detection matrix
  
  routing_rules:
    - Exact match takes precedence
    - Variant syntax: "/cmd:variant" or "/cmd/variant" equivalent
    - Unknown commands return error with suggestion
  
  supported_commands:
    - /cook, /cook:fast, /cook:hard, /cook:team
    - /fix, /code, /plan, /debug, /test, /review
    - /docs, /docs:core, /docs:business, /docs:audit
    - /design, /brainstorm, /ask
    - /report, /report:fast, /report:hard, /report:team
    - /deploy, /deploy:check, /deploy:preview, /deploy:production
    - /wiki, /wiki:fast, /wiki:hard, /wiki:team
```

### F2: Tiered Execution Engine

```yaml
Tiered Execution:
  tier_1:
    name: "Sub-agent"
    trigger: "runSubagent tool available"
    context: "Isolated (fresh)"
    priority: "PRIMARY"
  
  tier_2:
    name: "Embody"
    trigger: "runSubagent unavailable or failed"
    context: "Shared with parent"
    priority: "FALLBACK"
```

### Edge Cases

| Input | Expected Behavior |
|-------|------------------|
| `/cook:invalid` | Error with valid variants listed |
| `implement OAuth` | Routes to `/cook` |
| Empty input | Prompts for clarification |
| runSubagent available | TIER 1 used (not TIER 2) |
| runSubagent returns error | Retry once, then TIER 2 fallback |

---

## Related Pages

- [[Command System]] — All 14 commands with variant support
- [[Command Variant Matrix]] — Side-by-side variant comparison
- [[Agent System]] — Full agent profiles and capabilities
- [[Tiered Orchestration]] — Orchestration laws and execution framework
- [[Golden Triangle]] — The adversarial review pattern used by team variant
- [[Entity Relationships]] — How routing relates to other system entities
