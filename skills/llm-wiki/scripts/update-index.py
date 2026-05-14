#!/usr/bin/env python3
"""Rebuild wiki/index.md from page frontmatter.

Usage:
    python scripts/update-index.py [--dry-run]
"""

import argparse
from collections import defaultdict
from datetime import date
from pathlib import Path

from config import PAGE_TYPES, find_wiki_root, get_paths, load_config, parse_frontmatter


def scan_wiki_pages(wiki_dir: Path) -> list[dict]:
    """Scan all .md files in wiki/, extract frontmatter."""
    pages = []
    for md_file in sorted(wiki_dir.rglob("*.md")):
        if md_file.name.startswith("_"):
            continue  # Skip templates
        if md_file.name in ("glossary.md", "knowledge-graph.md"):
            continue  # Skip special files

        text = md_file.read_text(errors="replace")
        fm = parse_frontmatter(text)
        if not fm:
            continue

        fm["_path"] = md_file
        fm["_relative"] = md_file.relative_to(wiki_dir.parent)
        fm["_name"] = md_file.stem
        pages.append(fm)

    return pages


def group_by_type(pages: list[dict]) -> dict[str, list[dict]]:
    """Group pages by their type field."""
    groups: dict[str, list[dict]] = defaultdict(list)
    for page in pages:
        page_type = page.get("type", "unknown")
        groups[page_type].append(page)

    # Sort each group by updated date (newest first)
    for group in groups.values():
        group.sort(key=lambda p: str(p.get("updated", "")), reverse=True)

    return groups


def generate_index(pages: list[dict], wiki_name: str = "Wiki") -> str:
    """Generate index.md content."""
    today = date.today().isoformat()
    groups = group_by_type(pages)

    lines = [
        f"---\ntitle: {wiki_name} Index\nupdated: {today}\n---\n",
        f"# {wiki_name} Index\n",
        "> Auto-maintained catalog. Rebuild: `python scripts/update-index.py`\n",
        f"**{len(pages)} pages** across {len(groups)} types.\n",
    ]

    # By Type sections
    lines.append("## By Type\n")
    for page_type in PAGE_TYPES:
        type_pages = groups.get(page_type, [])
        if not type_pages:
            continue
        display = page_type.replace("adr", "Decisions (ADR)").title()
        lines.append(f"### {display} ({len(type_pages)})\n")
        for page in type_pages:
            title = page.get("title", page["_name"])
            tags = page.get("tags", [])
            updated = page.get("updated", "")
            tag_str = f" (tags: {', '.join(tags)})" if tags else ""
            lines.append(f"- [[{page['_name']}]] — *{title}*{tag_str} [{updated}]")
        lines.append("")

    # Handle unknown types
    for page_type, type_pages in groups.items():
        if page_type in PAGE_TYPES or page_type == "unknown":
            continue
        lines.append(f"### {page_type.title()} ({len(type_pages)})\n")
        for page in type_pages:
            title = page.get("title", page["_name"])
            lines.append(f"- [[{page['_name']}]] — *{title}* [{page.get('updated', '')}]")
        lines.append("")

    # Recently Updated (top 10)
    all_sorted = sorted(pages, key=lambda p: str(p.get("updated", "")), reverse=True)
    lines.append("## Recently Updated\n")
    for page in all_sorted[:10]:
        title = page.get("title", page["_name"])
        lines.append(f"- [[{page['_name']}]] — *{title}* [{page.get('updated', '')}]")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Rebuild wiki index.md")
    parser.add_argument("--dry-run", action="store_true", help="Print to stdout instead of writing")
    args = parser.parse_args()

    try:
        wiki_root = find_wiki_root()
        config = load_config(wiki_root)
        paths = get_paths(config, wiki_root)
    except FileNotFoundError:
        print("Error: No .llm-wiki.toml found. Run init-wiki.py first.")
        return

    wiki_dir = paths["wiki"]
    if not wiki_dir.exists():
        print(f"Error: Wiki directory not found at {wiki_dir}")
        return

    wiki_name = config.get("wiki", {}).get("name", "Wiki")
    pages = scan_wiki_pages(wiki_dir)
    content = generate_index(pages, wiki_name)

    if args.dry_run:
        print(content)
    else:
        paths["index"].write_text(content)
        print(f"Updated {paths['index']} — {len(pages)} pages indexed.")


if __name__ == "__main__":
    main()
