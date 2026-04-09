---
schema-version: "1.0"
name: contributor-onboarding
description: Step-by-step onboarding guide for new agent-assistant contributors
category: documentation
---

# Contributor Onboarding Guide

Welcome to **agent-assistant** — a markdown-as-protocol AI orchestration system.
This guide walks you through setup, first use, and understanding the architecture.

## Prerequisites
- Node.js 18+ installed
- Git installed
- An AI coding assistant (GitHub Copilot, Claude, Cursor, or Codex)

## Quick Start (5 minutes)

### Installation
```bash
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant
npm install  # if dependencies exist
```

### Verify Installation
```bash
node scripts/lint-agents.js       # Should show: 0 errors, 0 warnings
node scripts/simulate.js          # Should show: 0 fail in summary line
wc -w rules/RUNTIME.md           # Should show: ≤ 3,200 words
```

---

## Tutorial 1: Your First Command (15 minutes)

### Goal
Run a `/cook:fast` command to generate code using the agent-assistant orchestration system.

### Step 1: Choose a Platform
agent-assistant works with multiple AI platforms. Choose your platform's entry point:

| Platform | File | How to Use |
|----------|------|-----------|
| Claude Code | `CLAUDE.md` | Place in project root. Claude reads it automatically. |
| GitHub Copilot | `COPILOT.md` | Place in project root or use as agent mode instructions. |
| Cursor | `CURSOR.md` | Place in project root as `.cursorrules`. |
| Codex | `CODEX.md` | Place in project root. |

### Step 2: Give a Simple Task
Open your AI assistant and type:

```
/cook:fast Create a hello-world function in Python
```

### Step 3: Observe the Workflow
The orchestrator will:
1. **Detect** the `/cook:fast` command
2. **Load** `RUNTIME.md` (the protocol core)
3. **Load** `commands/cook.md` → route to `commands/cook/fast.md`
4. **Delegate** to `backend-engineer` agent
5. **Deliver** the result

### What Just Happened?
```
You (user)
  → Orchestrator (RUNTIME.md)
    → Command Router (cook/fast.md)
      → Agent (backend-engineer.md)
        → Skill Resolution (matrix-skills/)
          → Output (your code)
```

### Exercises
1. Try `/cook:hard` for the same task — observe the multi-phase workflow
2. Try `/fix` with a simple bug
3. Try `/plan` to create a feature plan

---

## Tutorial 2: Understanding the Architecture (20 minutes)

### Goal
Understand the key components and how they connect.

### The Protocol Stack
```
┌─────────────────────────────────────────┐
│  Entry Points (CLAUDE.md, COPILOT.md)   │  ← Platform-specific
├─────────────────────────────────────────┤
│  RUNTIME.md (Orchestration Protocol)     │  ← Core (3-tier: Nano/Micro/Full)
├─────────────────────────────────────────┤
│  Commands (cook, fix, plan, review...)   │  ← Workflow definitions
├─────────────────────────────────────────┤
│  Agents (21 specialists)                 │  ← Domain expertise
├─────────────────────────────────────────┤
│  Skills (matrix-skills/*.yaml)           │  ← Knowledge domains
├─────────────────────────────────────────┤
│  Rules + Guardrails                      │  ← Constraints & safety
└─────────────────────────────────────────┘
```

### Key Files
| File | Purpose | When Loaded |
|------|---------|-------------|
| `rules/RUNTIME.md` | Core orchestration protocol | Always (Nano tier minimum) |
| `rules/REFERENCE.md` | Extended reference tables | On-demand |
| `agents/*.md` | Agent personality + protocol | When delegated to |
| `commands/*.md` | Workflow definitions | When command invoked |
| `guardrails/*.md` | Safety constraints | When security check needed |
| `rules/EVOLUTION.md` | Schema evolution rules | When modifying schemas |
| `rules/EVALUATION.md` | Quality rubric | When evaluating outputs |
| `rules/TEAMS-LITE.md` | Team workflow protocols | When `:team` variant used |

### RUNTIME.md 3-Tier Architecture
```
Tier     Lines     When Used
─────────────────────────────────
Nano     §NANO     Simple tasks (/ask, NL questions)
Micro    §MICRO    Standard tasks (/cook:fast, /fix:fast)
Full     §FULL     Team tasks (/cook:team, /plan:team)
```

The 3-tier design keeps token cost minimal for simple tasks while providing full protocol for complex ones.

### Exercise: Trace a Command
1. Open `commands/cook.md` — read the routing logic
2. Open `commands/cook/fast.md` — read the :fast workflow
3. Open `agents/backend-engineer.md` — read the agent's protocol
4. Open `matrix-skills/backend.yaml` — see the skill definitions

---

## Tutorial 3: Making Your First Contribution (30 minutes)

### Goal
Make a real contribution to the agent-assistant project.

### Option A: Add a New Lint Rule

1. **Read** existing rules: Open `scripts/lint-agents.js`, search for `R001` through `R103`
2. **Identify** a pattern to validate (e.g., verify all agents have a `## Mindset` section)
3. **Write** a new rule following the existing pattern
4. **Test**: `node scripts/lint-agents.js`
5. **Validate**: `node scripts/simulate.js --verbose`

### Option B: Add a New Agent

1. **Read** the template: Open `AGENT-TEMPLATE.md`
2. **Copy** to `agents/your-agent-name.md`
3. **Fill in**: frontmatter (name, description, category, handoffs), Mindset, Protocol sections
4. **Validate**:
```bash
node scripts/lint-agents.js          # Must show 0 new errors
node scripts/simulate.js --agent=your-agent-name  # Must PASS
```

### Option C: Improve Documentation

1. Find a deliverable reference in any plan file under `reports/`
2. Navigate to the referenced file
3. Verify the content matches the plan's description
4. If discrepancy found → fix it or file an issue

### Contribution Checklist
- [ ] Code changes pass linter: `node scripts/lint-agents.js` → 0 errors
- [ ] Agent changes pass simulation: `node scripts/simulate.js`
- [ ] RUNTIME.md not modified (unless specifically planned)
- [ ] If RUNTIME.md modified: `wc -w rules/RUNTIME.md` ≤ 3,200 words
- [ ] New files have `schema-version: "1.0"` frontmatter
- [ ] Commit message follows: `sprint{N}: {description} ({idea-ids})`

---

## Next Steps

After completing these tutorials, you're ready to:
1. **Run** any command: `/cook`, `/plan`, `/fix`, `/review`, `/test`, `/debug`
2. **Understand** the protocol stack and how components interact
3. **Contribute** new agents, lint rules, or documentation
4. **Read** `rules/EVOLUTION.md` for schema evolution guidelines
5. **Read** `rules/EVALUATION.md` for quality assessment methodology

For advanced topics:
- Team workflows: Use `:team` variant (e.g., `/cook:team`)
- Custom topologies: See `topologies/` directory
- Guardrails: See `guardrails/` directory
- Semantic memory: See `rules/semantic-memory.md`
