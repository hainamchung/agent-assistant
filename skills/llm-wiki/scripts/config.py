"""Shared config loader and constants for llm-wiki scripts."""

import re
import sys
from pathlib import Path

if sys.version_info >= (3, 11):
    import tomllib
else:
    try:
        import tomllib
    except ImportError:
        import tomli as tomllib  # type: ignore[no-redef]

# --- Constants ---

SOURCE_CATEGORIES = [
    "product", "design", "architecture", "development",
    "operations", "meetings", "references", "data",
]

WIKI_SUBDIRS = [
    "summaries", "entities", "concepts", "comparisons",
    "syntheses", "chronicles", "decisions", "runbooks", "postmortems",
]

PAGE_TYPES = [
    "summary", "entity", "concept", "comparison",
    "synthesis", "chronicle", "adr", "runbook", "postmortem",
]

REQUIRED_FRONTMATTER = ["title", "type", "tags", "created", "updated"]

WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")

CONFIDENCE_WEIGHTS = {"high": 1.0, "medium": 0.7, "low": 0.3}


# --- Functions ---

def find_wiki_root(start: Path | None = None) -> Path:
    """Walk up from start to find .llm-wiki.toml, return its parent."""
    current = start or Path.cwd()
    for parent in [current, *current.parents]:
        if (parent / ".llm-wiki.toml").exists():
            return parent
        if (parent / ".wiki" / ".llm-wiki.toml").exists():
            return parent / ".wiki"
    raise FileNotFoundError("No .llm-wiki.toml found in parent directories")


def load_config(wiki_root: Path | None = None) -> dict:
    """Parse .llm-wiki.toml from wiki root."""
    root = wiki_root or find_wiki_root()
    config_path = root / ".llm-wiki.toml"
    with open(config_path, "rb") as f:
        return tomllib.load(f)


def get_paths(config: dict, wiki_root: Path) -> dict[str, Path]:
    """Resolve paths from config relative to wiki root."""
    paths_cfg = config.get("paths", {})
    return {
        "sources": wiki_root / paths_cfg.get("sources", "sources"),
        "wiki": wiki_root / paths_cfg.get("wiki", "wiki"),
        "scripts": wiki_root / paths_cfg.get("scripts", "scripts"),
        "index": wiki_root / paths_cfg.get("index", "index.md"),
        "log": wiki_root / paths_cfg.get("log", "log.md"),
    }


def parse_frontmatter(text: str) -> dict:
    """Extract YAML frontmatter from markdown text. Returns empty dict if none."""
    if not text.startswith("---"):
        return {}
    end = text.find("---", 3)
    if end == -1:
        return {}
    import yaml
    try:
        return yaml.safe_load(text[3:end]) or {}
    except yaml.YAMLError:
        return {}


def extract_wikilinks(text: str) -> list[str]:
    """Find all [[wikilink]] references in text."""
    return WIKILINK_RE.findall(text)


def compute_age_decay(source_date, half_life: int = 90) -> float:
    """Exponential decay: 1.0 at day 0, 0.5 at half_life days."""
    from datetime import date
    if not isinstance(source_date, date):
        return 0.0
    if half_life <= 0:
        return 0.0
    days = (date.today() - source_date).days
    if days <= 0:
        return 1.0
    return 2 ** (-days / half_life)


def resolve_wikilink(name: str, wiki_dir: Path) -> Path | None:
    """Resolve a wikilink name to a file path. Returns None if not found."""
    # Direct match
    target = wiki_dir / f"{name}.md"
    if target.exists():
        return target
    # Search subdirs
    for md in wiki_dir.rglob(f"{name}.md"):
        return md
    return None
