# TOKEN-PREDICTION — Pre-Execution Cost Estimation

> **Loaded by**: §REFERENCE.md RULES FILES — load when cost estimate requested
> **Version**: 1.0

---

## Prediction Formula

```
estimated_tokens = Σ(phase_cost) + overhead

Where:
  phase_cost = base_cost[variant] × agent_count × context_factor
  overhead   = system_prompt_cost + routing_cost
```

### agent_count Source

`agent_count` is derived from the command's topology definition:

| Variant | Source | Fallback |
|---------|--------|----------|
| `:fast` | Always 1 agent | 1 |
| `:hard` | 1 primary (override with `--phases` flag) | 1 |
| `:team` | Count from topology YAML `agents:` array | 3 |

---

## Base Cost Constants (tokens per phase)

| Variant | Base Cost | Agent Multiplier | Context Factor |
|---------|:---------:|:-----------------:|:--------------:|
| `:fast` | 1,500     | × 1.0             | × 1.0          |
| `:hard` | 4,000     | × 1.2             | × 1.5          |
| `:team` | 8,000     | × 1.5             | × 2.0          |

---

## Overhead Constants

| Component | Tokens |
|-----------|:------:|
| System prompt (RUNTIME.md NANO) | ~900 |
| Agent protocol loading | ~500 per agent |
| Routing + skill resolution | ~200 |
| Phase boundary overhead | ~300 per boundary |

---

## Example Calculation

`/cook:team` with 4 phases, 3 agents per phase:

```
Per phase:  8,000 × 1.5 × 2.0 = 24,000
4 phases:   24,000 × 4 = 96,000
Overhead:   900 + (3 × 500) + 200 + (4 × 300) = 3,800
────────────────────────────────────────────────
Estimated total: ~100,000 tokens
```

---

## Warning Thresholds

| Level | Threshold | Action |
|-------|:---------:|--------|
| INFO | < 10,000 | No warning |
| NOTICE | 10,000–50,000 | "Moderate token usage expected" |
| WARNING | 50,000–100,000 | "High token usage — consider :fast variant" |
| ALERT | > 100,000 | "Very high token usage — confirm before proceeding" |

---

## Calibration Protocol

After each workflow:

1. Record actual tokens consumed (from LLM API if available, or estimate from output length)
2. Compare to prediction
3. Calculate error: `|actual - predicted| / actual`
4. Store in semantic memory: `{ workflow_type, predicted, actual, error }`
5. Quarterly: recalculate base constants from accumulated data
