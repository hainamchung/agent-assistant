# Data Flow

> **File**: `documents/knowledge-architecture/03-data-flow.md`
> **Purpose**: Request lifecycle from user input to agent output

---

## Overview

Agent Assistant processes user requests through a five-stage pipeline:

```
User Input → Command Routing → Rule Application → Agent Execution → Output
```

This document traces the complete lifecycle of a request through the system.

---

## Stage 1: User Input

### Input Sources

| Source | Format | Example |
|--------|--------|---------|
| Terminal | Text command | `/cook`, `/fix`, `/plan` |
| Chat | Natural language | "Build a login form" |
| IDE | Inline command | `/fix bug in auth` |

### Input Processing

```mermaid
sequenceDiagram
    participant U as User
    participant C as Command Parser
    
    U->>C: Natural language input
    C->>C: Parse intent
    C->>C: Extract command type
    C->>C: Detect variant (fast/hard/team)
    C->>C: Extract parameters
```

### Input Fields

| Field | Type | Description |
|-------|------|-------------|
| `command` | string | Primary command (e.g., `/cook`) |
| `variant` | enum | `fast`, `hard`, `team` |
| `params` | object | Command-specific parameters |
| `context` | object | Current file, project state |

---

## Stage 2: Command Routing

### Routing Logic

```mermaid
graph LR
    A[User Input] --> B{Command Type?}
    B -->|/cook| C[Implementation Path]
    B -->|/fix| D[Fix Path]
    B -->|/plan| E[Planning Path]
    B -->|/debug| F[Debug Path]
    B -->|/test| G[Test Path]
    B -->|/review| H[Review Path]
    B -->|/docs| I[Documentation Path]
    B -->|other| J[Generic Path]
```

### Variant Selection

| Variant | Trigger | Agents | Gating |
|---------|---------|--------|--------|
| fast | Default, `/cmd` | 2-3 | Basic review |
| hard | `/cmd:hard` | 5-8 | Full quality gates |
| team | `/cmd:team` | Golden Triangle | Adversarial review |

### Routing Rules

1. **Parse command** — Extract base command from `/command:variant`
2. **Load rules** — Read corresponding command file from `commands/`
3. **Select agents** — Determine agents based on variant
4. **Inject context** — Add project context, file state

---

## Stage 3: Rule Application

### Rule Loading Sequence

```mermaid
sequenceDiagram
    participant C as Command
    participant R1 as CORE
    participant R2 as PHASES
    participant R3 as AGENTS
    participant R4 as SKILLS
    
    C->>R1: Load CORE.md
    C->>R2: Load PHASES.md
    C->>R3: Load AGENTS.md
    C->>R4: Load SKILLS.md
    R1->>R2: Apply core principles
    R2->>R3: Apply phase sequence
    R3->>R4: Apply skill injection
```

### Rule Application Order

| Order | Rule | Purpose |
|-------|------|---------|
| 1 | `CORE.md` | Core principles and constraints |
| 2 | `PHASES.md` | Phase definitions and transitions |
| 3 | `AGENTS.md` | Agent selection and roles |
| 4 | `SKILLS.md` | Skill injection configuration |
| 5 | `TEAMS.md` | Team coordination (if team variant) |

### Rule Variables

| Variable | Source | Available In |
|----------|--------|--------------|
| `{{COMMAND}}` | Command layer | Rules, agents |
| `{{VARIANT}}` | Command layer | Rules, agents |
| `{{AGENT}}` | Agent layer | Rules, agents |
| `{{SKILLS}}` | Skill layer | Agents |

---

## Stage 4: Agent Execution

### Single Agent Flow (Fast Variant)

```mermaid
sequenceDiagram
    participant R as Rule Engine
    participant A as Agent
    participant S as HSOL
    participant K as Skills
    
    R->>A: Dispatch task
    A->>S: Request skills
    S->>K: Query relevant skills
    K->>S: Return skill set
    S->>A: Inject skills
    A->>A: Execute task
    A->>R: Return result
```

### Multi-Agent Flow (Hard Variant)

```mermaid
sequenceDiagram
    participant R as Rule Engine
    participant A1 as Agent 1
    participant A2 as Agent 2
    participant A3 as Agent N
    participant S as HSOL
    
    R->>A1: Dispatch task
    R->>A2: Dispatch task
    R->>A3: Dispatch task
    A1->>S: Request skills
    A2->>S: Request skills
    A3->>S: Request skills
    S-->>A1: Inject skills
    S-->>A2: Inject skills
    S-->>A3: Inject skills
    A1->>A1: Execute
    A2->>A2: Execute
    A3->>A3: Execute
    A1-->>R: Results
    A2-->>R: Results
    A3-->>R: Results
```

### Golden Triangle Flow (Team Variant)

```mermaid
sequenceDiagram
    participant R as Rule Engine
    participant TL as Tech Lead
    participant EX as Executor
    participant RV as Reviewer
    participant S as HSOL
    
    R->>TL: Analyze requirements
    TL->>TL: Create architecture
    TL->>EX: Pass spec
    EX->>S: Request skills
    S-->>EX: Inject skills
    EX->>EX: Implement
    EX-->>TL: Deliver implementation
    TL->>RV: Send for review
    RV->>RV: Adversarial review
    alt Issues found
        RV-->>EX: Request changes
        EX->>EX: Fix issues
        EX-->>RV: Revised implementation
    end
    RV-->>TL: Approve
    TL-->>R: Final result
```

---

## Stage 5: Output

### Output Types

| Type | Format | Example |
|------|--------|---------|
| Code | Files, patches | New component files |
| Documentation | Markdown | API docs |
| Report | Structured data | Bug analysis |
| Review | Comments | Code review notes |

### Output Flow

```mermaid
graph LR
    A[Agent Result] --> B{Output Type?}
    B -->|Code| C[Write to files]
    B -->|Docs| D[Update docs]
    B -->|Report| E[Generate report]
    B -->|Review| F[Add comments]
```

---

## Complete Request Lifecycle

### Example: `/cook:hard build login form`

```mermaid
sequenceDiagram
    participant U as User
    participant C as Command Router
    participant R as Rule Engine
    participant TL as Tech Lead
    participant FE as Frontend Engineer
    participant BE as Backend Engineer
    participant RV as Reviewer
    participant S as HSOL

    U->>C: /cook:hard build login form
    C->>R: Route to cook:hard
    R->>R: Load rules (CORE, PHASES, AGENTS, SKILLS)
    
    par Parallel agent dispatch
        R->>TL: Analyze requirements
        TL->>S: Request UI/UX skills
        S-->>TL: Return skills
        TL->>TL: Create login form spec
    and
        R->>FE: Implement frontend
        FE->>S: Request React skills
        S-->>FE: Return skills
        FE->>FE: Create login component
    and
        R->>BE: Implement backend
        BE->>S: Request auth skills
        S-->>BE: Return skills
        BE->>BE: Create auth endpoints
    end
    
    R->>RV: Send for review
    RV->>RV: Adversarial review
    alt Issues found
        RV-->>FE: Request changes
        RV-->>BE: Request changes
        FE->>FE: Fix frontend
        BE->>BE: Fix backend
    end
    
    RV-->>R: Approve
    R-->>U: Return results
```

---

## Error Handling

### Error Flow

```mermaid
graph TD
    A[Execution] --> B{Success?}
    B -->|Yes| C[Return result]
    B -->|No| D[Check error type]
    D -->|Recoverable| E[Retry with backoff]
    D -->|Unrecoverable| F[Apply ERROR.md rules]
    E --> A
    F --> G[Return error to user]
```

### Error Types

| Type | Behavior | Example |
|------|----------|---------|
| Agent failure | Retry 3x, then fail | Agent crash |
| Skill missing | Fallback to generic | Unknown domain |
| Path error | Use default paths | Invalid platform path |

---

## Evidence Sources

- `rules/CORE.md` — Core orchestration rules
- `rules/PHASES.md` — Phase definitions
- `rules/AGENTS.md` — Agent orchestration
- `rules/SKILLS.md` — Skill injection
- `rules/TEAMS.md` — Team coordination
- `commands/` — Command definitions
- `agents/` — Agent implementations
