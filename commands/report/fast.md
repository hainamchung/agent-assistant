---
schema-version: "1.0"
description: ⚡ Fast Report — Quick status updates and summaries
version: "1.0"
category: documentation
execution-mode: execute
topology: pipeline
---

# /report:fast — Quick Status Report

> **MISSION**: Generate concise, actionable status reports and summaries.
>
> Use for daily standups, progress checks, and high-level overviews.
> For **update existing files** or **generate from template**, use `/report:hard` or `/report:team`.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 EXECUTION MODEL

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **EMBODY**    | Agent category = meta/execution/investigation/support | EMBODY — shared context, continuity critical |
| **SUB-AGENT** | Agent category = validation/research + tool exists     | SUB-AGENT with Context Briefing — independence |

**❌ Anti-Lazy**: Never use SUB-AGENT for context-dependent agents. Never skip Context Briefing or Anti-Bias Protocol.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/RUNTIME.md § Phase output structure.

**Phase Dependencies**: P1 → P2 (sequential pipeline)

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
