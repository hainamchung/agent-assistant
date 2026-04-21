# 🎯 SKILLS

> **LOAD**: When skill resolution needed | **PURPOSE**: Hybrid Skill Orchestration Layer (HSOL)

---

## OVERVIEW

Skills = Domain knowledge modules in `{SKILLS_PATH}/`.

**Two sources**:
1. **Matrix Skills** — Pre-curated in `~/.{TOOL}/skills/agent-assistant/matrix-skills/*.yaml` (fast, trusted)
2. **Dynamic Skills** — Community skills via `find-skills` (on-demand)

**Canonical governance source**:
- Runtime thresholds, trust progression, and promotion gates are defined in `~/.{TOOL}/skills/agent-assistant/matrix-skills/_index.yaml` (`hsol` block).
- If this file conflicts with `_index.yaml`, `_index.yaml` is the source of truth.
- Dynamic skill entry governance metadata is declared in `~/.{TOOL}/skills/agent-assistant/matrix-skills/_dynamic.yaml`.

---

## RESOLUTION ALGORITHM

```
1. PARSE agent profile from frontmatter
2. LOAD inherited domains from ~/.{TOOL}/skills/agent-assistant/matrix-skills/_index.yaml
3. FILTER skills by relevance_mapping
4. APPLY priority thresholds (critical≥9, core≥7, minimum≥5)
5. CALCULATE fitness scores
6. RETURN sorted skill set
```

### Fitness Calculation

```
fitness = 0.35 × SEMANTIC_MATCH
        + 0.25 × SPECIFICITY
        + 0.20 × TRUST_LEVEL
        + 0.10 × FRESHNESS_SCORE
        + 0.10 × SUCCESS_RATE

Matrix skills: trust = 1.0 (always trusted)
Dynamic skills: trust = 0.3 - 1.0 (based on history)
```

---

## SKILL DECISION FLOW

### By Complexity

| Assessment | Action |
|------------|--------|
| `Simple` | Base knowledge sufficient — skip resolution |
| `Complex` | **⛔ MUST run resolution algorithm** — base knowledge alone is NEVER sufficient |

**⛔ FORBIDDEN**: Outputting `Complex → Using base knowledge (...)`. If a task is complex, you MUST resolve skills.

### By Variant

| Variant | Discovery |
|---------|----------|
| `fast` | **Skip** — use matrix only |
| `hard`, `team` | Check matrix fitness, may trigger discovery |

### By Matrix Fitness

| Fitness | Action |
|---------|--------|
| ≥ 0.8 | Execute with matrix (skip discovery) |
| 0.75-0.8 | **Async**: Execute with matrix, surface recommendation later |
| < 0.75 | **Blocking**: Wait for discovery → install → execute with new skill |

### Complex Task Resolution (MANDATORY)

```
WHEN task_complexity == Complex:
  1. PARSE task keywords and domain
  2. SCAN ~/.{TOOL}/skills/agent-assistant/matrix-skills/*.yaml for matching skills
  3. READ matched SKILL.md files
  4. CALCULATE fitness scores
  5. IF fitness ≥ 0.8 → Use matched skills
  6. IF fitness 0.75-0.8 → Use matched + flag for discovery
  7. IF fitness < 0.75 → BLOCKING discovery (npx skills find)
  8. IF no skills exist after discovery → Report gap explicitly
  
  ⛔ NEVER skip steps 1-4 and default to "base knowledge"
  ⛔ NEVER invent skill names — use ACTUAL skills from matrix
  ✅ ALWAYS reference real skill IDs from ~/.{TOOL}/skills/agent-assistant/matrix-skills/
```

---

## TRUST PROGRESSION LIFECYCLE

```
NEW (0.3)        ──▶  EVALUATING (0.5)  ──▶  VALIDATED (0.7)  ──▶  PROMOTED (1.0)
    │                    │                     │                     │
    └─ 3 successful      └─ 10 successful      └─ Auto-promote       └─ Added to
       executions           executions           to matrix              matrix-skills
```

**Promotion criteria**:
- execution_count ≥ 10
- success_rate ≥ 0.85
- last_used_within_days ≤ 30

## DYNAMIC MANIFEST GOVERNANCE BASELINE

Dynamic skill entries must preserve these governance fields:
- `owner`
- `checksum`
- `support_state`
- `promotion_state`
- `freshness.last_verified`
- `freshness.stale_after_days`
- `installed_at`
- `last_execution`

Allowed support states:
- `supported`
- `experimental`
- `blocked`

Allowed promotion states:
- `new`
- `evaluating`
- `validated`
- `promoted`
- `blocked`

---

## DYNAMIC DISCOVERY (find-skills)

### Trigger

```bash
npx skills find "{keywords}"
```

### Install (always use -g -y for current tool)

```bash
npx skills add {owner/repo@skill} -g -y
```

### When to confirm

- **Confirm required**: Low trust (new skill) + needed for current task (fitness < 0.75)
- **No confirm**: Trusted skill OR optional enhancement

---

## AGENT SKILLS SECTION FORMAT

Agents don't list individual skills. They reference HSOL:

```markdown
## ⚡ Skills

> **MATRIX DISCOVERY**: Auto-injected from `~/.{TOOL}/skills/agent-assistant/matrix-skills/`
> Profile: `{domain}:{category}` | Domains: `{inherit_from}`
```

---

## ADDING NEW SKILLS

```
1. Create: {SKILLS_PATH}/{skill-id}/SKILL.md
2. Add to: ~/.{TOOL}/skills/agent-assistant/matrix-skills/{domain}.yaml
3. Do NOT edit agent files (skills resolved by profile)
```

---

## PRIORITY GUIDE

| Score | Category | Usage |
|-------|----------|-------|
| 10 | Critical | Always required |
| 9 | Core | Standard for domain |
| 8 | Expert | Specialized but common |
| 7 | Core | Useful in most contexts |
| 5-6 | Utility | Context-dependent |
| 1-4 | Rare | Edge cases |

---

## EDGE CASES

| Scenario | Action |
|----------|--------|
| Network timeout | Proceed with matrix only, log timeout |
| find-skills unavailable | Use matrix + installed dynamics only |
| No skills found | Report gap, use general capabilities |
| Installation fails | Rollback, report, offer matrix alternative |
| Low trust + task-critical | **Confirm with user before install** |

```
IF no_relevant_skills:
  1. Acknowledge: "No specialized skill found for {topic}"
  2. Offer: "I can proceed with general capabilities"
  3. Suggest: "You could create your own: npx skills init {name}"
```

---

## ANTI-BYPASS DETECTION

```yaml
detection:
  - Outputting "Complex → Using base knowledge" (IMMEDIATE VIOLATION)
  - Classifying task as Complex but not scanning matrix-skills/
  - Inventing or fabricating skill names not in ~/.{TOOL}/skills/agent-assistant/matrix-skills/*.yaml
  - Skipping resolution algorithm for non-fast variants

correction:
  1. STOP
  2. Log: "⚠️ SKILLS BYPASS DETECTED — Complex task requires skill resolution"
  3. RUN resolution algorithm (steps 1-8 from Complex Task Resolution)
  4. Output corrected Skills Analysis with REAL skill references

strict_rules:
  ❌ NEVER output "Complex → Using base knowledge"
  ❌ NEVER skip matrix scan for complex tasks
  ❌ NEVER fabricate skill names — use only what exists in ~/.{TOOL}/skills/agent-assistant/matrix-skills/
  ✅ ALWAYS scan ~/.{TOOL}/skills/agent-assistant/matrix-skills/ when task is complex
  ✅ ALWAYS read relevant SKILL.md files before delegation
  ✅ IF no matching skills found → report gap explicitly, offer discovery
```

---

## C8 Foundation Enforcement Checkpoints

- `C8-SKILLS-01` (BLOCK): Use HSOL values from `~/.{TOOL}/skills/agent-assistant/matrix-skills/_index.yaml`; do not invent local threshold variants.
- `C8-SKILLS-02` (BLOCK): For low-trust task-critical discovery (`fitness < 0.75`), user confirmation is mandatory before install.
- `C8-SKILLS-03` (BLOCK): Promotion to matrix requires all declared promotion gates (executions, success rate, inactivity window).
- `C8-SKILLS-04` (BLOCK): Dynamic manifest entries must preserve owner/freshness/integrity/support-state metadata from `~/.{TOOL}/skills/agent-assistant/matrix-skills/_dynamic.yaml`.
- `C8-SKILLS-05` (BLOCK): Complex tasks MUST resolve skills via HSOL algorithm. "Complex → Using base knowledge" is a protocol violation.

---

## QUICK REFERENCE

### Browse skills
```
https://skills.sh/
```

### Commands
```bash
npx skills find "query"           # Search
npx skills add X -g -y            # Install global, no confirm
npx skills check                  # Check updates
npx skills update                 # Update all
```
