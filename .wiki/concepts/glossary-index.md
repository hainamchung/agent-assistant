---
title: Glossary Index
description: Quick reference index of all 31 canonical terms for Agent Assistant, organized alphabetically and by category.
category: concept
tags: [glossary, terminology, reference, quick-lookup, index]
related:
  - Terminology
  - Agent System
  - Command System
  - Skill System
  - Golden Triangle
created: 2026-05-20
updated: 2026-05-20
---

# Glossary Index

Quick lookup reference for all 31 canonical terms. For full definitions, see [[Terminology]].

---

## Overview

This index provides rapid access to the complete terminology vocabulary used across Agent Assistant. Terms are organized alphabetically and by category for efficient navigation.

**Categories**: Orchestration (6) | Agent (8) | Command (3) | Skill (4) | Platform (4) | Workflow (4) | Delivery (2)

---

## Terms A-Z

### A

**Actor** (T27) — An entity that interacts with the system, including end users, orchestrator, agents, and support systems.

**Agent** (T7) — A specialized AI role with defined capabilities, responsibilities, and behavioral constraints.

---

### C

**Command** (T15) — A slash-prefixed invocation that triggers a workflow (e.g., `/cook`, `/fix`, `/test`).

**Consensus** (T6) — Agreement reached among team members before releasing output.

**Consensus Stamp** (T31) — Formal indicator that Golden Triangle team members have approved output.

**Cursor** (T23) — Primary AI coding platform supported by Agent Assistant.

---

### D

**Deliverable** (T30) — Output produced by an agent or phase following defined format requirements.

**Dispatch** (T17) — The act of sending work to an agent, either direct or distributed.

---

### E

**Execution Agent** (T13) — An agent category that directly implements code (builders).

**Executor** (T8) — In Golden Triangle, the agent responsible for building and implementing deliverables.

---

### M

**Mailbox** (T29) — Append-only communication log for Golden Triangle team phases.

**Matrix** (T19) — Pre-curated collection of skills in a trusted repository.

**Meta Agent** (T12) — An agent category that coordinates and plans but never implements directly.

---

### O

**Orchestrator** (T1) — The central coordinator that routes commands, delegates to agents, and manages workflow execution.

---

### P

**Phase** (T3) — A discrete stage of workflow execution with defined entry criteria, activities, and exit criteria.

**Platform** (T22) — The AI coding tool where Agent Assistant operates (Cursor, Claude Code, Codex, etc.).

**Profile** (T20) — The declared domain and category of an agent, used to resolve relevant skills.

---

### R

**Resolution** (T21) — The process of determining which skills are relevant for a given agent profile and task context.

**Reviewer** (T9) — In Golden Triangle, the agent responsible for quality gatekeeping that challenges work and validates correctness.

**Router** (T16) — The system component that maps user input to command workflows.

---

### S

**Skill** (T18) — A domain knowledge module that provides specialized capabilities to agents.

**SLA** (T28) — Service Level Agreement defining expected timing and quality for workflows.

---

### T

**Team** (T11) — A configured set of 3 agents (Tech Lead + Executor + Reviewer) for collaborative work.

**Tech Lead** (T10) — In Golden Triangle, the agent responsible for task decomposition, team coordination, and dispute arbitration.

**Tier** (T2) — Execution priority level determining how agents are invoked (TIER 1 = sub-agent, TIER 2 = embody).

---

### V

**Validation Agent** (T14) — An agent category that reviews, tests, and ensures quality.

**Variant** (T4) — A modifier that changes workflow execution characteristics (`:fast`, `:hard`, `:team`).

---

### W

**Workflow** (T26) — A defined sequence of phases that accomplish a specific goal.

---

## Category Index

### Orchestration (6 terms)

Coordination and execution control mechanisms.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T1\|Orchestrator]] | T1 | Central coordinator for routing and delegation |
| [[Terminology#T2\|Tier]] | T2 | Execution priority level (TIER 1/2) |
| [[Terminology#T3\|Phase]] | T3 | Discrete stage of workflow execution |
| [[Terminology#T4\|Variant]] | T4 | Workflow modifier (`:fast`, `:hard`, `:team`) |
| [[Terminology#T5\|Handoff]] | T5 | Transfer of context between agents |
| [[Terminology#T6\|Consensus]] | T6 | Team agreement before release |

---

### Agent (8 terms)

Specialized roles and team configurations.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T7\|Agent]] | T7 | Specialized AI role with capabilities |
| [[Terminology#T8\|Executor]] | T8 | Builder/implementer in Golden Triangle |
| [[Terminology#T9\|Reviewer]] | T9 | Quality gatekeeper in Golden Triangle |
| [[Terminology#T10\|Tech Lead]] | T10 | Coordinator/arbiter in Golden Triangle |
| [[Terminology#T11\|Team]] | T11 | 3-agent configuration (T+E+R) |
| [[Terminology#T12\|Meta Agent]] | T12 | Coordinates but never implements |
| [[Terminology#T13\|Execution Agent]] | T13 | Directly implements code |
| [[Terminology#T14\|Validation Agent]] | T14 | Reviews, tests, ensures quality |

---

### Command (3 terms)

User invocation and routing mechanisms.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T15\|Command]] | T15 | Slash-prefixed workflow trigger |
| [[Terminology#T16\|Router]] | T16 | Maps user input to commands |
| [[Terminology#T17\|Dispatch]] | T17 | Sends work to agents |

---

### Skill (4 terms)

Domain knowledge organization and resolution.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T18\|Skill]] | T18 | Domain knowledge module |
| [[Terminology#T19\|Matrix]] | T19 | Pre-curated skill repository |
| [[Terminology#T20\|Profile]] | T20 | Agent domain and category declaration |
| [[Terminology#T21\|Resolution]] | T21 | Skill matching process |

---

### Platform (4 terms)

Supported AI coding tools.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T22\|Platform]] | T22 | AI coding tool hosting Agent Assistant |
| [[Terminology#T23\|Cursor]] | T23 | Primary platform with full features |
| [[Terminology#T24\|Claude Code]] | T24 | Anthropic CLI tool |
| [[Terminology#T25\|Codex]] | T25 | OpenAI coding model |

---

### Workflow (4 terms)

Process and operational mechanisms.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T26\|Workflow]] | T26 | Defined sequence of phases |
| [[Terminology#T27\|Actor]] | T27 | Entity interacting with system |
| [[Terminology#T28\|SLA]] | T28 | Performance expectations |
| [[Terminology#T29\|Mailbox]] | T29 | Team communication log |

---

### Delivery (2 terms)

Output production and approval.

| Term | ID | Quick Definition |
|------|----|------------------|
| [[Terminology#T30\|Deliverable]] | T30 | Produced output following format |
| [[Terminology#T31\|Consensus Stamp]] | T31 | Formal team approval indicator |

---

## Quick Navigation

| By ID | By Category |
|-------|-------------|
| [T1-T6](#orchestration-6-terms) Orchestration | [Orchestration](#orchestration-6-terms) |
| [T7-T14](#agent-8-terms) Agent | [Agent](#agent-8-terms) |
| [T15-T17](#command-3-terms) Command | [Command](#command-3-terms) |
| [T18-T21](#skill-4-terms) Skill | [Skill](#skill-4-terms) |
| [T22-T25](#platform-4-terms) Platform | [Platform](#platform-4-terms) |
| [T26-T29](#workflow-4-terms) Workflow | [Workflow](#workflow-4-terms) |
| [T30-T31](#delivery-2-terms) Delivery | [Delivery](#delivery-2-terms) |

---

## Related Pages

- [[Terminology]] — Full definitions for all 31 terms
- [[Agent System]] — 21 specialist agents
- [[Command System]] — 14 commands and routing
- [[Skill System]] — Skill resolution and injection
- [[Golden Triangle]] — Three-role collaboration pattern
