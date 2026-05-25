# Testing Standards

> **File**: `.documents/knowledge-standards/04-testing-standards.md`
> **Purpose**: Testing practices, node --test, test file patterns, linting

---

## Overview

Agent Assistant testing standards cover:
- JavaScript validation with `node --check`
- TypeScript compilation checks
- Linting practices
- Test file organization

---

## Testing Strategy

### Philosophy

| Principle | Description |
|-----------|-------------|
| **Lint first** | Validate syntax before testing |
| **Type check** | Catch type errors early |
| **Minimal tests** | CLI is simple, tests are minimal |
| **Manual verification** | Some things tested manually |

---

## JavaScript Validation

### Syntax Check

Use `node --check` to validate JavaScript syntax:

```bash
# Check a single file
node --check cli/install.js

# Check all JS files
find . -name "*.js" -exec node --check {} \;
```

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | No errors |
| 1 | Syntax error found |

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Unexpected token` | Syntax error | Check parentheses, braces |
| `Unexpected identifier` | Missing quote | Add closing quote |
| `Unexpected end of input` | Unclosed block | Close braces |

---

## TypeScript Validation

### Compilation Check

```bash
# Check TypeScript files
cd web
npx tsc --noEmit

# With specific config
npx tsc -p tsconfig.json --noEmit
```

### Strict Mode

The project uses strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Test File Pattern

### Location

```
agent-assistant/
├── cli/
│   └── install.js
└── tests/           # Test files (if added)
    └── install.test.js
```

### Test File Naming

| Pattern | Example |
|---------|---------|
| Unit tests | `*.test.js` |
| Integration tests | `*.integration.test.js` |
| Test helpers | `*.helper.js` |

### Test Structure

```javascript
// tests/install.test.js
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('CLI Installation', () => {
  it('should validate platform paths', () => {
    // Test implementation
  });
  
  it('should replace path placeholders', () => {
    // Test implementation
  });
});
```

---

## Node.js Test Runner

### Basic Usage

```javascript
const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');

describe('MyModule', () => {
  before(() => {
    // Setup
  });
  
  after(() => {
    // Teardown
  });
  
  it('should do something', () => {
    assert.strictEqual(actual, expected);
  });
});
```

### Assertions

| Method | Purpose |
|--------|---------|
| `assert.strictEqual(a, b)` | Strict equality |
| `assert.deepStrictEqual(a, b)` | Deep equality |
| `assert.throws(fn)` | Expect error |
| `assert.doesNotThrow(fn)` | No error expected |
| `assert.fail(msg)` | Force failure |

### Running Tests

```bash
# Run all tests
npm test

# Run specific file
node --test tests/install.test.js

# Run tests matching pattern
node --test tests/*.test.js
```

---

## Linting

### JavaScript Linting

For CLI code, basic linting via syntax check:

```bash
# Syntax check only
node --check cli/install.js
```

### TypeScript Linting

For web code, ESLint:

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### ESLint Configuration

`.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

---

## Test Coverage

### Coverage Goals

| Type | Target |
|------|--------|
| Critical path | 100% |
| CLI functions | 80% |
| Utilities | 70% |

### Coverage Report

```bash
# Generate coverage (if using c8)
npx c8 node --test tests/*.test.js

# View report
npx c8 report
```

---

## Manual Testing Checklist

For features not covered by automated tests:

### CLI Installation

- [ ] Install to Cursor
- [ ] Install to Copilot
- [ ] Install to Claude
- [ ] Install to Antigravity
- [ ] Install to Codex
- [ ] List installations
- [ ] Uninstall all
- [ ] Path replacements work

### Web Application

- [ ] Dev server starts
- [ ] Build completes
- [ ] All pages render
- [ ] Routing works
- [ ] Responsive on mobile

### Commands

- [ ] Fast variant executes
- [ ] Hard variant executes
- [ ] Team variant executes
- [ ] Error handling works

---

## Continuous Integration

### CI Pipeline

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: node --check cli/install.js
      - run: npm test
      - run: npm run lint
```

### Required Checks

| Check | Command | Required |
|-------|---------|----------|
| Syntax | `node --check` | Yes |
| Tests | `npm test` | If tests exist |
| Lint | `npm run lint` | For web |
| Build | `npm run build` | For web |

---

## Evidence Sources

- `package.json` — Test scripts
- `web/package.json` — Web dependencies
- `cli/install.js` — CLI implementation
- `web/tsconfig.json` — TypeScript config
