---
title: Directory Structure
type: summary
tags: [directory, structure, navigation, layout]
created: 2026-05-20
updated: 2026-05-20
---

# Directory Structure

The Agent Assistant directory structure organizes the project into clear functional areas. This page provides a comprehensive map of the entire codebase, helping you locate files and understand how the project is organized.

---

## Root Level

```
agent-assistant/
├── agents/                    # 21 specialist agent definitions
├── agents/teams/             # 18 Golden Triangle team definitions
├── commands/                 # 14 commands with variants
├── rules/                    # 8 orchestration rules
├── matrix-skills/            # 4-tier skill registry
├── skills/                   # 1400+ domain skills
├── code-assistants/          # 7 platform configurations
├── cli/                      # CLI installer
├── web/                      # React documentation site
├── schema/                   # Schema definitions
├── reports/                  # Report outputs
├── .documents/                # Project documentation
├── .releaserc.json          # Semantic release config
├── package.json             # NPM package manifest
├── README.md               # Project readme
├── CHANGELOG.md            # Semantic changelog
├── LICENSE                # MIT license
├── AGENT.md               # General agent instructions
├── CLAUDE.md              # Claude Code instructions
├── CURSOR.md              # Cursor instructions
├── COPILOT.md             # GitHub Copilot instructions
├── GEMINI.md              # Antigravity/Gemini instructions
└── CODEX.md               # Codex instructions
```

**Source**: `.documents/knowledge-source-base/01-directory-structure.md:1-35`

---

## agents/

**Purpose**: 21 specialist agent definitions that define the roles, capabilities, and skills for each AI agent in the system.

```
agents/
├── README.md                      # Agent system overview
├── backend-engineer.md            # Backend development specialist
├── brainstormer.md                # Creative ideation specialist
├── business-analyst.md            # Requirements analysis specialist
├── database-architect.md          # Data layer design specialist
├── debugger.md                    # Bug investigation specialist
├── designer.md                    # UI/UX design specialist
├── devops-engineer.md             # Infrastructure specialist
├── docs-manager.md                # Documentation specialist
├── frontend-engineer.md           # Frontend development specialist
├── game-engineer.md               # Game development specialist
├── mobile-engineer.md             # Mobile development specialist
├── performance-engineer.md         # Performance optimization specialist
├── planner.md                     # Implementation planning specialist
├── project-manager.md              # Project coordination specialist
├── reporter.md                    # Data analysis specialist
├── researcher.md                  # Investigation specialist
├── reviewer.md                    # Code review specialist
├── scouter.md                     # Code exploration specialist
├── security-engineer.md           # Security audit specialist
├── tech-lead.md                   # Technical leadership specialist
├── tester.md                      # Test creation specialist
├── wiki-architect.md              # Wiki structure specialist
├── wiki-extractor.md              # Code documentation specialist
├── wiki-reviewer.md               # Docs quality review specialist
└── teams/                         # 18 Golden Triangle team definitions
```

**Annotations**:
- Each agent file is a Markdown document with YAML frontmatter containing: `id`, `name`, `role`, `profile`, `reportsTo`, `consults`, `standard`, `capabilities`, `skills`
- Files use `agent-{name}.md` naming convention for consistency
- Agent definitions are consumed by AI systems for task routing

---

## agents/teams/

**Purpose**: 18 Golden Triangle team definitions, each implementing a three-role structure for specialized work.

```
agents/teams/
├── backend-team/
│   ├── executor.md          # Implementation executor
│   ├── reviewer.md          # Quality reviewer
│   └── techlead.md          # Technical lead/coordinator
├── debug-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── design-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── devops-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── docs-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── frontend-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── fullstack-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── game-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── mobile-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── performance-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── planning-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── project-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── qa-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── report-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── research-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── security-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
├── database-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
└── wiki-team/
    ├── executor.md
    ├── reviewer.md
    └── techlead.md
```

**Wiki Team Extensions**: The `wiki-team/` directory additionally contains workflow subdirectories:
- `commands/` — wiki-specific command implementations
- `plans/` — wiki generation plans and blueprints
- `wikis/` — generated wiki content outputs

**Annotations**:
- Each team follows the Golden Triangle pattern with three roles: executor, reviewer, techlead
- Team folders use `{domain}-team/` naming convention
- Each role file contains specialized instructions for that role's responsibilities

---

## commands/

**Purpose**: 14 commands with 3 variants each, providing task-specific execution paths.

```
commands/
├── README.md                    # Command system overview
├── brainstorm.md              # Ideation command base
├── brainstorm/
│   ├── fast.md                # Fast variant for quick ideation
│   ├── hard.md                # Hard variant for complex ideation
│   └── team.md                # Team variant for collaborative ideation
├── code.md                    # Code generation base
├── code/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── cook.md                    # Implementation base
├── cook/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── debug.md                   # Debugging base
├── debug/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── deploy.md                  # Deployment base
├── deploy/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── design.md                  # Design base
├── design/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── docs.md                    # Documentation base
├── docs/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── fix.md                     # Bug fixing base
├── fix/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── plan.md                    # Planning base
├── plan/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── report.md                  # Reporting base
├── report/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── review.md                  # Code review base
├── review/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── test.md                    # Testing base
├── test/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── wiki.md                    # Wiki generation base
└── wiki/
    ├── fast.md
    ├── hard.md
    └── team.md
```

**Annotations**:
- Each command has a base file (e.g., `cook.md`) plus a variant folder
- Variant folder contains `fast.md` (quick tasks), `hard.md` (complex tasks), `team.md` (team collaboration)
- Each variant file contains YAML frontmatter with: `command`, `purpose`, `variants`, `defaultAgents`, `qualityGates`

---

## rules/

**Purpose**: 8 orchestration rules that define the system's operational principles and coordination logic.

```
rules/
├── AGENTS.md      # Agent definitions, roles, and tiered execution
├── CORE.md        # Core orchestration principles and 10 laws
├── ERRORS.md      # Error classification and handling procedures
├── PHASES.md      # Phase execution order and transitions
├── REFERENCE.md   # Quick reference for common operations
├── SKILLS.md      # Skill orchestration via HSOL
├── TEAMS.md       # Golden Triangle team coordination
└── WIKI.md        # Wiki documentation standards
```

**Load Order**: Rules are loaded in this exact sequence: CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI

**Annotations**:
- Each file contains Markdown documentation with structured guidance
- CORE.md is always loaded first as the foundation
- Rules govern all agent interactions and system behavior

---

## matrix-skills/

**Purpose**: 4-tier skill classification system optimized for Hierarchical Skill Orchestration Language (HSOL).

```
matrix-skills/
├── foundation/     # ~200 core universal skills
│   ├── debugging.md
│   ├── code-review.md
│   └── ... (core cross-domain skills)
├── professional/   # ~400 industry-standard skills
│   ├── api-design.md
│   └── ... (general professional skills)
├── specialized/    # ~500 domain-specific skills
│   ├── react-hooks.md
│   └── ... (technology-specific skills)
└── expert/         # ~300 advanced specialist skills
    ├── compiler-design.md
    └── ... (cutting-edge expertise skills)
```

**Annotations**:
- Organized by skill tier from foundational to expert
- Each matrix skill links to full skill definition in `skills/`
- Used by HSOL for dynamic skill injection during agent execution
- Foundation skills are universal; expert skills require deep specialization

---

## skills/

**Purpose**: 1400+ domain skill definitions organized by technology and discipline.

```
skills/
├── README.md                    # Skill system overview
├── javascript/                 # JavaScript ecosystem skills
├── typescript/                 # TypeScript-specific skills
├── python/                     # Python ecosystem skills
├── react/                      # React framework skills
├── nodejs/                     # Node.js runtime skills
├── database/                   # Database design and optimization
├── devops/                     # DevOps and infrastructure skills
├── security/                   # Security and compliance skills
├── testing/                    # Testing and QA skills
├── architecture/               # Software architecture skills
└── ... (additional domains)
```

**Skills Organization by Domain**:
- **Cursor Skills** (`skills-cursor/`): Editor-specific capabilities
- **Core Skills** (`skills/`): Universal programming skills
- **Platform Skills**: Code assistant integrations

**Annotations**:
- Organized by technology/domain for human navigation
- Each skill file contains detailed knowledge and best practices
- Consumed by agents during execution for specialized knowledge

---

## code-assistants/

**Purpose**: 7 platform configurations for different AI coding assistants.

```
code-assistants/
├── antigravity/               # Antigravity/Gemini configuration
│   ├── instructions.md        # Platform-specific instructions
│   └── config.toml            # Platform configuration
├── claude/                    # Claude Code configuration
│   ├── instructions.md
│   └── config.toml
├── copilot/                   # GitHub Copilot configuration
│   ├── instructions.md
│   └── config.toml
├── cursor/                    # Cursor IDE configuration
│   ├── instructions.md
│   └── config.toml
└── codex/                    # OpenAI Codex configuration
    ├── instructions.md
    └── config.toml
```

**Annotations**:
- Each platform has platform-specific configuration and instructions
- Path placeholders enable portability across different environments
- Instruction files provide integration guidance for each platform

---

## cli/

**Purpose**: CLI installer for platform-specific setup and configuration.

```
cli/
└── install.js      # Main CLI installer (~1700 lines)
```

**Annotations**:
- Single JavaScript file with no framework dependencies
- Handles all platform installations (macOS, Linux, Windows)
- Uses fsync for reliable file operations
- Self-contained: no external npm dependencies required

---

## web/

**Purpose**: React 19 documentation site with TypeScript and Tailwind CSS.

```
web/
├── package.json              # Web dependencies (React 19, Vite 6)
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── index.html               # HTML entry point
├── public/
│   ├── favicon.svg          # Site favicon
│   └── manifest.json        # PWA manifest
└── src/
    ├── main.tsx             # Application entry point
    ├── App.tsx              # Root component with routing
    ├── index.css            # Global styles (Tailwind CSS 4)
    ├── components/          # Reusable React components
    │   ├── seo/             # SEO components (StructuredData, config)
    │   ├── badges/          # Badge display components
    │   ├── dashboard/       # Dashboard UI components
    │   ├── hero/            # Hero section components
    │   ├── layout/          # Layout components (Header, Footer)
    │   ├── workflow/         # Workflow visualization (ReactFlow)
    │   └── ...
    ├── pages/               # Page components
    │   ├── Docs.tsx         # Documentation page
    │   ├── HomePage.tsx     # Landing page
    │   ├── Installation.tsx # Installation guide page
    │   └── features/        # Feature-specific pages
    │       └── AgentTeams.tsx
    └── data/                # Static data files
        └── agents.ts        # Agent registry data
```

**Tech Stack**:
- React 19 with TypeScript
- Vite 6 build tool
- Tailwind CSS 4 styling
- ReactFlow for workflow visualization

---

## .documents/

**Purpose**: Project documentation organized by knowledge category.

```
.documents/
├── knowledge-overview/       # High-level project knowledge
│   ├── 00-index.md
│   ├── 01-project-identity.md
│   ├── 02-tech-stack.md
│   ├── 03-features.md
│   └── 04-getting-started.md
├── knowledge-architecture/    # System architecture
│   ├── 00-index.md
│   ├── 01-system-overview.md
│   ├── 02-components.md
│   ├── 03-data-flow.md
│   ├── 04-design-patterns.md
│   └── 05-decisions.md
├── knowledge-domain/         # Domain model and business rules
│   ├── 00-index.md
│   ├── 01-entities.md
│   ├── 02-database-schema.md
│   ├── 03-api-contracts.md
│   └── 04-business-rules.md
├── knowledge-source-base/    # Source code reference
│   ├── 00-index.md
│   ├── 01-directory-structure.md
│   ├── 02-entry-points.md
│   ├── 03-key-modules.md
│   └── 04-configuration.md
├── knowledge-standards/      # Coding and documentation standards
│   ├── 00-index.md
│   ├── 01-code-style.md
│   ├── 02-conventions.md
│   ├── 03-git-workflow.md
│   └── 04-testing-standards.md
├── business-prd/             # Business product requirements
├── business-glossary/       # Business terminology
├── business-features/       # Feature specifications
└── business-workflows/       # Workflow documentation
```

**Documentation Categories**:
- **Knowledge Overview**: Project identity and getting started
- **Knowledge Architecture**: System design and components
- **Knowledge Domain**: Business rules and entities
- **Knowledge Source Base**: Code and configuration reference
- **Knowledge Standards**: Development practices

---

## .wiki/

**Purpose**: Generated wiki documentation (output directory for wiki extraction).

```
.wiki/
├── index.md                  # Wiki home page
├── log.md                    # Wiki generation log
├── agents/                   # Agent system documentation
├── concepts/                 # Architectural concepts
├── decisions/                # Architecture decision records
├── entities/                 # Entity documentation
├── entities/                 # Workflow documentation
├── runbooks/                 # Operational runbooks
├── summaries/                # Summary documentation
└── chronicles/              # Project chronicles and guides
```

---

## Module Organization Summary

| Directory | Contents | Purpose |
|-----------|----------|---------|
| `agents/` | 21 agent definitions | Role-based task delegation |
| `agents/teams/` | 18 team definitions | Coordinated multi-agent work |
| `commands/` | 14 commands × 3 variants | Task execution paths |
| `rules/` | 8 orchestration rules | System behavior control |
| `matrix-skills/` | 4-tier skill matrix | HSOL skill injection |
| `skills/` | 1400+ skill definitions | Specialized knowledge |
| `code-assistants/` | 7 platform configs | AI tool integration |
| `cli/` | CLI installer | Platform setup |
| `web/` | React application | Documentation site |
| `.documents/` | Source documentation | Project knowledge base |

---

## Key Files

| File | Purpose |
|------|---------|
| `agents/agent-tech-lead.md` | Orchestration coordinator |
| `rules/CORE.md` | Foundational principles |
| `cli/install.js` | Platform installer |
| `web/src/App.tsx` | React application root |
| `package.json` | NPM dependencies |

---

## Related Pages

- [[System Components]] — Component descriptions and relationships
- [[Project Overview]] — Project identity and getting started
- [[Entry Points]] — Application entry points and initialization
- [[Key Modules]] — Core module documentation
- [[Agent System]] — Agent architecture and capabilities
- [[Command System]] — Command routing and variants
