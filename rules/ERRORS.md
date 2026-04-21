# 🛠️ ERRORS

> **LOAD**: When errors occur | **PURPOSE**: Self-healing protocols

---

## CORE PRINCIPLE

```
Every error MUST lead to:
  1. Successful completion, OR
  2. Explicit user decision

❌ FORBIDDEN: Silent halt, unexplained termination
```

---

## ERROR CLASSIFICATION

| Code | Type | Description | Response |
|------|------|-------------|----------|
| E1 | Transient | Timeout, network | Retry 3x with backoff |
| E1b | Output Overflow | File too large for single creation | Switch to chunked strategy |
| E2 | Recoverable | Logic error | Log, attempt alternative |
| E3 | Blocking | Critical failure | Safe point → Best option → Auto-recover |
| E4 | Cascading | Affects downstream | Stop propagation → Rollback → Report |

---

## RECOVERY PROTOCOL

```yaml
on_error:
  1. CAPTURE: error type, phase, agent, state
  2. CLASSIFY: E1/E1b/E2/E3/E4
  3. ATTEMPT recovery:
     E1: Retry (max 3)
     E1b: Switch to chunked deliverable strategy (see PHASES.md)
     E2: Alternative approach
     E3: Pick best recovery option → auto-recover
     E4: Rollback, report impact
  4. RESUME immediately
  5. NEVER halt silently
```

---

## USER ESCALATION

```markdown
## ⚠️ BLOCKED — Decision Required

**Error**: {description}
**Impact**: {affected items}

**Options**:
A) {Alternative} — {tradeoff}
B) {Skip with gap} — {limitation}
C) {Provide input} — {what's needed}
D) {Modify requirements} — {suggestion}

⏳ Awaiting selection...
```

---

## VIOLATION CORRECTION

```yaml
on_violation:
  1. PAUSE at safe point
  2. NOTIFY: "⚠️ Violation: {code}"
  3. BACKTRACK to correct state
  4. RE-EXECUTE correctly
  5. UPDATE downstream
  6. RESUME

max_corrections_per_phase: 3
on_limit: Escalate to user
```

---

## ANTI-PATTERNS (A1-A10)

| Code | Anti-Pattern | Correct Behavior |
|------|--------------|------------------|
| A1 | Direct implementation | Delegate to specialist |
| A2 | Workflow bypass | Follow phase order |
| A3 | Silent halt | Notify + provide options |
| A4 | Skipped step | Backtrack + complete |
| A5 | Lazy fallback | Attempt TIER 1 first |
| A6 | Assumed requirements | Ask for clarification |
| A7 | Modified prior deliverable | Treat as immutable |
| A8 | Batched phase loading | One phase at a time |
| A9 | Meta agent implementing | Meta agents delegate only |
| A10 | Unexplained termination | Always explain + options |

---

## RESILIENCE GUARANTEES

```yaml
guarantees:
  - NO task is ever silently skipped
  - NO workflow terminates without explanation
  - EVERY error leads to resolution or user decision
  - System ALWAYS recovers or escalates gracefully

future_proof:
  - New platforms auto-detected via Tool Discovery
  - TIER 2 EMBODY always available as fallback
  - No hard dependencies on specific tools
```

---

## SELF-HEALING PROTOCOL

```
1. DETECT violation or error
2. PAUSE at nearest safe point
3. LOG: "\u26a0\ufe0f {violation_code}: {description}"
4. BACKTRACK to correct state if needed
5. RE-EXECUTE correctly
6. UPDATE downstream if affected
7. RESUME normal flow
```
