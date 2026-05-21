---
title: Tech Stack
description: Complete categorized overview of all technologies, tools, and platforms used in the Agent Assistant framework
category: summary
tags: [technology, tools, infrastructure, node, react, typescript, build-tools]
related:
  - Project Identity
  - Architecture Overview
  - CLI Installer
  - Configuration Reference
  - System Components
---

# Tech Stack

Agent Assistant is a **hybrid application** combining CLI tooling for installation and orchestration, a web documentation site for human-readable reference, file-based configuration for multi-platform support, and markdown-based agents for AI consumption. This architecture enables the framework to work across multiple AI coding platforms while maintaining a single codebase. The technology choices prioritize simplicity, portability, and developer experience over framework complexity.

**Source**: `documents/knowledge-overview/02-tech-stack.md:1-17`

---

## Overview

The technology stack spans five distinct layers that work together to provide a complete agent orchestration system:

| Layer | Primary Technologies | Purpose |
|-------|---------------------|---------|
| Runtime | Node.js >= 18.0.0 | JavaScript execution environment |
| CLI | Plain JavaScript ES2022+ | Installation and platform configuration |
| Web | React 19, Vite 6, TypeScript | Documentation and visualization UI |
| Automation | Semantic Release, Husky | CI/CD and commit conventions |
| Documentation | Markdown, Mermaid, YAML | Content authoring and metadata |

**Source**: `documents/knowledge-overview/02-tech-stack.md:21-27`

---

## Language Runtime

### Node.js

| Property | Value |
|----------|-------|
| **Technology** | Node.js |
| **Version Requirement** | >= 18.0.0 |
| **Purpose** | JavaScript runtime for CLI tooling and build processes |
| **Source File** | `cli/install.js` |

Node.js serves as the universal runtime for all CLI operations. The minimum version requirement of 18.0.0 ensures availability of modern JavaScript features including native fetch API, improved ESM support, and better performance characteristics. The choice of Node.js provides cross-platform compatibility (macOS, Linux, Windows) without requiring users to install additional language runtimes.

**Source**: `documents/knowledge-overview/02-tech-stack.md:27`

### npm

| Property | Value |
|----------|-------|
| **Technology** | npm (Node Package Manager) |
| **Version** | Latest (latest stable) |
| **Purpose** | Package management and dependency installation |
| **Source File** | `package.json` |

npm is the default package manager for both the CLI tooling and web application. It handles dependency resolution, script execution, and publishing workflows. The web application maintains its own `web/package.json` with React-specific dependencies separate from the CLI dependencies.

**Source**: `documents/knowledge-overview/02-tech-stack.md:28`

---

## Editor and IDE Support

Agent Assistant is designed to work across seven AI coding assistant platforms, each with its own configuration directory:

| Platform | Configuration Location | Support Level |
|----------|----------------------|---------------|
| **Cursor** | `code-assistants/cursor/` | Full |
| **GitHub Copilot** | `code-assistants/copilot/` | Full |
| **Claude Code** | `code-assistants/claude/` | Full |
| **Antigravity/Gemini** | `code-assistants/antigravity/` | Full |
| **Codex** | `code-assistants/codex/` | Full |
| **Kiro** | `code-assistants/kiro/` | Full |
| **Qwen** | `code-assistants/qwen/` | Full |

The platform portability architecture uses a single codebase with platform-specific configuration files. This approach ensures feature parity across all supported environments while allowing platform-specific optimizations. Each platform directory contains rules, agents, and skills tailored to that environment's API and capabilities.

**Source**: `documents/knowledge-overview/02-tech-stack.md:131-138`

---

## CLI Framework

### Plain JavaScript (No Framework)

| Property | Value |
|----------|-------|
| **Technology** | Plain JavaScript ES2022+ |
| **CLI Entry Point** | `cli/install.js` |
| **File Size** | 1716 lines |
| **Framework Used** | None (commander, yargs, etc.) |

The CLI implementation uses pure Node.js with standard library modules (`fs`, `path`, `process`) rather than external CLI framework libraries. This decision eliminates dependency bloat and reduces the attack surface for security vulnerabilities. The installer script handles all platform configuration including directory creation, file copying, and git hook setup.

**Design Decisions**:

- No external CLI framework dependency (e.g., commander, yargs,oclif)
- Progress tracking with `fsync` for reliable file writes
- Uses Node.js built-in modules exclusively
- Single-file architecture simplifies deployment and debugging

**Source**: `documents/knowledge-overview/02-tech-stack.md:30-39`

---

## Web Frontend

### Core Framework

| Technology | Version | Purpose | Source |
|------------|---------|---------|--------|
| **React** | 19 | UI framework and component architecture | `web/package.json` |
| **Vite** | 6 | Build tool, dev server, and hot module replacement | `web/package.json` |
| **TypeScript** | — | Type safety and compile-time error detection | `web/package.json` |

React 19 provides the component architecture for the documentation site and agent visualization features. Vite 6 serves as both the build tool and development server, offering fast cold starts and optimized production builds. TypeScript adds static type checking throughout the codebase, catching type-related errors before runtime.

**Source**: `documents/knowledge-overview/02-tech-stack.md:45-47`

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4 | Utility-first CSS framework for rapid UI development |

Tailwind CSS 4 enables utility-first styling without requiring custom CSS files for every component. The configuration allows consistent theming and easy customization while keeping the bundle size minimal through tree-shaking.

**Source**: `documents/knowledge-overview/02-tech-stack.md:48`

### Routing and Navigation

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Router** | 7 | Client-side routing and navigation |

React Router 7 handles all client-side navigation within the web application, supporting four primary routes: the landing page (`/`), documentation browser (`/docs`), installation guide (`/installation`), and agent team visualization (`/features/agent-teams`).

**Source**: `documents/knowledge-overview/02-tech-stack.md:49`

### Animation and Visualization

| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | 12 | Declarative animation library for React |
| **ReactFlow** | 12 | Workflow visualization and node-based diagrams |

Framer Motion 12 provides smooth page transitions, component animations, and gesture handling throughout the UI. ReactFlow 12 (imported as `@xyflow/react`) renders the interactive agent and team relationship diagrams, allowing users to explore the orchestration architecture visually.

**Source**: `documents/knowledge-overview/02-tech-stack.md:50-51`

### Web Entry Points

| File | Purpose |
|------|---------|
| `web/src/main.tsx` | Application bootstrap and React DOM rendering |
| `web/src/pages/` | Page-level components (HomePage, Docs, Installation, AgentTeams) |
| `web/src/components/` | Reusable UI components (seo/, layout/, etc.) |

**Source**: `documents/knowledge-overview/02-tech-stack.md:54-57`

---

## Package Management

### Production Dependencies (Web)

The web application depends on the following production packages:

| Package | Purpose | Source |
|---------|---------|--------|
| `react` / `react-dom` | UI rendering and DOM manipulation | `web/package.json` |
| `react-router-dom` | Client-side routing | `web/package.json` |
| `framer-motion` | Animation library | `web/package.json` |
| `@xyflow/react` | ReactFlow for workflow visualization | `web/package.json` |
| `tailwindcss` | Utility-first CSS | `web/package.json` |

### Production Dependencies (CLI)

The CLI script is self-contained with no external npm dependencies. All functionality relies on Node.js built-in modules including `fs` for file operations, `path` for path manipulation, and `process` for runtime information.

**Source**: `documents/knowledge-overview/02-tech-stack.md:103-115`

### Development Dependencies

| Dependency | Purpose |
|------------|---------|
| `typescript` | TypeScript compiler and type checking |
| `vite` | Build tool and dev server |
| `@types/*` | TypeScript type definitions for external libraries |
| `husky` | Git hooks for pre-commit and commit-msg validation |
| `semantic-release` | Automated versioning and changelog generation |

**Source**: `documents/knowledge-overview/02-tech-stack.md:117-125`

---

## CLI Tools

### Semantic Release

| Property | Value |
|----------|-------|
| **Technology** | Semantic Release |
| **Purpose** | Automated versioning, changelog generation, and release publishing |
| **Configuration** | `.releaserc.json` |
| **Integration** | Conventional Commits |

Semantic Release automates the entire release workflow by analyzing commit messages to determine version bumps, generating changelogs, and publishing releases. The configuration in `.releaserc.json` defines the release branches, plugins, and conditional publishing rules.

**Source**: `documents/knowledge-overview/02-tech-stack.md:63`

### Conventional Commits

| Property | Value |
|----------|-------|
| **Specification** | Conventional Commits |
| **Purpose** | Standardized commit message format for automated changelog generation |
| **Configuration** | `.releaserc.json` |
| **Validation** | Husky commit-msg hook |

The project enforces Conventional Commits specification through a Husky git hook that validates commit message format before allowing commits. This ensures the semantic release tool can accurately categorize changes and generate meaningful changelogs.

**Source**: `documents/knowledge-overview/02-tech-stack.md:64`

### Husky

| Property | Value |
|----------|-------|
| **Technology** | Husky |
| **Version** | v8 |
| **Purpose** | Git hooks management |
| **Hooks Used** | commit-msg, pre-commit |

Husky v8 manages Git hooks for enforcing commit message conventions and running pre-commit checks. The hooks are configured in `.husky/` directory and ensure code quality standards are maintained across all contributors.

**Source**: `documents/knowledge-overview/02-tech-stack.md:65`

---

## Testing

No explicit testing framework dependencies are listed in the source documentation. The CLI script relies on Node.js's built-in error handling and file system operations for validation. The web application uses React's testing patterns and would typically integrate Vitest or React Testing Library for component testing.

**Note**: Testing dependencies should be added based on project testing requirements. Common choices include Vitest (aligned with Vite), Jest, React Testing Library, or Playwright for end-to-end testing.

**Source**: `documents/knowledge-overview/02-tech-stack.md` (no explicit testing section)

---

## Documentation

### Markdown

| Property | Value |
|----------|-------|
| **Format** | Markdown |
| **File Extension** | `.md` |
| **Purpose** | Primary documentation content format |

All project documentation uses Markdown as the authoring format. This includes user-facing documentation, developer guides, API references, and the wiki system itself.

### Mermaid

| Property | Value |
|----------|-------|
| **Format** | Mermaid |
| **Purpose** | Architecture diagrams, flowcharts, and sequence diagrams |
| **Integration** | Inline in markdown files |

Mermaid diagrams are embedded directly in markdown files to provide visual representations of architecture, workflows, and data flows without requiring external image files.

### YAML Frontmatter

| Property | Value |
|----------|-------|
| **Format** | YAML |
| **Location** | Document headers (between `---` delimiters) |
| **Purpose** | Metadata for wiki pages (title, description, tags, related) |

Every wiki page includes YAML frontmatter that provides structured metadata for the documentation system. This metadata enables categorization, tagging, cross-referencing, and programmatic access to document properties.

**Source**: `documents/knowledge-overview/02-tech-stack.md:73-77`

---

## File System

### Directory Structure

| Directory | Purpose |
|-----------|---------|
| `cli/` | Node.js CLI installer and utilities |
| `web/` | React web application |
| `code-assistants/` | Platform-specific configurations |
| `commands/` | Command definitions and variants |
| `agents/` | Agent definitions and team configurations |
| `skills/` | Skill library organized by tier |
| `rules/` | Orchestration rules and protocols |
| `documents/` | Source documentation organized by domain |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root npm package configuration |
| `web/package.json` | Web application dependencies |
| `.releaserc.json` | Semantic release configuration |
| `.husky/` | Git hook scripts |
| `code-assistants/*/config.toml` | Platform-specific AI assistant configurations |

**Source**: `documents/knowledge-overview/02-tech-stack.md:141-147`

---

## Configuration

### Platform Configuration

Each AI coding assistant platform has a dedicated configuration directory containing:

- Platform-specific agent definitions
- Skill tier mappings
- Rule files for orchestration
- Prompt templates and instructions

The configuration system uses a tiered approach where base configurations can be overridden at the platform level, allowing customization while maintaining a common foundation.

### Environment Configuration

The system supports environment-based configuration through:

- Environment variables for runtime behavior
- File-based configuration for persistent settings
- Command-line arguments for CLI operations

See [[Configuration Reference]] for detailed configuration options and [[Project Identity]] for environment-specific setup instructions.

---

## Complete Technology Summary

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
| Diagram Format | Mermaid | — | Format |
| Metadata Format | YAML Frontmatter | — | Format |

**Source**: `documents/knowledge-overview/02-tech-stack.md:81-98`

---

## Related Pages

- [[Project Identity]] — Project naming, branding, and core metadata
- [[Architecture Overview]] — System architecture and component interactions
- [[CLI Installer]] — CLI module reference and command documentation
- [[Configuration Reference]] — Configuration options and environment variables
- [[System Components]] — Complete inventory of all system components
