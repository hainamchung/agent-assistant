#!/usr/bin/env python3
"""Generate Mermaid knowledge graph from wiki wikilinks.

Usage:
    python scripts/graph.py [--output wiki/knowledge-graph.md]
"""

import argparse
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

from config import extract_wikilinks, find_wiki_root, get_paths, load_config, parse_frontmatter


# Mermaid node styles by page type
TYPE_STYLES = {
    "summary": ":::summary",
    "entity": ":::entity",
    "concept": ":::concept",
    "comparison": ":::comparison",
    "synthesis": ":::synthesis",
    "chronicle": ":::chronicle",
    "adr": ":::adr",
    "runbook": ":::runbook",
    "postmortem": ":::postmortem",
}


def build_graph(wiki_dir: Path) -> tuple[dict[str, str], list[tuple[str, str]]]:
    """Scan wiki pages, return (node_types, edges)."""
    node_types: dict[str, str] = {}
    edges: list[tuple[str, str]] = []

    for md_file in sorted(wiki_dir.rglob("*.md")):
        if md_file.name.startswith("_"):
            continue

        text = md_file.read_text(errors="replace")
        fm = parse_frontmatter(text)
        name = md_file.stem
        node_types[name] = fm.get("type", "unknown")

        links = extract_wikilinks(text)
        for link in links:
            edges.append((name, link))

    return node_types, edges


def sanitize_id(name: str) -> str:
    """Sanitize name for use as Mermaid node ID."""
    return re.sub(r"[^a-zA-Z0-9_-]", "_", name)


def generate_mermaid(node_types: dict[str, str],
                     edges: list[tuple[str, str]]) -> str:
    """Generate Mermaid graph definition."""
    lines = [
        "graph LR",
        "    %% Style definitions",
        "    classDef summary fill:#e1f5fe,stroke:#0288d1",
        "    classDef entity fill:#f3e5f5,stroke:#7b1fa2",
        "    classDef concept fill:#e8f5e9,stroke:#388e3c",
        "    classDef comparison fill:#fff3e0,stroke:#f57c00",
        "    classDef synthesis fill:#fce4ec,stroke:#c62828",
        "    classDef chronicle fill:#f5f5f5,stroke:#616161",
        "    classDef adr fill:#e0f2f1,stroke:#00695c",
        "    classDef runbook fill:#fff9c4,stroke:#f9a825",
        "    classDef postmortem fill:#ffebee,stroke:#b71c1c",
        "",
    ]

    # Nodes
    seen_nodes: set[str] = set()
    for name, page_type in sorted(node_types.items()):
        style = TYPE_STYLES.get(page_type, "")
        node_id = sanitize_id(name)
        label = name.replace("-", " ").title()
        if len(label) > 30:
            label = label[:27] + "..."
        lines.append(f"    {node_id}[\"{label}\"]{style}")
        seen_nodes.add(name)

    lines.append("")

    # Edges (deduplicated)
    seen_edges: set[tuple[str, str]] = set()
    for src, dst in edges:
        if (src, dst) not in seen_edges and src != dst:
            src_id = sanitize_id(src)
            dst_id = sanitize_id(dst)
            if dst not in seen_nodes:
                lines.append(f"    {dst_id}[\"{dst.replace('-', ' ').title()}\"]")
                seen_nodes.add(dst)
            lines.append(f"    {src_id} --> {dst_id}")
            seen_edges.add((src, dst))

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate knowledge graph")
    parser.add_argument("--output", help="Output file (default: wiki/knowledge-graph.md)")
    parser.add_argument("--dry-run", action="store_true", help="Print to stdout")
    args = parser.parse_args()

    try:
        wiki_root = find_wiki_root()
        config = load_config(wiki_root)
        paths = get_paths(config, wiki_root)
    except FileNotFoundError:
        print("Error: No .llm-wiki.toml found. Run init-wiki.py first.")
        sys.exit(1)

    wiki_dir = paths["wiki"]
    node_types, edges = build_graph(wiki_dir)

    if not node_types:
        print("No wiki pages found. Nothing to graph.")
        return

    mermaid = generate_mermaid(node_types, edges)
    today = date.today().isoformat()

    content = (
        f"---\ntitle: Knowledge Graph\ntype: graph\n"
        f"created: {today}\nupdated: {today}\n---\n"
        f"# Knowledge Graph\n\n"
        f"> Auto-generated. Rebuild: `python scripts/graph.py`\n\n"
        f"**{len(node_types)} nodes**, **{len(edges)} edges**\n\n"
        f"```mermaid\n{mermaid}\n```\n"
    )

    if args.dry_run:
        print(content)
    else:
        out_path = Path(args.output) if args.output else paths["wiki"] / "knowledge-graph.md"
        out_path.write_text(content)
        print(f"Generated {out_path} — {len(node_types)} nodes, {len(edges)} edges.")


if __name__ == "__main__":
    main()
