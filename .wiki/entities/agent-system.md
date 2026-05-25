title: Agent System
type: entity
tags: [agent, specialist, execution, roles, tiered-execution, golden-triangle]
sources: ["web/src/data/agents.ts:1-309", "rules/AGENTS.md:1-200"]
confidence: high
created: 2026-05-20
updated: 2026-05-21
---

# Agent System

The Agent System consists of **21 specialist agents** organized across 5 categories (Implementation, Architecture, Quality, Planning, Support). Rather than one general-purpose AI agent, the system uses focused specialists with defined skill profiles. This specialization approach produces higher quality output because each agent is optimized for a specific domain rather than attempting to be competent at everything.

The system implements a **Tiered Execution** protocol that ensures every delegation request is fulfilled through either sub-agent invocation (preferred) or embodiment (fallback), with **Golden Triangle** team collaboration for maximum quality on complex tasks.

---

## Agent Categories

**Source**: `web/src/data/agents.ts:36-288` (category definitions and agent array)

| Category | Count | Purpose |
|----------|-------|---------|
| **Implementation** | 4 | Production-quality code |
| **Architecture** | 2 | System design and structure |
| **Quality** | 4 | Code quality assurance |
| **Planning** | 3 | Strategy and task planning |
| **Support** | 8 | Specialized capabilities |
| **Total** | **21** | |

### Implementation Agents (4)

**Source**: `web/src/data/agents.ts:48-83`

| Agent | Role | Capabilities |
|-------|------|-------------|
| `backend-engineer` | Principal Backend Architect | REST APIs, GraphQL, Microservices, Security |
| `frontend-engineer` | Principal Frontend Architect | React, TypeScript, Accessibility, Performance |
| `mobile-engineer` | Mobile Development Lead | React Native, Flutter, iOS, Android |
| `game-engineer` | Game Development Specialist | Unity, Unreal, WebGL, Physics |

### Architecture Agents (2)

**Source**: `web/src/data/agents.ts:85-103`

| Agent | Role | Capabilities |
|-------|------|-------------|
| `tech-lead` | Principal Architect | System Design, ADRs, Strategy, Scalability |
| `database-architect` | Data Architecture Lead | SQL, NoSQL, Optimization, Migrations |

### Quality Agents (4)

**Source**: `web/src/data/agents.ts:105-141`

| Agent | Role | Capabilities |
|-------|------|-------------|
| `tester` | QA Architect | Unit Tests, E2E, Integration, Coverage |
| `reviewer` | Code Quality Guardian | Code Review, Best Practices, Standards, Security |
| `debugger` | Root Cause Analyst | Root Cause, Debugging, Profiling, Logs |
| `security-engineer` | Application Security Lead | OWASP, Pentesting, Hardening, Compliance |

### Planning Agents (3)

**Source**: `web/src/data/agents.ts:143-170`

| Agent | Role | Capabilities |
|-------|------|-------------|
| `planner` | Implementation Strategist | Planning, Milestones, Estimates, Dependencies |
| `brainstormer` | Creative Problem Solver | Ideas, Alternatives, Trade-offs, Innovation |
| `business-analyst` | Requirements Engineer | Requirements, User Stories, Analysis, Documentation |

### Support Agents (7)

**Source**: `web/src/data/agents.ts:172-244`

| Agent | Role | Capabilities |
|-------|------|-------------|
| `designer` | UI/UX Architect | UI/UX, Design Systems, Prototypes, Accessibility |
| `devops-engineer` | Platform Engineer | CI/CD, Docker, Kubernetes, Monitoring |
| `docs-manager` | Documentation Lead | API Docs, Guides, README, OpenAPI |
| `performance-engineer` | Optimization Specialist | Profiling, Optimization, Benchmarks, Load Testing |
| `researcher` | Technical Researcher | Research, Analysis, Best Practices, Trends |
| `scouter` | Codebase Explorer | Exploration, Dependencies, Patterns, Discovery |
| `project-manager` | Delivery Coordinator | Timeline, Resources, Communication, Tracking |
| `reporter` | Documentation & Reporting Specialist | Reports, Summaries, Documentation, Templates |

---

## Tiered Execution

The system uses a two-tier execution model to ensure every delegation request is fulfilled.

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

### Context Model Comparison

| Aspect | TIER 1: Sub-agent | TIER 2: EMBODY |
|--------|-------------------|----------------|
| Priority | ⭐ MANDATORY | 🔄 Fallback |
| Context | Fresh, isolated | Shared with parent |
| Quality | ✅ Optimal | ⚠️ Risk of pollution |
| Parallel | Yes | No (sequential) |
| Availability | Platform-dependent | Always available |

### Completion Guarantee

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

### Anti-Lazy Fallback Detection

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

**Source**: `rules/AGENTS.md:7-98`, `rules/CORE.md:76-87`

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

**Source**: `rules/AGENTS.md:175-199`

---

## Context Isolation (Clean Handoffs)

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

**Source**: `rules/AGENTS.md:203-228`

---

## Recursive Delegation

```
IF agent.category == "meta" OR agent.handoffs.length > 0:
  → This is a MANAGER agent
  → MUST delegate to specialists
  → NEVER implement directly
```

Meta agents (`tech-lead`, `planner`, `wiki-architect`) coordinate other agents and do not implement directly.

**Source**: `rules/AGENTS.md:232-240`

---

## Task → Agent Mapping

| Task | Agent(s) |
|------|----------|
| Backend / API | `backend-engineer` |
| Frontend / UI | `frontend-engineer` |
| Database | `database-architect` |
| Mobile | `mobile-engineer` |
| Games | `game-engineer` |
| Security | `security-engineer` |
| Testing | `tester` |
| Code review | `reviewer` |
| Debugging | `debugger` |
| Planning | `planner` |
| Research | `researcher` |
| Brainstorming | `brainstormer` |
| Design | `designer` |
| Documentation | `docs-manager` |
| Deployment | `devops-engineer` |
| Reports | `reporter` |
| Project management | `project-manager` |
| Business analysis | `business-analyst` |
| Technical leadership | `tech-lead` |
| Wiki generation | `wiki-architect`, `wiki-extractor`, `wiki-reviewer` |
| Performance | `performance-engineer` |
| Codebase analysis | `scouter` |

**Source**: `web/src/data/agents.ts:46-245`

---

## Agent Relationships

Agents interact through defined relationships:

- **reportsTo**: Direct reporting chain (determines escalation path)
- **consults**: Consultation network (determines collaboration patterns)
- **Team membership**: Agents are assigned to teams (e.g., backend-team, frontend-team) based on their domain

---

## Golden Triangle (`:team` variant)

For maximum quality on complex tasks, the system supports **Golden Triangle** collaboration: exactly 3 agents per phase (Tech Lead + Executor + Reviewer) with adversarial debate.

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
| `wiki-team` | `wiki-architect` | `wiki-extractor` | `wiki-reviewer` | Wiki generation, entity extraction, documentation quality |

### Golden Triangle vs Single Agent

| When | Use |
|------|-----|
| Standard `:fast`, `:hard` variants | Single agent per phase |
| `:team` variant | Golden Triangle per phase |
| User explicitly requests team review/collaboration | `:team` variant |
| Maximum quality with adversarial debate is priority | `:team` variant |

### Team Communication Protocol

- **Shared Task List**: Published by Tech Lead at phase start, tracks task status
- **Mailbox**: `./.reports/{topic}/MAILBOX-{date}.md` — append-only log of all exchanges
- **Debate**: Max 3 rounds per task → Tech Lead arbitrates
- **Consensus**: `✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓` required to release output

**Source**: `rules/AGENTS.md:113-172`

---

## Agent Definition Schema

Each agent is defined as a Markdown file with YAML frontmatter:

```yaml
---
id: backend-engineer
name: Backend Engineer
role: execution
profile: Server-side specialist
reportsTo: tech-lead
consults:
  - frontend-engineer
  - database-architect
standard: backend-dev-guidelines
capabilities:
  - API design
  - Database integration
  - Server logic
skills:
  required:
    - nodejs
    - python
    - databases
  preferred:
    - docker
    - redis
---
```

**Source**: `.documents/knowledge-domain/01-entities.md:140-208`

---

## Related Pages

- [[Team System]] — 18 teams that organize agents for collaboration
- [[Skill System]] — HSOL and skill injection for agents
- [[Rule System]] — Rules governing agent behavior and selection
- [[Tiered Orchestration]] — Detailed execution tier protocols
- [[Command System]] — How commands select the appropriate agent
