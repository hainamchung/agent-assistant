---
description: "Core Docs - Generate 5 knowledge folders with evidence-backed sub-files for comprehensive technical documentation"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs:core — Core Technical Documentation (v3.0)

> **MISSION**: Analyze the current project through deep codebase reconnaissance, then generate **5 knowledge folders** — each with `00-index.md` + focused sub-files. Every claim must trace to actual source code. The result must enable a new team member or AI agent to fully understand the project without reading the codebase.

<scope>$ARGUMENTS</scope>

---

## PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

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

## DELIVERABLES — FOLDER-BASED KNOWLEDGE SYSTEM

> [!CAUTION]
> **MUST CREATE OR UPDATE ALL 5 FOLDERS** with their `00-index.md` and sub-files. Incomplete = FAILED execution.

> **DOCUMENT LANGUAGE — NON-NEGOTIABLE**
> Every file under `./documents/` must be written in **English only**. Headings, body text, tables, and lists must be in English. Do not use the user's language for file content. Chat/UI may follow user language; document files do not. (CORE LAW 6.)

### Folder Structure

```
./documents/
  knowledge-overview/
    00-index.md                  # Summary + TOC + cross-references
    01-project-identity.md       # Name, version, purpose, vision, mission
    02-tech-stack.md             # Languages, frameworks, runtime, dependencies
    03-features.md               # Key features, metrics, capabilities
    04-getting-started.md        # Prerequisites, installation, first run

  knowledge-architecture/
    00-index.md                  # Architecture summary + TOC
    01-system-overview.md        # High-level diagram, layers, boundaries
    02-components.md             # Core components, responsibilities, interfaces
    03-data-flow.md              # Request processing, data pipelines, event flows
    04-design-patterns.md        # Patterns used, rationale, examples
    05-decisions.md              # ADRs, trade-offs, architectural constraints

  knowledge-domain/
    00-index.md                  # Domain summary + TOC
    01-entities.md               # Core entities, ERD, relationships
    02-database-schema.md        # Tables, indexes, migrations, seeds
    03-api-contracts.md          # Endpoints, payloads, auth, errors
    04-business-rules.md         # Validations, state machines, constraints

  knowledge-source-base/
    00-index.md                  # Source overview + TOC
    01-directory-structure.md    # Full directory tree with annotations
    02-entry-points.md           # Main files, boot sequence, initialization
    03-key-modules.md            # Core modules breakdown, dependencies
    04-configuration.md          # Config files, env vars, secrets management

  knowledge-standards/
    00-index.md                  # Standards overview + TOC
    01-code-style.md             # Formatting, linting, naming conventions
    02-conventions.md            # File/directory patterns, imports, exports
    03-git-workflow.md           # Commit format, branching, PR process
    04-testing-standards.md      # Test structure, coverage goals, patterns
```

### The `00-index.md` Pattern (MANDATORY for every folder)

Each `00-index.md` MUST include:

1. **Brief overview** (2-3 paragraphs summarizing the knowledge area)
2. **Sub-files table** — filename, description, and what it covers
3. **Quick facts** — key reference data
4. **Cross-references** — links to related knowledge folders
5. **Known Gaps and Open Questions** — what could not be determined

```markdown
# Knowledge {Area}

> **Purpose**: {one-line}
> **Sub-files**: {count}
> **Last Updated**: {YYYY-MM-DD}

## Quick Summary
{2-3 paragraph executive summary}

## Sub-Files

| File | Description |
|------|-------------|
| [01-xxx.md](./01-xxx.md) | Covers ... |
| [02-xxx.md](./02-xxx.md) | Covers ... |

## Quick Facts

| Key | Value |
|-----|-------|
| ... | ... |

## Cross-References

- [knowledge-architecture/](../knowledge-architecture/00-index.md) — How components interact
- [knowledge-domain/](../knowledge-domain/00-index.md) — Data models and APIs

## Known Gaps and Open Questions

- {What could not be determined and why}
```

### Scaling Rules

| Condition | Action |
|-----------|--------|
| Sub-file would exceed ~300 lines | Split into focused sub-files |
| Sub-file would be < 20 lines | Merge into nearest related sub-file |
| Project has many modules/services | Add per-module sub-files |
| Project has complex integrations | Add integration sub-files |

> **Numbering**: Always 2-digit prefix. Update `00-index.md` TOC when adding files.

---

## INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 -> then Phase 2 -> then Verification -> in one reply. No batching (load only what each phase needs). **Within each phase**: announce before doing, emit deliverables as you go.

---

## Phase 1: DEEP CODEBASE RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Pre-flight mode detection + deep project scan + structured intelligence report |
| **Skill** | Load `skills/docs-core/references/deep-recon-checklist.md` for scan protocol |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

---

### Step 1.0: PRE-FLIGHT — Mode Detection

BEFORE any scanning, check the current state of `./documents/`:

```
CHECK:
1. Does ./documents/ directory exist? (Create if missing)
2. Do knowledge FOLDERS exist? (knowledge-overview/, knowledge-architecture/, etc.)
3. Do legacy flat files exist? (knowledge-overview.md, knowledge-architecture.md, etc.)
4. Determine mode PER knowledge area:

| Knowledge Area           | Folder Exists | Flat File Exists | Mode                  |
|--------------------------|---------------|------------------|-----------------------|
| knowledge-overview/      | Yes/No        | Yes/No           | CREATE/UPDATE/MIGRATE |
| knowledge-architecture/  | Yes/No        | Yes/No           | CREATE/UPDATE/MIGRATE |
| knowledge-domain/        | Yes/No        | Yes/No           | CREATE/UPDATE/MIGRATE |
| knowledge-source-base/   | Yes/No        | Yes/No           | CREATE/UPDATE/MIGRATE |
| knowledge-standards/     | Yes/No        | Yes/No           | CREATE/UPDATE/MIGRATE |

Mode rules:
  Folder exists with sub-files -> UPDATE (check each sub-file for staleness)
  Flat file exists (no folder) -> MIGRATE (convert to folder structure)
  Nothing exists               -> CREATE (generate from scratch)
```

### Step 1.1: Structure Scan

- List all top-level directories and files
- Recursively map directory tree (depth 3-4)
- Identify entry points: `main.*`, `index.*`, `app.*`, `server.*`, `package.json`, `Dockerfile`
- **Direct-read minimum** (must read CONTENT, not just filenames):
  - `README*`, `CHANGELOG*`, `CONTRIBUTING*` (when present)
  - Build/runtime manifests: `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, etc.
  - At least ONE entry-point file per runtime surface (web, API, worker, CLI)

### Step 1.2: Tech Stack Detection

- Parse package manifests for dependencies
- Detect frameworks from imports/config: React, Next.js, Express, Django, FastAPI, Spring Boot, etc.
- Identify databases from: connection strings, ORM config, migration files
- Detect CI/CD from: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`
- Detect containerization: `Dockerfile`, `docker-compose.yml`

### Step 1.3: Architecture Pattern Discovery

Run targeted search passes (MINIMUM):
- Architecture: `controller|service|repository|use-case|domain|module|adapter|middleware|handler`
- API surface: `router|route|endpoint|graphql|openapi|swagger|trpc`
- Data model: `model|schema|entity|migration|prisma|typeorm|sequelize|mongoose|sql`
- Standards: `eslint|prettier|editorconfig|commitlint|husky|lint-staged|test`

Identify: MVC, MVVM, Clean Architecture, Hexagonal, Microservices, Monolith, etc.
Document: design patterns (Repository, Factory, Observer, Middleware, DI), naming conventions, test framework patterns, config patterns.

### Step 1.4: Domain Intelligence

- Locate data models: ORM models, schemas, type definitions, interfaces
- Find API definitions: routes, controllers, GraphQL schemas, OpenAPI specs
- Identify business logic: services, use cases, domain modules
- Map entity relationships from foreign keys, references, imports

### Step 1.5: Context-Window Optimization

> For large codebases (>500 files):
> - Run `bash skills/docs-core/scripts/scan-project.sh [project-root]` first
> - Read selectively: config -> entry points -> routes -> models -> tests
> - Use grep for pattern search instead of reading entire files
> - For monorepos: scan each package manifest separately

---

### Phase 1 MANDATORY OUTPUT: Intelligence Report

> [!CAUTION]
> **Phase 2 CANNOT START without this output.** The docs-manager uses this report as its primary input. If this report is shallow, the documentation will be shallow.

```markdown
## Intelligence Report

### Execution Plan
| Knowledge Area          | Mode    | Reason |
|-------------------------|---------|--------|
| knowledge-overview/     | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-architecture/ | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-domain/       | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-source-base/  | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-standards/    | CREATE/UPDATE/MIGRATE | {why} |

### Project Scale Assessment
| Metric            | Value |
|-------------------|-------|
| Total files       | {N}   |
| Total directories | {N}   |
| Primary language  | {lang} |
| Complexity        | Small (<100 files) / Medium (100-500) / Large (500+) |
| Monorepo?         | Yes/No |

### Tech Stack Map
| Layer        | Technology    | Version | Evidence File |
|-------------|---------------|---------|---------------|
| Runtime     | {e.g. Node.js}| {ver}   | {package.json}|
| Framework   | {e.g. Next.js}| {ver}   | {package.json}|
| Database    | {e.g. PostgreSQL}| {ver}| {docker-compose.yml}|
| ORM         | {e.g. Prisma} | {ver}   | {schema.prisma}|
| Testing     | {e.g. Jest}   | {ver}   | {package.json}|
| CI/CD       | {e.g. GitHub Actions}| - | {.github/workflows/}|
| Container   | {e.g. Docker} | -       | {Dockerfile}  |

### Architecture Signals
| Signal | Evidence | Pattern |
|--------|----------|---------|
| {e.g. src/controllers/} | {path} | MVC — controller layer |
| {e.g. src/services/}    | {path} | Service layer pattern  |
| {e.g. src/middleware/}   | {path} | Middleware chain        |

### Domain Signals
| Entity/Model | Location | Type | Relationships |
|-------------|----------|------|---------------|
| {e.g. User} | {path}   | ORM Model | -> Posts, -> Orders |
| {e.g. Post} | {path}   | Schema    | -> User, -> Comments |

### API Surface
| Method | Path | Handler | Auth |
|--------|------|---------|------|
| GET    | /api/users | {file:line} | {type} |
| POST   | /api/auth  | {file:line} | public |

### Standards Signals
| Standard | Tool/Config | Evidence |
|----------|-------------|----------|
| Linting  | {ESLint}    | {.eslintrc} |
| Format   | {Prettier}  | {.prettierrc} |
| Commits  | {conventional} | {commitlint.config} |
| Tests    | {Jest}      | {jest.config} |

### Evidence Ledger (BLOCKING — Phase 2 uses this)
| Claim Area     | Evidence Files (actual paths) | Confidence |
|----------------|-------------------------------|------------|
| Architecture   | {path1}, {path2}, ...         | High/Medium/Low |
| Domain/Data    | {path1}, {path2}, ...         | High/Medium/Low |
| Standards      | {path1}, {path2}, ...         | High/Medium/Low |
| Source Structure| {path1}, {path2}, ...        | High/Medium/Low |
| Tech Stack     | {path1}, {path2}, ...         | High/Medium/Low |
```

### Anti-Shallow Guardrails

- NEVER generate content from script output alone — must verify with direct file reads
- Each knowledge area must have at least 3 evidence files in the ledger
- If evidence is weak (Low confidence), explicitly state it — do NOT guess
- Unknowns go to `Known Gaps and Open Questions`, not speculative claims

### Exit Criteria

- [ ] Pre-flight mode detection complete (CREATE/UPDATE/MIGRATE per folder)
- [ ] Project scale assessed
- [ ] Tech stack fully mapped with evidence
- [ ] Architecture patterns identified with file-level evidence
- [ ] Domain entities and API surface cataloged
- [ ] Standards/conventions documented with config file evidence
- [ ] Evidence Ledger complete — every claim area has >= 3 evidence files
- [ ] Intelligence Report fully emitted (Phase 2 depends on this)

---

## Phase 2: GENERATE KNOWLEDGE FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Create all 5 knowledge folders with `00-index.md` + sub-files in **English only** |
| **Skill** | Load `skills/docs-core/SKILL.md` for generation protocol |
| **Templates** | Load from `skills/docs-core/references/template-{area}.md` per folder (read-only) |
| **Input** | Intelligence Report + Evidence Ledger from Phase 1 |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `docs-manager`. Context: ISOLATED.
> **MUST PASS** the Phase 1 Intelligence Report as context.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/docs-manager.md`
> EMBODY [docs-manager] — Requires logged system error justification.

---

### Step 2.0: Load Skill + Templates

```
BEFORE writing any file:
1. LOAD skills/docs-core/SKILL.md (generation protocol, quality rules)
2. For each folder, LOAD the matching template:
   - knowledge-overview/     -> references/template-overview.md
   - knowledge-architecture/ -> references/template-architecture.md
   - knowledge-domain/       -> references/template-domain.md
   - knowledge-source-base/  -> references/template-source-base.md
   - knowledge-standards/    -> references/template-standards.md
3. Use templates as STRUCTURE GUIDES — fill with actual project data from Intelligence Report
4. Do NOT copy template placeholders into output — replace ALL {placeholder} with real data
```

### Step 2.1: Thinking Protocol (MANDATORY — Run BEFORE Writing Each Sub-File)

```
FOR EACH sub-file, THINK before writing:

  1. WHO reads this? -> New developer? BA/PM? AI agent? All three?
  2. WHAT must they understand from THIS file alone?
  3. WHAT evidence from Intelligence Report supports this file's content?
  4. Is EVERY claim I'm about to write backed by an actual file I read?
     -> If not: either read the file now, or write "Not applicable to this project"
  5. Is anything speculative? -> Remove it or mark: "Assumption — needs verification"
  6. Would a new team member find this SUFFICIENT for day-one understanding?
  7. Am I writing REAL project data or just paraphrasing the template?
     -> Template structure = good. Template placeholder text = FAILURE.

VERIFY before writing each file:
  [ ] Every technical claim maps to an evidence file from the Ledger
  [ ] No placeholder text: "TODO", "TBD", "fill in later", "{placeholder}"
  [ ] All file paths referenced actually exist in the project
  [ ] Mermaid diagrams (if used) are syntactically valid
  [ ] Content is English only
```

### Step 2.2: Mode-Dependent Execution

**CREATE mode** (folder missing):
1. Create folder
2. Write `00-index.md` first (summary + TOC with all planned sub-files)
3. Write sub-files sequentially: `01-*.md`, `02-*.md`, `03-*.md`, ...
4. Verify `00-index.md` TOC links match actual sub-files

**UPDATE mode** (folder exists):
1. Read ALL existing sub-files completely
2. Compare against Intelligence Report findings
3. For each sub-file, identify: Stale (update) | Missing info (append) | Accurate (preserve)
4. NEVER delete accurate content — append new, revise stale, preserve valid
5. Add changelog: `> Last updated: {date} — {summary}` at bottom of modified files
6. If new sub-topics found, add new numbered sub-files and update `00-index.md` TOC

**MIGRATE mode** (flat file exists, no folder):
1. Read legacy flat file completely — preserve ALL valid content
2. Create folder with `00-index.md` + sub-files
3. Distribute content from flat file into appropriate sub-files
4. Add migration note to `00-index.md`: `> Migrated from flat file: {date}`
5. Delete or archive legacy flat file after successful migration
6. Verify all original content is preserved in new structure

### Step 2.3: Folder Generation Order + Content Requirements

> **Order matters** — each folder builds on the previous:

---

#### FOLDER 1: `knowledge-source-base/` — Foundation: WHERE things are

**Template**: `references/template-source-base.md`

| Sub-File | MUST Include | Evidence Source |
|----------|-------------|-----------------|
| `00-index.md` | Summary of project structure, sub-files TOC, **Read Order for New Members**, cross-refs, known gaps | Directory scan |
| `01-directory-structure.md` | Complete annotated directory tree (depth 3-4), purpose of each top-level dir, icon annotations | `ls`, directory scan |
| `02-entry-points.md` | Application entry files (main/index/app/server), boot sequence, build entry points (scripts), config entry points | Package manifest + entry point files |
| `03-key-modules.md` | Per-module breakdown: purpose, exports, dependencies, internal structure. Cover ALL major modules | Module source files |
| `04-configuration.md` | Config files inventory, env vars with descriptions and defaults, secrets management approach | `.env*`, config files, docker-compose |

---

#### FOLDER 2: `knowledge-overview/` — Identity: WHAT and WHY

**Template**: `references/template-overview.md`

| Sub-File | MUST Include | Evidence Source |
|----------|-------------|-----------------|
| `00-index.md` | Project summary, sub-files TOC, quick facts table (name, version, type, language), cross-refs | README, package manifest |
| `01-project-identity.md` | Name, version, type, author, license, repo URL, purpose statement, problem/solution, key benefits, **First 60 Minutes onboarding checklist** | README, package.json, repo metadata |
| `02-tech-stack.md` | Categorized stack table: runtime, frontend, backend, database, ORM, testing, CI/CD, infra — each with version + evidence file | Tech Stack Map from Intelligence Report |
| `03-features.md` | Key features list with descriptions, metrics/stats if available, capability overview | README, source code analysis |
| `04-getting-started.md` | Prerequisites with versions, step-by-step installation, environment setup, first run commands, running tests, common issues/troubleshooting | README, package.json scripts, config files |

---

#### FOLDER 3: `knowledge-architecture/` — Design: HOW things connect

**Template**: `references/template-architecture.md`

| Sub-File | MUST Include | Evidence Source |
|----------|-------------|-----------------|
| `00-index.md` | Architecture summary, sub-files TOC, high-level component diagram (Mermaid), cross-refs | Architecture Signals from Intelligence Report |
| `01-system-overview.md` | High-level architecture diagram (Mermaid), architecture style (MVC/Clean/etc.), layer boundaries, key design decisions table | Source structure + architecture signals |
| `02-components.md` | Per-component: name, responsibility, interfaces, dependencies, file locations. Cover ALL major components | Component source files |
| `03-data-flow.md` | Request lifecycle diagram (Mermaid), key data flows (user actions -> system responses), event flows if applicable | Route/controller files, middleware |
| `04-design-patterns.md` | Patterns used: name, where applied, rationale, code example reference. Cover ALL observed patterns | Architecture Signals from Intelligence Report |
| `05-decisions.md` | ADR table: decision, choice, alternatives considered, rationale, trade-offs. Architectural constraints | README, config files, code structure evidence |

---

#### FOLDER 4: `knowledge-domain/` — Data: WHAT flows through

**Template**: `references/template-domain.md`

| Sub-File | MUST Include | Evidence Source |
|----------|-------------|-----------------|
| `00-index.md` | Domain summary, sub-files TOC, entity overview diagram (Mermaid ERD), bounded contexts, cross-refs | Domain Signals from Intelligence Report |
| `01-entities.md` | Per-entity: name, fields with types, constraints, relationships. ERD diagram. Cover ALL entities/models | ORM models, schemas, interfaces |
| `02-database-schema.md` | Tables/collections with columns and types, indexes, migrations history, seed data. If no DB: "Not applicable" with reason | Migration files, schema files, DB config |
| `03-api-contracts.md` | Per-endpoint: method, path, request/response schema, auth, errors. Authentication flow. Error response format | Route files, controllers, OpenAPI specs |
| `04-business-rules.md` | Validation rules with conditions and messages, business logic rules, state machines (Mermaid), constraints | Service files, validators, business logic |

---

#### FOLDER 5: `knowledge-standards/` — Rules: HOW TO CODE correctly

**Template**: `references/template-standards.md`

| Sub-File | MUST Include | Evidence Source |
|----------|-------------|-----------------|
| `00-index.md` | Standards summary, sub-files TOC, quick reference of naming conventions, cross-refs | Config files + observed patterns |
| `01-code-style.md` | Formatting rules (tabs/spaces, line length, etc.), linting config summary, naming conventions table (files, vars, functions, classes, constants) — by evidence from actual config + code patterns | `.eslintrc`, `.prettierrc`, actual code patterns |
| `02-conventions.md` | File/directory organization patterns, import order conventions, export patterns, module structure conventions, comment standards | Observed code patterns, config files |
| `03-git-workflow.md` | Commit message format (with examples), branch naming convention, PR guidelines, merge strategy, CI/CD pipeline description | `.commitlintrc`, branch patterns, CI config |
| `04-testing-standards.md` | Test file organization, test naming conventions, coverage goals, test categories (unit/integration/e2e), test command reference | Test config, test files, CI pipeline |

---

### Step 2.4: Per-File Quality Gates

> **EVERY sub-file** must pass these gates before the agent moves to the next file:

```
QUALITY GATE per sub-file:
  [ ] Written in English only
  [ ] Has project-specific content (not just template text)
  [ ] Contains NO placeholders: {placeholder}, TODO, TBD, "fill in later"
  [ ] Has ## Evidence Sources section listing actual files used
  [ ] Every technical claim traces to a file from the Evidence Ledger
  [ ] Would pass a "new team member" test — someone could act on this info
  [ ] 00-index.md TOC matches actual sub-files (if this is an index file)
```

> **If a sub-file cannot be meaningfully filled** (e.g., no database in the project → `02-database-schema.md`):
> Write: `Not applicable to this project — {reason with evidence}` rather than leaving empty or speculating.

### Step 2.5: Sub-File Format

Every sub-file MUST follow this structure:

```markdown
# {Project Name} — {Document Title}

> **Purpose**: {one-line purpose}
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: {YYYY-MM-DD}
> **Generated By**: docs-core skill

---

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
...

---

{Content sections with real project data}

---

## Evidence Sources

| File | Why it was used |
|------|-----------------|
| {actual/path/to/file} | {what evidence it provided} |
```

### Exit Criteria

- [ ] All 5 knowledge folders created with `00-index.md` + sub-files
- [ ] Every `00-index.md` has accurate TOC matching actual sub-files
- [ ] Cross-references between folders are correct and valid
- [ ] Every sub-file has `## Evidence Sources` with actual file paths
- [ ] No placeholder text in any file: {placeholder}, TODO, TBD
- [ ] All content is English only
- [ ] UPDATE mode: existing accurate content preserved, changelog entries added

---

## VERIFICATION

After all folders are generated, perform a final verification pass:

### File Completeness Check

```
./documents/
  knowledge-overview/
    [ ] 00-index.md         — Has TOC, Quick Summary, cross-refs
    [ ] 01-project-identity.md — Has First 60 Minutes checklist
    [ ] 02-tech-stack.md    — Has categorized stack table with versions
    [ ] 03-features.md      — Has feature descriptions (not just names)
    [ ] 04-getting-started.md — Has step-by-step runnable instructions

  knowledge-architecture/
    [ ] 00-index.md         — Has architecture diagram (Mermaid)
    [ ] 01-system-overview.md — Has high-level diagram + architecture style
    [ ] 02-components.md    — Has per-component breakdown
    [ ] 03-data-flow.md     — Has request lifecycle diagram
    [ ] 04-design-patterns.md — Has patterns with rationale
    [ ] 05-decisions.md     — Has ADR table

  knowledge-domain/
    [ ] 00-index.md         — Has entity overview + ERD
    [ ] 01-entities.md      — Has per-entity fields and relationships
    [ ] 02-database-schema.md — Has schema OR "Not applicable" with reason
    [ ] 03-api-contracts.md — Has per-endpoint specs OR "Not applicable"
    [ ] 04-business-rules.md — Has validation rules + business logic

  knowledge-source-base/
    [ ] 00-index.md         — Has Read Order for New Members
    [ ] 01-directory-structure.md — Has annotated directory tree
    [ ] 02-entry-points.md  — Has boot sequence
    [ ] 03-key-modules.md   — Has per-module breakdown
    [ ] 04-configuration.md — Has env vars with descriptions

  knowledge-standards/
    [ ] 00-index.md         — Has naming convention quick reference
    [ ] 01-code-style.md    — Has formatting + naming rules from config
    [ ] 02-conventions.md   — Has file organization patterns
    [ ] 03-git-workflow.md  — Has commit format + PR guidelines
    [ ] 04-testing-standards.md — Has test structure + coverage goals
```

### Content Quality Check

```
FOR EACH knowledge folder:
  [ ] 00-index.md TOC matches actual sub-files (no phantom links)
  [ ] All cross-reference links point to existing files
  [ ] No sub-file exceeds ~300 lines (split if needed)
  [ ] No sub-file is < 20 lines of real content (merge if too thin)
  [ ] Evidence Sources section present in every sub-file
  [ ] No placeholder text in any file
  [ ] Professional English tone throughout
  [ ] Mermaid diagrams (if used) are syntactically valid
```

> **Minimum total**: 5 folders x (1 index + 4-5 sub-files) = **26 files**
> **Large projects**: May have additional sub-files (30-40+ files total)

---

## COMPLETION

Report status:

```markdown
## Docs-Core Complete

### Deliverables
| # | Folder | Sub-Files | Mode | Status |
|---|--------|-----------|------|--------|
| 1 | knowledge-overview/ | 00-index + {N} | CREATE/UPDATE | Done |
| 2 | knowledge-architecture/ | 00-index + {N} | CREATE/UPDATE | Done |
| 3 | knowledge-domain/ | 00-index + {N} | CREATE/UPDATE | Done |
| 4 | knowledge-source-base/ | 00-index + {N} | CREATE/UPDATE | Done |
| 5 | knowledge-standards/ | 00-index + {N} | CREATE/UPDATE | Done |

**Total files**: {count}
**Evidence files used**: {count from ledger}

### Quality Summary
- All content evidence-backed: Yes/No
- Placeholder-free: Yes/No
- Cross-references valid: Yes/No
- Onboarding-ready: Yes/No

### Next Steps
- /docs:business — Generate business documentation
- Review generated docs for project-specific nuance
```

1. **Complete** — All 5 knowledge folders created with evidence-backed sub-files
2. **Incomplete** — List missing folders/files with reason
3. **Continue** -> `/docs:business` for business documentation
