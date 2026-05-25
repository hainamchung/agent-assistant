# API Term Mapping

> **Section**: Business Glossary | **File**: 04-api-term-mapping.md
> **Purpose**: Mapping between domain terms and actual API fields/endpoints in the codebase

---

## Tool Mapping

### T1: runSubagent Tool

**Platform**: Cursor, Claude Code (when available)

**Domain Term**: TIER 1 execution, Agent dispatch

**Tool Definition**:
```typescript
runSubagent(
  agentName: string,    // Domain term: Agent ID
  context: {
    requirements: string,
    task: string,
    constraints: string[],
    deliverableFormat: 'single' | 'chunked',
    skills?: string[]
  }
) → {
  output: string,
  deliverablePath?: string,
  status: 'complete' | 'partial' | 'blocked'
}
```

**Usage**:
```markdown
// Domain: Dispatch agent to implement feature
// API: runSubagent('backend-engineer', { task: 'Implement OAuth API', ... })
```

**Reference**: `rules/CORE.md` — TIERED EXECUTION, `rules/AGENTS.md` — TIER 1

---

### T2: Read Tool

**Platform**: All platforms

**Domain Term**: Deliverable retrieval, Prior constraint access

**Tool Definition**:
```typescript
Read(
  path: string,           // Domain term: Deliverable path
  limit?: number,         // For chunked files
  offset?: number
) → string
```

**Usage**:
```markdown
// Domain: Read prior phase deliverable as constraint
// API: Read('./.reports/{topic}/scouts/SCOUT-auth.md')
```

**Reference**: `rules/PHASES.md` — Prior Deliverables as Constraints

---

### T3: Write Tool

**Platform**: All platforms

**Domain Term**: Deliverable creation, Output production

**Tool Definition**:
```typescript
Write(
  contents: string,
  path: string            // Domain term: Deliverable path
) → void
```

**Usage**:
```markdown
// Domain: Create deliverable
// API: Write('# API Implementation\n...', './.reports/{topic}/backend/API.md')
```

**Reference**: `rules/PHASES.md` — DELIVERABLE SIZE MANAGEMENT

---

## File Path Mapping

### F1: rules/AGENTS.md

**Domain Terms**: Agent categories, Agent profiles, Task mapping, Context isolation

**Key Sections**:
```markdown
## AGENT CATEGORIES           → Domain: Meta Agent, Execution Agent, etc.
## TASK → AGENT MAPPING       → Domain: Agent selection rules
## CONTEXT ISOLATION          → Domain: Handoff constraints
## RECURSIVE DELEGATION       → Domain: Meta agent rules
```

**API Fields**:
| Field | Type | Description |
|-------|------|-------------|
| category | enum | Agent category (meta, execution, etc.) |
| profile | string | HSOL profile for skill resolution |
| handoffs | string[] | Agents this agent can delegate to |

**Reference**: `rules/AGENTS.md`

---

### F2: matrix-skills/

**Domain Terms**: HSOL Matrix, Skill resolution, Skill injection

**Key Files**:
```
matrix-skills/
├── _index.yaml              → Domain: HSOL index, inheritance rules
├── _dynamic.yaml            → Domain: Dynamic skill governance
├── backend.yaml             → Domain: Backend skills (api-patterns, fastapi-expert, etc.)
├── frontend.yaml            → Domain: Frontend skills (react-expert, etc.)
├── database.yaml            → Domain: Database skills
├── security.yaml            → Domain: Security skills
└── ...                      → Domain: Other domain skills
```

**_index.yaml Structure**:
```yaml
hsol:
  fitness_threshold: 0.8
  discovery_threshold: 0.75
  trust_progression:
    new: 0.3
    evaluating: 0.5
    validated: 0.7
    promoted: 1.0

domains:
  backend:
    skills: backend.yaml
    inherits: [common]
  frontend:
    skills: frontend.yaml
    inherits: [common]
```

**_dynamic.yaml Governance**:
```yaml
governance:
  required_fields:
    - owner
    - checksum
    - support_state
    - promotion_state
    - freshness.last_verified
    - freshness.stale_after_days
    - installed_at
    - last_execution
```

**Reference**: `rules/SKILLS.md`

---

### F3: commands/

**Domain Terms**: Command routing, Variant dispatch, Workflow triggers

**Directory Structure**:
```
commands/
├── cook.md                  → Domain: /cook command
├── cook/
│   ├── fast.md             → Domain: :fast variant
│   ├── hard.md             → Domain: :hard variant
│   └── team.md             → Domain: :team variant
├── fix.md
├── plan.md
├── test.md
├── review.md
├── debug.md
├── docs.md
├── design.md
├── deploy.md
├── report.md
├── wiki.md
├── wiki/
│   ├── fast.md
│   ├── hard.md
│   └── team.md
├── brainstorm.md
├── ask.md
└── code.md
```

**Command File Format**:
```markdown
# Domain: Command metadata
## Command: /cook
## Variants: fast, hard, team
## Category: build

## PHASE 1: Requirements Intake
...
```

**Reference**: `rules/CORE.md` — COMMAND ROUTING

---

### F4: agents/teams/

**Domain Terms**: Golden Triangle, Team configuration, Team roles

**Directory Structure**:
```
agents/teams/{team-name}/
├── techlead.md    → Domain: Tech Lead role definition
├── executor.md    → Domain: Executor role definition
└── reviewer.md    → Domain: Reviewer role definition
```

**Example: backend-team/**
```markdown
# techlead.md
## Role: Tech Lead (backend-team)
## Directive: Coordinate backend implementation
## Protocol: Decompose → Coordinate → Arbitrate

# executor.md  
## Role: Executor (backend-team)
## Directive: Implement backend features
## Protocol: Build → Defend → Deliver

# reviewer.md
## Role: Reviewer (backend-team)
## Directive: Quality gate for backend
## Protocol: Challenge → Validate → FAIL/PASS
```

**Reference**: `rules/TEAMS.md` — GOLDEN TRIANGLE

---

### F5: agents/{agent-id}.md

**Domain Terms**: Agent entity, Agent capabilities, Agent profile

**File Structure**:
```markdown
# Backend Engineer

## IDENTITY
backend-engineer

## PROFILE
profile: "backend:execution"

## CAPABILITIES
- REST APIs
- GraphQL
- Microservices
- Security

## CONSTRAINTS
- Never implement frontend
- Always use parameterized queries
- Follow API conventions
```

**Reference**: `rules/AGENTS.md`, `web/src/data/agents.ts`

---

## Data Structure Mapping

### D1: Requirements Registry

**Domain Term**: Requirements intake, L2 Requirement Integrity

**Structure**:
```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | H/M/L | ⏳ |
| R2 | {extracted} | H/M/L | ✅ |
```

**Reference**: `rules/PHASES.md` — REQUIREMENTS INTAKE

---

### D2: Shared Task List

**Domain Term**: Team task management, Phase assignment

**Structure**:
```markdown
## 📋 Shared Task List — {Phase Name}
| ID | Task | Assigned To | Status | Priority | Round |
|----|------|-------------|--------|----------|-------|
| T1 | {task} | executor | ⏳ | H | 1 |
```

**Status Icons**:
| Icon | Domain Term |
|------|-------------|
| ⏳ | Pending |
| 🔄 | In Progress |
| ✅ | Complete + Approved |
| ❌ | Blocked |
| 🔁 | Revision Needed |

**Reference**: `rules/TEAMS.md` — SHARED TASK LIST FORMAT

---

### D3: Mailbox Entry

**Domain Term**: Team communication, Debate exchange

**Structure**:
```markdown
## Exchange #{n}
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `executor` | `reviewer` | SUBMISSION | {time} |

**Content:**
[Submission description]

---

## Exchange #{n+1}
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `reviewer` | `executor` | REVIEW | {time} |

**Status:** ❌ FAIL
**Findings:**
- [Issue 1: severity HIGH — description]
```

**Mailbox Types**: TASK_ASSIGNMENT, SUBMISSION, REVIEW, DEFENSE, ESCALATION, APPROVAL, DECISION

**Reference**: `rules/TEAMS.md` — MAILBOX FILE FORMAT

---

### D4: Phase Output Format

**Domain Term**: Phase completion, Deliverable format

**Structure**:
```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1
### Embodying: `{agent}` — {role}     ← TIER 2

{agent work summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

**Reference**: `rules/PHASES.md` — PHASE OUTPUT FORMAT

---

### D5: Consensus Stamp

**Domain Term**: Team consensus, Output approval

**Structure**:
```markdown
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Required for**: All :team variant output releases

**Reference**: `rules/TEAMS.md` — CONSENSUS PROTOCOL

---

## CLI Command Mapping

### CLI: agent-assistant install

**Domain Terms**: Platform integration, Installation, Configuration

**Usage**:
```bash
agent-assistant install cursor      # Domain: Install for Cursor
agent-assistant install claude      # Domain: Install for Claude Code
agent-assistant install --all       # Domain: Install for all platforms
```

**Reference**: `README.md` — Installation, `cli/install.js`

---

### CLI: agent-assistant uninstall

**Domain Terms**: Platform removal, Configuration cleanup

**Usage**:
```bash
agent-assistant uninstall cursor    # Domain: Remove Cursor integration
agent-assistant uninstall --all     # Domain: Remove all platforms
```

**Reference**: `README.md` — Uninstall

---

## Summary Reference Table

| Domain Term | Code Location | API/Field |
|-------------|---------------|------------|
| TIER 1 | `rules/CORE.md` | `runSubagent()` tool |
| Agent dispatch | `rules/AGENTS.md` | `runSubagent(agentName, context)` |
| Skill resolution | `rules/SKILLS.md` | `matrix-skills/*.yaml` |
| Command routing | `rules/CORE.md` | `commands/*.md` |
| Team roles | `rules/TEAMS.md` | `agents/teams/{team}/` |
| Phase execution | `rules/PHASES.md` | Phase output format |
| Context isolation | `rules/AGENTS.md` | Handoff constraints |
| Mailbox | `rules/TEAMS.md` | `./.reports/{topic}/MAILBOX-{date}.md` |
| Deliverable | `rules/PHASES.md` | `Write()` tool |
| Consensus | `rules/TEAMS.md` | Consensus stamp format |
| Platform config | `cli/install.js` | `~/.{platform}/skills/agent-assistant/` |

---

## Evidence Sources

- `rules/CORE.md` — Tool definitions
- `rules/AGENTS.md` — Agent file format
- `rules/TEAMS.md` — Team file format, Mailbox
- `rules/PHASES.md` — Phase output, Requirements Registry
- `rules/SKILLS.md` — Matrix skill files
- `commands/` — Command implementations
- `agents/` — Agent definitions
- `cli/install.js` — CLI implementation
