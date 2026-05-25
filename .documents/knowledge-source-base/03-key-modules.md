# Key Modules

> **File**: `.documents/knowledge-source-base/03-key-modules.md`
> **Purpose**: Per-module breakdown of cli, agents, commands, rules, matrix-skills, skills, code-assistants, web

---

## Overview

This document provides detailed documentation for the eight key modules in Agent Assistant.

---

## Module 1: CLI (`cli/`)

### Location
`cli/install.js`

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Node.js script |
| **Language** | JavaScript ES2022+ |
| **Lines** | 1716 |
| **Purpose** | Multi-platform installer |

### Core Functions

| Function | Purpose | Signature |
|----------|---------|-----------|
| `main()` | Entry point | `main(args)` |
| `install()` | Install to platforms | `install(platforms)` |
| `uninstall()` | Remove installations | `uninstall(platforms)` |
| `list()` | List installations | `list()` |
| `replacePaths()` | Path replacement | `replacePaths(content, platform)` |
| `copyFiles()` | Copy to target | `copyFiles(files, target)` |

### Platform Support

| Platform | Path | Status |
|----------|------|--------|
| Cursor | `~/.{TOOL}/` | Supported |
| Copilot | `~/.github/copilot/` | Supported |
| Claude | `~/.claude/` | Supported |
| Antigravity | `~/.antigravity/` | Supported |
| Codex | `~/.codex/` | Supported |

### Key Implementation Details

- Uses `fs` and `path` modules for file operations
- Implements `fsync` for reliable writes
- Progress tracking with status messages
- Error handling with graceful degradation

---

## Module 2: Agents (`agents/`)

### Location
`agents/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Markdown files |
| **Count** | 21 agents |
| **Format** | YAML frontmatter + Markdown |

### Agent Files

| File | Agent | Category |
|------|-------|----------|
| `agent-backend-engineer.md` | Backend Engineer | Implementation |
| `agent-frontend-engineer.md` | Frontend Engineer | Implementation |
| `agent-mobile-engineer.md` | Mobile Engineer | Implementation |
| `agent-game-engineer.md` | Game Engineer | Implementation |
| `agent-tech-lead.md` | Tech Lead | Architecture |
| `agent-database-architect.md` | Database Architect | Architecture |
| `agent-tester.md` | Tester | Quality |
| `agent-reviewer.md` | Reviewer | Quality |
| `agent-debugger.md` | Debugger | Quality |
| `agent-security-engineer.md` | Security Engineer | Quality |
| `agent-performance-engineer.md` | Performance Engineer | Quality |
| `agent-wiki-reviewer.md` | Wiki Reviewer | Quality |
| `agent-planner.md` | Planner | Planning |
| `agent-brainstormer.md` | Brainstormer | Planning |
| `agent-business-analyst.md` | Business Analyst | Planning |
| `agent-designer.md` | Designer | Support |
| `agent-devops-engineer.md` | DevOps Engineer | Support |
| `agent-docs-manager.md` | Docs Manager | Support |
| `agent-project-manager.md` | Project Manager | Support |
| `agent-reporter.md` | Reporter | Support |
| `agent-researcher.md` | Researcher | Support |
| `agent-scouter.md` | Scouter | Support |
| `agent-wiki-architect.md` | Wiki Architect | Support |
| `agent-wiki-extractor.md` | Wiki Extractor | Support |

### Agent File Structure

```markdown
---
id: backend-engineer
name: Backend Engineer
role: implementation
profile: backend-development
reportsTo: tech-lead
consults:
  - database-architect
  - devops-engineer
standard: docs-as-code
---

# Backend Engineer

## Role Overview
[Detailed role description]

## Skills
[Required and preferred skills]

## Behavior Guidelines
[How to behave as this agent]

## Output Format
[Expected output structure]
```

---

## Module 3: Commands (`commands/`)

### Location
`commands/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Markdown files |
| **Count** | 14 commands + variants |
| **Format** | YAML frontmatter + Markdown |

### Command Files

| Command | Base File | Variants |
|---------|-----------|----------|
| `/cook` | `cook.md` | fast, hard, team |
| `/code` | `code.md` | fast, hard, team |
| `/fix` | `fix.md` | fast, hard, team |
| `/plan` | `plan.md` | fast, hard, team |
| `/debug` | `debug.md` | fast, hard, team |
| `/test` | `test.md` | fast, hard, team |
| `/review` | `review.md` | fast, hard, team |
| `/docs` | `docs.md` | fast, hard, team |
| `/design` | `design.md` | fast, hard, team |
| `/deploy` | `deploy.md` | fast, hard, team |
| `/report` | `report.md` | fast, hard, team |
| `/wiki` | `wiki.md` | fast, hard, team |
| `/brainstorm` | `brainstorm.md` | fast, hard, team |
| `/ask` | `ask.md` | fast, hard, team |

### Command File Structure

```markdown
---
command: /cook
purpose: Implementation of features and components
variants: [fast, hard, team]
defaultAgents: [frontend-engineer, backend-engineer]
---

# Cook Command

## Overview
[Command description]

## Usage
[How to use]

## Examples
[Usage examples]
```

---

## Module 4: Rules (`rules/`)

### Location
`rules/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Markdown files |
| **Count** | 8 files |
| **Load Order** | CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI |

### Rule Files

| File | Purpose | Load Order |
|------|---------|------------|
| `CORE.md` | Core orchestration principles | 1 |
| `PHASES.md` | Phase definitions | 2 |
| `AGENTS.md` | Agent definitions and roles | 3 |
| `SKILLS.md` | Skill orchestration (HSOL) | 4 |
| `TEAMS.md` | Team coordination | 5 |
| `ERRORS.md` | Error handling | 6 |
| `REFERENCE.md` | Quick reference | 7 |
| `WIKI.md` | Wiki documentation standards | 8 |

### Rule File Structure

```markdown
# Rule Name

## Purpose
[What this rule does]

## Applicability
[When this rule applies]

## Details
[Rule details]
```

---

## Module 5: Matrix Skills (`matrix-skills/`)

### Location
`matrix-skills/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Markdown files + folders |
| **Tiers** | 4 (foundation, professional, specialized, expert) |
| **Purpose** | Skill tier classification for HSOL |

### Tier Structure

| Tier | Approx Count | Purpose | Example Files |
|------|--------------|---------|---------------|
| `foundation/` | ~200 | Core skills | javascript.md, git.md |
| `professional/` | ~400 | Industry standard | react.md, sql.md |
| `specialized/` | ~500 | Domain expertise | kubernetes.md, tensorflow.md |
| `expert/` | ~300 | Advanced topics | distributed-systems.md |

### Matrix Skill File Structure

```markdown
---
id: javascript
name: JavaScript
tier: foundation
domain: programming
tags: [javascript, js, ecmascript]
skills:
  - name: ES2022 Features
    file: skills/javascript/es2022.md
  - name: Async Patterns
    file: skills/javascript/async.md
---

# JavaScript Foundation

[Skill overview]
```

---

## Module 6: Skills (`skills/`)

### Location
`skills/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Markdown files |
| **Count** | 1400+ skills |
| **Format** | Markdown content |
| **Purpose** | Domain knowledge for agents |

### Skill Organization

```
skills/
├── javascript/        # JavaScript domain
│   ├── es2022.md
│   ├── async.md
│   ├── modules.md
│   └── ...
├── typescript/       # TypeScript domain
├── python/           # Python domain
├── react/            # React domain
├── nodejs/           # Node.js domain
├── database/         # Database domain
├── devops/           # DevOps domain
├── security/         # Security domain
├── cloud/            # Cloud domain
├── ai/               # AI/ML domain
└── ... (many more)
```

### Skill File Structure

```markdown
# JavaScript ES2022 Features

## Overview
[What this skill covers]

## Key Concepts
[Main concepts]

## Examples
[Working code examples]

## Best Practices
[Best practices]
```

---

## Module 7: Code Assistants (`code-assistants/`)

### Location
`code-assistants/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Config files + instructions |
| **Platforms** | 5 (cursor, copilot, claude, antigravity, codex) |
| **Purpose** | Platform-specific configuration |

### Platform Configurations

#### Cursor
```
code-assistants/cursor/
├── instructions.md
└── config.toml
```

#### GitHub Copilot
```
code-assistants/copilot/
├── instructions.md
└── config.toml
```

#### Claude Code
```
code-assistants/claude/
├── instructions.md
└── config.toml
```

#### Antigravity/Gemini
```
code-assistants/antigravity/
├── instructions.md
└── config.toml
```

#### Codex
```
code-assistants/codex/
├── instructions.md
└── config.toml
```

### Path Placeholders

| Placeholder | Platform | Resolution |
|-------------|----------|------------|
| `{{CURSOR_PATH}}` | Cursor | `~/.{TOOL}/` |
| `{{COPILOT_PATH}}` | Copilot | `~/.github/copilot/` |
| `{{CLAUDE_PATH}}` | Claude | `~/.claude/` |
| `{{ANTIGRAVITY_PATH}}` | Antigravity | `~/.antigravity/` |
| `{{CODEX_PATH}}` | Codex | `~/.codex/` |

---

## Module 8: Web (`web/`)

### Location
`web/` folder

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Framework** | React 19 |
| **Build Tool** | Vite 6 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |

### Directory Structure

```
web/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── pages/                # Page components
│   │   ├── Docs.tsx
│   │   ├── HomePage.tsx
│   │   ├── Installation.tsx
│   │   └── features/
│   │       └── AgentTeams.tsx
│   └── components/           # Shared components
│       ├── seo/
│       │   ├── StructuredData.tsx
│       │   └── seo-config.ts
│       ├── badges/
│       ├── dashboard/
│       ├── hero/
│       ├── layout/
│       └── workflow/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `main.tsx` | Application entry |
| `App.tsx` | Root component with routing |
| `Docs.tsx` | Documentation viewer |
| `HomePage.tsx` | Landing page |
| `Installation.tsx` | Installation guide |
| `seo-config.ts` | SEO configuration |
| `StructuredData.tsx` | Structured data for SEO |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19 | UI framework |
| react-dom | 19 | DOM rendering |
| react-router-dom | 7 | Routing |
| framer-motion | 12 | Animations |
| @xyflow/react | 12 | ReactFlow |
| tailwindcss | 4 | Styling |

---

## Evidence Sources

- `cli/install.js` — CLI module
- `agents/` — Agent module
- `commands/` — Command module
- `rules/` — Rules module
- `matrix-skills/` — Matrix skills module
- `skills/` — Skills module
- `code-assistants/` — Code assistants module
- `web/` — Web module
