# Commands

Commands define workflows that the orchestrator routes user requests to. Each command is a markdown file with YAML frontmatter metadata.

## Structure

```
commands/
├── {command}.md          # Router file — routes to variants
└── {command}/
    ├── fast.md           # Fast/lightweight variant
    ├── hard.md           # Full/comprehensive variant
    └── team.md           # Multi-agent team variant
```

## Creating New Commands

Use [COMMAND-TEMPLATE.md](../COMMAND-TEMPLATE.md) as a starting point for new commands.

## Frontmatter Fields

### Required

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Human-readable description of the command |
| `execution-mode` | `router` \| `execute` | Whether this file routes to variants or executes directly |

### Recommended

| Field | Type | Description |
|-------|------|-------------|
| `schema-version` | semver-light | Schema version (e.g., `"1.0"`) |
| `version` | semver-light | Command version (e.g., `"1.0"`) |
| `category` | string | Command category (e.g., `execution`, `engineering`, `debugging`) |

### Optional

| Field | Type | Description |
|-------|------|-------------|
| `topology` | string | Execution topology: `pipeline`, `fan-out`, `hierarchical` |
| `topology_template` | string | Reference to a topology file in `topologies/` |

## Execution Modes

### Router (`execution-mode: router`)

Router files sit at `commands/{cmd}.md` and route to variant files based on user intent or explicit variant syntax (e.g., `/cook:fast`). They contain routing tables and disambiguation logic.

### Execute (`execution-mode: execute`)

Execute files sit at `commands/{cmd}/{variant}.md` and define the actual workflow phases, agent assignments, and deliverables. They are the files that get executed.

## Variant Syntax

Users can invoke variants with:
- `/cmd:variant` — e.g., `/cook:fast`
- `/cmd/variant` — e.g., `/cook/fast`

Common variants: `fast` (lightweight), `hard` (comprehensive), `team` (multi-agent collaboration).

## Utility Scripts

These npm scripts support workflows but are **not** routable commands:

| Script | Usage | Description |
|--------|-------|-------------|
| `npm run rollback` | Post-workflow | Reverts workspace to pre-workflow snapshot |
| `npm run predict:cost` | Pre-workflow | Estimates token cost for a command |
| `npm run extract:patterns` | Post-workflow | Extracts reusable patterns from checkpoints |

## Quick Commands

The `/quick` command provides lightweight, single-agent execution for simple tasks:

| Variant | Purpose |
|---------|---------|
| `/quick` | Auto-detect intent from natural language |
| `/quick:answer` | Direct answer (no workflow overhead) |
| `/quick:snippet` | Generate a code snippet |
| `/quick:explain` | Explain code or concept |

Quick commands trigger Nano-depth orchestration (1 phase, 1 agent, skip Scout/Research/Review).
