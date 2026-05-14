# code-quality — Professional Skill

> **TIER**: 2 | **TRIGGER**: Code review, refactoring, technical debt, code style decisions
> **PURPOSE**: Write code that communicates intent, not just correctness

---

## Trigger Conditions

```
APPLY WHEN:
  □ Writing code that others will read
  □ Reviewing someone else's code
  □ Addressing technical debt
  □ Refactoring for maintainability
  □ Setting coding standards
  □ Deciding on naming, structure, patterns

SKIP WHEN:
  □ Architecture decisions (→ specialized/architecture)
  □ Performance optimization (→ specialized/performance)
  □ Security hardening (→ specialized/security)
  □ Simple one-off code (→ foundation/debugging)
```

---

## Actions

### Step 1: Evaluate Readability

```
□ Can you understand what this code does without running it?
□ Can you understand WHY this code does it this way?
□ Can you predict what will happen for edge cases?
□ Is the intent clear, or do you need to decode it?
□ Are there comments that explain WHY, not WHAT?
□ Is the code self-documenting? (good names > comments)
□ Is the abstraction level consistent?
□ Are there obvious abstractions hiding in the code?

□ If you need a comment to explain WHAT the code does, rewrite it.
□ If you need a comment to explain WHY, KEEP IT.
```

### Step 2: Check Naming

```
□ Does the name reveal intent? (not implementation)
□ Is the name specific enough? (not too generic)
□ Is the name concise enough? (not too long)
□ Are boolean names clear? (isActive, hasPermission, canEdit)
□ Are function names verbs or verb phrases? (validateInput, calculateTotal)
□ Are class names nouns? (OrderProcessor, PaymentGateway)
□ Are constants named in all caps? (MAX_RETRY_COUNT)
□ Are database/UI terms consistent with existing codebase?

□ BAD: processData(), handleIt(), doStuff()
□ GOOD: validateUserInput(), calculateOrderTotal(), processCreditCardPayment()
```

### Step 3: Assess Structure

```
□ Is the function doing ONE thing? (single responsibility)
□ Is the function small? (< 20 lines is a good guideline)
□ Are functions at the same level of abstraction?
□ Are related things together? (cohesion)
□ Are unrelated things separated? (coupling)
□ Is there minimal branching? (early returns help)
□ Is there minimal nesting? (pyramid of doom is a smell)
□ Is there dead code? (unused functions, commented code)
□ Are there God objects? (classes that do too much)
□ Are there feature envy? (class that uses another class too much)
```

### Step 4: Evaluate Error Handling

```
□ Does the code handle errors explicitly?
□ Are errors caught at the right level?
□ Are error messages actionable? (not "error occurred")
□ Are errors logged with context?
□ Are errors propagated correctly?
□ Is there silent failure? (swallowed exceptions)
□ Is there try-catch everywhere? (should only catch what you handle)
□ Are resources cleaned up? (finally, defer, using)

□ Fail fast: validate inputs, reject invalid early.
□ Fail gracefully: don't crash, return errors.
□ Fail safely: clean up resources, don't leak.
```

### Step 5: Check for Technical Debt

```
□ Duplication: is there repeated code that should be extracted?
□ Magic numbers: are there unexplained constants?
□ Long parameter lists: should this be a configuration object?
□ Flag arguments: is a boolean flag a code smell? (split into methods)
□ Shotgun surgery: does every change require touching many files?
□ Parallel inheritance: do hierarchies mirror each other unnecessarily?
□ Speculative generality: is there code for features that don't exist?
□ Dead code: is there unused code that should be deleted?
□ Commented code: is there commented code that should be deleted?

□ Document technical debt: use TODO comments with owner and issue reference.
□ Prioritize technical debt: some debt is fine if you know about it.
```

### Step 6: Enforce Standards

```
□ Formatting: is a formatter applied? (prettier, gofmt, rustfmt)
□ Linting: does a linter catch style issues? (ESLint, golangci-lint)
□ Type checking: are types explicit where they matter? (TypeScript, mypy)
□ Complexity: is cyclomatic complexity low? (early returns, extract methods)
□ Naming conventions: consistent with codebase and language idioms?
□ Import organization: sorted, grouped, minimal?

□ Automate style enforcement in CI. Don't rely on human reviewers.
□ Linting should be fast. Formatting should be instant.
```

---

## Outputs

```
## Code Quality Review

### Readability
|| Criterion | Status | Issue |
||-----------|--------|-------|
|| Intent clear | [OK/ISSUE] | [issue] |
|| Comments explain WHY | [OK/ISSUE] | [issue] |
|| Abstraction level consistent | [OK/ISSUE] | [issue] |

### Naming
|| Element | Name | Assessment |
||---------|------|------------|
|| [type] | [name] | [clear/specific/concise] |

### Structure
|| Function/Class | Lines | Responsibility | Issue |
||----------------|-------|---------------|-------|
|| [name] | [N] | [single/multi] | [issue] |

### Technical Debt
|| Issue | Severity | Location | Fix |
||-------|----------|---------|-----|
|| [issue] | [H/M/L] | [location] | [fix] |

### Standards Compliance
|| Standard | Tool | Status |
||----------|------|--------|
|| Formatting | [tool] | [pass/fail] |
|| Linting | [tool] | [pass/fail] |
|| Types | [tool] | [pass/fail] |

### Recommendations
1. [priority fix with rationale]
2. [secondary fix with rationale]
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Formatting | Code is formatted | Format before commit |
| Linting | No linting errors | Fix linting issues |
| Naming | Names reveal intent | Rename if unclear |
| Structure | Functions < 20 lines, single responsibility | Refactor |
| Debt | Technical debt documented | Add TODO with issue |
| Comments | No "what" comments | Rewrite code |

---

## Common Mistakes

```
❌ Comments explaining what the code does (should be self-explanatory)
❌ Comments that are out of date (worse than no comments)
❌ Variable names that are too generic (x, temp, data)
❌ Functions that do too much (> 20 lines, multiple responsibilities)
❌ Ignoring technical debt instead of documenting it
❌ Inconsistent naming within the same codebase
❌ Not using a formatter/linter
❌ Over-engineering "for future flexibility"
❌ Premature optimization (making code complex for speed that isn't needed)
```
