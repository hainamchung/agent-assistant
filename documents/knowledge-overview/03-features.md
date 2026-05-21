# Key Features

> **File**: `documents/knowledge-overview/03-features.md`
> **Purpose**: Comprehensive list of core capabilities and platform features

---

## Overview

Agent Assistant provides a comprehensive multi-agent orchestration system with features spanning command execution, team coordination, skill injection, and multi-platform support.

---

## Feature Category 1: Command System

### 14 Core Commands

Each command supports three execution variants:

| Command | Purpose | Fast Variant | Hard Variant | Team Variant |
|---------|---------|--------------|--------------|-------------|
| `/cook` | Implementation | 2-3 agents | 5-8 agents | Golden Triangle |
| `/code` | Code generation | 2-3 agents | 5-8 agents | Golden Triangle |
| `/fix` | Bug fixing | 2-3 agents | 5-8 agents | Golden Triangle |
| `/plan` | Planning | 2-3 agents | 5-8 agents | Golden Triangle |
| `/debug` | Debugging | 2-3 agents | 5-8 agents | Golden Triangle |
| `/test` | Testing | 2-3 agents | 5-8 agents | Golden Triangle |
| `/review` | Code review | 2-3 agents | 5-8 agents | Golden Triangle |
| `/docs` | Documentation | 2-3 agents | 5-8 agents | Golden Triangle |
| `/design` | Design | 2-3 agents | 5-8 agents | Golden Triangle |
| `/deploy` | Deployment | 2-3 agents | 5-8 agents | Golden Triangle |
| `/report` | Reporting | 2-3 agents | 5-8 agents | Golden Triangle |
| `/wiki` | Wiki generation | 2-3 agents | 5-8 agents | Golden Triangle |
| `/brainstorm` | Ideation | 2-3 agents | 5-8 agents | Golden Triangle |
| `/ask` | Questions | 2-3 agents | 5-8 agents | Golden Triangle |

### Command Variants Explained

| Variant | Agents | Use Case | Quality Gates |
|---------|--------|----------|---------------|
| **fast** | 2-3 | Quick tasks, simple features | Basic review |
| **hard** | 5-8 | Complex features | Full review + testing + security |
| **team** | Golden Triangle | Critical/large tasks | Tech Lead + Executor + Reviewer |

---

## Feature Category 2: Agent System

### 24 Specialist Agents

#### Implementation Agents (4)

| Agent | Purpose | Key Skills |
|-------|--------|------------|
| `backend-engineer` | Server-side logic | Node.js, Python, databases |
| `frontend-engineer` | UI/UX implementation | React, CSS, accessibility |
| `mobile-engineer` | Mobile development | React Native, Swift, Kotlin |
| `game-engineer` | Game development | Unity, Three.js, WebGL |

#### Architecture Agents (1)

| Agent | Purpose | Key Skills |
|-------|--------|------------|
| `tech-lead` | Technical leadership | System design, trade-offs |

#### Quality Agents (6)

| Agent | Purpose | Key Skills |
|-------|--------|------------|
| `tester` | Test creation | Unit, integration, e2e |
| `reviewer` | Code review | Best practices, patterns |
| `debugger` | Bug investigation | Root cause analysis |
| `security-engineer` | Security audit | OWASP, vulnerabilities |
| `performance-engineer` | Optimization | Profiling, benchmarks |
| `wiki-reviewer` | Docs quality | Clarity, accuracy |

#### Planning Agents (3)

| Agent | Purpose | Key Skills |
|-------|--------|------------|
| `planner` | Implementation blueprints | Breakdown, estimation |
| `brainstormer` | Ideas and alternatives | Creative thinking |
| `business-analyst` | Requirements analysis | User stories, priorities |

#### Support Agents (10)

| Agent | Purpose | Key Skills |
|-------|--------|------------|
| `designer` | UI/UX design | Figma, components |
| `devops-engineer` | Infrastructure | CI/CD, containers |
| `docs-manager` | Documentation | Technical writing |
| `project-manager` | Project coordination | Agile, planning |
| `reporter` | Data analysis | Metrics, insights |
| `researcher` | Investigation | Research, synthesis |
| `scouter` | Code exploration | Pattern discovery |
| `wiki-architect` | Wiki structure | Knowledge organization |
| `wiki-extractor` | Code documentation | JSDoc, docstrings |
| `database-architect` | Data layer design | Schema, queries |

---

## Feature Category 3: Team System

### 18 Golden Triangle Teams

Each team follows the **Golden Triangle** pattern:
- **Tech Lead** — Architecture, decisions, coordination
- **Executor** — Implementation
- **Reviewer** — Quality assurance

| Team | Primary Domain | Executor Type |
|------|----------------|---------------|
| `backend-team` | Backend development | backend-engineer |
| `frontend-team` | Frontend development | frontend-engineer |
| `fullstack-team` | Full-stack development | frontend + backend |
| `database-team` | Database design | database-architect |
| `debug-team` | Debugging | debugger |
| `design-team` | UI/UX design | designer |
| `devops-team` | DevOps/infrastructure | devops-engineer |
| `docs-team` | Documentation | docs-manager |
| `game-team` | Game development | game-engineer |
| `mobile-team` | Mobile development | mobile-engineer |
| `performance-team` | Performance | performance-engineer |
| `planning-team` | Planning | planner |
| `project-team` | Project management | project-manager |
| `qa-team` | Testing/QA | tester |
| `report-team` | Reporting | reporter |
| `research-team` | Research | researcher |
| `security-team` | Security | security-engineer |
| `wiki-team` | Wiki generation | wiki-architect + wiki-extractor |

---

## Feature Category 4: Skill System

### 1400+ Domain Skills

#### Tier Structure

| Tier | Count | Purpose | Examples |
|------|-------|---------|----------|
| **foundation** | ~200 | Core skills | JavaScript basics, git |
| **professional** | ~400 | Industry standard | React patterns, SQL |
| **specialized** | ~500 | Domain expertise | Kubernetes, TensorFlow |
| **expert** | ~300 | Advanced topics | Distributed systems, ML ops |

#### Skill Categories

| Category | Example Skills |
|----------|---------------|
| Languages | JavaScript, TypeScript, Python, Go, Rust |
| Frameworks | React, Vue, Angular, Django, FastAPI |
| Databases | PostgreSQL, MongoDB, Redis, DynamoDB |
| Cloud | AWS, Azure, GCP, Terraform |
| DevOps | Docker, Kubernetes, CI/CD, monitoring |
| AI/ML | TensorFlow, PyTorch, LangChain |
| Security | OWASP, SAST, DAST |

### HSOL (Hybrid Skill Orchestration Layer)

Skills are automatically injected based on:
- Current task context
- Agent specialization
- Command type
- File being edited

---

## Feature Category 5: Multi-Platform Support

### Supported Platforms

| Platform | Configuration | Instructions |
|----------|---------------|--------------|
| **Cursor** | `code-assistants/cursor/` | `CURSOR.md` |
| **GitHub Copilot** | `code-assistants/copilot/` | `COPILOT.md` |
| **Claude Code** | `code-assistants/claude/` | `CLAUDE.md` |
| **Antigravity/Gemini** | `code-assistants/antigravity/` | `GEMINI.md` |
| **Codex** | `code-assistants/codex/` | `CODEX.md` |

### Platform Abstraction Features

- **Unified command interface** — Same commands work across platforms
- **Platform-specific path resolution** — Automatic path translation
- **Configuration portability** — Platform configs in `code-assistants/`
- **Path replacement** — `{{CURSOR_PATH}}`, `{{COPILOT_PATH}}` placeholders

---

## Feature Category 6: CLI Installation

### Installation Features

| Feature | Description |
|---------|-------------|
| **Single command** | `node cli/install.js` |
| **Multi-platform** | Installs to all 7 platforms |
| **Progress tracking** | Visual progress with status updates |
| **Path replacement** | Automatic portability fixes |
| **Rollback support** | Uninstall command available |
| **List command** | View installed platforms |

### CLI Commands

| Command | Action |
|---------|--------|
| `node cli/install.js` | Install to all platforms |
| `node cli/install.js --list` | List installed platforms |
| `node cli/install.js --uninstall` | Remove installations |

---

## Feature Category 7: Web Documentation

### React Web Application

| Feature | Technology | Purpose |
|---------|------------|---------|
| Documentation site | React 19 | Human-readable docs |
| Workflow visualization | ReactFlow 12 | Visualize agent workflows |
| Animations | Framer Motion 12 | Smooth transitions |
| Routing | React Router 7 | SPA navigation |
| Styling | Tailwind CSS 4 | Modern responsive UI |

---

## Evidence Sources

- `commands/` — 14 command files with variants
- `agents/` — 21 agent definition files
- `agents/teams/` — 18 team definitions
- `rules/AGENTS.md` — Agent orchestration rules
- `rules/TEAMS.md` — Team coordination rules
- `matrix-skills/` — Skill tier definitions
- `skills/` — 1400+ skill files
- `code-assistants/` — Platform configurations
- `cli/install.js` — CLI implementation
- `web/` — React documentation site
