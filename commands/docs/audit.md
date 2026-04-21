---
description: "Audit Docs - Generate 4 audit folders with structured sub-files"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs:audit - Security & Compliance Audit Documentation (Folder-Based)

> **MISSION**: Generate or update **ALL 4 audit folders**, each with `00-index.md` + numbered sub-files. Output must be evidence-backed, traceable, scored, and actionable for security, compliance, and engineering teams.

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

## DELIVERABLES - FOLDER-BASED AUDIT SYSTEM

> [!CAUTION]
> **MUST CREATE OR UPDATE ALL 4 FOLDERS** with `00-index.md` and sub-files. Incomplete = FAILED execution.

> **DOCUMENT LANGUAGE - NON-NEGOTIABLE**
> Every file under `./documents/` must be written in **English only**. Do not use the user's language for file content. (CORE LAW 6.)

### Folder Structure

```
./documents/audit/
  audit-security/
    00-index.md
    01-attack-surface.md
    02-vulnerability-findings.md
    03-owasp-assessment.md
    04-risk-summary.md

  audit-compliance/
    00-index.md
    01-control-inventory.md
    02-framework-mapping.md
    03-gap-register.md
    04-evidence-state.md

  audit-dataflow/
    00-index.md
    01-trust-boundaries.md
    02-data-flow-map.md
    03-sensitive-data-inventory.md
    04-privacy-posture.md

  audit-recommendations/
    00-index.md
    01-critical-remediations.md
    02-high-priority-improvements.md
    03-medium-low-enhancements.md
    04-score-uplift-plan.md
```

**Minimum total**: 4 folders x (1 index + 4 sub-files) = **20 files minimum**.

### `00-index.md` Pattern (MANDATORY)

Every audit folder `00-index.md` MUST include:

1. Quick summary (2-3 paragraphs)
2. Strict score section (numeric score, grade band, confidence, blockers)
3. Sub-files table with descriptions
4. Key findings for that area
5. Cross-references to related audit/core folders
6. Known Gaps and Open Questions

```markdown
# {Audit Area}

> **Purpose**: {one-line purpose}
> **Sub-files**: {count}
> **Last Updated**: {YYYY-MM-DD}
> **Score**: {numeric}/100 | **Grade**: {A-F} | **Confidence**: {High/Medium/Low}

## Quick Summary
{2-3 paragraphs}

## Strict Score
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| ... | .../100 | ...% | ... |

**Grade Band**: {grade} | **Confidence**: {level}
**Score Caps Applied**: {Yes/No + reason}
**What Would Raise the Score**: {concrete actions}

## Sub-Files
| File | Description |
|------|-------------|
| [01-...](./01-...md) | ... |

## Key Findings
| Finding ID | Severity | Summary | Status |
|------------|----------|---------|--------|
| SEC-001 | Critical/High/Medium/Low | ... | Verified/Partial/Unknown |

## Cross-References
- [audit-compliance](../audit-compliance/00-index.md)
- [knowledge-architecture](../knowledge-architecture/00-index.md)

## Known Gaps and Open Questions
- ...
```

### Finding ID System (MANDATORY)

All findings across folders MUST use a consistent ID scheme:

| Prefix | Area | Example |
|--------|------|---------|
| `SEC-` | Security findings | SEC-001, SEC-002 |
| `CMP-` | Compliance gaps | CMP-001, CMP-002 |
| `DFL-` | Data flow issues | DFL-001, DFL-002 |
| `REM-` | Remediation items | REM-001, REM-002 |

Cross-folder rules:
- Same finding referenced in multiple folders MUST use the same ID
- Same severity MUST be assigned to the same finding across folders
- `audit-recommendations/` MUST reference finding IDs from the other 3 folders

### Evidence Discipline (MANDATORY)

Every major claim in every sub-file MUST be backed by evidence:
- Tag claims as: `Verified` (direct evidence), `Partial` (incomplete evidence), `Unknown` (no evidence)
- Include file paths with line anchors where feasible: `path/to/file.ts#L42`
- If confidence is low, state it explicitly
- Never infer a control as Verified without direct repository evidence
- Never leave unresolved placeholders (`{...}`, `TODO`, `TBD`) in final documents

---

## INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5.

---

## Phase 1: AUDIT RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Map attack surface, data flows, security-sensitive areas, and existing audit state |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] - Requires logged system error justification.

### Required Work

1. Detect current audit docs state (folder-level mode per area):
   - `./documents/audit/audit-security/`
   - `./documents/audit/audit-compliance/`
   - `./documents/audit/audit-dataflow/`
   - `./documents/audit/audit-recommendations/`

   Mode rules:
   - Folder exists with sub-files -> UPDATE
   - Flat file exists (legacy `audit-*.md`) -> MIGRATE
   - Neither exists -> CREATE

2. Run hybrid reconnaissance across security surfaces:
   - Bootstrap scan using `skills/docs-audit/scripts/scan-audit-surface.sh` (if available)
   - Targeted search for auth, session, crypto, validation, config, dependency, CI/CD surfaces
   - Direct reads of high-value files (manifests, lockfiles, middleware, routes, auth, config)
   - Evidence cross-check against existing audit docs if present

3. Signal precision rules:
   - Exclude vendor/generated noise: `node_modules`, `dist`, `build`, `coverage`, `.next`, `.turbo`
   - Do not treat marketing/UI keyword matches as controls without code-path evidence
   - Classify test/demo/sample hits as `Contextual` - do not score as production risk
   - For polyglot repos, produce language-aware evidence slices

4. Catalog findings:
   - Authentication and authorization surfaces
   - Input validation and sanitization points
   - Cryptographic usage and key management
   - Data flow paths and trust boundaries
   - Sensitive data handling (PII, secrets, tokens)
   - Dependency risk posture
   - CI/CD and deployment security
   - Logging, monitoring, and audit trail coverage

5. Build Audit Evidence Ledger with file-level references.

### Mandatory Output

```markdown
## Audit Reconnaissance Report

### Execution Plan
| Audit Area | Mode | Notes |
|------------|------|-------|
| audit-security/ | CREATE/UPDATE/MIGRATE | {note} |
| audit-compliance/ | CREATE/UPDATE/MIGRATE | {note} |
| audit-dataflow/ | CREATE/UPDATE/MIGRATE | {note} |
| audit-recommendations/ | CREATE/UPDATE/MIGRATE | {note} |

### Attack Surface Map
| Surface | Entry Points | Risk Level | Evidence |
|---------|-------------|------------|----------|
| {surface} | {endpoints/files} | Critical/High/Medium/Low | {path} |

### Security Controls Detected
| Control | Type | Coverage | Evidence |
|---------|------|----------|----------|
| {control} | Auth/Validation/Crypto/... | Full/Partial/None | {path} |

### Data Flow Candidates
| Flow | Source | Destination | Sensitive Data | Evidence |
|------|--------|-------------|----------------|----------|
| {flow} | {source} | {dest} | Yes/No | {path} |

### Dependency Risk Posture
| Package Manager | Total Deps | Known Vulns | Lock File | Evidence |
|----------------|------------|-------------|-----------|----------|
| {manager} | {count} | {count} | Yes/No | {path} |

### Audit Evidence Ledger
| Claim Area | Evidence Files | Confidence |
|------------|----------------|------------|
| Security Controls | {paths} | High/Medium/Low |
| Compliance Signals | {paths} | High/Medium/Low |
| Data Flow | {paths} | High/Medium/Low |
| Privacy Posture | {paths} | High/Medium/Low |
| Remediation Basis | {paths} | High/Medium/Low |
```

### Exit Criteria

- [ ] CREATE/UPDATE/MIGRATE mode detected per audit area
- [ ] Attack surface mapped with evidence
- [ ] Security controls cataloged
- [ ] Data flow candidates identified
- [ ] Dependency risk posture assessed
- [ ] Audit Evidence Ledger complete

---

## Phase 2: DEEP SECURITY ANALYSIS

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Deep vulnerability analysis, OWASP assessment, risk scoring, compliance mapping |
| **Skill** | Load `skills/docs-audit/SKILL.md` |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] - Requires logged system error justification.

### Required Work

1. Deep vulnerability analysis:
   - Assign finding IDs (SEC-xxx) to each vulnerability
   - Classify severity: Critical / High / Medium / Low / Informational
   - Determine blast radius and exploitability
   - Map to OWASP Top 10 and CWE Top 25

2. OWASP assessment:
   - Systematic check against OWASP Top 10 categories
   - OWASP ASVS verification levels where applicable
   - Evidence-backed status per category: Verified / Partial / Gap / Unknown

3. Compliance mapping:
   - Map controls to NIST CSF, CIS, ISO 27001 themes
   - Identify GDPR/privacy obligations where relevant
   - Build control coverage matrix with evidence state

4. Risk scoring per finding:
   - Likelihood x Impact matrix
   - Business context consideration
   - Score caps for blocking issues

5. Audit Thinking Protocol (per finding):
   - What evidence supports this claim?
   - Is this verified, probable, or unknown?
   - What is the blast radius?
   - Which framework reference is relevant?
   - What would a skeptical reviewer challenge?

### Mandatory Output

```markdown
## Deep Security Analysis

### Findings Register
| ID | Title | Severity | OWASP | CWE | Status | Evidence |
|----|-------|----------|-------|-----|--------|----------|
| SEC-001 | {title} | Critical | A01 | CWE-xxx | Verified | {path} |

### OWASP Top 10 Assessment
| Category | Status | Findings | Evidence |
|----------|--------|----------|----------|
| A01: Broken Access Control | Verified/Partial/Gap/Unknown | SEC-xxx | {paths} |

### Compliance Control Matrix
| Control Theme | NIST CSF | CIS | ISO 27001 | Status | Evidence |
|---------------|----------|-----|-----------|--------|----------|
| {theme} | {function} | {control} | {annex} | Verified/Partial/Gap | {path} |

### Risk Matrix
| Finding | Likelihood | Impact | Risk Level | Blast Radius |
|---------|-----------|--------|------------|--------------|
| SEC-001 | High/Med/Low | High/Med/Low | Critical/High/Med/Low | {scope} |

### Privacy and Data Protection
| Obligation | Applicability | Status | Evidence | Gap |
|------------|--------------|--------|----------|-----|
| {GDPR article / privacy principle} | Yes/No/Possible | Met/Partial/Unmet | {path} | {gap} |
```

### Exit Criteria

- [ ] All findings assigned IDs and severity
- [ ] OWASP Top 10 assessment complete
- [ ] Compliance control matrix built
- [ ] Risk matrix with likelihood x impact
- [ ] Privacy obligations assessed
- [ ] Evidence backs every claim

---

## Phase 3: GENERATE AUDIT FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Generate or update all 4 audit folders in English only |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `docs-manager`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/docs-manager.md`
> EMBODY [docs-manager] - Requires logged system error justification.

### Thinking Protocol (MANDATORY - Run BEFORE Writing Each Sub-File)

For each sub-file, THINK before writing:

1. What evidence from Phase 1/2 supports this file's content?
2. Is every finding backed by the Audit Evidence Ledger?
3. Are finding IDs consistent with Phase 2's Findings Register?
4. Am I writing verified facts or speculation? Tag uncertainty explicitly.
5. Would a security reviewer accept this as rigorous evidence?

### Writing Protocol (MANDATORY)

For each audit folder:

1. If UPDATE mode:
   - Read all existing sub-files fully
   - Preserve accurate sections
   - Append missing and revise stale sections
   - Add update footer: `> Last updated: {date} - {summary}` to touched files
2. If MIGRATE mode (legacy flat file exists):
   - Read existing flat file fully - preserve all valid content
   - Create folder with `00-index.md` + sub-files
   - Distribute content into appropriate sub-files
   - Add migration note: `> Migrated from flat file: {date}`
   - Delete or archive legacy flat file after migration
3. If CREATE mode:
   - Create folder
   - Write `00-index.md` first (with score section)
   - Write `01-...`, `02-...` sub-files sequentially
4. Include `## Evidence Sources` in every sub-file
5. Include `## Known Gaps and Open Questions` in every `00-index.md`
6. Include strict score section in every `00-index.md`
7. No placeholders: `TODO`, `TBD`, `{placeholder}`, `fill in later`

### Per-Folder Content Requirements

#### `audit-security/`
- `00-index.md`: summary, strict score, TOC, key findings, cross-refs, gaps
- `01-attack-surface.md`: entry points, exposed interfaces, external dependencies, trust boundaries at ingress
- `02-vulnerability-findings.md`: findings register with IDs (SEC-xxx), severity, evidence, blast radius, exploitability
- `03-owasp-assessment.md`: systematic OWASP Top 10 check, ASVS mapping, per-category status with evidence
- `04-risk-summary.md`: risk matrix (likelihood x impact), aggregate risk posture, business context, risk acceptance criteria

#### `audit-compliance/`
- `00-index.md`: summary, strict score, TOC, key findings, cross-refs, gaps
- `01-control-inventory.md`: all detected controls with type, owner, evidence, and coverage status
- `02-framework-mapping.md`: mapping to OWASP, NIST CSF, CIS, ISO 27001, GDPR with evidence state per control
- `03-gap-register.md`: compliance gaps with IDs (CMP-xxx), severity, affected frameworks, remediation pointers
- `04-evidence-state.md`: evidence completeness per control area, confidence levels, verification methodology

#### `audit-dataflow/`
- `00-index.md`: summary, strict score, TOC, key findings, cross-refs, gaps
- `01-trust-boundaries.md`: trust boundary definitions, boundary crossings, authentication at boundaries
- `02-data-flow-map.md`: data flow diagrams (Mermaid), system-to-system flows, API communication paths
- `03-sensitive-data-inventory.md`: PII/secrets/tokens inventory, storage locations, encryption state, retention posture
- `04-privacy-posture.md`: GDPR/privacy compliance, consent mechanisms, data subject rights, DPO considerations

#### `audit-recommendations/`
- `00-index.md`: summary, strict score, TOC, key findings, cross-refs, gaps
- `01-critical-remediations.md`: Critical/High severity fixes with finding IDs, implementation steps, effort estimates
- `02-high-priority-improvements.md`: Medium severity improvements, architectural recommendations, dependency updates
- `03-medium-low-enhancements.md`: Low/Informational items, hardening opportunities, best-practice alignments
- `04-score-uplift-plan.md`: projected score improvements per action, prioritized by impact-to-effort ratio, timeline

### Scoring Integration (MANDATORY)

Use the rubric in `skills/docs-audit/references/scoring-framework.md` for every `00-index.md`:
- Include numeric score, grade band, confidence, blockers, and rationale
- Apply score caps when blocking issues exist (any file below 50 caps overall at D)
- Summarize what would raise the score next

### Exit Criteria

- [ ] `audit-security/` complete (`00-index.md` + 4 sub-files)
- [ ] `audit-compliance/` complete (`00-index.md` + 4 sub-files)
- [ ] `audit-dataflow/` complete (`00-index.md` + 4 sub-files)
- [ ] `audit-recommendations/` complete (`00-index.md` + 4 sub-files)
- [ ] Each sub-file includes Evidence Sources
- [ ] Each `00-index.md` includes strict score section
- [ ] Finding IDs consistent across folders
- [ ] No placeholders remain

---

## Phase 4: FRAMEWORK MAPPING AND SCORING

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Validate framework mappings, finalize scoring, ensure cross-folder consistency |
| **Skill** | Load `skills/docs-audit/references/framework-mapping.md` and `skills/docs-audit/references/scoring-framework.md` |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] - Requires logged system error justification.

### Required Work

1. Validate framework mappings in `audit-compliance/02-framework-mapping.md`:
   - OWASP Top 10 and ASVS
   - CWE Top 25
   - NIST CSF functions
   - CIS Secure Software practices
   - ISO 27001 Annex A themes
   - GDPR/privacy principles where relevant

2. Finalize scoring across all 4 folders:
   - Verify score dimensions and weights per folder
   - Apply weighted roll-up for overall audit maturity
   - Apply score caps (blocking issues, low confidence)
   - Document what would raise each score

3. Cross-folder finding consistency:
   - Same finding ID = same severity everywhere
   - Recommendations reference correct finding IDs
   - No orphaned IDs (every finding in security/compliance/dataflow has a recommendation)

4. Mapping rules:
   - Distinguish Verified evidence, Partial coverage, Unknown areas, Non-applicable controls
   - Do not claim certification or formal compliance
   - Do not convert coding signals into legal conclusions
   - If mapping is uncertain, mark Unknown and list the evidence gap

### Exit Criteria

- [ ] Framework mappings validated
- [ ] Scoring finalized with weighted roll-up
- [ ] Score caps applied where needed
- [ ] Cross-folder finding IDs consistent
- [ ] No orphaned finding IDs

---

## Phase 5: CONSISTENCY AND QUALITY REVIEW

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` |
| **Goal** | Validate cross-folder consistency, evidence integrity, and production readiness |

### TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] - Requires logged system error justification.

### Consistency Matrix (MANDATORY)

```markdown
## Audit Docs Consistency Matrix
| Check | Security | Compliance | Dataflow | Recommendations | Status |
|-------|----------|------------|----------|-----------------|--------|
| Finding IDs consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Severity alignment | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Evidence sources present | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Score section present | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| No placeholders | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Framework refs consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Cross-refs valid | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| No contradictions | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
```

### Exit Criteria

- [ ] Cross-folder consistency verified
- [ ] Contradictions resolved
- [ ] Finding ID traceability intact
- [ ] Evidence integrity confirmed
- [ ] Production readiness confirmed

---

## VERIFICATION

Before completion, verify folder existence and quality:

### Folder Existence

```
./documents/audit/
  [ ] audit-security/         (00-index.md + 01~04)
  [ ] audit-compliance/       (00-index.md + 01~04)
  [ ] audit-dataflow/         (00-index.md + 01~04)
  [ ] audit-recommendations/  (00-index.md + 01~04)
```

### Quality Gates

For every audit folder and sub-file:

- [ ] English only
- [ ] Required sections present
- [ ] Evidence Sources section present with actual file paths
- [ ] `00-index.md` contains strict score section
- [ ] `00-index.md` contains Known Gaps and Open Questions
- [ ] No placeholder text
- [ ] Finding IDs present and correctly formatted
- [ ] Claims tagged as Verified/Partial/Unknown
- [ ] TOC links in every `00-index.md` match actual sub-files

### Cross-Folder Gates

- [ ] Finding IDs consistent across all 4 folders (SEC-xxx, CMP-xxx, DFL-xxx, REM-xxx)
- [ ] Same finding has same severity everywhere
- [ ] Every finding has a corresponding recommendation
- [ ] Framework mappings reference correct finding IDs
- [ ] Scoring weights match `skills/docs-audit/references/scoring-framework.md`
- [ ] Overall weighted roll-up calculated correctly

### Per-Folder Quality Gates

- [ ] `audit-security/` contains attack-surface view and findings register
- [ ] `audit-compliance/` contains control-mapping table and gap register
- [ ] `audit-dataflow/` contains data-flow diagram (Mermaid) and trust-boundary definitions
- [ ] `audit-recommendations/` contains prioritized remediation matrix and score uplift plan

---

## COMPLETION

Report status:

1. **Complete** - All 4 audit folders created/updated, scored, and consistency-validated
2. **Incomplete** - List missing folders/sub-files, failed quality gates, and blockers
3. **Continue** - Address critical findings from audit results

```markdown
## Audit Documentation Complete

| Folder | Files | Score | Grade | Status |
|--------|-------|-------|-------|--------|
| audit-security/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-compliance/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-dataflow/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-recommendations/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |

### Overall Audit Maturity
- **Weighted Score**: {score}/100
- **Grade**: {grade}
- **Confidence**: {High/Medium/Low}
- **Score Caps Applied**: {Yes/No + reasons}

### Integrity Notes
- Lowest-confidence area: {area + why}
- Cross-file consistency: {Pass/Fail}
- Orphaned finding IDs: {count}

### Highest-Priority Follow-Up
1. {action with finding ID}
2. {action with finding ID}
3. {action with finding ID}

**Total: 4 folders (20+ files) in `./documents/audit/`**
```
