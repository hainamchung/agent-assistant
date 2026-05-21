# Directory Structure

> **File**: `documents/knowledge-source-base/01-directory-structure.md`
> **Purpose**: Complete annotated directory tree with descriptions

---

## Project Root

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
├── documents/                # Project documentation (this folder)
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

---

## Directory: `agents/`

**Purpose**: 21 specialist agent definitions

```
agents/
├── README.md                    # Agent system overview
├── agent-backend-engineer.md  # Backend development
├── agent-brainstormer.md      # Creative ideation
├── agent-business-analyst.md  # Requirements analysis
├── agent-database-architect.md # Data layer design
├── agent-debugger.md          # Bug investigation
├── agent-designer.md          # UI/UX design
├── agent-devops-engineer.md  # Infrastructure
├── agent-docs-manager.md      # Documentation
├── agent-frontend-engineer.md # Frontend development
├── agent-game-engineer.md     # Game development
├── agent-mobile-engineer.md   # Mobile development
├── agent-performance-engineer.md # Performance optimization
├── agent-planner.md           # Implementation planning
├── agent-project-manager.md   # Project coordination
├── agent-reporter.md          # Data analysis
├── agent-researcher.md        # Investigation
├── agent-reviewer.md          # Code review
├── agent-scouter.md           # Code exploration
├── agent-security-engineer.md # Security audit
├── agent-tech-lead.md         # Technical leadership
├── agent-tester.md            # Test creation
├── agent-wiki-architect.md    # Wiki structure
├── agent-wiki-extractor.md    # Code documentation
└── agent-wiki-reviewer.md     # Docs quality review
```

**Annotations**:
- Each agent file is a Markdown file with YAML frontmatter
- Files use `agent-{name}.md` naming convention
- Agent definitions are consumed by AI systems

---

## Directory: `agents/teams/`

**Purpose**: 18 Golden Triangle team definitions

```
agents/teams/
├── backend-team/
│   ├── executor.md
│   ├── reviewer.md
│   └── techlead.md
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

**Annotations**:
- Each team has 3 role files: executor, reviewer, techlead
- Follows Golden Triangle pattern
- Each team folder uses `{domain}-team/` naming

---

## Directory: `commands/`

**Purpose**: 14 commands with 3 variants each

```
commands/
├── README.md                    # Command system overview
├── brainstorm.md              # Ideation command
├── brainstorm/
│   ├── fast.md                # Fast variant
│   ├── hard.md                # Hard variant
│   └── team.md                # Team variant
├── code.md                    # Code generation
├── code/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── cook.md                    # Implementation
├── cook/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── debug.md                   # Debugging
├── debug/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── deploy.md                  # Deployment
├── deploy/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── design.md                  # Design
├── design/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── docs.md                    # Documentation
├── docs/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── fix.md                     # Bug fixing
├── fix/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── plan.md                    # Planning
├── plan/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── report.md                  # Reporting
├── report/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── review.md                  # Code review
├── review/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── test.md                    # Testing
├── test/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── wiki.md                    # Wiki generation
└── wiki/
    ├── fast.md
    ├── hard.md
    └── team.md
```

**Annotations**:
- Each command has base + variant folder
- Base command (e.g., `cook.md`) = command definition
- Variant folder contains `fast.md`, `hard.md`, `team.md`

---

## Directory: `rules/`

**Purpose**: 8 orchestration rules

```
rules/
├── AGENTS.md      # Agent definitions and roles
├── CORE.md        # Core orchestration principles
├── ERRORS.md      # Error handling
├── PHASES.md      # Phase definitions
├── REFERENCE.md   # Quick reference
├── SKILLS.md      # Skill orchestration (HSOL)
├── TEAMS.md       # Team coordination
└── WIKI.md        # Wiki standards
```

**Annotations**:
- Each file contains Markdown documentation
- Rules are loaded in specific order
- CORE.md is loaded first

---

## Directory: `matrix-skills/`

**Purpose**: 4-tier skill classification for HSOL

```
matrix-skills/
├── foundation/     # ~200 core skills
├── professional/   # ~400 industry skills
├── specialized/    # ~500 domain skills
└── expert/         # ~300 advanced skills
```

**Annotations**:
- Organized by skill tier
- Each skill links to full skill in `skills/`
- Used by HSOL for skill injection

---

## Directory: `skills/`

**Purpose**: 1400+ domain skill definitions

```
skills/
├── README.md                    # Skill system overview
├── javascript/                 # JavaScript skills
├── typescript/                 # TypeScript skills
├── python/                     # Python skills
├── react/                      # React skills
├── nodejs/                     # Node.js skills
├── database/                   # Database skills
├── devops/                     # DevOps skills
├── security/                   # Security skills
└── ... (many more domains)
```

**Annotations**:
- Organized by technology/domain
- Each skill file contains knowledge
- Consumed by agents during execution

---

## Directory: `code-assistants/`

**Purpose**: 7 platform configurations

```
code-assistants/
├── antigravity/               # Antigravity/Gemini
│   ├── GEMINI.md
│   └── AntigravityGlobal.agent.md
├── claude/                    # Claude Code
│   └── CLAUDE.md
├── copilot/                   # GitHub Copilot
│   └── agent-assistant.agent.md
├── cursor/                    # Cursor
│   ├── .cursorrules
│   └── rules/
├── codex/                    # OpenAI Codex
│   ├── CODEX.md
│   ├── config.toml
│   ├── agents/
│   └── skills/
├── kiro/                     # Kiro AI
│   ├── KIRO.md
│   └── agents/
└── qwen/                    # Alibaba Qwen
    ├── QWEN.md
    └── agents/
```

**Annotations**:
- Each platform has platform-specific config
- Path placeholders for portability
- Each subfolder mirrors the tool's native structure
- Instruction files for platform integration

---

## Directory: `cli/`

**Purpose**: CLI installer

```
cli/
└── install.js      # Main CLI installer (1716 lines)
```

**Annotations**:
- Single JavaScript file
- Handles all platform installations
- Uses fsync for reliability

---

## Directory: `web/`

**Purpose**: React documentation site

```
web/
├── package.json              # Web dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── index.html               # HTML entry
├── public/
│   ├── favicon.svg
│   └── manifest.json
└── src/
    ├── main.tsx             # Application entry
    ├── App.tsx              # Root component
    ├── index.css            # Global styles
    ├── components/          # React components
    │   ├── seo/             # SEO components
    │   ├── badges/          # Badge components
    │   ├── dashboard/       # Dashboard components
    │   ├── hero/            # Hero section
    │   ├── layout/           # Layout components
    │   ├── workflow/         # Workflow visualization
    │   └── ...
    └── pages/               # Page components
        ├── Docs.tsx         # Documentation page
        ├── HomePage.tsx     # Home page
        ├── Installation.tsx # Installation guide
        └── features/        # Feature pages
            └── AgentTeams.tsx
```

**Annotations**:
- React 19 with TypeScript
- Vite 6 build tool
- Tailwind CSS 4 styling
- ReactFlow for workflow viz

---

## Directory: `documents/`

**Purpose**: Project documentation

```
documents/
├── knowledge-overview/       # Project overview
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
├── knowledge-domain/         # Domain model
│   ├── 00-index.md
│   ├── 01-entities.md
│   ├── 02-database-schema.md
│   ├── 03-api-contracts.md
│   └── 04-business-rules.md
├── knowledge-source-base/    # Source code
│   ├── 00-index.md
│   ├── 01-directory-structure.md
│   ├── 02-entry-points.md
│   ├── 03-key-modules.md
│   └── 04-configuration.md
└── knowledge-standards/     # Coding standards
    ├── 00-index.md
    ├── 01-code-style.md
    ├── 02-conventions.md
    ├── 03-git-workflow.md
    └── 04-testing-standards.md
```

---

## Evidence Sources

- Project root directory listing
- `agents/` — Agent definitions
- `agents/teams/` — Team definitions
- `commands/` — Command definitions
- `rules/` — Rule definitions
- `matrix-skills/` — Skill tiers
- `skills/` — Skill registry
- `code-assistants/` — Platform configs
- `cli/install.js` — CLI implementation
- `web/` — Web application
