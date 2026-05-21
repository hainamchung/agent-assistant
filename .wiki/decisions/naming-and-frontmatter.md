---
title: Naming & Frontmatter
type: decision
tags: [naming, conventions, frontmatter, yaml, standards]
created: 2026-05-20
updated: 2026-05-20
---

# Naming & Frontmatter

Naming and frontmatter conventions ensure consistent, discoverable files across the Agent Assistant codebase. These conventions apply to files, directories, and the YAML frontmatter within Markdown files.

---

## File Naming Conventions

### JavaScript and TypeScript Files

| Type | Convention | Example |
|------|-----------|---------|
| Scripts and utilities | kebab-case | `install-agent.js`, `parse-command.ts` |
| React components | PascalCase | `AgentCard.tsx`, `TeamDiagram.tsx` |
| Test files | `*.test.js` or `*.test.ts` | `install.test.js` |
| Type definitions | `*.d.ts` | `agent.d.ts` |

### Markdown Files

| Type | Convention | Example |
|------|-----------|---------|
| Agent definitions | `agent-{name}.md` | `agent-backend-engineer.md` |
| Rule files | SCREAMING_SNAKE | `AGENTS.md`, `CORE.md` |
| Command files | kebab-case | `fast.md`, `hard.md` |
| Wiki pages | kebab-case | `golden-triangle.md`, `skill-system.md` |
| Documentation | Sentence case or kebab-case | `Getting Started.md` or `getting-started.md` |

### Directory Names

All directories use kebab-case: `knowledge-architecture/`, `agent-teams/`, `code-assistants/`.

### Team Directories

Team directories use kebab-case with `-team` suffix: `backend-team/`, `frontend-team/`, `wiki-team/`.

---

## Platform Path Placeholders

Path placeholders follow the `{{PLATFORM_NAME_PATH}}` format:

| Platform | Placeholder | Resolved Path Example |
|----------|-------------|----------------------|
| Cursor | `{{CURSOR_PATH}}` | `~/.cursor/` |
| GitHub Copilot | `{{COPILOT_PATH}}` | `~/.github/copilot/` |
| Claude Code | `{{CLAUDE_PATH}}` | `~/.claude/` |
| Antigravity/Gemini | `{{ANTIGRAVITY_PATH}}` | `~/.antigravity/` |
| Codex | `{{CODEX_PATH}}` | `~/.codex/` |

---

## YAML Frontmatter

### Agent Frontmatter Fields

```yaml
---
name: backend-engineer
role: implementation
profile: "Senior backend engineer specializing in server-side development, API design, and database integration."
reportsTo: tech-lead
consults: [frontend-engineer, database-architect]
standard: javascript
capabilities: [api-design, database-integration, server-optimization]
skills:
  required: [nodejs, python, databases]
  preferred: [docker, redis]
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Agent identifier (unique) |
| `role` | string | Yes | Role category: implementation, architecture, quality, planning, support |
| `profile` | string | Yes | Human-readable description |
| `reportsTo` | string | Yes | Direct manager agent |
| `consults` | list | No | Agents this agent collaborates with |
| `standard` | string | No | Primary coding standard |
| `capabilities` | list | No | Capability keywords |
| `skills.required` | list | No | Required skill identifiers |
| `skills.preferred` | list | No | Preferred skill identifiers |

**Source**: `documents/knowledge-standards/02-conventions.md:89-157`

### Command Frontmatter Fields

```yaml
---
command: /cook
purpose: "Implement features and components through code generation."
variants: [fast, hard, team]
defaultAgents: [frontend-engineer, backend-engineer]
qualityGates: [lint, test, review]
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command` | string | Yes | Command name including leading `/` |
| `purpose` | string | Yes | Human-readable description |
| `variants` | list | Yes | Available variants: fast, hard, team |
| `defaultAgents` | list | Yes | Agents used by default |
| `qualityGates` | list | No | Quality checks to run |

### Team Frontmatter Fields

```yaml
---
id: backend-team
name: Backend Team
domain: Backend
techLead: tech-lead
executor: backend-engineer
reviewer: reviewer
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Team identifier (kebab-case) |
| `name` | string | Yes | Human-readable name |
| `domain` | string | Yes | Domain area |
| `techLead` | string | Yes | Tech Lead agent name |
| `executor` | string | Yes | Executor agent name |
| `reviewer` | string | Yes | Reviewer agent name |

### Wiki Page Frontmatter Fields

```yaml
---
title: Page Title
type: summary
tags: [tag-one, tag-two]
created: 2026-05-20
updated: 2026-05-20
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Page title |
| `type` | string | Yes | Wiki page type |
| `tags` | list | No | Categorization tags |
| `created` | date | Yes | Creation date (YYYY-MM-DD) |
| `updated` | date | Yes | Last update date (YYYY-MM-DD) |

**Wiki Types**: summary, entity, concept, decision, comparison, chronicle, runbook, synthesis, postmortem

---

## Error Codes

Error codes follow the `{CATEGORY}-{NUMBER}` format:

| Category | Prefix | Example |
|----------|--------|---------|
| Installation | `INSTALL` | `INSTALL-001` |
| Agent | `AGENT` | `AGENT-001` |
| Command | `COMMAND` | `COMMAND-001` |
| Skill | `SKILL` | `SKILL-001` |
| Team | `TEAM` | `TEAM-001` |
| Platform | `PLATFORM` | `PLATFORM-001` |

---

## Related Pages

- [[Code Style Guide]] — Coding conventions and formatting rules
