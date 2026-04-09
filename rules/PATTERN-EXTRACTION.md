# PATTERN-EXTRACTION — Post-Workflow Intelligence Extraction

> **Loaded by**: §REFERENCE.md RULES FILES — load when pattern extraction invoked
> **Version**: 1.0

---

## Trigger

- **Automatic**: At workflow completion (after final phase passes)
- **Manual**: `npm run extract:patterns`

---

## Extracted Pattern Categories

### Category 1: Agent Selection Patterns

Which agents were assigned to which task types, and their outcomes.

```json
{ "task_type": "string", "agent": "string", "outcome": "success|failure|escalated", "rounds": 1 }
```

### Category 2: Topology Effectiveness

Which topology was used for which workflow shape.

```json
{ "workflow_type": "string", "topology": "string", "phases": 3, "success": true }
```

### Category 3: Error Recovery Patterns

What errors occurred and how they were resolved.

```json
{ "error_type": "string", "context": "string", "resolution": "string", "success": true }
```

### Category 4: Performance Data

Actual token costs per workflow (feeds TOKEN-PREDICTION calibration).

```json
{ "workflow_type": "string", "variant": "fast|hard|team", "predicted_tokens": 0, "actual_tokens": 0 }
```

---

## Storage Format

Patterns are appended to `global-patterns.json`:

```json
{
  "version": "1.0",
  "patterns": [
    {
      "id": "PAT-{timestamp}",
      "category": "agent-selection|topology|error-recovery|performance",
      "project": "{project-name}",
      "data": {},
      "confidence": 0.5,
      "extracted_at": "ISO-8601"
    }
  ]
}
```

---

## Privacy Controls

- Sensitive fields (file content, user data, secrets) are **NEVER** extracted
- Only metadata and structural patterns are extracted
- Per-project opt-in via `.agent-assistant/config.json`:
  ```json
  { "extract_patterns": true }
  ```

---

## Import Interface (Designed, Not Activated)

Future capability for Sprint 7+: pull patterns from shared store.

- **Import command**: `npm run import:patterns --source <path>`
- **Conflict resolution**: newer pattern wins; manual merge for conflicts
- **Activation**: when multi-project testing available

---

## Limits

- Maximum 100 patterns per extraction run (configurable via `--limit`)
- Pattern entries older than 90 days are candidates for pruning
- `global-patterns.json` max size: 1MB
