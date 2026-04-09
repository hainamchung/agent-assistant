---
schema-version: "1.0"
name: CONTEXT-BUDGET
description: Context window budget management with zone-based actions
status: active
---

# 📊 CONTEXT BUDGET

> **LOAD**: When context utilization needs monitoring  
> **PREREQUISITE**: `scripts/measure-context.js` (word count measurement)  
> **INTEGRATION**: Triggers SKILL-DEGRADATION.md tier transitions

---

## ZONES

| Zone | Utilization | Description |
|------|:-----------:|-------------|
| 🟢 **Green** | 0-60% | Normal operation — all features enabled |
| 🟡 **Yellow** | 61-80% | Caution — begin conservation measures |
| 🔴 **Red** | 81-95% | Critical — aggressive reduction required |
| ⚫ **Critical** | >95% | Emergency — save state and halt expansion |

---

## ZONE ACTIONS

| # | Action | 🟢 Green | 🟡 Yellow | 🔴 Red | ⚫ Critical |
|---|--------|:--------:|:---------:|:------:|:----------:|
| 1 | Skill loading tier | T1 (Full) | T2 (Reduced) | T3 (Minimal) | HALT |
| 2 | On-demand file loading | Unlimited | Max 3 files | Max 1 file | None |
| 3 | Agent briefing verbosity | Full | Abbreviated | One-line | Skip |
| 4 | Dynamic skill discovery | Enabled | Disabled | Disabled | Disabled |
| 5 | Deliverable format | Full markdown | Condensed | Bullet points | Emergency save |
| 6 | Sub-agent context | Full briefing | Summary only | Objective only | No dispatch |
| 7 | History retention | Full conversation | Last 10 exchanges | Last 5 exchanges | Last 2 exchanges |
| 8 | New file creation | Allowed | Allowed (warn) | Blocked | Blocked |

---

## MEASUREMENT

Context utilization is measured by:

```
utilization = current_context_tokens / max_context_tokens
```

Where `max_context_tokens` comes from `platforms.json` → `capabilities.max_context_tokens`.

For word-based estimation: `tokens ≈ words × 1.3`

Use `scripts/measure-context.js` for protocol file word counts (RUNTIME.md ≤ 3,200 words).

---

## ZONE TRANSITIONS

```
🟢 Green ──[>60%]──► 🟡 Yellow ──[>80%]──► 🔴 Red ──[>95%]──► ⚫ Critical
```

Transitions are **one-directional** within a session. Once a higher zone is entered, the system stays in that zone even if utilization temporarily drops. This prevents oscillation.

---

## COMPRESSION ACTIONS

When entering Yellow or Red zone, apply these compression strategies in order:

1. **Summarize history**: Replace detailed exchange history with bullet-point summaries
2. **Unload unused skills**: Release skill files not referenced in last 3 exchanges
3. **Compress deliverables**: Switch to condensed output format
4. **Drop optional context**: Remove examples, verbose explanations, optional sections
5. **Emergency save** (Critical only): Write current state to `./reports/{topic}/` and halt

---

## EMERGENCY SAVE PROTOCOL

When Critical zone (>95%) is reached:

1. **WRITE** current deliverable state to `./reports/{topic}/emergency-save-{timestamp}.md`
2. **NOTIFY** user: "Context budget critical. Progress saved. Please start a new session to continue."
3. **HALT** all further expansion — no new file loads, no new agent dispatches
4. **PRESERVE** the save file path in the final message for session continuity

---

## ZONE-TO-TIER MAPPING

| Zone | Skill Tier | Reference |
|------|:----------:|-----------|
| 🟢 Green | T1 (Full) | SKILL-DEGRADATION.md |
| 🟡 Yellow | T2 (Reduced) | SKILL-DEGRADATION.md |
| 🔴 Red | T3 (Minimal) | SKILL-DEGRADATION.md |
| ⚫ Critical | HALT | SKILL-DEGRADATION.md |

---

## SECURITY CONSIDERATIONS

- Zone is system-measured — no user override path
- Emergency save writes only to `./reports/{topic}/` (deterministic, safe path)
- Compression actions are read-reduction only — they never modify source files
- No external network calls in budget management
