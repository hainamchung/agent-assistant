# Conventions

> **File**: `documents/knowledge-standards/02-conventions.md`
> **Purpose**: File naming, directory structure, frontmatter format, command variant patterns

---

## Overview

This document defines the conventions for file naming, directory structure, frontmatter format, and command variant patterns used throughout Agent Assistant.

---

## Convention 1: File Naming

### JavaScript Files

| Type | Convention | Example |
|------|------------|---------|
| CLI scripts | kebab-case | `install.js`, `my-script.js` |
| Utilities | kebab-case | `file-utils.js` |
| Config | kebab-case | `.releaserc.json` |

### TypeScript Files

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `MyComponent.tsx` |
| Type files | kebab-case | `user-types.ts` |
| Utility files | kebab-case | `api-utils.ts` |

### Markdown Files

| Type | Convention | Example |
|------|------------|---------|
| Agent files | `agent-{name}.md` | `agent-backend-engineer.md` |
| Command files | `{name}.md` | `cook.md` |
| Rule files | SCREAMING_SNAKE | `CORE.md`, `PHASES.md` |
| General docs | kebab-case | `getting-started.md` |

### Directory Naming

| Type | Convention | Example |
|------|------------|---------|
| Directories | kebab-case | `my-directory/` |
| Team folders | `{name}-team/` | `backend-team/` |
| Variant folders | kebab-case | `fast/`, `hard/` |

---

## Convention 2: Directory Structure

### Agent Files
```
agents/
├── agent-{name}.md          # One file per agent
└── teams/
    └── {domain}-team/      # One folder per team
        ├── executor.md
        ├── reviewer.md
        └── techlead.md
```

### Command Files
```
commands/
├── {name}.md                # Base command
└── {name}/
    ├── fast.md             # Fast variant
    ├── hard.md             # Hard variant
    └── team.md            # Team variant
```

### Skills Organization
```
skills/
└── {domain}/
    └── {skill}.md         # One file per skill

matrix-skills/
├── foundation/
├── professional/
├── specialized/
└── expert/
```

---

## Convention 3: YAML Frontmatter Format

### Agent Frontmatter

```yaml
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
capabilities:
  - server-side-development
  - api-design
skills:
  required:
    - nodejs
    - python
    - databases
  preferred:
    - docker
    - redis
---
```

### Command Frontmatter

```yaml
---
command: /cook
purpose: Implementation of features and components
variants:
  - fast
  - hard
  - team
defaultAgents:
  - frontend-engineer
  - backend-engineer
qualityGates:
  fast:
    - code-review
  hard:
    - code-review
    - tests
    - linting
  team:
    - code-review
    - tests
    - linting
    - security-scan
---
```

### Team Frontmatter

```yaml
---
id: backend-team
name: Backend Team
domain: backend
techLead: tech-lead
executor: backend-engineer
reviewer: reviewer
---
```

### Frontmatter Rules

| Rule | Description |
|------|-------------|
| Delimiters | `---` at start and end |
| Indentation | 2 spaces |
| Lists | Inline `[a, b, c]` or multi-line |
| Strings | Generally unquoted |
| Booleans | `true` / `false` lowercase |
| Null | `~` or omitted |

---

## Convention 4: Command Variant Pattern

### Variant Naming

| Variant | Purpose | Agents | Use Case |
|---------|---------|--------|----------|
| fast | Quick execution | 2-3 | Simple tasks |
| hard | Complex execution | 5-8 | Full features |
| team | Critical execution | Golden Triangle | Architecture, security |

### Variant File Location

```
commands/{name}/
├── fast.md    # Fast variant
├── hard.md    # Hard variant
└── team.md    # Team variant
```

### Variant Content Template

```markdown
# {Command}: {Variant}

## Overview
[What this variant does]

## Execution
[How execution works]

## Agents
[Which agents participate]

## Quality Gates
[Quality requirements]
```

---

## Convention 5: Platform Path Placeholders

### Placeholder Format
`{{PLATFORM_PATH}}`

### Available Placeholders

| Placeholder | Platform | Resolution |
|-------------|----------|------------|
| `{{CURSOR_PATH}}` | Cursor | `~/.{TOOL}/` |
| `{{COPILOT_PATH}}` | GitHub Copilot | `~/.github/copilot/` |
| `{{CLAUDE_PATH}}` | Claude Code | `~/.claude/` |
| `{{ANTIGRAVITY_PATH}}` | Antigravity | `~/.antigravity/` |
| `{{CODEX_PATH}}` | Codex | `~/.codex/` |

### Usage Example

```markdown
# Installation
Copy files to:
- {{CURSOR_PATH}}/agents/
- {{COPILOT_PATH}}/agents/
```

---

## Convention 6: Version Numbers

### Format
SemVer: `MAJOR.MINOR.PATCH`

| Component | Increment For |
|-----------|--------------|
| MAJOR | Breaking changes |
| MINOR | New features |
| PATCH | Bug fixes |

### Current Version
`4.0.0`

---

## Convention 7: Documentation Structure

### 00-index.md Pattern

Every documentation folder should have a `00-index.md`:

```markdown
# Folder Name

> **Folder**: `path/to/folder/`
> **Purpose**: What this folder contains
> **Audience**: Who should read this

## Summary
[One-paragraph overview]

## Sub-Files
[Table of contents]

## Quick Facts
[Key metrics]

## Cross-References
[Links to related docs]

## Known Gaps
[Missing documentation]

## Evidence Sources
[Files this was derived from]
```

---

## Convention 8: Commit Message Format

Uses Conventional Commits:

```
{type}({scope}): {description}

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting |
| refactor | Code refactoring |
| perf | Performance |
| test | Adding tests |
| chore | Maintenance |

### Examples

```
feat(commands): add wiki command
fix(agents): correct backend-engineer skills
docs(rules): update AGENTS.md
refactor(cli): simplify path replacement
```

---

## Convention 9: Error Codes

### Format
`{CATEGORY}-{NUMBER}`

### Categories

| Category | Description |
|----------|-------------|
| INSTALL | Installation errors |
| AGENT | Agent errors |
| COMMAND | Command errors |
| SKILL | Skill errors |
| TEAM | Team errors |
| PLATFORM | Platform errors |

### Examples

```
INSTALL-001: Platform not supported
AGENT-001: Agent not found
COMMAND-001: Unknown command
```

---

## Evidence Sources

- `agents/` — Agent naming examples
- `commands/` — Command structure examples
- `rules/` — Rule naming examples
- `matrix-skills/` — Skill organization examples
- `code-assistants/` — Platform config examples
