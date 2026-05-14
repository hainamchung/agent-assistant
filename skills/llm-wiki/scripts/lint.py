#!/usr/bin/env python3
"""Check wiki health: orphans, broken links, stale pages, missing frontmatter.

Usage:
    python scripts/lint.py [--fix] [--strict]
"""

import argparse
import sys
from datetime import date, timedelta
from pathlib import Path

from config import (
    REQUIRED_FRONTMATTER,
    PAGE_TYPES,
    extract_wikilinks,
    find_wiki_root,
    get_paths,
    load_config,
    parse_frontmatter,
    resolve_wikilink,
)


def check_frontmatter(pages: dict[Path, dict], required: list[str]) -> list[str]:
    """Check for missing required frontmatter fields."""
    issues = []
    for path, fm in pages.items():
        missing = [f for f in required if f not in fm]
        if missing:
            issues.append(f"  {path}: missing fields: {', '.join(missing)}")
    return issues


def check_page_types(pages: dict[Path, dict], valid_types: list[str]) -> list[str]:
    """Check for invalid page type values."""
    issues = []
    for path, fm in pages.items():
        pt = fm.get("type", "")
        if pt and pt not in valid_types and pt != "glossary":
            issues.append(f"  {path}: invalid type '{pt}' (valid: {', '.join(valid_types)})")
    return issues


def check_broken_links(pages: dict[Path, dict], texts: dict[Path, str],
                        wiki_dir: Path) -> list[str]:
    """Check for broken [[wikilinks]]."""
    issues = []
    for path, text in texts.items():
        links = extract_wikilinks(text)
        for link in links:
            if resolve_wikilink(link, wiki_dir) is None:
                issues.append(f"  {path}: broken link [[{link}]]")
    return issues


def check_orphans(pages: dict[Path, dict], texts: dict[Path, str],
                   wiki_dir: Path) -> list[str]:
    """Find pages with no inbound wikilinks."""
    # Collect all link targets
    all_targets: set[str] = set()
    for text in texts.values():
        all_targets.update(extract_wikilinks(text))

    # Also count index.md links
    index_path = wiki_dir.parent / "index.md"
    if index_path.exists():
        all_targets.update(extract_wikilinks(index_path.read_text(errors="replace")))

    issues = []
    for path in pages:
        name = path.stem
        if name not in all_targets and path.name != "glossary.md":
            issues.append(f"  {path}: orphan (no inbound links)")
    return issues


def check_stale(pages: dict[Path, dict], stale_days: int) -> list[str]:
    """Find pages not updated within stale_days."""
    threshold = date.today() - timedelta(days=stale_days)
    issues = []
    for path, fm in pages.items():
        updated = fm.get("updated", "")
        if not updated:
            continue
        try:
            updated_date = date.fromisoformat(str(updated))
            if updated_date < threshold:
                issues.append(f"  {path}: stale (updated {updated}, >{stale_days} days)")
        except (ValueError, TypeError):
            pass
    return issues


def check_empty(pages: dict[Path, dict], texts: dict[Path, str]) -> list[str]:
    """Find pages with no content beyond frontmatter."""
    issues = []
    for path, text in texts.items():
        # Strip frontmatter
        if text.startswith("---"):
            end = text.find("---", 3)
            if end != -1:
                body = text[end + 3:].strip()
            else:
                body = ""
        else:
            body = text.strip()

        # Strip headers only
        lines = [l for l in body.split("\n") if l.strip() and not l.strip().startswith("#")]
        if not lines:
            issues.append(f"  {path}: empty (no content beyond frontmatter/headers)")
    return issues


def check_citations(pages: dict[Path, dict]) -> list[str]:
    """Warn when wiki pages have empty citations field."""
    issues = []
    for path, fm in pages.items():
        if fm.get("type") == "glossary":
            continue
        citations = fm.get("citations")
        if citations is not None and not citations:
            issues.append(f"  {path}: empty citations (consider adding source references)")
    return issues


def check_freshness(pages: dict[Path, dict], sources_dir: Path,
                     half_life: int, threshold: int) -> list[str]:
    """Warn on pages with low freshness score (temporal decay)."""
    from stats import compute_page_freshness
    issues = []
    for path, fm in pages.items():
        score = compute_page_freshness(fm, sources_dir, half_life)
        if score < threshold:
            issues.append(f"  {path}: low freshness ({score:.0f}/100, threshold: {threshold})")
    return issues


def main() -> None:
    parser = argparse.ArgumentParser(description="Lint wiki for health issues")
    parser.add_argument("--fix", action="store_true", help="Auto-fix simple issues")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as errors")
    args = parser.parse_args()

    try:
        wiki_root = find_wiki_root()
        config = load_config(wiki_root)
        paths = get_paths(config, wiki_root)
    except FileNotFoundError:
        print("Error: No .llm-wiki.toml found. Run init-wiki.py first.")
        sys.exit(1)

    wiki_dir = paths["wiki"]
    if not wiki_dir.exists():
        print(f"Error: Wiki directory not found at {wiki_dir}")
        sys.exit(1)

    # Load all pages
    pages: dict[Path, dict] = {}
    texts: dict[Path, str] = {}
    for md_file in sorted(wiki_dir.rglob("*.md")):
        if md_file.name.startswith("_"):
            continue
        text = md_file.read_text(errors="replace")
        texts[md_file] = text
        fm = parse_frontmatter(text)
        if fm:
            pages[md_file] = fm

    if not pages and not texts:
        print("Wiki is empty. Nothing to lint.")
        sys.exit(0)

    lint_cfg = config.get("lint", {})
    stale_days = lint_cfg.get("stale_days", 30)
    fm_cfg = config.get("frontmatter", {})
    required = fm_cfg.get("required_fields", REQUIRED_FRONTMATTER)
    valid_types = fm_cfg.get("page_types", PAGE_TYPES)

    # Run checks
    all_issues: dict[str, list[str]] = {}

    issues = check_frontmatter(pages, required)
    if issues:
        all_issues["Missing frontmatter"] = issues

    issues = check_page_types(pages, valid_types)
    if issues:
        all_issues["Invalid page types"] = issues

    issues = check_broken_links(pages, texts, wiki_dir)
    if issues:
        all_issues["Broken wikilinks"] = issues

    issues = check_orphans(pages, texts, wiki_dir)
    if issues:
        all_issues["Orphan pages"] = issues if args.strict else issues
        if not args.strict:
            all_issues["Orphan pages (warning)"] = all_issues.pop("Orphan pages")

    issues = check_stale(pages, stale_days)
    if issues:
        key = "Stale pages" if args.strict else "Stale pages (warning)"
        all_issues[key] = issues

    issues = check_empty(pages, texts)
    if issues:
        all_issues["Empty pages"] = issues

    issues = check_citations(pages)
    if issues:
        all_issues["Empty citations (warning)"] = issues

    freshness_cfg = config.get("freshness", {})
    half_life = freshness_cfg.get("half_life_days", 90)
    warn_threshold = freshness_cfg.get("warn_threshold", 30)
    issues = check_freshness(pages, paths["sources"], half_life, warn_threshold)
    if issues:
        all_issues["Low freshness (warning)"] = issues

    # Auto-fix
    if args.fix:
        today = date.today().isoformat()
        fixed = 0
        for path, fm in pages.items():
            if "updated" not in fm:
                text = texts[path]
                if not text.startswith("---"):
                    continue
                end = text.find("---", 3)
                if end == -1:
                    continue
                # Insert updated field before closing ---
                text = text[:end] + f"updated: {today}\n" + text[end:]
                path.write_text(text)
                fixed += 1
        if fixed:
            print(f"Fixed: added 'updated' date to {fixed} pages.")

    # Report
    if not all_issues:
        print("Wiki is clean. No issues found.")
        sys.exit(0)

    total = sum(len(v) for v in all_issues.values())
    print(f"Found {total} issues:\n")
    for category, issues in all_issues.items():
        print(f"[{category}] ({len(issues)})")
        for issue in issues:
            print(issue)
        print()

    # Exit code
    errors = {k: v for k, v in all_issues.items() if "(warning)" not in k}
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
