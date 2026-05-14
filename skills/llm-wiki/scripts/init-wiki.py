#!/usr/bin/env python3
"""Initialize a new llm-wiki in the current project.

Usage:
    python scripts/init-wiki.py [--name "Project Name"] [--language en] [--root .wiki]
    python scripts/init-wiki.py --with-qmd
"""

import argparse
import json
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

# Resolve paths relative to this script's location (the repo)
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_DIR = SCRIPT_DIR.parent
TEMPLATES_DIR = REPO_DIR / "references"

# Import constants from config to avoid duplication
sys.path.insert(0, str(SCRIPT_DIR))
from config import SOURCE_CATEGORIES, WIKI_SUBDIRS


def create_dirs(wiki_root: Path) -> None:
    """Create source and wiki subdirectories with .gitkeep."""
    for cat in SOURCE_CATEGORIES:
        d = wiki_root / "sources" / cat
        d.mkdir(parents=True, exist_ok=True)
        (d / ".gitkeep").touch()

    for sub in WIKI_SUBDIRS:
        d = wiki_root / "wiki" / sub
        d.mkdir(parents=True, exist_ok=True)
        (d / ".gitkeep").touch()

    (wiki_root / "scripts").mkdir(exist_ok=True)


def write_config(wiki_root: Path, name: str, language: str, root_val: str) -> None:
    """Write .llm-wiki.toml from template."""
    tmpl = (TEMPLATES_DIR / "llm-wiki.toml").read_text()
    content = tmpl.replace("{wiki_name}", name)
    content = content.replace("{language}", language)
    content = content.replace("{root}", root_val)
    (wiki_root / ".llm-wiki.toml").write_text(content)


def write_agents_md(wiki_root: Path, name: str, language: str) -> None:
    """Write AGENTS.md from template."""
    tmpl = (TEMPLATES_DIR / "agents-md.md").read_text()
    content = tmpl.replace("{wiki_name}", name)
    content = content.replace("{language}", language)
    (wiki_root / "AGENTS.md").write_text(content)


def write_claude_md(wiki_root: Path) -> None:
    """Write CLAUDE.md from template."""
    content = (TEMPLATES_DIR / "claude-md.md").read_text()
    (wiki_root / "CLAUDE.md").write_text(content)


def write_index_md(wiki_root: Path) -> None:
    """Write initial index.md."""
    today = date.today().isoformat()
    (wiki_root / "index.md").write_text(
        f"---\ntitle: Wiki Index\nupdated: {today}\n---\n"
        "# Wiki Index\n\n"
        "> Auto-maintained catalog. Rebuild: `python scripts/update-index.py`\n\n"
        "## By Type\n<!-- Auto-generated sections below -->\n\n"
        "## Recently Updated\n<!-- Auto-generated -->\n"
    )


def write_log_md(wiki_root: Path) -> None:
    """Write initial log.md."""
    today = date.today().isoformat()
    (wiki_root / "log.md").write_text(
        "---\ntitle: Activity Log\n---\n"
        "# Activity Log\n\n"
        "> Append-only. Mutations only (no read queries).\n\n"
        "| Date | Action | Details | Author |\n"
        "|------|--------|---------|--------|\n"
        f"| {today} | init | Wiki initialized | system |\n"
    )


def write_glossary(wiki_root: Path) -> None:
    """Write wiki/glossary.md."""
    today = date.today().isoformat()
    (wiki_root / "wiki" / "glossary.md").write_text(
        f"---\ntitle: Glossary\ntype: glossary\ntags: [reference]\n"
        f"created: {today}\nupdated: {today}\n---\n"
        "# Glossary\n\n"
        "> Domain-specific terminology. Format: "
        "**Term** — Definition. See [[related-page]].\n"
    )


def write_page_templates(wiki_root: Path) -> None:
    """Generate _template.md in each wiki subdir from page-templates.yaml."""
    import yaml

    tmpl_file = TEMPLATES_DIR / "page-templates.yaml"
    templates = yaml.safe_load(tmpl_file.read_text())

    for type_name, tmpl in templates.items():
        subdir = wiki_root / "wiki" / tmpl["dir"]
        subdir.mkdir(parents=True, exist_ok=True)
        fm = tmpl["frontmatter"].strip()
        body = tmpl["body"].strip()
        content = f"---\n{fm}\n---\n{body}\n"
        (subdir / "_template.md").write_text(content)


def copy_scripts(wiki_root: Path) -> None:
    """Copy utility scripts into wiki's scripts/ dir."""
    dest = wiki_root / "scripts"
    for py_file in SCRIPT_DIR.glob("*.py"):
        if py_file.name == "init-wiki.py":
            continue  # Don't copy the initializer itself
        shutil.copy2(py_file, dest / py_file.name)


def setup_obsidian(wiki_root: Path) -> None:
    """Create .obsidian/ config for Obsidian vault compatibility."""
    obsidian_dir = wiki_root / ".obsidian"
    obsidian_dir.mkdir(exist_ok=True)

    app_config = {
        "strictLineBreaks": True,
        "showLineNumber": True,
        "useMarkdownLinks": False,
        "newLinkFormat": "shortest",
        "attachmentFolderPath": "sources",
    }
    (obsidian_dir / "app.json").write_text(json.dumps(app_config, indent=2))

    graph_config = {
        "colorGroups": [
            {"query": "path:wiki/summaries", "color": {"a": 1, "rgb": 3447003}},
            {"query": "path:wiki/entities", "color": {"a": 1, "rgb": 15105570}},
            {"query": "path:wiki/concepts", "color": {"a": 1, "rgb": 3066993}},
            {"query": "path:wiki/comparisons", "color": {"a": 1, "rgb": 16776960}},
            {"query": "path:wiki/syntheses", "color": {"a": 1, "rgb": 10181046}},
            {"query": "path:wiki/chronicles", "color": {"a": 1, "rgb": 9936031}},
            {"query": "path:wiki/decisions", "color": {"a": 1, "rgb": 15158332}},
            {"query": "path:wiki/runbooks", "color": {"a": 1, "rgb": 1752220}},
            {"query": "path:wiki/postmortems", "color": {"a": 1, "rgb": 15548997}},
            {"query": "path:sources", "color": {"a": 1, "rgb": 9807270}},
        ]
    }
    (obsidian_dir / "graph.json").write_text(json.dumps(graph_config, indent=2))

    (obsidian_dir / "community-plugins.json").write_text("[]")


def setup_qmd(wiki_root: Path) -> None:
    """Setup qmd if available."""
    if shutil.which("qmd") is None:
        print("qmd not found — skipping. Install: npm install -g @tobilu/qmd")
        return
    setup_script = wiki_root / "scripts" / "setup-qmd.sh"
    if setup_script.exists():
        subprocess.run(["bash", str(setup_script)], cwd=str(wiki_root))


def main() -> None:
    parser = argparse.ArgumentParser(description="Initialize llm-wiki")
    parser.add_argument("--name", default="My Project Wiki", help="Wiki name")
    parser.add_argument("--language", default="en", help="Wiki language (en, vi, ja)")
    parser.add_argument("--root", default=".wiki", help="Wiki root dir (.wiki or .)")
    parser.add_argument("--target", default=".", help="Target project directory")
    parser.add_argument("--with-qmd", action="store_true", help="Setup qmd search")
    parser.add_argument("--no-obsidian", action="store_true", help="Skip .obsidian/ config generation")
    args = parser.parse_args()

    target = Path(args.target).resolve()
    if args.root == ".":
        wiki_root = target
    else:
        wiki_root = target / args.root

    if (wiki_root / ".llm-wiki.toml").exists():
        print(f"Wiki already exists at {wiki_root}. Skipping.")
        sys.exit(0)

    print(f"Initializing wiki at {wiki_root}...")
    wiki_root.mkdir(parents=True, exist_ok=True)

    create_dirs(wiki_root)
    write_config(wiki_root, args.name, args.language, args.root)
    write_agents_md(wiki_root, args.name, args.language)
    write_claude_md(wiki_root)
    write_index_md(wiki_root)
    write_log_md(wiki_root)
    write_glossary(wiki_root)
    write_page_templates(wiki_root)
    copy_scripts(wiki_root)

    if args.with_qmd:
        setup_qmd(wiki_root)

    if not args.no_obsidian:
        setup_obsidian(wiki_root)
        print(f"  Obsidian: {wiki_root / '.obsidian'} (vault config created)")

    print(f"Wiki initialized at {wiki_root}")
    print(f"  Sources: {wiki_root / 'sources'} ({len(SOURCE_CATEGORIES)} categories)")
    print(f"  Wiki:    {wiki_root / 'wiki'} ({len(WIKI_SUBDIRS)} page types)")
    print(f"  Config:  {wiki_root / '.llm-wiki.toml'}")
    print(f"  Schema:  {wiki_root / 'AGENTS.md'}")

    if not args.with_qmd and shutil.which("qmd") is None:
        print()
        print("  Tip: qmd not installed. Strongly recommended for wikis with 50+ pages.")
        print("  Install: npm install -g @tobilu/qmd")
        print("  Setup:   python scripts/init-wiki.py --with-qmd")


if __name__ == "__main__":
    main()
