# Cross-Project Agent Sharing

> Load when: Agents need to operate across multiple repositories or share context between projects.
> Purpose: Define protocols for cross-project agent reuse, context boundaries, and shared configuration.

---

## Overview

Agent-assistant is project-scoped by default. Cross-project sharing enables teams to reuse agents, commands, and configurations across multiple repositories while maintaining isolation boundaries.

---

## Sharing Model

### What CAN Be Shared

| Asset | Sharing Method | Boundary |
|-------|---------------|----------|
| Agent definitions | Centralized `agents/` directory | Read-only from consuming projects |
| Command workflows | Centralized `commands/` directory | Read-only from consuming projects |
| Guardrail modules | Centralized `guardrails/` directory | Read-only from consuming projects |
| Personas | Centralized `personas/` directory | Read-only; project can override |
| Skills | Centralized `skills/` directory | Discovery-based; project can extend |

### What MUST NOT Be Shared

| Asset | Reason |
|-------|--------|
| Checkpoint files (`.agent-assistant/`) | Project-specific workflow state |
| Report outputs (`reports/`) | Project-specific deliverables |
| Environment variables / secrets | Security boundary |
| Runtime state (journals, mailbox) | Ephemeral, project-scoped |

---

## Installation Modes

### Mode 1: Single Project (Default)

```
project/
├── .cursor/  or  .copilot/  or  .claude/
│   └── skills/agent-assistant/  → symlink or copy
├── agents/  → local overrides (optional)
└── ...
```

Agent-assistant installed via `npm run install:{platform}`. All assets are local.

### Mode 2: Monorepo Shared

```
monorepo/
├── .agent-assistant/         → shared configuration
│   ├── agents/
│   ├── commands/
│   └── rules/
├── packages/
│   ├── frontend/             → inherits shared + local overrides
│   │   └── .agent-assistant/ → local overrides
│   └── backend/              → inherits shared + local overrides
│       └── .agent-assistant/ → local overrides
```

Resolution order: local `.agent-assistant/` → nearest parent `.agent-assistant/` → global install.

### Mode 3: Organization-Wide

Shared configuration published as an npm package or git submodule. Projects consume via:
```bash
npm install @org/agent-assistant-config
```

Then reference in their local config:
```yaml
extends: "@org/agent-assistant-config"
overrides:
  agents:
    - exclude: [game-engineer]  # Not relevant for this org
  personas:
    - default: professional     # Org standard
```

---

## Context Isolation Rules

1. **No implicit context leakage**: Agents operating in Project A must not reference files, paths, or state from Project B
2. **Explicit context imports**: If cross-reference is needed, use `CROSS_REF: {project}:{path}` annotation — orchestrator must verify access
3. **Separate checkpoint namespaces**: Each project maintains its own `.agent-assistant/` directory
4. **Shared agents are stateless**: When an agent definition is shared, it carries no project-specific state

---

## Override Protocol

When a project needs to customize a shared agent:

1. Copy the agent file to local `agents/` directory
2. Modify the local copy (original remains unchanged)
3. Local agents take precedence during resolution
4. Document the override reason in the local file's frontmatter:

```yaml
overrides: "shared/backend-engineer"
override-reason: "Project requires Rust-specific backend patterns"
```

---

## Constraints

- Cross-project sharing is opt-in, never automatic
- Shared assets must be versioned (use `version:` frontmatter field)
- Breaking changes to shared assets require version bump
- Projects can pin to specific versions of shared configurations
- No runtime network calls between projects — all sharing is at configuration time
