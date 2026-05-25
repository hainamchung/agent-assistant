# Code Style

> **File**: `.documents/knowledge-standards/01-code-style.md`
> **Purpose**: JavaScript, TypeScript, and Markdown coding conventions

---

## Overview

Agent Assistant uses multiple languages:
- **JavaScript** for CLI (ES2022+)
- **TypeScript** for web (React)
- **Markdown** for documentation and agents

---

## JavaScript Style (CLI)

### Language Level
ES2022+ — Use modern features when beneficial.

### Validation
Run `node --check` to validate syntax:

```bash
node --check cli/install.js
```

### Style Rules

| Rule | Convention | Example |
|------|------------|---------|
| Semicolons | Required | `const x = 1;` |
| Quotes | Single quotes | `'hello'` |
| Indentation | 2 spaces | `  if (x) {` |
| Braces | K&R style | `if (x) {\n  ...\n}` |
| Commas | Trailing | `const x = { a: 1, b: 2, };` |
| Line length | 100 max | Break long lines |

### Good Example

```javascript
const path = require('path');
const fs = require('fs');

function install(platform) {
  const targetPath = getTargetPath(platform);
  
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
  
  return copyFiles(platform, targetPath);
}

module.exports = { install };
```

### Bad Example

```javascript
const path = require('path'); const fs = require('fs');

function install(platform){
  const targetPath=getTargetPath(platform);
  if(!fs.existsSync(targetPath)){fs.mkdirSync(targetPath,{recursive:true});}
  return copyFiles(platform,targetPath);
}
module.exports={install};
```

### Variable Naming

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `myVariable` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Globals | UPPER_SNAKE | `VERSION` |
| Functions | camelCase | `installPackages` |
| Classes | PascalCase | `Installer` |

### Function Patterns

```javascript
// Named export preferred for modules
function myFunction(param) {
  // Implementation
  return result;
}

module.exports = { myFunction };

// Or ES modules
export function myFunction(param) {
  return result;
}
```

---

## TypeScript Style (Web)

### Language Level
TypeScript 5.x

### Configuration
See `web/tsconfig.json` for compiler options.

### Style Rules

| Rule | Convention | Example |
|------|------------|---------|
| Semicolons | Required | `const x: number = 1;` |
| Quotes | Single quotes | `'hello'` |
| Indentation | 2 spaces | `  if (x) {` |
| Braces | K&R style | `if (x) {\n  ...\n}` |
| Types | Explicit | `const x: number = 1;` |
| Interfaces | PascalCase | `interface UserProps` |

### Type Definitions

```typescript
// Good: Explicit types
interface UserProps {
  name: string;
  email: string;
  age: number;
}

function UserCard({ name, email, age }: UserProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <span>{age}</span>
    </div>
  );
}

// Bad: Missing types
function UserCard(props) {
  return <div>{props.name}</div>;
}
```

### React Components

```typescript
// Good: Explicit props interface
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Imports

```typescript
// Good: Organized imports
import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import type { User } from './types';

// Bad: Random order
import type { User } from './types';
import React from 'react';
import { Button } from './components/Button';
import { useState, useEffect } from 'react';
```

---

## Markdown Style (Documentation)

### General Formatting

| Rule | Convention | Example |
|------|------------|---------|
| Headings | Sentence case | `## This Is A Heading` |
| Lists | Dash for bullets | `- Item one` |
| Code blocks | Language tag | ` ```javascript ` |
| Links | Descriptive text | `[Click here](url)` |
| Images | Alt text required | `![Description](url)` |

### Code Blocks

```markdown
```javascript
const x = 1;
console.log(x);
```
```

```markdown
```typescript
interface Props {
  name: string;
}
```
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### YAML Frontmatter

Agent and command files use YAML frontmatter:

```markdown
---
id: backend-engineer
name: Backend Engineer
role: implementation
skills:
  required: [nodejs, python]
  preferred: [docker, redis]
---

# Backend Engineer

Content starts here.
```

### Frontmatter Rules

| Rule | Convention |
|------|------------|
| Delimiters | `---` at start and end |
| Indentation | 2 spaces per level |
| Lists | Inline `[item1, item2]` |
| Strings | No quotes needed |
| Booleans | `true` / `false` |

---

## File Organization

### JavaScript Files

```
1. License header (if applicable)
2. Module imports
3. Constants
4. Functions
5. Classes (if any)
6. Exports
```

### TypeScript Files

```
1. Imports (external first, then internal)
2. Type definitions
3. Component/function definitions
4. Exports
```

### Markdown Files

```
1. H1 title
2. Metadata block
3. Table of contents (optional)
4. Content sections
5. Evidence sources (required)
```

---

## Comments

### JavaScript

```javascript
// Good: Explain WHY, not WHAT
// Retry with exponential backoff for transient failures
await retryWithBackoff(fn, { maxRetries: 3 });

// Bad: Useless comment
// Increment counter
counter++;
```

### TypeScript

```typescript
// Good: JSDoc for public APIs
/**
 * Calculates the sum of two numbers.
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
function sum(a: number, b: number): number {
  return a + b;
}
```

---

## Evidence Sources

- `cli/install.js` — JavaScript style examples
- `web/src/` — TypeScript/React style examples
- `agents/` — Markdown with frontmatter examples
- `commands/` — Markdown documentation examples
- `rules/` — Markdown conventions
