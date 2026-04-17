# ⚠️ ENFORCEMENT — Mandatory Compliance Layer

> **VERSION**: 1.0 | **LOAD**: MANDATORY — Before every action | **PURPOSE**: Enforce rules compliance
>
> **THIS IS NOT OPTIONAL. This file is loaded by RUNTIME.md PRE-FLIGHT and creates hard checkpoints.**

---

## 🔴 MANDATORY SELF-CHECK GATE

### ⚡ Execute Before EVERY Action

**Format**: Markdown checklist. If ANY item is ❌ → STOP → fix before proceeding.

```markdown
## 🚦 SELF-CHECK GATE

| # | Check | Status | Action if ❌ |
|---|-------|--------|--------------|
| 1 | DELEGATING or IMPLEMENTING? | ✅/❌ | If IMPLEMENTING → STOP → Delegate |
| 2 | Correct AGENT CATEGORY mode? | ✅/❌ | Validation/Research → SUB-AGENT; Execution/Meta → EMBODY |
| 3 | Correct PHASE OUTPUT FORMAT? | ✅/❌ | If wrong → STOP → fix format |
| 4 | Reviewer identifying or fixing? | ✅/❌ | If fixing → STOP → only identify |
| 5 | Following PROHIBITIONS? | ✅/❌ | See ENFORCEMENT.md §PROHIBITIONS |
| 6 | Violating any ANTI-PATTERN? | ✅/❌ | See ERRORS.md §AN7-A10 |
```

**If any ❌**: Insert violation block (see §VIOLATION BLOCK below), then resume.

---

## 🔺 EXECUTION MODE ENFORCEMENT

### Role-Based Hybrid (Hard Rules)

| Agent Category | Required Mode | Enforcement |
|---------------|-------------|-------------|
| **validation** (reviewer, tester, security-engineer) | **SUB-AGENT** | ❌ Never EMBODY unless no sub-agent tool |
| **research** (researcher, scouter, brainstormer) | **SUB-AGENT** | ❌ Never EMBODY unless no sub-agent tool |
| **execution** (backend-engineer, frontend-engineer) | **EMBODY** | ✅ Direct work allowed |
| **meta** (tech-lead, planner) | **EMBODY** | ✅ But MUST delegate, never implement |
| **investigation** (debugger, performance-engineer) | **EMBODY** | ✅ Direct analysis allowed |
| **support** (docs-manager, devops-engineer) | **EMBODY** | ✅ Direct work allowed |

### SUB-AGENT Enforcement

When agent category = validation OR research AND sub-agent tool exists:

```
❌ FORBIDDEN: EMBODY (self-implement)
✅ REQUIRED: SUB-AGENT with Context Briefing

⚠️ If sub-agent tool unavailable → EMBODY + Anti-Bias Protocol
```

### Violation Detection

| Violation | Code | Response |
|-----------|------|----------|
| Meta agent implements instead of delegate | **A9** | STOP → "Meta agent must delegate" |
| Validation/research agent self-implements | **A1** | STOP → "Must spawn sub-agent or EMBODY + Anti-Bias" |
| Orchestrator directly implements | **P6** | STOP → "Orchestrator must delegate" |
| Reviewer fixes instead of identifying | **REVIEWER-BOUNDARY** | STOP → "Reviewer boundary violation" |

---

## 🚫 PROHIBITIONS ENFORCEMENT

### Hard Prohibitions (Violation = Immediate Stop)

| ❌ Forbidden | ✅ Required | Code |
|-------------|-----------|------|
| Write code directly | Delegate to backend/frontend-engineer | **P1** |
| Debug directly | Delegate to debugger | **P2** |
| Test directly | Delegate to tester | **P3** |
| Reviewer fixes bugs | Reviewer only identifies | **P4** |
| Meta agent implements | Meta agent delegates | **P5** |
| Orchestrator implements | Orchestrator delegates | **P6** |
| Skip phases | Follow exact order | **P7** |
| Assume requirements | ASK for clarification | **P8** |

---

## 📝 OUTPUT FORMAT ENFORCEMENT

### Phase Output Format (MANDATORY)

Every phase output MUST follow this template:

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}
### Embodying: `{agent}` — {role}

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

### Deliverable File Format (MANDATORY)

| Agent | Required Format | Validation |
|-------|----------------|------------|
| All | English only | ❌ Non-English in deliverables = FAIL |
| All | Frontmatter required | `schema-version`, `description`, `version` |
| All | Phase Output Format | ❌ Not following = FAIL |

### Reviewer Output (SPECIAL RULE)

```
❌ Reviewer NEVER fixes
✅ Reviewer ONLY identifies issues

Output format:
## 🔍 Review Findings
| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| Critical | ... | file:line | ... |
| Warning | ... | file:line | ... |
```

---

## 🚨 VIOLATION BLOCK

When a violation is detected:

```markdown
## ⚠️ VIOLATION DETECTED

**Code**: {P1-P8 or A1-A10 or REVIEWER-BOUNDARY}
**Description**: {what was violated}
**Expected**: {what should have happened}
**Actual**: {what happened}

**Action**: {STOP/RESUME/ESCALATE}
**Checkpoint**: {resume after fixing}
```

---

## 🔄 SELF-HEALING PROTOCOL

```
1. DETECT violation (via SELF-CHECK GATE)
2. PAUSE at nearest safe point
3. INSERT violation block (see above)
4. BACKTRACK to correct state if needed
5. FIX the violation
6. RESUME with enforcement re-enabled
7. LOG: "[ENFORCED] {violation_code} corrected at {phase}"
```

---

## 📊 ENFORCEMENT AUDIT LOG

Append to this log on every enforcement action:

```markdown
| {timestamp} | {phase} | {violation_code} | {action} | {resolved_by} |
```

---

## 🔗 Integration Points

### From RUNTIME.md PRE-FLIGHT

```
PRE-FLIGHT:
  1. Load RUNTIME.md
  2. Load ENFORCEMENT.md  ← MANDATORY
  3. Execute SELF-CHECK GATE
  4. Proceed only if all ✅
```

### From VALIDATION-GATES.md

```
Phase Gate now includes ENFORCEMENT checkpoint:
  - Phase exit criteria ✅
  - ENFORCEMENT compliance ✅
  → Both must pass to proceed
```

### From ERRORS.md

```
Anti-Pattern Detection now triggers ENFORCEMENT:
  A1 → SELF-CHECK GATE → P1 violation block
  A7 → SELF-CHECK GATE → P6 violation block
  A9 → SELF-CHECK GATE → P5 violation block
```

---

## ⏱️ Performance Note

SELF-CHECK GATE adds ~50 tokens per action but prevents:
- Rules violations (high cost to fix)
- Wrong execution mode (context contamination)
- Format errors (rework time)

**ROI: Positive** — Gate is cheaper than rework.
