---
description: "📝 Docs - Full Documentation Suite (executes ALL sub-commands sequentially)"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs — Full Documentation Suite

> **MISSION**: Execute ALL documentation sub-commands **SEQUENTIALLY**. Only report "Done" when ALL deliverables are created: 5 knowledge folders (26+ files) + 4 business folders (22+ files) + 4 audit folders (20+ files).

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant (e.g. docs/core.md), and execute it.

---

## ⚠️ EXECUTION RULES (NON-NEGOTIABLE)

> [!CAUTION]
>
> 1. You MUST execute each sub-command **IN ORDER**
> 2. You MUST wait for each sub-command to **COMPLETE** before starting next
> 3. You MUST create ALL deliverables across 3 sub-commands
> 4. You may **NOT** skip any sub-command
> 5. Report "Done" **ONLY** when all deliverables exist

---

## 🔄 SEQUENTIAL EXECUTION FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: Load & Execute /docs:core                               │
│   → Wait until ALL 5 knowledge folders are created              │
│   → Each folder: 00-index.md + numbered sub-files               │
│   → Verify: knowledge-overview/, architecture/, domain/,        │
│   →         source-base/, standards/                            │
├─────────────────────────────────────────────────────────────────┤
│ STEP 2: Load & Execute /docs:business                           │
│   → Wait until ALL 4 business folders are created               │
│   → Verify: business-prd/, features/, workflows/, glossary/     │
├─────────────────────────────────────────────────────────────────┤
│ STEP 3: Load & Execute /docs:audit                              │
│   → Wait until ALL 4 audit folders are created                   │
│   → Verify: audit-security, compliance, dataflow,               │
│             recommendations                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## STEP 1: EXECUTE `/docs:core`

| Attribute       | Value                                             |
| --------------- | ------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs/core.md` |
| **Action**      | **LOAD AND FOLLOW** the entire core.md workflow   |

### Folders to be Created (v3.0 — folder-based):

- [ ] `./documents/knowledge-overview/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-architecture/` (00-index.md + 5 sub-files)
- [ ] `./documents/knowledge-domain/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-source-base/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-standards/` (00-index.md + 4 sub-files)

**⏸️ PAUSE HERE** — Do NOT proceed to Step 2 until all 5 knowledge folders with sub-files exist.

---

## STEP 2: EXECUTE `/docs:business`

| Attribute       | Value                                                 |
| --------------- | ----------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs/business.md` |
| **Action**      | **LOAD AND FOLLOW** the entire business.md workflow   |

### Folders to be Created (v4.0 — folder-based):

- [ ] `./documents/business/business-prd/` (00-index.md + 4 sub-files)
- [ ] `./documents/business/business-features/` (00-index.md + 5 sub-files)
- [ ] `./documents/business/business-workflows/` (00-index.md + 5 sub-files)
- [ ] `./documents/business/business-glossary/` (00-index.md + 4 sub-files)

**⏸️ PAUSE HERE** — Do NOT proceed to Step 3 until all 4 business folders with sub-files exist.

---

## STEP 3: EXECUTE `/docs:audit`

| Attribute       | Value                                              |
| --------------- | -------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs/audit.md` |
| **Action**      | **LOAD AND FOLLOW** the entire audit.md workflow   |

### Folders to be Created (v4.0 - folder-based):

- [ ] `./documents/audit/audit-security/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-compliance/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-dataflow/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-recommendations/` (00-index.md + 4 sub-files)

---

## ✅ FINAL VERIFICATION (REQUIRED)

Before reporting "Done", verify ALL deliverables exist:

```
./documents/
├── Core (5 folders, 26+ files)
│   ├── ✅ knowledge-overview/        (00-index + 01~04)
│   ├── ✅ knowledge-architecture/    (00-index + 01~05)
│   ├── ✅ knowledge-domain/          (00-index + 01~04)
│   ├── ✅ knowledge-source-base/     (00-index + 01~04)
│   └── ✅ knowledge-standards/       (00-index + 01~04)
├── Business (4 folders, 22+ files)
│   ├── ✅ business-prd/          (00-index + 01~04)
│   ├── ✅ business-features/     (00-index + 01~05)
│   ├── ✅ business-workflows/    (00-index + 01~05)
│   └── ✅ business-glossary/     (00-index + 01~04)
└── Audit (4 folders, 20+ files)
    ├── ✅ audit-security/         (00-index + 01~04)
    ├── ✅ audit-compliance/       (00-index + 01~04)
    ├── ✅ audit-dataflow/         (00-index + 01~04)
    └── ✅ audit-recommendations/  (00-index + 01~04)
```

---

## 📊 COMPLETION OUTPUT

Only output this when ALL deliverables are verified:

```markdown
## ✅ Full Documentation Suite Complete

### 📁 All Documents Created

| Type     | Deliverables                                                | Status   |
| -------- | ----------------------------------------------------------- | -------- |
| Core     | 5 knowledge folders (overview, architecture, domain, source-base, standards) | ✅ 5/5 folders |
| Business | 4 business folders (prd, features, workflows, glossary)     | ✅ 4/4 folders |
| Audit    | 4 audit folders (security, compliance, dataflow, recommendations) | ✅ 4/4 folders |

**Total: 13 folders (68+ files) created in `./documents/`**
```

---

## 🚫 FORBIDDEN

- ❌ Skipping any sub-command
- ❌ Creating partial deliverables and reporting "Done"
- ❌ Executing sub-commands in parallel (must be sequential)
- ❌ Reporting "Done" before all deliverables exist

---

## 📌 INDIVIDUAL ROUTES (Still Available)

If you need only ONE type:

| Route            | Deliverables Created                           |
| ---------------- | ---------------------------------------------- |
| `/docs:core`     | 5 knowledge folders with 00-index + sub-files  |
| `/docs:business` | 4 business folders with 00-index + sub-files  |
| `/docs:audit`    | 4 audit folders with 00-index + sub-files      |
