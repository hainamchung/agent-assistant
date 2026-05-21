---
title: Skill Tier Reference
type: entity
tags: [skills, tiers, hsol, reference, matrix]
created: 2026-05-20
updated: 2026-05-21
---

# Skill Tier Reference

The Skill Tier Reference documents the 4-tier skill classification system used by HSOL (Hybrid Skill Orchestration Layer) for context-aware skill injection. Each tier represents a different level of specificity and expertise, with selection rules governing when skills from each tier are injected.

HSOL solves the **Scalability Paradox** — the tension between maintaining a stable, low-latency skill library (1400+ skills) and the need for dynamic, on-demand skill discovery. It selects skills based on task relevance while respecting context window constraints.

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1-22`, `documents/HSOL-ASSESSMENT.md`

---

## Tier Overview

| Tier | Count | Specificity | When Loaded | Example Skills |
|------|-------|------------|-------------|----------------|
| foundation | ~200 | Universal | Always (loaded first) | debugging, code-review, git, testing |
| professional | ~400 | Domain-general | When domain matches | web-development, api-design, database-modeling |
| specialized | ~500 | Technology-specific | When explicitly matched | react-hooks, docker-compose, postgresql-tuning |
| expert | ~300 | Advanced/niche | Only when requested | compiler-design, security-auditing, ml-deployment |

**Source**: `documents/knowledge-architecture/04-design-patterns.md:187-195`, `documents/knowledge-domain/04-business-rules.md:96-138`

---

## Foundation Tier (~200 skills)

Foundation skills are universal — applicable to virtually any development task regardless of domain or technology. These skills represent core competencies that every AI agent should possess, forming the baseline of capability across all operations.

### Detailed Characteristics

- **High utility across all domains**: Skills like debugging, code-review, and testing apply to any programming language or framework
- **Low specificity (broad applicability)**: Each skill covers fundamental concepts applicable in multiple contexts
- **Always loaded first**: Foundation skills are the first skills injected into context, ensuring baseline capability
- **Always included in context**: Even in resource-constrained contexts, foundation skills maintain priority

### Complete Description

The Foundation tier contains approximately 200 skills that form the bedrock of AI-assisted development. These skills are technology-agnostic and domain-independent, focusing on fundamental practices that apply universally. A developer working on a React application needs the same debugging methodology as one working on a Python backend. The Foundation tier ensures this consistency.

Foundation skills are loaded first because they provide essential context for interpreting higher-tier skills. Without a shared understanding of what "code review" means, for example, the specialized code-review-frontend skill lacks foundation to build upon.

### Examples

| Skill ID | Name | Description | Use Cases |
|----------|------|-------------|-----------|
| debugging | Debugging | Systematic root cause analysis using trace, hypothesis, test cycle | Fixing crashes, investigating undefined behavior, performance issues |
| code-review | Code Review | Best practice verification and quality assessment | PR reviews, security audits, style compliance |
| git | Git Version Control | Branching, merging, rebasing, history analysis | Feature branches, conflict resolution, release tagging |
| testing | Testing | Test strategy design, execution, and coverage analysis | Unit tests, integration tests, TDD workflows |
| problem-solving | Problem Solving | Systematic decomposition and solution design | Architecture decisions, refactoring plans, bug triage |
| documentation | Documentation | Technical writing for humans and systems | README files, API docs, inline comments |
| security | Security Basics | Common vulnerability patterns and mitigations | SQL injection prevention, XSS protection, auth best practices |
| performance | Performance | Profiling, benchmarking, and optimization strategies | Load testing, memory leaks, query optimization |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:76-93`

---

## Professional Tier (~400 skills)

Professional skills are domain-general skills that apply to broad categories of work. They bridge the gap between universal foundations and technology-specific specializations, providing depth in specific domains without tying to particular tools.

### Detailed Characteristics

- **Domain-specific but not technology-specific**: The api-design skill covers REST principles, GraphQL patterns, and API versioning without specifying Express or FastAPI
- **Loaded when task domain matches**: The orchestrator identifies the task domain and injects relevant professional skills
- **Priority after foundation skills**: Professional skills are loaded after all foundation skills but before specialized ones
- **Moderate specificity**: These skills go deeper than foundations but maintain broad applicability within their domain

### Complete Description

The Professional tier comprises approximately 400 skills organized by professional domain. These skills represent the core knowledge areas that define professional software development: backend engineering, frontend engineering, DevOps, data engineering, and security.

Unlike foundation skills which are universally applicable, professional skills focus on domain-specific best practices. The database-modeling skill, for example, covers normalization theory, indexing strategies, and schema design principles that apply whether using PostgreSQL, MySQL, or MongoDB. This domain-level abstraction allows the skill to remain relevant across technology changes.

Professional skills are injected based on task domain matching. When a user requests help with a backend task, backend professional skills are loaded. The selection is based on the dominant domain of the request, with secondary domains being considered for cross-functional tasks.

### Examples by Domain

| Domain | Skill ID | Name | Coverage |
|--------|----------|------|----------|
| Backend | api-design | API Design | REST, GraphQL, gRPC, versioning, authentication patterns |
| Backend | database-modeling | Database Modeling | Normalization, indexing, relationships, migration strategies |
| Backend | server-optimization | Server Optimization | Caching, load balancing, connection pooling |
| Backend | authentication | Authentication | OAuth, JWT, session management, MFA, SSO |
| Frontend | component-design | Component Design | Composition, props, state, lifecycle patterns |
| Frontend | state-management | State Management | Local vs global state, immutable patterns, optimistic updates |
| Frontend | css-architecture | CSS Architecture | BEM, CSS-in-JS, design systems, responsive patterns |
| Frontend | accessibility | Accessibility | WCAG, ARIA, keyboard navigation, screen readers |
| DevOps | ci-cd-pipeline | CI/CD Pipeline | Build automation, test gates, deployment strategies |
| DevOps | container-orchestration | Container Orchestration | Kubernetes, Docker Swarm, service mesh |
| DevOps | monitoring | Monitoring | Metrics, logging, alerting, observability |
| DevOps | infrastructure-as-code | Infrastructure as Code | Terraform, Pulumi, cloud resource management |
| Data | etl-pipelines | ETL Pipelines | Extract, transform, load patterns, data quality |
| Data | data-modeling | Data Modeling | Data warehouse design, star schema, dimension tables |
| Data | analytics | Analytics | Metrics definition, dashboards, funnel analysis |
| Security | threat-modeling | Threat Modeling | STRIDE, attack trees, risk assessment |
| Security | secure-coding | Secure Coding | Input validation, output encoding, security headers |
| Security | vulnerability-assessment | Vulnerability Assessment | Scanning, penetration testing, patch management |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:76-93`

---

## Specialized Tier (~500 skills)

Specialized skills are technology-specific skills that apply to particular tools, frameworks, or technologies. They provide deep, actionable guidance for specific technology choices rather than general domain knowledge.

### Detailed Characteristics

- **Technology-specific**: Each skill targets a specific technology (React, Docker, PostgreSQL) or narrow technology category
- **Loaded only with explicit technology match**: The orchestrator requires a clear technology indicator in the request
- **Higher priority when match is found**: Within the specialized tier, more relevant skills rank higher
- **Low breadth, high depth**: These skills sacrifice broad applicability for deep, specific guidance

### Complete Description

The Specialized tier contains approximately 500 skills organized by specific technologies. These skills represent the deep, actionable knowledge needed to work effectively with particular tools. Where the professional tier covers "API Design" broadly, the specialized tier covers "FastAPI Patterns" or "Express Best Practices."

Specialized skills are triggered by explicit technology matches in the request. When a user mentions "React" or "Docker," the orchestrator recognizes these as technology indicators and injects the corresponding specialized skills. The matching is precise — mentioning "web framework" doesn't trigger specialized skills, but mentioning "FastAPI" does.

This tier's depth makes it invaluable for technology-specific guidance. The react-hooks skill covers useState, useEffect, useContext, and custom hooks with specific patterns and anti-patterns. No professional-tier skill could provide this level of detail while maintaining domain-level abstraction.

### Examples by Technology

| Technology | Skill ID | Name | Coverage |
|------------|----------|------|----------|
| React | react-hooks | React Hooks | useState, useEffect, useContext, useMemo, useCallback, custom hooks |
| React | react-context | React Context | Context creation, providers, consumption patterns, performance |
| React | nextjs | Next.js | App Router, Server Components, API routes, ISR, edge functions |
| React | react-testing-library | React Testing | Testing Library queries, userEvent, mocking, async testing |
| Node.js | express | Express.js | Middleware, routing, error handling, authentication middleware |
| Node.js | fastify | Fastify | Schema validation, plugins, decorators, performance tuning |
| Node.js | node-debugging | Node Debugging | Inspector protocol, async stacks, memory profiling |
| Node.js | npm-package-publishing | NPM Publishing | Package.json configuration, versioning, scope management |
| Docker | docker-compose | Docker Compose | Multi-container orchestration, networking, volumes |
| Docker | docker-networking | Docker Networking | Bridge, host, overlay networks, DNS resolution |
| Docker | container-optimization | Container Optimization | Multi-stage builds, layer caching, image size reduction |
| PostgreSQL | postgresql-indexing | PostgreSQL Indexing | B-tree, GIN, GiST, partial indexes, index selection |
| PostgreSQL | postgresql-query-optimization | Query Optimization | EXPLAIN analysis, query planning, join strategies |
| PostgreSQL | postgresql-schemas | Schema Design | Table design, constraints, inheritance, partitioning |
| AWS | ec2 | EC2 | Instance types, AMIs, security groups, auto-scaling |
| AWS | lambda | Lambda | Functions, layers, cold starts, pricing optimization |
| AWS | s3 | S3 | Buckets, policies, lifecycle, presigned URLs, static hosting |
| AWS | cloudformation | CloudFormation | Templates, stacks, drift detection, nested stacks |
| AWS | iam | IAM | Roles, policies, permission boundaries, service control |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:76-93`

---

## Expert Tier (~300 skills)

Expert skills are advanced, niche, or highly specialized skills reserved for specific requests. They represent deep expertise in complex or narrow domains that most developers rarely need but require when they do.

### Detailed Characteristics

- **Advanced or niche expertise required**: These skills cover topics that require specialized knowledge or experience
- **Loaded only when explicitly requested**: The orchestrator never auto-injects expert skills
- **Highest value when relevant**: When the request matches an expert skill, the guidance is invaluable
- **Lowest frequency of use**: Most requests never trigger expert skills, but they exist for when needed

### Complete Description

The Expert tier contains approximately 300 skills covering advanced, specialized, or niche topics. Unlike other tiers, expert skills are never automatically injected. The user or agent must explicitly request them, acknowledging that advanced guidance is being invoked.

Expert skills cover domains where incorrect guidance can be costly or dangerous. Security-auditing skills, for example, cover penetration testing methodologies and vulnerability exploitation — guidance that must be requested knowingly. Compiler-design skills cover topics that require deep systems knowledge.

This tier serves as a "expert mode" for the skill system. When a task requires cryptography expertise, the user can invoke the cryptography expert skill. When building a distributed system, the distributed-systems expert skill provides appropriate depth.

### Examples by Domain

| Domain | Skill ID | Name | Coverage |
|--------|----------|------|----------|
| Security | penetration-testing | Penetration Testing | OWASP, vulnerability scanning, exploitation frameworks |
| Security | cryptography | Cryptography | Encryption algorithms, key management, PKI, TLS |
| Security | secure-architecture | Secure Architecture | Zero trust, defense in depth, threat modeling at scale |
| Performance | compiler-optimization | Compiler Optimization | LLVM, bytecode, JIT compilation, profile-guided optimization |
| Performance | profiling-advanced | Advanced Profiling | Flame graphs, trace analysis, hardware counters |
| Performance | memory-optimization | Memory Optimization | GC tuning, object pooling, memory allocators |
| ML/AI | ml-deployment | ML Deployment | Model serving, A/B testing, feature stores, MLOps |
| ML/AI | model-optimization | Model Optimization | Quantization, pruning, distillation, ONNX |
| ML/AI | vector-databases | Vector Databases | Embedding storage, approximate nearest neighbors, hnsw |
| Systems | operating-system-kernel | OS Kernel | Linux kernel internals, system calls, drivers |
| Systems | distributed-systems | Distributed Systems | CAP theorem, consensus algorithms, CRDTs |
| Systems | consensus-algorithms | Consensus Algorithms | Raft, Paxos, Byzantine fault tolerance |
| Architecture | microservices-design | Microservices Design | Service decomposition, API gateways, service mesh |
| Architecture | event-driven-architecture | Event-Driven Architecture | Event sourcing, CQRS, message queues, Kafka |
| Architecture | cqrs | CQRS | Command query separation, event sourcing, read optimization |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:76-93`

---

## HSOL Skill Resolution Algorithm

HSOL (Hybrid Skill Orchestration Layer) resolves skills through a 10-step algorithm that combines matrix lookup with dynamic discovery.

### Steps 1-7: Matrix Resolution (Always Runs)

**Step 1: Context Analysis**

Analyze the current task to identify:
- Domain (frontend, backend, database, etc.)
- Technologies (React, Node.js, PostgreSQL, etc.)
- Task type (implementation, debugging, design, etc.)
- Complexity level

**Step 2: Profile Extraction**

Extract agent profile configuration:
- Active domains (from agent's domain list)
- Skill preferences (from agent's skill section)
- Context constraints (from agent's available_skills)

**Step 3: Tier-Based Matching**

Match against skill library by tier:
- Foundation skills are always available
- Professional skills are matched against task domain
- Specialized skills require explicit technology matches
- Expert skills are reserved for specific requests

**Step 4: Priority Calculation**

Calculate priority scores for matched skills:
- Relevance to task domain (high weight)
- Required vs preferred (required skills score higher)
- Recency of use (frequently used skills score slightly higher)
- Tier order (foundation → professional → specialized → expert)

**Step 5: Context Window Fit**

Check how many skills fit in the remaining context window:
- Small context (<32K tokens): 10–15 skills maximum
- Medium context (32K–64K tokens): 20–30 skills maximum
- Large context (>64K tokens): 50+ skills maximum

**Step 6: Return Skill Set**

Return the highest-priority skills that fit within the context window:
- Skills are injected as context for the agent
- The agent receives skill guidance without seeing the full skill library
- Additional skills are available on demand if the agent requests them

**Step 7: Calculate Matrix Fitness**

Compute overall fitness score (0.0 to 1.0) for the returned skill set.

### Steps 8-10: Dynamic Enhancement (Conditional)

**Step 8: Check Discovery Eligibility**

Dynamic discovery runs only when:
- Command variant is `hard` or `team` (not `fast`)
- Best matrix fitness < 0.8

**Step 9: Async Dynamic Discovery**

If eligible, trigger background discovery:
- Query `find-skills` skill with request keywords
- Search community ecosystem (https://skills.sh/)
- Compare fitness scores with matrix results

**Step 10: Surface Recommendations**

Based on comparison:
- If dynamic is significantly better (>0.15 delta): prompt to install
- If matrix is adequate: continue with matrix skills
- If no suitable skill found: report capability gap

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:187-251`, `documents/HSOL-ASSESSMENT.md`

---

## Skill Fitness Calculation

The fitness score determines how well a skill matches the current request.

### Fitness Formula

```
SKILL_FITNESS = (
    w₁ × SEMANTIC_MATCH +
    w₂ × SPECIFICITY_SCORE +
    w₃ × TRUST_LEVEL +
    w₄ × FRESHNESS_SCORE +
    w₅ × SUCCESS_RATE
) / Σwᵢ
```

### Factor Weights

| Factor | Weight | Description |
|--------|--------|-------------|
| SEMANTIC_MATCH | 0.35 | Primary factor — keyword overlap + domain alignment |
| SPECIFICITY_SCORE | 0.25 | How well skill specificity matches request specificity |
| TRUST_LEVEL | 0.20 | Pre-vetted (matrix) vs newly discovered (dynamic) |
| FRESHNESS_SCORE | 0.10 | Last update recency for evolving domains |
| SUCCESS_RATE | 0.10 | Historical execution success |

### Factor Definitions

| Factor | Matrix Skill Calculation | Dynamic Skill Calculation |
|--------|--------------------------|---------------------------|
| SEMANTIC_MATCH | Keyword overlap + domain alignment | Search relevance score |
| SPECIFICITY_SCORE | Generic (0.5) to Specialized (1.0) | Query specificity alignment |
| TRUST_LEVEL | 1.0 (pre-vetted) | 0.3 (new) → 1.0 (proven) |
| FRESHNESS_SCORE | Last update recency | Always 1.0 (community-current) |
| SUCCESS_RATE | Historical execution success | Community rating / reviews |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:366-385`

---

## Decision Matrix

The decision matrix determines which skills to execute based on fitness scores.

| Matrix Fitness | Dynamic Fitness | Action |
|---------------|----------------|--------|
| ≥ 0.8 (HIGH) | Any | Execute matrix skill |
| 0.75-0.8 (MEDIUM) | ≥ 0.9 (HIGH) | Execute matrix, suggest dynamic |
| 0.75-0.8 (MEDIUM) | < 0.9 | Execute matrix skill |
| < 0.75 (LOW) | ≥ 0.8 (HIGH) | Prompt to install dynamic |
| < 0.75 (LOW) | < 0.8 (LOW) | Report capability gap |
| None | ≥ 0.7 | Install and execute dynamic |
| None | None | Fallback to general capabilities |

### Discovery Triggers

| Condition | Result |
|-----------|--------|
| `fast` variant | No discovery (keeps fast path low-latency) |
| `hard`/`team` + fitness ≥ 0.8 | Skip discovery |
| `hard`/`team` + 0.75 ≤ fitness < 0.8 | Async (recommend for next time) |
| `hard`/`team` + fitness < 0.75 | Blocking (current task uses new skill) |

### Blocking vs Async Discovery

**Blocking Mode** (Fitness < 0.75): Wait for discovery to complete, install new skill, re-inject context, execute with newly acquired skill. The current task uses the new skill for best completion.

**Async Mode** (Fitness 0.75-0.8): Do not wait for discovery. Execute with matrix skills immediately. Surface recommendation for future use. Does not improve accuracy for current task.

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1274-1292`, `documents/HSOL-ASSESSMENT.md:29-34`

---

## Selection Priority

Skill selection follows a strict priority order:

```
1. foundation (always, always first)
      ↓
2. professional (if task domain matches)
      ↓
3. specialized (if explicit technology match)
      ↓
4. expert (only if explicitly requested)
```

### Priority Rules

- **Foundation always wins**: If a skill exists in both foundation and another tier, the foundation version is used
- **Tier is a soft filter**: Skills are ranked within tiers by relevance, not eliminated
- **Expert is opt-in**: Expert skills are never auto-injected — the user or agent must request them

**Source**: `documents/knowledge-domain/04-business-rules.md:96-138`

---

## Trust Progression

Dynamic skills progress through trust levels based on usage and validation.

| State | Trust Level | Requirements | Restrictions |
|-------|-------------|--------------|--------------|
| **New Skill** | 0.3 | Initial discovery | Cannot suggest network ops, limited file access, user confirm for actions |
| **Validated** | 0.7 | 10 successful executions | Standard capabilities, still logged for audit |
| **Promoted** | 1.0 | 10 executions, 85% success, 80% satisfaction | Full capabilities (same as native matrix skills) |

### Promotion Criteria

Dynamic skills are auto-promoted to matrix when:
- Minimum 10 executions
- Success rate ≥ 85%
- User satisfaction ≥ 80%
- Actively used within 90 days

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:983-1030`

---

## Skill Lifecycle States

```
                    ┌─────────────────┐
                    │   DISCOVERED    │
                    │   (Dynamic)     │
                    └────────┬────────┘
                             │
                    First successful execution
                             │
                             ▼
                    ┌─────────────────┐
                    │   EVALUATING    │
                    │   (Probation)   │
                    └────────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
        Success > 85%   Abandoned    Failure > 30%
               │             │             │
               ▼             ▼             ▼
      ┌─────────────┐ ┌───────────┐ ┌─────────────┐
      │  VALIDATED  │ │  DORMANT  │ │  REJECTED   │
      │  (Trusted)  │ │           │ │             │
      └──────┬──────┘ └───────────┘ └─────────────┘
             │
    High usage + approval
             │
             ▼
      ┌─────────────┐
      │  PROMOTED   │
      │  (Matrix)   │
      └──────┬──────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌──────────┐   ┌──────────────┐
│  ACTIVE  │   │  DEPRECATED  │
│  (Core)  │   │  (Phase out) │
└──────────┘   └──────────────┘
```

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:593-634`

---

## Context Window Limits

The number of skills injected depends on available context:

| Context Size | Token Budget | Foundation | Max Additional | Total Max |
|-------------|-------------|------------|---------------|-----------|
| Small (<32K) | ~30K tokens | ~5 | ~5–10 | 10–15 |
| Medium (32K–64K) | ~48K tokens | ~5 | ~15–25 | 20–30 |
| Large (>64K) | ~100K tokens | ~5 | ~45+ | 50+ |

The system allocates ~5 foundation skills minimum, then fills remaining budget with higher-tier skills ranked by relevance.

**Source**: `documents/knowledge-architecture/04-design-patterns.md`

---

## Skill Organization

Skills are organized in two directories for different access patterns.

### `skills/` — Human Navigation

Skills organized by domain for human browsing:

```
skills/
├── backend/
│   ├── api-design.md
│   └── database-modeling.md
├── frontend/
│   ├── react.md
│   └── css-architecture.md
├── devops/
│   ├── ci-cd-pipeline.md
│   └── docker.md
└── ...
```

### `matrix-skills/` — HSOL Optimization

Skills organized by tier for efficient HSOL selection:

```
matrix-skills/
├── foundation/
│   ├── debugging.md
│   ├── code-review.md
│   └── git.md
├── professional/
│   ├── api-design.md
│   └── web-development.md
├── specialized/
│   ├── react-hooks.md
│   └── docker-compose.md
└── expert/
    ├── compiler-design.md
    └── security-auditing.md
```

**Source**: `documents/knowledge-domain/01-entities.md:208-238`

---

## Matrix Skill Structure

Each skill in the matrix follows a standardized structure:

### Skill Document Format

```yaml
---
skill_id: "react-hooks"
name: "React Hooks"
tier: "specialized"
domain: "frontend"
technologies: ["react", "javascript"]
priority: 8
trust_level: 1.0
description: "Modern React Hooks patterns and best practices"
created: 2026-01-15
updated: 2026-05-01
---

# React Hooks Skill

## Overview
[Skill content with patterns, examples, anti-patterns]

## Usage Guidelines
[When to use this skill, context for injection]

## Examples
[Code examples demonstrating skill application]
```

### Unified Skill Index

```yaml
unified_skill_index:
  version: "1.0"
  generated_at: "2026-05-21T00:00:00Z"
  
  matrix_skills:
    - skill_id: "better-auth"
      source: "matrix"
      domain: "backend"
      priority: 8
      trust_level: 1.0
      path: "~/.cursor/skills/agent-assistant/matrix-skills/backend.yaml"
  
  dynamic_skills:
    - skill_id: "clerk-auth"
      source: "github/vercel-labs/skills"
      domain: "backend"
      priority: 7
      trust_level: 0.6
      path: "~/.cursor/skills/clerk-auth/SKILL.md"
      version: "v1.2.0"
```

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:824-860`

---

## Conflict Resolution

| Conflict Type | Resolution Strategy |
|--------------|---------------------|
| **ID Collision** | Dynamic skill prefixed with `ext-` |
| **Domain Overlap** | Matrix takes precedence unless dynamic is superior |
| **Capability Duplication** | Fitness scoring determines winner |
| **Version Incompatibility** | Block installation, notify user |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:741-751`

---

## Edge Cases & Handling

### Network Failure

| Scenario | Impact | Resolution |
|----------|--------|------------|
| Discovery timeout (>5s) | Cannot retrieve candidates | Proceed with matrix, notify user |
| Installation failure | Corrupted state | Rollback, report error with retry |
| Intermittent connectivity | Network skill may fail | Pre-flight check, fallback to local |

### find-skills Unavailable

If find-skills is not installed or `npx skills find` fails:
1. Proceed with matrix skills only
2. Surface message: "Dynamic skill discovery unavailable. Using built-in skills."
3. Queue background retry for later

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:863-941`, `documents/HSOL-ASSESSMENT.md:61-66`

---

## Related Pages

- [[Skill System]] — HSOL and the full skill library
- [[Skill Tier Reference]] — The 10-step skill injection algorithm
- [[Business Rules]] — Business rules governing skill selection and promotion
- [[Agent System]] — How agents use the skill system
