---
description: ⚡ Fast Report — Quick status updates and summaries
version: "1.0"
category: documentation
execution-mode: execute
---

# /report:fast — Quick Status Report

> **MISSION**: Generate concise, actionable status reports and summaries.
>
> Use for daily standups, progress checks, and high-level overviews.
> For **update existing files** or **generate from template**, use `/report:hard` or `/report:team`.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/PHASES.md § Phase output structure.

---

## 🎭 Phase 1: INFORMATION GATHERING

| Agent | `reporter`                               |
| ----- | ---------------------------------------- |
| Goal  | Scan current state and recent activities |
| Exit  | Progress summarized, key sources scanned |

---

## 🎭 Phase 2: REPORT GENERATION

| Agent | `reporter`                                                                 |
| ----- | -------------------------------------------------------------------------- |
| Goal  | Infer intent; if **create report** → generate concise status report        |
| Exit  | Report with Summary, Key Changes, Next Steps — or recommend `/report:hard`/`/report:team` if user intent is update/template |

---

## COMPLETION

Present report:

1. ✅ **Report Ready** — Displayed in chat
2. 📄 **Save?** → If user wants to save: `./reports/{topic}/general/REPORT-status-{YYYY-MM-DD}`

**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.
