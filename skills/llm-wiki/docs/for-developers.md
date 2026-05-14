# For Developers

## Directory Structure

```
.wiki/
├── AGENTS.md              # Schema — AI tools read this
├── CLAUDE.md              # Claude-specific instructions
├── .llm-wiki.toml         # Config (paths, lint rules, qmd)
├── index.md               # Auto-maintained page catalog
├── log.md                 # Append-only mutation log
├── sources/               # Raw parsed docs (8 categories)
│   ├── product/ design/ architecture/ development/
│   └── operations/ meetings/ references/ data/
├── wiki/                  # AI-generated pages (9 types + glossary)
│   ├── summaries/ entities/ concepts/ comparisons/
│   ├── syntheses/ chronicles/ decisions/ runbooks/
│   └── postmortems/ glossary.md
└── scripts/               # Python utilities
```

## Scripts Reference

All scripts use argparse. Run `python <script> --help` for full options.

| Script | Usage | Exit Code |
|--------|-------|-----------|
| `init-wiki.py` | `--name "Name" [--obsidian] [--language en] [--target .]` | 0 |
| `ingest.py` | `<file> --category cat [--output dir/]` | 0/1 |
| `update-index.py` | `[--dry-run]` | 0 |
| `lint.py` | `[--fix] [--strict]` | 0=clean, 1=issues |
| `stats.py` | `[--json] [--benchmark]` | 0 |
| `graph.py` | `[--output path] [--dry-run]` | 0 |

## Configuration

`.llm-wiki.toml` sections:

```toml
[wiki]
name = "Project Name"
language = "en"        # Page language
root = ".wiki"         # Wiki root path

[paths]                # All relative to wiki root
sources = "sources"
wiki = "wiki"

[frontmatter]
required_fields = ["title", "type", "tags", "created", "updated"]
page_types = ["summary", "entity", "concept", ...]

[lint]
stale_days = 30        # Pages older than this = stale
require_backlinks = true
require_sources = true

[qmd]
enabled = false
collection_name = "wiki"
auto_embed = false     # Auto-run qmd embed after ingest
```

## Adding New Page Types

1. Add type name to `.llm-wiki.toml` → `[frontmatter].page_types`
2. Create wiki subdir: `mkdir .wiki/wiki/<type-plural>/`
3. Add `_template.md` with frontmatter schema
4. Update AGENTS.md page types table
5. Run `python scripts/lint.py` to verify

## Frontmatter Schema

Every wiki page requires:
```yaml
---
title: "Page Title"
type: summary          # One of page_types
tags: [tag1, tag2]
created: 2026-04-07
updated: 2026-04-07
citations: []          # Source references (optional but recommended)
---
```

Optional fields vary by type (see `_template.md` in each subdir).

## Cross-References

Use `[[page-name]]` syntax (Obsidian compatible). Target = filename without `.md`.

```markdown
This relates to [[api-gateway-overview]] and [[auth-flow]].
```

`scripts/lint.py` checks for broken links.

## qmd Search (Strongly Recommended)

For wikis with 50+ pages (essential for 100+):
```bash
npm install -g @tobilu/qmd
bash scripts/setup-qmd.sh
qmd query "how does auth work?" --collection wiki
```

## Contributing

- Keep scripts under 200 lines
- No LLM API calls in scripts (pure file processing)
- Use `config.py` for shared utilities
- Run `python scripts/lint.py` before committing wiki changes
