# Getting Started

## Agent Setup (Recommended)

```bash
npx skills add junbjnnn/llm-wiki
```

Then tell your AI agent:

> "Setup llm-wiki for this project and show me how to use it"

The agent handles Python dependencies, initialization, and guides you through your first ingest.

## Manual Setup

### Prerequisites

- Python 3.11+
- git
- An AI tool (Claude Code, Cursor, Copilot, Gemini CLI, etc.)

### 1. Install dependencies

```bash
pip install markitdown[all] pyyaml
```

### 2. Initialize wiki in your project

```bash
# Clone llm-wiki repo (for scripts)
git clone https://github.com/junbjnnn/llm-wiki.git /tmp/llm-wiki

# Initialize in your project
python /tmp/llm-wiki/scripts/init-wiki.py --target /path/to/project --name "My Project Wiki"

# Options:
#   --language vi       Wiki page language (default: en)
#   --root .            Standalone repo mode (no .wiki/ subfolder)
#   --with-qmd          Setup qmd search if installed
#   --no-obsidian       Skip .obsidian/ vault config
```

### 3. Verify setup

```bash
cd /path/to/project
ls .wiki/           # Should show AGENTS.md, sources/, wiki/, etc.
python .wiki/scripts/stats.py   # Should show empty wiki stats
```

## First Ingest

```bash
# Parse a document into wiki source
python .wiki/scripts/ingest.py meeting-notes.pdf --category meetings \
    --output .wiki/sources/meetings/

# Or a URL
python .wiki/scripts/ingest.py https://example.com/api-docs.html --category references \
    --output .wiki/sources/references/
```

## First Compile

Open your AI tool in the project directory. It reads `.wiki/AGENTS.md` automatically.

Ask: *"Compile the wiki — process any uncompiled sources in .wiki/sources/"*

The AI runs a 3-stage compile pipeline:
1. **Diff** — Scan sources/ vs wiki/summaries/ to identify new/changed documents
2. **Extract** — For each new source: extract entities, concepts, relationships, and citations
3. **Generate** — Create/update wiki pages with wikilinks, detect conflicts, cascade-update related pages

After compilation:
- Run `python .wiki/scripts/update-index.py` to rebuild the catalog
- Changes are appended to log.md and committed

## First Query

Ask your AI tool: *"Search the wiki: how does our authentication work?"*

The AI will:
1. Search index.md and wiki pages
2. Synthesize an answer
3. If the answer has new insights → create a wiki page automatically

## Maintenance

```bash
# Check wiki health
python .wiki/scripts/lint.py

# Rebuild index
python .wiki/scripts/update-index.py

# View stats
python .wiki/scripts/stats.py

# Generate knowledge graph
python .wiki/scripts/graph.py
```
