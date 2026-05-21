# Configuration

> **File**: `documents/knowledge-source-base/04-configuration.md`
> **Purpose**: Configuration files, environment variables, and platform replacement map

---

## Overview

Agent Assistant uses file-based configuration with JSON, YAML frontmatter, and TOML formats. This document covers all configuration files and their purpose.

---

## Configuration File Index

| File | Format | Purpose |
|------|--------|---------|
| `package.json` | JSON | NPM package configuration |
| `.releaserc.json` | JSON | Semantic release configuration |
| `web/package.json` | JSON | Web dependencies |
| `web/vite.config.ts` | TypeScript | Vite build configuration |
| `web/tsconfig.json` | JSON | TypeScript configuration |
| `code-assistants/*/config.toml` | TOML | Platform-specific settings |
| `commands/*/config.yaml` | YAML | Command-specific settings |

---

## File 1: package.json (Root)

### Location
`package.json`

### Purpose
NPM package manifest for the Agent Assistant CLI

### Key Properties

```json
{
  "name": "@namch/agent-assistant",
  "version": "4.0.0",
  "description": "Multi-agent orchestration framework for AI coding assistants",
  "main": "cli/install.js",
  "scripts": {
    "install": "node cli/install.js",
    "install:list": "node cli/install.js --list",
    "install:uninstall": "node cli/install.js --uninstall",
    "release": "semantic-release"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": [
    "agent",
    "ai",
    "orchestration",
    "multi-agent",
    "cursor",
    "copilot",
    "claude"
  ],
  "author": "NamCH",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/hainamchung/agent-assistant"
  }
}
```

---

## File 2: .releaserc.json

### Location
`.releaserc.json`

### Purpose
Semantic release configuration for automated versioning

### Configuration Structure

```json
{
  "branches": ["main", "master"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/npm"
  ],
  "preset": "conventionalcommits"
}
```

### Plugin Configuration

| Plugin | Purpose |
|--------|---------|
| `commit-analyzer` | Analyze commit messages |
| `release-notes-generator` | Generate release notes |
| `changelog` | Update CHANGELOG.md |
| `github` | Create GitHub release |
| `npm` | Publish to npm |

---

## File 3: web/package.json

### Location
`web/package.json`

### Purpose
Web application dependencies and scripts

### Key Properties

```json
{
  "name": "agent-assistant-web",
  "private": true,
  "version": "4.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "framer-motion": "^12.0.0",
    "@xyflow/react": "^12.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.0.0"
  }
}
```

---

## File 4: web/vite.config.ts

### Location
`web/vite.config.ts`

### Purpose
Vite build configuration

### Configuration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### Key Options

| Option | Value | Purpose |
|--------|-------|---------|
| `plugins` | `[react()]` | React plugin |
| `server.port` | `5173` | Dev server port |
| `build.outDir` | `dist` | Build output |

---

## File 5: web/tsconfig.json

### Location
`web/tsconfig.json`

### Purpose
TypeScript configuration for the web application

### Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## File 6: Platform Config (TOML)

### Location
`code-assistants/{platform}/config.toml`

### Purpose
Platform-specific configuration for each AI coding tool

### Example: Cursor

```toml
[platform]
name = "Cursor"
id = "cursor"

[paths]
base = "{{CURSOR_PATH}}"
agents = "{{CURSOR_PATH}}/agents/"
rules = "{{CURSOR_PATH}}/rules/"
commands = "{{CURSOR_PATH}}/commands/"

[instructions]
file = "CURSOR.md"
autoInject = true
```

### Platform Configurations

| Platform | File |
|----------|------|
| Cursor | `code-assistants/cursor/config.toml` |
| Copilot | `code-assistants/copilot/config.toml` |
| Claude | `code-assistants/claude/config.toml` |
| Antigravity | `code-assistants/antigravity/config.toml` |
| Codex | `code-assistants/codex/config.toml` |

---

## Platform Path Replacement Map

### Purpose
Map internal placeholders to platform-specific paths

### Replacement Table

| Internal Placeholder | Cursor | Copilot | Claude | Antigravity | Codex |
|---------------------|--------|---------|--------|-------------|-------|
| `{{CURSOR_PATH}}` | `~/.{TOOL}/` | — | — | — | — |
| `{{COPILOT_PATH}}` | — | `~/.github/copilot/` | — | — | — |
| `{{CLAUDE_PATH}}` | — | — | `~/.claude/` | — | — |
| `{{ANTIGRAVITY_PATH}}` | — | — | — | `~/.antigravity/` | — |
| `{{CODEX_PATH}}` | — | — | — | — | `~/.codex/` |

### Replacement Process

```javascript
// Example replacement in cli/install.js
function replacePaths(content, platform) {
  const replacements = {
    cursor: {
      '{{CURSOR_PATH}}': '~/.{TOOL}/',
      '{{COPILOT_PATH}}': '',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': ''
    },
    copilot: {
      '{{CURSOR_PATH}}': '',
      '{{COPILOT_PATH}}': '~/.github/copilot/',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': ''
    },
    // ... etc
  };
  
  let result = content;
  for (const [placeholder, path] of Object.entries(replacements[platform])) {
    result = result.replace(new RegExp(placeholder, 'g'), path);
  }
  return result;
}
```

---

## Agent Frontmatter Configuration

### Purpose
Configure agents via YAML frontmatter

### Example Frontmatter

```yaml
---
id: backend-engineer
name: Backend Engineer
role: implementation
profile: backend-development
reportsTo: tech-lead
consults:
  - database-architect
  - devops-engineer
standard: docs-as-code
capabilities:
  - server-side-development
  - api-design
  - database-management
skills:
  required:
    - nodejs
    - python
    - databases
  preferred:
    - docker
    - redis
    - postgresql
---
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `name` | string | Yes | Human-readable name |
| `role` | string | Yes | Role category |
| `profile` | string | Yes | Behavior profile |
| `reportsTo` | string | No | Parent agent |
| `consults` | string[] | No | Related agents |
| `standard` | string | Yes | Execution standard |
| `capabilities` | string[] | No | Capabilities |
| `skills.required` | string[] | No | Required skills |
| `skills.preferred` | string[] | No | Preferred skills |

---

## Command Frontmatter Configuration

### Purpose
Configure commands via YAML frontmatter

### Example Frontmatter

```yaml
---
command: /cook
purpose: Implementation of features and components
variants:
  - fast
  - hard
  - team
defaultAgents:
  - frontend-engineer
  - backend-engineer
qualityGates:
  fast:
    - code-review
  hard:
    - code-review
    - tests
    - linting
  team:
    - code-review
    - tests
    - linting
    - security-scan
    - performance-check
---
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command` | string | Yes | Command name |
| `purpose` | string | Yes | What it does |
| `variants` | string[] | Yes | Available variants |
| `defaultAgents` | string[] | Yes | Default agents |
| `qualityGates` | object | No | Quality gates per variant |

---

## Evidence Sources

- `package.json` — NPM configuration
- `.releaserc.json` — Release configuration
- `web/package.json` — Web dependencies
- `web/vite.config.ts` — Vite configuration
- `web/tsconfig.json` — TypeScript configuration
- `code-assistants/*/config.toml` — Platform configs
- `agents/*/agent-*.md` — Agent frontmatter examples
- `commands/*/*.md` — Command frontmatter examples
