# backend — Foundation Skill

> **TIER**: 1 | **TRIGGER**: Simple backend changes, single-endpoint fixes, small logic updates
> **PURPOSE**: Make targeted backend changes without introducing bugs

---

## Trigger Conditions

```
APPLY WHEN:
  □ Fixing a simple bug in an existing endpoint
  □ Adding a small helper function
  □ Updating error messages
  □ Adding simple validation
  □ Small query changes
  □ Simple middleware additions
  □ Logging additions
  □ Small refactors (< 20 lines)

SKIP WHEN:
  □ New endpoints or routes (→ professional/api-design)
  □ Database schema changes (→ professional/database)
  □ Complex business logic (→ professional/feature-design)
  □ Multi-file changes (→ professional/backend)
  □ Performance issues (→ specialized/performance)
  □ Security issues (→ specialized/security)
```

---

## Actions

### Step 1: Locate the Right Code

```
□ Find the relevant route, controller, or service file.
□ Find the existing patterns for similar changes.
□ Check for tests that cover this code.
□ Understand the current behavior.
□ Identify what specifically needs to change.
□ Check if there are any related files (models, validators).
```

### Step 2: Understand the Context

```
□ What is this endpoint/service supposed to do?
□ What are the existing validation rules?
□ What are the error codes?
□ What are the logging conventions?
□ What is the request/response format?
□ Are there shared utilities for this pattern?
□ Is there a middleware that applies here?
```

### Step 3: Make the Change

```
□ Keep the change minimal. Don't refactor adjacent code.
□ Follow existing naming conventions.
□ Follow existing error handling patterns.
□ Follow existing logging patterns.
□ Use existing utility functions instead of inline logic.
□ Don't introduce new dependencies.

□ If adding validation: what happens on failure? (return error, throw)
□ If adding logging: what level? (debug, info, warn, error)
□ If adding error handling: catch specific errors, not bare Exception
```

### Step 4: Verify the Change

```
□ Does the code compile? (no syntax errors)
□ Do the existing tests pass?
□ Does the linter pass?
□ Is there a type checker? (does it pass)
□ If adding tests: do they cover the new behavior?
□ If changing validation: does it handle edge cases?
□ If changing error handling: is the error message actionable?
□ Does the change handle the error paths? (null, empty, invalid)
```

---

## Outputs

```
## Backend Change Summary

### Change Location
File: [path]
Function/Route: [name]

### What Changed
[Description of the change]

### Verification
□ Compiles: [OK/ISSUE]
□ Existing tests: [pass/fail/N/A]
□ New tests: [pass/fail/N/A]
□ Linter: [pass/fail]
□ Type check: [pass/fail/N/A]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Scope | Change is minimal and targeted | Limit scope |
| Pattern | Follows existing code patterns | Adjust to match |
| Tests | Existing tests pass | Fix if broken |
| Errors | Error handling follows conventions | Match patterns |

---

## Common Mistakes

```
❌ Changing adjacent code that wasn't part of the fix
❌ Not handling null/empty inputs
❌ Using console.log instead of proper logging
❌ Catching bare Exception instead of specific errors
❌ Not following existing error response format
❌ Breaking existing tests
❌ Introducing new dependencies for small changes
```
