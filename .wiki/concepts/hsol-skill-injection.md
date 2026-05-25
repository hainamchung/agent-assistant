---
title: HSOL Skill Injection
type: concept
tags: [pattern, skills, hsol, knowledge, context]
created: 2026-05-20
updated: 2026-05-20
---

# HSOL Skill Injection

HSOL (Hybrid Skill Orchestration Layer) is the context-aware skill injection system that enables Agent Assistant to leverage 1400+ skills without overflowing the context window. Rather than loading all skills at once, HSOL selects the most relevant subset based on the current task, domain, and available context space. This solves the fundamental tension between having deep domain knowledge and maintaining practical context limits.

---

## Definition

A 5-step skill injection algorithm that selects relevant skills from a 1400+ skill library based on task context, domain matching, priority scoring, and context window fit. HSOL bridges the gap between the full skill library and practical context constraints.

- **Pattern Type**: Skill Pattern
- **Total Skills**: 1400+
- **Algorithm**: Context Analysis → Domain Matching → Priority Calculation → Context Window Fit → Injection
- **Engine Components**: Context Analyzer, Skill Matcher, Priority Ranker
- **Source**: `.documents/knowledge-architecture/04-design-patterns.md:141-216`

---

## Context and Motivation

The core problem HSOL solves is **context overflow vs. knowledge gap**:

- If you load all 1400+ skills into context, you exceed any practical context window
- If you load only a few skills, the system lacks domain knowledge for specialized tasks
- HSOL resolves this by dynamically selecting the right skills for each task

The HSOL algorithm ensures:
- **Foundation skills** (universal) are always available
- **Professional skills** are loaded when the domain matches
- **Specialized skills** are loaded only for explicit technology matches
- **Expert skills** are loaded only when specifically requested

---

## The 5-Step Algorithm

### Step 1: Context Analysis

HSOL analyzes the current task to extract meaningful signals:

**What is analyzed**:
- User command and parameters
- File paths being modified
- Language and framework identifiers
- Problem domain (frontend, backend, database, etc.)
- Task type (implementation, debugging, design, etc.)

**How it works**:
1. Parse the user command to extract intent
2. Scan modified files for language/framework markers
3. Identify the problem domain from command and context
4. Classify the task type from the command

**Example**: For `/cook:fast implement user authentication with JWT`:

- Intent: "implement"
- Technologies: "JWT", likely backend (auth)
- Domain: "security", "authentication"
- Task type: "implementation"

### Step 2: Domain Matching

HSOL matches task signals against the skill library:

**Matching strategy**:
- Foundation skills: always match (universal applicability)
- Professional skills: match against domain keywords
- Specialized skills: match against explicit technology names
- Expert skills: match only if "expert" or specific skill name is mentioned

**Skill library organization**:
```
matrix-skills/
├── foundation/    # ~200 universal skills
├── professional/  # ~400 domain-general skills
├── specialized/   # ~500 technology-specific skills
└── expert/        # ~300 advanced skills
```

### Step 3: Priority Calculation

Matched skills are scored by priority:

**Scoring factors**:
- **Relevance**: How directly the skill matches the task domain (highest weight)
- **Required vs Preferred**: Required skills score higher than preferred skills
- **Recency**: Skills used recently get a slight boost
- **Tier Order**: foundation > professional > specialized > expert (for ties)

**Priority formula** (simplified):
```
priority = (relevance × 0.5) + (required × 0.3) + (recency × 0.1) + (tier × 0.1)
```

### Step 4: Context Window Fit

The system calculates how many skills fit in the remaining context:

| Context Size | Token Budget | Max Skills |
|-------------|-------------|------------|
| Small (<32K) | ~30K tokens | 10–15 skills |
| Medium (32K–64K) | ~48K tokens | 20–30 skills |
| Large (>64K) | ~100K tokens | 50+ skills |

Skills are selected in priority order until the budget is exhausted.

### Step 5: Injection

Selected skills are injected into the agent's context:

**Injection format**:
- Skills are formatted as actionable guidance
- The agent receives skill references and relevant content
- The agent can request additional skills if needed

**Iterative refinement**:
- If the agent needs more context, it can request additional skills
- HSOL re-runs with updated context to inject more skills
- This ensures the most critical skills are injected first

---

## Engine Components

### Context Analyzer

Extracts meaningful signals from the task context:
- Parses user commands
- Identifies technologies and domains
- Classifies task type
- Outputs a structured context profile

### Skill Matcher

Matches the context profile against the skill library:
- Reads skill metadata (domain, technology, tier)
- Applies matching rules per tier
- Outputs a list of candidate skills

### Priority Ranker

Scores and ranks candidate skills:
- Applies the priority formula
- Respects context window constraints
- Outputs an ordered list of skills to inject

---

## Skill Selection Rules

Skill selection follows strict priority rules (from business rules BR-020–BR-023):

1. **foundation skills** — always loaded, always first
2. **professional skills** — loaded when task domain matches
3. **specialized skills** — loaded only with explicit technology match
4. **expert skills** — loaded only when explicitly requested

This tiered approach prevents context overflow while ensuring the most relevant skills are always available.

---

## Related Pages

- [[Skill System]] — HSOL and the full skill library
- [[Skill Tier Reference]] — Detailed tier breakdown and selection criteria
- [[Business Rules]] — BR-020 through BR-023 governing skill resolution
