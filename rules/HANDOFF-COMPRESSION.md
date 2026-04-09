# HANDOFF-COMPRESSION — Context Compression for Agent Chains

> **Loaded by**: §LOAD ON DEMAND when multi-agent handoff occurs
> **Version**: 1.0

---

## Compression Tiers

### Tier 1: `minimal` (maximum compression, ~70% reduction)

Extract ONLY:
- Deliverable file paths
- Task completion status (pass/fail per task)
- Blocking constraints (items preventing next phase)
- Critical errors (if any)

Output format:
```
HANDOFF_CONTEXT:
  deliverables: [list of file paths]
  status: {task_id: pass|fail}
  blockers: [list or empty]
  errors: [list or empty]
```

### Tier 2: `standard` (balanced, ~40% reduction)

Everything in `minimal` PLUS:
- Key decisions made (1-line summary each)
- Acceptance criteria status (checked/unchecked)
- Risk flags raised during execution
- Reviewer findings (if any, summarized)

### Tier 3: `full` (no compression, 0% reduction)

Current behavior — full handoff context passed as-is.

---

## Selection Logic

- **Default**: `standard`
- **Short chains** (≤ 2 agents): `full`
- **Long chains** (≥ 4 agents): `standard`
- **Budget-constrained** (context budget > 80%): `minimal`
- **Override**: command can specify `compression: minimal|standard|full`

---

## CRITICAL Preservation Rule

Items tagged with `[CRITICAL]` in handoff context are **NEVER** compressed, regardless of tier. They pass through verbatim.

---

## Decompression

Downstream agent receives:
1. Compressed context (per tier)
2. Pointer to full context: `FULL_CONTEXT_REF: {file_path}`
3. Can request full context via: "See {file_path} for full details"

---

## Metrics

Track per handoff:

| Metric | Description |
|--------|-------------|
| Input tokens | Before compression |
| Output tokens | After compression |
| Compression ratio | `(input - output) / input × 100` |

Store in semantic memory for calibration.
