---
title: Code Style Guide
type: decision
tags: [code-style, standards, javascript, typescript, markdown]
created: 2026-05-20
updated: 2026-05-20
---

# Code Style Guide

Code style standards ensure consistency across the Agent Assistant codebase. These standards cover JavaScript (CLI), TypeScript (Web), and Markdown (documentation), with automated validation where possible.

---

## JavaScript Standards (CLI)

The CLI (`cli/install.js`) uses plain JavaScript ES2022+ with these conventions:

### Formatting Rules

| Rule | Standard |
|------|----------|
| Semicolons | Required (not optional) |
| Quotes | Single quotes (`'string'`) |
| Indentation | 2 spaces |
| Braces | K&R style (opening brace on same line) |
| Trailing commas | Required for multiline arrays/objects |
| Line length | 100 characters maximum |
| File encoding | UTF-8 |

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `installPath`, `isValid` |
| Functions | camelCase | `install()`, `replacePaths()` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES`, `DEFAULT_PORT` |
| Classes | PascalCase | (rarely used in CLI) |

### Validation

```bash
# Check syntax without executing
node --check cli/install.js
```

Exit code 0 means no syntax errors. Exit code 1 means a syntax error was found.

**Source**: `.documents/knowledge-standards/01-code-style.md:17-98`

---

## TypeScript Standards (Web)

The web application uses TypeScript with strict mode. All JavaScript rules apply, plus:

### Type Rules

| Rule | Standard |
|------|----------|
| Explicit types | Required for all function parameters and return types |
| Interface naming | PascalCase with `I` prefix (optional) |
| Type aliases | PascalCase without prefix |
| Generic types | Prefer `T` or descriptive names |

### Strict Mode Requirements

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

### Validation

```bash
# Type check without emitting
npx tsc --noEmit
```

All TypeScript errors must be resolved before commit.

**Source**: `.documents/knowledge-standards/01-code-style.md:101-180`

---

## Markdown Standards

All Markdown documentation follows these conventions:

### Headings

- Use sentence case: `## This Is Sentence Case`
- H1 is reserved for the page title (set in frontmatter)
- Start content from H2
- No heading levels skipped (H2 → H3, not H2 → H4)

### Lists

- Use dash bullets: `- Item one`
- No numbered lists unless sequence matters
- Indent sub-items with 2 spaces
- No blank lines between list items

### Code Blocks

- Always include language tag: ` ```javascript `
- Use inline code for: file names, variable names, command names, values
- Wrap inline code in backticks

### Tables

- Use pipes and hyphens: `| Column | Header |`
- Align columns with pipes: `|------|--------|`
- Include header row
- Keep tables narrow (redraw if > 4 columns)

### Links

- Use descriptive link text: `[Architecture Overview]` not `[here]` or `[click here]`
- Use reference-style links for repeated URLs

### Images

- Always include alt text: `![Description of image](path/to/image.png)`

**Source**: `.documents/knowledge-standards/01-code-style.md:183-249`

---

## YAML Frontmatter Standards

Frontmatter uses YAML with these conventions:

### Format

```yaml
---
title: Page Title
type: summary
tags: [tag-one, tag-two]
created: 2026-05-20
updated: 2026-05-20
---
```

### Conventions

| Rule | Standard |
|------|----------|
| Delimiters | `---` on their own lines |
| Indentation | 2 spaces (no tabs) |
| Booleans | Lowercase: `true`, `false` |
| Lists | Inline syntax: `[item1, item2]` |
| Strings | Unquoted unless contains special characters |

**Source**: `.documents/knowledge-standards/01-code-style.md:1-20`

---

## File Organization

### JavaScript File Order

```javascript
// 1. License header (if applicable)
// 2. Imports (Node.js built-ins first, then external)
// 3. Constants
// 4. Functions (helper functions first, then main)
// 5. Classes (if any)
// 6. Exports
```

### TypeScript File Order

```typescript
// 1. License header (if applicable)
// 2. Imports (external first, then internal)
// 3. Type definitions
// 4. Interface definitions
// 5. Function implementations
// 6. Class definitions
// 7. Exports
```

### Markdown File Order

```markdown
---
# YAML frontmatter
---
# H1 (page title from frontmatter)

## Section One

Content...

## Section Two

More content...
```

---

## Related Pages

- [[Naming and Frontmatter]] — File naming conventions and frontmatter field reference
- [[Git Workflow]] — Commit conventions and CI pipeline
