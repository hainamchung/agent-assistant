# Feature Specifications

> **Section**: Business Features | **File**: 03-feature-specifications.md
> **Purpose**: Detailed specifications for Must and Should priority features

---

## Core Orchestration Specifications

### F1: Command Routing System

**Type**: Must Have
**File**: `rules/CORE.md`

#### Specification

```yaml
Command Routing:
  input_types:
    - explicit: "/command" or "/command:variant"
    - natural_language: "implement build create" → /cook
    - natural_language: "fix bug error" → /fix
    - natural_language: "plan strategy" → /plan
  
  routing_rules:
    - Exact match takes precedence
    - Variant syntax: "/cmd:variant" or "/cmd/variant" equivalent
    - Unknown commands return error with suggestion
  
  supported_commands:
    - /cook, /cook:fast, /cook:hard, /cook:team
    - /fix, /code, /plan, /debug, /test, /review
    - /docs, /docs:core, /docs:business, /docs:audit
    - /design, /brainstorm, /ask
    - /report, /report:fast, /report:hard, /report:team
    - /deploy, /deploy:check, /deploy:preview, /deploy:production
    - /wiki, /wiki:fast, /wiki:hard, /wiki:team
```

#### Acceptance Checks

- [ ] Explicit command syntax parses correctly
- [ ] Variant suffix routes to correct workflow file
- [ ] Natural language detection maps to equivalent command
- [ ] Invalid command returns helpful error message

#### Edge Cases

| Input | Expected Behavior |
|-------|------------------|
| `/cook:invalid` | Error with valid variants listed |
| `implement OAuth` | Routes to `/cook` |
| Empty input | Prompts for clarification |

#### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `natural_language_detection` | `true` | Enable NL routing |
| `variant_syntax` | `:` | Variant separator (`: ` or `/`) |

---

### F2: Tiered Execution Engine

**Type**: Must Have
**File**: `rules/CORE.md`, `rules/AGENTS.md`

#### Specification

```yaml
Tiered Execution:
  tier_1:
    name: "Sub-agent"
    trigger: "runSubagent tool available"
    context: "Isolated (fresh)"
    priority: "PRIMARY"
    parallel: true
  
  tier_2:
    name: "Embody"
    trigger: "runSubagent unavailable or failed"
    context: "Shared with parent"
    priority: "FALLBACK"
    parallel: false
  
  decision_logic:
    - Attempt TIER 1 first (always)
    - Log attempt before falling back
    - On TIER 1 error, retry once, then TIER 2
```

#### Acceptance Checks

- [ ] TIER 1 attempted before TIER 2 for all delegations
- [ ] TIER 2 fallback only when TIER 1 unavailable or fails
- [ ] Execution tier logged in output
- [ ] Anti-lazy fallback detection prevents improper TIER 2 use

#### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| runSubagent available | TIER 1 used (not TIER 2) |
| runSubagent returns error | Retry once, then TIER 2 fallback |
| Tool discovery unavailable | TIER 2 fallback |
| Task "too simple" claimed | TIER 1 still required |

#### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `fallback_retry_count` | `1` | TIER 1 retries before fallback |
| `log_execution_tier` | `true` | Include tier in output |

---

### F3: Phase Execution Protocol

**Type**: Must Have
**File**: `rules/PHASES.md`

#### Specification

```yaml
Phase Execution:
  rules:
    - Execute one phase at a time (no batching)
    - Complete Phase N before Phase N+1
    - Verify exit criteria before phase completion
    - Prior deliverables locked as immutable constraints
  
  output_format:
    phase_header: "## 🎭 Phase {N}: {name}"
    subagent_line: "Sub-agent: `{agent}` — {role}"
    embody_line: "Embodying: `{agent}` — {role}"
    exit_criteria: "- [x] {criterion}"
    completion: "### ✅ `{agent}` complete"
  
  deliverable_size:
    - ≤150 lines: Single file
    - >150 lines OR ≥4 sections: Chunked folder
    - Always create index first, then sections
```

#### Acceptance Checks

- [ ] Phase N completes before Phase N+1 starts
- [ ] Exit criteria verified before phase completion
- [ ] Prior deliverables treated as immutable
- [ ] Deliverable size management enforced

#### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Prior deliverable missing | Halt, create, then resume |
| Deliverable >150 lines | Split into chunked folder |
| Exit criteria not met | Phase does not complete |

#### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `single_file_threshold` | `150` | Lines before chunking |
| `chunked_section_threshold` | `4` | Sections before chunking |

---

### F4: Orchestration Laws

**Type**: Must Have
**File**: `rules/CORE.md`

#### Specification

```yaml
Orchestration Laws (L1-L10):
  L1: Single Point of Truth
    - Entry file loads CORE
    - Rest loaded on-demand
  
  L2: Requirement Integrity
    - 100% fidelity extraction
    - Zero loss, parse EVERY requirement
  
  L3: Explicit Loading
    - State what you loaded before using
  
  L4: Deep Embodiment
    - Follow agent's Directive + Protocol + Constraints
  
  L5: Sequential Execution
    - Phase N completes before N+1
  
  L6: Language Compliance
    - Respond in user's language
    - Files/code in English
  
  L7: Recursive Delegation
    - Meta agents coordinate, NEVER implement
  
  L8: Stateful Handoff
    - Prior deliverables = IMMUTABLE constraints
  
  L9: Constraint Propagation
    - scouter→planner→implementer chain locked
  
  L10: Deliverable Integrity
    - Files created by agent define standard
```

#### Acceptance Checks

- [ ] All 10 laws implemented
- [ ] Law violations detected and prevented
- [ ] Self-check prompts remind of laws

#### Edge Cases

| Law Violation | Detection |
|---------------|-----------|
| L2: Missing requirement | Requirement registry check |
| L5: Phase N+1 before N | Phase sequencing enforcement |
| L7: Meta implementing | Agent category check |

---

## Agent Management Specifications

### F6: Agent Profiles

**Type**: Must Have
**File**: `rules/AGENTS.md`, `web/src/data/agents.ts`

#### Specification

```yaml
Agent Categories:
  meta:
    - tech-lead, planner, wiki-architect
    - Purpose: Coordinate, plan — never implement
  
  execution:
    - backend-engineer, frontend-engineer, mobile-engineer, game-engineer
    - Purpose: Implementation
  
  validation:
    - tester, reviewer, security-engineer, performance-engineer, debugger, wiki-reviewer
    - Purpose: QA
  
  research:
    - researcher, scouter, brainstormer, designer, wiki-extractor
    - Purpose: Investigation
  
  support:
    - docs-manager, devops-engineer, business-analyst, project-manager, reporter
    - Purpose: Support

Task Mapping:
  backend logic → backend-engineer
  UI components → frontend-engineer
  database schema → database-architect
  security → security-engineer
  testing → tester
  code review → reviewer
  debugging → debugger
  planning → planner
```

#### Acceptance Checks

- [ ] All 21 agents defined with categories
- [ ] Task → Agent mapping produces correct agent
- [ ] Category purposes enforced

#### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Unmapped task | Orchestrator asks for clarification |
| Multiple valid agents | Select primary; delegate others as needed |

---

### F7: Golden Triangle Teams

**Type**: Should Have
**File**: `rules/TEAMS.md`

#### Specification

```yaml
Golden Triangle:
  roles:
    tech-lead:
      function: Decompose, coordinate, arbitrate
      authority: FINAL on all decisions
    
    executor:
      function: Build, implement, defend
      authority: Owns implementation decisions
    
    reviewer:
      function: Challenge, validate, quality gate
      authority: Can FAIL submissions
  
  team_count: 18
  debate_rounds: 3 (max)
  
  consensus_requirements:
    - Clean pass: Reviewer approved
    - Resolved pass: Issues fixed/defended
    - Arbitrated pass: Tech Lead decision after max rounds
  
  consensus_stamp: "✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓"
```

#### Acceptance Checks

- [ ] Exactly 3 agents per team phase
- [ ] Debate capped at 3 rounds
- [ ] Consensus stamp present before output release
- [ ] All 18 team configurations available

#### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| No agreement at round 3 | Tech Lead arbitrates |
| Reviewer rubber-stamps | Tech Lead rejects, re-invokes |
| Mailbox file error | Inline communication, log degraded mode |

#### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `max_debate_rounds` | `3` | Rounds before arbitration |
| `require_consensus_stamp` | `true` | Block output without stamp |

---

## Skill Discovery Specifications

### F10: HSOL Matrix Resolution

**Type**: Should Have
**File**: `rules/SKILLS.md`

#### Specification

```yaml
HSOL Resolution:
  matrix_location: "~/.{TOOL}/skills/agent-assistant/matrix-skills/"
  
  resolution_steps:
    1. Parse agent profile from frontmatter
    2. Load inherited domains from _index.yaml
    3. Filter skills by relevance_mapping
    4. Apply priority thresholds (critical≥9, core≥7)
    5. Calculate fitness scores
    6. Return sorted skill set
  
  fitness_calculation:
    formula: |
      fitness = 0.35 × SEMANTIC_MATCH
             + 0.25 × SPECIFICITY
             + 0.20 × TRUST_LEVEL
             + 0.10 × FRESHNESS_SCORE
             + 0.10 × SUCCESS_RATE
  
  fitness_thresholds:
    - ≥0.8: Execute with matrix (skip discovery)
    - 0.75-0.8: Execute + flag for discovery
    - <0.75: BLOCKING discovery
```

#### Acceptance Checks

- [ ] Skills resolved by agent profile
- [ ] Fitness calculated correctly
- [ ] Discovery triggered at correct threshold
- [ ] 1400+ skills available in matrix

#### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| No matching skills | Report gap explicitly |
| All skills low fitness | Discovery triggered |
| Network timeout | Proceed with matrix only |

---

## Evidence Sources

- `rules/CORE.md` — F1, F2, F4 specifications
- `rules/AGENTS.md` — F6 specifications
- `rules/TEAMS.md` — F7 specifications
- `rules/PHASES.md` — F3 specifications
- `rules/SKILLS.md` — F10 specifications
- `web/src/data/agents.ts` — F6 agent definitions
