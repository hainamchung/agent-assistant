# Agent Schema Definition

> Canonical schema for `agents/*.md` frontmatter. All agent files MUST conform to this schema.
> Validated by `scripts/lint-agents.js`.

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `schema-version` | string | Schema version, always first field | `"1.0"` |
| `name` | string | Agent identifier (kebab-case) | `"backend-engineer"` |
| `description` | string | One-line role description | `"Principal Backend Architect"` |
| `profile` | string | Skill resolution tag (`domain:role`) | `"backend:execution"` |
| `handoffs` | array[string] | Agents this agent can delegate to | `[tester, reviewer]` |
| `version` | string | Agent definition version | `"1.0"` |
| `category` | enum | `meta \| execution \| investigation \| validation \| research \| support` | `"execution"` |
| `role-scope` | enum | `coordination \| implementation \| analysis \| evaluation \| discovery \| operations` | `"implementation"` |
| `personality` | object | Tone, verbosity, style, humor | See below |
| `capabilities` | array[string] | List of agent capabilities | `["api-development"]` |
| `scope` | object | Files, tasks, restrictions | See below |
| `guardrails` | array[string] | Referenced guardrail modules | `["injection-defense"]` |
| `voice` | object | Voice adaptation settings | See below |
| `preflight` | array[string] | Pre-execution conditions to verify | See below |

## Optional Fields

| Field | Type | Description | When to Include |
|-------|------|-------------|-----------------|
| `skill-profile` | string | Task-scoped skill profile override | Execution agents with specific default task type |
| `liaison` | boolean | Whether agent connects to external systems | Agents that interface with ticketing, CI, monitoring |
| `liaison_targets` | array[string] | External system targets | Only when `liaison: true` |
| `priority` | enum | Agent invocation priority | Only for security-critical agents (`critical`) |

## Field Schemas

### personality
```yaml
personality:
  tone: direct | technical | formal      # Communication tone
  verbosity: concise | balanced | detailed # Output length preference
  style: pragmatic | analytical | narrative | methodical # Working style
  humor: none | subtle                     # Humor level
```

### scope
```yaml
scope:
  files: ["src/**", "lib/**"]    # Glob patterns for file access
  tasks: [implementation, debugging]  # Allowed task types
  restrictions: [no-frontend-changes] # Explicit restrictions
```

### voice
```yaml
voice:
  adaptation: true | false       # Whether voice adapts to context
  deviation_tolerance: 0 | 1     # 0 = strict adherence, 1 = minor deviation allowed
```

### preflight
```yaml
preflight:
  - implementation_target_identified  # Condition to verify before execution
  - prior_phase_deliverables_present
  - token_budget_ok
```

## Guardrail Assignment Policy

All agents MUST reference at minimum:
- `injection-defense` — prompt injection protection
- `output-sanitization` — output quality and safety

Additional guardrails by category:
| Category | Additional Guardrails |
|----------|-----------------------|
| execution | `io-pipeline` |
| investigation | `io-pipeline` |
| validation | `io-pipeline` |
| research | `io-pipeline` |
| support | (none required beyond base) |
| meta | (none required beyond base) |

## Validation

Run `npm run lint:agents` to validate all agent files against this schema.
Run `npm run lint:agents:strict` for strict mode (warns on optional field absence).
