# Context Decay Management

> **VERSION**: 1.0 | **LOAD**: On-demand from §LOAD ON DEMAND | **PURPOSE**: Detect context window exhaustion and trigger protocol refresh

---

## Decay Detection Heuristic

AI context windows degrade as conversations grow long. This protocol detects when an agent's adherence to instructions is at risk and triggers a preventive refresh.

**Estimation method**:
- Turn count: Count conversation turns (user + assistant messages)
- Token estimation: Total character count × 0.25 ≈ tokens (rough heuristic)
- Combined score: `max(turn_pct, token_pct)` → maps to decay risk tier

---

## Platform Thresholds

| Platform | Context Window (est.) | Tier 1 Soft Refresh | Tier 2 Hard Refresh |
|----------|:--------------------:|:-------------------:|:-------------------:|
| Claude   | 200K tokens          | 50 turns / 120K est | 100 turns / 160K est |
| Copilot  | 128K tokens          | 40 turns / 80K est  | 80 turns / 100K est |
| Cursor   | 128K tokens          | 40 turns / 80K est  | 80 turns / 100K est |
| Codex    | 200K tokens          | 50 turns / 120K est | 100 turns / 160K est |
| Gemini   | 1M tokens            | 100 turns / 600K est| 200 turns / 800K est |
| Qwen     | 128K tokens          | 40 turns / 80K est  | 80 turns / 100K est |

**Platform detection**: Read from `platforms.json` → current platform key → use matching thresholds.

---

## Refresh Protocol

### Tier 1: Soft Refresh

**Trigger**: Turn count OR token estimate exceeds Tier 1 threshold.

**Actions**:
1. Re-inject: §IDENTITY section (agent role + core directive)
2. Re-inject: Current phase context (which phase, what's done, what's next)
3. Re-inject: Active agent's constraints and output format
4. Signal: `🔄 Protocol refresh (soft) — maintaining instruction coherence`

**Impact**: Minimal disruption. Adds ~200 tokens of re-injected context.

### Tier 2: Hard Refresh

**Trigger**: Turn count OR token estimate exceeds Tier 2 threshold.

**Actions**:
1. Re-inject: Full §NANO tier (identity, laws, routing, prohibitions, self-check)
2. Re-inject: Current phase context + active deliverables summary
3. Re-inject: Active agent's full protocol (from agent file)
4. Trigger journal re-read (if Agent Journals active)
5. Signal: `🔄🔄 Protocol refresh (hard) — full instruction reload`

**Impact**: Moderate disruption. Adds ~500-800 tokens of re-injected context.

---

## Decay Check (At Phase Boundary)

Between phases (after consensus stamp / phase completion, before next phase start):

1. **Estimate**: Count conversation turns + estimate token usage
2. **Compare**: Against current platform's thresholds
3. **If Tier 1 triggered**: Execute soft refresh → continue
4. **If Tier 2 triggered**: Execute hard refresh → continue
5. **If neither**: No action → continue

**Ordering**: Decay check runs AFTER checkpoint write and BEFORE conditional handoff. Sequence: Phase complete → Checkpoint write → Decay check → Conditional handoff → Next phase.

---

## Agent Self-Invoke

An agent may manually invoke a decay check mid-phase if it detects own confusion:
- Symptoms: Repeating instructions, contradicting prior decisions, forgetting context
- Action: Agent signals `🔄 Self-invoked decay check` → runs Tier 1 refresh

---

## Opt-out

- User can disable decay checks: `--no-decay-check` flag on any command
- Per-command: Commands can set `decay_check: false` in frontmatter
- Default: Enabled for all commands

---

## Integration

- Decay check runs between phases (not mid-phase — except self-invoke)
- Compatible with all 5 platforms via platform-specific thresholds
- No external dependencies — pure behavioral protocol
- Works alongside Durable Execution (checkpoint write happens before decay check)
