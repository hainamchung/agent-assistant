---
title: Success Metrics
description: Comprehensive framework of 20 KPIs organized into 5 categories (Adoption, Quality, Performance, Engagement, Financial) with detailed measurement specifications, baselines, targets, and ownership for tracking Agent Assistant success.
category: summary
tags: [success-metrics, kpis, adoption, quality, performance, engagement, financial, measurement, targets]
related:
  - [[Feature Catalogue]]
  - [[Business PMD]]
  - [[Workflow System]]
  - [[Command System]]
  - [[Golden Triangle]]
  - [[Tiered Orchestration]]
  - [[HSOL Skill Injection]]
created: 2026-05-20
updated: 2026-05-20
---

# Success Metrics

This page documents the complete measurement framework for the Agent Assistant framework, comprising 20 Key Performance Indicators (KPIs) across 5 categories. Each metric is specified with its ID, name, definition, baseline, target, measurement method, frequency, and ownership. The framework enables systematic tracking of adoption, quality, performance, engagement, and financial outcomes.

**Source**: `documents/business/business-features/05-success-metrics.md:1-18`

---

## Overview

The Success Metrics framework provides a balanced scorecard approach to measuring Agent Assistant effectiveness. The 20 KPIs are distributed across five categories that together provide comprehensive visibility into product health:

| Category | Count | Metrics | Focus Area |
|----------|-------|---------|------------|
| Adoption | 4 | A1-A4 | User growth, activation, retention, platform distribution |
| Quality | 5 | Q1-Q5 | Code quality, review coverage, bug rates, security, compliance |
| Performance | 4 | P1-P4 | Speed, token efficiency, reliability, execution time |
| Engagement | 4 | E1-E4 | Usage patterns, feature adoption, skill injection |
| Financial | 3 | F1-F3 | Cost savings, ROI, efficiency gains |

**Source**: `documents/business/business-features/05-success-metrics.md:8-18`

### Metric Categories at a Glance

| Category | Focus |
|----------|-------|
| Adoption Metrics (A1-A4) | User growth, activation, retention |
| Quality Metrics (Q1-Q5) | Code quality, review coverage, bug rates |
| Performance Metrics (P1-P4) | Speed, token efficiency, reliability |
| Engagement Metrics (E1-E4) | Usage patterns, feature adoption |
| Financial Metrics (F1-F3) | Cost savings, ROI, efficiency gains |

**Source**: `documents/business/business-features/05-success-metrics.md:8-18`

---

## Adoption Metrics

Adoption metrics measure how effectively users discover, install, activate, and continue using the Agent Assistant. These metrics track the user journey from initial installation through sustained engagement.

**Source**: `documents/business/business-features/05-success-metrics.md:20-72`

### A1: User Activation Rate

The User Activation Rate measures the percentage of users who complete their first successful workflow within a defined window. This metric is the primary indicator of initial value delivery and helps identify friction points in the onboarding experience.

| Attribute | Value |
|-----------|-------|
| **ID** | A1 |
| **Name** | User Activation Rate |
| **Description** | Users completing first successful workflow |
| **Baseline** | TBD (new product) |
| **Target** | 70% within 7 days of install |
| **Measurement Method** | Count of users with ≥1 workflow completion / total installs |
| **Frequency** | Weekly |
| **Owner** | Product Team |

**Calculation**:
```
Activation Rate = (Users with ≥1 completed workflow) / (Total installs) × 100
```

**Source**: `documents/business/business-features/05-success-metrics.md:22-36`

### A2: Command Usage Distribution

The Command Usage Distribution metric tracks the breadth of command adoption across the user base. It measures whether users are exploring beyond basic commands and utilizing the full capability of the system.

| Attribute | Value |
|-----------|-------|
| **ID** | A2 |
| **Name** | Command Usage Distribution |
| **Description** | Adoption of all 14 commands |
| **Baseline** | TBD |
| **Target** | 80% of active users use ≥3 different commands |
| **Measurement Method** | Unique command count per user |
| **Frequency** | Monthly |
| **Owner** | Product Team |

**Rationale**: The framework supports 14 distinct commands including `/cook`, `/fix`, `/code`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/brainstorm`, `/ask`, `/report`, `/deploy`, and `/wiki`. Users who engage with multiple commands demonstrate deeper system understanding and derive greater value from the framework.

**Source**: `documents/business/business-features/05-success-metrics.md:39-48`

### A3: Platform Distribution

The Platform Distribution metric ensures healthy adoption across all supported platforms rather than over-reliance on any single platform. This diversification reduces risk and supports the framework's multi-platform strategy.

| Attribute | Value |
|-----------|-------|
| **ID** | A3 |
| **Name** | Platform Distribution |
| **Description** | Usage across 7 platforms |
| **Baseline** | TBD |
| **Target** | No single platform >60% of usage |
| **Measurement Method** | Workflow count per platform |
| **Frequency** | Monthly |
| **Owner** | Platform Team |

**Supported Platforms**: Cursor, Claude Code, GitHub Copilot, Antigravity/Gemini, Codex, Kiro, and Qwen. The CLI Installer handles cross-platform installation for all seven platforms.

**Source**: `documents/business/business-features/05-success-metrics.md:51-60`

### A4: User Retention

User Retention measures the percentage of activated users who continue using the system over time. This metric is critical for understanding long-term product value and identifying potential churn risks.

| Attribute | Value |
|-----------|-------|
| **ID** | A4 |
| **Name** | User Retention |
| **Description** | Users returning after initial activation |
| **Baseline** | TBD |
| **Target** | 60% retained at 30 days, 40% at 90 days |
| **Measurement Method** | Cohort analysis |
| **Frequency** | Monthly |
| **Owner** | Product Team |

**Retention Milestones**:
- 30-day retention: 60% of users who activated should still be active
- 90-day retention: 40% of users who activated should still be active

**Source**: `documents/business/business-features/05-success-metrics.md:63-72`

---

## Quality Metrics

Quality metrics measure the effectiveness of the [[Golden Triangle]] team approach and the framework's impact on code quality, security, and process compliance. These metrics validate that the framework produces higher-quality outputs than manual development.

**Source**: `documents/business/business-features/05-success-metrics.md:75-139`

### Q1: Bug Rate Reduction

Bug Rate Reduction measures the decrease in production bugs for features developed using Agent Assistant compared to the baseline pre-Agent Assistant bug rate. This is a core measure of the framework's value proposition.

| Attribute | Value |
|-----------|-------|
| **ID** | Q1 |
| **Name** | Bug Rate Reduction |
| **Description** | Bug rate in workflows with Agent Assistant |
| **Baseline** | Pre-Agent Assistant bug rate |
| **Target** | 70% reduction |
| **Measurement Method** | Bugs per feature / Bugs per feature (baseline) |
| **Frequency** | Per release |
| **Owner** | QA Team |

**Calculation**:
```
Bug Reduction = (Baseline bugs - Current bugs) / Baseline bugs × 100
```

**Source**: `documents/business/business-features/05-success-metrics.md:77-91`

### Q2: Golden Triangle Pass Rate

The Golden Triangle Pass Rate measures the effectiveness of the team-based quality approach. It tracks the percentage of team workflows that complete with consensus among all three roles (tech-lead, executor, reviewer).

| Attribute | Value |
|-----------|-------|
| **ID** | Q2 |
| **Name** | Golden Triangle Pass Rate |
| **Description** | Team workflows completing with consensus |
| **Baseline** | TBD |
| **Target** | 95% consensus rate |
| **Measurement Method** | Team workflows with consensus stamp / Total team workflows |
| **Frequency** | Weekly |
| **Owner** | Quality Team |

**Consensus Mechanism**: The [[Golden Triangle]] requires agreement from all three roles before output release. The consensus stamp format is: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓". Debate rounds are capped at 3 iterations before escalation to the tech-lead for final arbitration.

**Source**: `documents/business/business-features/05-success-metrics.md:94-103`

### Q3: Code Review Coverage

Code Review Coverage measures the percentage of AI-generated code that receives formal review by the reviewer agent. This ensures that quality gates are consistently applied to all automated outputs.

| Attribute | Value |
|-----------|-------|
| **ID** | Q3 |
| **Name** | Code Review Coverage |
| **Description** | Code reviewed by reviewer agent |
| **Baseline** | Manual review coverage (estimate) |
| **Target** | 100% of /cook/:hard and /cook/:team outputs reviewed |
| **Measurement Method** | Reviewed lines / Total AI-generated lines |
| **Frequency** | Weekly |
| **Owner** | Quality Team |

**Scope**: This metric applies specifically to `/cook/:hard` and `/cook/:team` command variants, which produce the most complex and impactful outputs. Simpler `/cook/:fast` outputs have different review requirements based on their lower risk profile.

**Source**: `documents/business/business-features/05-success-metrics.md:106-115`

### Q4: Security Finding Rate

Security Finding Rate measures the density of security issues discovered per workflow. This metric tracks the framework's effectiveness at preventing security vulnerabilities from reaching production.

| Attribute | Value |
|-----------|-------|
| **ID** | Q4 |
| **Name** | Security Finding Rate |
| **Description** | Security issues found per workflow |
| **Baseline** | Pre-Agent Assistant rate |
| **Target** | 80% reduction in security findings per release |
| **Measurement Method** | Security issues / Workflow count |
| **Frequency** | Per release |
| **Owner** | Security Team |

**Security Integration**: The security-engineer agent is invoked as part of the [[Golden Triangle]] validation phase for sensitive workflows. This ensures security review is integrated into the standard quality workflow rather than being a separate concern.

**Source**: `documents/business/business-features/05-success-metrics.md:118-128`

### Q5: Phase Exit Criteria Compliance

Phase Exit Criteria Compliance measures adherence to the [[Tiered Orchestration]] phase protocol. It tracks how often all required exit criteria are met before a phase is considered complete.

| Attribute | Value |
|-----------|-------|
| **ID** | Q5 |
| **Name** | Phase Exit Criteria Compliance |
| **Description** | Phases completing with all exit criteria met |
| **Baseline** | TBD |
| **Target** | 99% compliance |
| **Measurement Method** | Phases with all criteria checked / Total phases |
| **Frequency** | Weekly |
| **Owner** | Process Team |

**Phase Protocol**: Each phase in the execution protocol has defined exit criteria that must be verified before phase completion. This includes artifact verification, consistency checks, and quality gate confirmation. The Phase Execution Protocol (F3) mandates that Phase N completes before Phase N+1 begins.

**Source**: `documents/business/business-features/05-success-metrics.md:130-139`

---

## Performance Metrics

Performance metrics measure the efficiency gains delivered by the Agent Assistant framework. These metrics validate the speed and resource efficiency improvements that form a core part of the value proposition.

**Source**: `documents/business/business-features/05-success-metrics.md:142-203`

### P1: Time-to-Production

Time-to-Production measures the total duration from feature request to production deployment. This is a primary measure of development velocity improvement.

| Attribute | Value |
|-----------|-------|
| **ID** | P1 |
| **Name** | Time-to-Production |
| **Description** | Feature development cycle time |
| **Baseline** | Pre-Agent Assistant average (14 days) |
| **Target** | 70% faster (4 days) |
| **Measurement Method** | Days from request to production |
| **Frequency** | Per feature |
| **Owner** | Engineering Team |

**Calculation**:
```
Time Improvement = (Baseline time - Current time) / Baseline time × 100
```

**Source**: `documents/business/business-features/05-success-metrics.md:144-158`

### P2: Token Cost Reduction

Token Cost Reduction measures the efficiency of the [[HSOL Skill Injection]] system in reducing API token consumption. This directly impacts the cost of running AI-assisted development.

| Attribute | Value |
|-----------|-------|
| **ID** | P2 |
| **Name** | Token Cost Reduction |
| **Description** | Token consumption per task |
| **Baseline** | Naive prompting (no skills) |
| **Target** | 85% reduction |
| **Measurement Method** | Tokens per workflow |
| **Frequency** | Weekly |
| **Owner** | Platform Team |

**Token Efficiency**: The HSOL Matrix Resolution algorithm optimizes token usage by selecting the most relevant skills upfront, reducing redundant context and improving prompt efficiency. The fitness calculation includes semantic match, specificity, trust level, freshness score, and success rate.

**Source**: `documents/business/business-features/05-success-metrics.md:161-170`

### P3: Phase Execution Time

Phase Execution Time measures the duration for completing each command variant. This metric establishes performance expectations and identifies bottlenecks in the execution pipeline.

| Attribute | Value |
|-----------|-------|
| **ID** | P3 |
| **Name** | Phase Execution Time |
| **Description** | Time to complete each variant |
| **Baseline** | TBD |
| **Target** | :fast <2min, :hard <15min, :team <45min |
| **Measurement Method** | Duration per phase |
| **Frequency** | Per workflow |
| **Owner** | Platform Team |

**Acceptable Limits by Variant**:

| Variant | Target Duration | Maximum Duration |
|---------|-----------------|------------------|
| :fast | 30 seconds | 2 minutes |
| :hard | 5 minutes | 15 minutes |
| :team | 15 minutes | 45 minutes |

**Source**: `documents/business/business-features/05-success-metrics.md:173-190`

### P4: Workflow Success Rate

Workflow Success Rate measures the percentage of workflows that complete without encountering errors. This is a fundamental measure of system reliability and robustness.

| Attribute | Value |
|-----------|-------|
| **ID** | P4 |
| **Name** | Workflow Success Rate |
| **Description** | Workflows completing without error |
| **Baseline** | TBD |
| **Target** | 99% success rate |
| **Measurement Method** | Successful workflows / Total workflows |
| **Frequency** | Weekly |
| **Owner** | Platform Team |

**Error Handling Integration**: The Error Handling Framework (F5) provides graceful degradation when issues occur. Errors are classified by severity (Warning, Error, Critical) and propagated through the chain with defined recovery paths. High success rates depend on effective error handling.

**Source**: `documents/business/business-features/05-success-metrics.md:193-203`

---

## Engagement Metrics

Engagement metrics measure how actively users are leveraging the framework's capabilities. These metrics track adoption of advanced features and the depth of system usage.

**Source**: `documents/business/business-features/05-success-metrics.md:205-252`

### E1: Daily Active Users (DAU)

Daily Active Users measures the number of unique users who execute at least one workflow per day. This is a standard engagement metric that indicates habitual usage patterns.

| Attribute | Value |
|-----------|-------|
| **ID** | E1 |
| **Name** | Daily Active Users (DAU) |
| **Description** | Unique users with ≥1 workflow per day |
| **Baseline** | TBD |
| **Target** | 100 DAU at 6 months |
| **Measurement Method** | Count of unique users per day |
| **Frequency** | Daily |
| **Owner** | Product Team |

**Growth Trajectory**: The DAU target of 100 users at the 6-month mark represents aggressive but achievable growth. This metric should be tracked on a weekly basis to identify trends early and adjust go-to-market strategies accordingly.

**Source**: `documents/business/business-features/05-success-metrics.md:207-216`

### E2: Command Variant Usage

Command Variant Usage tracks the distribution of workflows across the three command variants (:fast, :hard, :team). This metric reveals user sophistication and helps balance system load.

| Attribute | Value |
|-----------|-------|
| **ID** | E2 |
| **Name** | Command Variant Usage |
| **Description** | Distribution of :fast, :hard, :team variants |
| **Baseline** | TBD |
| **Target** | 60% :fast, 30% :hard, 10% :team |
| **Measurement Method** | Workflows per variant |
| **Frequency** | Monthly |
| **Owner** | Product Team |

**Distribution Rationale**: The 60/30/10 split reflects expected usage patterns where most tasks are quick fixes (:fast), significant work requires deeper analysis (:hard), and only complex cross-cutting concerns need full team collaboration (:team). Deviations from this distribution may indicate user education needs or shifting use cases.

**Source**: `documents/business/business-features/05-success-metrics.md:219-228`

### E3: Skill Injection Rate

Skill Injection Rate measures the percentage of complex workflows that utilize the [[HSOL Skill Injection]] system. High skill injection rates indicate users are leveraging the framework's knowledge management capabilities.

| Attribute | Value |
|-----------|-------|
| **ID** | E3 |
| **Name** | Skill Injection Rate |
| **Description** | Workflows with skills injected |
| **Baseline** | TBD |
| **Target** | 90% of complex tasks inject skills |
| **Measurement Method** | Workflows with skill loading / Total complex workflows |
| **Frequency** | Weekly |
| **Owner** | Product Team |

**Skill Discovery**: The HSOL Matrix Resolution algorithm automatically selects relevant skills from the 1400+ skill repository. The fitness calculation determines when additional dynamic discovery is needed (fitness < 0.75 threshold triggers on-demand discovery).

**Source**: `documents/business/business-features/05-success-metrics.md:231-240`

### E4: Wiki Generation Usage

Wiki Generation Usage tracks the adoption of the automatic documentation generation capability. This metric measures how effectively the framework is being used to maintain project documentation.

| Attribute | Value |
|-----------|-------|
| **ID** | E4 |
| **Name** | Wiki Generation Usage |
| **Description** | Documentation generated via /wiki |
| **Baseline** | TBD |
| **Target** | 50% of new projects generate initial wiki |
| **Measurement Method** | Wiki generation count / New project count |
| **Frequency** | Monthly |
| **Owner** | Documentation Team |

**Wiki System**: The `/wiki` command utilizes the wiki-architect and wiki-extractor agents to analyze code and produce navigable project documentation. This is part of the Developer Experience features (F18) that enhance productivity through automation.

**Source**: `documents/business/business-features/05-success-metrics.md:243-252`

---

## Financial Metrics

Financial metrics translate the framework's operational improvements into monetary terms. These metrics enable clear ROI communication to stakeholders and justify continued investment.

**Source**: `documents/business/business-features/05-success-metrics.md:255-296`

### F1: Development Cost Savings

Development Cost Savings measures the reduction in per-feature development costs when using Agent Assistant compared to traditional development approaches.

| Attribute | Value |
|-----------|-------|
| **ID** | F1 |
| **Name** | Development Cost Savings |
| **Description** | Cost reduction per feature |
| **Baseline** | Average developer cost per feature |
| **Target** | 70% cost reduction |
| **Measurement Method** | (Baseline cost - Current cost) / Feature count |
| **Frequency** | Per feature |
| **Owner** | Finance Team |

**Calculation**:
```
Savings = Baseline cost per feature - Agent Assistant cost per feature
ROI = (Savings - Agent Assistant cost) / Agent Assistant cost × 100
```

**Source**: `documents/business/business-features/05-success-metrics.md:257-272`

### F2: Token Cost Savings

Token Cost Savings measures the reduction in API token costs achieved through the [[HSOL Skill Injection]] system's efficiency optimizations.

| Attribute | Value |
|-----------|-------|
| **ID** | F2 |
| **Name** | Token Cost Savings |
| **Description** | Token cost reduction |
| **Baseline** | Naive prompting token cost |
| **Target** | 85% token cost reduction |
| **Measurement Method** | Token cost per task |
| **Frequency** | Monthly |
| **Owner** | Finance Team |

**Token Optimization**: The 85% token cost reduction target aligns with the P2 metric. This is achieved through pre-loading relevant skills, reducing redundant context, and optimizing prompt efficiency through the fitness-based skill selection process.

**Source**: `documents/business/business-features/05-success-metrics.md:275-284`

### F3: Quality Assurance Cost Reduction

Quality Assurance Cost Reduction measures the savings in QA effort through automated review processes integrated into the [[Golden Triangle]] quality workflow.

| Attribute | Value |
|-----------|-------|
| **ID** | F3 |
| **Name** | Quality Assurance Cost Reduction |
| **Description** | QA time saved through automated review |
| **Baseline** | Manual review hours per feature |
| **Target** | 60% reduction in QA time |
| **Measurement Method** | QA hours / Feature |
| **Frequency** | Per release |
| **Owner** | QA Team |

**Automated Review Integration**: The reviewer agent performs automated code review as part of the Golden Triangle validation phase. This reduces manual review effort while maintaining or improving review quality through consistent application of quality criteria.

**Source**: `documents/business/business-features/05-success-metrics.md:287-296`

---

## Summary Dashboard

The following table provides a consolidated view of all 20 success metrics with their categories, baselines, and targets.

| Metric ID | Metric Name | Category | Baseline | Target | Status |
|-----------|-------------|----------|----------|--------|--------|
| A1 | Activation Rate | Adoption | TBD | 70% (7 days) | — |
| A2 | Command Usage | Adoption | TBD | 80% (≥3 commands) | — |
| A3 | Platform Distribution | Adoption | TBD | No platform >60% | — |
| A4 | User Retention | Adoption | TBD | 60%/30d, 40%/90d | — |
| Q1 | Bug Rate | Quality | Pre-AA rate | -70% | — |
| Q2 | Triangle Pass Rate | Quality | TBD | 95% | — |
| Q3 | Review Coverage | Quality | Manual baseline | 100% | — |
| Q4 | Security Findings | Quality | Pre-AA rate | -80% | — |
| Q5 | Exit Criteria | Quality | TBD | 99% | — |
| P1 | Time-to-Production | Performance | 14 days | 4 days | — |
| P2 | Token Reduction | Performance | Naive prompting | -85% | — |
| P3 | Execution Time | Performance | TBD | Variant limits | — |
| P4 | Success Rate | Performance | TBD | 99% | — |
| E1 | DAU | Engagement | TBD | 100 at 6 months | — |
| E2 | Variant Distribution | Engagement | TBD | 60/30/10 | — |
| E3 | Skill Injection | Engagement | TBD | 90% | — |
| E4 | Wiki Usage | Engagement | TBD | 50% | — |
| F1 | Dev Cost | Financial | Baseline | -70% | — |
| F2 | Token Cost | Financial | Naive prompting | -85% | — |
| F3 | QA Cost | Financial | Manual hours | -60% | — |

**Source**: `documents/business/business-features/05-success-metrics.md:299-323`

---

## Measurement Framework

This section describes the governance structure and processes for collecting, validating, and reporting on the success metrics.

**Source**: `documents/business/business-features/05-success-metrics.md:324-332`

### Data Collection Architecture

The measurement framework relies on three primary data sources:

| Data Source | Metrics | Collection Method |
|-------------|---------|-------------------|
| Workflow Telemetry | A1-A4, P1-P4, E1-E4 | Instrumented execution pipeline |
| Quality Gates | Q1-Q5 | Automated quality checks |
| Financial Systems | F1-F3 | Integrated cost tracking |

**Source**: `documents/business/business-features/05-success-metrics.md:324-332`

### Reporting Cadence

| Frequency | Metrics Reported | Audience |
|-----------|-------------------|----------|
| Daily | E1 (DAU) | Product Team |
| Weekly | A1, Q2, Q3, Q5, P2, P4, E3 | Product, Quality, Platform Teams |
| Monthly | A2, A3, A4, E2, E4, F2 | Product, Finance Teams |
| Per Release | Q1, Q4, F1, F3 | All Stakeholders |
| Per Feature | P1, P3 | Engineering Team |

### Metric Ownership

| Owner | Metrics |
|-------|---------|
| Product Team | A1, A2, A4, E1, E2, E3 |
| Platform Team | A3, P2, P3, P4 |
| Quality Team | Q2, Q3, Q5 |
| QA Team | Q1, Q4, F3 |
| Security Team | Q4 |
| Process Team | Q5 |
| Engineering Team | P1, P3 |
| Documentation Team | E4 |
| Finance Team | F1, F2 |

### Evidence Sources

The success metrics framework draws from multiple authoritative sources within the codebase:

| Source Document | Metrics Supported |
|-----------------|-------------------|
| `README.md` | Target metrics (70% faster, 70% bugs, 85% tokens) |
| `rules/CORE.md` | Performance targets encoded in execution rules |
| `rules/PHASES.md` | Phase timing guidelines (P3) |
| `rules/AGENTS.md` | Quality gate definitions (Q2, Q3) |
| `rules/TEAMS.md` | Golden Triangle configurations (Q2) |
| `rules/SKILLS.md` | HSOL Matrix Resolution (P2, E3) |

**Source**: `documents/business/business-features/05-success-metrics.md:326-332`

---

## Related Pages

For additional context, see the following related wiki pages:

- [[Feature Catalogue]] — Complete catalogue of all 20 features organized by category
- [[Business PMD]] — Business process and methodology documentation
- [[Workflow System]] — Detailed workflow definitions and execution patterns
- [[Command System]] — Command routing and variant specifications
- [[Golden Triangle]] — Three-role team collaboration model
- [[Tiered Orchestration]] — TIER 1/2 execution framework
- [[HSOL Skill Injection]] — Hybrid Skill Orchestration Layer
- [[CLI Installer]] — Cross-platform installation mechanism
- [[Architecture Overview]] — System architecture documentation

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-20 | Initial version with all 20 KPIs documented |
