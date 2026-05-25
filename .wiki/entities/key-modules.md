---
title: Key Modules
description: Comprehensive reference for the eight core modules that power Agent Assistant — CLI, Agents, Commands, Rules, Matrix Skills, Skills, Code Assistants, and Web — with per-module architecture, file inventory, and dependency maps.
category: entity
tags: [modules, architecture, cli, agents, commands, rules, skills, matrix-skills, code-assistants, web]
related:
  - [[Directory Structure]]
  - [[Rule System]]
  - [[Agent System]]
  - [[Command System]]
  - [[Skill System]]
  - [[Configuration Reference]]
---

# Key Modules

The Agent Assistant project is organized into eight core modules, each serving a distinct purpose in the overall system. Together, they form a layered architecture: the [[Rule System]] and [[Agent System]] provide orchestration logic at the top, commands act as entry points, skills provide domain knowledge, code-assistants enable multi-platform deployment, the CLI handles installation, and the web application delivers a user-facing interface.

This page documents each module's path, purpose, key files, exported interfaces, dependencies, and consumer relationships. Every fact traces to source documents via citations in the format `.documents/knowledge-source-base/03-key-modules.md:line-range`.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:1-12`

---

## Module 1: Rules (`rules/`)

### Path
`rules/`

### Purpose
The Rules module contains eight Markdown files that define the core orchestration principles, phase execution order, agent delegation policies, skill loading behavior, team coordination protocols, error handling strategies, quick reference guides, and wiki documentation standards for the entire system.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:188-229`

### Files

| File | Purpose | Load Order |
|------|---------|------------|
| `CORE.md` | Core orchestration principles and 10 laws | 1 |
| `PHASES.md` | Phase execution definitions and ordering | 2 |
| `AGENTS.md` | Agent definitions, roles, and tiered execution | 3 |
| `SKILLS.md` | Skill orchestration via HSOL (Hierarchical Skill Orchestration Layer) | 4 |
| `TEAMS.md` | Golden Triangle team coordination protocols | 5 |
| `ERRORS.md` | Error classification and handling procedures | 6 |
| `REFERENCE.md` | Quick reference for common operations | 7 |
| `WIKI.md` | Wiki documentation standards and conventions | 8 |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:197-212`

### Load Order
Rules are loaded in a strict, non-negotiable sequence: `CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI`. This ordering ensures that foundational principles are established before domain-specific rules are applied, and that critical error handling is loaded before any user-facing operations execute.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:199`

### Rule File Structure

Every rule file follows a consistent Markdown structure:

```markdown
# Rule Name

## Purpose
[What this rule does]

## Applicability
[When this rule applies]

## Details
[Rule details and specifications]
```

**Source**: `.documents/knowledge-source-base/03-key-modules.md:214-227`

### Dependencies
Rules files depend on one another through the load order. `AGENTS.md` depends on `PHASES.md` (which defines execution phases that agents operate within). `TEAMS.md` depends on both `AGENTS.md` and `SKILLS.md`. `ERRORS.md` depends on `CORE.md` for foundational error philosophy.

### Consumers
All other modules consume rules at runtime. The [[Agent System]] loads `AGENTS.md` and `SKILLS.md` for delegation logic. The [[Command System]] loads `PHASES.md` for workflow sequencing. The CLI loads `ERRORS.md` for error handling during installation.

---

## Module 2: Agents (`agents/`)

### Path
`agents/`

### Purpose
The Agents module provides 21 agent definition files in Markdown format, each describing a specialized role that the orchestration system can delegate work to. Agents are categorized into five functional areas: Implementation, Architecture, Quality, Planning, and Support.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:58-130`

### Files

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:73-98`

### Agent File Structure

Each agent file contains YAML frontmatter followed by Markdown content:

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:100-128`

### Key Exports
Each agent exports a structured set of metadata through its YAML frontmatter: `id` (unique identifier), `name` (human-readable name), `role` (functional category), `profile` (expertise domain), `reportsTo` (supervisory relationship), `consults` (peer collaboration list), `standard` (operating standard), and additional fields for capabilities and skills.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:100-113`

### Dependencies
Agents depend on `rules/AGENTS.md` for their operational definitions and on `rules/SKILLS.md` for skill loading. Agents in the Architecture category may depend on domain-specific skills from `skills/`.

### Consumers
The [[Command System]] consumes agents by loading the appropriate agent based on command requirements. The [[Rule System]]'s `TEAMS.md` coordinates team compositions that include multiple agents working together.

---

## Module 3: Commands (`commands/`)

### Path
`commands/`

### Purpose
The Commands module provides 14 command definitions, each with three execution variants (fast, hard, team), enabling the orchestration system to handle tasks of varying complexity and scope through a consistent interface.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:132-184`

### Files

| Command | Base File | Variants | Default Agents |
|---------|-----------|----------|----------------|
| `/cook` | `cook.md` | fast, hard, team | frontend-engineer, backend-engineer |
| `/code` | `code.md` | fast, hard, team | frontend-engineer, backend-engineer |
| `/fix` | `fix.md` | fast, hard, team | debugger, reviewer |
| `/plan` | `plan.md` | fast, hard, team | planner, brainstormer |
| `/debug` | `debug.md` | fast, hard, team | debugger |
| `/test` | `test.md` | fast, hard, team | tester |
| `/review` | `review.md` | fast, hard, team | reviewer |
| `/docs` | `docs.md` | fast, hard, team | docs-manager |
| `/design` | `design.md` | fast, hard, team | designer |
| `/deploy` | `deploy.md` | fast, hard, team | devops-engineer |
| `/report` | `report.md` | fast, hard, team | reporter |
| `/wiki` | `wiki.md` | fast, hard, team | wiki-extractor |
| `/brainstorm` | `brainstorm.md` | fast, hard, team | brainstormer |
| `/ask` | `ask.md` | fast, hard, team | researcher |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:145-162`

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:164-184`

### Variant Behavior

| Variant | Description |
|---------|-------------|
| `fast` | Quick implementation for straightforward tasks; minimal review overhead |
| `hard` | Full implementation for complex tasks; complete review and testing |
| `team` | Multi-agent team execution for large-scale features; coordinated review pipeline |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:145-162`

### Dependencies
Commands depend on `rules/PHASES.md` for phase sequencing, `rules/AGENTS.md` for agent delegation, and `agents/` files for the specific agents they invoke.

### Consumers
The orchestration layer consumes command files to route user requests. Each command's frontmatter specifies `defaultAgents` and `qualityGates` which the system uses to assemble the appropriate execution pipeline.

---

## Module 4: Matrix Skills (`matrix-skills/`)

### Path
`matrix-skills/`

### Purpose
The Matrix Skills module organizes 1,400+ skills into four hierarchical tiers for optimized HSOL (Hierarchical Skill Orchestration Layer) selection. Each tier represents a level of specialization and depth, enabling the system to select the most appropriate skill set for a given task complexity.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:231-273`

### Tier Structure

| Tier | Approximate Count | Purpose | Example Files |
|------|-------------------|---------|---------------|
| `foundation/` | ~200 | Core universal skills applicable across all domains | `javascript.md`, `git.md`, `debugging.md`, `code-review.md` |
| `professional/` | ~400 | Industry-standard skills for general-purpose work | `react.md`, `sql.md`, `api-design.md` |
| `specialized/` | ~500 | Domain-specific expertise skills | `kubernetes.md`, `tensorflow.md`, `react-hooks.md` |
| `expert/` | ~300 | Advanced and cutting-edge topic skills | `distributed-systems.md`, `compiler-design.md` |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:244-251`

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:253-272`

### Key Exports
Each matrix skill exports tier classification (`tier`), domain classification (`domain`), tag set (`tags`), and a `skills` array that maps skill names to their corresponding skill files in the `skills/` module.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:257-266`

### Dependencies
Matrix skills depend on the `skills/` module for actual skill content. The `rules/SKILLS.md` file defines how matrix skills are loaded and matched against task requirements.

### Consumers
The [[Skill System]] and `rules/SKILLS.md` consume matrix skills during task resolution. Agents consume skills during execution to augment their domain knowledge.

---

## Module 5: Skills (`skills/`)

### Path
`skills/`

### Purpose
The Skills module contains 1,400+ skill files organized by domain, providing detailed domain knowledge and best practices that agents consult during execution. Unlike matrix-skills which handle organization, this module contains the actual skill content.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:276-328`

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
├── backend/          # Backend domain
├── frontend/         # Frontend domain
├── mobile/           # Mobile domain
├── testing/          # Testing domain
├── architecture/     # Architecture domain
└── ... (many more)
```

**Source**: `.documents/knowledge-source-base/03-key-modules.md:290-309`

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:311-327`

### Key Exports
Each skill file exports a structured document with: `Overview` (scope and purpose), `Key Concepts` (main topics covered), `Examples` (working code samples), and `Best Practices` (recommended approaches).

**Source**: `.documents/knowledge-source-base/03-key-modules.md:313-326`

### Dependencies
Skills depend on the `matrix-skills/` module for organizational metadata and on `rules/SKILLS.md` for loading and matching logic.

### Consumers
Agents consume skills during execution to access domain-specific knowledge. The [[Skill System]]'s HSOL mechanism matches tasks to appropriate skills.

---

## Module 6: Code Assistants (`code-assistants/`)

### Path
`code-assistants/`

### Purpose
The Code Assistants module provides platform-specific configurations for five AI coding assistant platforms: Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, and Codex. Each platform receives tailored instructions and configuration to operate within the Agent Assistant framework.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:331-390`

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

**Source**: `.documents/knowledge-source-base/03-key-modules.md:344-379`

### Path Placeholders

| Placeholder | Platform | Resolution |
|-------------|----------|------------|
| `{{CURSOR_PATH}}` | Cursor | `~/.cursor/` |
| `{{COPILOT_PATH}}` | Copilot | `~/.copilot/` |
| `{{CLAUDE_PATH}}` | Claude | `~/.claude/` |
| `{{ANTIGRAVITY_PATH}}` | Antigravity | `~/.antigravity/` |
| `{{CODEX_PATH}}` | Codex | `~/.codex/` |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:381-389`

### Dependencies
Code assistants depend on `cli/` for installation to the correct platform paths. Each platform's configuration references path placeholders that resolve at installation time.

### Consumers
The CLI module consumes code-assistant configurations during installation, copying platform-specific files to the appropriate directories.

---

## Module 7: CLI (`cli/`)

### Path
`cli/`

### Purpose
The CLI module is a 1,716-line Node.js script that provides multi-platform installation and uninstallation capabilities for Agent Assistant across all five supported platforms. It handles file copying, path replacement, and progress tracking without any external framework dependencies.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:14-55`

### File
`cli/install.js` — single-file Node.js installer written in JavaScript ES2022+

**Source**: `.documents/knowledge-source-base/03-key-modules.md:17`

### Module Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Node.js script |
| **Language** | JavaScript ES2022+ |
| **Lines** | 1716 |
| **Purpose** | Multi-platform installer |
| **Framework Dependencies** | None (uses only `fs` and `path`) |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:19-27`

### Core Functions

| Function | Purpose | Signature |
|----------|---------|-----------|
| `main()` | Entry point | `main(args)` |
| `install()` | Install to platforms | `install(platforms)` |
| `uninstall()` | Remove installations | `uninstall(platforms)` |
| `list()` | List installations | `list()` |
| `replacePaths()` | Path placeholder replacement | `replacePaths(content, platform)` |
| `copyFiles()` | Copy files to target | `copyFiles(files, target)` |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:28-37`

### Platform Support

| Platform | Path | Status |
|----------|------|--------|
| Cursor | `~/.cursor/` | Supported |
| Copilot | `~/.copilot/` | Supported |
| Claude | `~/.claude/` | Supported |
| Antigravity | `~/.antigravity/` | Supported |
| Codex | `~/.codex/` | Supported |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:39-47`

### Key Implementation Details

- Uses `fs` and `path` core modules for file operations
- Implements `fsync` for reliable write operations
- Progress tracking with status messages during installation
- Error handling with graceful degradation on partial failures
- Platform detection and validation before installation

**Source**: `.documents/knowledge-source-base/03-key-modules.md:49-54`

### Dependencies
The CLI has no external dependencies. It uses only Node.js core modules (`fs`, `path`) and is fully self-contained.

### Consumers
End users consume the CLI to install Agent Assistant. The CLI consumes `code-assistants/` configurations to determine which files to install for each platform.

---

## Module 8: Web (`web/`)

### Path
`web/`

### Purpose
The Web module is a React 19 single-page application that provides a user-facing interface for Agent Assistant, including landing pages, documentation viewing, installation guides, and feature showcases.

**Source**: `.documents/knowledge-source-base/03-key-modules.md:393-458`

### Technology Stack

| Attribute | Value |
|-----------|-------|
| **Framework** | React 19 |
| **Build Tool** | Vite 6 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:399-406`

### Directory Structure

```
web/
├── public/
│   └── manifest.json
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component with routing
│   ├── index.css             # Global styles
│   ├── pages/
│   │   ├── Docs.tsx          # Documentation viewer
│   │   ├── HomePage.tsx      # Landing page
│   │   ├── Installation.tsx  # Installation guide
│   │   └── features/
│   │       └── AgentTeams.tsx # Agent teams feature showcase
│   ├── components/
│   │   ├── seo/
│   │   │   ├── seo-config.ts
│   │   │   └── StructuredData.tsx
│   │   ├── badges/
│   │   ├── dashboard/
│   │   ├── hero/
│   │   ├── layout/
│   │   └── workflow/
│   └── data/
│       └── agents.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

**Source**: `.documents/knowledge-source-base/03-key-modules.md:408-434`

### Key Components

| Component | Purpose |
|-----------|---------|
| `main.tsx` | Application entry point |
| `App.tsx` | Root component with routing |
| `Docs.tsx` | Documentation viewer page |
| `HomePage.tsx` | Landing page |
| `Installation.tsx` | Installation guide page |
| `AgentTeams.tsx` | Agent teams feature showcase |
| `seo-config.ts` | SEO configuration and metadata |
| `StructuredData.tsx` | Structured data generation for SEO |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:436-446`

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19 | UI framework |
| react-dom | 19 | DOM rendering |
| react-router-dom | 7 | Client-side routing |
| framer-motion | 12 | Animations and transitions |
| @xyflow/react | 12 | ReactFlow for workflow visualization |
| tailwindcss | 4 | Utility-first CSS framework |

**Source**: `.documents/knowledge-source-base/03-key-modules.md:448-458`

### Dependencies
The Web module depends on `cli/` for installation instructions and on `.documents/` for documentation content rendered in the `Docs.tsx` page.

### Consumers
End users access Agent Assistant through the web interface. The web application consumes agent data from `web/src/data/agents.ts` and renders documentation from `.documents/`.

---

## Module Dependency Map

The following diagram illustrates how modules depend on one another:

```
web/              ←  cli/, .documents/, agents/
cli/              ←  code-assistants/
code-assistants/  ←  (none — leaf module)
agents/           ←  rules/, skills/
commands/         ←  rules/, agents/
rules/            ←  (none — foundational module)
matrix-skills/    ←  skills/
skills/           ←  (none — leaf module)
```

Rules is the only module with no dependencies — it provides foundational definitions consumed by all other modules. Code Assistants and Skills are leaf modules — they export content consumed by other modules but depend on nothing outside their scope.

---

## Evidence Sources

| Module | Source File | Lines |
|--------|-------------|-------|
| CLI | `.documents/knowledge-source-base/03-key-modules.md` | 14–55 |
| Agents | `.documents/knowledge-source-base/03-key-modules.md` | 58–130 |
| Commands | `.documents/knowledge-source-base/03-key-modules.md` | 132–184 |
| Rules | `.documents/knowledge-source-base/03-key-modules.md` | 188–229 |
| Matrix Skills | `.documents/knowledge-source-base/03-key-modules.md` | 231–273 |
| Skills | `.documents/knowledge-source-base/03-key-modules.md` | 276–328 |
| Code Assistants | `.documents/knowledge-source-base/03-key-modules.md` | 331–390 |
| Web | `.documents/knowledge-source-base/03-key-modules.md` | 393–458 |

---

## Related Pages

- [[Directory Structure]] — File system layout and navigation
- [[Rule System]] — Orchestration rules and execution principles
- [[Agent System]] — Agent definitions and delegation policies
- [[Command System]] — Command routing and variant behavior
- [[Skill System]] — Skill loading and HSOL orchestration
- [[Configuration Reference]] — Platform configuration and path mappings
