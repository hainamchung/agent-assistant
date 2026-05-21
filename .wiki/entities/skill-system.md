---
title: Skill System
type: entity
tags: [skills, hsol, knowledge, injection, matrix, dynamic]
created: 2026-05-20
updated: 2026-05-20
---

# Skill System

The Skill System provides domain knowledge injection through HSOL (Hybrid Skill Orchestration Layer). Rather than loading all 1400+ skills into context (which would overflow any context window), HSOL selects the most relevant subset based on the current task. This enables deep domain knowledge without sacrificing practical context limits.

---

## Definition

HSOL is the context-aware skill injection engine that bridges the gap between the full skill library (1400+) and the practical context window limit. It selects skills based on task relevance while respecting context window constraints.

| Property | Value |
|----------|-------|
| **Total Skills** | 1400+ |
| **Skill Tiers** | 4 (foundation, professional, specialized, expert) |
| **Selection Algorithm** | Context Analysis → Domain Matching → Priority Calculation → Context Window Fit → Injection |
| **Architecture** | Matrix-first with dynamic enhancement |
| **Discovery Mode** | Blocking (when matrix insufficient) or Async (when matrix adequate) |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1-22`, `documents/HSOL-ASSESSMENT.md`

---

## The Scalability Paradox

The Skill System solves the **Scalability Paradox** — the tension between maintaining a stable, low-latency skill library and the need for dynamic, on-demand skill discovery.

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE PARADOX CYCLE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [More Skills Needed] ─────────────────────────────────────┐   │
│          │                                                   │   │
│          ▼                                                   │   │
│   [Manual Addition to Matrix]                                │   │
│          │                                                   │   │
│          ▼                                                   │   │
│   [Increased Maintenance Debt] ──────────────────┐          │   │
│          │                                        │          │   │
│          ▼                                        ▼          │   │
│   [Skills Become Stale] ◄──────────── [Update Fatigue]      │   │
│          │                                                   │   │
│          ▼                                                   │   │
│   [Capability Gaps Appear] ──────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

ROOT CAUSE: No automated feedback loop between:
  1. Skill usage patterns
  2. Skill quality metrics
  3. Skill currency status
  4. Dynamic discovery results
```

**Solution**: HSOL introduces intelligent decision logic for dynamic skill acquisition while preserving the reliability of matrix-skills as the primary execution tier.

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:137-166`

---

## HSOL Architecture

HSOL operates through 5 architectural layers that progressively resolve skills for each request.

### Layer 1: Semantic Intent Classifier

Analyzes the incoming request to extract capability requirements:

- Extract capability requirements from natural language
- Map to skill domains and categories
- Generate skill search vector
- Estimate complexity and specificity

### Layer 2A: Matrix Lookup (Synchronous, <10ms)

The primary skill resolution path using pre-curated matrix skills:

- Profile-based matching against agent profile
- Priority scoring within tier structure
- O(D×S) resolution complexity
- Immediate return for low latency

### Layer 2B: Dynamic Discovery (Asynchronous, 100-500ms)

Background skill discovery via the `find-skills` skill:

- Query `npx skills find` with extracted keywords
- Search community skill ecosystem at https://skills.sh/
- Speculative prefetch for predicted needs
- Runs only for `hard` or `team` variants

### Layer 3: Skill Fitness Evaluator

Multi-factor scoring to determine the best skill for the request:

```
SKILL_FITNESS = (
    w₁ × SEMANTIC_MATCH +
    w₂ × SPECIFICITY_SCORE +
    w₃ × TRUST_LEVEL +
    w₄ × FRESHNESS_SCORE +
    w₅ × SUCCESS_RATE
) / Σwᵢ

where:
  w₁ = 0.35 (semantic match is primary)
  w₂ = 0.25 (specificity matters for specialized requests)
  w₃ = 0.20 (trust prevents quality issues)
  w₄ = 0.10 (freshness for evolving domains)
  w₅ = 0.10 (historical success rate)
```

### Layer 4: Orchestration Decision Engine

Decides whether to use matrix or dynamic skills based on fitness scores:

| Matrix Score | Dynamic Score | Action |
|-------------|---------------|--------|
| HIGH (≥0.8) | Any | Execute matrix skill |
| MEDIUM (0.75-0.8) | HIGH (≥0.9) | Execute matrix, suggest dynamic |
| MEDIUM | MEDIUM | Execute matrix skill |
| LOW (<0.75) | HIGH (≥0.8) | Prompt for dynamic installation |
| LOW | LOW | Report capability gap |
| NONE | HIGH | Install and execute dynamic |
| NONE | NONE | Fallback to general capabilities |

### Layer 5: Execution & Feedback

The final layer handles skill execution and continuous improvement:

- Execute selected skill
- Capture execution metrics (success, latency, output quality)
- Feed metrics to autonomous evolution system
- Update skill usage statistics

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:187-251`, `documents/HSOL-ASSESSMENT.md:9-17`

---

## Skill Resolution Algorithm

The 10-step skill resolution algorithm:

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

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1-22`, `documents/HSOL-ASSESSMENT.md`

---

## Blocking vs Async Discovery

Dynamic discovery has two behavioral modes based on matrix fitness:

### Blocking Mode (Fitness < 0.75)

When matrix skills cannot adequately serve the request:

- Wait for discovery to complete
- Install new skill if found
- Re-inject skill context
- Execute with newly acquired skill

**Purpose**: The current task uses the new skill for best completion.

### Async Mode (Fitness 0.75-0.8)

When matrix skills are adequate but not optimal:

- Do not wait for discovery
- Execute with matrix skills immediately
- Surface recommendation for future use
- Does not improve accuracy for current task

**Purpose**: Fast response while offering enhancement for next time.

### Variant Impact

| Variant | Discovery Behavior |
|---------|-------------------|
| `fast` | No discovery (keeps fast path low-latency) |
| `hard` | Discovery when matrix fitness < 0.8 |
| `team` | Discovery when matrix fitness < 0.8 |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:262-267`, `documents/HSOL-ASSESSMENT.md:29-34`

---

## Skill Tiers

Skills are organized into 4 tiers based on specificity and expertise level:

| Tier | Count | Description | When Loaded |
|------|-------|-------------|-------------|
| foundation | ~200 | Universal skills applicable to all tasks | Always (loaded first) |
| professional | ~400 | Domain-general skills (web dev, data processing) | When domain matches |
| specialized | ~500 | Technology-specific skills (React, Docker, PostgreSQL) | When explicitly matched |
| expert | ~300 | Advanced/niche skills (compiler design, security auditing) | Only when requested |

### Foundation Tier Details

Foundation skills are universal — applicable to virtually any development task:

**Characteristics**:
- High utility across all domains
- Low specificity (broad applicability)
- Always loaded first
- Always included in context

**Example Skills**:
- debugging — Systematic root cause analysis
- code-review — Best practice verification
- git — Version control, branching, merging
- testing — Test strategy and execution
- problem-solving — Systematic decomposition
- documentation — Technical writing

### Professional Tier Details

Professional skills are domain-general skills for broad categories of work:

**Characteristics**:
- Domain-specific but not technology-specific
- Loaded when task domain matches
- Priority after foundation skills
- Moderate specificity

**Example Domains**:
- Backend: api-design, database-modeling, server-optimization
- Frontend: component-design, state-management, accessibility
- DevOps: ci-cd-pipeline, container-orchestration, monitoring
- Data: etl-pipelines, analytics, reporting
- Security: threat-modeling, secure-coding

### Specialized Tier Details

Specialized skills are technology-specific for particular tools and frameworks:

**Characteristics**:
- Technology-specific
- Loaded only with explicit technology match
- Higher priority when match is found
- Low breadth, high depth

**Example Technologies**:
- React: react-hooks, react-context, nextjs
- Node.js: express, fastify, npm-package-publishing
- Docker: docker-compose, docker-networking
- PostgreSQL: postgresql-indexing, postgresql-tuning
- AWS: ec2, lambda, s3, cloudformation

### Expert Tier Details

Expert skills are advanced, niche, or highly specialized:

**Characteristics**:
- Advanced or niche expertise required
- Loaded only when explicitly requested
- Highest value when relevant
- Lowest frequency of use

**Example Domains**:
- Security: penetration-testing, cryptography, secure-architecture
- Performance: compiler-optimization, profiling-advanced
- ML/AI: ml-deployment, model-optimization, vector-databases
- Systems: operating-system-kernel, distributed-systems, cqrs

**Source**: `documents/knowledge-architecture/04-design-patterns.md:187-195`, `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:10-22`

---

## Tier Selection Priority

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

## Context Window Limits

The context window limit determines how many skills can be injected:

| Context Size | Token Budget | Foundation | Max Additional | Total Max |
|-------------|-------------|------------|---------------|-----------|
| Small (<32K) | ~30K tokens | ~5 | ~5–10 | 10–15 |
| Medium (32K–64K) | ~48K tokens | ~5 | ~15–25 | 20–30 |
| Large (>64K) | ~100K tokens | ~5 | ~45+ | 50+ |

The system allocates ~5 foundation skills minimum, then fills remaining budget with higher-tier skills ranked by relevance.

The skill injection is iterative — the system calculates which skills fit, injects them, then recalculates if more context is available.

---

## Skill Organization

Skills are organized in two directories for different access patterns:

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

## Dynamic Discovery Integration

### find-skills Skill

The `find-skills` skill provides the dynamic discovery interface:

**Location**: `{SKILLS_PATH}/find-skills/SKILL.md`

**Commands**:
- `npx skills find [query]` — Search for skills
- `npx skills add <pkg> -g -y` — Install globally
- `npx skills check` — Check for updates
- `npx skills update` — Update all skills

**Browse**: https://skills.sh/

### Discovery Eligibility

Dynamic discovery runs only when:
1. Command variant is `hard` or `team` (not `fast`)
2. Best matrix fitness < 0.8

### Discovery Flow

```
USER REQUEST: "Implement OAuth with Clerk"
        │
        ▼
┌───────────────────────────────────────────────────────────────┐
│ SEMANTIC INTENT CLASSIFIER                                     │
│                                                                │
│ Extracted:                                                     │
│   • Domain: authentication                                     │
│   • Specificity: HIGH (Clerk is specific provider)            │
│   • Capability: OAuth implementation                          │
│   • Keywords: ["clerk", "oauth", "authentication"]            │
└───────────────────────────────────────────────────────────────┘
        │
        ├──────────────────────────────────────┐
        │                                      │
        ▼ (SYNC, <10ms)                       ▼ (ASYNC)
┌─────────────────────────┐         ┌─────────────────────────┐
│ MATRIX LOOKUP           │         │ DYNAMIC DISCOVERY       │
│                         │         │                         │
│ Candidates:             │         │ Query: "clerk oauth     │
│ • better-auth (0.75)    │         │         authentication" │
│ • api-security (0.60)   │         │                         │
│ • backend-dev (0.55)    │         │ [Searching...]          │
│                         │         │                         │
│ Best Match:             │         │                         │
│ better-auth @ 0.75      │         │                         │
└─────────────────────────┘         └─────────────────────────┘
        │                                      │
        │                                      │ (200-500ms later)
        │                                      ▼
        │                           ┌─────────────────────────┐
        │                           │ DISCOVERY RESULT        │
        │                           │                         │
        │                           │ Found: clerk-auth-skill │
        │                           │ Score: 0.95            │
        │                           │ Source: vercel-labs     │
        │                           └─────────────────────────┘
        │                                      │
        ▼                                      ▼
┌───────────────────────────────────────────────────────────────┐
│ ORCHESTRATION DECISION                                         │
│                                                                │
│ DECISION: Matrix skill is ADEQUATE (0.75)                    │
│           Dynamic skill is SUPERIOR (0.95)                    │
│                                                                │
│ ACTION: Execute better-auth now                                │
│         Surface clerk-auth recommendation for next time       │
└───────────────────────────────────────────────────────────────┘
```

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:271-336`

---

## Skill Fitness Scoring

### Factor Definitions

| Factor | Matrix Skill Calculation | Dynamic Skill Calculation |
|--------|--------------------------|---------------------------|
| SEMANTIC_MATCH | Keyword overlap + domain alignment | Search relevance score |
| SPECIFICITY_SCORE | Generic (0.5) to Specialized (1.0) | Query specificity alignment |
| TRUST_LEVEL | 1.0 (pre-vetted) | 0.3 (new) → 1.0 (proven) |
| FRESHNESS_SCORE | Last update recency | Always 1.0 (community-current) |
| SUCCESS_RATE | Historical execution success | Community rating / reviews |

### Gap Detection

HSOL detects when matrix cannot adequately serve a request:

```python
def detect_capability_gap(request, matrix_skills):
    best_match = find_best_matrix_skill(request)
    
    # Gap conditions:
    # 1. No skill found at all
    if best_match is None:
        return GapType.COMPLETE_GAP
    
    # 2. Best match is too generic
    if best_match.specificity < 0.4 and request.specificity > 0.7:
        return GapType.SPECIFICITY_GAP
    
    # 3. Best match is stale for evolving domain
    if best_match.last_updated < (now - 180_days) and request.domain in FAST_EVOLVING_DOMAINS:
        return GapType.FRESHNESS_GAP
    
    # 4. Best match has low success rate
    if best_match.success_rate < 0.6:
        return GapType.QUALITY_GAP
    
    return GapType.NO_GAP
```

### Superiority Detection

HSOL determines if a dynamic skill meaningfully outperforms a matrix skill:

```python
def detect_superior_dynamic_skill(matrix_skill, dynamic_skill, request):
    SUPERIORITY_THRESHOLD = 0.15  # 15% improvement required
    
    matrix_fitness = calculate_fitness(matrix_skill, request)
    dynamic_fitness = calculate_fitness(dynamic_skill, request)
    
    fitness_delta = dynamic_fitness - matrix_fitness
    
    # Superior if:
    # 1. Significantly higher fitness
    if fitness_delta >= SUPERIORITY_THRESHOLD:
        return SuperiorityResult(
            is_superior=True,
            reason="HIGHER_FITNESS",
            recommendation="Consider installing for better results"
        )
    
    # 2. Domain-specific when matrix is generic
    if dynamic_skill.specificity > 0.8 and matrix_skill.specificity < 0.5:
        return SuperiorityResult(
            is_superior=True,
            reason="DOMAIN_SPECIFIC",
            recommendation="Specialized skill available"
        )
    
    return SuperiorityResult(is_superior=False)
```

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:366-458`

---

## Trust Model

### Trust Progression

Dynamic skills progress through trust levels:

| State | Trust Level | Restrictions |
|-------|-------------|--------------|
| **New Skill** | 0.3 | Cannot suggest network ops, limited file access, user confirm for actions |
| **Validated** | 0.7 | 10 successful executions | Standard capabilities after 10 successful executions, still logged |
| **Promoted** | 1.0 | Full capabilities (same as native matrix skills) |

### Promotion Criteria

Dynamic skills are auto-promoted to matrix when:

```python
PROMOTION_CRITERIA = {
    'min_executions': 10,
    'min_success_rate': 0.85,
    'min_satisfaction': 0.8,  # User ratings
    'max_age_days': 90,       # Must be actively used recently
}
```

### Conflict Resolution

| Conflict Type | Resolution Strategy |
|--------------|---------------------|
| ID Collision | Dynamic skill prefixed with `ext-` |
| Domain Overlap | Matrix takes precedence unless dynamic is superior |
| Capability Duplication | Fitness scoring determines winner |
| Version Incompatibility | Block installation, notify user |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:741-751`, `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:983-1030`

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

## Edge Cases & Handling

### Network Failure

| Scenario | Impact | Resolution |
|----------|--------|------------|
| Discovery timeout (>5s) | Cannot retrieve candidates | Proceed with matrix, notify user |
| Installation failure | Corrupted state | Rollback, report error with retry |
| Intermittent connectivity | Network skill may fail | Pre-flight check, fallback to local |

### Installation Failure Recovery

| Failure Type | Cause | Recovery |
|--------------|-------|---------|
| DOWNLOAD_FAILURE | Network error, invalid URL | Retry with exponential backoff |
| VALIDATION_FAILURE | Invalid SKILL.md schema | Delete file, report error |
| CONFLICT_FAILURE | ID collision (unresolvable) | Prompt user to choose resolution |
| REGISTRATION_FAILURE | Index write failed | Cleanup files, report system error |

### find-skills Unavailable

If find-skills is not installed or `npx skills find` fails:
1. Proceed with matrix skills only
2. Surface message: "Dynamic skill discovery unavailable. Using built-in skills."
3. Queue background retry for later

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:863-941`, `documents/HSOL-ASSESSMENT.md:61-66`

---

## Cognitive Load Management

HSOL handles all skill logic transparently so agents are not overwhelmed:

```
orchestrator_perspective:
  before_HSOL:
    - "Which skill do I need?"
    - "Is there a better skill available?"
    - "Should I search for skills?"
    - "How do I install new skills?"
  
  after_HSOL:
    - "Execute task with injected skills"
    - "(Recommendations surface automatically)"
    - "(Capability gaps are reported)"
```

The agent sees only:
1. Injected skills (already resolved)
2. Optional enhancement recommendations (non-blocking)
3. Capability gap alerts (when no skill can satisfy request)

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:338-361`

---

## Installation Tiers

| Tier | Scope | Persistence | Use Case | Command |
|------|-------|-------------|----------|---------|
| **Session** | Current session | None (ephemeral) | Testing, one-off | `npx skills add <skill>` |
| **User Global** | All user sessions | User config | Personal skills | `npx skills add <skill> -g` |
| **Project** | Project team | Project repository | Project-specific | `npx skills add <skill> --project` |
| **Matrix Promoted** | All agents, all projects | Matrix skill system | Battle-tested | Auto-promotion |

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:636-687`

---

## F10 Specification (Production Requirements)

The Skill System must meet these production requirements:

### Scalability
- Support 500+ skills without proportional maintenance increase
- Target: Support 500+ skills with same effort as 100

### Reliability
- Skill resolution success rate > 99.9%
- Failed resolutions / total resolutions < 0.1%

### Autonomy
- Skills auto-promoted vs manually added > 50%
- Auto-promoted skills / total new skills (monthly)

### Latency
- Matrix resolution < 50ms (P95)
- Dynamic discovery < 500ms (P95)

### User Satisfaction
- Skill relevance ratings > 4.2/5.0 average
- Post-execution skill relevance survey

### Security
- Skills execute in agent context
- For production: prefer skills from trusted sources
- User confirmation required for low-trust, task-critical installs
- Low-trust + task-critical → ask user confirm before install

**Source**: `documents/HSOL-ASSESSMENT.md:9-19`, `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1091-1120`

---

## Quick Reference

### Decision Matrix

| Matrix Fitness | Dynamic Fitness | Action |
|---------------|----------------|--------|
| ≥ 0.8 | Any | Execute matrix |
| 0.75-0.8 | ≥ 0.9 | Execute matrix + suggest |
| 0.75-0.8 | < 0.9 | Execute matrix |
| < 0.75 | ≥ 0.8 | Prompt to install dynamic |
| < 0.75 | < 0.8 | Report capability gap |
| None | ≥ 0.7 | Install and execute dynamic |
| None | None | Use general capabilities |

### Discovery Triggers

| Condition | Result |
|-----------|--------|
| `fast` variant | No discovery |
| `hard`/`team` + fitness ≥ 0.8 | Skip discovery |
| `hard`/`team` + 0.75 ≤ fitness < 0.8 | Async (recommend for next time) |
| `hard`/`team` + fitness < 0.75 | Blocking (current task uses new skill) |

### Skill Fitness Formula

```
SKILL_FITNESS = (
    0.35 × SEMANTIC_MATCH +
    0.25 × SPECIFICITY_SCORE +
    0.20 × TRUST_LEVEL +
    0.10 × FRESHNESS_SCORE +
    0.10 × SUCCESS_RATE
)
```

**Source**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md:1274-1292`

---

## Related Pages

- [[Skill Tier Reference]] — Detailed breakdown of each tier and selection criteria
- [[Business Rules]] — Business rules governing skill selection and promotion
- [[Agent System]] — How agents use the skill system
