---
schema-version: "1.0"
name: resource-limits
version: "1.0"
severity: warning
applies-to: [all]
---

# Resource Limits Guardrail

## Purpose

Prevents runaway agent behavior: infinite loops, excessive file creation, unbounded terminal commands, and other resource abuse patterns that could waste context or damage the workspace.

## Rules

### Rule 1: File Creation Limit

- **Trigger**: Agent creates more than **20 files** in a single phase
- **Severity**: warning
- **Action**: **PAUSE** — stop file creation. Announce: "⚠️ GUARDRAIL: File creation limit (20/phase) reached. Review necessity before continuing." Resume only after explicit confirmation or consolidating outputs.
- **Examples**:
  - ⚠️ Generating 25 separate test files in one phase → PAUSE
  - ✅ Creating 5 source files + 3 test files → PROCEED

### Rule 2: Terminal Command Limit

- **Trigger**: Agent executes more than **30 terminal commands** in a single phase
- **Severity**: warning
- **Action**: **PAUSE** — stop execution. Announce: "⚠️ GUARDRAIL: Terminal command limit (30/phase) reached. Consolidate remaining operations." Resume after review.
- **Examples**:
  - ⚠️ Running 35 individual `grep` commands → PAUSE, suggest combined search
  - ✅ Running 10 focused commands → PROCEED

### Rule 3: Infinite Loop Detection

- **Trigger**: Agent performs the **same operation 3+ times** with identical inputs and outputs (e.g., retrying a failing command without changing approach, re-reading the same file repeatedly, generating then deleting the same content)
- **Severity**: warning
- **Action**: **HALT** — break the loop. Announce: "⚠️ GUARDRAIL: Repetitive operation detected ({operation} × {count}). Changing approach." Agent must try a different strategy or escalate.
- **Examples**:
  - ⚠️ Running `npm test` 4 times after same failure without code changes → HALT
  - ⚠️ Reading the same file 3 times in sequence → HALT
  - ✅ Retrying after making changes → PROCEED

### Rule 4: Output Size Guard

- **Trigger**: A single deliverable file exceeds **200 lines** (violating Deliverable Size Management rules)
- **Severity**: advisory
- **Action**: **FLAG** — warn and suggest chunking: "⚠️ GUARDRAIL: Output exceeds 200 lines. Split into chunked folder per RUNTIME.md §Deliverable Size Management."
- **Examples**:
  - ⚠️ Single PLAN file at 250 lines → FLAG, suggest folder structure
  - ✅ File at 140 lines → PROCEED

### Rule 5: Context Budget Awareness

- **Trigger**: Agent loads more than **5 rule files** in a single phase (risk of context overflow)
- **Severity**: advisory
- **Action**: **FLAG** — announce: "⚠️ GUARDRAIL: High rule file consumption ({count} files). Verify necessity per CONTEXT-BUDGET.md zone guidelines."
- **Examples**:
  - ⚠️ Loading 7 rule files for a simple fix → FLAG
  - ✅ Loading RUNTIME + TEAMS-LITE + golden-triangle for :team variant → PROCEED
