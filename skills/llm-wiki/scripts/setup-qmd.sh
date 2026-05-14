#!/usr/bin/env bash
# Setup qmd search for llm-wiki.
# Usage: bash scripts/setup-qmd.sh

set -euo pipefail

# Check qmd installed
if ! command -v qmd &> /dev/null; then
    echo "qmd not found. Install: npm install -g @tobilu/qmd"
    echo "Wiki works fine without qmd (grep fallback)."
    exit 0
fi

# Find wiki root (dir containing .llm-wiki.toml)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WIKI_ROOT="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$WIKI_ROOT/.llm-wiki.toml" ]; then
    echo "Error: .llm-wiki.toml not found in $WIKI_ROOT"
    exit 1
fi

# Read collection name from config (simple grep, no toml parser needed)
COLLECTION=$(grep 'collection_name' "$WIKI_ROOT/.llm-wiki.toml" | head -1 | cut -d'"' -f2)
COLLECTION="${COLLECTION:-wiki}"

echo "Setting up qmd collections..."

# Add wiki pages collection
echo "  Adding collection: $COLLECTION (wiki pages)"
qmd collection add "$WIKI_ROOT/wiki" --name "$COLLECTION" 2>/dev/null || true

# Add sources collection
echo "  Adding collection: ${COLLECTION}-sources (raw sources)"
qmd collection add "$WIKI_ROOT/sources" --name "${COLLECTION}-sources" 2>/dev/null || true

# Embed
echo "  Running initial embedding..."
qmd embed 2>/dev/null || echo "  Warning: embedding failed (may need API key)"

echo "Done. Test: qmd query 'test' --collection $COLLECTION"
