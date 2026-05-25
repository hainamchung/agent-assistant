---
title: Architecture Decisions
type: decision
tags: [adr, architecture, decisions, rationale]
created: 2026-05-20
updated: 2026-05-20
---

# Architecture Decisions

Architecture Decision Records (ADRs) document the significant technical decisions that shaped Agent Assistant's design. Each ADR captures the context, the decision made, its consequences, and alternatives considered. These records explain *why* the system is built the way it is.

---

## ADR Overview

| # | ADR ID | Title | Status | Date |
|---|--------|-------|--------|------|
| 1 | ADR-001 | Multi-platform abstraction layer | Accepted | 2024-01 |
| 2 | ADR-002 | Markdown-based agent definitions | Accepted | 2024-01 |
| 3 | ADR-003 | HSOL skill injection | Accepted | 2024-02 |
| 4 | ADR-004 | Golden Triangle adversarial teams | Accepted | 2024-02 |
| 5 | ADR-005 | Tiered command variants (fast/hard/team) | Accepted | 2024-01 |
| 6 | ADR-006 | Single-file CLI installer | Accepted | 2024-01 |
| 7 | ADR-007 | File-based configuration | Accepted | 2024-01 |
| 8 | ADR-008 | 21 specialist agents (not general) | Accepted | 2024-01 |

**Source**: `.documents/knowledge-architecture/05-decisions.md:1-50`

---

## ADR-001: Multi-Platform Abstraction Layer

### Context

Agent Assistant needed to work across 7 different AI assistant platforms: Cursor, GitHub Copilot, Claude Code, Antigravity/Gemini, Codex, Kiro, and Qwen. Each platform has a different directory structure, configuration format, and instruction mechanism.

### Decision

Implement a multi-platform abstraction layer with platform-specific path variables and a central TOML configuration per platform.

**Mechanism**:
- Path placeholders: `{{CURSOR_PATH}}`, `{{COPILOT_PATH}}`, `{{CLAUDE_PATH}}`, `{{ANTIGRAVITY_PATH}}`, `{{CODEX_PATH}}`
- Platform configs: `code-assistants/{platform}/config.toml`
- Single CLI installer handles all platforms

### Consequences

**Positive**:
- Single codebase works across all 7 platforms
- Platform-specific details are isolated in TOML files
- Adding a new platform only requires a new config file

**Negative**:
- Path placeholder system adds complexity to the installer
- Platform-specific bugs require platform-specific testing

### Alternatives Considered

- **Per-platform codebases**: Rejected — too much duplication, impossible to keep in sync
- **Runtime detection only**: Rejected — no way to configure per-platform behavior

---

## ADR-002: Markdown-Based Agent Definitions

### Context

Agents needed to be defined in a format that both humans and AI models could easily read and edit. YAML frontmatter provides structured metadata while Markdown body provides human-readable descriptions.

### Decision

Define agents as Markdown files with YAML frontmatter.

**Format**:
```markdown
---
name: backend-engineer
role: implementation
skills: [nodejs, python, databases]
---

# backend-engineer

Backend engineering specialist...
```

### Consequences

**Positive**:
- Human-readable and editable without special tools
- AI models can parse YAML frontmatter and Markdown body
- Version control works naturally (diffable, mergeable)
- No database or special tooling required

**Negative**:
- No schema enforcement at write time
- Inconsistent definitions possible without tooling

### Alternatives Considered

- **JSON schema**: Rejected — less human-readable, harder to edit in IDE
- **Database**: Rejected — requires tooling, harder to version control

---

## ADR-003: HSOL Skill Injection

### Context

Agent Assistant has access to 1400+ skills. Loading all skills into context would overflow any practical context window. The system needed a way to select the right skills for each task.

### Decision

Implement HSOL (Hybrid Skill Orchestration Layer) — a 5-step algorithm that dynamically selects relevant skills based on task context.

**Algorithm**:
1. Context Analysis → 2. Domain Matching → 3. Priority Calculation → 4. Context Window Fit → 5. Injection

### Consequences

**Positive**:
- Deep domain knowledge available without context overflow
- Skills are contextually relevant to the current task
- Tiered approach (foundation → expert) prioritizes universal skills

**Negative**:
- Skill selection is heuristic — may miss relevant skills
- Algorithm adds complexity to the skill loading path

### Alternatives Considered

- **Load all skills**: Rejected — context window overflow
- **Load no skills**: Rejected — insufficient domain knowledge
- **User-specified skills**: Rejected — too much friction for common tasks

---

## ADR-004: Golden Triangle Adversarial Teams

### Context

Code review in most AI coding assistants is a rubber stamp — the AI reviews its own work briefly before shipping. This approach misses subtle bugs, architectural misalignments, and quality issues.

### Decision

Implement the Golden Triangle pattern — a 3-role team (Tech Lead, Executor, Reviewer) with adversarial review. The Reviewer actively challenges the Executor's work, creating productive tension that catches defects.

**Quality Gates**: Security (OWASP Top 10), Performance (<200ms), Testing (>80% coverage), Linting

### Consequences

**Positive**:
- Quality issues caught before shipping
- Architectural decisions are reviewed by a Tech Lead
- Disputes are resolved through evidence-based arbitration

**Negative**:
- Slower execution (debate loop vs. rubber stamp)
- More complex coordination
- Higher resource usage

### Alternatives Considered

- **Self-review only**: Rejected — no adversarial element, quality varies
- **Mandatory human review**: Rejected — breaks the AI-native workflow

---

## ADR-005: Tiered Command Variants

### Context

Not every task needs the same level of scrutiny. A documentation fix needs different treatment than a redesign of the authentication system.

### Decision

Implement three execution variants per command: fast (2–3 agents), hard (5–8 agents), team (Golden Triangle). Simple tasks use fast, complex tasks use hard, high-stakes tasks use team.

### Consequences

**Positive**:
- Simple tasks complete quickly without overhead
- Complex tasks get appropriate review depth
- Quality investment scales with task risk

**Negative**:
- Users must understand when to escalate variants
- Default (fast) may be insufficient for some tasks

### Alternatives Considered

- **Single fixed variant**: Rejected — either too slow for simple tasks or too fast for complex ones
- **Fully automatic escalation**: Rejected — users need control over the process

---

## ADR-006: Single-File CLI Installer

### Context

The original installer design considered multiple files with framework dependencies (yargs, commander). This would add dependencies and increase maintenance burden.

### Decision

Implement a single-file Node.js installer (`cli/install.js`, 1716 lines) with no framework dependencies. Plain JavaScript ES2022+ with only the Node.js standard library.

### Consequences

**Positive**:
- Zero dependency conflicts
- Easy to audit (single file)
- Fast execution (no framework overhead)
- Works on any Node.js >= 18.0.0

**Negative**:
- More code in a single file (perceived complexity)
- No built-in argument parsing (hand-rolled)

### Alternatives Considered

- **yargs/commander framework**: Rejected — adds dependencies, version conflicts
- **Shell script**: Rejected — less portable across platforms

---

## ADR-007: File-Based Configuration

### Context

The system needed a configuration mechanism that was git-friendly, human-editable, and required no database or special tooling.

### Decision

Use file-based configuration exclusively. All configuration is stored in Markdown, YAML, JSON, or TOML files. No database, no special configuration service.

**Config Files**:
- `package.json` (NPM manifest)
- `.releaserc.json` (Semantic Release)
- `code-assistants/*/config.toml` (platform configs)
- Frontmatter in agent/command files

### Consequences

**Positive**:
- Git-friendly (diffable, mergeable)
- No database setup or maintenance
- Human-editable without special tools
- Version control provides history

**Negative**:
- No runtime configuration changes
- No centralized config service
- Potential for inconsistent configs across files

### Alternatives Considered

- **Database config**: Rejected — adds infrastructure, harder to version
- **Environment variables only**: Rejected — insufficient for complex config

---

## ADR-008: 20 Specialist Agents

### Context

Most AI coding assistants use a single general-purpose agent. General agents are competent at everything but expert at nothing. They may produce inconsistent quality across domains.

### Decision

Implement 21 specialist agents, each optimized for a specific domain. Agents are grouped into 5 categories: Implementation (4), Architecture (2), Quality (4), Planning (3), Support (8).

**Examples**:
- `backend-engineer` specializes in server-side development
- `security-engineer` specializes in OWASP Top 10 audits
- `debugger` specializes in root cause analysis

### Consequences

**Positive**:
- Higher quality output in each domain
- Agents are optimized for specific tasks
- Clear ownership and responsibility

**Negative**:
- More agents to maintain
- Coordination complexity when multiple agents work together
- Some tasks span multiple domains (requires multiple agents)

### Alternatives Considered

- **Single general agent**: Rejected — inconsistent quality, no domain expertise
- **100+ narrow agents**: Rejected — coordination overhead exceeds benefits

---

## Related Pages

- [[Tiered Orchestration]] — Architecture pattern enabled by these decisions
- [[Golden Triangle]] — Adversarial teams (ADR-004)
- [[HSOL Skill Injection]] — Skill injection (ADR-003)
- [[Command Routing]] — Tiered variants (ADR-005)
