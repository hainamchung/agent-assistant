---
title: Configuration Reference
type: entity
tags: [configuration, setup, reference, toml]
created: 2026-05-20
updated: 2026-05-20
---

# Configuration Reference

The Agent Assistant uses 6 configuration files across its CLI and web components. All configuration is file-based — there is no database dependency. This makes the system git-friendly and easy to audit.

---

## Configuration Files

| File | Purpose | Format |
|------|---------|--------|
| `package.json` | NPM package manifest for CLI | JSON |
| `.releaserc.json` | Semantic Release configuration | JSON |
| `web/package.json` | NPM package manifest for web app | JSON |
| `web/vite.config.ts` | Vite build configuration | TypeScript |
| `web/tsconfig.json` | TypeScript configuration | JSON |
| `code-assistants/*/config.toml` | Platform-specific configuration | TOML |

**Source**: `documents/knowledge-source-base/04-configuration.md:1-259`

---

## package.json (Root)

Root-level NPM manifest for the CLI package.

**Key Fields**:
- `name`: `@namch/agent-assistant`
- `version`: `4.0.0` (Semantic Version)
- `main`: `cli/install.js` (entry point)
- `engines`: `node >= 18.0.0`
- `scripts`:
  - `install` — run CLI installer
  - `install:list` — list installed platforms
  - `install:uninstall` — remove installations
  - `release` — run semantic release

**Full Configuration**:

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

**Source**: `documents/knowledge-source-base/04-configuration.md:28-69`

---

## .releaserc.json

Semantic Release configuration for automated versioning and changelog generation.

**Plugins**:

| Plugin | Purpose |
|--------|---------|
| `@semantic-release/commit-analyzer` | Analyze commit messages to determine version bump |
| `@semantic-release/release-notes-generator` | Generate release notes from commits |
| `@semantic-release/changelog` | Update CHANGELOG.md |
| `@semantic-release/github` | Create GitHub releases and PRs |
| `@semantic-release/npm` | Publish to npm registry |

**Preset**: `conventionalcommits`

**Version Calculation**:
| Commit Type | Version Bump |
|-------------|-------------|
| `feat` | Minor |
| `fix` | Patch |
| `feat` + `BREAKING CHANGE` | Major |

**Full Configuration**:

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

**Source**: `documents/knowledge-source-base/04-configuration.md:73-106`

---

## web/package.json

NPM package manifest for the React web application.

**Key Dependencies**:
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | DOM rendering |
| `react-router-dom` | ^7.0.0 | Client-side routing |
| `framer-motion` | ^12.0.0 | Animations |
| `@xyflow/react` | ^12.0.0 | Node-based diagrams |
| `tailwindcss` | ^4.0.0 | Utility CSS |
| `vite` | ^6.0.0 | Build tool |
| `typescript` | ^5.0.0 | Type safety |

**Scripts**:
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server on port 5173 |
| `build` | `tsc && vite build` | Production build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint . --ext ts,tsx` | Lint TypeScript files |

**Source**: `documents/knowledge-source-base/04-configuration.md:109-220`

---

## web/vite.config.ts

Vite build configuration for the React application.

**Key Options**:

| Option | Value | Purpose |
|--------|-------|---------|
| `plugins` | `[react()]` | React plugin integration |
| `server.port` | `5173` | Dev server port |
| `server.host` | `true` | Allow external access |
| `build.outDir` | `dist` | Build output directory |
| `build.sourcemap` | `true` | Generate source maps |

**Configuration**:

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

---

## web/tsconfig.json

TypeScript compiler configuration with strict mode enabled.

**Key Compiler Options**:

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `ES2020` | ECMAScript target |
| `lib` | `["ES2020", "DOM", "DOM.Iterable"]` | Type libraries |
| `jsx` | `react-jsx` | JSX transformation |
| `module` | `ESNext` | Module system |
| `moduleResolution` | `bundler` | Resolution strategy |
| `strict` | `true` | Enable all strict checks |
| `noUnusedLocals` | `true` | Error on unused locals |
| `noUnusedParameters` | `true` | Error on unused params |
| `noFallthroughCasesInSwitch` | `true` | Require all switch cases |

**Configuration**:

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

Strict mode is required for all TypeScript files in the web application.

---

## Platform Configurations (TOML)

Each platform has a `code-assistants/{platform}/` directory with platform-specific configuration.

**7 Platform Configs**:

| Platform | Primary Config |
|----------|---------------|
| Cursor | `code-assistants/cursor-assistant/rules/agent-assistant.mdc` |
| Copilot | `code-assistants/copilot-assistant/agent-assistant.agent.md` |
| Claude | `~/.claude/` (CLAUDE.md auto-discovery) |
| Antigravity | `code-assistants/antigravity-assistant/GEMINI.md` |
| Codex | `code-assistants/codex-assistant/config.toml` + CODEX.md |
| Kiro | `code-assistants/kiro-assistant/KIRO.md` + agents/*.json |
| Qwen | `code-assistants/qwen-assistant/QWEN.md` + agents/*.md |

**Structure**:

```toml
[platform]
name = "Cursor"
id = "cursor"
version = "1.0"

[paths]
base = "{{CURSOR_PATH}}"
agents = "{{CURSOR_PATH}}/agents/"
rules = "{{CURSOR_PATH}}/rules/"
commands = "{{CURSOR_PATH}}/commands/"
skills = "{{CURSOR_PATH}}/skills/"
matrix-skills = "{{CURSOR_PATH}}/matrix-skills/"
code-assistants = "{{CURSOR_PATH}}/code-assistants/"

[instructions]
file = "CURSOR.md"
autoInject = true
```

**Source**: `documents/knowledge-source-base/04-configuration.md:224-259`

---

## Platform Path Replacement Map

Map internal placeholders to platform-specific paths for multi-platform support.

### Replacement Table

| Internal Placeholder | Cursor | Copilot | Claude | Antigravity | Codex |
|---------------------|--------|---------|--------|-------------|-------|
| `{{CURSOR_PATH}}` | `~/.cursor/` | — | — | — | — |
| `{{COPILOT_PATH}}` | — | `~/.copilot/` | — | — | — |
| `{{CLAUDE_PATH}}` | — | — | `~/.claude/` | — | — |
| `{{ANTIGRAVITY_PATH}}` | — | — | — | `~/.antigravity/` | — |
| `{{CODEX_PATH}}` | — | — | — | — | `~/.codex/` |

### Replacement Process

The installer reads TOML configs and replaces placeholders based on target platform:

```javascript
// cli/install.js - Path replacement logic
function replacePaths(content, platform) {
  const replacements = {
    cursor: {
      '{{CURSOR_PATH}}': '~/.cursor/',
      '{{COPILOT_PATH}}': '',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': ''
    },
    copilot: {
      '{{CURSOR_PATH}}': '',
      '{{COPILOT_PATH}}': '~/.copilot/',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': ''
    },
    claude: {
      '{{CURSOR_PATH}}': '',
      '{{COPILOT_PATH}}': '',
      '{{CLAUDE_PATH}}': '~/.claude/',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': ''
    },
    antigravity: {
      '{{CURSOR_PATH}}': '',
      '{{COPILOT_PATH}}': '',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '~/.antigravity/',
      '{{CODEX_PATH}}': ''
    },
    codex: {
      '{{CURSOR_PATH}}': '',
      '{{COPILOT_PATH}}': '',
      '{{CLAUDE_PATH}}': '',
      '{{ANTIGRAVITY_PATH}}': '',
      '{{CODEX_PATH}}': '~/.codex/'
    }
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

Agents are configured via YAML frontmatter in their definition files.

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
| `id` | string | Yes | Unique identifier for the agent |
| `name` | string | Yes | Human-readable display name |
| `role` | string | Yes | Role category (e.g., `implementation`, `review`, `planning`) |
| `profile` | string | Yes | Behavior profile for execution |
| `reportsTo` | string | No | Parent agent ID for hierarchy |
| `consults` | string[] | No | Related agents for collaboration |
| `standard` | string | Yes | Execution standard to follow |
| `capabilities` | string[] | No | List of capabilities |
| `skills.required` | string[] | No | Required skills for execution |
| `skills.preferred` | string[] | No | Preferred but not required skills |

See [[Agent System]] for agent architecture and [[Team System]] for team hierarchy.

---

## Command Frontmatter Configuration

Commands are configured via YAML frontmatter in their definition files.

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
| `command` | string | Yes | Command name (e.g., `/cook`, `/docs`) |
| `purpose` | string | Yes | What the command does |
| `variants` | string[] | Yes | Available execution variants |
| `defaultAgents` | string[] | Yes | Default agents to invoke |
| `qualityGates` | object | No | Quality gates per variant |

### Quality Gates

| Variant | Gates |
|---------|-------|
| `fast` | code-review |
| `hard` | code-review, tests, linting |
| `team` | code-review, tests, linting, security-scan, performance-check |

See [[Command System]] for command routing and [[Rule System]] for execution standards.

---

## Configuration Validation

Configuration files are validated during installation:

1. **TOML Parsing** — Platform configs must be valid TOML
2. **JSON Schema** — package.json validated against NPM schema
3. **TypeScript Check** — tsconfig.json validated by compiler
4. **Path Resolution** — All referenced paths must be valid

### Validation Rules

| Config File | Validation |
|-------------|------------|
| `package.json` | JSON parse, required fields check |
| `.releaserc.json` | JSON parse, plugin existence |
| `web/tsconfig.json` | TypeScript schema validation |
| `config.toml` | TOML parse, placeholder replacement |

---

## Environment-Specific Configuration

### Development

```typescript
// web/vite.config.ts - Dev overrides
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  }
});
```

### Production

```typescript
// Production optimizations
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          flow: ['@xyflow/react']
        }
      }
    }
  }
});
```

---

## Evidence Sources

- [[Platform System]] — Multi-platform abstraction with path placeholders
- [[CLI Installer]] — The installer that reads these configurations
- [[Web Application]] — The web app that uses the web configs
- `package.json` — NPM configuration
- `.releaserc.json` — Release configuration
- `web/package.json` — Web dependencies
- `web/vite.config.ts` — Vite configuration
- `web/tsconfig.json` — TypeScript configuration
- `code-assistants/*/config.toml` — Platform configs
- `agents/*/agent-*.md` — Agent frontmatter examples
- `commands/*/*.md` — Command frontmatter examples

**Source**: `documents/knowledge-source-base/04-configuration.md:262-417`
