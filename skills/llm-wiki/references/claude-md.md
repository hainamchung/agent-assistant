# CLAUDE.md

## Wiki Instructions

This project uses an llm-wiki knowledge base. Read `AGENTS.md` for full conventions.

### Quick Reference

- **Ingest:** `python scripts/ingest.py <file> --category <cat>` → saves to `sources/`
- **Compile:** Read uncompiled sources → create wiki pages → update index → commit
- **Query:** Search wiki → answer → **mandatory feedback loop** (file new insights back)
- **Lint:** `python scripts/lint.py` → fix issues

### Key Rules

1. Every wiki page needs YAML frontmatter: `title`, `type`, `tags`, `created`, `updated`
2. Use `[[wikilinks]]` for cross-references
3. Log mutations to `log.md` — never log read-only queries
4. Check for existing pages before creating (avoid duplicates via `sources` frontmatter field)
5. Run `python scripts/update-index.py` after any wiki changes
6. **Conflict detection:** Never silently overwrite contradicting content. Add `> ⚠️ Conflict` blockquote with source attribution
7. **Cascade updates:** After compiling new sources, scan existing wiki pages for affected content and update them
