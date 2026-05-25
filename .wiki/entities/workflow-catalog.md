---
title: Workflow Catalog
description: Complete catalogue of all 20 workflows (W1-W20) organized by category with triggers, inputs, outputs, complexity, agents, variants, steps, and exit criteria
category: entity
tags: [workflows, catalog, W1-W20, commands, triggers, complexity, agents, variants, handoffs]
related:
  - "[[Command System]]"
  - "[[Workflow System]]"
  - "[[Detailed Workflows]]"
  - "[[Golden Triangle]]"
  - "[[Tiered Orchestration]]"
  - "[[Actor Map]]"
  - "[[SLA and Handoffs]]"
created: 2026-05-20
updated: 2026-05-20
---

# Workflow Catalog

The Workflow Catalog documents all 20 workflows in the Agent Assistant framework. Each workflow is defined with its unique identifier, name, associated command, category classification, trigger mechanism, expected inputs, produced outputs, complexity rating, required agents, available variants, step-by-step execution flow, and measurable exit criteria.

This catalog serves as the authoritative reference for workflow execution, enabling consistent behavior across all command invocations. The Workflow System operates under the [[Tiered Orchestration]] architecture, which enforces strict phase ordering and prevents shortcuts that bypass quality gates. Every workflow follows its defined phases in sequence, with explicit entry and exit criteria at each transition point.

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:8-10`

---

## Workflow Overview

The Agent Assistant framework organizes its 20 workflows into four primary categories based on their functional purpose. Build workflows (W1-W5) create new functionality from requirements, ranging from simple code generation to full-stack feature development with adversarial review. Quality workflows (W6-W9) validate deliverables and ensure they meet standards before release. Planning workflows (W10-W13) prepare for execution by gathering context, creating roadmaps, and organizing requirements. Support workflows (W14-W20) handle deployment, team coordination, and system maintenance.

The variant system enables workflows to scale their complexity, agent count, and review depth based on task requirements. Three variants are available: :fast for simple single-domain tasks with minimal review, :hard for complex multi-domain tasks with full quality gates, and :team for critical deliverables requiring adversarial quality assurance through the [[Golden Triangle]] pattern.

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:8-34`

---

## Category 1: Build Workflows (W1–W5)

Build workflows create new functionality from requirements. They represent the primary value-delivery mechanism of the framework, transforming user intent into production-ready code, designs, or specifications.

### W1: /cook — Feature Development

The primary feature development workflow and the most complex command in the system. Invoked with `/cook`, `/cook:fast`, `/cook:hard`, or `/cook:team` depending on complexity requirements and quality assurance needs.

| Attribute | Value |
|-----------|-------|
| **ID** | W1 |
| **Name** | Feature Development |
| **Command** | `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` |
| **Category** | Build |
| **Trigger** | User invokes `/cook` with feature requirements |
| **Input** | Feature description, requirements, scope definition |
| **Output** | Production-ready feature implementation with tests and review |
| **Complexity** | Varies by variant (:fast=Low, :hard=Medium, :team=High) |
| **Agents** | 1 (:fast, :hard), 3 (:team - Golden Triangle) |
| **Phases** | 3-6 depending on variant |
| **Exit Criteria** | Code written, tests passing, review PASS, all requirements verified |

**Variants**:

| Variant | Agents | Phases | Review Depth | Typical Use |
|---------|--------|--------|--------------|-------------|
| `:fast` | 1 | 3 | Minimal | Simple features, single domain |
| `:hard` | 1 | 6 | Full | Complex features, multiple domains |
| `:team` | 3 | 4 | Adversarial | Critical features, high stakes |

**Steps Summary** (for :fast variant):

1. **Phase 1: Requirements Intake** — Parse user request, extract feature scope, create Requirements Registry (R1, R2, ...), verify requirements completeness, lock requirements as immutable
2. **Phase 2: Implementation** — Select agent based on task type, analyze skills (Complex → resolve, Simple → skip), inject relevant skills, delegate to TIER 1 (sub-agent) or TIER 2 (embody), implement feature, verify implementation against requirements
3. **Phase 3: Delivery** — Format output per agent format, include deliverable path, verify scope compliance, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:16-33`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:10-47`

---

### W2: /code — Code Generation

Lightweight code generation workflow for snippets, small implementations, and targeted code additions. Designed for rapid turnaround on well-defined, bounded coding tasks.

| Attribute | Value |
|-----------|-------|
| **ID** | W2 |
| **Name** | Code Generation |
| **Command** | `/code`, `/code:variant` |
| **Category** | Build |
| **Trigger** | User invokes `/code` with specific coding request |
| **Input** | Code specification, language, file location |
| **Output** | Generated code snippets or files |
| **Complexity** | Low-Medium |
| **Agents** | 1 |
| **Phases** | 2 |
| **Exit Criteria** | Code generated, syntax verified |

**Steps Summary**:

1. **Phase 1: Requirements Capture** — Parse code request, identify language and framework, determine file location and integration point
2. **Phase 2: Generation** — Generate code according to specification, verify syntax, format output

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:37-47`

---

### W3: /fix — Bug Fix

Systematic bug investigation and resolution workflow with root cause analysis. Follows a three-phase approach: investigate the issue, implement the fix, and verify the solution.

| Attribute | Value |
|-----------|-------|
| **ID** | W3 |
| **Name** | Bug Fix |
| **Command** | `/fix` |
| **Category** | Build |
| **Trigger** | User invokes `/fix` with error description |
| **Input** | Error description, stack trace, reproduction steps |
| **Output** | Fixed code with root cause addressed |
| **Complexity** | Medium |
| **Agents** | 1-2 |
| **Phases** | 3 (investigate, fix, verify) |
| **Exit Criteria** | Root cause identified, fix implemented, issue resolved, tests passing |

**Steps Summary**:

1. **Phase 1: Issue Investigation** — Parse error description, gather error context (logs, reproduction steps), delegate to debugger agent, investigate root cause, document findings
2. **Phase 2: Fix Implementation** — Propose fix based on root cause, implement fix, verify fix addresses root cause, check for side effects
3. **Phase 3: Verification** — Verify original issue resolved, run existing tests, complete workflow

**Exit Criteria**: Root cause identified → Fix implemented, root cause addressed → Issue resolved, tests passing

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:51-61`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:191-226`

---

### W4: /design — Design Specification

UI/UX and technical design creation workflow from concept requirements. Produces comprehensive design specifications for implementation teams.

| Attribute | Value |
|-----------|-------|
| **ID** | W4 |
| **Name** | Design Specification |
| **Command** | `/design` |
| **Category** | Build |
| **Trigger** | User invokes `/design` with feature concept |
| **Input** | Feature concept, requirements, constraints |
| **Output** | Design specification document |
| **Complexity** | Medium |
| **Agents** | 1 |
| **Phases** | 2 (research, design) |
| **Exit Criteria** | Design specification complete, all requirements addressed |

**Steps Summary**:

1. **Phase 1: Research** — Analyze feature concept, gather context, identify design patterns, explore alternatives
2. **Phase 2: Design** — Create design specification, document decisions, include visual mockups or diagrams, define acceptance criteria

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:65-75`

---

### W5: /brainstorm — Solution Exploration

Generate multiple solution alternatives with trade-off analysis. Enables informed decision-making by presenting options with their respective advantages and disadvantages.

| Attribute | Value |
|-----------|-------|
| **ID** | W5 |
| **Name** | Solution Exploration |
| **Command** | `/brainstorm` |
| **Category** | Build |
| **Trigger** | User invokes `/brainstorm` with problem statement |
| **Input** | Problem statement, constraints, success criteria |
| **Output** | Multiple solution alternatives with trade-offs |
| **Complexity** | Low-Medium |
| **Agents** | 1 |
| **Phases** | 2 (explore, document) |
| **Exit Criteria** | Alternatives documented with trade-offs clearly presented |

**Steps Summary**:

1. **Phase 1: Exploration** — Analyze problem, identify solution approaches, explore alternatives, evaluate trade-offs
2. **Phase 2: Documentation** — Document alternatives, summarize trade-offs, provide recommendations

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:79-89`

---

## Category 2: Quality Workflows (W6–W9)

Quality workflows validate deliverables and ensure they meet standards before release. These workflows serve as the quality gates in the [[Tiered Orchestration]] system, preventing substandard outputs from progressing through the workflow.

### W6: /test — Test Generation

Create comprehensive test suites with coverage targets. Supports both :fast (60% coverage) and :hard (80% coverage) variants.

| Attribute | Value |
|-----------|-------|
| **ID** | W6 |
| **Name** | Test Generation |
| **Command** | `/test`, `/test:fast`, `/test:hard` |
| **Category** | Quality |
| **Trigger** | User invokes `/test` or `/test:hard` with feature context |
| **Input** | Feature code, requirements, coverage target |
| **Output** | Test suite with unit, integration, or E2E tests |
| **Complexity** | Medium |
| **Agents** | 1-2 |
| **Phases** | 3 (analyze, generate, review) |
| **Exit Criteria** | Tests generated, coverage adequate, tests passing |

**Variants**:

| Variant | Coverage Target | Typical Use |
|---------|-----------------|-------------|
| `:fast` | 60% | Standard features |
| `:hard` | 80% | Critical features |

**Steps Summary**:

1. **Phase 1: Test Planning** — Parse feature context, identify test scenarios, determine test types (unit, integration, E2E), set coverage targets
2. **Phase 2: Test Generation** — Generate tests per plan, include edge cases, document test rationale, verify test syntax
3. **Phase 3: Review + Execution** — Execute tests, review coverage report, if coverage < target add tests, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:95-105`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:230-265`

---

### W7: /review — Code Review

Structured code review workflow against quality and security standards. Produces review reports with findings and prioritized recommendations.

| Attribute | Value |
|-----------|-------|
| **ID** | W7 |
| **Name** | Code Review |
| **Command** | `/review` |
| **Category** | Quality |
| **Trigger** | User invokes `/review` with code to review |
| **Input** | Code to review, review criteria, security checklist |
| **Output** | Review report with findings and recommendations |
| **Complexity** | Medium |
| **Agents** | 1 |
| **Phases** | 2 (review, report) |
| **Exit Criteria** | Review complete, findings documented, report issued |

**Steps Summary**:

1. **Phase 1: Review** — Parse code to review, analyze for correctness, security vulnerabilities, performance issues, standards compliance, edge cases, document findings
2. **Phase 2: Report** — Compile findings, prioritize by severity, provide recommendations, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:109-119`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:310-338`

---

### W8: /debug — Debugging

Systematic root cause investigation workflow for errors and failures. Follows a backward-tracing approach to identify the actual cause, not just symptoms.

| Attribute | Value |
|-----------|-------|
| **ID** | W8 |
| **Name** | Debugging |
| **Command** | `/debug` |
| **Category** | Quality |
| **Trigger** | User invokes `/debug` with error description |
| **Input** | Error description, context (stack traces, logs) |
| **Output** | Root cause analysis and fix proposal |
| **Complexity** | Medium-High |
| **Agents** | 1-2 |
| **Phases** | 3 (investigate, analyze, report) |
| **Exit Criteria** | Root cause identified, fix proposal documented |

**Steps Summary**:

1. **Phase 1: Investigation** — Parse error description, gather context (stack traces, logs, reproduction), reproduce error if possible, trace execution flow
2. **Phase 2: Analysis** — Identify root cause, trace backward to source, document failure chain, propose fix strategy
3. **Phase 3: Report** — Document root cause, provide fix proposal, suggest prevention measures, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:123-133`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:342-377`

---

### W9: Security Review

Automated or manual security vulnerability assessment workflow. Produces comprehensive security audit reports with categorized findings.

| Attribute | Value |
|-----------|-------|
| **ID** | W9 |
| **Name** | Security Review |
| **Command** | N/A (automated or manual) |
| **Category** | Quality |
| **Trigger** | Automated or manual invocation |
| **Input** | Codebase, dependencies, configuration |
| **Output** | Security audit report with findings |
| **Complexity** | High |
| **Agents** | 1-2 |
| **Phases** | 3 (scan, analyze, report) |
| **Exit Criteria** | Security audit complete, findings documented |

**Steps Summary**:

1. **Phase 1: Security Scan** — Scan for known vulnerabilities, analyze dependencies, check configuration
2. **Phase 2: Analysis** — Analyze findings, assess severity, identify attack vectors
3. **Phase 3: Report** — Compile security findings, provide remediation recommendations, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:137-147`

---

## Category 3: Planning Workflows (W10–W13)

Planning workflows prepare for execution by gathering context, creating roadmaps, and organizing requirements. These workflows establish the foundation for successful implementation.

### W10: /plan — Implementation Planning

Create detailed implementation plans with milestones and estimates. Enables systematic execution through well-defined phases and clear acceptance criteria.

| Attribute | Value |
|-----------|-------|
| **ID** | W10 |
| **Name** | Implementation Planning |
| **Command** | `/plan` |
| **Category** | Planning |
| **Trigger** | User invokes `/plan` with feature concept |
| **Input** | Feature concept, requirements, constraints |
| **Output** | Implementation plan with milestones and estimates |
| **Complexity** | Medium |
| **Agents** | 1 |
| **Phases** | 3 (scout, plan, review) |
| **Exit Criteria** | Plan complete with milestones, plan approved |

**Steps Summary**:

1. **Phase 1: Scouting** — Parse feature concept, delegate to scouter agent, explore codebase for relevant patterns, map dependencies, document findings
2. **Phase 2: Planning** — Create implementation plan, break into milestones with dependencies, estimate effort per milestone, identify risks and mitigations, define acceptance criteria per milestone
3. **Phase 3: Review** — Review plan against requirements, verify feasibility, refine if needed, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:153-163`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:269-306`

---

### W11: /ask — Question Answering

Direct question answering or research-based response workflow. Provides immediate answers to user queries with appropriate depth.

| Attribute | Value |
|-----------|-------|
| **ID** | W11 |
| **Name** | Question Answering |
| **Command** | `/ask` |
| **Category** | Planning |
| **Trigger** | User invokes `/ask` with question |
| **Input** | Question, context (optional) |
| **Output** | Direct answer or research report |
| **Complexity** | Low |
| **Agents** | 1 |
| **Phases** | 1-2 |
| **Exit Criteria** | Answer delivered, question resolved |

**Steps Summary**:

1. **Phase 1: Answer** — Parse question, determine if direct answer possible, if yes provide answer
2. **Phase 2: Research** (if needed) — If question requires investigation, conduct research, synthesize findings, provide research report

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:167-177`

---

### W12: /report — Reporting

Generate status reports and project summaries. Supports three variants for different complexity levels.

| Attribute | Value |
|-----------|-------|
| **ID** | W12 |
| **Name** | Reporting |
| **Command** | `/report:fast`, `/report:hard`, `/report:team` |
| **Category** | Planning |
| **Trigger** | User invokes `/report` with report parameters |
| **Input** | Report type, scope, time period |
| **Output** | Status report or project summary |
| **Complexity** | Varies by variant |
| **Agents** | 1 (:fast, :hard), 3 (:team) |
| **Phases** | 2-3 |
| **Exit Criteria** | Report complete, delivered to user |

**Variants**:

| Variant | Agents | Typical Use |
|---------|--------|-------------|
| `:fast` | 1 | Quick status updates |
| `:hard` | 1 | Comprehensive analysis |
| `:team` | 3 | In-depth project summaries |

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:181-191`

---

### W13: /docs — Documentation

Create and maintain project documentation workflow. Produces comprehensive documentation in the project documentation structure.

| Attribute | Value |
|-----------|-------|
| **ID** | W13 |
| **Name** | Documentation |
| **Command** | `/docs`, `/docs:variant` |
| **Category** | Planning |
| **Trigger** | User invokes `/docs` with documentation request |
| **Input** | Documentation scope, source materials |
| **Output** | Project documentation |
| **Complexity** | Medium |
| **Agents** | 1 |
| **Phases** | 2-3 |
| **Exit Criteria** | Documentation complete, structure validated |

**Steps Summary**:

1. **Phase 1: Content Gathering** — Identify documentation scope, gather source materials, analyze existing documentation
2. **Phase 2: Generation** — Generate documentation content, follow project documentation standards, ensure consistency
3. **Phase 3: Review** — Verify accuracy, check links and references, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:195-205`

---

## Category 4: Support Workflows (W14–W20)

Support workflows handle deployment, team coordination, and system maintenance. These workflows enable the continuous operation of the Agent Assistant framework.

### W14: /deploy — Deployment

Deployment execution and verification workflow across environments. Supports three specialized variants for different deployment scenarios.

| Attribute | Value |
|-----------|-------|
| **ID** | W14 |
| **Name** | Deployment |
| **Command** | `/deploy:check`, `/deploy:preview`, `/deploy:production` |
| **Category** | Support |
| **Trigger** | User invokes `/deploy` with deployment variant |
| **Input** | Deployment target, environment, configuration |
| **Output** | Deployment verification, preview, or execution |
| **Complexity** | Medium-High |
| **Agents** | 1-2 |
| **Phases** | 3-4 |
| **Exit Criteria** | Deployment verified, smoke tests passing |

**Variants**:

| Variant | Purpose | Typical Use |
|---------|---------|-------------|
| `:check` | Verify deployment readiness | Pre-deployment validation |
| `:preview` | Deploy to preview environment | Staging/QA testing |
| `:production` | Deploy to production | Live deployment |

**Steps Summary**:

1. **Phase 1: Pre-deployment Check** — Verify build passes, run security scan, check dependencies, validate configuration
2. **Phase 2: Deployment** — Execute deployment per variant (:check → verify readiness, :preview → deploy to preview, :production → deploy to production)
3. **Phase 3: Verification** — Verify deployment successful, run smoke tests, monitor for errors, complete workflow

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:211-221`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:421-455`

---

### W15: /wiki — Wiki Generation

Generate project wikis from source code and documentation. Extracts entities, relationships, and API contracts from source code, organizing them into a navigable wiki structure.

| Attribute | Value |
|-----------|-------|
| **ID** | W15 |
| **Name** | Wiki Generation |
| **Command** | `/wiki`, `/wiki:fast`, `/wiki:hard`, `/wiki:team` |
| **Category** | Support |
| **Trigger** | User invokes `/wiki` with wiki parameters |
| **Input** | Source code, documentation, wiki structure |
| **Output** | Project wiki with documentation |
| **Complexity** | Varies by variant |
| **Agents** | 1 (:fast, :hard), 3 (:team) |
| **Phases** | 3-5 |
| **Exit Criteria** | Wiki pages generated, cross-references valid |

**Variants**:

| Variant | Agents | Typical Use |
|---------|--------|-------------|
| `:fast` | 1 | Simple wiki structure |
| `:hard` | 1 | Complex multi-section wiki |
| `:team` | 3 | Comprehensive wiki with adversarial review |

**Steps Summary**:

1. **Phase 1: Extraction** — Parse project structure, analyze code for entities, extract relationships, map API contracts, document findings
2. **Phase 2: Organization** — Design wiki structure, create folder hierarchy, define navigation, plan content per section
3. **Phase 3: Generation** — Generate index pages (00-index.md pattern), generate content pages, ensure cross-references valid, verify links and navigation

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:225-235`
**Source**: `.documents/business/business-workflows/03-detailed-workflows.md:381-417`

---

### W16: CLI Installation

Automated workflow for installing and configuring the Agent Assistant CLI. Runs without agent involvement as a fully automated process.

| Attribute | Value |
|-----------|-------|
| **ID** | W16 |
| **Name** | CLI Installation |
| **Command** | `agent-assistant install` |
| **Category** | Support |
| **Trigger** | User runs `agent-assistant install` |
| **Input** | Target platform, installation preferences |
| **Output** | Configured Agent Assistant for target platform |
| **Complexity** | Low |
| **Agents** | 0 (fully automated) |
| **Phases** | 2 (detect, configure) |
| **Exit Criteria** | CLI installed, configuration complete |

**Steps Summary**:

1. **Phase 1: Detection** — Detect platform, check prerequisites, verify system compatibility
2. **Phase 2: Configuration** — Install CLI, configure environment, set up initial configuration, verify installation

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:239-249`

---

### W17: CLI Uninstallation

Automated workflow for removing the Agent Assistant CLI and its configuration. Clean removal of all installed components.

| Attribute | Value |
|-----------|-------|
| **ID** | W17 |
| **Name** | CLI Uninstallation |
| **Command** | `agent-assistant uninstall` |
| **Category** | Support |
| **Trigger** | User runs `agent-assistant uninstall` |
| **Input** | None (automatic detection) |
| **Output** | Removed Agent Assistant configuration |
| **Complexity** | Low |
| **Agents** | 0 (fully automated) |
| **Phases** | 2 (detect, remove) |
| **Exit Criteria** | CLI removed, configuration cleaned |

**Steps Summary**:

1. **Phase 1: Detection** — Detect installed components, identify configuration files, check for shared resources
2. **Phase 2: Removal** — Remove CLI binary, clean configuration files, verify complete removal

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:253-263`

---

### W18: Skill Discovery

Automated workflow triggered when matrix fitness falls below threshold. Identifies and installs relevant skills to improve workflow performance.

| Attribute | Value |
|-----------|-------|
| **ID** | W18 |
| **Name** | Skill Discovery |
| **Command** | N/A (automated) |
| **Category** | Support |
| **Trigger** | Automated when matrix fitness < 0.75 |
| **Input** | Current context, performance metrics |
| **Output** | Relevant skills identified and installed |
| **Complexity** | Medium |
| **Agents** | 0 (fully automated) |
| **Phases** | 2 (search, install) |
| **Exit Criteria** | Skills identified, installation complete |

**Steps Summary**:

1. **Phase 1: Search** — Analyze current context, search available skills, evaluate skill relevance, identify best matches
2. **Phase 2: Installation** — Download and install identified skills, update skill registry, verify installation

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:267-277`

---

### W19: Phase Transition

Automated workflow for transitioning between workflow phases. Ensures context is properly locked and passed to the next phase.

| Attribute | Value |
|-----------|-------|
| **ID** | W19 |
| **Name** | Phase Transition |
| **Command** | N/A (automated) |
| **Category** | Support |
| **Trigger** | Previous phase completes |
| **Input** | Prior phase deliverable, requirements registry |
| **Output** | Next phase begins with locked context |
| **Complexity** | Low |
| **Agents** | 1 (Orchestrator) |
| **Phases** | 1 (transition) |
| **Exit Criteria** | Context locked, next phase initiated |

**Steps Summary**:

1. **Phase 1: Transition** — Verify prior phase exit criteria, lock prior deliverable, update requirements registry, initialize next phase with locked context

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:281-291`

---

### W20: Team Consensus

Multi-agent workflow for achieving consensus on team debates. Used in the [[Golden Triangle]] pattern to resolve disagreements between Executor and Reviewer.

| Attribute | Value |
|-----------|-------|
| **ID** | W20 |
| **Name** | Team Consensus |
| **Command** | N/A (automated for team workflows) |
| **Category** | Support |
| **Trigger** | Team debate completes |
| **Input** | Debate topic, both positions, evidence |
| **Output** | Agreed output with consensus stamp |
| **Complexity** | Medium |
| **Agents** | 3 (Golden Triangle: Tech Lead, Executor, Reviewer) |
| **Phases** | 1-3 rounds |
| **Exit Criteria** | Consensus reached or Tech Lead arbitration |

**Steps Summary**:

1. **Round 1** — Review PASS → proceed | Review FAIL → Round 2
2. **Round 2** — Review PASS → proceed | Review FAIL → Round 3
3. **Round 3** — Review PASS → proceed | Review FAIL → Tech Lead arbitration (binding)

**Escalation Path**:

```
Round 1: Review PASS → proceed
Round 1: Review FAIL → Round 2
Round 2: Review PASS → proceed
Round 2: Review FAIL → Round 3
Round 3: Review PASS → proceed
Round 3: Review FAIL → Tech Lead arbitration (binding)
```

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:295-305`
**Source**: `.documents/business/business-workflows/05-sla-and-handoffs.md:670-677`

---

## Workflow Summary Comparison Table

The following table provides a quick reference for all 20 workflows, enabling rapid lookup of key attributes during workflow selection.

| ID | Workflow | Command | Category | Complexity | Agents | Trigger | Phases |
|----|----------|---------|----------|------------|--------|--------|--------|
| W1 | /cook | `/cook`, `/cook:fast`, `/cook:hard`, `/cook:team` | Build | Varies | 1-3 | Command | 3-6 |
| W2 | /code | `/code` | Build | Low-Med | 1 | Command | 2 |
| W3 | /fix | `/fix` | Build | Medium | 1-2 | Command | 3 |
| W4 | /design | `/design` | Build | Medium | 1 | Command | 2 |
| W5 | /brainstorm | `/brainstorm` | Build | Low-Med | 1 | Command | 2 |
| W6 | /test | `/test`, `/test:fast`, `/test:hard` | Quality | Medium | 1-2 | Command | 3 |
| W7 | /review | `/review` | Quality | Medium | 1 | Command | 2 |
| W8 | /debug | `/debug` | Quality | Med-High | 1-2 | Command | 3 |
| W9 | Security Review | N/A | Quality | High | 1-2 | Auto/Manual | 3 |
| W10 | /plan | `/plan` | Planning | Medium | 1 | Command | 3 |
| W11 | /ask | `/ask` | Planning | Low | 1 | Command | 1-2 |
| W12 | /report | `/report:fast`, `/report:hard`, `/report:team` | Planning | Varies | 1-3 | Command | 2-3 |
| W13 | /docs | `/docs` | Planning | Medium | 1 | Command | 2-3 |
| W14 | /deploy | `/deploy:check`, `/deploy:preview`, `/deploy:production` | Support | Med-High | 1-2 | Command | 3-4 |
| W15 | /wiki | `/wiki`, `/wiki:fast`, `/wiki:hard`, `/wiki:team` | Support | Varies | 1-3 | Command | 3-5 |
| W16 | CLI Install | `agent-assistant install` | Support | Low | 0 | CLI | 2 |
| W17 | CLI Uninstall | `agent-assistant uninstall` | Support | Low | 0 | CLI | 2 |
| W18 | Skill Discovery | N/A | Support | Medium | 0 | Auto | 2 |
| W19 | Phase Transition | N/A | Support | Low | 1 | Auto | 1 |
| W20 | Team Consensus | N/A | Support | Medium | 3 | Auto | 1-3 |

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:309-332`

---

## Variant System Reference

Commands support three variants that scale complexity, agent count, and review depth based on task requirements. The variant system ensures resources are proportional to task complexity while maintaining consistent quality gates.

| Aspect | :fast | :hard | :team |
|--------|-------|-------|-------|
| **Agent Count** | 1 | 1 | 3 (Golden Triangle) |
| **Review Depth** | Minimal | Standard | Adversarial |
| **Phase Count** | 3-4 | 5-6 | 4 + consensus |
| **Quality Gates** | Basic | Full | Adversarial + arbitration |
| **Typical Duration** | 30s-2min | 5-15min | 15-45min |
| **Use Case** | Simple features | Complex features | Critical features |
| **Skill Injection** | Minimal | Standard | Enhanced context |

**Variant Selection Guidelines**:

- **:fast** — Single domain, well-understood requirements, minimal review needed
- **:hard** — Multiple domains, complex dependencies, full review required
- **:team** — Critical deliverables, high stakes, adversarial quality assurance required

**Source**: `.documents/business/business-workflows/02-workflow-catalog.md:28-33`

---

## Evidence Sources

The following source documents provide authoritative definitions for the workflows documented in this catalog:

| Source | Content |
|--------|---------|
| `.documents/business/business-workflows/02-workflow-catalog.md` | Complete catalogue of all 20 workflows with triggers and outcomes |
| `.documents/business/business-workflows/03-detailed-workflows.md` | Step-by-step flows for all commands plus implicit workflows |
| `rules/CORE.md` | Command routing, workflow triggers |
| `rules/PHASES.md` | Phase execution patterns |
| `rules/TEAMS.md` | Team workflow patterns |
| `commands/` | Command workflow definitions |
| `README.md` | Command reference |

---

## Related Pages

- [[Command System]] — All 14 commands with variant specifications
- [[Workflow System]] — Complete reference for workflows, actors, SLAs, and handoff contracts
- [[Detailed Workflows]] — Step-by-step flows for all commands
- [[Golden Triangle]] — Adversarial team coordination pattern
- [[Tiered Orchestration]] — Phase ordering and quality gate enforcement
- [[Actor Map]] — Full actor definitions with responsibilities and boundaries
- [[SLA and Handoffs]] — SLA definitions and handoff contract details
