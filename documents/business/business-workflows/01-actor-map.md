# Actor Map

> **Purpose**: Actor definitions, responsibilities, and interaction boundaries.
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-04-09

---

## Actor Overview

| Actor | Type | Description |
|-------|------|-------------|
| Developer | Human | Primary end-user who invokes commands and receives deliverables |
| Orchestrator | System (AI) | Coordination layer that routes commands, delegates to agents, enforces protocol |
| Specialist Agent | System (AI) | One of 21 agents embodied or sub-agented by the orchestrator to perform specific work |
| Contributor | Human | Open-source participant who extends the framework via pull requests |
| CI Pipeline | System | Automated validation (lint, simulate, test, audit) triggered by commits |
| Platform | System | Host AI coding tool (Cursor, Copilot, Claude, etc.) that loads the framework |

---

## Actor Details

### Developer (End User)

**Responsibilities**:
- Invoke commands (explicit `/command` or natural language)
- Provide task context (description, file references, constraints)
- Review and accept deliverables from agents
- Provide feedback or clarification when asked

**Boundaries**:
- Cannot directly invoke individual agents (must go through commands)
- Cannot modify agent definitions at runtime
- Cannot bypass quality gates or guardrails

**Touchpoints**: CLI install, command invocation, deliverable review, feedback loop

---

### Orchestrator

**Responsibilities**:
- Parse user input and route to correct command variant
- Load command workflow, RUNTIME.md, and supporting rules
- Delegate each phase to the designated agent (EMBODY or SUB-AGENT)
- Verify exit criteria before proceeding to next phase
- Synthesize final deliverable to user
- Notify user on errors (never stop silently)

**Boundaries**:
- Never implements directly (delegates all work)
- Cannot skip phases or change phase order
- Cannot ignore agent exit criteria
- Maximum embodiment depth: 1 (no recursive orchestrator)

**Touchpoints**: Command routing, phase execution, agent delegation, deliverable synthesis

---

### Specialist Agent (21 Types)

**Responsibilities**:
- Execute tasks within declared scope (files, tasks, restrictions)
- Follow agent-specific directive, protocol, and constraints
- Produce deliverables meeting exit criteria
- Handoff to other agents only via declared handoff paths

**Categories and Execution Mode**:
| Category | Agents | Default Mode |
|----------|--------|:------------:|
| Execution | backend-engineer, frontend-engineer, mobile-engineer, game-engineer | EMBODY |
| Meta | tech-lead, planner, project-manager | EMBODY |
| Investigation | debugger, scouter, performance-engineer | EMBODY |
| Validation | reviewer, tester | SUB-AGENT |
| Research | researcher, brainstormer | SUB-AGENT |
| Support | docs-manager, reporter, designer, business-analyst, database-architect, devops-engineer, security-engineer | EMBODY |

**Boundaries**:
- Cannot operate outside declared scope.files
- Cannot perform tasks not in scope.tasks
- Must respect scope.restrictions
- Guardrails applied per declaration

---

### Contributor

**Responsibilities**:
- Follow CONTRIBUTING.md workflow
- Write or modify agents, commands, skills, guardrails
- Validate changes via lint + simulate before PR
- Respond to review feedback

**Boundaries**:
- Changes gated by CI (lint-agents.js, simulate.js, tests)
- Community contributions subject to trust tier evaluation
- Must follow schema v1.0 for agent definitions

---

### CI Pipeline

**Responsibilities**:
- Run `lint-agents.js` (R001-R302)
- Run `simulate.js` (agent handoff validation)
- Run `trust:verify` (SHA-256 integrity)
- Run `wordcount` (RUNTIME.md budget)
- Run `lint:drift` (entry point consistency)
- Run `npm audit` (dependency security)

**Boundaries**:
- Blocks merge on any failure
- Cannot override or skip checks

## Evidence Sources

- [agents/*.md](../../../agents/) — Agent definitions with category and scope
- [rules/RUNTIME.md](../../../rules/RUNTIME.md) — Orchestrator laws and execution model
- [CONTRIBUTING.md](../../../CONTRIBUTING.md) — Contributor workflow
- [README.md](../../../README.md) — Actor descriptions
