---
title: Business PMD
description: Product Management Document covering mission, value proposition, business goals, stakeholders, requirements, risks, assumptions, and acceptance criteria for Agent Assistant.
category: summary
tags: [business, product, pmd, mission, goals, requirements, stakeholders, risks, acceptance]
created: 2026-05-20
updated: 2026-05-20
---

# Business PMD

> **Product Management Document (PMD)** — The authoritative source for Agent Assistant's business case, product strategy, and success criteria. This document consolidates the executive summary, problem statement, business goals, stakeholder analysis, requirements, risk assessment, and acceptance criteria into a single reference.

This PMD serves as the north star for all product decisions. Every feature, enhancement, and architectural choice should trace back to the goals and metrics defined here. See [[Project Overview]] for the technical implementation details.

---

## Mission Statement

Agent Assistant transforms single AI coding assistants into coordinated teams of specialist agents. We enable development teams to leverage AI capabilities at scale while maintaining code quality, consistency, and architectural integrity. Our mission: **reduce the gap between AI potential and production-ready code**.

**Source**: `.documents/business/business-prd/01-executive-summary.md:10`

The mission is anchored in three core beliefs:

1. **AI coordination is infrastructure** — just as teams need CI/CD pipelines, they need orchestration layers for AI collaboration
2. **Quality and speed are compatible** — adversarial review teams eliminate defects without slowing delivery
3. **Skills should be reusable** — 1400+ pre-loaded domain skills eliminate redundant context management

---

## Value Proposition

Agent Assistant delivers three measurable outcomes that directly impact development velocity and code quality:

| Metric | Improvement | Impact |
|--------|-------------|--------|
| **Time-to-Production** | 70% faster | Features ship in days instead of weeks |
| **Bug Rate** | 70% reduction | Quality gates catch issues before deployment |
| **Token Cost** | 85% savings | Efficient skill injection reduces redundant processing |

**Source**: `.documents/business/business-prd/01-executive-summary.md:16-23`

### Why These Metrics Matter

**Time-to-Production**: Traditional AI-assisted development suffers from context switching, repeated explanations, and manual coordination overhead. Agent Assistant automates coordination through structured workflows and phase-based execution, eliminating the time lost to context management.

**Bug Rate**: AI-generated code often lacks consistency with existing patterns, misses edge cases, and contains security vulnerabilities. Agent Assistant enforces quality gates through adversarial review teams, ensuring every deliverable passes security, performance, and correctness checks.

**Token Cost**: Without skill injection, AI models waste tokens re-explaining domain concepts for every task. Agent Assistant's [[HSOL Skill Injection]] provides 1400+ pre-loaded skills, reducing token consumption by 85% while improving output relevance.

### Strategic Position

Agent Assistant occupies a unique position in the AI development tooling landscape:

- **More structured than raw AI prompting**: We provide workflow scaffolding that raw models lack
- **More flexible than rigid templates**: Variant system adapts to task complexity
- **More efficient than manual coordination**: Skill injection and phase management reduce overhead
- **More auditable than black-box agents**: Mailbox and deliverable files create traceable history

**Source**: `.documents/business/business-prd/01-executive-summary.md:88-96`

---

## Problem Statement

### The Core Problem

AI coding assistants lack coordination infrastructure. When developers use AI assistants to build features, they encounter three fundamental issues:

**1. Fragmentation**: Each AI interaction starts fresh. Context from previous conversations, architectural decisions, or pattern conventions is lost. Developers repeatedly explain domain concepts, code patterns, and business rules.

**2. Inconsistency**: AI-generated code varies in quality, style, and approach. One session produces React components with CSS modules; the next uses inline styles. Authentication flows differ between features. No mechanism enforces consistency.

**3. Quality Gaps**: AI assistants optimize for generating plausible code, not correct code. Security vulnerabilities, edge cases, and integration issues slip through. Without structured review, these defects reach production.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:10-19`

### Evidence of the Problem

| Issue | Manifestation | Frequency |
|-------|---------------|-----------|
| Context loss | Developers re-explain patterns 3-5 times per feature | Daily |
| Style inconsistency | Code review flags style violations weekly | Weekly |
| Security gaps | Security audits find AI-generated vulnerabilities monthly | Monthly |
| Integration failures | Cross-feature bugs discovered late in development | Per release |

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:22-28`

### Impact

Organizations waste an estimated **40% of AI-assisted development time** on coordination overhead: explaining context, fixing inconsistent outputs, and patching quality gaps. The promise of AI acceleration remains unrealized because the infrastructure layer is missing.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:31`

---

## Business Goals

### Goal 1: Reduce Development Time by 70%

**Objective**: Enable features to ship in days instead of weeks by eliminating coordination overhead.

**Key Results**:
- Average feature development time reduced from 14 days to 4 days
- Context management overhead eliminated through structured handoffs
- Parallel agent execution enabled for independent tasks

**Measurement**: Time-to-production tracked per feature through workflow completion timestamps.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:37-47`

### Goal 2: Reduce Bug Rate by 70%

**Objective**: Catch defects before production through adversarial review teams.

**Key Results**:
- Security findings per release reduced by 86%
- Integration bugs discovered in development, not production
- Test coverage increased through automated quality gates

**Measurement**: Bug tracking system metrics correlated with workflow usage.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:49-58`

### Goal 3: Reduce Token Costs by 85%

**Objective**: Minimize redundant context processing through skill injection.

**Key Results**:
- Pre-loaded domain skills eliminate repeated explanations
- Matrix-based skill resolution reduces token consumption
- Efficient handoffs minimize context reconstruction

**Measurement**: Token consumption per task compared to baseline (naive prompting).

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:60-69`

### Goal 4: Enable Multi-Platform Consistency

**Objective**: Provide unified development experience across seven AI coding platforms.

**Key Results**:
- Same commands work identically on Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, Qwen
- Skill sets transfer between platforms without reconfiguration
- Workflow definitions maintain consistency across environments

**Measurement**: Feature parity checklist across platforms, updated quarterly.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:71-80`

### Goal 5: Establish Quality Standards

**Objective**: Define and enforce code quality through structured review processes.

**Key Results**:
- [[Golden Triangle]] review model applied to all major deliverables
- Security, performance, and correctness criteria documented per workflow
- Quality metrics visible in project dashboards

**Measurement**: Quality gate pass rates tracked per phase.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:82-91`

### Goal 6: Automate Documentation

**Objective**: Reduce documentation debt through automated wiki generation.

**Key Results**:
- Project documentation generated from code analysis
- Entity relationships extracted automatically
- API contracts documented from implementation

**Measurement**: Documentation coverage percentage (documented files / total files).

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:93-102`

### Goal 7: Enable Observable Processes

**Objective**: Create traceable, auditable development processes.

**Key Results**:
- All agent communication logged in Mailbox files
- Phase outputs preserved as immutable deliverables
- Decision reasoning documented in output artifacts

**Measurement**: Audit trail completeness measured by post-incident investigation time.

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:104-113`

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

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:118-129`

---

## Stakeholder Map

### Primary Stakeholders

| ID | Stakeholder | Role | Interest | Influence |
|----|-------------|------|----------|------------|
| S1 | **Individual Developers** | End users | Productivity, code quality, learning | High |
| S2 | **Development Teams** | Collective users | Consistent patterns, shared context | High |
| S3 | **Engineering Managers** | Decision makers | Velocity, quality metrics, ROI | High |
| S4 | **Tech Leads** | Architects | Code consistency, team coordination | High |

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:12-18`

### Secondary Stakeholders

| ID | Stakeholder | Role | Interest | Influence |
|----|-------------|------|----------|------------|
| S5 | **DevOps Engineers** | Infrastructure | CI/CD integration, deployment | Medium |
| S6 | **QA Engineers** | Quality assurance | Test coverage, bug tracking | Medium |
| S7 | **Security Engineers** | Auditors | Security standards, vulnerability rates | Medium |
| S8 | **Technical Writers** | Documenters | Documentation generation, wiki quality | Medium |
| S9 | **Product Managers** | Prioritizers | Feature delivery, roadmap input | Medium |

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:20-28`

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

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:30-39`

### Stakeholder Communication Plan

| Stakeholder Group | Communication Channel | Frequency | Content |
|-------------------|---------------------|-----------|---------|
| Individual Developers | GitHub Issues, Discord | Continuous | Feature requests, bugs |
| Engineering Managers | Quarterly review | Quarterly | Metrics, roadmap |
| Tech Leads | Monthly sync | Monthly | Integration issues, API changes |
| Open Source Community | GitHub, PRs | As needed | Contributions, reviews |

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:41-48`

---

## Functional Requirements

### FR-1: Command Routing System

**Requirement**: The system MUST route all 14 slash commands to their respective workflow files and execute the correct variant based on user input.

**Acceptance Criteria**:
- `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` route to correct workflow files
- Natural language inputs (e.g., "implement OAuth") route to equivalent commands
- Invalid commands return helpful error with suggestion

**Priority**: Critical

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:54-64`

### FR-2: Tiered Execution Engine

**Requirement**: The system MUST support TIER 1 (sub-agent) and TIER 2 (embody) execution, preferring sub-agent when available.

**Acceptance Criteria**:
- TIER 1 attempted first for all delegations
- TIER 2 fallback only when TIER 1 unavailable or fails
- Execution tier logged in output

**Priority**: Critical

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:66-75`

### FR-3: Agent Orchestration

**Requirement**: The system MUST manage 21 specialist agents across 5 categories, enabling selection and handoff based on task requirements.

**Acceptance Criteria**:
- Correct agent selected for each task type
- Context handoff includes requirements, constraints, deliverables
- Context isolation maintained between agents

**Priority**: Critical

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:77-86`

### FR-4: Golden Triangle Teams

**Requirement**: The system MUST enable 18 team configurations with Tech Lead, Executor, and Reviewer roles following adversarial collaboration protocol.

**Acceptance Criteria**:
- Team phase spawns exactly 3 agents
- Debate loop capped at 3 rounds
- Consensus stamp required before output release

**Priority**: High

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:88-97`

### FR-5: HSOL Skill Resolution

**Requirement**: The system MUST resolve and inject relevant skills based on agent profile and task context using the Hybrid Skill Orchestration Layer.

**Acceptance Criteria**:
- Matrix skills resolved within fitness threshold (0.8)
- Dynamic discovery triggered when fitness < 0.75
- Skills injected before agent execution

**Priority**: High

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:99-108`

### FR-6: Phase Execution

**Requirement**: The system MUST execute workflows in defined phases with explicit entry and exit criteria.

**Acceptance Criteria**:
- Phases execute sequentially (N before N+1)
- Exit criteria verified before phase completion
- Prior deliverables locked as immutable constraints

**Priority**: High

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:110-119`

### FR-7: Multi-Platform Support

**Requirement**: The system MUST operate consistently across Cursor, Claude Code, GitHub Copilot, Codex, and Antigravity/Gemini.

**Acceptance Criteria**:
- All 14 commands functional on all platforms
- Platform-specific paths resolved correctly
- Consistent output regardless of platform

**Priority**: High

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:121-130`

### FR-8: CLI Installer

**Requirement**: The system MUST provide a one-time global installation that works across all platforms.

**Acceptance Criteria**:
- Single install command sets up all platforms
- Per-platform installation supported
- Uninstall cleanly removes all configurations

**Priority**: High

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:132-141`

### FR-9: Documentation Generation

**Requirement**: The system MUST generate project documentation from code analysis using wiki workflows.

**Acceptance Criteria**:
- Entity relationships extracted from code
- API contracts documented from implementation
- Navigation structure created automatically

**Priority**: Medium

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:143-152`

### FR-10: Deliverable Management

**Requirement**: The system MUST manage deliverables according to size guidelines (single file ≤150 lines, chunked >150 lines).

**Acceptance Criteria**:
- Large deliverables split into folder with index
- Index updated after each section creation
- All files verified before completion

**Priority**: Medium

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:154-163`

### FR-11: Mailbox Communication

**Requirement**: The system MUST use Mailbox files for all inter-agent communication in team phases.

**Acceptance Criteria**:
- Mailbox append-only (no edits or deletions)
- All exchanges timestamped with type
- Debate entries include PASS/FAIL status

**Priority**: Medium

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:165-174`

### FR-12: Error Handling

**Requirement**: The system MUST handle errors gracefully with defined recovery paths.

**Acceptance Criteria**:
- All errors logged with context
- Recovery attempted based on error type
- Unrecoverable errors reported to user with options

**Priority**: Medium

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:176-185`

### FR-13: Reporting

**Requirement**: The system MUST generate status reports, status summaries, and template-based output.

**Acceptance Criteria**:
- `/report:fast`, `/report:hard`, `/report:team` variants functional
- Reports include metrics and progress tracking
- Reports update existing files when appropriate

**Priority**: Medium

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:187-196`

### FR-14: Design Workflow

**Requirement**: The system MUST support design workflows for UI/UX specification.

**Acceptance Criteria**:
- Designer agent produces design specifications
- Frontend engineer implements from spec
- Reviewer validates design implementation

**Priority**: Low

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:198-207`

### FR-15: Brainstorming

**Requirement**: The system MUST support structured brainstorming for solution exploration.

**Acceptance Criteria**:
- Brainstormer agent generates alternatives
- Trade-offs documented for each option
- Recommendation provided with rationale

**Priority**: Low

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:209-217`

---

## Non-Functional Requirements

### NFR-1: Performance

**Requirement**: Phase execution MUST complete within defined time limits based on variant.

| Variant | Target Time | Maximum Time |
|---------|-------------|---------------|
| :fast | 30 seconds | 2 minutes |
| :hard | 5 minutes | 15 minutes |
| :team | 15 minutes | 45 minutes |

**Measurement**: Workflow completion timestamps.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:223-234`

### NFR-2: Reliability

**Requirement**: The system MUST achieve 99% successful workflow completion for supported commands.

**Measurement**: Success/failure rate tracked per command.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:236-240`

### NFR-3: Multi-Platform Consistency

**Requirement**: Output MUST be functionally equivalent across all 7 platforms.

**Measurement**: Cross-platform test suite pass rate.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:242-246`

### NFR-4: Security

**Requirement**: The system MUST NOT expose credentials, tokens, or sensitive data in logs or output.

**Measurement**: Security audit findings per quarter.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:248-252`

### NFR-5: Maintainability

**Requirement**: The codebase MUST follow documented conventions with >80% test coverage for core logic.

**Measurement**: Code coverage reports, lint compliance.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:254-258`

### NFR-6: Observability

**Requirement**: All agent decisions MUST be traceable through Mailbox files and deliverable artifacts.

**Measurement**: Audit trail completeness check.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:260-264`

### NFR-7: Documentation

**Requirement**: All public interfaces MUST have complete documentation.

**Measurement**: Documentation coverage percentage.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:266-270`

### NFR-8: Extensibility

**Requirement**: Adding new agents, commands, or skills MUST NOT require modifying core orchestration logic.

**Measurement**: Time to add new agent/command/skill.

**Source**: `.documents/business/business-prd/03-stakeholders-and-requirements.md:272-276`

---

## Risk Register

### Risk R1: Platform API Changes

**Description**: AI platform vendors (Cursor, Claude Code, etc.) change APIs or remove capabilities (e.g., `runSubagent`).

**Probability**: Medium (3/5)
**Impact**: High (4/5)
**Risk Score**: 12

**Mitigation**:
- Implement fallback detection for tool availability
- Maintain TIER 2 as always-available fallback
- Monitor platform changelogs for breaking changes
- Maintain relationships with platform teams

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:193-206`

### Risk R2: Skill Staleness

**Description**: Matrix skills become outdated as technologies evolve.

**Probability**: High (4/5)
**Impact**: Medium (3/5)
**Risk Score**: 12

**Mitigation**:
- Implement freshness scoring in HSOL
- Quarterly skill review process
- Community contribution pathway for skill updates
- Automated testing of skill accuracy

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:207-220`

### Risk R3: Context Isolation Failure

**Description**: TIER 1 sub-agents share context accidentally.

**Probability**: Low (2/5)
**Impact**: High (4/5)
**Risk Score**: 8

**Mitigation**:
- Platform-level isolation verification
- Session state monitoring
- Isolated execution environment validation

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:221-233`

### Risk R4: Golden Triangle Deadlock

**Description**: Debate loop exceeds 3 rounds without resolution.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Tech Lead arbitration mechanism in place
- Clear escalation criteria defined
- Consensus stamp format documented

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:234-246`

### Risk R5: Documentation Drift

**Description**: Generated documentation becomes stale as code changes.

**Probability**: High (4/5)
**Impact**: Low (2/5)
**Risk Score**: 8

**Mitigation**:
- Version-stamped documentation
- CI integration for regeneration triggers
- Clear ownership for documentation updates

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:247-259`

### Risk R6: Onboarding Complexity

**Description**: New users struggle with command syntax and variants.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Comprehensive quick-start guide
- Natural language command support
- Interactive onboarding flow

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:260-272`

### Risk R7: Token Cost Unpredictability

**Description**: Token costs vary unpredictably with task complexity.

**Probability**: Medium (3/5)
**Impact**: Low (2/5)
**Risk Score**: 6

**Mitigation**:
- Token usage reporting per workflow
- Cost estimation before execution (future)
- Skill optimization to reduce overhead

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:273-285`

### Risk R8: Multi-Platform Inconsistency

**Description**: Behavior differs subtly between platforms.

**Probability**: Medium (3/5)
**Impact**: Medium (3/5)
**Risk Score**: 9

**Mitigation**:
- Cross-platform test suite
- Platform-specific documentation
- Platform capability matrix maintained

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:286-298`

---

## Assumptions

### Assumption A1: Sub-Agent Tool Stability

**Assumption**: Platforms continue to provide `runSubagent` or equivalent functionality.

**Impact if False**: TIER 1 becomes unavailable; TIER 2 must handle all delegation.

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:303-308`

### Assumption A2: Token Cost Model

**Assumption**: Token-based pricing remains dominant; new pricing models do not disrupt efficiency calculations.

**Impact if False**: Efficiency metrics (85% token savings) become irrelevant.

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:309-314`

### Assumption A3: Open Extensibility

**Assumption**: Platforms continue to allow skill injection and rule modification.

**Impact if False**: Framework becomes read-only; custom skill addition restricted.

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:315-320`

### Assumption A4: Developer Adoption

**Assumption**: Developers will adopt structured workflows despite learning curve.

**Impact if False**: Low adoption undermines business case.

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:321-326`

### Assumption A5: Documentation Value

**Assumption**: Auto-generated documentation provides sufficient accuracy for AI consumption.

**Impact if False**: Generated docs require heavy manual correction; value proposition weakened.

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:327-332`

---

## Open Questions

### Question O1: Enterprise Pricing Model

**Question**: Should enterprise features (SSO, audit logs, custom agents) be priced separately?

**Status**: Undecided
**Input Needed**: Market research, competitive analysis

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:337-343`

### Question O2: Custom Agent Support Timeline

**Question**: When should user-defined agents be supported?

**Status**: Phase 2 candidate
**Input Needed**: User demand assessment

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:344-350`

### Question O3: Workflow Analytics

**Question**: Should workflow execution data be collected for aggregate analytics?

**Status**: Privacy consideration
**Input Needed**: Legal review, opt-in mechanism design

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:351-357`

### Question O4: Mobile IDE Timeline

**Question**: Should mobile platform support (iOS/Android IDEs) be prioritized in Phase 2 or 3?

**Status**: Undecided
**Input Needed**: Market demand, engineering capacity

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:358-364`

### Question O5: Community Governance

**Question**: How should community-contributed skills and agents be governed?

**Status**: Process undefined
**Input Needed**: Contribution guidelines, quality standards

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:365-371`

---

## Acceptance Criteria

### AC-1: Command Routing

**Criterion**: All 14 slash commands route correctly with variant support.

**Verification**:
- Test `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` on each platform
- Test natural language mapping ("implement" → `/cook`)
- Verify error message for invalid commands

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:10-18`

### AC-2: TIER 1 Execution

**Criterion**: Sub-agent execution used as primary delegation method.

**Verification**:
- Execute complex task, verify `runSubagent` tool invoked
- Check output includes "Sub-agent" designation
- Confirm isolated context maintained

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:19-27`

### AC-3: TIER 2 Fallback

**Criterion**: Embodied execution used only when sub-agent unavailable.

**Verification**:
- Simulate sub-agent tool failure
- Verify TIER 2 fallback activates
- Check "EMBODY" designation in output

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:28-36`

### AC-4: Agent Selection

**Criterion**: Correct agent selected for each task type.

**Verification**:
- Test backend task → `backend-engineer`
- Test frontend task → `frontend-engineer`
- Test database task → `database-architect`

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:37-45`

### AC-5: Golden Triangle Consensus

**Criterion**: Team phases produce output with consensus stamp.

**Verification**:
- Execute `/cook:team` variant
- Verify "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓" present
- Confirm debate log in Mailbox file

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:46-54`

### AC-6: HSOL Skill Resolution

**Criterion**: Relevant skills injected based on agent profile and task.

**Verification**:
- Execute task with known skill requirements
- Verify skill files loaded before execution
- Check fitness calculation logged

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:55-63`

### AC-7: Phase Sequencing

**Criterion**: Phases execute in order, each completing before next starts.

**Verification**:
- Execute multi-phase workflow
- Verify Phase 1 complete before Phase 2 starts
- Confirm exit criteria checked per phase

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:64-72`

### AC-8: Context Isolation

**Criterion**: Agent context isolated in TIER 1, shared in TIER 2.

**Verification**:
- Run parallel TIER 1 tasks, verify no cross-contamination
- Run TIER 2 task, verify parent context accessible

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:73-80`

### AC-9: Deliverable Size Management

**Criterion**: Large deliverables split into chunked folder structure.

**Verification**:
- Generate large output (>150 lines)
- Verify folder created with 00-index.md
- Confirm section files created sequentially

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:81-89`

### AC-10: Multi-Platform Installation

**Criterion**: CLI installer works on all 7 platforms.

**Verification**:
- Install on Windows, macOS, Linux
- Verify platform paths created correctly
- Test uninstall removes all traces

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:90-98`

### AC-11: Mailbox Append-Only

**Criterion**: Mailbox file never edited or deleted after creation.

**Verification**:
- Execute team workflow
- Attempt to edit prior exchange
- Verify edit rejected or ignored

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:99-107`

### AC-12: Documentation Generation

**Criterion**: Wiki workflows produce navigable documentation from code.

**Verification**:
- Run `/wiki:fast` on project folder
- Verify index created with links
- Confirm entities extracted correctly

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:108-116`

### AC-13: Error Recovery

**Criterion**: Errors handled with graceful degradation.

**Verification**:
- Introduce error mid-workflow
- Verify recovery path executes
- Confirm user notified with options

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:117-125`

### AC-14: Reporting

**Criterion**: Reports generated with metrics and progress.

**Verification**:
- Run `/report:fast`
- Verify metrics included
- Check format matches template

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:126-134`

### AC-15: Design Workflow

**Criterion**: Design specification produced before implementation.

**Verification**:
- Execute `/design`
- Verify specification file created
- Confirm implementation references spec

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:135-143`

### AC-16: Brainstorming

**Criterion**: Multiple alternatives generated with trade-offs.

**Verification**:
- Execute `/brainstorm`
- Verify 2+ alternatives
- Check trade-offs documented

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:144-152`

### AC-17: Security Standards

**Criterion**: Security review included in quality workflows.

**Verification**:
- Execute `/review` on code with vulnerability
- Verify security findings reported
- Confirm mitigation suggestions provided

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:153-161`

### AC-18: Performance Optimization

**Criterion**: Performance review included in quality workflows.

**Verification**:
- Execute `/review` on inefficient code
- Verify performance issues flagged
- Confirm optimization hints provided

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:162-170`

### AC-19: Constraint Propagation

**Criterion**: Scouter analysis constrains planner output constrains implementer.

**Verification**:
- Execute full planning → implementation workflow
- Verify planner referenced scouter output
- Confirm implementer referenced planner decisions

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:171-179`

### AC-20: Token Efficiency

**Criterion**: Token consumption reduced by skill injection.

**Verification**:
- Measure baseline token usage (no skills)
- Measure optimized usage (with skills)
- Verify 85% reduction target met

**Source**: `.documents/business/business-prd/04-acceptance-risks-assumptions.md:180-188`

---

## Success Story: From Concept to Production

### The Challenge

A mid-sized development team (12 engineers) struggled with AI-assisted development inconsistency. Code reviews revealed recurring patterns: security vulnerabilities in AI-generated authentication code, inconsistent API response formats, and duplicate business logic spread across features.

### The Solution

The team adopted Agent Assistant's structured workflows:

- `/cook:hard` for feature development with full quality gates
- `/review` for all AI-generated code before merge
- `/wiki:team` to document existing patterns

### The Results

After six months of adoption:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Security findings per release | 8.3 | 1.2 | 86% reduction |
| API format inconsistencies | 24 | 2 | 92% reduction |
| Feature development time | 14 days | 4 days | 71% faster |
| Token cost per feature | $12.40 | $1.86 | 85% reduction |

> "Agent Assistant didn't just improve our code quality — it changed how we think about AI collaboration. The structured workflows forced us to articulate requirements clearly, which improved human communication too."
> — Engineering Lead, mid-sized SaaS company

**Source**: `.documents/business/business-prd/01-executive-summary.md:56-85`

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

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:134-144`

### Technical Scope

| Area | Scope |
|------|-------|
| **Orchestration Rules** | 8 rules governing agent behavior: CORE, AGENTS, PHASES, TEAMS, SKILLS, ERRORS, REFERENCE, WIKI |
| **Orchestration Laws** | 10 laws (L1-L10) defining fundamental constraints |
| **CLI Installer** | One-time global setup, cross-platform (Unix, Windows, macOS) |
| **Documentation Site** | React 19 web app with Tailwind CSS 4, ReactFlow 12, Vite 6 |

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:146-153`

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

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:158-169`

### Phase 2 Candidates

| Feature | Target |
|---------|--------|
| Enterprise SSO | Phase 2 |
| Custom agent templates | Phase 2 |
| Workflow analytics | Phase 2 |
| Mobile platform support | Phase 3 |

**Source**: `.documents/business/business-prd/02-problem-goals-and-scope.md:171-180`

---

## Related Pages

- [[Project Overview]] — Technical architecture and key components
- [[Architecture Overview]] — Full system architecture
- [[Golden Triangle]] — Team collaboration model
- [[HSOL Skill Injection]] — Skill resolution system
- [[Feature Catalogue]] — Complete feature inventory
- [[Workflow System]] — Workflow execution patterns
- [[Terminology]] — Glossary of terms
- [[Success Metrics]] — Metrics tracking and measurement
