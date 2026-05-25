# Tech Stack

> **File**: `.documents/knowledge-overview/02-tech-stack.md`
> **Purpose**: Complete categorized overview of all technologies used

---

## Overview

Agent Assistant is a **hybrid application** combining:

- **CLI tooling** for installation and orchestration
- **Web documentation** for human-readable reference
- **File-based configuration** for multi-platform support
- **Markdown-based agents** for AI consumption

This architecture allows the framework to work across multiple AI coding platforms while maintaining a single codebase.

---

## Technology Categories

### Category 1: Runtime & Package Management

| Technology | Version | Purpose | File |
|------------|---------|---------|------|
| **Node.js** | >= 18.0.0 | JavaScript runtime | `cli/install.js` |
| **npm** | Latest | Package manager | `package.json` |

### Category 2: CLI Framework

| Technology | Purpose | File |
|------------|---------|------|
| **Plain JavaScript ES2022+** | CLI implementation | `cli/install.js` (1716 lines) |

**Notes**:
- No CLI framework library used (e.g., commander, yargs)
- Pure Node.js with `fs`, `path`, `process` modules
- Progress tracking with `fsync` for reliability

### Category 3: Web Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19 | UI framework |
| **Vite** | 6 | Build tool and dev server |
| **TypeScript** | — | Type safety |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **React Router** | 7 | Client-side routing |
| **Framer Motion** | 12 | Animation library |
| **ReactFlow** | 12 | Workflow visualization |
| **TypeScript** | — | Type safety for React |

**Web Entry Points**:
- `web/src/main.tsx` — Application entry
- `web/src/pages/` — Page components
- `web/src/components/` — Reusable components

### Category 4: CI/CD & Release

| Technology | Purpose | File |
|------------|---------|------|
| **Semantic Release** | Automated versioning and changelog | `.releaserc.json` |
| **Conventional Commits** | Commit message convention | `.releaserc.json` |
| **Husky** | v8 | Git hooks |

**Configuration Files**:
- `.releaserc.json` — Semantic release configuration
- `package.json` (scripts section) — Release automation

### Category 5: Documentation

| Technology | Purpose | Format |
|------------|---------|--------|
| **Markdown** | Documentation content | `.md` files |
| **Mermaid** | Architecture diagrams | Inline in markdown |
| **YAML Frontmatter** | Metadata in markdown | Document headers |

---

## Technology Stack Table (All-in-One View)

| Component | Technology | Version | Type |
|-----------|------------|---------|------|
| Runtime | Node.js | >= 18.0.0 | Runtime |
| Package Manager | npm | Latest | Tool |
| CLI Script | JavaScript | ES2022+ | Language |
| Web Framework | React | 19 | Library |
| Build Tool | Vite | 6 | Tool |
| Web Language | TypeScript | — | Language |
| Styling | Tailwind CSS | 4 | Framework |
| Routing | React Router | 7 | Library |
| Animations | Framer Motion | 12 | Library |
| Workflow Viz | ReactFlow | 12 | Library |
| Versioning | Semantic Release | — | Tool |
| Git Hooks | Husky | v8 | Tool |
| Docs Format | Markdown | — | Format |

---

## Dependencies Summary

### Production Dependencies (CLI)

None published in npm package. The CLI script is self-contained.

### Production Dependencies (Web)

See `web/package.json` for complete list. Key dependencies:

- `react` / `react-dom` — UI rendering
- `react-router-dom` — Routing
- `framer-motion` — Animations
- `@xyflow/react` — ReactFlow for workflow visualization
- `tailwindcss` — Styling

### Development Dependencies

| Dependency | Purpose |
|------------|---------|
| `typescript` | TypeScript compiler |
| `vite` | Build tool |
| `@types/*` | TypeScript type definitions |
| `husky` | Git hooks |
| `semantic-release` | Release automation |

---

## Platform Support Matrix

| Platform | Support Level | Configuration Location |
|----------|---------------|----------------------|
| **Cursor** | Full | `code-assistants/cursor/` |
| **GitHub Copilot** | Full | `code-assistants/copilot/` |
| **Claude Code** | Full | `code-assistants/claude/` |
| **Antigravity/Gemini** | Full | `code-assistants/antigravity/` |
| **Codex** | Full | `code-assistants/codex/` |

---

## Evidence Sources

- `package.json` — NPM package metadata
- `web/package.json` — Web dependencies
- `.releaserc.json` — Release configuration
- `cli/install.js` — CLI implementation
- `code-assistants/*/` — Platform configurations
