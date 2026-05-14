#!/usr/bin/env bash
# Install llm-wiki skill for Claude Code.
# Usage: bash install.sh

set -euo pipefail

SKILL_DIR="$HOME/.claude/skills/llm-wiki"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Installing llm-wiki skill..."

mkdir -p "$SKILL_DIR"
cp "$REPO_DIR/SKILL.md" "$SKILL_DIR/SKILL.md"

# Copy references (templates)
mkdir -p "$SKILL_DIR/references"
cp "$REPO_DIR/references/"* "$SKILL_DIR/references/"

# Copy scripts
mkdir -p "$SKILL_DIR/scripts"
cp "$REPO_DIR/scripts/"*.py "$SKILL_DIR/scripts/"

echo "Skill installed at $SKILL_DIR"
echo "Activate with /wiki in Claude Code."
echo ""
echo "Or install via agentskills.io (works with all agents):"
echo "  npx skills add junbjnnn/llm-wiki"
