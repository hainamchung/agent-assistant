# Business PRD — Product Requirements Document

> **Folder**: `documents/business/business-prd/`
> **Purpose**: Product vision, mission, problem statement, goals, and acceptance criteria
> **Audience**: Product managers, stakeholders, architects, and development teams

---

## Summary

The **Agent Assistant Product Requirements Document** establishes the foundational "why" behind the multi-agent orchestration framework. It defines the problem space we solve, the goals we pursue, and the criteria by which we measure success.

Agent Assistant transforms a single AI coding assistant into a coordinated team of 21 specialist agents. The framework addresses a critical gap in AI-assisted development: the lack of structured coordination, quality gates, and domain expertise when working with AI coding tools. Without orchestration, AI assistants produce fragmented, inconsistent, and often low-quality code that requires extensive human review and correction.

This PRD covers four essential dimensions: the executive summary establishing value proposition, the problem and goals defining scope, stakeholder requirements capturing functional and non-functional needs, and acceptance criteria ensuring deliverables meet business objectives.

---

## Sub-Files

| File | Title | Purpose | Read Order |
|------|-------|---------|------------|
| `00-index.md` | Business PRD Index | This index — navigation and overview | 0 |
| `01-executive-summary.md` | Executive Summary | Mission, value proposition, target outcomes | 1 |
| `02-problem-goals-and-scope.md` | Problem, Goals, and Scope | Problem statement, 7 goals, in/out scope | 2 |
| `03-stakeholders-and-requirements.md` | Stakeholders and Requirements | 16 stakeholders, 15 functional + 8 non-functional requirements | 3 |
| `04-acceptance-risks-assumptions.md` | Acceptance, Risks, and Assumptions | 20 acceptance criteria, 8 risks, 5 assumptions, 5 open questions | 4 |

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| **Document Type** | Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Active |
| **Primary Author** | Product Team |
| **Last Updated** | 2026-05-20 |
| **Review Cycle** | Quarterly |

---

## Cross-References

| Reference | Destination | When to Read |
|-----------|-------------|--------------|
| Features | `../business-features/00-index.md` | Understanding what we build |
| Workflows | `../business-workflows/00-index.md` | Understanding how work flows |
| Glossary | `../business-glossary/00-index.md` | Understanding terminology |
| Architecture | `../../knowledge-architecture/00-index.md` | Technical design decisions |

---

## Known Gaps

| Gap | Status | Notes |
|-----|--------|-------|
| Competitive analysis | Pending | External market research needed |
| Pricing model | Draft | Cost structure not finalized |
| Internationalization | Not started | Non-English platform support out of scope |

---

## Evidence Sources

The content in this folder was derived from:

- `README.md` — Primary project documentation
- `rules/CORE.md` — Core orchestration rules (v4.2)
- `rules/AGENTS.md` — Agent definitions and categories
- `rules/TEAMS.md` — Golden Triangle team architecture
- `rules/PHASES.md` — Phase execution protocol
- `web/src/data/agents.ts` — Agent definitions with roles and capabilities
- `cli/install.js` — CLI installer implementation
