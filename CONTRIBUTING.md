# Contributing to agent-assistant

Thank you for your interest in contributing to agent-assistant! This guide will help you get started.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contribution Types](#contribution-types)
- [Coding Standards](#coding-standards)
- [Testing & Validation](#testing--validation)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

## Getting Started

New to the project? Start with our [Contributor Onboarding Guide](docs/ONBOARDING.md) for hands-on tutorials.

## Development Setup

### Prerequisites
- Node.js 18+
- Git

### Installation
```bash
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant
npm install
```

### Verify Setup
```bash
node scripts/lint-agents.js       # 0 errors expected
node scripts/simulate.js          # All agents PASS expected
wc -w rules/RUNTIME.md           # ≤ 3,200 words expected
```

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `agents/` | Agent definitions (21 specialists) |
| `commands/` | Command workflows + variants |
| `rules/` | Protocol files (RUNTIME.md + on-demand) |
| `guardrails/` | Safety constraint modules |
| `matrix-skills/` | Skill domain definitions (YAML) |
| `topologies/` | Orchestration topology templates |
| `personas/` | Agent personality profiles |
| `scripts/` | Tooling (linter, simulator, generator) |
| `cli/` | CLI tools (create, install) |
| `platform-packs/` | Platform-specific optimization profiles |

## Contribution Types

### 1. Add a New Agent
- Start from `AGENT-TEMPLATE.md` (schema reference for new agents)
- **Note**: The project has two template files:
  - `AGENT-TEMPLATE.md` — Schema reference with field documentation (for humans)
  - `AGENT.template.md` — Mustache template used by `cli/create.js` (for automation)
- Place in `agents/{name}.md`
- Required: frontmatter with `schema-version: "1.0"`
- Validate: `node scripts/lint-agents.js` + `node scripts/simulate.js`

### 2. Add a New Command
- Start from `COMMAND-TEMPLATE.md`
- Router: `commands/{name}.md`
- Variants: `commands/{name}/fast.md`, `hard.md`, `team.md`
- See existing commands for examples

### 3. Add/Extend Skills
- Edit or create files in `matrix-skills/`
- Format: YAML with `_index.yaml` registration
- Reference: `rules/SKILLS-LITE.md`

### 4. Improve Documentation
- Fix typos, clarify docs, add examples
- Check `// WHERE:` directives in plan files for guidance

### 5. Add Lint Rules
- Extend `scripts/lint-agents.js` or create modules in `scripts/lint-rules/`
- Rule naming: R001-R016 (core), R100-R199 (deprecated), R200-R299 (schema)

## Coding Standards

### Markdown Files
- All files: English content
- Frontmatter: YAML with `schema-version: "1.0"` required
- Sections: use `##` headers with emoji prefixes for protocol files
- Line length: no hard limit, but keep paragraphs readable

### JavaScript Files
- ES modules or CommonJS (match existing file)
- No external dependencies without approval
- Exit codes: 0 = success, 1 = failure (for CI)

### RUNTIME.md Rules
- ⛔ **DO NOT modify RUNTIME.md** without explicit plan approval
- Word budget: ≤ 3,200 words (measured via `wc -w rules/RUNTIME.md`)
- Current usage: ~3,200 words (100% of budget) — at capacity, consider removing content before adding
- New protocol content → on-demand files in `rules/`
- Consider extracting large tables (e.g., DELIVERABLES) to on-demand files if approaching limit

## Testing & Validation

Before submitting a PR, run ALL of these:

```bash
# 1. Lint check
node scripts/lint-agents.js
# Must: 0 errors, ≤ 20 warnings

# 2. Agent simulation
node scripts/simulate.js
# Must: all agents PASS

# 3. Word budget check
wc -w rules/RUNTIME.md
# Must: ≤ 3,200

# 4. Entry point generation
node scripts/generate-entry-points.js
# Must: no errors
```

## Pull Request Process

1. **Branch**: Create feature branch from `main`
2. **Commit**: Use format `sprint{N}: {description} ({idea-ids})`
3. **Test**: Run all validation commands above
4. **PR**: Submit with description explaining changes + which idea(s) it implements
5. **Review**: Address reviewer feedback
6. **Merge**: Squash merge preferred

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful, constructive, and professional in all interactions.
