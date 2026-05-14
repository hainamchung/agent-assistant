# regression-testing — Professional Skill

> **TIER**: 2 | **TRIGGER**: Bug fixes, refactoring, dependency updates, legacy code changes
> **PURPOSE**: Ensure changes don't break existing functionality

---

## Trigger Conditions

```
APPLY WHEN:
  □ Fixing a bug that could have side effects
  □ Refactoring existing code
  □ Updating dependencies or libraries
  □ Modifying shared utilities or base classes
  □ Changing database schema or migrations
  □ Modifying API contracts
  □ Adding new code to an existing module

SKIP WHEN:
  □ Brand new feature with no existing code (→ professional/feature-design)
  □ No existing tests to regression (→ professional/testing)
  □ Full system redesign (→ expert/system-design)
  □ Hotfix with no test coverage (→ foundation/debugging)
```

---

## Actions

### Step 1: Identify What Could Break

```
□ What is the scope of the change?
□ What code depends on what you're changing?
□ What are the call sites? (who calls this code, who is called by it)
□ What are the consumers? (who uses this API, service, module)
□ What integration points exist? (DB, APIs, file system, queues)
□ What shared state exists? (globals, caches, singletons)
□ What are the behavioral contracts? (what does this code promise)
□ What assumptions do other parts of the system make?

□ Call graph analysis: what calls what.
□ Consumer analysis: who depends on this code.
□ Contract analysis: what behavior is expected.
□ State analysis: what shared state is accessed.
```

### Step 2: Inventory Existing Tests

```
□ What tests already exist for the code being changed?
□ What coverage exists for call sites and consumers?
□ Are there integration tests for affected paths?
□ Are there E2E tests for affected user flows?
□ What tests would catch a regression?
□ What tests are missing? (gaps in coverage)
□ Are existing tests deterministic? (not flaky)
□ Are existing tests maintained? (not commented out)

□ If no tests exist: this is a RED FLAG for a regression-prone change.
□ If tests are commented out: why? Fix them or delete them.
```

### Step 3: Add Regression Tests

```
□ Test the bug that was fixed (prevent the specific bug from returning).
□ Test the existing behavior at the call site (prevent behavioral change).
□ Test the integration points (prevent breakage at boundaries).
□ Test the error paths (prevent silent failure).
□ Test the edge cases that existed before (prevent old bugs from returning).

□ If the bug was: "null pointer when user not found"
□ Add test: "throws appropriate error when user not found" (and passes)
□ Add test: "returns correct result when user exists" (regression test)

□ Every bug fix should include a regression test.
□ The test should FAIL before the fix and PASS after.
```

### Step 4: Refactor Safely

```
□ Change behavior in small steps, not big bangs.
□ Rename in steps: add new name → migrate callers → remove old name.
□ Extract method in steps: create new method → redirect calls → inline old.
□ Don't change signatures without backward compatibility or migration plan.
□ Add new parameters with defaults before making them required.
□ Add new return values to the end of the response object.
□ The Strangler Fig pattern: new system wraps old system gradually.

□ Before refactoring: understand the existing tests and their intent.
□ During refactoring: run tests after every small change.
□ After refactoring: all tests pass, no behavioral changes.
```

### Step 5: Test Dependency Updates

```
□ Read the changelog: what changed between versions?
□ Check for breaking changes: API changes, removed features.
□ Update one dependency at a time.
□ Run the full test suite after each update.
□ Check for deprecation warnings.
□ Check for security advisories.
□ Update in staging before production.
□ Test manually if automated coverage is insufficient.

□ Major version updates: expect breaking changes, plan migration.
□ Minor version updates: usually safe, but test anyway.
□ Patch version updates: low risk, but still test.
```

### Step 6: Verify Before Merging

```
□ All existing tests pass.
□ New regression tests pass.
□ No test was commented out or skipped.
□ Manual testing of the affected paths.
□ Integration tests of affected boundaries.
□ Performance is not degraded (regression in speed counts).
□ No new warnings or deprecations.
□ The change does not require changes to consumers (or consumers updated).
```

---

## Outputs

```
## Regression Test Plan

### Scope of Change
[Affects: list of modules, call sites, consumers]

### Existing Test Coverage
|| Area | Covered | Gap |
||------|---------|-----|
|| [area] | [yes/no] | [missing] |

### New Regression Tests Added
|| Test | Scenario | Coverage |
||------|---------|---------|
|| [name] | [what it tests] | [what it covers] |

### Refactoring Safety Checklist
□ Behavioral contract documented
□ Callers identified
□ Migration plan for each breaking change
□ Tests pass at each step
□ No silent behavioral changes

### Dependency Update Checklist
□ Changelog reviewed
□ Breaking changes identified
□ Tests run after each update
□ No deprecation warnings
□ Security advisory check

### Pre-Merge Verification
□ All tests pass
□ New regression tests pass
□ Manual verification of affected paths
□ Integration tests pass
□ Performance regression check
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Coverage | Existing coverage maps to change scope | Add tests for gaps |
| Regression | Bug fix has regression test | Cannot merge fix |
| Refactor | Small steps with tests at each step | Break into smaller steps |
| Deps | Each dependency update tested | Test in staging first |
| Verification | All tests pass before merge | Fix before merge |

---

## Common Mistakes

```
❌ Not identifying all call sites before changing an interface
❌ Commenting out failing tests instead of fixing them
❌ Refactoring in big bangs instead of small steps
❌ Not adding regression tests for the specific bug that was fixed
❌ Updating multiple dependencies at once (hard to isolate issues)
❌ Trusting that existing tests cover the change
❌ Not checking behavioral contracts before refactoring
❌ Breaking consumers without updating them
```
