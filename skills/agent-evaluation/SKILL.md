---
name: agent-evaluation
description: "Design and run evaluation frameworks for LLM agents covering behavioral testing, capability assessment, and reliability metrics. Use when building test suites for AI agents, measuring agent performance across tasks, detecting regressions after prompt or model changes, or setting up automated eval pipelines. Covers statistical testing, adversarial probing, and production monitoring."
risk: unknown
source: "vibeship-spawner-skills (Apache 2.0)"
date_added: "2026-02-27"
---

# Agent Evaluation

Build evaluation frameworks that catch agent failures before production — using statistical testing, behavioral contracts, and multi-dimensional metrics.

## Core Principle

Evaluating LLM agents differs fundamentally from testing traditional software: the same input can produce different valid outputs, and "correct" often has no single answer. Test for behavioral invariants, not exact string matches.

## Workflow

1. **Define behavioral contracts** — specify what the agent must always do (invariants) and must never do (violations), independent of specific outputs
2. **Build a diverse eval set** — include happy paths, edge cases, adversarial inputs, and ambiguous queries with expected behavior ranges
3. **Run statistical evaluations** — execute each test case 3-5 times to account for non-determinism; analyze pass rate distributions, not single runs
4. **Measure multiple dimensions** — score correctness, helpfulness, safety, latency, and tool usage independently to prevent metric gaming
5. **Automate regression detection** — run evals on every prompt/model change and alert on statistically significant score drops

## Evaluation Types

| Type | What It Tests | When to Run |
|------|--------------|-------------|
| Behavioral contracts | Invariants (always/never rules) | Every change |
| Capability assessment | Can the agent do X? | New features |
| Regression testing | Did performance drop? | Prompt/model updates |
| Adversarial probing | Failure modes under stress | Pre-production |
| A/B comparison | Is version B better than A? | Model selection |

## Statistical Test Pattern

```
For each test case:
  Run agent 5 times
  Record: pass/fail, latency, token usage
  Calculate: pass rate, p95 latency, cost

Flag as regression if:
  pass rate drops > 10% (binomial test, p < 0.05)
  p95 latency increases > 20%
```

## Behavioral Contract Example

```
Contract: "search_agent_accuracy"
  MUST: Return results relevant to the query topic
  MUST: Cite source documents when available
  MUST NOT: Fabricate citations or URLs
  MUST NOT: Return results from blocked domains
  TOLERANCE: May include 1-2 tangentially related results in top-5
```

## Anti-Patterns

- **Single-run testing** — one pass tells you nothing about reliability. Always run multiple times and analyze the distribution.
- **Only happy-path tests** — agents fail on edge cases and adversarial inputs. Include malformed queries, contradictory instructions, and boundary conditions.
- **Output string matching** — exact match assertions break on valid paraphrases. Use semantic similarity, rubric-based grading, or LLM-as-judge.

## When to Use

Use when building test suites for AI agents, setting up CI/CD eval pipelines, measuring the impact of prompt or model changes, or establishing quality baselines before production deployment.

## Related Skills

Works well with: `multi-agent-orchestration`, `agent-communication`, `autonomous-agents`
