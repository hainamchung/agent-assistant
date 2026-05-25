# Stakeholders and Requirements

> **Section**: Business PRD | **File**: 03-stakeholders-and-requirements.md
> **Purpose**: 16 stakeholder map, 15 functional requirements, 8 non-functional requirements

---

## Stakeholder Map

### Primary Stakeholders

| ID | Stakeholder | Role | Interest | Influence |
|----|-------------|------|----------|------------|
| S1 | **Individual Developers** | End users | Productivity, code quality, learning | High |
| S2 | **Development Teams** | Collective users | Consistent patterns, shared context | High |
| S3 | **Engineering Managers** | Decision makers | Velocity, quality metrics, ROI | High |
| S4 | **Tech Leads** | Architects | Code consistency, team coordination | High |

### Secondary Stakeholders

| ID | Stakeholder | Role | Interest | Influence |
|----|-------------|------|----------|------------|
| S5 | **DevOps Engineers** | Infrastructure | CI/CD integration, deployment | Medium |
| S6 | **QA Engineers** | Quality assurance | Test coverage, bug tracking | Medium |
| S7 | **Security Engineers** | Auditors | Security standards, vulnerability rates | Medium |
| S8 | **Technical Writers** | Documenters | Documentation generation, wiki quality | Medium |
| S9 | **Product Managers** | Prioritizers | Feature delivery, roadmap input | Medium |

### Tertiary Stakeholders

| ID | Stakeholder | Role | Interest | Influence |
|----|-------------|------|----------|------------|
| S10 | **Enterprise IT** | Administrators | Security, compliance, support | Low |
| S11 | **AI Platform Vendors** | Partners | Integration compatibility, feature requests | Low |
| S12 | **Open Source Community** | Contributors | Extensibility, documentation, bug reports | Low |
| S13 | **Hiring Managers** | Recruiters | Developer productivity, tool stack | Low |
| S14 | **New Hires** | Onboarders | Learning curve, documentation quality | Low |
| S15 | **Contractors** | Temporary staff | Quick onboarding, consistent patterns | Low |
| S16 | **Executive Leadership** | Strategists | Business metrics, competitive position | Low |

### Stakeholder Communication Plan

| Stakeholder Group | Communication Channel | Frequency | Content |
|-------------------|---------------------|-----------|---------|
| Individual Developers | GitHub Issues, Discord | Continuous | Feature requests, bugs |
| Engineering Managers | Quarterly review | Quarterly | Metrics, roadmap |
| Tech Leads | Monthly sync | Monthly | Integration issues, API changes |
| Open Source Community | GitHub, PRs | As needed | Contributions, reviews |

---

## Functional Requirements

### FR-1: Command Routing System

**Requirement**: The system MUST route all 14 slash commands to their respective workflow files and execute the correct variant based on user input.

**Acceptance Criteria**:
- `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` route to correct workflow files
- Natural language inputs (e.g., "implement OAuth") route to equivalent commands
- Invalid commands return helpful error with suggestion

**Priority**: Critical

### FR-2: Tiered Execution Engine

**Requirement**: The system MUST support TIER 1 (sub-agent) and TIER 2 (embody) execution, preferring sub-agent when available.

**Acceptance Criteria**:
- TIER 1 attempted first for all delegations
- TIER 2 fallback only when TIER 1 unavailable or fails
- Execution tier logged in output

**Priority**: Critical

### FR-3: Agent Orchestration

**Requirement**: The system MUST manage 21 specialist agents across 5 categories, enabling selection and handoff based on task requirements.

**Acceptance Criteria**:
- Correct agent selected for each task type
- Context handoff includes requirements, constraints, deliverables
- Context isolation maintained between agents

**Priority**: Critical

### FR-4: Golden Triangle Teams

**Requirement**: The system MUST enable 18 team configurations with Tech Lead, Executor, and Reviewer roles following adversarial collaboration protocol.

**Acceptance Criteria**:
- Team phase spawns exactly 3 agents
- Debate loop capped at 3 rounds
- Consensus stamp required before output release

**Priority**: High

### FR-5: HSOL Skill Resolution

**Requirement**: The system MUST resolve and inject relevant skills based on agent profile and task context using the Hybrid Skill Orchestration Layer.

**Acceptance Criteria**:
- Matrix skills resolved within fitness threshold (0.8)
- Dynamic discovery triggered when fitness < 0.75
- Skills injected before agent execution

**Priority**: High

### FR-6: Phase Execution

**Requirement**: The system MUST execute workflows in defined phases with explicit entry and exit criteria.

**Acceptance Criteria**:
- Phases execute sequentially (N before N+1)
- Exit criteria verified before phase completion
- Prior deliverables locked as immutable constraints

**Priority**: High

### FR-7: Multi-Platform Support

**Requirement**: The system MUST operate consistently across Cursor, Claude Code, GitHub Copilot, Codex, and Antigravity/Gemini.

**Acceptance Criteria**:
- All 14 commands functional on all platforms
- Platform-specific paths resolved correctly
- Consistent output regardless of platform

**Priority**: High

### FR-8: CLI Installer

**Requirement**: The system MUST provide a one-time global installation that works across all platforms.

**Acceptance Criteria**:
- Single install command sets up all platforms
- Per-platform installation supported
- Uninstall cleanly removes all configurations

**Priority**: High

### FR-9: Documentation Generation

**Requirement**: The system MUST generate project documentation from code analysis using wiki workflows.

**Acceptance Criteria**:
- Entity relationships extracted from code
- API contracts documented from implementation
- Navigation structure created automatically

**Priority**: Medium

### FR-10: Deliverable Management

**Requirement**: The system MUST manage deliverables according to size guidelines (single file ≤150 lines, chunked >150 lines).

**Acceptance Criteria**:
- Large deliverables split into folder with index
- Index updated after each section creation
- All files verified before completion

**Priority**: Medium

### FR-11: Mailbox Communication

**Requirement**: The system MUST use Mailbox files for all inter-agent communication in team phases.

**Acceptance Criteria**:
- Mailbox append-only (no edits or deletions)
- All exchanges timestamped with type
- Debate entries include PASS/FAIL status

**Priority**: Medium

### FR-12: Error Handling

**Requirement**: The system MUST handle errors gracefully with defined recovery paths.

**Acceptance Criteria**:
- All errors logged with context
- Recovery attempted based on error type
- Unrecoverable errors reported to user with options

**Priority**: Medium

### FR-13: Reporting

**Requirement**: The system MUST generate status reports, status summaries, and template-based output.

**Acceptance Criteria**:
- `/report:fast`, `/report:hard`, `/report:team` variants functional
- Reports include metrics and progress tracking
- Reports update existing files when appropriate

**Priority**: Medium

### FR-14: Design Workflow

**Requirement**: The system MUST support design workflows for UI/UX specification.

**Acceptance Criteria**:
- Designer agent produces design specifications
- Frontend engineer implements from spec
- Reviewer validates design implementation

**Priority**: Low

### FR-15: Brainstorming

**Requirement**: The system MUST support structured brainstorming for solution exploration.

**Acceptance Criteria**:
- Brainstormer agent generates alternatives
- Trade-offs documented for each option
- Recommendation provided with rationale

**Priority**: Low

---

## Non-Functional Requirements

### NFR-1: Performance

**Requirement**: Phase execution MUST complete within defined time limits based on variant.

| Variant | Target Time | Maximum Time |
|---------|-------------|--------------|
| :fast | 30 seconds | 2 minutes |
| :hard | 5 minutes | 15 minutes |
| :team | 15 minutes | 45 minutes |

**Measurement**: Workflow completion timestamps.

### NFR-2: Reliability

**Requirement**: The system MUST achieve 99% successful workflow completion for supported commands.

**Measurement**: Success/failure rate tracked per command.

### NFR-3: Multi-Platform Consistency

**Requirement**: Output MUST be functionally equivalent across all 7 platforms.

**Measurement**: Cross-platform test suite pass rate.

### NFR-4: Security

**Requirement**: The system MUST NOT expose credentials, tokens, or sensitive data in logs or output.

**Measurement**: Security audit findings per quarter.

### NFR-5: Maintainability

**Requirement**: The codebase MUST follow documented conventions with >80% test coverage for core logic.

**Measurement**: Code coverage reports, lint compliance.

### NFR-6: Observability

**Requirement**: All agent decisions MUST be traceable through Mailbox files and deliverable artifacts.

**Measurement**: Audit trail completeness check.

### NFR-7: Documentation

**Requirement**: All public interfaces MUST have complete documentation.

**Measurement**: Documentation coverage percentage.

### NFR-8: Extensibility

**Requirement**: Adding new agents, commands, or skills MUST NOT require modifying core orchestration logic.

**Measurement**: Time to add new agent/command/skill.

---

## Evidence Sources

- `rules/CORE.md` — Requirements encoded in orchestration laws
- `rules/AGENTS.md` — Agent orchestration requirements
- `rules/TEAMS.md` — Golden Triangle collaboration requirements
- `rules/PHASES.md` — Phase execution requirements
- `rules/SKILLS.md` — HSOL resolution requirements
- `README.md` — Platform support and command reference
