---
id: deliverable-graph
title: Deliverable Linkage Graph
description: On-demand rule defining the directed graph model for deliverable relationships and completeness analysis
version: "1.0"
updated: "2026-04-08"
scope: traceability
type: rule
section: traceability
---

# DELIVERABLE-GRAPH — Deliverable Linkage Graph

> On-demand rule defining the specification for mapping relationships between workflow deliverables as a directed graph.

---

## Graph Model

The Deliverable Linkage Graph is a **directed graph** where:

- **Nodes** = deliverable files, identified by their relative path within a topic directory
- **Edges** = typed, directed relationships between deliverables

---

## Node Schema

Each node represents a single deliverable file:

```yaml
node:
  path: "plans/PLAN-sprint7.md"     # relative path within topic dir
  type: "<frontmatter type field>"   # plan, design, review, trace, etc.
  agent: "<frontmatter agent field>" # agent that produced the deliverable
  phase: "<frontmatter phase field>" # phase number or name
```

---

## Edge Types

| Type | Meaning | Direction |
|------|---------|-----------|
| `produces` | A phase/agent outputs a deliverable | agent/phase → deliverable |
| `requires` | A deliverable depends on another | dependent → dependency |
| `validates` | A deliverable validates another (e.g., review validates implementation) | validator → validated |
| `extends` | A deliverable extends or amends another | extension → base |

---

## Edge Detection Sources

Edges are detected from four sources, in priority order:

### 1. Frontmatter Fields (Highest Priority)

Explicit relationship fields in YAML frontmatter:

```yaml
---
requires: [plans/PLAN-sprint7.md, researchers/RESEARCH-topic.md]
depends_on: [designs/ADR-sprint7.md]
validates: [plans/PLAN-sprint7.md]
extends: [ROADMAP-SPRINT2-3.md]
---
```

- `requires` / `depends_on` → edge type `requires`
- `validates` → edge type `validates`
- `extends` → edge type `extends`

### 2. Trace Files

Trace files (conforming to `TRACE-SCHEMA.md`) contain phase→deliverable mappings in their `phases[].deliverables[].path` fields, producing `produces` edges.

### 3. MAILBOX Entries

MAILBOX files record phase transitions that reference deliverables. Each deliverable mentioned in a MAILBOX entry generates a `produces` edge from the originating phase.

### 4. Markdown Body References (Lowest Priority)

File path patterns found in the markdown body:

- **Markdown links**: `[text](path/to/file.md)` → edge type `requires`
- **Backtick paths**: `` `path/to/file.md` `` → edge type `requires`

Only paths ending in `.md` and pointing to files within the topic directory are considered.

---

## Output Format

Generated reports are written to:

```
reports/{topic}/graphs/LINKAGE-{timestamp}.md
```

Where `{timestamp}` is ISO 8601 compact format: `YYYY-MM-DDThh-mm-ss`.

### Report Structure

```markdown
# Deliverable Linkage Graph — {topic}

**Generated**: {ISO timestamp}
**Total Nodes**: {count}
**Total Edges**: {count}

## Mermaid Graph

​```mermaid
flowchart TD
  node1["plans/PLAN-sprint7.md"]
  node2["designs/ADR-sprint7.md"]
  node1 -->|requires| node2
​```

## Edge List

| Source | Target | Type |
|--------|--------|------|
| plans/PLAN-sprint7.md | designs/ADR-sprint7.md | requires |

## Summary Statistics

- **Nodes**: {total}
- **Edges by type**:
  - produces: {count}
  - requires: {count}
  - validates: {count}
  - extends: {count}
- **Orphan deliverables**: {count} (zero incoming edges)
  - {list of orphan paths}

## Completeness Metric

coverage = linked_deliverables / total_deliverables × 100 = {value}%
```

---

## Orphan Detection

A deliverable is an **orphan** if it has **zero incoming edges** — meaning no other deliverable produces, requires, validates, or extends it. Orphans represent potential gaps in the workflow chain.

---

## Completeness Metric

```
coverage = (total_deliverables - orphan_count) / total_deliverables × 100
```

A coverage of 100% means every deliverable is referenced by at least one other deliverable. Target: ≥ 80% for mature topic directories.

---

## Tooling

Generate linkage graphs using:

```bash
node scripts/generate-linkage.js reports/{topic}
```

See `scripts/generate-linkage.js` for implementation.
