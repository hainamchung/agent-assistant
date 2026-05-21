---
title: Command System
type: entity
tags: [command, routing, execution, user-interface]
created: 2026-05-20
updated: 2026-05-20
---

# Command System

The Command System is the primary user interface for Agent Assistant. 14 commands provide a structured interface for every development task, from feature implementation to bug fixing to knowledge base management. Each command routes to the appropriate agents based on task type and complexity variant.

---

## Definition

Commands follow the format `/command:variant parameter`. The command layer parses user intent, detects the variant (fast, hard, or team), and routes the request to the appropriate execution path.

- **Format**: `/command:variant [parameters]`
- **Variants**: fast (2–3 agents), hard (5–8 agents), team (Golden Triangle)
- **Default**: `fast` if no variant is specified
- **Source**: `documents/knowledge-architecture/01-system-overview.md:121-131`

---

## Command Reference

| Command | Purpose | Default Agents | Variants |
|---------|---------|---------------|----------|
| `/cook` | Feature implementation and component building | frontend-engineer, backend-engineer | fast / hard / team |
| `/code` | Code generation | frontend-engineer, backend-engineer | fast / hard / team |
| `/fix` | Bug fixing and defect resolution | debugger, reviewer | fast / hard / team |
| `/plan` | Planning, breakdown, and estimation | planner, brainstormer | fast / hard / team |
| `/debug` | Root cause analysis and investigation | debugger | fast / hard / team |
| `/test` | Test creation — unit, integration, e2e | tester | fast / hard / team |
| `/review` | Code review against best practices | reviewer | fast / hard / team |
| `/docs` | Documentation generation and management | docs-manager | fast / hard / team |
| `/design` | UI/UX design and component design | designer | fast / hard / team |
| `/deploy` | Deployment and infrastructure | devops-engineer | fast / hard / team |
| `/report` | Data analysis and metrics reporting | reporter | fast / hard / team |
| `/wiki` | Wiki generation and knowledge base | wiki-architect, wiki-extractor, wiki-reviewer | fast / hard / team |
| `/brainstorm` | Ideation and creative thinking | brainstormer | fast / hard / team |
| `/ask` | Questions, research, and investigation | researcher | fast / hard / team |

**Source**: `documents/knowledge-overview/03-features.md:16-36`

---

## Command Variants

Each command supports three execution variants that scale with task complexity:

### fast (Default)

- **Agent Count**: 2–3 agents
- **Review**: Minimal — self-review only
- **Use Case**: Quick fixes, simple features, straightforward implementations
- **Execution Time**: Fastest — designed for rapid turnaround

### hard

- **Agent Count**: 5–8 agents
- **Review**: Standard review — one iteration
- **Use Case**: Complex features, multi-component work, significant changes
- **Execution Time**: Moderate — includes thorough review

### team (Golden Triangle)

- **Agent Count**: 3 roles (Tech Lead, Executor, Reviewer)
- **Review**: Adversarial — debate loop with up to 3 rounds
- **Use Case**: High-stakes work, architectural decisions, mission-critical code
- **Execution Time**: Slowest — maximum quality assurance

**Source**: `documents/knowledge-architecture/03-data-flow.md:72-79`

Variant selection follows business rules: fast is the default, hard is used for complex tasks, and team is reserved for high-stakes work requiring adversarial review. See [[Command Variant Matrix]] for a side-by-side comparison.

---

## Command Routing (F1 Specification)

The Command Routing System is the foundational mechanism that interprets user input and directs requests to the appropriate execution path. This is Feature F1 in the feature specifications.

### F1: Command Routing System

**Type**: Must Have
**File**: `rules/CORE.md`

#### Input Types

The routing system accepts three types of input:

| Input Type | Format | Example |
|------------|--------|---------|
| Explicit command | `/command` or `/command:variant` | `/cook`, `/fix:hard`, `/wiki:team` |
| Natural language | Intent phrases mapped to commands | "implement OAuth" → `/cook` |
| Parameter | Additional context after command | `/cook build payment flow` |

#### Routing Rules

| Rule | Description |
|------|-------------|
| Exact match precedence | Explicit commands take priority over natural language detection |
| Variant equivalence | `/cmd:variant` and `/cmd/variant` are functionally identical |
| Unknown command handling | Returns error with list of valid commands and closest suggestions |
| Default variant | If no variant specified, defaults to `fast` |

#### Supported Commands

All 14 commands are fully supported with their variants:

```yaml
supported_commands:
  # Core implementation commands
  - /cook, /cook:fast, /cook:hard, /cook:team
  - /code, /code:fast, /code:hard, /code:team
  
  # Problem resolution commands
  - /fix, /fix:fast, /fix:hard, /fix:team
  - /debug, /debug:fast, /debug:hard, /debug:team
  
  # Planning and analysis commands
  - /plan, /plan:fast, /plan:hard, /plan:team
  - /ask, /ask:fast, /ask:hard, /ask:team
  - /brainstorm, /brainstorm:fast, /brainstorm:hard, /brainstorm:team
  
  # Quality assurance commands
  - /test, /test:fast, /test:hard, /test:team
  - /review, /review:fast, /review:hard, /review:team
  
  # Creation and documentation commands
  - /docs, /docs:fast, /docs:hard, /docs:team
  - /docs:core, /docs:business, /docs:audit  # docs sub-variants
  - /design, /design:fast, /design:hard, /design:team
  
  # Infrastructure and reporting commands
  - /deploy, /deploy:fast, /deploy:hard, /deploy:team
  - /deploy:check, /deploy:preview, /deploy:production, /deploy:rollback  # deploy sub-variants
  - /report, /report:fast, /report:hard, /report:team
  
  # Knowledge management
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
| `/wiki:team` without team.md | Returns error, suggests `/wiki:fast` or `/wiki:hard` |

#### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `natural_language_detection` | `true` | Enable NL routing |
| `variant_syntax` | `:` | Variant separator (`: ` or `/`) |

**Source**: `documents/business/business-features/03-feature-specifications.md:10-61`

---

## Command Routing Priority Order

When multiple routing rules could apply, the following priority order determines which command is selected:

1. **Explicit command with variant** — `/cook:hard` takes absolute priority
2. **Explicit command without variant** — `/cook` defaults to `:fast`
3. **Natural language with intent match** — "implement feature" → `/cook`
4. **Natural language with partial match** — "build it" → `/code` or `/cook`
5. **Closest command suggestion** — For typos or near-matches

### Routing Algorithm

```
function route(input):
  if input matches /^\/(\w+)(:|\/)(\w+)?$/:  # Explicit command
    command = extract_command(input)
    variant = extract_variant(input) or "fast"
    return load_command_workflow(command, variant)
  
  for pattern in NATURAL_LANGUAGE_PATTERNS:
    if input matches pattern:
      return load_command_workflow(pattern.command, "fast")
  
  return ERROR_WITH_SUGGESTIONS
```

---

## Natural Language Mapping

The Command Layer also detects intent from natural language and maps it to the appropriate command:

| Input Pattern | Mapped Command | Example |
|--------------|---------------|---------|
| "implement", "build", "create" | `/cook` | "implement OAuth login" |
| "fix", "bug", "error", "broken" | `/fix` | "fix the authentication bug" |
| "plan", "breakdown", "estimate" | `/plan` | "plan the user dashboard" |
| "debug", "investigate", "trace" | `/debug` | "debug the memory leak" |
| "test", "write tests" | `/test` | "test the API endpoints" |
| "review", "check code" | `/review` | "review the PR" |
| "document", "docs" | `/docs` | "document the new API" |
| "design", "UI", "UX", "mockup" | `/design` | "design the settings page" |
| "deploy", "release", "ship" | `/deploy` | "deploy to staging" |
| "analyze", "report", "metrics" | `/report` | "analyze the performance" |
| "wiki", "knowledge base" | `/wiki` | "generate wiki from code" |
| "brainstorm", "ideas", "think" | `/brainstorm` | "brainstorm payment options" |
| "code", "snippet", "generate" | `/code` | "generate a regex for emails" |
| "how", "what", "why", "explain", "?" | `/ask` | "how does auth work?" |
| "investigate", "research", "look up" | `/ask` or `/report` | "research GraphQL best practices" |

**Source**: `rules/CORE.md:59-69`

---

## Detailed Command Specifications

### /cook — Feature Implementation

**Purpose**: Feature implementation and component building

**Agents**: frontend-engineer, backend-engineer

**Variants**:
- `:fast` — Single implementation pass
- `:hard` — Multi-phase with review iterations
- `:team` — Golden Triangle for architectural decisions

**Workflow Files**:
- `commands/cook.md` — Base workflow
- `commands/cook/fast.md` — Fast variant
- `commands/cook/hard.md` — Hard variant
- `commands/cook/team.md` — Team variant

**Natural Language Triggers**: "implement", "build", "create", "add feature", "develop"

**Use Cases**:
- Building new React components
- Creating API endpoints
- Implementing business logic
- Adding database models
- Creating middleware

---

### /code — Code Generation

**Purpose**: Direct code generation for specific artifacts

**Agents**: frontend-engineer, backend-engineer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/code.md` — Base workflow
- `commands/code/fast.md` — Fast variant

**Natural Language Triggers**: "code", "snippet", "generate", "write code", "create function"

**Use Cases**:
- Generating utility functions
- Creating type definitions
- Writing SQL queries
- Producing configuration files
- Generating test mocks

**Note**: Use `/cook` for features; use `/code` for standalone code snippets.

---

### /fix — Bug Fixing

**Purpose**: Bug fixing and defect resolution

**Agents**: debugger, reviewer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/fix.md` — Base workflow
- `commands/fix/fast.md` — Fast variant
- `commands/fix/hard.md` — Hard variant
- `commands/fix/team.md` — Team variant

**Natural Language Triggers**: "fix", "bug", "error", "broken", "issue", "problem"

**Use Cases**:
- Fixing runtime errors
- Resolving logic bugs
- Addressing performance issues
- Correcting data inconsistencies
- Debugging integration failures

---

### /plan — Planning

**Purpose**: Planning, breakdown, and estimation

**Agents**: planner, brainstormer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/plan.md` — Base workflow
- `commands/plan/fast.md` — Fast variant
- `commands/plan/hard.md` — Hard variant
- `commands/plan/team.md` — Team variant

**Natural Language Triggers**: "plan", "breakdown", "estimate", "strategy", "approach", "roadmap"

**Use Cases**:
- Sprint planning
- Feature decomposition
- Technical estimation
- Architecture planning
- Risk assessment

---

### /debug — Investigation

**Purpose**: Root cause analysis and investigation

**Agents**: debugger

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/debug.md` — Base workflow
- `commands/debug/fast.md` — Fast variant
- `commands/debug/hard.md` — Hard variant
- `commands/debug/team.md` — Team variant

**Natural Language Triggers**: "debug", "investigate", "trace", "diagnose", "root cause"

**Use Cases**:
- Tracing memory leaks
- Investigating race conditions
- Analyzing crash dumps
- Identifying bottlenecks
- Finding security vulnerabilities

**Note**: Use `/debug` for investigation; use `/fix` when the fix is known.

---

### /test — Testing

**Purpose**: Test creation — unit, integration, e2e

**Agents**: tester

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/test.md` — Base workflow
- `commands/test/fast.md` — Fast variant
- `commands/test/hard.md` — Hard variant
- `commands/test/team.md` — Team variant

**Natural Language Triggers**: "test", "write tests", "spec", "coverage", "testing"

**Use Cases**:
- Writing unit tests
- Creating integration tests
- Building e2e test suites
- Adding test coverage
- Implementing test fixtures

---

### /review — Code Review

**Purpose**: Code review against best practices

**Agents**: reviewer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/review.md` — Base workflow
- `commands/review/fast.md` — Fast variant
- `commands/review/hard.md` — Hard variant
- `commands/review/team.md` — Team variant

**Natural Language Triggers**: "review", "check code", "audit", "assess", "evaluate"

**Use Cases**:
- PR reviews
- Security audits
- Performance reviews
- Code quality assessments
- Architecture reviews

---

### /docs — Documentation

**Purpose**: Documentation generation and management

**Agents**: docs-manager

**Variants**: `:fast`, `:hard`, `:team`

**Sub-Variants**:
- `:core` — Core documentation (README, guides)
- `:business` — Business documentation
- `:audit` — Audit and compliance docs

**Workflow Files**:
- `commands/docs.md` — Base workflow
- `commands/docs/fast.md` — Fast variant
- `commands/docs/hard.md` — Hard variant
- `commands/docs/team.md` — Team variant

**Natural Language Triggers**: "document", "docs", "write docs", "documentation", "README"

**Use Cases**:
- API documentation
- README files
- Architecture docs
- User guides
- Runbooks

---

### /design — Design

**Purpose**: UI/UX design and component design

**Agents**: designer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/design.md` — Base workflow
- `commands/design/fast.md` — Fast variant
- `commands/design/hard.md` — Hard variant
- `commands/design/team.md` — Team variant

**Natural Language Triggers**: "design", "UI", "UX", "mockup", "wireframe", "prototype"

**Use Cases**:
- UI component design
- Page layouts
- User flows
- Design systems
- Accessibility reviews

---

### /deploy — Deployment

**Purpose**: Deployment and infrastructure management

**Agents**: devops-engineer

**Variants**: `:fast`, `:hard`, `:team`

**Sub-Variants**:
- `:check` — Pre-deployment checks
- `:preview` — Preview environment deployment
- `:production` — Production deployment
- `:rollback` — Rollback to previous version

**Workflow Files**:
- `commands/deploy.md` — Base workflow
- `commands/deploy/fast.md` — Fast variant
- `commands/deploy/hard.md` — Hard variant
- `commands/deploy/team.md` — Team variant

**Natural Language Triggers**: "deploy", "release", "ship", "publish", "push to"

**Use Cases**:
- Cloud deployments
- CI/CD pipeline management
- Container orchestration
- Infrastructure as Code
- Environment management

---

### /report — Reporting

**Purpose**: Data analysis and metrics reporting

**Agents**: reporter

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/report.md` — Base workflow
- `commands/report/fast.md` — Fast variant
- `commands/report/hard.md` — Hard variant
- `commands/report/team.md` — Team variant

**Natural Language Triggers**: "analyze", "report", "metrics", "dashboard", "insights"

**Use Cases**:
- Performance reports
- Usage analytics
- Business metrics
- Security reports
- Status reports

---

### /wiki — Knowledge Base

**Purpose**: Wiki generation and knowledge base management

**Agents**: wiki-architect, wiki-extractor, wiki-reviewer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/wiki.md` — Base workflow
- `commands/wiki/fast.md` — Fast variant (rapid extraction)
- `commands/wiki/hard.md` — Hard variant (thorough documentation)
- `commands/wiki/team.md` — Team variant (Golden Triangle)

**Natural Language Triggers**: "wiki", "knowledge base", "generate docs from code", "documentation"

**Use Cases**:
- Generating wiki from codebase
- Creating onboarding documentation
- Extracting architecture documentation
- Building knowledge bases
- Compiling source documentation

See the `commands/wiki.md` and `commands/wiki/team.md` for detailed wiki generation workflow.

---

### /brainstorm — Ideation

**Purpose**: Ideation and creative thinking

**Agents**: brainstormer

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/brainstorm.md` — Base workflow
- `commands/brainstorm/fast.md` — Fast variant
- `commands/brainstorm/hard.md` — Hard variant
- `commands/brainstorm/team.md` — Team variant

**Natural Language Triggers**: "brainstorm", "ideas", "think", "explore options", "creative"

**Use Cases**:
- Feature ideation
- Problem solving sessions
- Technology evaluation
- Solution exploration
- Risk brainstorming

---

### /ask — Research

**Purpose**: Questions, research, and investigation

**Agents**: researcher

**Variants**: `:fast`, `:hard`, `:team`

**Workflow Files**:
- `commands/ask.md` — Base workflow
- `commands/ask/fast.md` — Fast variant
- `commands/ask/hard.md` — Hard variant
- `commands/ask/team.md` — Team variant

**Natural Language Triggers**: "how", "what", "why", "explain", "?", "question", "tell me about"

**Use Cases**:
- Technical questions
- Concept explanations
- Technology research
- Best practice lookup
- Documentation queries

---

## Variant System Deep Dive

### When to Use Each Variant

| Task Complexity | Recommended Variant | Example |
|-----------------|---------------------|---------|
| Simple, well-defined | `:fast` | Fix typo, add simple button, quick refactor |
| Moderate, multi-part | `:hard` | New feature with tests, API with validation |
| Complex, architectural | `:team` | New service, major refactor, security-critical |

### Variant Execution Characteristics

#### fast Variant

```
Execution:
  - 2-3 agents total
  - Minimal review (self-review)
  - 1-2 phases
  - Output: Single deliverable

Best For:
  - Bug fixes under 100 lines
  - Simple component additions
  - Documentation updates
  - Quick code generation
  - Single file changes
```

#### hard Variant

```
Execution:
  - 5-8 agents total
  - Standard review (1 iteration)
  - 3-5 phases
  - Output: Multiple deliverables

Best For:
  - Features with multiple components
  - API design with documentation
  - Database migrations
  - Multi-file refactors
  - Testing strategies
```

#### team Variant (Golden Triangle)

```
Execution:
  - 3 roles per phase: Tech Lead + Executor + Reviewer
  - Adversarial review (up to 3 debate rounds)
  - 5+ phases
  - Consensus stamp required before release
  - Output: Quality-verified deliverables

Best For:
  - Architectural decisions
  - Mission-critical code
  - Security-sensitive changes
  - Performance-critical systems
  - Multi-team coordination
```

### Team Variant Baseline

The `:team` variant is supported only where `commands/{cmd}/team.md` exists. All 14 commands support the team variant through the Golden Triangle pattern defined in [[Rule System]].

**Source**: `rules/CORE.md:72`

---

## Command Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMMAND EXECUTION FLOW                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. INPUT PARSING                                                 │
│    - Detect explicit command (/cmd) or natural language          │
│    - Extract variant if present                                  │
│    - Parse parameters                                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. COMMAND ROUTING                                               │
│    - Match to supported command                                  │
│    - Apply routing priority rules                               │
│    - Load workflow file for variant                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. AGENT DISPATCH                                                │
│    - Determine execution tier (TIER 1 or TIER 2)               │
│    - Dispatch to appropriate agents                             │
│    - Manage phase execution                                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. OUTPUT DELIVERY                                               │
│    - Verify exit criteria                                       │
│    - Format deliverable                                         │
│    - Return result to user                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Pages

- [[Agent System]] — All 21 specialist agents that commands route to
- [[Rule System]] — Orchestration rules that govern command routing
- [[Command Variant Matrix]] — Side-by-side variant comparison
- [[Command System]] — Command routing and variant patterns
- [[Team System]] — Golden Triangle collaboration patterns
