# Actor Map

> **Section**: Business Workflows | **File**: 01-actor-map.md
> **Purpose**: 16 actors with responsibilities, boundaries, and communication patterns

---

## Actor Overview

Actors are entities that interact with the Agent Assistant system. Each actor has defined responsibilities, boundaries, touchpoints, and communication patterns.

---

## Primary Actors

### A1: End User

| Attribute | Value |
|-----------|-------|
| **ID** | A1 |
| **Type** | Primary |
| **Responsibilities** | Issue commands, provide requirements, review outputs, accept/reject suggestions |
| **Boundaries** | Cannot directly modify agent behavior, cannot bypass workflow phases |
| **Touchpoints** | Command input, deliverable review, error notifications |
| **Communication** | Natural language commands, confirmation responses |

### A2: Orchestrator

| Attribute | Value |
|-----------|-------|
| **ID** | A2 |
| **Type** | System |
| **Responsibilities** | Route commands, delegate to agents, coordinate phases, enforce rules |
| **Boundaries** | Cannot write code directly, must delegate all implementation |
| **Touchpoints** | Command routing, agent delegation, phase coordination |
| **Communication** | Agent handoffs, phase transitions |

---

## Meta Actors

### A3: Tech Lead

| Attribute | Value |
|-----------|-------|
| **ID** | A3 |
| **Type** | Meta |
| **Responsibilities** | Decompose tasks, coordinate teams, arbitrate disputes, synthesize output |
| **Boundaries** | Does not implement directly; only coordinates |
| **Touchpoints** | Task assignments, team communication, consensus decisions |
| **Communication** | TASK_ASSIGNMENT, DECISION messages |

### A4: Planner

| Attribute | Value |
|-----------|-------|
| **ID** | A4 |
| **Type** | Meta |
| **Responsibilities** | Create implementation plans, break down features, estimate effort |
| **Boundaries** | Does not implement; produces plans only |
| **Touchpoints** | Requirements intake, plan output |
| **Communication** | PLAN deliverables |

---

## Execution Actors

### A5: Backend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A5 |
| **Type** | Execution |
| **Responsibilities** | Implement server-side logic, APIs, database operations |
| **Boundaries** | Implements backend only; frontend out of scope |
| **Touchpoints** | Requirements, design specs, deliverable output |
| **Communication** | CODE deliverables, DEFENSE statements |

### A6: Frontend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A6 |
| **Type** | Execution |
| **Responsibilities** | Implement UI components, client-side logic, styling |
| **Boundaries** | Implements frontend only; backend out of scope |
| **Touchpoints** | Design specs, requirements, deliverable output |
| **Communication** | CODE deliverables, DEFENSE statements |

### A7: Mobile Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A7 |
| **Type** | Execution |
| **Responsibilities** | Implement iOS/Android features, platform-specific code |
| **Boundaries** | Mobile platforms only |
| **Touchpoints** | Platform requirements, deliverable output |
| **Communication** | CODE deliverables, DEFENSE statements |

### A8: Game Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A8 |
| **Type** | Execution |
| **Responsibilities** | Implement game logic, physics, graphics, multiplayer |
| **Boundaries** | Game development only |
| **Touchpoints** | Game design specs, deliverable output |
| **Communication** | CODE deliverables, DEFENSE statements |

---

## Validation Actors

### A9: Tester

| Attribute | Value |
|-----------|-------|
| **ID** | A9 |
| **Type** | Validation |
| **Responsibilities** | Generate tests, ensure coverage, validate correctness |
| **Boundaries** | Creates tests; does not fix implementation |
| **Touchpoints** | Code input, test output, coverage reports |
| **Communication** | TEST deliverables, FAIL/PASS reports |

### A10: Reviewer

| Attribute | Value |
|-----------|-------|
| **ID** | A10 |
| **Type** | Validation |
| **Responsibilities** | Code review, security audit, standards compliance |
| **Boundaries** | Reviews and reports; does not modify code |
| **Touchpoints** | Code input, review output |
| **Communication** | REVIEW deliverables with PASS/FAIL |

### A11: Debugger

| Attribute | Value |
|-----------|-------|
| **ID** | A11 |
| **Type** | Validation |
| **Responsibilities** | Investigate bugs, trace root causes, propose solutions |
| **Boundaries** | Investigates; does not fix |
| **Touchpoints** | Error reports, code investigation |
| **Communication** | DEBUG reports, root cause analysis |

### A12: Security Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A12 |
| **Type** | Validation |
| **Responsibilities** | Security audits, vulnerability assessment, hardening |
| **Boundaries** | Assesses; does not implement fixes |
| **Touchpoints** | Code input, security reports |
| **Communication** | SECURITY reports, vulnerability findings |

---

## Research Actors

### A13: Researcher

| Attribute | Value |
|-----------|-------|
| **ID** | A13 |
| **Type** | Research |
| **Responsibilities** | Investigate technologies, analyze best practices, gather evidence |
| **Boundaries** | Researches and reports; does not implement |
| **Touchpoints** | Research questions, findings output |
| **Communication** | RESEARCH deliverables |

### A14: Scouter

| Attribute | Value |
|-----------|-------|
| **ID** | A14 |
| **Type** | Research |
| **Responsibilities** | Explore codebase, map dependencies, discover patterns |
| **Boundaries** | Explores and reports; does not modify |
| **Touchpoints** | Codebase analysis, pattern reports |
| **Communication** | SCOUT reports, dependency maps |

### A15: Designer

| Attribute | Value |
|-----------|-------|
| **ID** | A15 |
| **Type** | Research |
| **Responsibilities** | UI/UX design, design system creation, accessibility review |
| **Boundaries** | Designs; does not implement |
| **Touchpoints** | Requirements, design specs output |
| **Communication** | DESIGN deliverables |

---

## Support Actors

### A16: Docs Manager

| Attribute | Value |
|-----------|-------|
| **ID** | A16 |
| **Type** | Support |
| **Responsibilities** | Technical writing, documentation architecture, API docs |
| **Boundaries** | Writes documentation; does not write code |
| **Touchpoints** | Code input, documentation output |
| **Communication** | DOC deliverables |

---

## Actor Communication Matrix

| Actor | Initiates With | Receives From | Via |
|-------|---------------|---------------|-----|
| A1: End User | A2: Orchestrator | A2: Orchestrator | User Interface |
| A2: Orchestrator | A3-A16 | A1, A3-A16 | Commands, Handoffs |
| A3: Tech Lead | A5-A15 | A2, A5-A15 | Mailbox, Task List |
| A4: Planner | A5-A8 | A2, A13-A15 | PLAN deliverables |
| A5-A8: Engineers | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| A9-A12: Validators | A3 | A2, A5-A8 | REVIEW, TEST, DEBUG |
| A13-A15: Researchers | A4 | A2, A4 | RESEARCH, SCOUT, DESIGN |
| A16: Docs Manager | A2 | A2, A5-A8 | DOC deliverables |

---

## Actor Boundaries Enforcement

| Boundary | Enforcement Rule |
|----------|-----------------|
| Meta agents delegate | L7: Meta agents coordinate, NEVER implement |
| Validators report only | Cannot write code; only review/fix suggestions |
| Engineers implement only | Cannot change requirements; must follow specs |
| Orchestrator delegates | L1: Single Point of Truth; Orchestrator routes only |

---

## Evidence Sources

- `rules/CORE.md` — Orchestrator role, Orchestration Laws
- `rules/AGENTS.md` — Agent categories, task mapping
- `rules/TEAMS.md` — Tech Lead role, Golden Triangle
- `rules/PHASES.md` — Phase roles and outputs
- `web/src/data/agents.ts` — Agent definitions
