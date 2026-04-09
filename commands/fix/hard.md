---
schema-version: "1.0"
description: ⚡⚡⚡ Full Fix — Complete issue resolution with research
version: "1.0"
category: debugging
execution-mode: execute
topology: pipeline
---

# /fix:hard — Complete Issue Resolution

> **MISSION**: Full resolution workflow with research, planning, and validation.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. RUNTIME.md — Identity, Laws, Routing, Phase Execution, Agent Protocol

**LOAD on-demand** (when entering relevant phase):
- `VALIDATION-GATES.md` — Phase gates block progression until exit criteria pass
- `AGENT-JOURNALS.md` — Agents record decisions/observations inline (max 3/phase)
- `CONDITIONAL-HANDOFFS.md` — Guard expressions route work dynamically on errors/complexity

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS-LITE.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 EXECUTION MODEL

| Tier | When | Action |
|------|------|--------|
| **EMBODY**    | Agent category = meta/execution/investigation/support | EMBODY — shared context, continuity critical |
| **SUB-AGENT** | Agent category = validation/research + tool exists     | SUB-AGENT with Context Briefing — independence |

**❌ Anti-Lazy**: Never use SUB-AGENT for context-dependent agents. Never skip Context Briefing or Anti-Bias Protocol.

---

## 📁 DELIVERABLE FILES

| Agent | Output |
|-------|--------|
| debugger | `./reports/{topic}/debugs/DEBUG-{issue}` |
| researcher | `./reports/{topic}/researchers/RESEARCH-{issue}` |

All files in `./reports/{topic}/` → English only.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing). Format: rules/RUNTIME.md § Phase output structure.

---

## 🎭 Phase 1: DEEP ANALYSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Full root cause analysis |
| Exit | Root cause identified, impact assessed, failure chain documented |

---

## 🎭 Phase 2: RESEARCH

| Agent | `researcher` |
|-------|--------------|
| Goal | Research solution patterns |
| Exit | Solutions researched, best approach identified |

---

## 🎭 Phase 3: FIX PLANNING

| Agent | `planner` |
|-------|-----------|
| Goal | Create fix strategy with rollback |
| Exit | Plan created, rollback included |

---

## 🎭 Phase 4: IMPLEMENTATION

| Agent | `tech-lead` → specialists |
|-------|---------------------------|
| Goal | Execute fix plan |
| Exit | Fix implemented, changes documented |

---

## 🎭 Phase 5: VALIDATION

| Agent | `tester` |
|-------|----------|
| Goal | Comprehensive validation |
| Exit | Issue resolved, tests pass, no regression |

---

## 🎭 Phase 5.5: ROLLBACK VERIFICATION (IF CRITICAL)

| Agent | `devops-engineer` |
|-------|-------------------|
| Trigger | Fix affects production or is critical |
| Goal | Verify rollback plan |
| Exit | Rollback documented, tested, recovery time estimated |

---

## COMPLETION

Present fix report with:

1. ✅ **Fixed** — Issue resolved
2. 🧪 **Test** → `/test`
3. 📝 **Docs** → `/docs:core`
