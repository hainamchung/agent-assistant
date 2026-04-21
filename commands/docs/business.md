---
description: "Business Docs - Generate 4 business folders with structured sub-files"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs:business - Business Documentation (Folder-Based)

> **MISSION**: Generate or update **ALL 4 business knowledge folders**, each with `00-index.md` + numbered sub-files. Output must be evidence-backed, traceable, and actionable for product, engineering, and delivery teams.

<scope>$ARGUMENTS</scope>

---

## PRE-FLIGHT (DO FIRST - BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md - Identity, Laws, Routing
2. PHASES.md - Phase Execution
3. AGENTS.md - Tiered Execution

**Do not run Phase 1 until all are loaded.** Follow all rules in those files; they override any conflicting instructions in this file.

---

## TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)**

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."
  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists -> MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error - NOT complexity/preference/speed"
  anti_lazy_fallback:
    - NEVER use Tier 2 when Tier 1 tool is available
    - ALWAYS attempt Tier 1 first when tool exists
```

---

## DELIVERABLES - FOLDER-BASED BUSINESS SYSTEM

> [!CAUTION]
> **MUST CREATE OR UPDATE ALL 4 FOLDERS** with `00-index.md` and sub-files. Incomplete = FAILED execution.

> **DOCUMENT LANGUAGE - NON-NEGOTIABLE**
> Every file under `./documents/` must be written in **English only**. Do not use the user's language for file content. (CORE LAW 6.)

### Folder Structure

```
./documents/business/
  business-prd/
    00-index.md
    01-executive-summary.md
    02-problem-goals-and-scope.md
    03-stakeholders-and-requirements.md
    04-acceptance-risks-assumptions.md

  business-features/
    00-index.md
    01-feature-inventory.md
    02-prioritization-moscow.md
    03-feature-specifications.md
    04-dependencies-and-release-sequencing.md
    05-success-metrics.md

  business-workflows/
    00-index.md
    01-actor-map.md
    02-workflow-catalog.md
    03-detailed-workflows.md
    04-decision-rules-and-exceptions.md
    05-sla-and-handoffs.md

  business-glossary/
    00-index.md
    01-canonical-terms.md
    02-synonyms-and-deprecated-terms.md
    03-domain-entities-and-events.md
    04-api-term-mapping.md
```

**Minimum total**: 4 folders x (1 index + 4-5 sub-files) = **22 files minimum**.

### `00-index.md` Pattern (MANDATORY)

Every business folder `00-index.md` MUST include:

1. Quick summary (2-3 paragraphs)
2. Sub-files table with descriptions
3. Key facts for that area
4. Cross-references to related business/core folders
5. Known Gaps and Open Questions

```markdown
# {Business Area}

> **Purpose**: {one-line purpose}
> **Sub-files**: {count}
> **Last Updated**: {YYYY-MM-DD}

## Quick Summary
{2-3 paragraphs}

## Sub-Files
| File | Description |
|------|-------------|
| [01-...](./01-...md) | ... |

## Key Facts
| Key | Value |
|-----|-------|
| ... | ... |

## Cross-References
- [knowledge-overview](../knowledge-overview/00-index.md)
- [knowledge-domain](../knowledge-domain/00-index.md)

## Known Gaps and Open Questions
- ...
```

---

## INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 -> Phase 2 -> Phase 3 -> Phase 4.

---

## Phase 1: BUSINESS RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Build evidence-backed business intelligence from codebase + existing docs |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] - Requires logged system error justification.

### Required Work

1. Detect current business docs state (folder-level mode per area):
   - `./documents/business/business-prd/`
   - `./documents/business/business-features/`
   - `./documents/business/business-workflows/`
   - `./documents/business/business-glossary/`

   Mode rules:
   - Folder exists with sub-files -> UPDATE
   - Flat file exists (legacy `business-*.md`) -> MIGRATE
   - Neither exists -> CREATE

2. Scan business signals from repository:
   - README/product docs/roadmap/changelog
   - route and API surfaces for user-facing capabilities
   - domain models/entities/events
   - feature flags/config toggles

3. Extract and catalog:
   - stakeholders and actors
   - business goals and constraints
   - feature inventory and dependencies
   - workflow candidates and state transitions
   - domain terminology and synonyms

4. Build Business Evidence Ledger with file-level references.

### Mandatory Output

```markdown
## Business Intelligence Report

### Execution Plan
| Business Area | Mode | Notes |
|---------------|------|-------|
| business-prd/ | CREATE/UPDATE/MIGRATE | {note} |
| business-features/ | CREATE/UPDATE/MIGRATE | {note} |
| business-workflows/ | CREATE/UPDATE/MIGRATE | {note} |
| business-glossary/ | CREATE/UPDATE/MIGRATE | {note} |

### Stakeholder and Actor Map
| Actor | Goal | Touchpoints | Evidence |
|-------|------|-------------|----------|
| {actor} | {goal} | {workflow/api} | {path} |

### Feature Inventory (Raw)
| Feature | User Value | Technical Surface | Dependencies | Evidence |
|---------|------------|-------------------|--------------|----------|
| {feature} | {value} | {files/apis} | {deps} | {path} |

### Workflow Candidates
| Workflow | Trigger | Steps (summary) | Exceptions | Evidence |
|----------|---------|-----------------|------------|----------|
| {name} | {trigger} | {summary} | {exceptions} | {path} |

### Domain Terms (Raw)
| Term | Candidate Definition | Synonyms | Source |
|------|----------------------|----------|--------|
| {term} | {definition} | {synonyms} | {path} |

### Business Evidence Ledger
| Claim Area | Evidence Files | Confidence |
|------------|----------------|------------|
| Stakeholders | {paths} | High/Medium/Low |
| Features | {paths} | High/Medium/Low |
| Workflows | {paths} | High/Medium/Low |
| Domain Terms | {paths} | High/Medium/Low |
```

### Anti-Shallow Guardrails

- NEVER generate content from README alone - must verify with direct file reads
- Each business area must have at least 2 evidence files in the ledger
- If evidence is weak (Low confidence), explicitly state it - do NOT guess
- Unknowns go to `Known Gaps and Open Questions`, not speculative claims

### Exit Criteria

- [ ] CREATE/UPDATE/MIGRATE mode detected per business area
- [ ] Stakeholders and actors mapped with evidence
- [ ] Feature inventory extracted with dependencies
- [ ] Workflow candidates identified
- [ ] Domain terms extracted
- [ ] Business Evidence Ledger complete

---

## Phase 2: BUSINESS STRUCTURING AND PRIORITIZATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `business-analyst` |
| **Goal** | Convert raw intelligence into structured, testable business artifacts |
| **Skill** | Load `skills/business-analyst/SKILL.md` |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `business-analyst`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/business-analyst.md`
> EMBODY [business-analyst] - Requires logged system error justification.

### Required Work

1. Apply INVEST quality to requirements.
2. Apply MoSCoW prioritization to features.
3. Canonicalize workflows.
4. Resolve glossary conflicts (canonical term + aliases + deprecated terms).
5. Build traceability matrix:
   - Business Goal -> Requirement -> Feature -> Workflow -> KPI

### Mandatory Output

```markdown
## Structured Business Pack

### Goals and Scope
| Goal ID | Goal | KPI | Priority |
|---------|------|-----|----------|
| BG-001 | {goal} | {metric} | Must/Should/Could |

### Requirements (INVEST)
| Req ID | Requirement | Value | INVEST Score | Acceptance Criteria |
|--------|-------------|-------|--------------|---------------------|
| BR-001 | {text} | {value} | {score} | {testable criteria} |

### Features (MoSCoW)
| Feature ID | Feature | Priority | Dependencies | Success Metric |
|------------|---------|----------|--------------|----------------|
| BF-001 | {feature} | Must | {deps} | {metric} |

### Workflows (Canonical)
| Workflow ID | Actor | Trigger | Outcome | Exception Handling |
|-------------|-------|---------|---------|--------------------|
| BW-001 | {actor} | {trigger} | {outcome} | {rule} |

### Glossary Canonicalization
| Canonical Term | Definition | Aliases | Deprecated Terms |
|----------------|------------|---------|------------------|
| {term} | {definition} | {aliases} | {deprecated} |

### Traceability Matrix
| Goal | Requirement | Feature | Workflow | KPI |
|------|-------------|---------|----------|-----|
| BG-001 | BR-001 | BF-001 | BW-001 | {metric} |
```

### Exit Criteria

- [ ] Requirements are testable and value-linked
- [ ] Features prioritized with rationale
- [ ] Workflows canonicalized
- [ ] Glossary conflicts resolved
- [ ] Traceability matrix complete

---

## Phase 3: GENERATE BUSINESS FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Generate or update all 4 business folders in English only |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `docs-manager`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/docs-manager.md`
> EMBODY [docs-manager] - Requires logged system error justification.

### Thinking Protocol (MANDATORY - Run BEFORE Writing Each Sub-File)

For each sub-file, THINK before writing:

1. What evidence from Phase 1/2 supports this file's content?
2. Is every claim backed by an actual file read or the Business Evidence Ledger?
3. Am I writing REAL project data or just paraphrasing the template?
4. Would a business stakeholder find this SUFFICIENT for decision-making?
5. Is anything speculative? Remove it or mark: "Assumption - needs verification"

### Writing Protocol (MANDATORY)

For each business folder:

1. If UPDATE mode:
   - read all existing sub-files fully
   - preserve accurate sections
   - append missing and revise stale sections
   - add update footer: `> Last updated: {date} - {summary}` to touched files
2. If CREATE mode:
   - create folder
   - write `00-index.md` first
   - write `01-...`, `02-...` sub-files sequentially
3. If MIGRATE mode (legacy flat file exists):
   - read existing flat file fully - preserve all valid content
   - create folder with `00-index.md` + sub-files
   - distribute content into appropriate sub-files
   - add migration note: `> Migrated from flat file: {date}`
   - delete or archive legacy flat file after migration
4. Include `## Evidence Sources` in every sub-file
5. Include `## Known Gaps and Open Questions` in every `00-index.md`
6. No placeholders: `TODO`, `TBD`, `{placeholder}`, `fill in later`

### Per-Folder Content Requirements

#### `business-prd/`
- `00-index.md`: summary, TOC, key facts, cross-refs
- `01-executive-summary.md`: mission, value proposition, target outcomes
- `02-problem-goals-and-scope.md`: problem statement, goals, non-goals, in-scope/out-of-scope
- `03-stakeholders-and-requirements.md`: stakeholder map, functional/non-functional requirements, traceability
- `04-acceptance-risks-assumptions.md`: acceptance criteria, risks, assumptions, open questions

#### `business-features/`
- `00-index.md`: summary, TOC, key facts, cross-refs
- `01-feature-inventory.md`: complete feature list and business value
- `02-prioritization-moscow.md`: MoSCoW prioritization with rationale
- `03-feature-specifications.md`: feature-level spec details and acceptance checks
- `04-dependencies-and-release-sequencing.md`: dependencies, rollout order, sequencing constraints
- `05-success-metrics.md`: KPIs, baselines, targets, measurement approach

#### `business-workflows/`
- `00-index.md`: summary, TOC, key facts, cross-refs
- `01-actor-map.md`: actor definitions, responsibilities, boundaries
- `02-workflow-catalog.md`: workflow inventory with trigger/outcome
- `03-detailed-workflows.md`: step-by-step flows with decision points
- `04-decision-rules-and-exceptions.md`: business rules, exceptions, fallback paths
- `05-sla-and-handoffs.md`: timing expectations, handoff contracts, SLA/SLO context

#### `business-glossary/`
- `00-index.md`: summary, TOC, key facts, cross-refs
- `01-canonical-terms.md`: approved canonical terms and definitions
- `02-synonyms-and-deprecated-terms.md`: aliases, deprecated terms, replacement guidance
- `03-domain-entities-and-events.md`: entity/event vocabulary and meaning boundaries
- `04-api-term-mapping.md`: mapping between domain terms and API fields/endpoints

### Exit Criteria

- [ ] `business-prd/` complete (`00-index.md` + 4 sub-files)
- [ ] `business-features/` complete (`00-index.md` + 5 sub-files)
- [ ] `business-workflows/` complete (`00-index.md` + 5 sub-files)
- [ ] `business-glossary/` complete (`00-index.md` + 4 sub-files)
- [ ] Each sub-file includes Evidence Sources
- [ ] No placeholders remain

---

## Phase 4: QUALITY AND CONSISTENCY REVIEW

| Attribute | Value |
|-----------|-------|
| **Agent** | `project-manager` |
| **Goal** | Validate cross-folder consistency, delivery readiness, and completeness |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `project-manager`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/project-manager.md`
> EMBODY [project-manager] - Requires logged system error justification.

### Consistency Matrix (MANDATORY)

```markdown
## Business Docs Consistency Matrix
| Check | PRD | Features | Workflows | Glossary | Status |
|------|-----|----------|-----------|----------|--------|
| Scope consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Terms consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| IDs traceable (BG/BR/BF/BW) | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Metrics defined | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| No contradictions | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
```

### Exit Criteria

- [ ] Cross-folder consistency verified
- [ ] Contradictions resolved
- [ ] Traceability intact
- [ ] Delivery readiness confirmed

---

## VERIFICATION

Before completion, verify folder existence and quality:

### Folder Existence

```
./documents/business/
  [ ] business-prd/         (00-index.md + 01~04)
  [ ] business-features/    (00-index.md + 01~05)
  [ ] business-workflows/   (00-index.md + 01~05)
  [ ] business-glossary/    (00-index.md + 01~04)
```

### Quality Gates

For every business folder and sub-file:

- [ ] English only
- [ ] Required sections present
- [ ] Evidence Sources section present with actual paths
- [ ] `00-index.md` contains Known Gaps and Open Questions
- [ ] No placeholder text
- [ ] Business value explicit and measurable where applicable
- [ ] TOC links in every `00-index.md` match actual sub-files

### Cross-Folder Gates

- [ ] IDs consistent (BG/BR/BF/BW)
- [ ] Same term has one canonical meaning across folders
- [ ] Feature priorities align with PRD scope
- [ ] Workflows reflect features and requirements accurately

---

## COMPLETION

Report status:

1. **Complete** - All 4 business folders created/updated and consistency-validated
2. **Incomplete** - List missing folders/sub-files, failed quality gates, and blockers
3. **Continue** -> `/docs:audit` for audit documentation
