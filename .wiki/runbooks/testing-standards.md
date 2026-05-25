---
title: Testing Standards
type: runbook
tags: [testing, quality, lint, coverage]
created: 2026-05-20
updated: 2026-05-20
---

# Testing Standards

Testing standards define how code is validated before commit. The strategy prioritizes linting and type checking for the CLI (which is intentionally simple) and targeted test coverage for the web application.

---

## Testing Strategy

The testing approach is pragmatic: lint first, type check, then test what matters.

**Layer Priority**:
1. **Lint** — catches syntax errors and style violations
2. **Type Check** — catches type errors in TypeScript
3. **Test** — covers critical paths and edge cases

**CLI Philosophy**: The CLI (`cli/install.js`) is intentionally simple — 1716 lines of straightforward Node.js. Heavy test coverage is not required; lint and type check are sufficient.

**Web Philosophy**: The React application has more surface area. Tests cover critical paths, component behavior, and integration points.

**Source**: `.documents/knowledge-standards/04-testing-standards.md:1-200`

---

## JavaScript Validation (CLI)

The CLI uses `node --check` for syntax validation:

```bash
# Validate syntax without executing
node --check cli/install.js
```

| Exit Code | Meaning |
|-----------|---------|
| 0 | No syntax errors |
| 1 | Syntax error found |

This is the only automated check for the CLI. The simplicity of the codebase makes comprehensive unit tests unnecessary overhead.

---

## TypeScript Validation (Web)

The web application uses `tsc --noEmit` for type checking:

```bash
# Type check without emitting JavaScript
npx tsc --noEmit
```

Strict mode is enabled with these settings in `web/tsconfig.json`:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

All TypeScript errors must be resolved before commit. The `--noEmit` flag ensures no files are written.

---

## Test Commands

| Command | Purpose | CI Gate |
|---------|---------|---------|
| `node --check cli/install.js` | CLI syntax validation | Required |
| `npx tsc --noEmit` | TypeScript type checking | Required |
| `npm test` | Run test suite | Required |
| `npm run lint` | ESLint validation | Required |

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npx node:test tests/install.test.js
```

---

## Coverage Requirements

| Component | Coverage Target | Rationale |
|-----------|---------------|-----------|
| CLI functions | 80% | Intentionally simple, focus on critical paths |
| Web critical paths | 100% | Authentication, payment, data mutations |
| Web utilities | 70% | Helper functions and formatters |
| Web components | 70% | UI logic |

Coverage is measured with Node.js built-in coverage for CLI and Vite's coverage for web.

---

## Test Patterns

### CLI Tests

Tests use `node:test` runner with the `assert` module:

```javascript
import { test } from 'node:test';
import assert from 'node:assert';

test('install handles missing platform directory', async () => {
  const result = await install({ platform: 'nonexistent' });
  assert.equal(result.status, 'skipped');
});
```

### Web Tests

Tests use React Testing Library for component tests:

```typescript
import { render, screen } from '@testing-library/react';
import { HomePage } from './pages/HomePage';

test('renders project name', () => {
  render(<HomePage />);
  expect(screen.getByText('Agent Assistant')).toBeInTheDocument();
});
```

---

## Linting

ESLint validates code style and catches common errors:

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

The ESLint configuration extends recommended configs for JavaScript and React/TypeScript.

---

## Manual Testing Checklist

Before releasing, verify manually:

- [ ] CLI installs successfully on each platform
- [ ] Web dev server starts without errors
- [ ] All command variants execute correctly
- [ ] Error handling produces helpful messages
- [ ] Path replacement works across platforms

---

## Troubleshooting

### Common Failures

| Issue | Cause | Fix |
|-------|-------|-----|
| `node --check` fails | Syntax error in CLI | Fix the syntax error |
| `tsc --noEmit` fails | Type error in web | Add type annotations |
| `npm test` fails | Test assertion failed | Fix the test or the code |
| `npm run lint` fails | Style violation | Run `npm run lint:fix` or fix manually |

### Coverage Report

After running tests with coverage:

```bash
npm run test:coverage
```

Review the coverage report at `coverage/index.html` and address any critical paths below threshold.

---

## Related Pages

- [[Git Workflow]] — CI pipeline and pre-commit hooks
