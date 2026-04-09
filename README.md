<div align="center">
  <img src="https://agent-assistant-ten.vercel.app/assets/logo.svg" alt="Agent Assistant Logo" width="120" height="auto" />
</div>

# Agent Assistant

[![CI](https://github.com/namch/agent-assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/namch/agent-assistant/actions/workflows/ci.yml)
[![npm (scoped)](https://img.shields.io/npm/v/@namch/agent-assistant?label=v2.0.0)](https://www.npmjs.com/package/@namch/agent-assistant)
[![Platforms](https://img.shields.io/badge/platforms-6-blue.svg)](https://www.npmjs.com/package/@namch/agent-assistant)
[![Specialist Agents](https://img.shields.io/badge/agents-21-black.svg)](https://github.com/namch/agent-assistant/tree/main/agents)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Turn one AI assistant into a governed engineering organization.**

Agent Assistant is a global multi-agent orchestration framework for AI coding tools. Install once, and every repo gets specialist agents, structured workflows, adversarial review, quality gates, tiered context loading, and resumable execution.

---

## The Problem We're Solving

Most AI coding workflows break the moment the task becomes real.

One assistant writes the code, reviews its own code, explains its own decisions, and ships with no meaningful opposition. That is not a team. That is a monoculture with autocomplete.

Then the friction compounds:

- Every new repo needs the same setup all over again
- Domain expertise has to be re-taught through prompt repetition
- Complex tasks become a context-window tax
- Reviews are often self-review disguised as rigor
- Interrupted workflows restart from scratch
- Cross-platform usage means re-learning a different workflow for each tool

Agent Assistant exists to replace that with structure:

- Specialist agents instead of one generalist voice
- Workflows instead of ad hoc prompting
- Debate instead of rubber-stamp review
- Global install instead of per-project ceremony
- Checkpoints instead of restart-from-zero chaos

---

## What You Get After One Install

Once installed globally, every project gets:

- **21 specialist agents** for implementation, architecture, quality, planning, design, research, reporting, and delivery
- **1400+ domain skills** with matrix-based auto-injection instead of manual skill wiring
- **50+ workflow commands** across build, debug, test, review, docs, deploy, reporting, and brainstorming
- **10 Golden Triangle `:team` workflows** with adversarial collaboration
- **12 execution topologies** for sequential, parallel, hierarchical, debate, and swarm-style execution
- **5-dimension evaluation gates** including D4 Security & Safety with OWASP-aligned checks (see `rules/EVALUATION.md`)
- **Checkpoint-resume execution** for interrupted workflows
- **Role-based hybrid execution** that uses shared context where continuity matters and isolation where independence matters
- **6-platform support** with one operating model across tools

This is not “better prompts.”

This is operational infrastructure for AI-assisted engineering.

---

## Why Agent Assistant

| Feature | Vanilla AI | Custom Prompts | Agent Assistant |
|---------|------------|----------------|-----------------|
| Setup per project | ✅ Every time | 🔸 Reused manually | ❌ Global install, applies everywhere |
| Code review quality | 🔸 Self-review | 🔸 Self-review | ✅ Adversarial review with dedicated reviewer role |
| Domain expertise | ❌ Generalist only | 🔸 Manual injection | ✅ 1400+ skills routed by profile and request |
| Quality gates | ❌ | ❌ | ✅ 5-dimension evaluation with D4 override |
| Parallel execution | ❌ | ❌ | ✅ Fan-out, parallel-branch, hierarchical, swarm |
| Resumable workflows | ❌ | ❌ | ✅ Checkpoint-resume protocol |
| Multi-platform consistency | 🔸 Different per tool | 🔸 Different per tool | ✅ Same orchestration model across 6 platforms |
| Security boundaries | ❌ | ❌ | ✅ Guardrails, trust tiers, role-scope boundaries |
| Critical-task collaboration | ❌ | ❌ | ✅ Golden Triangle with structured debate |

---

## The Crown Jewel: Golden Triangle

For high-stakes work, Agent Assistant does not settle for “the model checked its own answer.”

It activates a **Golden Triangle**:

- **Tech Lead**: decomposes, coordinates, arbitrates
- **Executor**: builds and defends the work
- **Reviewer**: challenges independently and can fail the submission

```text
        Tech Lead
       /         \
      /           \
 Executor  <----> Reviewer
   build          challenge
   defend         validate
```

This topology is adversarial by design:

1. Tech Lead breaks the phase into tasks
2. Executor delivers work
3. Reviewer challenges the result
4. Executor fixes or defends
5. Tech Lead arbitrates if disagreement remains
6. Output ships only with a consensus stamp

### Consensus Paths

- **Clean Pass**: reviewer approves on first pass
- **Resolved Pass**: findings were fixed and re-approved
- **Arbitrated Pass**: Tech Lead makes the final binding decision after debate

### Mailbox Protocol

Golden Triangle teams communicate through an append-only mailbox:

`./reports/{topic}/MAILBOX-{date}.md`

That gives you:

- traceable debate
- auditable review decisions
- explicit task handoff history
- replayable context for future analysis

### Team Scale

The repo includes **17 domain teams** under `agents/teams/`, each with 3 roles:

- backend
- database
- debug
- design
- devops
- docs
- frontend
- fullstack
- game
- mobile
- performance
- planning
- project
- qa
- report
- research
- security

### Supported `:team` Variants

Current repo support includes:

- `/cook:team`
- `/code:team`
- `/fix:team`
- `/debug:team`
- `/test:team`
- `/review:team`
- `/plan:team`
- `/design:team`
- `/report:team`
- `/brainstorm:team`

If your task matters, this is the mode that makes weak outputs fight for survival.

---

## The 3 Execution Modes

Not every task needs the same level of ceremony.

| Variant | Agents | Quality Level | Best For |
|---------|--------|---------------|----------|
| `:fast` | 2-3 agents | Standard | quick wins, scoped fixes, light implementation |
| `:hard` | 5-8 agents + quality gates | High | production features, deeper analysis, serious delivery work |
| `:team` | Golden Triangle per phase | Maximum | auth, payments, infra, critical refactors, anything expensive to get wrong |

### Typical Examples

```bash
/cook:fast "add dark mode toggle"
/cook:hard "implement OAuth 2.0 with refresh token rotation"
/cook:team "build payment system with webhook reconciliation"
```

---

## Installation

### Global Package

```bash
npm install -g @namch/agent-assistant@latest

agent-assistant install cursor
agent-assistant install claude
agent-assistant install copilot
agent-assistant install antigravity
agent-assistant install codex
agent-assistant install qwen
agent-assistant install --all
```

### From Source

```bash
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant

node cli/install.js install cursor
node cli/install.js install claude
node cli/install.js install copilot
node cli/install.js install antigravity
node cli/install.js install codex
node cli/install.js install qwen
node cli/install.js install --all
```

### What Happens After Install

Agent Assistant installs into your tool home and becomes available for every project using that tool.

Example structure:

```text
~/.codex/skills/agent-assistant/
├── agents/          # 21 specialist agents + 17 Golden Triangle teams
├── commands/        # routers + variants (fast, hard, team, deploy modes, help, quick)
├── rules/           # RUNTIME.md + 38 supporting protocol files
├── matrix-skills/   # 21 skill registries for HSOL routing
├── skills/          # 1400+ reusable domain skills
├── topologies/      # 12 execution topologies
└── guardrails/      # validation, safety, escalation, trust enforcement
```

What this means in practice:

- You do **not** copy prompts repo-to-repo
- You do **not** rebuild agent setups for every project
- You do **not** manually inject the same expertise over and over

You install the operating model once, then reuse it everywhere.

---

## Quick Start

### A. Generate Project Context First

```bash
/docs:core
/docs:business
```

Why this matters:

- `docs:core` builds technical context for the agents
- `docs:business` anchors implementation to business intent
- the result is stronger routing, better decisions, and less hallucinated structure

Without docs, agents work generically.
With docs, they work like they already know your codebase.

### B. Build Features

```bash
/cook:fast "add dark mode toggle"
/cook:hard "implement OAuth 2.0"
/cook:team "build payment system"
/code "create a CLI for release note generation"
```

Typical expectations:

- `:fast` for quick scoped delivery
- `:hard` for deeper execution plus quality gates
- `:team` for adversarial collaboration and maximum confidence

### C. Fix, Test, Review

```bash
/fix "payment fails on Safari"
/debug "why are websocket reconnects leaking memory?"
/test:hard "user registration flow"
/review "audit auth module"
```

### D. Ship

```bash
/deploy:check
/deploy:preview
/deploy:production
```

Recommended flow:

1. `deploy:check` before risking anything
2. `deploy:preview` for validation in a near-real environment
3. `deploy:production` only after the gates are clean

---

## Command Surface

Agent Assistant exposes a broad routing layer, not just a few shortcuts.

### Core Commands

| Category | Commands |
|----------|----------|
| Build | `/cook`, `/code`, `/fix` |
| Quality | `/test`, `/review`, `/debug` |
| Planning | `/plan`, `/brainstorm`, `/design` |
| Docs | `/docs`, `/docs:core`, `/docs:business`, `/docs:audit` |
| Delivery | `/deploy:check`, `/deploy:preview`, `/deploy:production`, `/deploy:rollback` |
| Reporting | `/report`, `/report:fast`, `/report:hard`, `/report:team` |
| Knowledge | `/ask` |
| Automation | `/auto`, `/quick` |
| Discovery | `/help`, `/help agents`, `/help {command}` |

### Useful Mental Model

- **`/auto`**: classify the request and route it for you
- **`/quick`**: minimal ceremony, useful for fast tactical work
- **`/help`**: system discovery when you want command-level guidance

---

## 21 Specialist Agents

Agent Assistant is opinionated about specialization.

### Implementation

- `backend-engineer`
- `frontend-engineer`
- `mobile-engineer`
- `game-engineer`

### Architecture and Systems

- `tech-lead`
- `database-architect`
- `devops-engineer`
- `performance-engineer`
- `security-engineer`

### Quality and Investigation

- `tester`
- `reviewer`
- `debugger`
- `scouter`
- `researcher`

### Planning and Coordination

- `planner`
- `brainstormer`
- `business-analyst`
- `project-manager`

### Design, Documentation, Reporting

- `designer`
- `docs-manager`
- `reporter`

### Execution Logic: Why Some Embody and Some Isolate

Agent Assistant uses **role-based hybrid execution**:

- `meta`, `execution`, `investigation`, `support` categories default to **EMBODY**
  - continuity matters
  - they benefit from shared working context
- `validation` and `research` categories default to **SUB-AGENT**
  - independence matters
  - isolation reduces confirmation bias

When spawning is unavailable, the system falls back to embodiment plus an **Anti-Bias Protocol** for evaluators.

---

## Matrix Skill Discovery (HSOL)

The intelligence layer is not hardcoded into each agent.

Instead, agents declare a profile and the matrix resolves the right skills dynamically.

```yaml
profile: "backend:execution"
```

That profile is scored against the registry using fitness routing across:

- skill match
- category fit
- capability coverage
- handoff alignment

### Why This Matters

- Add a skill once, and every matching agent can benefit
- Skills stay modular instead of being duplicated across personas
- Routing stays adaptive instead of becoming a static prompt pile

### What the Repo Contains

- **21 matrix registries** in `matrix-skills/`
- **1448 `SKILL.md` files** in the repo today
- **19 core domains** covering backend, frontend, cloud, security, planning, research, design, tooling, AI/ML, and more

That is how the system stays broad without collapsing into one oversized prompt.

---

## Execution Topologies

The framework includes **12 topologies** so workflows can match the shape of the problem:

- `pipeline`
- `fan-out`
- `hierarchical`
- `feature-hierarchical`
- `parallel-branch`
- `swarm`
- `round-robin`
- `debate-round-robin`
- `review-pipeline`
- `audit-pipeline`
- `research-fan-out`
- `golden-triangle`

Use cases vary:

- pipelines for predictable phased delivery
- fan-out for parallel exploration
- hierarchical for lead-and-specialist decomposition
- debate for adversarial reasoning
- golden-triangle for maximum scrutiny

---

## Performance and Benchmarks

Agent Assistant is designed to improve both quality and context efficiency.

### Context Efficiency

The runtime uses **tiered loading**:

- **NANO**
- **MICRO**
- **FULL**

Instead of loading everything every time, it loads only the protocol tier required for the current task. That reduces unnecessary token spend and keeps the orchestrator responsive.

### Quality Improvement

Single-agent review is structurally weak because the same system generates and evaluates the output.

Golden Triangle and reviewer isolation improve quality by introducing:

- explicit opposition
- bounded debate rounds
- consensus requirements
- failure paths instead of polite approval theater

### Durability

Checkpoint and resume support avoids wasted work when long workflows are interrupted.

### Methodology

Benchmark scripts and supporting artifacts live in [`benchmarks/`](./benchmarks).

> Based on internal testing. Use the benchmark suite in this repo if you want to validate performance on your own workflows.

---

## Security and Trust Model

Agent Assistant includes guardrails, but they are not magic.

### Built-In Controls

- **Guardrail I/O pipeline** for validate -> process -> format -> escalate
- **Skill trust levels** for core, verified, and community material
- **Integrity verification** with SHA-256 trust workflows
- **Role-scope boundaries** to reduce agent drift
- **Quarantine path** for lower-trust community skills
- **Security-aware evaluation** through D4 in the scoring model

### Important Advisory

These are **behavioral guardrails**, not hard sandbox boundaries.

They improve discipline and reduce obvious failure modes, but they still depend on model compliance and operator review. You should treat them as strong workflow controls, not as a substitute for production security review.

---

## Evaluation Protocol

Outputs are scored across five dimensions:

- **D1 Correctness** — 30%
- **D2 Completeness** — 25%
- **D3 Format Compliance** — 15%
- **D4 Security & Safety** — 20%
- **D5 Actionability** — 10%

The system uses a **2-pass methodology**:

1. dimension-by-dimension scoring
2. holistic reassessment and adjustment

### The Non-Negotiable Rule

If **D4 <= 2**, the output is automatically rejected regardless of total score.

That is how “technically impressive but unsafe” stops being acceptable.

---

## Project Structure

```text
agent-assistant/
├── AGENT.template.md   # Source template for generated entry points
├── AGENT.md            # Generic orchestrator entry point
├── CLAUDE.md           # Claude Code entry point
├── CURSOR.md           # Cursor entry point
├── COPILOT.md          # GitHub Copilot entry point
├── CODEX.md            # Codex entry point
├── GEMINI.md           # Antigravity / Gemini entry point
├── QWEN.md             # Qwen entry point
├── agents/             # 21 specialist agents + team agents
├── commands/           # routers and workflow variants
├── rules/              # RUNTIME.md + 38 supporting protocol files
├── matrix-skills/      # 21 registries for HSOL resolution
├── skills/             # 1400+ skill modules
├── topologies/         # 12 execution patterns
├── guardrails/         # safety and escalation behavior
├── cli/                # installer and scaffolding commands
├── scripts/            # linting, simulation, rollback, benchmark, trust tooling
├── benchmarks/         # methodology and performance validation artifacts
├── docs/               # docs for humans
├── documents/          # AI-oriented project knowledge artifacts
└── schemas/            # validation schemas
```

### Why the `rules/` Folder Matters

The repo currently ships **39 markdown rule files** at the top level of `rules/`.

That matters because the framework does not assume “more context is better.” It uses runtime loading strategy to keep instruction pressure under control.

### Why `topologies/` Matters

This is where execution stops being generic. Different task shapes require different collaboration patterns, and the topology layer encodes that.

### Why `matrix-skills/` Matters

This is the routing brain for expertise injection. It is what turns static prompts into reusable organizational memory.

---

## Supported Platforms

| Tool | Status | Install Path |
|------|--------|--------------|
| Cursor | ✅ Full | `~/.cursor/` |
| Claude Code | ✅ Full | `~/.claude/` |
| GitHub Copilot | ✅ Full | `~/.copilot/` |
| Codex | ✅ Full | `~/.codex/` |
| Antigravity / Gemini | ✅ Full | `~/.gemini/` |
| Qwen | ✅ Full | `~/.qwen/` |

One framework. One operating model. Six surfaces.

---

## Uninstall

### Remove Platform Configuration

```bash
agent-assistant uninstall cursor
agent-assistant uninstall claude
agent-assistant uninstall copilot
agent-assistant uninstall antigravity
agent-assistant uninstall codex
agent-assistant uninstall qwen
agent-assistant uninstall --all
```

### Remove Global Package

```bash
npm uninstall -g @namch/agent-assistant
```

### From Source

```bash
cd agent-assistant
node cli/install.js uninstall cursor
node cli/install.js uninstall claude
node cli/install.js uninstall copilot
node cli/install.js uninstall antigravity
node cli/install.js uninstall codex
node cli/install.js uninstall qwen
node cli/install.js uninstall --all
```

---

## Contributing

If you want to extend the system, there are several meaningful contribution paths:

- add or improve skills
- extend matrix registries
- add command variants
- introduce new topology patterns
- improve validation, trust, and benchmark tooling
- contribute docs, examples, and onboarding material

### Good Contribution Targets

#### Add a Skill

- create or improve a skill module under `skills/`
- connect it to the right domain registry under `matrix-skills/`
- make it discoverable by profile instead of manually referenced everywhere

#### Add a Custom Agent

- define the role boundary clearly
- keep the scope narrow and composable
- align the agent to a category so execution mode is predictable

#### Improve Trust and Safety

- expand trust verification
- tighten role boundaries
- improve evaluation logic
- contribute benchmark methodology

### Community Progression

The repo is designed to support a trust-aware contribution model:

- **Newcomer**
- **Contributor**
- **Trusted**
- **Maintainer**

That matters because skills and orchestration rules eventually become part of other users' global AI operating environment.

### Local Verification

```bash
npm run lint:agents
npm run simulate
npm run validate:schemas
npm run trust:verify
npm run benchmarks
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

---

## Support

If Agent Assistant saves you time, improves review quality, or helps you ship with more confidence, you can support the project here:

<a href="https://buymeacoffee.com/hainamchuns" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217">
</a>

<br/>
<img src="https://agent-assistant-ten.vercel.app/assets/buymeacoffee-qr.png" alt="Buy Me A Coffee QR Code" width="150" />
<br/>
<img src="https://agent-assistant-ten.vercel.app/assets/IMG_20260126_202557.png" alt="QR Code" width="150" />

---

## License

MIT — [NamCH](https://github.com/hainamchung) — [Issues](https://github.com/hainamchung/agent-assistant/issues)

<div align="center">

**Agent Assistant** — _Install once. Orchestrate forever._

</div>
