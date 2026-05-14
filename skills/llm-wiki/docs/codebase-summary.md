# Codebase Summary: llm-wiki

## Project Overview

**llm-wiki** is a git-based markdown wiki system for software teams. No server, no database — pure Python scripts, markdown files, and git. Integrates with any AI tool (Claude Code, Cursor, Copilot, Gemini).

**Type:** Knowledge management system | **Language:** Python 3.11+, Markdown | **License:** MIT

## Architecture

```
project-repo/
├── .wiki/                      # Wiki root (initialized in target project)
│   ├── AGENTS.md              # Universal AI schema
│   ├── CLAUDE.md              # Claude-specific instructions
│   ├── .llm-wiki.toml         # Configuration
│   ├── index.md               # Auto-maintained catalog
│   ├── log.md                 # Append-only mutation log
│   ├── sources/               # Raw ingested documents (8 categories)
│   │   ├── product/ design/ architecture/ development/
│   │   └── operations/ meetings/ references/ data/
│   ├── wiki/                  # AI-generated pages (9 types)
│   │   ├── summaries/ entities/ concepts/ comparisons/
│   │   ├── syntheses/ chronicles/ decisions/ runbooks/
│   │   ├── postmortems/
│   │   └── glossary.md
│   └── scripts/               # Link to llm-wiki scripts
└── llm-wiki/                  # This repository
    ├── scripts/               # Python utilities
    ├── skill/                 # Claude Code skill
    ├── docs/                  # Documentation
    └── plans/                 # Implementation plans & reports
```

## Core Components

### Scripts (`scripts/`)

| File | LOC | Purpose |
|------|-----|---------|
| `config.py` | 98 | Shared constants, TOML parser, wikilink resolver |
| `init-wiki.py` | 179 | Create .wiki structure in target project |
| `ingest.py` | 123 | Parse documents (PDF, HTML, TXT, Markdown) → markdown sources |
| `update-index.py` | 131 | Rebuild index.md catalog from wiki pages |
| `lint.py` | 226 | Check wiki health (orphans, broken links, stale pages) |
| `stats.py` | 127 | Display wiki statistics (page counts, density, recent activity); `--benchmark` flag shows quality metrics |
| `graph.py` | 146 | Generate Mermaid knowledge graph from wikilinks |

**Key Utilities:**
- **Frontmatter parser:** YAML extraction for page metadata
- **Wikilink resolver:** Find files referenced in [[wikilink]] syntax
- **Config loader:** Parse .llm-wiki.toml from any wiki root

### Claude Code Skill (`skill/`)

**Command prefix:** `/wiki`

| Command | Purpose |
|---------|---------|
| `/wiki init [--name] [--language] [--with-qmd]` | Initialize wiki in project |
| `/wiki ingest <file> [--category <cat>]` | Parse document → source |
| `/wiki compile` | AI reads sources → creates wiki pages |
| `/wiki query <question>` | Search wiki → answer (feeds new insights back) |
| `/wiki digest <topic>` | Deep cross-source synthesis |
| `/wiki lint` | Check wiki health |
| `/wiki status` | Show statistics |
| `/wiki graph` | Generate knowledge graph |

**Templates:** Page templates for all 9 page types (summary, entity, concept, etc.)

### Documentation (`docs/`)

| File | Audience | Purpose |
|------|----------|---------|
| `getting-started.md` | New users | Setup & first ingest/compile |
| `for-developers.md` | Technical lead | Directory structure, scripts reference, config schema |
| `for-pm-po.md` | PM/PO | Use cases, benefits, workflow overview |
| `tool-specific-setup.md` | Tool users | Integration with Claude Code, Cursor, Copilot, etc. |

## Key Constants & Schemas

**Source categories (8):** product, design, architecture, development, operations, meetings, references, data

**Wiki page types (9):** summary, entity, concept, comparison, synthesis, chronicle, adr, runbook, postmortem

**Required frontmatter:** `title`, `type`, `tags`, `created`, `updated`
**Recommended frontmatter:** `citations` (source references)

**Wiki structure:** Organized by type not category (e.g., `wiki/summaries/`, `wiki/concepts/`)

## Workflows

1. **Ingest** — Parse docs into `sources/` (script-driven, no AI)
2. **Compile** — AI reads sources → creates wiki pages with wikilinks
3. **Query** — AI searches wiki → synthesizes answer → feeds new insights back
4. **Digest** — Deep analysis across all sources on a topic
5. **Lint** — Check health (broken links, orphaned pages, stale content)
6. **Graph** — Visualize knowledge network as Mermaid diagram

## Configuration

`.llm-wiki.toml` managed sections:

- `[wiki]` — Project name, language, root path
- `[paths]` — sources, wiki, scripts, index, log (relative to wiki root)
- `[frontmatter]` — Required fields, allowed page types
- `[lint]` — Stale page threshold (days), backlink requirements
- `[qmd]` — Optional semantic search via qmd library

## Dependencies

- **Runtime:** Python 3.11+, git, PyYAML, markitdown (document parsing)
- **Optional:** qmd (semantic search), Mermaid (knowledge graph)

## Design Principles

- **Zero infrastructure:** Pure git repo + files, no API/server
- **Tool-agnostic:** Works with any AI tool reading markdown
- **Append-only log:** All mutations tracked for audit trail
- **AI-native schema:** AGENTS.md readable by any AI tool, not just Claude
- **Progressive disclosure:** Ingest → compile → query → digest workflow
- **Modular pages:** Each page has complete metadata, stands alone or links to others

## Entry Points

- **New project:** `python scripts/init-wiki.py --target /path --name "Name"`
- **Ingest:** `python scripts/ingest.py <file> --category <cat>`
- **AI interaction:** Open AI tool in project dir, reads `.wiki/AGENTS.md`
- **Manual checks:** `python scripts/lint.py`, `python scripts/stats.py`

---

**Last Updated:** 2026-04-07
