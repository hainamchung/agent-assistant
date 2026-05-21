# Domain Entities and Events

> **Section**: Business Glossary | **File**: 03-domain-entities-and-events.md
> **Purpose**: 7 entity types, 5 event types with their attributes and relationships

---

## Entity Types

### E1: Agent Entity

**Definition**: The core entity representing a specialized AI role.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier (e.g., "backend-engineer") |
| name | string | Display name (e.g., "Backend Engineer") |
| role | string | Role title (e.g., "Principal Backend Architect") |
| category | enum | meta, execution, validation, research, support |
| capabilities | string[] | List of capabilities |
| profile | string | HSOL profile (e.g., "backend:execution") |
| handoffs | Agent[] | Agents this agent can delegate to |

**Relationships**:
- Belongs to one Category
- Implements zero or more Capabilities
- Resolves Skills based on Profile
- Can be delegated to by Orchestrator or Meta Agents

**Reference**: `rules/AGENTS.md`, `web/src/data/agents.ts`

---

### E2: Command Entity

**Definition**: The trigger that initiates a workflow.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| name | string | Command name (e.g., "/cook") |
| aliases | string[] | Alternative invocations |
| variants | Variant[] | Available variants (fast, hard, team) |
| phases | Phase[] | Workflow phases |
| category | enum | build, quality, planning, support |

**Relationships**:
- Routes to workflow file
- Spawns agents based on variant
- Produces deliverables

**Reference**: `rules/CORE.md`, `commands/`

---

### E3: Rule Entity

**Definition**: A behavioral constraint governing agent or system behavior.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Rule identifier (e.g., "R1", "L3") |
| name | string | Rule name |
| type | enum | orchestration, agent, team, skill, phase |
| condition | string | When rule applies |
| action | string | What to do |
| priority | enum | critical, high, medium, low |

**Relationships**:
- Defined in rules/ folder
- Loaded on demand by Orchestrator
- Enforced by agents

**Reference**: `rules/CORE.md` (L1-L10), `rules/AGENTS.md`, `rules/TEAMS.md`

---

### E4: Skill Entity

**Definition**: A domain knowledge module injected into agent context.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Skill identifier (e.g., "fastapi-expert") |
| name | string | Display name |
| domain | string | Domain category |
| priority | number | 1-10 priority score |
| fitness | number | Calculated fitness (0-1) |
| trust | enum | new, evaluating, validated, promoted |
| path | string | Path to skill file |
| source | enum | matrix, dynamic |

**Relationships**:
- Resolved by Profile
- Injected before agent execution
- Tracked in skill matrix

**Reference**: `rules/SKILLS.md`, `matrix-skills/`

---

### E5: Matrix Skill Entity

**Definition**: A pre-curated skill in the HSOL matrix with trust level 1.0.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| all Agent Entity attributes | — | — |
| trust | number | Always 1.0 for matrix skills |
| source | string | Always "matrix" |
| freshness | number | Last verification timestamp |

**Relationships**:
- Subset of Skill entity
- Listed in matrix-skills/{domain}.yaml
- Fast resolution (no trust calculation)

**Reference**: `rules/SKILLS.md`, `matrix-skills/_index.yaml`

---

### E6: Team Entity

**Definition**: A configured Golden Triangle for collaborative work.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Team identifier (e.g., "backend-team") |
| name | string | Display name |
| domain | string | Domain (e.g., "backend") |
| techLead | Agent | Tech Lead agent reference |
| executor | Agent | Executor agent reference |
| reviewer | Agent | Reviewer agent reference |
| mailbox | string | Mailbox file path |
| status | enum | active, complete, arbitrated |

**Relationships**:
- Composed of exactly 3 Agent entities
- Uses Mailbox for communication
- Produces consensus-stamped output

**Reference**: `rules/TEAMS.md`

---

### E7: Platform Config Entity

**Definition**: Platform-specific installation and configuration.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| platform | enum | cursor, claude, copilot, codex, gemini |
| installPath | string | Installation directory |
| configPath | string | Configuration directory |
| commandsPath | string | Commands directory |
| agentsPath | string | Agents directory |
| skillsPath | string | Skills directory |
| rulesPath | string | Rules directory |
| version | string | Installed version |

**Relationships**:
- One per supported platform
- Populated by CLI installer
- Referenced by Orchestrator for path resolution

**Reference**: `README.md`, `cli/install.js`

---

## Event Types

### EV1: agent_dispatch

**Definition**: Event fired when Orchestrator delegates work to an agent.

**Payload**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "agent_dispatch" |
| timestamp | ISO8601 | When dispatched |
| orchestrator | string | Orchestrator session ID |
| targetAgent | string | Agent ID dispatched to |
| tier | enum | TIER_1, TIER_2 |
| task | string | Task description |
| requirements | string[] | Applicable requirements |
| deliverableFormat | enum | single, chunked |

**Flow**: Orchestrator → Agent

**Reference**: `rules/CORE.md`, `rules/AGENTS.md`

---

### EV2: skill_injection

**Definition**: Event fired when skills are loaded into agent context.

**Payload**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "skill_injection" |
| timestamp | ISO8601 | When injected |
| agent | string | Agent ID receiving skills |
| skills | string[] | Skill IDs injected |
| source | enum | matrix, dynamic |
| fitness | number | Average fitness score |
| count | number | Number of skills injected |

**Flow**: HSOL → Agent

**Reference**: `rules/SKILLS.md`

---

### EV3: phase_complete

**Definition**: Event fired when a phase finishes execution.

**Payload**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "phase_complete" |
| timestamp | ISO8601 | When completed |
| workflow | string | Workflow name |
| phase | number | Phase number (1-indexed) |
| phaseName | string | Phase name |
| status | enum | success, partial, failed |
| exitCriteria | CriteriaResult[] | Exit criteria results |
| duration | number | Phase duration in ms |
| deliverable | string | Deliverable path if any |

**Flow**: Phase → Orchestrator

**Reference**: `rules/PHASES.md`

---

### EV4: command_invoke

**Definition**: Event fired when a user invokes a command.

**Payload**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "command_invoke" |
| timestamp | ISO8601 | When invoked |
| userId | string | User identifier |
| command | string | Command name |
| variant | string | Variant if specified |
| input | string | User input |
| platform | enum | Platform used |
| routing | enum | explicit, natural_language |

**Flow**: User → Router → Orchestrator

**Reference**: `rules/CORE.md`

---

### EV5: team_consensus

**Definition**: Event fired when Golden Triangle reaches consensus.

**Payload**:
| Field | Type | Description |
|-------|------|-------------|
| event | string | "team_consensus" |
| timestamp | ISO8601 | When consensus reached |
| team | string | Team ID |
| round | number | Debate round (1-3) |
| techLeadSign | boolean | Tech Lead sign-off |
| executorSign | boolean | Executor sign-off |
| reviewerSign | boolean | Reviewer sign-off |
| stamp | string | Full consensus stamp |
| deliverable | string | Approved deliverable path |

**Flow**: Tech Lead → Orchestrator

**Reference**: `rules/TEAMS.md`

---

## Entity-Relationship Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                        CORE ENTITIES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Command ──────────────┬───────────────────────────────────    │
│       │               │ routes to                            │
│       │               ▼                                       │
│       │         Orchestrator                                    │
│       │               │                                       │
│       │               ├──► Agent ─────────────────────────►   │
│       │               │      │                                │
│       │               │      ├──► Skill (via HSOL)            │
│       │               │      │                                │
│       │               │      └──► Deliverable                 │
│       │               │                                       │
│       │               ├──► Phase                               │
│       │               │      │                                │
│       │               │      └──► phase_complete (event)      │
│       │               │                                       │
│       │               └──► Team ───────────────────────────►   │
│       │                      │                                │
│       │                      ├──► agent_dispatch (event)       │
│       │                      └──► team_consensus (event)      │
│       │                                                       │
│       └─────────────────────────────────────────────────────   │
│                                                                  │
│  Platform Config ──────┐                                        │
│       │               │ configures                            │
│       │               ▼                                        │
│       └─────────► Rules                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evidence Sources

- `rules/CORE.md` — Command routing, Orchestrator
- `rules/AGENTS.md` — Agent entity, dispatch
- `rules/TEAMS.md` — Team entity, consensus
- `rules/PHASES.md` — Phase entity, completion
- `rules/SKILLS.md` — Skill entity, injection
- `web/src/data/agents.ts` — Agent definitions
- `cli/install.js` — Platform configuration
