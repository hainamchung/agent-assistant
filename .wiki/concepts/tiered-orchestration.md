---
title: Tiered Orchestration
type: concept
tags: [architecture, pattern, orchestration, layers]
created: 2026-05-20
updated: 2026-05-20
---

# Tiered Orchestration

Tiered Orchestration is the foundational architecture pattern of Agent Assistant. It decomposes every user request through 5 distinct layers, each with a specific responsibility. This layered approach ensures separation of concerns, enables independent testing, and scales complexity gracefully — simple tasks travel only as deep as needed, while complex tasks engage the full 5-layer pipeline.

---

## Definition

A layered command processing architecture with 5 distinct layers, where each layer is independently testable and can be swapped without affecting adjacent layers. The system routes requests through only the layers needed for the task's complexity level.

- **Layers**: 5 (Command, Rule, Agent, Team, Skill)
- **Pattern Type**: Architecture Pattern
- **Benefits**: Separation of concerns, scalability, maintainability, testability
- **Source**: `documents/knowledge-architecture/01-system-overview.md:1-249`, `documents/knowledge-architecture/04-design-patterns.md:19-66`

---

## Tiered Execution Model

The orchestrator follows a mandatory two-tier execution model for delegating work to agents.

### Tier 1: Sub-agent (Primary)

When the `runSubagent` tool exists, the orchestrator **MUST** delegate to a sub-agent with isolated context.

| Aspect | Value |
|--------|-------|
| Priority | **MANDATORY** — attempt first |
| Context | Fresh, isolated from parent |
| Quality | Optimal — no context pollution |
| Parallel Execution | Supported |

**Process**:
1. Prepare handoff with requirements, acceptance criteria, and constraints
2. Include skills analysis output
3. Invoke `runSubagent(agent_name, context)`
4. Verify output format matches criteria
5. On error: fallback to Tier 2 with logged reason

### Tier 2: Embodiment (Fallback Only)

When the sub-agent tool is missing or returns a system error, the orchestrator may embody the agent role using shared context.

| Aspect | Value |
|--------|-------|
| Priority | **FALLBACK** — only when Tier 1 unavailable |
| Context | Shared with parent orchestrator |
| Quality | ⚠️ Risk of context pollution |
| Parallel Execution | Not supported |

**When Forbidden**:
- Task seems "simple"
- "Save tokens"
- "Efficiency" arguments
- Skipping Tier 1 attempt

> **Source**: `rules/CORE.md:76-87`

---

## Execution Loop

Every command follows a strict 5-step execution loop. Phases execute sequentially — Phase N completes before Phase N+1 starts.

```
1. DETECT command (explicit or natural language)
2. LOAD workflow file
3. EXECUTE phases in order (one at a time, same reply)
4. VERIFY exit criteria per phase
5. DELIVER final result
```

**Critical Rules**:
- **No batching**: Execute Phase 1 → Phase 2 → ... in strict order
- **No pre-loading**: Load only what the current phase needs
- **Prior deliverables**: Lock as immutable constraints (L8)

> **Source**: `rules/CORE.md:91-101`

---

## Orchestration Laws

The system operates under 10 immutable laws that govern agent behavior and coordination.

| Law | Name | Rule | Enforcement |
|-----|------|------|-------------|
| **L1** | Single Point of Truth | Entry file loads CORE, rest on-demand | CORE.md always loads first |
| **L2** | Requirement Integrity | 100% fidelity, zero loss, parse EVERY requirement | Extract all requirements into Registry |
| **L3** | Explicit Loading | State what you loaded before using | Announce loaded files in output |
| **L4** | Deep Embodiment | Follow agent's Directive + Protocol + Constraints | Read and follow agent files verbatim |
| **L5** | Sequential Execution | Phase N completes before Phase N+1 starts | No batching, one phase at a time |
| **L6** | Language Compliance | Respond in user's lang; files/code in English | Language detection at start |
| **L7** | Recursive Delegation | Meta agents coordinate, NEVER implement | Meta agents delegate only |
| **L8** | Stateful Handoff | Prior deliverables = IMMUTABLE constraints | Lock prior decisions |
| **L9** | Constraint Propagation | scouter→planner→implementer chain locked | No modifying chain outputs |
| **L10** | Deliverable Integrity | Files created by agent define standard | Use file outputs as source of truth |

> **Source**: `rules/CORE.md:113-127`

---

## Ambiguity Handling

When requirements are unclear, the orchestrator must pause and seek clarification rather than guess.

```
IF requirement is ambiguous:
  1. PAUSE execution
  2. ASK user for clarification
  3. DOCUMENT decision
  4. THEN proceed
```

| ❌ Forbidden | ✅ Required |
|--------------|-------------|
| Assume intent | Ask for clarification |
| Guess meaning | Document decisions |
| Skip unclear items | Proceed only when clear |

> **Source**: `rules/CORE.md:130-140`

---

## Phase System

The Phase System defines how multi-phase workflows execute with proper sequencing and deliverable management.

### Requirements Intake

Before Phase 1, parse all requirements into a registry for tracking:

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | {H/M/L} | ⏳ |
| R2 | {extracted} | {H/M/L} | ⏳ |
```

**Rule**: 100% fidelity — extract EVERY requirement, no assumptions, no omissions.

### Phase Execution Rules

```
FOR Phase N:
  1. EMIT "## 🎭 Phase N: {name}"
  2. LOAD only what Phase N needs (agent file, prior deliverables)
  3. DELEGATE via TIERED EXECUTION
  4. EMIT exit criteria + completion
  5. Write deliverable file if required
  6. CONTINUE to Phase N+1 (do not stop)
```

**Forbidden**: Loading agents for Phase 2, 3, ... while in Phase 1.

### Prior Deliverables as Constraints

```
BEFORE Phase N:
  1. CHECK if prior deliverable exists
  2. IF exists:
     → READ completely
     → LOCK as IMMUTABLE constraint (L8)
     → DO NOT modify prior decisions
  3. IF missing but required:
     → HALT with notice
     → Create first via appropriate agent
     → Then resume
```

### Skills Analysis (Mandatory)

Every phase delegation requires explicit skills decision output:

```
🎯 Skills Analysis: Simple → Skipping (base knowledge sufficient)
🎯 Skills Analysis: Complex → Using `skill1`, `skill2`
```

> **Source**: `rules/PHASES.md:7-50`, `rules/PHASES.md:294-328`

---

## Layer Details

### Layer 1: Command Layer

**Input**: User text command (`/cook`, `/fix`, etc.)
**Output**: Routed command to Rule Layer

The Command Layer parses user intent, detects the variant (fast, hard, or team), and determines which execution path to follow. It also handles natural language mapping — phrases like "fix this bug" are mapped to the `/fix` command.

**Responsibilities**:
- Parse command syntax (`/command:variant parameter`)
- Validate command against the 14 known commands
- Detect and set variant (fast/hard/team)
- Map natural language to commands
- Route to Rule Layer

**Command Routing Table**:

| Input | File |
|-------|------|
| `/cook`, `/cook:hard` | `commands/cook.md` → `commands/cook/hard.md` |
| `/cook:fast` | `commands/cook/fast.md` (direct) |
| `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | Same pattern |
| `/wiki`, `/wiki:fast`, `/wiki:hard`, `/wiki:team` | `commands/wiki.md` → `commands/wiki/{variant}.md` |

**Natural Language Detection**:
- "implement/build/create" → `/cook` or `/code`
- "fix/bug/error/broken" → `/fix`
- "plan/strategy/approach" → `/plan`
- "question/how/what/why" → `/ask`
- "document/docs/readme/spec" → `/docs`
- "wiki/knowledge base/generate docs from code" → `/wiki`

> **Source**: [[Command System]], `rules/CORE.md:47-72`

### Layer 2: Rule Layer

**Input**: Routed command with context
**Output**: Orchestration protocol

The Rule Layer loads orchestration protocols that govern agent behavior. 8 rule files are loaded in a specific order: CORE → PHASES → AGENTS → SKILLS → TEAMS → ERRORS → REFERENCE → WIKI. This ensures consistent orchestration behavior regardless of the specific task.

**Responsibilities**:
- Load orchestration rules in correct order
- Establish protocols for the current execution
- Set error handling policies
- Define deliverable standards

**Load On Demand**:

| Situation | Load |
|-----------|------|
| Running phases | `PHASES.md` |
| Delegating to agent | `AGENTS.md` |
| Skill resolution | `SKILLS.md` |
| Wiki evaluation | `WIKI.md` |
| Error occurred | `ERRORS.md` |
| Quick lookup | `REFERENCE.md` |

> **Source**: [[Rule System]], `rules/CORE.md:191-203`

### Layer 3: Agent Layer

**Input**: Task from Rule Layer
**Output**: Task result with skill injection

The Agent Layer executes tasks through specialist agents. For fast variant tasks, a single agent handles the full task. For hard variant tasks, multiple agents collaborate. For team variant tasks, the Task Layer takes over.

**Agent Categories**:

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | tech-lead, planner, wiki-architect | Coordinate, plan — never implement |
| **execution** | backend-engineer, frontend-engineer, mobile-engineer, game-engineer, database-architect | Implementation |
| **validation** | tester, reviewer, security-engineer, performance-engineer, debugger, wiki-reviewer | QA |
| **research** | researcher, scouter, brainstormer, designer, wiki-extractor | Investigation |
| **support** | docs-manager, devops-engineer, business-analyst, project-manager, reporter | Support |

> **Source**: [[Agent System]], `rules/AGENTS.md:1-100`

### Layer 4: Team Layer

**Input**: Complex task from Agent Layer
**Output**: Coordinated multi-agent result

The Team Layer coordinates multi-agent collaboration via Golden Triangle teams. For fast and hard variants, the Agent Layer handles execution directly. For team variant tasks, the Team Layer orchestrates a full adversarial review cycle.

**Responsibilities**:
- Coordinate Tech Lead, Executor, and Reviewer
- Manage the debate loop (max 3 rounds)
- Synthesize approved deliverables
- Ensure consensus before proceeding

**Golden Triangle**: Each phase spawns exactly 3 agents — Tech Lead + Executor + Reviewer. The adversarial collaboration produces higher quality than parallel cooperation.

> **Source**: [[Team System]], `rules/AGENTS.md:101-180`

### Layer 5: Skill Layer

**Input**: Agent context and task
**Output**: Relevant skills injected

The Skill Layer uses HSOL to inject domain knowledge on demand. Rather than loading all 1400+ skills, it selects the most relevant subset based on the current task and context window constraints.

**Responsibilities**:
- Analyze task context
- Match skills to domain and technology
- Calculate priority scores
- Inject skills within context window limits

> **Source**: [[Skill System]], `rules/CORE.md:294-339`

---

## Scaling with Complexity

The 5 layers are not always all engaged. Simple tasks only travel as deep as needed:

| Task Complexity | Layers Engaged | Example |
|----------------|----------------|---------|
| Trivial | 1 (Command) | `/ask "what is Node.js"` |
| Simple | 1–2 | `/fix "typo in README"` |
| Standard | 2–3 | `/cook "add login button"` |
| Complex | 3–4 | `/plan "redesign the database"` |
| Critical | 5 (full) | `/cook:team "rebuild authentication"` |

The Rule Layer always loads to establish protocols, but subsequent layers engage based on task requirements.

---

## Independence and Testability

Each layer can be tested independently:

| Layer | Test Focus |
|-------|------------|
| Command Layer | Verify correct routing for all commands and variants |
| Rule Layer | Verify protocol loading and application |
| Agent Layer | Verify agent selection and skill injection |
| Team Layer | Verify coordination and consensus |
| Skill Layer | Verify skill selection algorithm |

This independence means changes to one layer do not require changes to others, reducing the risk of regressions.

---

## Deliverable Size Management

Large deliverables use a chunked strategy to prevent network errors and timeout failures.

| Estimated Size | Strategy |
|----------------|----------|
| ≤ 150 lines | **Single file** — standard path |
| > 150 lines OR ≥ 4 major sections | **Chunked** — split into folder with index |

**Chunked Structure**:
```
./reports/{topic}/{type}/{feature}/
├── 00-index.md              # Overview + table of contents
├── 01-{section-name}.md     # Section 1
├── 02-{section-name}.md     # Section 2
├── 03-{section-name}.md     # Section 3
└── ...
```

**Rules**:
1. Create 00-index.md FIRST with planned sections
2. Create each section file ONE BY ONE, SEQUENTIALLY
3. After EACH file: update 00-index.md section status
4. NEVER create multiple files in parallel
5. Target 80-150 lines per section file

> **Source**: `rules/PHASES.md:151-240`

---

## Self-Check

Before every response, verify:

```
□ Am I DELEGATING (not executing)?
□ Am I following WORKFLOW ORDER?
□ Am I responding in USER'S LANGUAGE?
```

---

## Related Pages

- [[Architecture Overview]] — System-level architecture summary
- [[Command System]] — Layer 1: Command routing
- [[Rule System]] — Layer 2: Orchestration protocols
- [[Agent System]] — Layer 3: Specialist agents
- [[Team System]] — Layer 4: Multi-agent coordination
- [[Skill System]] — Layer 5: HSOL skill injection
- [[Command Routing]] — Natural language to command mapping
- [[Feature Catalogue]] — Complete command and feature inventory
