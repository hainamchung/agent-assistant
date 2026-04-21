# 📚 REFERENCE

> **PURPOSE**: Fast lookup tables

---

## COMMAND TABLE

| Command | Router | Variants |
|---------|--------|----------|
| `/cook` | `cook.md` | `fast`, `hard`, `team` |
| `/fix` | `fix.md` | `fast`, `hard`, `team` |
| `/plan` | `plan.md` | `fast`, `hard`, `team` |
| `/debug` | `debug.md` | `fast`, `hard`, `team` |
| `/test` | `test.md` | `fast`, `hard`, `team` |
| `/review` | `review.md` | `fast`, `hard` |
| `/docs` | `docs.md` | `core`, `business`, `audit` |
| `/design` | `design.md` | `fast`, `hard`, `team` |
| `/deploy` | `deploy.md` | `check`, `preview`, `production`, `rollback` |
| `/report` | `report.md` | `fast`, `hard`, `team` |
| `/brainstorm` | `brainstorm.md` | `fast`, `hard` |
| `/ask` | `ask.md` | `fast`, `hard` |
| `/code` | `code.md` | `fast`, `hard`, `team` |

---

## AGENT TABLE

| Agent | Category | Primary Tasks |
|-------|----------|---------------|
| `tech-lead` | meta | Architecture, orchestration |
| `planner` | meta | Task breakdown, roadmap |
| `backend-engineer` | execution | APIs, services, logic |
| `frontend-engineer` | execution | UI, components, styling |
| `database-architect` | execution | Schema, queries, migrations |
| `mobile-engineer` | execution | iOS, Android, React Native |
| `game-engineer` | execution | Game logic, Unity, Unreal |
| `tester` | validation | Unit, integration, E2E tests |
| `reviewer` | validation | Code review, PR feedback |
| `security-engineer` | validation | Security audit, pentesting |
| `performance-engineer` | validation | Profiling, optimization |
| `debugger` | validation | Bug investigation |
| `researcher` | research | External research |
| `scouter` | research | Codebase analysis |
| `brainstormer` | research | Ideas, requirements |
| `designer` | research | UI/UX design |
| `docs-manager` | support | Documentation |
| `devops-engineer` | support | CI/CD, deployment |
| `business-analyst` | support | Business requirements |
| `project-manager` | support | Project coordination |
| `reporter` | support | Reports, summaries |

---

## NATURAL LANGUAGE DETECTION

| User Says | Detect As |
|-----------|-----------|
| implement, build, create, add | `/cook` |
| fix, bug, error, broken | `/fix` |
| plan, how should, strategy | `/plan` |
| debug, investigate, why | `/debug` |
| test, coverage | `/test` |
| review, PR, check code | `/review` |
| document, readme | `/docs` |
| design, UI, UX | `/design` |
| deploy, release | `/deploy` |
| report, status, summary | `/report` |

---

## DELIVERABLE PATHS

### Single File (≤ 150 lines, < 4 sections)

```yaml
brainstormer:         ./reports/{topic}/brainstorms/BRAINSTORM-{feature}.md
researcher:           ./reports/{topic}/researchers/RESEARCH-{feature}.md
scouter:              ./reports/{topic}/scouts/SCOUT-{feature}.md
designer:             ./reports/{topic}/designs/DESIGN-{feature}.md
planner:              ./reports/{topic}/plans/PLAN-{feature}.md
reporter:             ./reports/{topic}/general/REPORT-{type}-{date}.md
debugger:             ./reports/{topic}/debugs/DEBUG-{issue}.md
tester:               ./reports/{topic}/tests/TEST-{feature}.md
business-analyst:     ./reports/{topic}/requirements/REQ-{feature}.md
performance-engineer: ./reports/{topic}/performance/PERF-{component}.md
```

### Chunked Folder (> 150 lines OR ≥ 4 sections)

```yaml
brainstormer:         ./reports/{topic}/brainstorms/{feature}/00-index.md + sections
researcher:           ./reports/{topic}/researchers/{feature}/00-index.md + sections
scouter:              ./reports/{topic}/scouts/{feature}/00-index.md + sections
designer:             ./reports/{topic}/designs/{feature}/00-index.md + sections
planner:              ./reports/{topic}/plans/{feature}/00-index.md + sections
reporter:             ./reports/{topic}/general/{type}-{date}/00-index.md + sections
debugger:             ./reports/{topic}/debugs/{issue}/00-index.md + sections
tester:               ./reports/{topic}/tests/{feature}/00-index.md + sections
business-analyst:     ./reports/{topic}/requirements/{feature}/00-index.md + sections
performance-engineer: ./reports/{topic}/performance/{component}/00-index.md + sections
```

> **Rule**: Create `00-index.md` FIRST, then section files SEQUENTIALLY. See `PHASES.md > DELIVERABLE SIZE MANAGEMENT`.

---

## DOCUMENTATION PATHS (from /docs:core v2.0 — folder-based)

```yaml
# Each knowledge area is now a FOLDER with 00-index.md + sub-files
overview:     ./documents/knowledge-overview/00-index.md       # + 01~04 sub-files
architecture: ./documents/knowledge-architecture/00-index.md   # + 01~05 sub-files
domain:       ./documents/knowledge-domain/00-index.md         # + 01~04 sub-files
source-base:  ./documents/knowledge-source-base/00-index.md    # + 01~04 sub-files
standards:    ./documents/knowledge-standards/00-index.md       # + 01~04 sub-files

# To get full context: read 00-index.md first, then load specific sub-files
# To get quick overview: read only 00-index.md files
```

---

## RULES FILES

| File | Purpose | Load When |
|------|---------|-----------|
| `CORE.md` | Entry point, identity, routing | **Always** |
| `PHASES.md` | Phase execution, output format | Running phases |
| `AGENTS.md` | Agent handling, tiered execution | Delegating |
| `SKILLS.md` | Skill resolution (HSOL) | Skill lookups |
| `ERRORS.md` | Error recovery | Errors occur |
| `REFERENCE.md` | Lookup tables | Quick lookups |

---

## SELF-VERIFICATION CHECKLIST

```
Before every response:
□ Am I DELEGATING (not implementing)?
□ Am I following WORKFLOW ORDER?
□ Am I responding in USER'S LANGUAGE?
□ Did I attempt TIER 1 before TIER 2?
□ Did I output Skills Analysis?
□ Are prior deliverables treated as immutable?
□ Did I trace requirements to evidence?
```

---

## TIER DECISION QUICK CHECK

```
🔍 Tool Discovery: Does runSubagent exist?
  └─ YES → TIER 1 (MANDATORY)
  └─ NO  → TIER 2 (EMBODY)

⚠️ If you're about to use TIER 2 when TIER 1 exists:
  → STOP
  → Log: "LAZY FALLBACK DETECTED"
  → Use TIER 1 instead
```

---

## PHASE DEPENDENCY

| Phase | Requires | Produces |
|-------|----------|----------|
| Brainstorm | Request | `BRAINSTORM-*.md` |
| Research | Request | `RESEARCH-*.md` |
| Scout | Request | `SCOUT-*.md` |
| Design | Brainstorm + Scout | `DESIGN-*.md` |
| Plan | Research + Scout | `PLAN-*.md` |
| Implement | **PLAN (mandatory)** | Code |
| Test | Code | Test results |
| Review | Code + Tests | Review verdict |

### Blocking Rules

```
⛔ Implementation REQUIRES plan first
⛔ Design REQUIRES brainstorm/scout first
⛔ Test REQUIRES code to exist
⛔ Review REQUIRES code + tests

✅ IF missing prerequisite → CREATE first, THEN proceed
```

---

## ORCHESTRATION LAWS (Quick Reference)

| # | Law | One-liner |
|---|-----|----------|
| L1 | Single Truth | Entry file → CORE → rest on-demand |
| L2 | Requirement Integrity | 100% fidelity, zero loss |
| L3 | Explicit Loading | State what you loaded |
| L4 | Deep Embodiment | Follow agent's full protocol |
| L5 | Sequential Execution | Phase N before N+1 |
| L6 | Language Compliance | User's lang; files in English |
| L7 | Recursive Delegation | Meta agents never implement |
| L8 | Stateful Handoff | Prior deliverables = locked |
| L9 | Constraint Propagation | Scout→Planner→Impl chain |
| L10 | Deliverable Integrity | Agent files define format |
