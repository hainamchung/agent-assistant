# Tool-Specific Setup

llm-wiki works with any AI tool that reads markdown. AGENTS.md is the universal schema.

## Claude Code

**Recommended.** Full integration via `/wiki` skill.

```bash
# Install skill
bash skill/install.sh

# Use commands
/wiki init --name "My Project"
/wiki ingest meeting.pdf --category meetings
/wiki compile
/wiki query "how does auth work?"
/wiki lint
/wiki status
```

Claude also reads `.wiki/CLAUDE.md` for Claude-specific instructions.

## Cursor

Cursor reads `.cursorrules` in project root. Add wiki context:

```
# .cursorrules (add to existing)
Read .wiki/AGENTS.md for wiki conventions.
When asked about project knowledge, search .wiki/wiki/ and .wiki/index.md.
```

## GitHub Copilot

Copilot reads `.github/copilot-instructions.md`:

```markdown
# .github/copilot-instructions.md (add to existing)
This project uses llm-wiki. Read .wiki/AGENTS.md for wiki conventions.
Wiki pages are in .wiki/wiki/. Sources in .wiki/sources/.
```

## Gemini CLI

Gemini reads `GEMINI.md` in project root:

```markdown
# GEMINI.md
Read .wiki/AGENTS.md for wiki conventions and workflows.
```

## Any Other Tool

1. Point the tool to read `.wiki/AGENTS.md`
2. AGENTS.md contains all conventions, workflows, and page type definitions
3. The tool can operate the wiki by following AGENTS.md instructions
4. Scripts in `.wiki/scripts/` handle file parsing and maintenance

## Generic Workflow

For any tool that can read files and run commands:

1. **Read** `.wiki/AGENTS.md` — understand conventions
2. **Search** `.wiki/index.md` — find pages
3. **Ingest** — `python .wiki/scripts/ingest.py <file> --category <cat> --output .wiki/sources/<cat>/`
4. **Compile** — AI creates wiki pages from sources
5. **Query** — AI searches and answers from wiki
6. **Lint** — `python .wiki/scripts/lint.py`
