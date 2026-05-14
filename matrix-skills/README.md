# Matrix Skills — Skill Definitions Index

> **PURPOSE**: Actual skill definitions used by HSOL algorithm.
> **LOAD**: On demand — when skills analysis requires complexity assessment.
> **KEY**: Skills are NOT just labels. Each has explicit triggers, actions, and outputs.

---

## Skill Categories

```
matrix-skills/
├── foundation/     # TIER 1: Simple tasks (debugging, frontend, backend)
├── professional/   # TIER 2: Standard tasks (api-design, database, devops, testing, etc.)
├── specialized/    # TIER 3: Complex tasks (security, performance, architecture, cross-cutting)
└── expert/       # TIER 4: Expert tasks (system-design, distributed-systems, etc.)
```

---

## Skill Inventory

### TIER 1 — Foundation

| Skill | Purpose |
|-------|---------|
| `debugging` | Systematic bug investigation with evidence-based root cause |
| `frontend` | Targeted UI changes without breaking the broader system |
| `backend` | Targeted backend changes without introducing bugs |

### TIER 2 — Professional

| Skill | Purpose |
|-------|---------|
| `api-design` | Design APIs that are intuitive, evolvable, secure, performant |
| `code-quality` | Write code that communicates intent, not just correctness |
| `database` | Design databases that are fast, consistent, maintainable |
| `devops` | Ship reliable software through automated, repeatable deployments |
| `feature-design` | Design features that integrate cleanly and don't create tech debt |
| `mobile` | Build mobile apps that are fast, responsive, native |
| `regression-testing` | Ensure changes don't break existing functionality |
| `testing` | Build confidence through the right tests at the right level |
| `ai-assist` | Use AI assistance to amplify productivity without degrading quality |

### TIER 3 — Specialized

| Skill | Purpose |
|-------|---------|
| `architecture` | Design systems that are maintainable, scalable, cost-effective |
| `cross-cutting` | Design features that touch everything without creating a tangled mess |
| `performance` | Make systems fast and scalable, not just working correctly |
| `security` | Build systems secure by design, not secured after the fact |

### TIER 4 — Expert

| Skill | Purpose |
|-------|---------|
| `distributed-systems` | Design and debug distributed systems with CAP trade-offs |
| `llm-integration` | Design production-ready LLM-integrated systems |
| `security-audit` | Comprehensive security analysis with severe consequence handling |
| `system-design` | Design systems where no established pattern reliably applies |

---

## Usage in HSOL Algorithm

```
task complexity assessment → skill tier selection →
  ├── Simple    → foundation/
  ├── Standard  → professional/
  ├── Complex   → specialized/
  └── Expert    → expert/

Output: npx matrix-skills/score.js [tier] [task-type] [context-flags]
```

---

## Skill Tier Definitions

### TIER 1 — Foundation (Simple tasks)

Single-file changes, bug fixes, documentation, trivial refactors.
**Trigger**: ≤ 50 lines changed, no new architecture, single domain.

### TIER 2 — Professional (Standard tasks)

Multi-file changes, feature additions, API integrations, standard patterns.
**Trigger**: 50-500 lines, standard architecture, 1-2 domains.

### TIER 3 — Specialized (Complex tasks)

New architecture, distributed systems, security-critical, performance optimization.
**Trigger**: 500-2000 lines, new patterns, 3+ domains, cross-cutting concerns.

### TIER 4 — Expert (Expert tasks)

Novel approaches, research needed, multi-system coordination, cutting-edge tech.
**Trigger**: > 2000 lines, no prior art, novel requirements, high stakes.

---

## Quick Reference

| Task Type | Suggested Tier | Skills to Activate |
|-----------|---------------|-------------------|
| Bug fix | TIER 1-2 | debugging, regression-testing |
| Small feature | TIER 2 | feature-design, api-design |
| Large feature | TIER 3 | architecture, distributed-systems |
| Security fix | TIER 3-4 | security-audit, threat-modeling |
| Performance | TIER 3 | profiling, optimization, benchmarking |
| Refactor | TIER 2-3 | code-quality, technical-debt |
| New architecture | TIER 4 | system-design, research |

---

**NOTE**: Each skill file in subdirectories contains:
- Trigger conditions (when to use)
- Actions (what to do)
- Outputs (what to produce)
- Quality gates (how to verify)
