# Wiki Conventions

> **Source**: `.wiki/AGENTS.md` | **Version**: 1.0

## Frontmatter

Every wiki page requires YAML frontmatter:

```yaml
---
title: {Page Title}
type: {summary|entity|concept|decision|comparison|chronicle|runbook|synthesis|postmortem}
tags: [tag1, tag2, tag3]
created: 2026-05-20
updated: 2026-05-20
---
```

## Wikilinks

Use `[[wikilinks]]` for cross-references. Every wikilink must resolve to an existing page.

```
# Good
See [[project-overview]] for details.
The `[[Agent System]]` manages task delegation.

# Bad — external links
See [GitHub](https://github.com/...)  # NO
```

## Source Citations

Every fact in entity and concept pages must cite source:

```
Source: `.documents/knowledge-architecture/01-system-overview.md:42`
```

## Page Structure by Type

### Summary Pages
1. Purpose & Overview
2. Architecture
3. Key Components
4. Entry Points
5. Related Pages

### Entity Pages
1. Definition (with exact signature)
2. Purpose
3. Parameters / Fields
4. Behavior
5. Dependencies
6. Consumers
7. Error Handling
8. Related Pages

### Concept Pages
1. Definition
2. Context & Motivation
3. Details
4. Related Entities
5. Related Pages

### Decision Pages
1. Context
2. Decision
3. Consequences
4. Alternatives Considered
5. Related Pages

## Naming Conventions

- File names: kebab-case, descriptive (e.g., `agent-orchestrator.md`)
- Entity names: match source exactly
- Wikilinks: match target page title exactly

## Security

Sensitive content is excluded from ingestion:
- `.env`, credentials files, keys, passwords
- Local/secret configs
- Private/personal data

## Quality Standards

- No `TODO`, `Unknown`, or placeholder content
- All facts verified against source
- Source citations for every claim
- Complete frontmatter on every page
