---
title: Entity Relationships
type: concept
tags: [entities, relationships, architecture, domain, events]
created: 2026-05-20
updated: 2026-05-20
---

# Entity Relationships

Entity Relationships map how the 7 core entity types in Agent Assistant interact with each other. Understanding these relationships is essential for understanding how the system hangs together — why commands route to certain agents, why agents belong to teams, why skills are organized in tiers, and how events flow through the system during execution.

This page provides a comprehensive view of the domain model, including entity definitions, relationship types, event schemas, and discovery paths.

---

## Core Entity Types

The Agent Assistant system is built on 7 core entity types that work together to deliver intelligent task execution:

| # | Entity Type | Count | Description |
|---|------------|-------|-------------|
| 1 | [[Command System]] | 14 | User-facing commands with variants |
| 2 | [[Rule System]] | 8 | Orchestration protocols |
| 3 | [[Agent System]] | 20 | Specialist execution agents |
| 4 | [[Team System]] | 18 | Golden Triangle collaboration units |
| 5 | [[Skill System]] | 1400+ | Domain knowledge entries |
| 6 | Matrix Skill | 4 tiers | HSOL-optimized skill organization |
| 7 | Platform Config | 5 | Platform-specific configurations |

**Sources**:
- `.documents/knowledge-domain/01-entities.md:1-100` — Entity definitions and counts
- `.documents/business/business-glossary/03-domain-entities-and-events.md:1-174` — Domain entity model

---

## Relationship Types

### routesTo

Commands route to agents for execution.

```
Command → routesTo → Agent
```

Example: `/cook` routes to `frontend-engineer` and `backend-engineer`.

### follows

Agents follow rules for orchestration.

```
Agent → follows → Rule
```

Example: `backend-engineer` follows CORE rules for orchestration protocols.

### appliesTo

Rules apply to agent coordination.

```
Rule → appliesTo → Agent
```

Example: TEAMS rule applies to agents when they collaborate in teams.

### composedOf

Teams are composed of agents in specific roles.

```
Team → composedOf → Agent (Tech Lead, Executor, Reviewer)
```

Example: `backend-team` is composed of `tech-lead`, `backend-engineer`, and `reviewer`.

### uses

Agents use skills for domain knowledge.

```
Agent → uses → Skill
```

Example: `backend-engineer` uses `nodejs`, `python`, `databases` skills.

### belongsTo

Skills belong to skill tiers in the matrix.

```
Skill → belongsTo → Matrix Skill (tier)
```

Example: `react-hooks` belongs to the `specialized` tier.

### routesThrough

Commands route through the Rule Layer before reaching agents.

```
Command → routesThrough → Rule → routesTo → Agent
```

### triggers

Rules can trigger agents for specific actions.

```
Rule → triggers → Agent
```

### produces

Agents and teams produce deliverables and events.

```
Agent → produces → Event
Team → produces → team_consensus
```

---

## Relationship Diagram

```
┌──────────────┐     routesTo      ┌──────────────┐
│   Command    │──────────────────▶│    Agent     │
│   (14)       │                    │   (20)       │
└──────────────┘                    └──────────────┘
       │                                  │
       │ routesThrough                     │ follows
       ▼                                  ▼
┌──────────────┐                    ┌──────────────┐
│     Rule     │◀─────────────────│    Agent     │
│   (8)       │  appliesTo        │   (20)       │
└──────────────┘                    └──────────────┘
       │                                  │
       │ governs                           │ uses
       ▼                                  ▼
┌──────────────┐                    ┌──────────────┐
│    Team      │◀──────────────────│    Skill     │
│   (18)      │   composedOf       │  (1400+)     │
└──────────────┘                    └──────────────┘
       │                                  │
       │ produces                         │ belongsTo
       ▼                                  ▼
┌──────────────┐                    ┌──────────────┐
│    Event     │                    │Matrix Skill  │
│   (5 types)  │                    │  (4 tiers)   │
└──────────────┘                    └──────────────┘
```

---

## Domain Entity Definitions

This section provides detailed property definitions for each of the 7 core entity types, mapping attributes to their types, required status, and descriptions.

### E1: Agent Entity

**Definition**: The core entity representing a specialized AI role that performs specific tasks based on its role and skill set.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (e.g., `backend-engineer`) |
| `name` | string | Yes | Human-readable name (e.g., "Backend Engineer") |
| `role` | string | Yes | Primary role category |
| `profile` | string | Yes | HSOL profile (e.g., `backend:execution`) |
| `reportsTo` | string | No | Parent agent ID |
| `consults` | string[] | No | Related agents for consultation |
| `standard` | string | Yes | Execution standard |
| `capabilities` | string[] | Yes | List of capabilities |
| `category` | enum | Yes | meta, execution, validation, research, support |

**Agent Categories**:

| Category | Count | Agents |
|----------|-------|--------|
| Implementation | 4 | backend-engineer, frontend-engineer, mobile-engineer, game-engineer |
| Architecture | 2 | tech-lead, database-architect |
| Quality | 6 | tester, reviewer, debugger, security-engineer, performance-engineer, wiki-reviewer |
| Planning | 3 | planner, brainstormer, business-analyst |
| Support | 9 | designer, devops-engineer, docs-manager, project-manager, reporter, researcher, scouter, wiki-architect, wiki-extractor |

**Relationships**:
- Belongs to one Category
- Specializes in Team (Many-to-One)
- Uses Skills (Many-to-Many)
- Consults with other Agents (Many-to-Many)
- Reports to another Agent (Many-to-One)

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:10-31`

---

### E2: Command Entity

**Definition**: The trigger that initiates a workflow, defined as a user-invokable action that triggers agent execution.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Command identifier (e.g., `/cook`) |
| `name` | string | Yes | Command name (e.g., "/cook") |
| `aliases` | string[] | No | Alternative invocations |
| `purpose` | string | Yes | What the command does |
| `variants` | enum[] | Yes | Available variants |
| `phases` | Phase[] | No | Workflow phases |
| `category` | enum | Yes | build, quality, planning, support |
| `agents` | Agent[] | Yes | Default agents |

**Command List**:

| Command | Purpose | Variants | Category |
|---------|---------|----------|----------|
| `/cook` | Implementation of features and components | fast, hard, team | build |
| `/code` | Code generation | fast, hard, team | build |
| `/fix` | Bug fixing | fast, hard, team | quality |
| `/plan` | Planning | fast, hard, team | planning |
| `/debug` | Debugging | fast, hard, team | quality |
| `/test` | Testing | fast, hard, team | quality |
| `/review` | Code review | fast, hard, team | quality |
| `/docs` | Documentation | fast, hard, team | support |
| `/design` | Design | fast, hard, team | support |
| `/deploy` | Deployment | fast, hard, team | support |
| `/report` | Reporting | fast, hard, team | support |
| `/wiki` | Wiki generation | fast, hard, team | support |
| `/brainstorm` | Ideation | fast, hard, team | planning |
| `/ask` | Questions | fast, hard, team | support |

**Relationships**:
- Routes to Agent (One-to-Many)
- Follows Rules (Many-to-Many)
- Triggers Phase completion events

**Source**: `.documents/knowledge-domain/01-entities.md:67-121`

---

### E3: Rule Entity

**Definition**: A behavioral constraint governing agent or system behavior, defining orchestration protocols, constraints, and best practices.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Rule identifier |
| `name` | string | Yes | Rule name |
| `type` | enum | Yes | Rule category |
| `content` | string | Yes | Rule definition |
| `condition` | string | No | When rule applies |
| `action` | string | No | What to do |
| `priority` | enum | No | critical, high, medium, low |

**Rule Types**:

| Type | Purpose | Example |
|------|---------|---------|
| orchestration | Execution flow | `CORE.md` |
| phase | Task phases | `PHASES.md` |
| agent | Agent behavior | `AGENTS.md` |
| skill | Skill injection | `SKILLS.md` |
| team | Team coordination | `TEAMS.md` |
| error | Error handling | `ERRORS.md` |
| reference | Quick lookup | `REFERENCE.md` |

**Rule Files**:

| File | Type | Purpose |
|------|------|---------|
| `rules/CORE.md` | orchestration | Core principles |
| `rules/PHASES.md` | phase | Phase definitions |
| `rules/AGENTS.md` | agent | Agent definitions |
| `rules/SKILLS.md` | skill | Skill orchestration |
| `rules/TEAMS.md` | team | Team protocols |
| `rules/ERRORS.md` | error | Error handling |
| `rules/REFERENCE.md` | reference | Quick reference |
| `rules/WIKI.md` | reference | Wiki standards |

**Relationships**:
- Applies to Agent (Many-to-Many)
- Applies to Command (Many-to-Many)
- Triggers Agent actions (One-to-Many)

**Source**: `.documents/knowledge-domain/01-entities.md:124-170`

---

### E4: Skill Entity

**Definition**: A domain-specific knowledge unit that can be injected into agents, representing specialized domain knowledge.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Skill identifier (e.g., `fastapi-expert`) |
| `name` | string | Yes | Human-readable name |
| `domain` | string | Yes | Domain category |
| `priority` | number | No | 1-10 priority score |
| `fitness` | number | No | Calculated fitness (0-1) |
| `trust` | enum | Yes | new, evaluating, validated, promoted |
| `path` | string | Yes | Path to skill file |
| `source` | enum | Yes | matrix, dynamic |
| `tier` | enum | Yes | Skill tier |

**Skill Tiers**:

| Tier | Purpose | Count | Examples |
|------|---------|-------|----------|
| foundation | Core skills | ~200 | JavaScript, git, HTML |
| professional | Industry standard | ~400 | React, SQL, Node.js |
| specialized | Domain expertise | ~500 | Kubernetes, TensorFlow |
| expert | Advanced topics | ~300 | Distributed systems, ML ops |

**Relationships**:
- Belongs to Matrix Skill (Many-to-One)
- Used by Agent (Many-to-Many)

**Source**: `.documents/knowledge-domain/01-entities.md:173-204`

---

### E5: Matrix Skill Entity

**Definition**: A pre-curated skill in the HSOL matrix with trust level 1.0, organized for optimal skill injection.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Matrix identifier |
| `tier` | enum | Yes | Foundation, professional, specialized, expert |
| `domain` | string | Yes | Domain category |
| `trust` | number | Yes | Always 1.0 for matrix skills |
| `source` | string | Yes | Always "matrix" |
| `freshness` | number | No | Last verification timestamp |
| `skills` | Skill[] | Yes | Skills in this matrix entry |

**Matrix Structure**:

```
matrix-skills/
├── foundation/     # ~200 skills
├── professional/   # ~400 skills
├── specialized/    # ~500 skills
└── expert/         # ~300 skills
```

**Relationships**:
- Contains Skill (One-to-Many)
- Injected into Agent (Many-to-Many)

**Source**: `.documents/knowledge-domain/01-entities.md:207-238`

---

### E6: Team Entity

**Definition**: A coordinated group of agents following the Golden Triangle pattern for collaborative work.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Team identifier (e.g., `backend-team`) |
| `name` | string | Yes | Human-readable name |
| `domain` | string | Yes | Primary domain |
| `techLead` | Agent | Yes | Tech Lead role |
| `executor` | Agent | Yes | Executor role |
| `reviewer` | Agent | Yes | Reviewer role |
| `mailbox` | string | No | Mailbox file path |
| `status` | enum | No | active, complete, arbitrated |

**Golden Triangle Roles**:

| Role | Responsibility | Agent |
|------|----------------|-------|
| Tech Lead | Architecture, decisions | `tech-lead` |
| Executor | Implementation | Domain-specific |
| Reviewer | Quality assurance | `reviewer` |

**Team List**:

| Team ID | Domain | Executor |
|---------|--------|----------|
| `backend-team` | Backend | backend-engineer |
| `frontend-team` | Frontend | frontend-engineer |
| `fullstack-team` | Full-stack | frontend + backend |
| `database-team` | Database | database-architect |
| `debug-team` | Debugging | debugger |
| `design-team` | Design | designer |
| `devops-team` | DevOps | devops-engineer |
| `docs-team` | Documentation | docs-manager |
| `game-team` | Games | game-engineer |
| `mobile-team` | Mobile | mobile-engineer |
| `performance-team` | Performance | performance-engineer |
| `planning-team` | Planning | planner |
| `project-team` | Project | project-manager |
| `qa-team` | Quality | tester |
| `report-team` | Reporting | reporter |
| `research-team` | Research | researcher |
| `security-team` | Security | security-engineer |
| `wiki-team` | Wiki | wiki-architect |

**Relationships**:
- Composed of Agent (Many-to-Many)
- Specializes in Command (Many-to-Many)
- Produces team_consensus events

**Source**: `.documents/knowledge-domain/01-entities.md:241-295`

---

### E7: Platform Config Entity

**Definition**: Platform-specific installation and configuration for each supported IDE platform.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `platform` | enum | Yes | cursor, claude, copilot, antigravity, codex, kiro, qwen |
| `installPath` | string | Yes | Installation directory |
| `configPath` | string | Yes | Configuration directory |
| `commandsPath` | string | Yes | Commands directory |
| `agentsPath` | string | Yes | Agents directory |
| `skillsPath` | string | Yes | Skills directory |
| `rulesPath` | string | Yes | Rules directory |
| `version` | string | No | Installed version |

**Platform List**:

| Platform | Path | Instructions |
|----------|------|--------------|
| Cursor | `~/.cursor/` | `CURSOR.md` |
| GitHub Copilot | `~/.copilot/` | `COPILOT.md` |
| Claude Code | `~/.claude/` | `CLAUDE.md` |
| Antigravity | `~/.antigravity/` + `~/.gemini/` | `GEMINI.md` |
| Codex | `~/.codex/` | `CODEX.md` |
| Kiro | `~/.kiro/` | `KIRO.md` |
| Qwen | `~/.qwen/` | `QWEN.md` |

**Path Placeholders**:

| Placeholder | Resolution |
|-------------|------------|
| `{{CURSOR_PATH}}` | Cursor installation path |
| `{{COPILOT_PATH}}` | Copilot installation path |
| `{{CLAUDE_PATH}}` | Claude Code installation path |
| `{{ANTIGRAVITY_PATH}}` | Antigravity installation path |
| `{{CODEX_PATH}}` | Codex installation path |
| `{{KIRO_PATH}}` | Kiro installation path |
| `{{QWEN_PATH}}` | Qwen installation path |

**Relationships**:
- Configures Agent (Many-to-Many)
- Configures Rule (Many-to-Many)

**Source**: `.documents/knowledge-domain/01-entities.md:298-339`

---

## Event Types

The Agent Assistant system emits 5 distinct event types during execution. These events track the flow of work through the system and enable observability, debugging, and auditing.

### EV1: agent_dispatch

**Definition**: Event fired when Orchestrator delegates work to an agent.

**Payload**:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | "agent_dispatch" |
| `timestamp` | ISO8601 | When dispatched |
| `orchestrator` | string | Orchestrator session ID |
| `targetAgent` | string | Agent ID dispatched to |
| `tier` | enum | TIER_1, TIER_2 |
| `task` | string | Task description |
| `requirements` | string[] | Applicable requirements |
| `deliverableFormat` | enum | single, chunked |

**Flow**: Orchestrator → Agent

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:178-196`

---

### EV2: skill_injection

**Definition**: Event fired when skills are loaded into agent context via the HSOL system.

**Payload**:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | "skill_injection" |
| `timestamp` | ISO8601 | When injected |
| `agent` | string | Agent ID receiving skills |
| `skills` | string[] | Skill IDs injected |
| `source` | enum | matrix, dynamic |
| `fitness` | number | Average fitness score |
| `count` | number | Number of skills injected |

**Flow**: HSOL → Agent

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:200-217`

---

### EV3: phase_complete

**Definition**: Event fired when a phase finishes execution, signaling transition to the next phase.

**Payload**:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | "phase_complete" |
| `timestamp` | ISO8601 | When completed |
| `workflow` | string | Workflow name |
| `phase` | number | Phase number (1-indexed) |
| `phaseName` | string | Phase name |
| `status` | enum | success, partial, failed |
| `exitCriteria` | CriteriaResult[] | Exit criteria results |
| `duration` | number | Phase duration in ms |
| `deliverable` | string | Deliverable path if any |

**Flow**: Phase → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:221-240`

---

### EV4: command_invoke

**Definition**: Event fired when a user invokes a command, initiating the routing process.

**Payload**:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | "command_invoke" |
| `timestamp` | ISO8601 | When invoked |
| `userId` | string | User identifier |
| `command` | string | Command name |
| `variant` | string | Variant if specified |
| `input` | string | User input |
| `platform` | enum | Platform used |
| `routing` | enum | explicit, natural_language |

**Flow**: User → Router → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:244-262`

---

### EV5: team_consensus

**Definition**: Event fired when Golden Triangle reaches consensus, certifying the deliverable quality.

**Payload**:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | "team_consensus" |
| `timestamp` | ISO8601 | When consensus reached |
| `team` | string | Team ID |
| `round` | number | Debate round (1-3) |
| `techLeadSign` | boolean | Tech Lead sign-off |
| `executorSign` | boolean | Executor sign-off |
| `reviewerSign` | boolean | Reviewer sign-off |
| `stamp` | string | Full consensus stamp |
| `deliverable` | string | Approved deliverable path |

**Flow**: Tech Lead → Orchestrator

**Source**: `.documents/business/business-glossary/03-domain-entities-and-events.md:266-285`

---

## Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CORE ENTITIES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Command ──────────────┬───────────────────────────────────    │
│       │               │ routes to                            │
│       │               ▼                                       │
│       │         Orchestrator                                    │
│       │               │                                       │
│       │               ├──► Agent ─────────────────────────►   │
│       │               │      │                                │
│       │               │      ├──► Skill (via HSOL)            │
│       │               │      │                                │
│       │               │      └──► Deliverable                 │
│       │               │                                       │
│       │               ├──► Phase                               │
│       │               │      │                                │
│       │               │      └──► phase_complete (event)      │
│       │               │                                       │
│       │               └──► Team ───────────────────────────►   │
│       │                      │                                │
│       │                      ├──► agent_dispatch (event)       │
│       │                      └──► team_consensus (event)      │
│       │                                                       │
│       └─────────────────────────────────────────────────────   │
│                                                                  │
│  Platform Config ──────┐                                        │
│       │               │ configures                            │
│       │               ▼                                        │
│       └─────────► Rules                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Relationships

### Commands to Agents

Each command has default agents assigned:

| Command | Primary Agent(s) | Category |
|---------|-----------------|----------|
| `/cook` | frontend-engineer, backend-engineer | Implementation |
| `/fix` | debugger, reviewer | Quality |
| `/plan` | planner, brainstormer | Planning |
| `/test` | tester | Quality |
| `/review` | reviewer | Quality |
| `/wiki` | wiki-architect, wiki-extractor, wiki-reviewer | Support |
| `/deploy` | devops-engineer | Support |
| `/design` | designer | Support |
| `/debug` | debugger | Quality |
| `/report` | reporter | Support |
| `/docs` | docs-manager | Support |
| `/brainstorm` | brainstormer | Planning |

### Agents to Teams

Every agent belongs to at least one team:

| Agent Category | Teams |
|---------------|-------|
| Implementation | backend-team, frontend-team, fullstack-team, database-team, mobile-team, game-team |
| Architecture | All teams (tech-lead is universal) |
| Quality | qa-team, debug-team, security-team, performance-team |
| Planning | planning-team, project-team |
| Support | devops-team, docs-team, report-team, research-team, wiki-team |

### Agents to Skills

Agents have required and preferred skills:

| Agent | Required Skills | Preferred Skills |
|-------|----------------|-----------------|
| backend-engineer | nodejs, python, databases | docker, redis |
| frontend-engineer | react, css, typescript | accessibility, testing |
| security-engineer | security-audit, owasp, vulnerability-assessment | penetration-testing |
| performance-engineer | profiling, benchmarking, optimization | load-testing |
| wiki-extractor | llm-wiki, docs-architect | wiki-architect |

---

## Discovery Paths

Understanding how to discover entities through relationships:

**Finding agents for a task**:
1. Identify the command
2. Look up the command's default agents
3. Check if agents have additional required skills
4. Verify team membership for collaboration needs

**Finding teams for a domain**:
1. Identify the domain (backend, frontend, database, etc.)
2. Find the matching team (backend-team, frontend-team, etc.)
3. Identify the team members (Tech Lead, Executor, Reviewer)

**Finding skills for an agent**:
1. Identify the agent
2. Look up required and preferred skills
3. Map skills to the HSOL tier system
4. Check skill fitness and trust scores

**Tracking event flow**:
1. Start with command_invoke event
2. Follow through agent_dispatch events
3. Track skill_injection for context
4. Monitor phase_complete for progress
5. Watch for team_consensus as completion signal

---

## Related Pages

- [[Agent System]] — 21 specialist agents with roles and capabilities
- [[Command System]] — 14 commands and their routing rules
- [[Team System]] — 18 Golden Triangle teams
- [[Skill System]] — 1400+ skills and HSOL tier organization
- [[Rule System]] — 8 orchestration rules and protocols
- [[Terminology]] — [[Command System|Command]] and [[Agent System|Agent]] naming conventions

---

## Evidence Sources

- `.documents/knowledge-domain/01-entities.md` — Core entity definitions with properties
- `.documents/business/business-glossary/03-domain-entities-and-events.md` — Domain entity model with event schemas
- `rules/CORE.md` — Command routing, Orchestrator
- `rules/AGENTS.md` — Agent entity, dispatch
- `rules/TEAMS.md` — Team entity, consensus
- `rules/PHASES.md` — Phase entity, completion
- `rules/SKILLS.md` — Skill entity, injection
- `commands/wiki.md` — Wiki command routing and team composition
