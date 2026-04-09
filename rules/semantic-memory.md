---
schema-version: "1.0"
name: SEMANTIC-MEMORY
description: Protocol for extracting, categorizing, and managing reusable knowledge across workflows
category: meta
---

# Semantic Memory Protocol

## Purpose
Defines how agents extract reusable knowledge from workflow sessions and store it for future reference.
Loaded via RUNTIME.md §LOAD ON DEMAND → "Memory extraction".

## Memory Categories

| # | Category | Description | Example |
|:-:|----------|-------------|---------|
| 1 | **convention** | Coding standards, naming patterns, architectural conventions | "All agent files use kebab-case names" |
| 2 | **decision** | Architectural choices, trade-offs, ADR-level decisions | "ADR-S2-004: 2-pass replaces 3x self-consistency" |
| 3 | **pattern** | Recurring solution patterns, template structures | "Phase files follow: Overview, Tasks, Rollback, Exit Criteria" |
| 4 | **risk** | Known risks, failure modes, edge cases | "RUNTIME.md word count must be checked at every gate" |
| 5 | **dependency** | System dependencies, integration points, version requirements | "simulate.js depends on lint-agents.js rules existing" |
| 6 | **metric** | Performance baselines, quality thresholds, measurement methods | "Lint baseline: 0 errors, 90 warnings (pre-Sprint 2)" |

### Category Selection Rules
- Each memory entry MUST belong to exactly 1 category
- When ambiguous, prefer the category that aids future retrieval
- Example: "We chose semver for schema-version" → **convention** (not decision, because it's now established)

## Memory Entry Format

```yaml
- category: "{convention|decision|pattern|risk|dependency|metric}"
  subject: "{brief title — searchable}"
  fact: "{the knowledge — 1-3 sentences}"
  source: "{file:line or session context}"
  confidence: "{high|medium|low}"
  sprint: "{sprint number when learned}"
```

### Example Entries
```yaml
- category: "convention"
  subject: "Agent file naming"
  fact: "All agent files use kebab-case: backend-engineer.md, not backendEngineer.md"
  source: "agents/ directory convention"
  confidence: "high"
  sprint: "0"

- category: "decision"
  subject: "2-pass evaluation methodology"
  fact: "LLM-as-Judge uses 2-pass anchor-citing instead of 3x self-consistency. Pass 1 scores dimensions, Pass 2 reassesses holistically."
  source: "ADR-S2-004, EVALUATION.md"
  confidence: "high"
  sprint: "2"

- category: "risk"
  subject: "RUNTIME.md word budget"
  fact: "RUNTIME.md has a 3,200-word ceiling. Exceeding it degrades LLM instruction following. Measure with wc -w at every gate."
  source: "ADR-sprint0, Sprint 2 Phase 0"
  confidence: "high"
  sprint: "0"

- category: "metric"
  subject: "Lint baseline pre-Sprint 2"
  fact: "Before Sprint 2: 129 files scanned, 0 errors, 90 warnings. Target after Sprint 2: 0 errors, ≤30 warnings."
  source: "node scripts/lint-agents.js"
  confidence: "high"
  sprint: "2"
```

## Deduplication Protocol

### Strategy: Exact Subject Match
1. Before storing a new entry, check if `subject` matches an existing entry (case-insensitive)
2. If match found:
   - If new `confidence` ≥ existing → UPDATE existing entry with new data
   - If new `confidence` < existing → SKIP (keep existing)
3. If no match → INSERT new entry

### Why Exact Match?
- Zero computational cost (string comparison vs embedding)
- Deterministic and reproducible
- Subject field is designed to be concise and unique
- False negatives (missing a duplicate) are acceptable — mild redundancy is harmless
- False positives (wrong dedup) are harmful — exact match prevents this

## Size Management

### Caps
| Scope | Maximum Entries | Action When Exceeded |
|-------|:---------------:|----------------------|
| Per-category | 50 | Evict oldest low-confidence entry first |
| Total | 200 | Evict oldest low-confidence entries across categories |

### Eviction Priority
1. Entries with `confidence: "low"` — evict first
2. Entries with oldest `sprint` — evict next
3. Within same confidence and sprint — evict by insertion order

## Extraction Process

### When to Extract
1. **End of each phase**: After gate passes, review deliverables for extractable knowledge
2. **After reviews**: Reviewer findings often contain reusable patterns
3. **After errors**: Debugging sessions produce risk and dependency memories

### Who Extracts
The orchestrator triggers extraction. Any agent in a `:team` workflow can propose entries.

### Extraction Checklist (per phase)
- [ ] Any new conventions established?
- [ ] Any architectural decisions made?
- [ ] Any recurring patterns identified?
- [ ] Any new risks discovered?
- [ ] Any dependencies identified?
- [ ] Any metrics or baselines established?

## Storage Location

Memory entries are stored in session/conversation context (platform-dependent).
For persistent cross-session storage:
- GitHub Copilot: `/memories/repo/` via memory tool
- Claude: CLAUDE.md context or project memory
- Cursor: .cursorrules context

This protocol is PLATFORM-AGNOSTIC — it defines the format and process, not the storage mechanism.

## Security
- **Never** store credentials, API keys, or PII in memory entries
- Subject + fact fields are plaintext; anomalies visible on review
- Storage isolation is the platform's responsibility
