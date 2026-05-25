# Architecture Decisions

> **File**: `.documents/knowledge-architecture/05-decisions.md`
> **Purpose**: Architecture Decision Records (ADR) table and rationale

---

## Overview

This document captures significant architectural decisions, their rationale, and consequences. Each decision is recorded as an Architecture Decision Record (ADR).

---

## ADR Table

| ID | Decision | Status | Date | rationale |
|----|----------|--------|------|-----------|
| **ADR-001** | Multi-platform abstraction layer | Accepted | 2024-01 | Platform portability |
| **ADR-002** | Markdown-based agent definitions | Accepted | 2024-01 | AI consumability |
| **ADR-003** | Hybrid Skill Orchestration Layer (HSOL) | Accepted | 2024-02 | Context optimization |
| **ADR-004** | Golden Triangle adversarial teams | Accepted | 2024-02 | Quality assurance |
| **ADR-005** | Tiered command variants (fast/hard/team) | Accepted | 2024-01 | Scalable complexity |
| **ADR-006** | Single-file CLI installer | Accepted | 2024-01 | Simplicity |
| **ADR-007** | File-based configuration | Accepted | 2024-01 | No database dependency |
| **ADR-008** | 21 specialist agents (not general) | Accepted | 2024-01 | Quality over coverage |

---

## ADR-001: Multi-Platform Abstraction Layer

### Status
**Accepted** | Date: 2024-01

### Context

Agent Assistant must work across 7 different AI coding platforms:
- Cursor
- GitHub Copilot
- Claude Code
- Antigravity/Gemini
- Codex

Each platform has different:
- File system locations
- Configuration formats
- Instruction injection mechanisms

### Decision

Create a platform abstraction layer in `code-assistants/` that:
- Standardizes the interface for all operations
- Translates between platform-specific paths and internal paths
- Injects instructions using platform-specific mechanisms

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Portability** | Same commands work everywhere |
| **Maintainability** | Single codebase for all platforms |
| **Extensibility** | Easy to add new platforms |

### Consequences

**Positive**:
- One command set for all platforms
- Consistent user experience
- Easy platform addition

**Negative**:
- Platform-specific bugs may slip through
- Abstraction leaks (some features unavailable on some platforms)
- Additional abstraction maintenance

---

## ADR-002: Markdown-Based Agent Definitions

### Status
**Accepted** | Date: 2024-01

### Context

Agents need to be consumed by AI systems (LLMs) that are optimized for text processing. We need a format that:
- Is easily parsed by LLMs
- Contains structured metadata
- Is human-readable
- Supports rich documentation

### Decision

Define all agents as Markdown files with YAML frontmatter:

```markdown
---
name: backend-engineer
role: server-side development
skills:
  required: [nodejs, python, databases]
  preferred: [docker, redis]
---

# Backend Engineer

## Role Overview
...
```

### Rationale

| Factor | Consideration |
|--------|---------------|
| **AI Consumability** | LLMs excel at Markdown parsing |
| **Human Readability** | Developers can read and edit |
| **Version Control** | Git-friendly format |
| **Tooling** | Standard Markdown tools work |

### Consequences

**Positive**:
- Easy for LLMs to parse
- Human-editable
- Version controlled
- No special tooling needed

**Negative**:
- No schema validation at runtime
- Potential for inconsistent formatting
- Limited structured data support

---

## ADR-003: Hybrid Skill Orchestration Layer (HSOL)

### Status
**Accepted** | Date: 2024-02

### Context

We have 1400+ skills but:
- Agent context windows are limited
- Loading all skills causes overflow
- Skills must be relevant to current task

### Decision

Implement HSOL that:
1. Analyzes current task context
2. Matches relevant skills by domain/tags
3. Ranks by priority
4. Injects only relevant skills within context limits

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Context Efficiency** | Only relevant skills loaded |
| **Coverage** | Access to all 1400+ skills |
| **Relevance** | Skills match current task |

### Consequences

**Positive**:
- Efficient context usage
- Full skill coverage
- Task-relevant skills

**Negative**:
- Skill matching may miss relevant skills
- Priority ranking complexity
- Additional processing overhead

---

## ADR-004: Golden Triangle Adversarial Teams

### Status
**Accepted** | Date: 2024-02

### Context

Single-agent implementations often have:
- Design blind spots
- Security vulnerabilities
- Performance issues
- Inconsistent patterns

### Decision

Create team structure with three roles:
- **Tech Lead**: Architecture and coordination
- **Executor**: Implementation
- **Reviewer**: Adversarial quality assurance

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Quality** | Multiple perspectives catch issues |
| **Security** | Dedicated reviewer role |
| **Reviewability** | Structured review process |

### Consequences

**Positive**:
- Higher quality output
- Security by design
- Structured review process
- Knowledge transfer

**Negative**:
- Slower execution
- More resources required
- Coordination overhead

---

## ADR-005: Tiered Command Variants

### Status
**Accepted** | Date: 2024-01

### Context

Different tasks have different complexity:
- Simple fix: 5 minutes, 1 agent
- Complex feature: 30 minutes, 5 agents
- Critical system: 60+ minutes, full team

### Decision

Three-tier variant system:

| Variant | Agents | Use Case |
|---------|--------|----------|
| fast | 2-3 | Quick tasks |
| hard | 5-8 | Complex features |
| team | Golden Triangle | Critical systems |

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Scalability** | Match effort to complexity |
| **Resource Efficiency** | Don't over-engineer |
| **Quality** | Critical tasks get more review |

### Consequences

**Positive**:
- Scalable complexity
- Resource optimization
- Clear expectations

**Negative**:
- User must choose variant
- May lead to over/under-use
- Variant definitions may need tuning

---

## ADR-006: Single-File CLI Installer

### Status
**Accepted** | Date: 2024-01

### Context

Need to install Agent Assistant to multiple platforms:
- Cursor: `~/.{TOOL}/`
- GitHub Copilot: `~/.github/copilot/`
- Claude Code: `~/.claude/`
- Antigravity: `~/.antigravity/`
- Codex: `~/.codex/`

### Decision

Single JavaScript file (`cli/install.js`) that:
- Handles all platforms
- Performs path replacements
- Tracks progress
- Supports rollback

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Simplicity** | One file to run |
| **Portability** | No external dependencies |
| **Reliability** | Self-contained |

### Consequences

**Positive**:
- Easy to run
- No dependency conflicts
- Portable

**Negative**:
- Large file (1716 lines)
- No module structure
- Harder to test in isolation

---

## ADR-007: File-Based Configuration

### Status
**Accepted** | Date: 2024-01

### Context

Agent Assistant needs to store:
- Platform configurations
- Agent definitions
- Skill registry
- User preferences

### Decision

Use file-based configuration:
- JSON for machine-readable configs
- Markdown for human-readable docs
- YAML frontmatter for metadata
- No database

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Simplicity** | No database setup |
| **Portability** | Files work everywhere |
| **Version Control** | Git-friendly |
| **AI Compatibility** | Text formats are LLM-friendly |

### Consequences

**Positive**:
- No database dependency
- Easy to version control
- Works offline
- AI-friendly formats

**Negative**:
- No query capabilities
- Limited scalability
- No real-time sync

---

## ADR-008: 24 Specialist Agents

### Status
**Accepted** | Date: 2024-01

### Context

Could have:
- Few general agents (e.g., 5)
- Many specialist agents (e.g., 24)

### Decision

21 specialist agents organized by domain:
- Implementation (4): backend, frontend, mobile, game
- Architecture (1): tech-lead
- Quality (6): tester, reviewer, debugger, security, performance, wiki-reviewer
- Planning (3): planner, brainstormer, business-analyst
- Support (10): designer, devops, docs, project, reporter, researcher, scouter, wiki-architect, wiki-extractor, database-architect

### Rationale

| Factor | Consideration |
|--------|---------------|
| **Quality** | Specialists know their domain deeply |
| **Coverage** | 24 domains covered |
| **Manageability** | 24 is cognitively manageable |

### Consequences

**Positive**:
- High-quality specialist output
- Clear agent responsibilities
- Easy to add new agents

**Negative**:
- More coordination needed
- Context switching overhead
- Some overlap in skills

---

## Future Considerations

| Decision | Status | Notes |
|----------|--------|-------|
| Real-time collaboration | Pending | Not in scope for v4 |
| Distributed agents | Pending | Single-machine only for now |
| Cloud-based HSOL | Pending | Local skill matching only |
| Plugin system | Pending | Static definitions only |

---

## Evidence Sources

- `rules/CORE.md` — Core principles
- `rules/TEAMS.md` — Golden Triangle protocol
- `rules/SKILLS.md` — HSOL configuration
- `agents/` — Agent definitions
- `code-assistants/` — Platform configurations
- `cli/install.js` — CLI implementation
