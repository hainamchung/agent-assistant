# testing — Professional Skill

> **TIER**: 2 | **TRIGGER**: Test strategy, test coverage, test types, test automation
> **PURPOSE**: Build confidence through the right tests at the right level

---

## Trigger Conditions

```
APPLY WHEN:
  □ Setting up a test strategy for a feature
  □ Writing unit, integration, or E2E tests
  □ Balancing test coverage vs. maintenance cost
  □ Choosing between test types
  □ Mocking and stubbing decisions
  □ Test data management

SKIP WHEN:
  □ Expert-level test architecture (→ expert/system-design)
  □ Performance testing (→ specialized/performance)
  □ Security testing (→ specialized/security)
  □ Simple bug fix with no regression risk (→ foundation/debugging)
```

---

## Actions

### Step 1: Define the Test Strategy

```
□ What is the cost of a bug in production?
□ What types of tests are needed? (unit, integration, E2E)
□ What is the right coverage target? (not 100%, but meaningful)
□ What should NOT be tested? (framework internals, trivial code)
□ What is the test maintenance burden? (brittle tests are expensive)
□ What is the test runtime budget? (slow tests don't run in CI)
□ Who writes tests? (developers own their tests)
□ What is the test data strategy? (fixtures, factories, snapshots)

TEST PYRAMID:
  E2E: few, expensive, high confidence (scary to change)
  Integration: some, medium cost, good for boundaries
  Unit: many, cheap, fast, isolation (easy to write, hard to maintain)

  Unit tests are for LOGIC (business rules, transformations).
  Integration tests are for INTEGRATIONS (DB, APIs, file system).
  E2E tests are for USER FLOWS (critical paths, smoke tests).
```

### Step 2: Write Unit Tests

```
□ What are you testing? (one function/class, one behavior)
□ What is the input? (happy path, edge cases, invalid input)
□ What is the expected output?
□ What is mocked? (only external dependencies)
□ Is the test deterministic? (no time, randomness, network)
□ Does the test have a single assertion? (or a few related ones)
□ Is the test readable? (test name describes the behavior)

□ Arrange: set up inputs and mocks
□ Act: call the function
□ Assert: verify the output

□ Don't test private methods — they're implementation details.
□ Don't over-mock — if you're mocking everything, you're not testing.
□ Don't test one assertion per test — group related assertions.
```

### Step 3: Write Integration Tests

```
□ What boundary are you testing? (DB, API, file system)
□ What is the scope? (one integration point at a time)
□ Is the test isolated? (doesn't depend on other tests)
□ What is the test data? (fixtures, factories, migrations)
□ Can you test without a real database? (testcontainers, sqlite)
□ Can you test without a real API? (wiremock, mountebank)
□ Is the test fast? (integration tests are slower)
□ Do you clean up? (reset state between tests)

□ Integration tests should test the GLUCODE, not the internals.
□ Use real implementations where possible, mock at the edge.
□ Integration tests with a real DB need careful data management.
```

### Step 4: Write E2E Tests

```
□ What critical user flows are you testing? (top 5-10 paths)
□ Is the test stable? (no flakiness, no race conditions)
□ Do you use realistic test data? (don't test with "test" values)
□ Does the test clean up after itself?
□ How do you handle authentication in tests?
□ Do you run E2E in CI? (at what frequency?)
□ How do you handle visual regression? (screenshots, diffs)

□ E2E tests are EXPENSIVE. Only test the paths that matter.
□ Prefer API-level E2E over UI-level E2E (faster, more reliable).
□ E2E tests should be smoke tests, not exhaustive.
□ Flaky E2E tests are worse than no E2E tests (boy who cried wolf).
```

### Step 5: Mocking Strategy

```
□ What to mock: external services, databases, file system, time
□ What NOT to mock: the unit under test, simple value objects
□ Prefer stubs over mocks (verify output vs. verify behavior)
□ Don't mock what you're not supposed to touch
□ Don't over-specify (mocks that are too detailed are brittle)
□ Verify interactions that matter, ignore implementation details

□ MOCK: "this method was called with these arguments"
□ STUB: "return this value when this method is called"

□ Don't mock the database — use testcontainers or sqlite.
□ Don't mock time — use time manipulation in the test framework.
```

### Step 6: Test Coverage Strategy

```
□ Cover the happy path for all features.
□ Cover the important edge cases (null, empty, max).
□ Cover the error paths (what happens when things fail).
□ Cover the bug fixes (regression tests).
□ Don't chase 100% coverage — it's a vanity metric.

□ GOOD: 80% coverage with meaningful tests
□ BAD: 100% coverage with tests that don't test anything

□ Code coverage tells you what's EXECUTED, not what's TESTED.
□ Mutation testing (e.g., stryker) tells you if tests find bugs.
```

---

## Outputs

```
## Test Strategy

### Test Types
|| Type | Count Target | Runtime | Scope | When to Run |
||------|-------------|---------|-------|-------------|
|| Unit | [N] | < 1s | function/class | every commit |
|| Integration | [N] | < 10s | integration point | every commit |
|| E2E | [N] | < 5min | user flow | nightly / pre-deploy |

### Coverage Targets
|| Type | Target | Not Covered |
||------|--------|-------------|
|| Line | [80%] | [known gaps] |
|| Branch | [70%] | [known gaps] |
|| Mutation | [80%] | [known gaps] |

### Test Data Strategy
|| Type | Strategy | Tools |
||------|----------|-------|
|| Unit | Inline values | direct |
|| Integration | Factories | [factory_bot, factory_boy] |
|| E2E | Seeds | [fixtures, seeds] |

### Critical Paths (E2E)
|| Path | Tests | Flakiness |
||------|-------|-----------|
|| [path] | [tests] | [low/med/high] |

### Anti-Patterns to Avoid
□ Tests that depend on execution order
□ Tests that share mutable state
□ Tests that don't clean up
□ Tests that are commented out
□ Tests that only pass on CI
□ Tests that mock too much
```

---

## Quality Gates

| Gate | Requirement | Fail Action |
|------|-------------|-------------|
| Unit tests | Logic is tested, mocks are minimal | Add tests or remove mocks |
| Integration | DB and API boundaries have tests | Add integration tests |
| E2E | Critical paths have smoke tests | Add E2E for gaps |
| Fast | CI pipeline < 15 min | Optimize slow tests |
| Deterministic | No flaky tests in CI | Fix or delete flaky tests |
| Regression | Bug fixes include regression tests | Cannot merge bug fix |

---

## Common Mistakes

```
❌ 100% code coverage with meaningless tests
❌ Testing implementation details (private methods, internal state)
❌ Over-mocking (mocking everything means testing nothing)
❌ Brittle tests that break on refactoring
❌ Tests that depend on execution order
❌ Not running tests in CI
❌ E2E tests that are flaky and expensive
❌ Tests that don't clean up (state pollution)
❌ Not testing error paths
❌ Commenting out failing tests instead of fixing them
```
