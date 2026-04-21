# 🎭 PHASES

> **LOAD**: When running workflow phases | **PURPOSE**: Phase execution protocol

---

## REQUIREMENTS INTAKE (Before Phase 1)

### Parse ALL requirements into Registry

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | {H/M/L} | ⏳ |
| R2 | {extracted} | {H/M/L} | ⏳ |
```

**Rule**: 100% fidelity — extract EVERY requirement, no assumptions, no omissions.

---

## PHASE OUTPUT FORMAT (SINGLE SOURCE OF TRUTH)

**⛔ This is the ONLY place phase output is defined. All other files reference here.**

### Emit progressively as you go:

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1 only
### Embodying: `{agent}` — {role}     ← TIER 2 only

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

**Rules**:
- TIER 1 → "Sub-agent" line | TIER 2 → "Embodying" line (never both)
- Emit phase start **before** work, exit criteria **after**
- Continue to next phase immediately (same reply)

---

## 🔺 GOLDEN TRIANGLE PHASE OUTPUT FORMAT (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol.
> When a workflow uses `:team` variant, replace the standard phase format above with this format.
> Each phase spawns exactly **3 agents**: Tech Lead + Executor + Reviewer.

### Emit progressively:

```markdown
## 🎭 Phase {N}: {name} — 🔺 GOLDEN TRIANGLE

### 🔺 Triangle Assignment
| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `{agent}` | {coordination mission} |
| Executor | `{agent}` | {implementation mission} |
| Reviewer | `{agent}` | {review mission} |

### 📋 Shared Task List
| # | Task | Owner | Status | Round |
|---|------|-------|--------|-------|
| 1 | {task} | `{executor}` | ✅/🔄/⏳ | 1/3 |

### 📬 Mailbox Exchanges (key entries from ./reports/{topic}/MAILBOX-{date}.md)
| # | From → To | Type | Summary |
|---|-----------|------|---------|
| 1 | Tech Lead → Executor | TASK_ASSIGNMENT | {summary} |
| 2 | Executor → Reviewer | SUBMISSION | {summary} |
| 3 | Reviewer → Executor | REVIEW (PASS/FAIL) | {summary} |
| 4 | Executor → Reviewer | DEFENSE/RESUBMISSION | {summary} |
| 5 | Tech Lead → ALL | DECISION | {summary} |

### 🔄 Debate Summary (if any)
- **Rounds used**: {N}/3
- **Key disputes**: {brief}
- **Resolution**: {PASS / Tech Lead arbitration}

### ✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ Phase {N} complete — Golden Triangle released
**Deliverable**: {summary}
```

**Rules**:
- Team phases use Golden Triangle format; non-team phases use standard format
- ALWAYS exactly 3 agents per phase (Tech Lead + Executor + Reviewer)
- Tech Lead decomposes → Executor implements → Reviewer critiques → Debate → Consensus
- Mailbox (`./reports/{topic}/MAILBOX-{date}.md`) captures ALL inter-agent communication
- Maximum 3 debate rounds per task — then Tech Lead arbitrates
- Output released ONLY with explicit consensus stamp: `✅ CONSENSUS: X ✓ | Y ✓ | Z ✓`
- NO phase can complete without all 3 agents confirming

---

## PHASE EXECUTION RULES

### One Phase at a Time (No Batching)

```
FOR Phase N:
  1. EMIT "## 🎭 Phase N: {name}"
  2. LOAD only what Phase N needs (agent file, prior deliverables)
  3. DELEGATE via TIERED EXECUTION
  4. EMIT exit criteria + completion
  5. Write deliverable file if required → Apply DELIVERABLE SIZE MANAGEMENT below
  6. CONTINUE to Phase N+1 (do not stop)
```

**⛔ Forbidden**: Loading agents for Phase 2, 3, ... while in Phase 1

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

### Allowed Loads Per Phase

```
⛔ FORBIDDEN: Loading Phase 2's agents while in Phase 1
✅ ALLOWED: Load only what current phase needs
✅ ALLOWED: Read prior deliverables as input
```

---

## DELIVERABLE SIZE MANAGEMENT (Chunked Strategy)

> **PURPOSE**: Prevent network errors from oversized file creation.
> Large single-file deliverables cause subagent output limits / timeout failures.

### Size Thresholds

| Estimated Size | Strategy |
|----------------|----------|
| ≤ 150 lines | **Single file** — standard path (e.g. `PLAN-{feature}.md`) |
| > 150 lines OR ≥ 4 major sections | **Chunked** — split into folder with index |

### Chunked Deliverable Structure

```
./reports/{topic}/{type}/{feature}/
├── 00-index.md              # Overview + table of contents + links
├── 01-{section-name}.md     # Section 1
├── 02-{section-name}.md     # Section 2
├── 03-{section-name}.md     # Section 3
└── ...                      # As many sections as needed
```

### 00-index.md Template

```markdown
# {Deliverable Title}

> **Date**: YYYY-MM-DD
> **Type**: {Brainstorm/Research/Scout/Design/Plan/Report}
> **Author**: `agent:{agent-name}`
> **Status**: Complete / In-Progress

## 📊 Executive Summary
{2-3 sentence overview}

## 📂 Sections
| # | File | Description | Status |
|---|------|-------------|--------|
| 1 | [01-{name}.md](./01-{name}.md) | {description} | ✅ |
| 2 | [02-{name}.md](./02-{name}.md) | {description} | ✅ |
| 3 | [03-{name}.md](./03-{name}.md) | {description} | ✅ |

## 🔑 Key Findings / Decisions
{Top 3-5 bullet points distilled from all sections}
```

### Creation Rules (MANDATORY)

```
WHEN creating chunked deliverable:
  1. CREATE 00-index.md FIRST (with planned sections, status ⏳)
  2. CREATE each section file ONE BY ONE, SEQUENTIALLY
  3. After EACH file: update 00-index.md section status → ✅
  4. NEVER create all files in a single tool call / parallel batch
  5. Each section file: target 80-150 lines (manageable chunks)

  ⛔ NEVER create a single file > 200 lines
  ⛔ NEVER create multiple files in parallel (causes race conditions)
  ✅ ALWAYS create index first, then sections sequentially
  ✅ ALWAYS keep individual files under 150 lines
```

### Applying to Each Agent Type

| Agent | Single File Path | Chunked Folder Path |
|-------|------------------|---------------------|
| `brainstormer` | `./reports/{topic}/brainstorms/BRAINSTORM-{f}.md` | `./reports/{topic}/brainstorms/{f}/00-index.md` |
| `researcher` | `./reports/{topic}/researchers/RESEARCH-{f}.md` | `./reports/{topic}/researchers/{f}/00-index.md` |
| `scouter` | `./reports/{topic}/scouts/SCOUT-{f}.md` | `./reports/{topic}/scouts/{f}/00-index.md` |
| `designer` | `./reports/{topic}/designs/DESIGN-{f}.md` | `./reports/{topic}/designs/{f}/00-index.md` |
| `planner` | `./reports/{topic}/plans/PLAN-{f}.md` | `./reports/{topic}/plans/{f}/00-index.md` |
| `reporter` | `./reports/{topic}/general/REPORT-{t}-{d}.md` | `./reports/{topic}/general/{t}-{d}/00-index.md` |

### Decision Flow

```
BEFORE creating deliverable:
  1. ESTIMATE total content size (line count, section count)
  2. IF ≤ 150 lines AND < 4 sections → Single file
  3. IF > 150 lines OR ≥ 4 sections → Chunked folder
  4. IF unsure → Default to chunked (safer)

DURING creation:
  1. Create 00-index.md with section plan
  2. Create section 01 → verify success
  3. Create section 02 → verify success
  4. ... repeat until all sections done
  5. Final update to 00-index.md (all statuses ✅)
```

---

## EXIT CRITERIA VERIFICATION

Before moving to next phase, verify:

```
□ Deliverable produced (single file OR chunked folder with 00-index.md)
□ Output matches agent's format
□ All exit criteria met
□ No scope creep
□ IF chunked: all section files created and 00-index.md updated
```

---

## WORKFLOW COMPLETION

After last phase:

```markdown
## ✅ Workflow Complete

### � User Request Verification
> {Quote user's original request from plan header}

### 📋 Acceptance Criteria Verification
| ID | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC1 | {criterion from plan} | ✅ | {file:line or test} |
| AC2 | {criterion from plan} | ✅ | {proof of implementation} |

### 📋 Requirements Verification  
| ID | Requirement | Status | Evidence |
|----|-------------|--------|----------|
| R1 | {req} | ✅ | {file:line or deliverable} |
| R2 | {req} | ✅ | {proof of implementation} |

### 📦 Deliverables
- {list of outputs with paths}

### ⚠️ Notes
{any warnings, limitations, or follow-ups}
```

**Rules**: 
- Trace EVERY acceptance criterion to evidence
- Verify against ORIGINAL user request (not interpreted version)
- No silent drops

---

## SKILLS ANALYSIS (MANDATORY OUTPUT)

**⛔ You MUST output skills decision for every phase delegation.**

### Simple task:
```
🎯 Skills Analysis: Simple → Skipping (base knowledge sufficient)
```

### Complex task:
```
🎯 Skills Analysis: Complex → Using `skill1`, `skill2`
```

**🚫 Silent skipping is FORBIDDEN**

### ⛔ ANTI-PATTERNS (FORBIDDEN)

```
❌ 🎯 Skills Analysis: Complex → Using base knowledge (...)
❌ 🎯 Skills Analysis: Complex → Using base knowledge (HTML/CSS/JS UI templates)
❌ 🎯 Skills Analysis: Complex → Using base knowledge (CSS architecture, theme systems)
❌ 🎯 Skills Analysis: Complex → Skipping (base knowledge sufficient)
```

**If task is Complex, "base knowledge" is NEVER an acceptable resolution.**

### ✅ CORRECT PATTERNS

```
✅ 🎯 Skills Analysis: Simple → Skipping (base knowledge sufficient)
✅ 🎯 Skills Analysis: Complex → Using `angular-architect`, `api-patterns`
✅ 🎯 Skills Analysis: Complex → No matching skills found → Discovery triggered
✅ 🎯 Skills Analysis: Complex → No skills after discovery → Proceeding with gap report
```

### Validation Rule

```
BEFORE emitting Skills Analysis:
  IF complexity == Complex:
    □ Did I scan ~/.{TOOL}/skills/agent-assistant/matrix-skills/*.yaml? → Required
    □ Did I read matched SKILL.md files? → Required
    □ Am I referencing REAL skill IDs? → Required
    □ Am I defaulting to "base knowledge"? → ⛔ VIOLATION — re-run resolution
```
