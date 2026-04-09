---
schema-version: "1.0"
name: SKILL-DEGRADATION
description: Graceful skill tier degradation based on context budget pressure
status: active
---

# 📉 SKILL DEGRADATION

> **LOAD**: When context budget enters Yellow or Red zone  
> **PREREQUISITE**: `rules/CONTEXT-BUDGET.md` (zone definitions)  
> **INTEGRATION**: Steps 1-5 in `SKILLS-LITE.md` resolution flow

---

## TIERS

| Tier | Context Zone | Behavior |
|------|:------------:|----------|
| **T1 — Full** | 🟢 Green | Load all matched skills; full YAML scan; dynamic discovery enabled |
| **T2 — Reduced** | 🟡 Yellow | Load top-2 matched skills only; skip dynamic discovery; abbreviate briefings |
| **T3 — Minimal** | 🔴 Red / ⚫ Critical | Load top-1 matched skill (highest relevance); matrix-only (no dynamic); single-line briefings |

---

## BEHAVIORAL MATRIX

| Behavior | T1 (Full) | T2 (Reduced) | T3 (Minimal) |
|----------|:---------:|:------------:|:-------------:|
| Max skills loaded | 3 | 2 | 1 |
| Dynamic discovery | ✅ Enabled | ❌ Disabled | ❌ Disabled |
| YAML scan depth | Full file | First 50 entries | First 20 entries |
| Briefing format | Full description | One paragraph | One line |
| Skill conflict resolution | Full (SKILL-CONFLICTS.md) | Priority-only | Skip (use highest priority) |
| Sub-tag expansion | ✅ Depth 1 | ❌ None | ❌ None |
| Cache reuse | Fresh scan | Prefer cache | Cache only |

---

## TIER TRANSITIONS

Transitions are **one-directional during a session** (can only degrade, never upgrade):

```
T1 (Full) ──[Yellow zone]──► T2 (Reduced) ──[Red zone]──► T3 (Minimal)
```

- **T1 → T2**: Triggered when `CONTEXT-BUDGET.md` reports Yellow zone entry
- **T2 → T3**: Triggered when `CONTEXT-BUDGET.md` reports Red zone entry
- **T3 → HALT**: If Critical zone reached, skill loading halts entirely (emergency save)

> **No upgrade path**: Once degraded, the tier stays degraded for the remainder of the session.
> Rationale: Re-expanding skills after compression risks context oscillation.

---

## INTEGRATION WITH SKILLS-LITE.md

Skill degradation modifies steps 1-5 of the SKILLS-LITE.md resolution flow:

1. **READ** agent's `profile:` field → *unchanged*
2. **MATCH** tags to matrix → *T2/T3: limit scan depth*
3. **SCAN** matched YAML → *T2: first 50 entries; T3: first 20*
4. **LOAD** skill files → *T1: up to 3; T2: up to 2; T3: up to 1*
5. **FALLBACK** → *T3: skip dynamic discovery entirely*

---

## SECURITY CONSIDERATIONS

- Tier level is system-determined (from `measure-context.js`) — no user override path
- Degradation is read-only — it restricts loading, never modifies skill files
- One-directional transitions prevent oscillation attacks
