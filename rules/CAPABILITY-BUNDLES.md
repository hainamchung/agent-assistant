---
schema-version: "1.0"
name: CAPABILITY-BUNDLES
description: Pre-configured agent bundles for common composite tasks
status: active
---

# 📦 CAPABILITY BUNDLES

> **LOAD**: When task matches a known composite pattern  
> **PREREQUISITE**: `rules/FITNESS-ROUTING.md` (fitness scoring within bundles)  
> **INTEGRATION**: `rules/TEAMS-LITE.md` (bundle agents join team roster)

---

## BUNDLES

### Bundle 1: Full-Stack Feature

**Trigger keywords**: "full-stack", "end-to-end feature", "frontend + backend"

| Role | Agent | Responsibility |
|------|-------|---------------|
| Lead | `tech-lead` | Architecture decisions, integration coordination |
| Backend | `backend-engineer` | API, business logic, data layer |
| Frontend | `frontend-engineer` | UI components, state management |
| Test | `tester` | Integration tests, E2E tests |
| Review | `reviewer` | Cross-stack code review |

### Bundle 2: Security Hardening

**Trigger keywords**: "security audit", "hardening", "OWASP", "penetration test"

| Role | Agent | Responsibility |
|------|-------|---------------|
| Lead | `security-engineer` | Threat model, vulnerability assessment |
| Backend | `backend-engineer` | Remediation implementation |
| Database | `database-architect` | Data-layer hardening |
| Review | `reviewer` | Security review checklist |

### Bundle 3: Performance Optimization

**Trigger keywords**: "optimization", "performance", "speed", "latency", "throughput"

| Role | Agent | Responsibility |
|------|-------|---------------|
| Lead | `performance-engineer` | Profiling, bottleneck analysis |
| Backend | `backend-engineer` | Server-side optimization |
| Database | `database-architect` | Query optimization, indexing |
| Frontend | `frontend-engineer` | Client-side performance |
| Review | `reviewer` | Performance regression review |

### Bundle 4: Data Pipeline

**Trigger keywords**: "data pipeline", "ETL", "data migration", "data flow"

| Role | Agent | Responsibility |
|------|-------|---------------|
| Lead | `database-architect` | Schema design, migration strategy |
| Backend | `backend-engineer` | Pipeline implementation |
| DevOps | `devops-engineer` | Infrastructure, monitoring |
| Test | `tester` | Data integrity validation |

### Bundle 5: DevOps Setup

**Trigger keywords**: "CI/CD", "deployment", "infrastructure", "docker", "kubernetes"

| Role | Agent | Responsibility |
|------|-------|---------------|
| Lead | `devops-engineer` | Pipeline design, infrastructure |
| Backend | `backend-engineer` | Application configuration |
| Security | `security-engineer` | Secrets management, access control |
| Test | `tester` | Deployment verification |

---

## RESOLUTION ALGORITHM

```
FUNCTION resolve_bundle(task):
  // Step 1: Keyword matching
  FOR EACH bundle IN BUNDLES:
    match_score = keyword_overlap(task.keywords, bundle.trigger_keywords)
    IF match_score > 0.6:
      candidate_bundles.push(bundle)

  // Step 2: If no bundle matches, fall back to individual fitness routing
  IF candidate_bundles.length == 0:
    RETURN fitness_route(task, all_agents)  // from FITNESS-ROUTING.md

  // Step 3: Pick the best-matching bundle
  best_bundle = candidate_bundles.sort_by(match_score).first

  // Step 4: Within the bundle, rank agents by fitness for the specific sub-task
  FOR EACH role IN best_bundle.roles:
    role.fitness = fitness_route(task, [role.agent])

  // Step 5: Return bundle with fitness-ranked agents
  RETURN best_bundle
END FUNCTION
```

---

## BUNDLE-TEAM INTEGRATION

When a bundle is activated:

1. **INJECT** bundle agents into `TEAMS-LITE.md` team roster
2. **ASSIGN** bundle `Lead` as the team's Tech Lead (Golden Triangle)
3. **MAP** other bundle roles to Executor / Reviewer as appropriate
4. **APPLY** normal team workflow (P1-P7 phases) with bundle composition

---

## CUSTOM BUNDLES

Users can define project-specific bundles in `topologies/` as custom topology files:

```yaml
# topologies/my-bundle.md frontmatter
---
topology: custom-bundle
agents: [agent-a, agent-b, agent-c]
trigger: "my-specific-pattern"
---
```

Custom bundles are matched after built-in bundles (lower priority).

---

## DEGRADATION INTERACTION

Under context budget pressure (CONTEXT-BUDGET.md):

| Zone | Bundle Behavior |
|------|:---------------:|
| 🟢 Green | Full bundle activation |
| 🟡 Yellow | Bundle activated, limited to 3 agents |
| 🔴 Red | Bundle disabled — use individual fitness routing |
| ⚫ Critical | All routing halted |

---

## SECURITY CONSIDERATIONS

- Bundle composition is static and pre-defined (no runtime injection)
- Keyword matching uses sanitized task keywords only
- Custom bundles from topologies/ are validated by lint-agents.js before use
