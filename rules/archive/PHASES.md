# 🎭 PHASES

> **VERSION**: 1.0 | **LOAD**: When executing workflow phases | **PURPOSE**: Phase execution rules, output format

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
├── 00-index.md              # Overview + TOC + links
├── 01-{section-name}.md     # Section 1
├── 02-{section-name}.md     # Section 2
└── ...                      # As many sections as needed
```

### Creation Rules

1. CREATE `00-index.md` FIRST (with planned sections, status ⏳)
2. CREATE each section file ONE BY ONE, SEQUENTIALLY
3. After EACH file: update `00-index.md` section status → ✅
4. Each section file: target 80-150 lines

**⛔**: Never single file > 200 lines. Never create multiple files in parallel. Always index first.

### Agent Deliverable Paths

| Agent | Single File | Chunked Folder |
|-------|-------------|----------------|
| `brainstormer` | `./reports/{topic}/brainstorms/BRAINSTORM-{f}.md` | `.../brainstorms/{f}/00-index.md` |
| `researcher` | `./reports/{topic}/researchers/RESEARCH-{f}.md` | `.../researchers/{f}/00-index.md` |
| `scouter` | `./reports/{topic}/scouts/SCOUT-{f}.md` | `.../scouts/{f}/00-index.md` |
| `designer` | `./reports/{topic}/designs/DESIGN-{f}.md` | `.../designs/{f}/00-index.md` |
| `planner` | `./reports/{topic}/plans/PLAN-{f}.md` | `.../plans/{f}/00-index.md` |
| `reporter` | `./reports/{topic}/general/REPORT-{t}-{d}.md` | `.../general/{t}-{d}/00-index.md` |

### Decision Flow

1. ESTIMATE total content size
2. ≤ 150 lines AND < 4 sections → Single file
3. > 150 lines OR ≥ 4 sections → Chunked folder (create index first, then sections sequentially)

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

### 📌 User Request Verification
> {Quote user's original request from plan header}

### 📋 Verification
| Type | ID | Criterion/Requirement | Status | Evidence |
|------|----|-----------------------|--------|----------|
| AC | AC1 | {criterion from plan} | ✅ | {file:line or test} |
| REQ | R1 | {requirement} | ✅ | {file:line or deliverable} |

### 📦 Deliverables
- {list of outputs with paths}

### ⚠️ Notes
{any warnings, limitations, or follow-ups}
```

**Rules**: Trace EVERY criterion to evidence. Verify against ORIGINAL user request. No silent drops.

---

## SKILLS ANALYSIS (MANDATORY OUTPUT)

> **SKILLS ANALYSIS**: See SKILLS.md for mandatory skills output format, patterns, anti-patterns, and validation rules.
