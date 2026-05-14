# debugging — Foundation Skill

> **TIER**: 1 | **TRIGGER**: Bug fix, regression, unexpected behavior
> **PURPOSE**: Systematic bug investigation with evidence-based root cause

---

## Trigger Conditions

```
APPLY WHEN:
  □ Error message in logs/console
  □ Unexpected output or behavior
  □ Regression after recent change
  □ Test failure
  □ Performance degradation

SKIP WHEN:
  □ Architectural issue (→ specialized/debugging)
  □ Security vulnerability (→ specialized/security-audit)
  □ Race condition suspected (→ specialized/concurrency)
  □ Database corruption (→ specialized/data-integrity)
```

---

## Actions

### Step 1: Isolate the Symptom

```
□ Exact error message reproduced? (copy-paste, not paraphrase)
□ When did this start? (commit, deploy, or time-based)
□ What changed recently? (git log --since="2 days ago")
□ Does it happen consistently or intermittently?
□ What is the MINIMAL reproduction case?
□ Can you reproduce in isolation?
```

### Step 2: Gather Evidence

```
□ Stack trace captured? (full, not truncated)
□ Relevant log lines? (timestamp + context)
□ Input that triggers bug? (exact data)
□ Expected vs actual output?
□ Network requests/responses? (if applicable)
□ Database state? (if applicable)
```

### Step 3: Form Hypothesis

```
□ Based on EVIDENCE, what is most likely cause?
□ Is this NEW code or EXISTING code?
□ If new: what assumption was broken?
□ If existing: what environmental change triggered it?
□ Is there a SECONDARY symptom hiding the real cause?
```

### Step 4: Test Fix

```
□ Fix addresses ROOT CAUSE, not just symptom?
□ Fix is MINIMAL (no over-engineering)?
□ You can explain WHY this fix works?
□ Regression: other similar code has same bug?
□ If you're unsure: WHY? What would prove it?
```

---

## Outputs

```
## Debug Report

### Symptom
```
[Exact error message / behavior description]
```

### Reproduction
```
Steps to reproduce:
1. ...
2. ...
[Minimal reproduction case if available]
```

### Evidence
```
[Log lines, stack traces, screenshots]
```

### Root Cause
```
[Not "there was a bug" — specifically WHAT caused it]
```

### Fix
```
[Code change with explanation WHY this fixes it]
```

### Validation
```
□ Reproduced: [YES/NO - how did you confirm?]
□ Fix applied: [command/tool used]
□ Tested: [what did you run to verify]
□ Regression checked: [what did you verify didn't break]
```
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Evidence | Error message is EXACT copy-paste | Stop, get exact error |
| Reproduction | You can reproduce the bug | Stop, isolate further |
| Hypothesis | Root cause is specific, not generic | Stop, dig deeper |
| Fix | Explains WHY it works | Stop, validate fix logic |
| Test | Regression test added | Add test, don't skip |

---

## Common Mistakes

```
❌ "There was a bug in the code" → Root cause is not specific
❌ Fixing symptom not cause (e.g., adding try-catch everywhere)
❌ Not testing fix in isolation
❌ Assuming instead of reproducing
❌ Skipping regression check
❌ Not checking if similar bug exists elsewhere
```
