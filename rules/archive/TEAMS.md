# 🔺 TEAMS — Golden Triangle Architecture

> **LOAD**: When `:team` variant is invoked | **PURPOSE**: 3-agent adversarial collaboration protocol
> **VERSION**: 2.0 — Golden Triangle | **SUPERSEDES**: Team Lead + Teammates model

---

## 🔒 C8 Foundation Enforcement Checkpoints

- `C8-TEAMS-01` (BLOCK): Mailbox is append-only and required for all inter-agent exchanges.
- `C8-TEAMS-02` (BLOCK): Debate is capped at 3 rounds; unresolved disputes must escalate to Tech Lead arbitration.
- `C8-TEAMS-03` (BLOCK): Phase output requires explicit consensus stamp before release.

---

## CORE PRINCIPLE

Every team phase spawns exactly **3 agent roles** — no more, no less. Quality emerges from structured tension between an Executor who builds and a Reviewer who challenges, orchestrated by a Tech Lead who arbitrates.

```
┌──────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                                │
│  └── invokes Golden Triangle for Phase N                     │
│                                                              │
│       ┌─────────────────────────────────┐                    │
│       │         🔺 TECH LEAD            │                    │
│       │   Decomposes · Arbitrates       │                    │
│       │   Synthesizes · FINAL AUTHORITY │                    │
│       └──────────┬──────────┬───────────┘                    │
│                  │          │                                 │
│          ┌───────▼──┐  ┌───▼────────┐                        │
│          │ EXECUTOR  │  │ REVIEWER   │                        │
│          │ Builds    │◄─┤ Challenges │                        │
│          │ Defends   │──►│ Validates  │                        │
│          └──────────┘  └───────────┘                         │
│                  ▲          ▲                                 │
│                  └──── 📬 ──┘                                │
│                    MAILBOX                                    │
└──────────────────────────────────────────────────────────────┘
```

---

## THE THREE ROLES

### 1. Tech Lead (`techlead.md`)

| Attribute | Description |
|-----------|-------------|
| **Function** | Task decomposer, work coordinator, dispute arbitrator, final output synthesizer |
| **Authority** | FINAL on all decisions — overrides Executor and Reviewer when consensus fails |
| **Actions** | Produces Shared Task List, reads all Mailbox exchanges, issues binding DECISION |
| **Personality** | Pragmatic, decisive, plan-focused. Minimizes debate rounds. Ships quality work. |

### 2. Executor (`executor.md`)

| Attribute | Description |
|-----------|-------------|
| **Function** | Direct implementer — builds, codes, and creates the actual deliverable |
| **Authority** | Owns implementation decisions. Can and MUST defend work when Reviewer is wrong. |
| **Actions** | Implements tasks, posts SUBMISSION to Mailbox, posts DEFENSE with evidence when challenged |
| **Personality** | Builder mindset. Pragmatic, evidence-driven. Does NOT blindly accept all feedback. Pushes back with technical proof when Reviewer's critique is incorrect or over-engineered. |

### 3. Reviewer (`reviewer.md`)

| Attribute | Description |
|-----------|-------------|
| **Function** | Quality gatekeeper with Devil's Advocate mindset |
| **Authority** | Can FAIL submissions and demand fixes. Can escalate unresolved disputes to Tech Lead. |
| **Actions** | Reviews submissions, posts REVIEW (PASS/FAIL) to Mailbox, re-checks fixes and defenses |
| **Personality** | Skeptical, thorough, demanding. Assumes defects exist until proven otherwise. Checks security, performance, correctness, edge cases. Does NOT rubber-stamp. |

---

## THE DEBATE MECHANISM

No 4th agent is needed. Adversarial tension is **hardcoded** into Executor and Reviewer personalities.

```
┌─────────────────────────────────────────────────────────────┐
│  DEBATE FLOW                                                │
│                                                             │
│  Executor implements ──► Reviewer critiques                 │
│       │                       │                             │
│       │  ┌────────────────────┘                             │
│       │  │                                                  │
│       ▼  ▼                                                  │
│  Executor DEFENDS (with evidence) ─── OR ─── FIXES          │
│       │                                                     │
│       ▼                                                     │
│  Reviewer re-checks ──► PASS ──► Consensus                  │
│       │                                                     │
│       └──► FAIL ──► Loop (max 3 rounds)                     │
│                        │                                    │
│                        ▼                                    │
│              Tech Lead ARBITRATES (binding)                  │
└─────────────────────────────────────────────────────────────┘
```

**Max debate rounds**: 3. After round 3 without agreement, Tech Lead reads all Mailbox exchanges and makes a **binding decision**. No further debate.

**Defense rules**:
- Executor MUST defend with **technical evidence** (benchmarks, specs, code references)
- "I disagree" without proof = automatic FAIL, Reviewer wins
- Reviewer MUST consider valid evidence. Rejecting proven-correct work = escalation to Tech Lead
- Tech Lead evaluates **evidence quality**, not seniority or role

---

## COMMUNICATION VIA SHARED FILES

| Artifact | Owner | Purpose |
|----------|-------|---------|
| **Shared Task List** | Tech Lead | Task assignments, status, priorities |
| **Mailbox** | All (append-only) | `./reports/{topic}/MAILBOX-{date}.md` — submissions, reviews, defenses, decisions |

All agents read the full Mailbox. Tech Lead manages the Shared Task List. One Mailbox per phase.

---

## CONSENSUS PROTOCOL

Output is released **ONLY** when one of these conditions is met:

| Condition | Trigger |
|-----------|---------|
| **Clean pass** | Reviewer explicitly APPROVED Executor's submission (no disputes) |
| **Resolved pass** | Reviewer APPROVED after Executor fixed issues or defended successfully |
| **Arbitrated pass** | Tech Lead overrode after max 3 rounds — documents reasoning |

**Consensus stamp format**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

**Without this stamp, no phase output is released.** If any agent has not signed off, Tech Lead must resolve the gap before proceeding.

---

## TEAM ROSTER (Agent-to-Role Mapping per Domain)

| Team Domain | Tech Lead Agent | Executor Agent | Reviewer Focus |
|-------------|----------------|----------------|----------------|
| `backend` | `tech-lead` | `backend-engineer` | `reviewer` — security + performance |
| `frontend` | `tech-lead` | `frontend-engineer` | `reviewer` — design + performance |
| `fullstack` | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` — security + performance |
| `database` | `tech-lead` | `database-architect` | `reviewer` — security + performance |
| `research` | `researcher` | `scouter` | `brainstormer` — critical evaluator |
| `planning` | `planner` | `researcher` | `tech-lead` — feasibility critic |
| `qa` | `tester` | `tester` | `security-engineer` + `performance-engineer` |
| `design` | `designer` | `frontend-engineer` | `reviewer` — UX + accessibility |
| `debug` | `debugger` | `backend-engineer` | `reviewer` — root-cause validator |
| `devops` | `devops-engineer` | `backend-engineer` | `security-engineer` |
| `security` | `security-engineer` | `backend-engineer` | `reviewer` — pen-test mindset |
| `game` | `tech-lead` | `game-engineer` | `reviewer` — game architecture + performance (60fps) |
| `mobile` | `tech-lead` | `mobile-engineer` | `reviewer` — UX + platform compliance + performance |
| `performance` | `performance-engineer` | `backend-engineer` | `reviewer` — measurement validation + regression |
| `docs` | `docs-manager` | `researcher` | `reviewer` — accuracy + completeness + clarity |
| `project` | `project-manager` | `business-analyst` | `tech-lead` — technical feasibility |
| `report` | `reporter` | `scouter` | `reviewer` — data accuracy + insight validity |

### Team Selection

```
IF workflow specifies a team domain → USE that domain's row from roster
ELSE IF phase maps to a domain     → USE default mapping
ELSE                                → HALT, ask Orchestrator for team assignment
```

### Fullstack Special Case

The `fullstack` domain spawns **two Executors** (backend + frontend). They share the Mailbox and take turns submitting. Reviewer reviews each submission independently. Tech Lead coordinates integration between the two.

---

## EXECUTION MODEL FOR GOLDEN TRIANGLE

### Enhanced — Sub-agent Spawn (preferred)

```
1. Orchestrator spawns Tech Lead as sub-agent
2. Tech Lead spawns Executor as sub-agent
3. Tech Lead spawns Reviewer as sub-agent
4. Communication flows via Mailbox file (./reports/{topic}/MAILBOX-{date}.md)
5. Debate loop runs until consensus or max rounds
6. Tech Lead collects final output and returns to Orchestrator
```

### Standard — Sequential Embodiment (default)

```
1. EMBODY Tech Lead → decompose task → produce Shared Task List → post TASK_ASSIGNMENT
2. EMBODY Executor → implement tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submission → post REVIEW to Mailbox (PASS/FAIL)
4. IF FAIL:
   a. Re-EMBODY Executor → read findings → FIX or DEFEND → post to Mailbox
   b. Re-EMBODY Reviewer → re-check → post updated REVIEW
   c. Repeat steps 4a-4b (max 3 total rounds)
5. EMBODY Tech Lead → read all Mailbox exchanges → arbitrate if needed → synthesize
6. Post DECISION with consensus stamp
```

```
❌ FORBIDDEN: Using Standard when runSubagent is available
❌ FORBIDDEN: Skipping the Reviewer step (all work MUST be reviewed)
❌ FORBIDDEN: Executor and Reviewer directly modifying each other's outputs
✅ REQUIRED: Attempt Enhanced first, log reason if falling back to Standard
✅ REQUIRED: Mailbox used for ALL inter-agent communication in both modes
```

---

## SHARED TASK LIST FORMAT

**⛔ Tech Lead MUST produce this before any Executor work begins.**

| Column | Values |
|--------|--------|
| ID | T1, T2, ... |
| Task | Description |
| Assigned To | `executor` |
| Status | ⏳ Pending · 🔄 In Progress · ✅ Approved · ❌ Blocked · 🔁 Revision Needed |
| Priority | H/M/L |
| Round | 1-3 (debate round) |

Task is ✅ only when Reviewer approved OR Tech Lead arbitrated. Tech Lead updates status as debate progresses.

---

## MAILBOX FILE FORMAT

**File**: `./reports/{topic}/MAILBOX-{date}.md`

**Types**: `TASK_ASSIGNMENT`, `SUBMISSION`, `REVIEW`, `DEFENSE`, `ESCALATION`, `APPROVAL`, `DECISION`

**Each exchange format**:
```markdown
## Exchange #{N}
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `{agent}` | `{agent}` | {TYPE} | {time} |
**Content:** [description] | **Status:** ✅ PASS / ❌ FAIL (for REVIEW/DECISION)
```

**Rules**:
- Append-only — no agent may edit prior exchanges
- Every exchange MUST have From, To, Type, and Timestamp
- REVIEW → explicit PASS/FAIL | DEFENSE → technical evidence | DECISION → consensus stamp

---

## TEAM PHASE OUTPUT FORMAT

> **OUTPUT FORMAT**: See RUNTIME.md → Golden Triangle Phase Output Format

---

## WHEN TO USE TEAMS

### Decision Tree

```
IS task complex with multiple concerns (security + performance + correctness)?
├─ YES → :team (Golden Triangle)
└─ NO
   IS quality critical and adversarial review needed?
   ├─ YES → :team (Golden Triangle)
   └─ NO
      IS task simple and single-domain?
      ├─ YES → Single-agent variant (:fast, :hard, :team)
      └─ NO  → Single-agent variant with manual review step
```

### Variant Comparison

| Variant | Execution Mode | Agents | When |
|---------|----------------|--------|------|
| `:fast` | Single agent | 1 | Speed priority, simple tasks |
| `:hard` | Single agent | 1 | Standard quality, focused tasks |
| `:team` | Golden Triangle | 3 | Maximum quality, adversarial review, complex tasks |

**⛔ Do NOT use `:team` for**:
- Simple single-domain tasks where one agent suffices
- Time-critical hotfixes where coordination overhead exceeds benefit
- Pure research or brainstorming with no reviewable deliverable

---

## TEAM SIZE

**Always exactly 3.** No more, no less.

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Tech Lead count | 1 | Single point of authority and synthesis |
| Executor count | 1 | Single implementer (except `fullstack` = 2 taking turns) |
| Reviewer count | 1 | Single quality gatekeeper with focused expertise |
| Total agents | 3 | Minimum viable adversarial collaboration |

```
IF only 1 perspective needed → Single agent, not a team
IF 4+ perspectives needed   → Run multiple Golden Triangles sequentially per phase
                              (each triangle handles one concern domain)
NEVER spawn 4+ agents in one triangle
```

---

## ERROR HANDLING

| Error | Symptom | Recovery |
|-------|---------|----------|
| Executor fails to produce deliverable | SUBMISSION never posted to Mailbox | Tech Lead posts DECISION: phase blocked. Re-dispatches task or produces minimal viable output. |
| Reviewer is too strict (fails valid work 3 times) | Max rounds hit, all submissions rejected | Tech Lead reads all evidence, makes binding DECISION. Documents why Reviewer's standards were overridden. |
| Reviewer rubber-stamps (passes without scrutiny) | REVIEW contains no specific findings | Tech Lead rejects the PASS, re-invokes Reviewer with explicit checklist: security, performance, correctness, edge cases. |
| Consensus impossible after max rounds | 3 rounds exhausted, still FAIL | Tech Lead makes binding DECISION based on cumulative Mailbox evidence. Logs "ARBITRATED — no consensus." |
| Enhanced spawn fails for any agent | Sub-agent creation error | Fall back to Standard (sequential embodiment) for the failed agent only. Log reason. |
| Mailbox file cannot be created | File system error | Use inline communication within the phase output. Log degraded mode. |
| All agents fail | No usable output from any role | Tech Lead produces minimal viable output solo, flags incident for Orchestrator review. |

---

## SELF-CHECK (Before Every Team Phase)

```
□ Is :team variant explicitly invoked? (Never use Golden Triangle without request)
□ Is the correct team domain identified from the roster?
□ Are exactly 3 roles assigned (Tech Lead + Executor + Reviewer)?
□ Has Tech Lead produced the Shared Task List BEFORE dispatch?
□ Is the Mailbox file initialized at ./reports/{topic}/MAILBOX-{date}.md?
□ Is Enhanced attempted first? (Standard only on spawn failure)
□ Is the debate loop capped at 3 rounds?
□ Does every REVIEW contain explicit PASS/FAIL?
□ Does every DEFENSE contain technical evidence?
□ Is the consensus stamp present before phase output is released?
□ Does the final deliverable meet all exit criteria?
□ Are all Mailbox exchanges preserved (append-only, no deletions)?
```


