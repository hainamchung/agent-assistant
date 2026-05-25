# Entities

> **File**: `.documents/knowledge-domain/01-entities.md`
> **Purpose**: Core entity definitions for Agent Assistant domain model

---

## Overview

Agent Assistant defines seven core entity types. Each entity has a specific structure, purpose, and relationships to other entities.

---

## Entity 1: Agent

### Definition

An Agent is a specialized AI agent that performs specific tasks based on its role and skill set.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (e.g., `backend-engineer`) |
| `name` | string | Yes | Human-readable name |
| `role` | string | Yes | Primary role category |
| `profile` | string | Yes | Behavior profile |
| `reportsTo` | string | No | Parent agent ID |
| `consults` | string[] | No | Related agents |
| `standard` | string | Yes | Execution standard |

### Example

```yaml
id: backend-engineer
name: Backend Engineer
role: implementation
profile: backend-development
reportsTo: tech-lead
consults:
  - database-architect
  - devops-engineer
standard: docs-as-code
```

### Agent Categories

| Category | Count | Agents |
|----------|-------|--------|
| Implementation | 4 | backend-engineer, frontend-engineer, mobile-engineer, game-engineer |
| Architecture | 1 | tech-lead |
| Quality | 6 | tester, reviewer, debugger, security-engineer, performance-engineer, wiki-reviewer |
| Planning | 3 | planner, brainstormer, business-analyst |
| Support | 10 | designer, devops-engineer, docs-manager, project-manager, reporter, researcher, scouter, wiki-architect, wiki-extractor, database-architect |

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| specializes | Team | Many-to-One |
| uses | Skill | Many-to-Many |
| consults | Agent | Many-to-Many |
| reportsTo | Agent | Many-to-One |

---

## Entity 2: Command

### Definition

A Command is a user-invokable action that triggers agent execution.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Command identifier (e.g., `/cook`) |
| `purpose` | string | Yes | What the command does |
| `variants` | enum[] | Yes | Available variants |
| `agents` | Agent[] | Yes | Default agents |

### Example

```yaml
id: /cook
purpose: Implementation of features and components
variants:
  - fast
  - hard
  - team
agents:
  - frontend-engineer
  - backend-engineer
```

### Command List

| Command | Purpose | Variants |
|---------|---------|----------|
| `/cook` | Implementation | fast, hard, team |
| `/code` | Code generation | fast, hard, team |
| `/fix` | Bug fixing | fast, hard, team |
| `/plan` | Planning | fast, hard, team |
| `/debug` | Debugging | fast, hard, team |
| `/test` | Testing | fast, hard, team |
| `/review` | Code review | fast, hard, team |
| `/docs` | Documentation | fast, hard, team |
| `/design` | Design | fast, hard, team |
| `/deploy` | Deployment | fast, hard, team |
| `/report` | Reporting | fast, hard, team |
| `/wiki` | Wiki generation | fast, hard, team |
| `/brainstorm` | Ideation | fast, hard, team |
| `/ask` | Questions | fast, hard, team |

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| routesTo | Agent | One-to-Many |
| follows | Rule | Many-to-Many |

---

## Entity 3: Rule

### Definition

A Rule defines orchestration protocols, constraints, and best practices.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Rule identifier |
| `type` | enum | Yes | Rule category |
| `content` | string | Yes | Rule definition |

### Rule Types

| Type | Purpose | Example |
|------|---------|---------|
| orchestration | Execution flow | `CORE.md` |
| phase | Task phases | `PHASES.md` |
| agent | Agent behavior | `AGENTS.md` |
| skill | Skill injection | `SKILLS.md` |
| team | Team coordination | `TEAMS.md` |
| error | Error handling | `ERRORS.md` |
| reference | Quick lookup | `REFERENCE.md` |

### Rule Files

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

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| appliesTo | Agent | Many-to-Many |
| appliesTo | Command | Many-to-Many |
| triggers | Agent | One-to-Many |

---

## Entity 4: Skill

### Definition

A Skill is a domain-specific knowledge unit that can be injected into agents.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Skill identifier |
| `name` | string | Yes | Human-readable name |
| `domain` | string | Yes | Skill domain |
| `tier` | enum | Yes | Skill tier |
| `tags` | string[] | No | Searchable tags |

### Skill Tiers

| Tier | Purpose | Examples |
|------|---------|----------|
| foundation | Core skills | JavaScript, git |
| professional | Industry standard | React, SQL |
| specialized | Domain expertise | Kubernetes, TensorFlow |
| expert | Advanced topics | Distributed systems, ML ops |

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| belongsTo | Matrix Skill | Many-to-One |
| usedBy | Agent | Many-to-Many |

---

## Entity 5: Matrix Skill

### Definition

A Matrix Skill classifies skills into tiers and organizes them for the HSOL system.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Matrix identifier |
| `tier` | enum | Yes | Foundation, professional, specialized, expert |
| `domain` | string | Yes | Domain category |
| `skills` | Skill[] | Yes | Skills in this matrix entry |

### Matrix Structure

```
matrix-skills/
├── foundation/     # ~200 skills
├── professional/   # ~400 skills
├── specialized/    # ~500 skills
└── expert/         # ~300 skills
```

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| contains | Skill | One-to-Many |
| injectedInto | Agent | Many-to-Many |

---

## Entity 6: Team

### Definition

A Team is a coordinated group of agents following the Golden Triangle pattern.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Team identifier |
| `name` | string | Yes | Human-readable name |
| `domain` | string | Yes | Primary domain |
| `techLead` | Agent | Yes | Tech Lead role |
| `executor` | Agent | Yes | Executor role |
| `reviewer` | Agent | Yes | Reviewer role |

### Golden Triangle Roles

| Role | Responsibility | Agent |
|------|----------------|-------|
| Tech Lead | Architecture, decisions | `tech-lead` |
| Executor | Implementation | Domain-specific |
| Reviewer | Quality assurance | `reviewer` |

### Team List

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

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| composedOf | Agent | Many-to-Many |
| specializes | Command | Many-to-Many |

---

## Entity 7: Platform Config

### Definition

A Platform Config defines platform-specific settings and paths.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Platform identifier |
| `name` | string | Yes | Human-readable name |
| `path` | string | Yes | Installation path |
| `instructions` | string | Yes | Instruction file name |

### Platform List

| Platform | Path | Instructions |
|----------|------|--------------|
| Cursor | `~/.{TOOL}/` | `CURSOR.md` |
| GitHub Copilot | `~/.github/copilot/` | `COPILOT.md` |
| Claude Code | `~/.claude/` | `CLAUDE.md` |
| Antigravity | `~/.antigravity/` | `GEMINI.md` |
| Codex | `~/.codex/` | `CODEX.md` |

### Path Placeholders

| Placeholder | Resolution |
|-------------|------------|
| `{{CURSOR_PATH}}` | Cursor installation path |
| `{{COPILOT_PATH}}` | Copilot installation path |
| `{{CLAUDE_PATH}}` | Claude Code installation path |
| `{{ANTIGRAVITY_PATH}}` | Antigravity installation path |
| `{{CODEX_PATH}}` | Codex installation path |

### Relationships

| Relationship | Target | Type |
|--------------|--------|------|
| configures | Agent | Many-to-Many |
| configures | Rule | Many-to-Many |

---

## Entity Relationships Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Command   │────▶│    Rule     │◀────│    Agent    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       │                   │                    │
       ▼                   ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Team     │◀────│   Skill     │────▶│ Matrix Skill│
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│Platform Config│
└─────────────┘
```

---

## Evidence Sources

- `agents/` — Agent entity files
- `commands/` — Command definitions
- `rules/` — Rule files
- `skills/` — Skill files
- `matrix-skills/` — Matrix skill organization
- `agents/teams/` — Team definitions
- `code-assistants/` — Platform configurations
