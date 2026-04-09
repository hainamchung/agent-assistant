# CONTEXT-COMPRESSION — 3-Tier Compression System

> **Load**: On-demand — when context budget is constrained or when orchestrating multi-phase workflows.

---

## Purpose

Reduce token consumption of completed deliverables while preserving enough information for traceability and reference. Each deliverable is compressed to one of three tiers based on phase proximity and security sensitivity.

---

## Tier Definitions

### Tier 1: Full (No Compression)

The complete deliverable file is loaded as-is with no modifications.

| Aspect | Detail |
|--------|--------|
| **Target size** | Original (no limit) |
| **Use when** | Active phase, current deliverable, referenced by in-progress work |
| **Frontmatter** | All fields preserved |
| **Body** | Complete — no changes |

**Preserved fields**: All frontmatter and body content.
**Discarded fields**: None.

---

### Tier 2: Digest (~200 tokens)

YAML frontmatter is preserved in full. The body is replaced with a structured summary.

| Aspect | Detail |
|--------|--------|
| **Target size** | ~200 tokens |
| **Use when** | Completed phase, may be referenced, not actively edited |
| **Frontmatter** | All fields preserved in full |
| **Body** | Replaced with structured digest (see template below) |

**Digest body template**:
```
**Outcome**: {verdict or primary result}
**Key Decisions**: {bullet list of decisions made}
**Deliverable**: {file path}
**Reqs Addressed**: {list of requirements or tasks covered}
**Agent**: {agent} | **Date**: {date}
```

**Preserved fields**: All frontmatter fields (`id`, `type`, `status`, `phase`, `agent`, `date`, `depends-on`, `deliverable`, `verdict`, `severity`, etc.).
**Discarded fields**: Full body prose, code blocks, detailed analysis, extended rationale.

---

### Tier 3: One-liner (~20 tokens)

A single summary line. All frontmatter and body content is discarded.

| Aspect | Detail |
|--------|--------|
| **Target size** | ~20 tokens |
| **Use when** | Archived phase, unlikely to be re-referenced |
| **Frontmatter** | Discarded |
| **Body** | Single line |

**One-liner format**:
```
{deliverable-name} → {outcome} [{path}]
```

**Example**:
```
PLAN-sprint5.md → approved [reports/improve-project/plans/PLAN-sprint5.md]
```

**Preserved fields**: Deliverable name (from filename), outcome/verdict (extracted from frontmatter or body), file path.
**Discarded fields**: All frontmatter fields, full body, all metadata except what is embedded in the one-liner.

---

## Tier Selection Logic

```
IF deliverable.phase == current_phase       → Tier 1 (Full)
ELSE IF deliverable.phase == current_phase - 1  → Tier 2 (Digest)
ELSE                                        → Tier 3 (One-liner)
```

### Phase Numbering

Phases are extracted from the `phase` frontmatter field or inferred from the filename (e.g., `sprint5` → phase 5). The `current_phase` is the phase of the active workflow.

### Override

The tier can be forced via `--tier <1|2|3>` in the CLI, bypassing automatic selection.

---

## Security-Sensitive Preservation

Deliverables related to security are **NEVER compressed below Tier 2**.

A deliverable is security-sensitive if ANY of the following are true:
- The `agent` frontmatter field is `security-engineer`
- The `type` frontmatter field contains the string `security` (case-insensitive)

```
IF isSecuritySensitive(deliverable)
  AND selectedTier == 3
  THEN force tier = 2
```

This ensures security findings, audit reports, and threat models always retain their structured digest for traceability.

---

## Field Preservation Summary

| Field | Tier 1 | Tier 2 | Tier 3 |
|-------|:------:|:------:|:------:|
| `id` | ✅ | ✅ | ❌ |
| `type` | ✅ | ✅ | ❌ |
| `status` | ✅ | ✅ | ❌ |
| `phase` | ✅ | ✅ | ❌ |
| `agent` | ✅ | ✅ | ❌ |
| `date` | ✅ | ✅ | ❌ |
| `verdict` | ✅ | ✅ | ✅ (in one-liner) |
| `depends-on` | ✅ | ✅ | ❌ |
| `deliverable` | ✅ | ✅ | ✅ (in one-liner) |
| `severity` | ✅ | ✅ | ❌ |
| Body prose | ✅ | ❌ (digest) | ❌ |
| Code blocks | ✅ | ❌ | ❌ |
| Detailed analysis | ✅ | ❌ | ❌ |

---

## Integration

- **CLI**: `node scripts/measure-context.js --compress <dir> [--tier <1|2|3>] [--dry-run]`
- **Output**: Compressed files written to `{dir}/.compressed/`
- **Dry-run**: Prints tier assignments without writing files
