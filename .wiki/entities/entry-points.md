---
title: Entry Points
description: "CLI and web entry points, command loading, agent loading, and platform configuration for Agent Assistant"
category: entity
tags: [entry-points, cli, web, commands, agents, routing]
related:
  - [[CLI Installer]]
  - [[Web Application]]
  - [[Command System]]
  - [[Directory Structure]]
  - [[Configuration Reference]]
  - [[Agent System]]
---

# Entry Points

Entry points are the primary access mechanisms that allow users, platforms, and other systems to interact with Agent Assistant. This page documents all entry points including the CLI installer, web application, command routing, and agent loading mechanisms.

---

## Overview

Agent Assistant provides four distinct entry point categories:

| Category | Primary File(s) | Purpose |
|----------|-----------------|---------|
| [[CLI Installer]] | `cli/install.js` | Installation and platform management |
| [[Web Application]] | `web/src/main.tsx`, `web/index.html` | Documentation site and PWA |
| [[Command System]] | `commands/*.md` | User command routing |
| [[Agent System]] | `agents/*.md` | Agent dispatch and loading |

**Source**: `documents/knowledge-source-base/02-entry-points.md:1-13`

---

## CLI Entry Points

### Primary File

| Property | Value |
|----------|-------|
| File | `cli/install.js` |
| Lines | 1716 |
| Type | Standalone Node.js (no framework dependencies) |
| Shebang | `#!/usr/bin/env node` |

**Source**: `cli/install.js:1-24`

### CLI Purpose

The [[CLI Installer]] handles the following operations:

- **Installation**: Deploy Agent Assistant to 7 AI coding platforms
- **Uninstallation**: Remove installations from specified platforms
- **Listing**: Display current installation status
- **Path Replacement**: Convert portable placeholders to platform-specific paths
- **Progress Tracking**: Real-time file count and status updates
- **Verification**: Ensure all files are written correctly
- **Summary Reporting**: Display installation statistics

**Source**: `cli/install.js:1-24`, `documents/knowledge-source-base/02-entry-points.md:26-30`

### Supported Platforms

| Platform | Home Directory | Rules Path | Skills Path | Agents Path |
|----------|---------------|------------|-------------|-------------|
| Cursor | `~/.cursor` | `~/.cursor/rules` | `~/.cursor/skills` | `~/.cursor/agents` |
| GitHub Copilot | `~/.copilot` | `~/.copilot/rules` | `~/.copilot/skills` | `~/.copilot/agents` |
| Claude Code | `~/.claude` | `~/.claude/rules` | `~/.claude/skills` | `~/.claude/agents` |
| Antigravity | `~/.antigravity` | `~/.antigravity/rules` | `~/.antigravity/skills` | `~/.antigravity/agents` |
| Codex | `~/.codex` | `~/.codex/rules` | `~/.codex/skills` | `~/.codex/agents` |

**Source**: `cli/install.js:50-157` (TOOLS configuration object)

### CLI Usage

```bash
# Install to all platforms
node cli/install.js

# Install to specific platform
node cli/install.js cursor
node cli/install.js copilot

# List installed platforms
node cli/install.js --list
node cli/install.js list

# Uninstall from all platforms
node cli/install.js --uninstall

# Uninstall from specific platform
node cli/install.js --uninstall cursor
```

**Source**: `cli/install.js:14-17`, `documents/knowledge-source-base/02-entry-points.md:34-43`

### CLI Key Functions

| Function | Purpose | Lines |
|----------|---------|-------|
| `parseArgs()` | Parse command-line arguments | Core |
| `install()` | Main installation logic | Core |
| `uninstall()` | Remove installations | Core |
| `list()` | List current installations | Core |
| `replacePaths()` | Replace platform path placeholders | Core |
| `copyFiles()` | Copy files to target platforms | Core |
| `progress()` | Display progress updates | Core |
| `verify()` | Verify all files written | Core |
| `getVSCodePromptsFolder()` | Platform-specific prompts path | `cli/install.js:39-48` |

**Source**: `documents/knowledge-source-base/02-entry-points.md:69-79`

### CLI Architecture

```
cli/install.js
    │
    ├── Parse Arguments (parseArgs)
    │
    ├── Command Router
    │   ├── install → Install to platform(s)
    │   ├── uninstall → Remove installations
    │   └── list → Display status
    │
    ├── Platform Detection
    │   ├── cursor
    │   ├── copilot
    │   ├── antigravity
    │   ├── claude
    │   └── codex
    │
    ├── Path Replacement Engine
    │   └── Replace {TOOL} and {HOME} placeholders
    │
    ├── File Copy System
    │   └── Copy to platform-specific directories
    │
    └── Progress & Verification
        ├── Progress bar with file count
        └── Verification phase
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:45-66`

---

## Web Application Entry Points

### HTML Entry Point

| Property | Value |
|----------|-------|
| File | `web/index.html` |
| Type | Progressive Web App (PWA) |
| Framework | Vite + React 19 |
| CSS | Tailwind CSS + Inter + Fira Code fonts |

**Source**: `web/index.html:1-74`

#### HTML Key Features

- **Theme**: Dark mode (`#0a0a0a` background)
- **Meta Tags**: SEO-optimized with Open Graph and Twitter cards
- **PWA Manifest**: Links to `web/public/manifest.json`
- **Font Loading**: Inter for UI, Fira Code for terminal/code
- **Root Element**: `<div id="root"></div>` for React mounting
- **Entry Script**: `<script type="module" src="/src/main.tsx">`

**Source**: `web/index.html:1-73`

### React Entry Point

| Property | Value |
|----------|-------|
| File | `web/src/main.tsx` |
| Purpose | Bootstrap React application |
| Providers | HelmetProvider, BrowserRouter |
| Root Element | `#root` |

**Source**: `web/src/main.tsx:1-22`

#### Main.tsx Bootstrap Sequence

1. Locate `#root` element in DOM
2. Throw error if root element missing
3. Create React root with `createRoot()`
4. Wrap app in `StrictMode` for development checks
5. Apply `HelmetProvider` for SEO head management
6. Apply `BrowserRouter` for client-side routing
7. Render `App` component

**Source**: `web/src/main.tsx:8-22`

### PWA Manifest

| Property | Value |
|----------|-------|
| File | `web/public/manifest.json` |
| Name | Agent Assistant |
| Display | standalone |
| Background Color | `#0a0a0a` |
| Theme Color | `#0a0a0a` |
| Categories | developer tools, productivity, utilities |

**Source**: `web/public/manifest.json:1-30`

### Web Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `HomePage.tsx` | Landing page |
| `/docs` | `Docs.tsx` | Documentation viewer |
| `/installation` | `Installation.tsx` | Installation guide |
| `/features` | Feature pages | Feature showcase |
| `/features/agent-teams` | `AgentTeams.tsx` | Agent teams feature |
| `/features/one-time-setup` | `OneTimeSetup.tsx` | Setup instructions |
| `/features/sub-agent-orchestration` | `SubAgentOrchestration.tsx` | Orchestration info |
| `/features/multi-platform-support` | `MultiPlatform.tsx` | Platform support |
| `/features/matrix-skills` | `MatrixSkills.tsx` | Skills catalog |
| `/features/specialist-agents` | `SpecialistAgents.tsx` | Agent descriptions |
| `/features/commands-workflows` | `Commands.tsx` | Command documentation |
| `/features/quality-gates` | `QualityGates.tsx` | Quality processes |
| `/features/workflow` | `Workflow.tsx` | Workflow documentation |

**Source**: `web/src/App.tsx:34-56`

### Web Application Structure

```
web/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Root component with routing
│   ├── pages/                 # Route components
│   │   ├── HomePage.tsx
│   │   ├── Docs.tsx
│   │   ├── Installation.tsx
│   │   └── features/
│   │       └── [8 feature pages]
│   ├── components/            # Reusable components
│   │   ├── layout/
│   │   ├── seo/
│   │   └── [other components]
│   └── styles/                # CSS files
├── package.json
├── vite.config.ts
└── tsconfig.json
```

**Source**: `documents/knowledge-source-base/01-directory-structure.md`, `web/src/App.tsx`

---

## Command Entry Points

### Command Files Location

All command definitions reside in the `commands/` directory at the project root.

**Source**: `documents/knowledge-source-base/02-entry-points.md:130-131`

### Available Commands

| Command | Variants | Purpose |
|---------|----------|---------|
| `/cook` | fast, hard, team | Implementation |
| `/code` | fast, hard, team | Code generation |
| `/fix` | fast, hard, team | Bug fixes |
| `/plan` | fast, hard, team | Planning |
| `/debug` | fast, hard, team | Debugging |
| `/test` | fast, hard, team | Testing |
| `/review` | fast, hard, team | Code review |
| `/docs` | fast, hard, team | Documentation |
| `/design` | fast, hard, team | Design |
| `/deploy` | check, preview, production, rollback | Deployment |
| `/report` | fast, hard, team | Reporting |
| `/wiki` | fast, hard, team | Wiki generation |
| `/brainstorm` | fast, hard, team | Brainstorming |
| `/ask` | fast, hard, team | Q&A |

**Source**: `documents/knowledge-source-base/01-directory-structure.md`, `commands/wiki.md`

### Command File Structure

Each command follows this Markdown structure with YAML frontmatter:

```markdown
---
command: /wiki
purpose: Wiki Generation
variants: [fast, hard, team]
agents: [wiki-architect, wiki-extractor, wiki-reviewer]
execution-mode: execute
---

# Wiki Command

## Overview
...
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:148-162`

### Command Variant Organization

```
commands/wiki/
├── fast.md     # Fast variant (2-3 agents)
├── hard.md     # Hard variant (5-8 agents)
└── team.md     # Team variant (Golden Triangle)
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:164-172`

### Command Routing Logic

```
IF user invokes /wiki:fast  → LOAD commands/wiki/fast.md  → EXECUTE
IF user invokes /wiki:hard  → LOAD commands/wiki/hard.md  → EXECUTE
IF user invokes /wiki:team  → LOAD commands/wiki/team.md   → EXECUTE
IF user invokes /wiki only  → Assess scope → Route to variant
```

**Source**: `commands/wiki.md:114-119`

---

## Agent Entry Points

### Agent Files Location

All agent definitions reside in the `agents/` directory at the project root.

**Source**: `documents/knowledge-source-base/02-entry-points.md:176-178`

### Available Agents (24 total)

| Agent | Role | Reports To |
|-------|------|------------|
| `backend-engineer` | Backend implementation | tech-lead |
| `frontend-engineer` | Frontend implementation | tech-lead |
| `tester` | Testing | tech-lead |
| `reviewer` | Code review | tech-lead |
| `debugger` | Debugging | tech-lead |
| `security-engineer` | Security auditing | tech-lead |
| `performance-engineer` | Performance optimization | tech-lead |
| `wiki-reviewer` | Wiki quality assurance | tech-lead |
| `planner` | Planning | tech-lead |
| `brainstormer` | Ideation | tech-lead |
| `business-analyst` | Business analysis | tech-lead |
| `designer` | UI/UX design | tech-lead |
| `devops-engineer` | Infrastructure | tech-lead |
| `docs-manager` | Documentation | tech-lead |
| `project-manager` | Project coordination | tech-lead |
| `reporter` | Reporting | tech-lead |
| `researcher` | Research | tech-lead |
| `scouter` | Codebase exploration | tech-lead |
| `wiki-architect` | Wiki architecture | tech-lead |
| `wiki-extractor` | Wiki content extraction | wiki-architect |
| `database-architect` | Database design | tech-lead |
| `mobile-engineer` | Mobile development | tech-lead |
| `game-engineer` | Game development | tech-lead |
| `tech-lead` | Orchestration | (root) |

**Source**: `documents/knowledge-source-base/01-directory-structure.md`, `rules/AGENTS.md`

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
...
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:196-215`

### Agent Loading Process

```
Rule Engine
    │
    ├── Read agents/*.md from filesystem
    │
    ├── Parse YAML frontmatter
    │   ├── id
    │   ├── name
    │   ├── role
    │   ├── profile
    │   ├── reportsTo
    │   └── consults
    │
    ├── Inject skills via HSOL
    │
    └── Register agent in orchestration layer
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:182-194`

---

## Rule Entry Points

### Rule Files Location

All rule definitions reside in the `rules/` directory at the project root.

**Source**: `documents/knowledge-source-base/02-entry-points.md:219-221`

### Rule Loading Order

| Order | File | Purpose |
|-------|------|---------|
| 1 | `CORE.md` | Core principles and 10 laws |
| 2 | `PHASES.md` | Phase execution order |
| 3 | `AGENTS.md` | Agent handling and tiered execution |
| 4 | `SKILLS.md` | Skill orchestration via HSOL |
| 5 | `TEAMS.md` | Golden Triangle team coordination |
| 6 | `ERRORS.md` | Error classification and handling |
| 7 | `REFERENCE.md` | Quick reference for common operations |
| 8 | `WIKI.md` | Wiki documentation standards |

**Source**: `documents/knowledge-source-base/02-entry-points.md:224-235`

### Rule Loading Sequence

```
Rule Engine
    │
    ├── Load CORE.md (first, establishes identity)
    │
    ├── Load PHASES.md (execution workflow)
    │
    ├── Load AGENTS.md (agent definitions)
    │
    ├── Load SKILLS.md (HSOL skill matrix)
    │
    ├── Load TEAMS.md (team coordination)
    │
    ├── Load ERRORS.md (error handling)
    │
    ├── Load REFERENCE.md (quick lookup)
    │
    ├── Load WIKI.md (documentation standards)
    │
    └── Apply rules in order (later rules override earlier)
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:237-254`

---

## Skill Entry Points (HSOL)

### Skill Files Location

Skills are organized in two locations:
- `skills/` — Domain-organized skills for human navigation
- `matrix-skills/` — HSOL-optimized skills by tier

**Source**: `documents/knowledge-source-base/02-entry-points.md:258-261`

### Skill Tier Organization

| Tier | Path | Count | Purpose |
|------|------|-------|---------|
| Foundation | `matrix-skills/foundation/` | ~200 | Universal skills loaded first |
| Professional | `matrix-skills/professional/` | ~400 | Domain-general skills |
| Specialized | `matrix-skills/specialized/` | ~500 | Technology-specific skills |
| Expert | `matrix-skills/expert/` | ~300 | Advanced skills (on-demand) |

**Source**: `documents/knowledge-source-base/02-entry-points.md:279-287`

### Skill Loading Process

```
Agent
    │
    ├── Request skills for context
    │
    HSOL Engine
    │
    ├── Query matrix-skills/ for relevant tiers
    │
    ├── Load foundation tier (always)
    │
    ├── Load professional tier (if relevant)
    │
    ├── Load specialized tier (if domain match)
    │
    ├── Load expert tier (only if requested)
    │
    └── Inject skills into agent context
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:263-277`

---

## Platform Configuration Entry Points

### Config Files Location

Platform configurations reside in the `code-assistants/` directory.

**Source**: `documents/knowledge-source-base/02-entry-points.md:291-293`

### Platform Configurations

| Platform | Config Directory | Platform File | Config File |
|----------|-----------------|---------------|-------------|
| Cursor | `code-assistants/cursor/` | `CURSOR.md` | `config.toml` |
| GitHub Copilot | `code-assistants/copilot/` | `COPILOT.md` | `config.toml` |
| Claude Code | `code-assistants/claude/` | `CLAUDE.md` | `config.toml` |
| Antigravity | `code-assistants/antigravity/` | `GEMINI.md` | `config.toml` |
| Codex | `code-assistants/codex/` | `CODEX.md` | `config.toml` |

**Source**: `documents/knowledge-source-base/02-entry-points.md:296-304`, `documents/knowledge-source-base/01-directory-structure.md:201-222`

### Config Loading Process

```
CLI
    │
    ├── Detect target platform
    │
    ├── Load platform configuration
    │
    ├── Read config metadata
    │
    └── Apply path replacements
        │
        ├── Replace {TOOL} placeholders
        ├── Replace {HOME} placeholders
        └── Convert to absolute paths
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:306-318`

---

## Module Exports

### CLI Module Exports

```javascript
// cli/install.js
module.exports = {
  install,      // Install to platforms
  uninstall,     // Remove installations
  list,          // List installations
  replacePaths,  // Path replacement utility
  copyFiles,     // File copy system
  verify,        // Verification phase
  progress       // Progress tracking
};
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:323-334`

### Web Module Entry

```typescript
// web/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap sequence
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
```

**Source**: `documents/knowledge-source-base/02-entry-points.md:336-349`

---

## Related Pages

- [[CLI Installer]] — Full CLI installer documentation
- [[Web Application]] — Web application architecture
- [[Command System]] — Command routing and variants
- [[Agent System]] — Agent definitions and loading
- [[Directory Structure]] — Complete directory layout
- [[Configuration Reference]] — Platform configuration details
