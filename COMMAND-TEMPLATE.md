---
schema-version: "1.0"          # Required
description: "{COMMAND_DESCRIPTION}"  # Required
version: "1.0"                  # Recommended
category: {execution|planning|research|support}  # Recommended
execution-mode: {router|execute}  # Required
# topology: pipeline            # Optional: pipeline|fan-out|hierarchical
---

# /{command-name} — {Display Name}

> **ROUTER DIRECTIVE**: {routing description}

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT

**LOAD now**:
1. RUNTIME.md

---

## ROUTING LOGIC (for router mode)

| Condition | Route |
|-----------|-------|
| {condition} | → `commands/{cmd}/{variant}.md` |

---

## AVAILABLE ROUTES (for router mode)

| Route | When to Use |
|-------|-------------|
| `/{cmd}:fast` | Quick execution |
| `/{cmd}:hard` | Full execution with research |
| `/{cmd}:team` | Team collaboration |

---

## PHASES (for execute mode)

### Phase 1: {Name}
| Field | Value |
|-------|-------|
| Agent | {agent-name} |
| Entry | {entry criteria} |
| Exit | {exit criteria} |
| Deliverable | {output} |

<!-- Add more phases as needed -->
