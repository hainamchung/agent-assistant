---
description: "System overview — commands, agents, rules, and quick start"
version: "1.0"
schema-version: "1.0"
category: support
execution-mode: execute
---

# System Overview

## Welcome

Agent Assistant is a multi-agent orchestration framework for AI coding assistants. It coordinates specialist agents through structured workflows to deliver high-quality engineering outputs. Commands trigger workflows; agents execute phases.

## Quick Start

| Command | Purpose |
|---------|---------|
| `/cook` | Implement features (`:fast`, `:hard`, `:team` variants) |
| `/fix` | Fix bugs and errors |
| `/plan` | Create implementation plans |
| `/review` | Code review with quality gates |
| `/test` | Generate and run tests |

## Available Commands

> **AUTO-GENERATE**: Read `commands/*.md` frontmatter → display:

| Command | Description | Variants |
|---------|-------------|----------|
| {from frontmatter.description} | {from commands/{cmd}/ subdirectory .md files} |

<!-- WARNING: Skip files with missing/malformed frontmatter -->

## Available Agents

> **AUTO-GENERATE**: Read `agents/*.md` frontmatter → display:

| Agent | Description | Category |
|-------|-------------|----------|
| {from frontmatter} | {from frontmatter} | {from frontmatter} |

<!-- WARNING: Skip files with missing/malformed frontmatter -->

## Rules

| File | Purpose |
|------|---------|
| `RUNTIME.md` | Core orchestrator protocol |
| `REFERENCE.md` | Quick lookup tables |
| `TEAMS-LITE.md` | Team review protocol |
| `SKILLS-LITE.md` | Matrix skill discovery |
| `PREFLIGHT-TEMPLATES.md` | Agent pre-flight checks |
| `PROJECT-DETECTION.md` | Project type auto-detection |
| `VALIDATION-RULES.md` | Output validation rules |

## Skills

Skills are auto-discovered via Matrix Skill Discovery (HSOL). Each agent has a `profile: "{domain}:{category}"` that maps to domain YAML files in `matrix-skills/`. Dynamic discovery adds skills for `:hard`/`:focus` variants when matrix fitness < 0.8.

## Getting Help

Use `/help {topic}` for detailed information on any command or agent.
