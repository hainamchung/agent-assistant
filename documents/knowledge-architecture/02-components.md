# Components

> **File**: `documents/knowledge-architecture/02-components.md`
> **Purpose**: Per-component breakdown of all major system parts

---

## Overview

Agent Assistant consists of seven major components:
1. Commands
2. Rules
3. Agents
4. Teams
5. Skills
6. CLI
7. Web

---

## Component 1: Commands

### Location
`commands/` folder

### Description
Commands are the primary interface for user interaction. Each command represents a development task category with three execution variants.

### Structure

```
commands/
├── cook.md          # Implementation command
├── cook/
│   ├── fast.md      # Fast variant
│   ├── hard.md      # Hard variant
│   └── team.md      # Team variant
├── fix.md
├── fix/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── plan.md
├── plan/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
└── ... (11 more commands)
```

### Command Types

| Command | Primary Use | Executor |
|---------|------------|----------|
| `/cook` | Implementation | frontend-engineer, backend-engineer |
| `/code` | Code generation | frontend-engineer, backend-engineer |
| `/fix` | Bug fixing | debugger |
| `/plan` | Planning | planner |
| `/debug` | Debugging | debugger |
| `/test` | Testing | tester |
| `/review` | Code review | reviewer |
| `/docs` | Documentation | docs-manager |
| `/design` | Design | designer |
| `/deploy` | Deployment | devops-engineer |
| `/report` | Reporting | reporter |
| `/wiki` | Wiki generation | wiki-architect |
| `/brainstorm` | Ideation | brainstormer |
| `/ask` | Questions | researcher |

### Variants

| Variant | Agent Count | Use Case |
|---------|------------|----------|
| fast | 2-3 | Quick tasks, simple features |
| hard | 5-8 | Complex features with quality gates |
| team | Golden Triangle | Critical tasks requiring review |

---

## Component 2: Rules

### Location
`rules/` folder

### Description
Rules define the orchestration protocols that govern how agents work together. They provide constraints, workflows, and best practices.

### Files

| File | Purpose | Key Content |
|------|---------|-------------|
| `CORE.md` | Core orchestration | Main principles |
| `PHASES.md` | Phase definitions | Task phases and transitions |
| `AGENTS.md` | Agent definitions | 21 agents with roles |
| `SKILLS.md` | Skill orchestration | HSOL configuration |
| `TEAMS.md` | Team definitions | Golden Triangle protocol |
| `ERRORS.md` | Error handling | Error codes and recovery |
| `REFERENCE.md` | Quick reference | Patterns and templates |
| `WIKI.md` | Wiki rules | Documentation standards |

### Rule Categories

| Category | Count | Examples |
|----------|-------|----------|
| Orchestration | 3 | CORE, PHASES, TEAMS |
| Execution | 3 | AGENTS, SKILLS, ERRORS |
| Reference | 2 | REFERENCE, WIKI |

---

## Component 3: Agents

### Location
`agents/` folder

### Description
Agents are the execution units that perform specialized tasks. Each agent has a defined role, skill set, and behavioral guidelines.

### Agent Categories

#### Implementation Agents (4)

| Agent | Role | Primary Skills |
|-------|------|----------------|
| `backend-engineer.md` | Server-side development | Node.js, Python, databases |
| `frontend-engineer.md` | Frontend development | React, CSS, accessibility |
| `mobile-engineer.md` | Mobile development | React Native, Swift, Kotlin |
| `game-engineer.md` | Game development | Unity, Three.js, WebGL |

#### Architecture Agents (1)

| Agent | Role | Primary Skills |
|-------|------|----------------|
| `tech-lead.md` | Technical leadership | System design, trade-offs |

#### Quality Agents (6)

| Agent | Role | Primary Skills |
|-------|------|----------------|
| `tester.md` | Test creation | Unit, integration, e2e |
| `reviewer.md` | Code review | Best practices, patterns |
| `debugger.md` | Bug investigation | Root cause analysis |
| `security-engineer.md` | Security audit | OWASP, vulnerabilities |
| `performance-engineer.md` | Optimization | Profiling, benchmarks |
| `wiki-reviewer.md` | Docs quality | Clarity, accuracy |

#### Planning Agents (3)

| Agent | Role | Primary Skills |
|-------|------|----------------|
| `planner.md` | Implementation blueprints | Breakdown, estimation |
| `brainstormer.md` | Ideas and alternatives | Creative thinking |
| `business-analyst.md` | Requirements analysis | User stories |

#### Support Agents (10)

| Agent | Role | Primary Skills |
|-------|------|----------------|
| `designer.md` | UI/UX design | Figma, components |
| `devops-engineer.md` | Infrastructure | CI/CD, containers |
| `docs-manager.md` | Documentation | Technical writing |
| `project-manager.md` | Project coordination | Agile, planning |
| `reporter.md` | Data analysis | Metrics, insights |
| `researcher.md` | Investigation | Research, synthesis |
| `scouter.md` | Code exploration | Pattern discovery |
| `wiki-architect.md` | Wiki structure | Knowledge organization |
| `wiki-extractor.md` | Code documentation | JSDoc, docstrings |
| `database-architect.md` | Data layer design | Schema, queries |

### Agent Structure

Each agent file contains:
1. **Identity** — Name, role, profile
2. **Skills** — Required and preferred skills
3. **Behavior** — Guidelines for execution
4. **Output Format** — Expected result structure

---

## Component 4: Teams

### Location
`agents/teams/` folder

### Description
Teams are coordinated groups of agents that work together on complex tasks. Each team follows the Golden Triangle pattern.

### Golden Triangle Pattern

```
Tech Lead ────► Executor
    ▲              │
    │              ▼
    └────────► Reviewer
              (adversarial)
```

### Team Files

| File | Primary Domain | Executor |
|------|----------------|----------|
| `backend-team/executor.md` | Backend | backend-engineer |
| `backend-team/reviewer.md` | Backend | reviewer |
| `backend-team/techlead.md` | Backend | tech-lead |
| `frontend-team/executor.md` | Frontend | frontend-engineer |
| `frontend-team/reviewer.md` | Frontend | reviewer |
| `frontend-team/techlead.md` | Frontend | tech-lead |
| ... (15 more teams) | ... | ... |

### Team Workflow

1. **Tech Lead** — Analyzes requirements, creates architecture
2. **Executor** — Implements according to spec
3. **Reviewer** — Adversarial review, finds issues
4. **Iteration** — Loop until quality gates pass

---

## Component 5: Skills

### Location
`skills/`, `matrix-skills/` folders

### Description
Skills provide domain-specific knowledge that agents use to perform tasks. The Hybrid Skill Orchestration Layer (HSOL) injects relevant skills based on context.

### Skill Tiers

| Tier | Count | Purpose | Examples |
|------|-------|---------|----------|
| foundation | ~200 | Core skills | JavaScript, git |
| professional | ~400 | Industry standard | React, SQL |
| specialized | ~500 | Domain expertise | Kubernetes, TensorFlow |
| expert | ~300 | Advanced topics | Distributed systems |

### Matrix Skills

Located in `matrix-skills/`, organized by domain and tier.

### HSOL (Hybrid Skill Orchestration Layer)

| Function | Description |
|----------|-------------|
| Context Detection | Analyze current task |
| Skill Matching | Find relevant skills |
| Injection | Add skills to agent context |
| Priority | Rank by relevance |

---

## Component 6: CLI

### Location
`cli/` folder

### Description
The CLI is a single JavaScript file that installs Agent Assistant to various AI coding platforms.

### File

| File | Lines | Purpose |
|------|-------|---------|
| `cli/install.js` | 1716 | Multi-platform installer |

### CLI Features

| Feature | Description |
|---------|-------------|
| Multi-platform | Installs to Cursor, Copilot, Claude, Antigravity, Codex |
| Progress tracking | Visual status updates |
| Path replacement | Automatic portability fixes |
| Reliability | Uses fsync for durability |

### CLI Commands

| Command | Action |
|---------|--------|
| `node cli/install.js` | Install to all platforms |
| `node cli/install.js --list` | List installations |
| `node cli/install.js --uninstall` | Remove installations |

---

## Component 7: Web

### Location
`web/` folder

### Description
The web component is a React documentation site that provides human-readable documentation for Agent Assistant.

### Technology Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 6 | Build tool |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| React Router 7 | Routing |
| Framer Motion 12 | Animations |
| ReactFlow 12 | Workflow visualization |

### Key Files

| File | Purpose |
|------|---------|
| `web/src/main.tsx` | Application entry |
| `web/src/pages/` | Page components |
| `web/src/components/` | Reusable components |

### Pages

| Page | Path | Description |
|------|------|-------------|
| Docs | `/docs` | Documentation viewer |
| Home | `/` | Landing page |
| Installation | `/installation` | Setup guide |
| Features | `/features/*` | Feature documentation |

---

## Evidence Sources

- `commands/` — 14 command files
- `rules/` — 8 rule files
- `agents/` — 21 agent files
- `agents/teams/` — 18 team folders
- `matrix-skills/` — Skill tier definitions
- `skills/` — 1400+ skill files
- `cli/install.js` — CLI implementation
- `web/` — React application
