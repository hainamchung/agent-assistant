# Problem, Goals, and Scope

> **Section**: Business PRD | **File**: 02-problem-goals-and-scope.md
> **Purpose**: Problem statement, 7 business goals, non-goals, in-scope, and out-of-scope

---

## Problem Statement

### The Core Problem

AI coding assistants lack coordination infrastructure. When developers use AI assistants to build features, they encounter three fundamental issues:

**1. Fragmentation**: Each AI interaction starts fresh. Context from previous conversations, architectural decisions, or pattern conventions is lost. Developers repeatedly explain domain concepts, code patterns, and business rules.

**2. Inconsistency**: AI-generated code varies in quality, style, and approach. One session produces React components with CSS modules; the next uses inline styles. Authentication flows differ between features. No mechanism enforces consistency.

**3. Quality Gaps**: AI assistants optimize for generating plausible code, not correct code. Security vulnerabilities, edge cases, and integration issues slip through. Without structured review, these defects reach production.

### Evidence of the Problem

| Issue | Manifestation | Frequency |
|-------|---------------|-----------|
| Context loss | Developers re-explain patterns 3-5 times per feature | Daily |
| Style inconsistency | Code review flags style violations weekly | Weekly |
| Security gaps | Security audits find AI-generated vulnerabilities monthly | Monthly |
| Integration failures | Cross-feature bugs discovered late in development | Per release |

### Impact

Organizations waste an estimated 40% of AI-assisted development time on coordination overhead: explaining context, fixing inconsistent outputs, and patching quality gaps. The promise of AI acceleration remains unrealized because the infrastructure layer is missing.

---

## Business Goals

### Goal 1: Reduce Development Time by 70%

**Objective**: Enable features to ship in days instead of weeks by eliminating coordination overhead.

**Key Results**:
- Average feature development time reduced from 14 days to 4 days
- Context management overhead eliminated through structured handoffs
- Parallel agent execution enabled for independent tasks

**Measurement**: Time-to-production tracked per feature through workflow completion timestamps.

### Goal 2: Reduce Bug Rate by 70%

**Objective**: Catch defects before production through adversarial review teams.

**Key Results**:
- Security findings per release reduced by 86%
- Integration bugs discovered in development, not production
- Test coverage increased through automated quality gates

**Measurement**: Bug tracking system metrics correlated with workflow usage.

### Goal 3: Reduce Token Costs by 85%

**Objective**: Minimize redundant context processing through skill injection.

**Key Results**:
- Pre-loaded domain skills eliminate repeated explanations
- Matrix-based skill resolution reduces token consumption
- Efficient handoffs minimize context reconstruction

**Measurement**: Token consumption per task compared to baseline (naive prompting).

### Goal 4: Enable Multi-Platform Consistency

**Objective**: Provide unified development experience across seven AI coding platforms.

**Key Results**:
- Same commands work identically on Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, Qwen
- Skill sets transfer between platforms without reconfiguration
- Workflow definitions maintain consistency across environments

**Measurement**: Feature parity checklist across platforms, updated quarterly.

### Goal 5: Establish Quality Standards

**Objective**: Define and enforce code quality through structured review processes.

**Key Results**:
- Golden Triangle review model applied to all major deliverables
- Security, performance, and correctness criteria documented per workflow
- Quality metrics visible in project dashboards

**Measurement**: Quality gate pass rates tracked per phase.

### Goal 6: Automate Documentation

**Objective**: Reduce documentation debt through automated wiki generation.

**Key Results**:
- Project documentation generated from code analysis
- Entity relationships extracted automatically
- API contracts documented from implementation

**Measurement**: Documentation coverage percentage (documented files / total files).

### Goal 7: Enable Observable Processes

**Objective**: Create traceable, auditable development processes.

**Key Results**:
- All agent communication logged in Mailbox files
- Phase outputs preserved as immutable deliverables
- Decision reasoning documented in output artifacts

**Measurement**: Audit trail completeness measured by post-incident investigation time.

---

## Non-Goals

The following are explicitly out of scope for this product:

| Non-Goal | Rationale |
|----------|------------|
| **AI model training** | We use existing AI models; we do not train or fine-tune them |
| **IDE development** | We integrate with existing IDEs; we do not build new ones |
| **Language-specific frameworks** | We provide orchestration; specific language idioms remain with specialists |
| **Enterprise authentication** | Basic auth supported; SSO/LDAP not in scope |
| **Cloud hosting** | Agent Assistant runs locally; hosting infrastructure is user-managed |
| **Real-time collaboration** | Single-user workflow; team sync features future |
| **Custom model selection** | Fixed model per platform; custom model routing out of scope |

---

## In Scope

### Core Capabilities

| Capability | Description |
|------------|-------------|
| **14 Slash Commands** | /cook, /fix, /plan, /debug, /test, /review, /docs, /design, /deploy, /report, /wiki, /brainstorm, /ask, /code |
| **3 Command Variants** | :fast (2-3 agents), :hard (5-8 agents), :team (Golden Triangle) |
| **21 Specialist Agents** | Across 5 categories: Implementation, Architecture, Quality, Planning, Support |
| **HSOL Skill System** | 1400+ skills with matrix-based resolution |
| **18 Golden Triangle Teams** | Adversarial collaboration for quality-critical work |
| **7 Platforms** | Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, Qwen |

### Technical Scope

| Area | Scope |
|------|-------|
| **Orchestration Rules** | 8 rules governing agent behavior: CORE, AGENTS, PHASES, TEAMS, SKILLS, ERRORS, REFERENCE, WIKI |
| **Orchestration Laws** | 10 laws (L1-L10) defining fundamental constraints |
| **CLI Installer** | One-time global setup, cross-platform (Unix, Windows, macOS) |
| **Documentation Site** | React 19 web app with Tailwind CSS 4, ReactFlow 12, Vite 6 |

---

## Out of Scope

### Explicitly Excluded

| Exclusion | Notes |
|-----------|-------|
| **Mobile IDE integration** | iOS/Android IDE plugins not planned |
| **Custom agent creation** | Pre-defined agent set only; user-defined agents future |
| **Workflow customization** | Fixed workflow definitions; user templates future |
| **Multi-user collaboration** | Single-user sessions; team sync out of scope |
| **External API integrations** | No third-party service connections |
| **Code execution sandbox** | We orchestrate; execution happens in user's environment |
| **Performance profiling** | Observability tooling not included |

### Phase 2 Candidates

These features are planned for future releases but excluded from current scope:

| Feature | Target |
|---------|--------|
| Enterprise SSO | Phase 2 |
| Custom agent templates | Phase 2 |
| Workflow analytics | Phase 2 |
| Mobile platform support | Phase 3 |

---

## Evidence Sources

- `README.md` — Commands, agents, platforms overview
- `rules/CORE.md` — Orchestration laws and command routing
- `rules/AGENTS.md` — Agent categories and team roster
- `rules/TEAMS.md` — Golden Triangle team definitions
- `rules/SKILLS.md` — HSOL skill system
- `cli/install.js` — CLI installer capabilities
