---
schema-version: "1.0"
name: validation-rules
category: quality
description: "Mechanical validation rules for agent output — no LLM involvement"
version: "1.0"
---

# Validation Rules

Mechanical rules applied to deliverable markdown files. Each rule can be checked programmatically without LLM involvement.

## Rule Table

| ID | Name | Description | Severity | Check Type |
|----|------|-------------|----------|------------|
| V001 | deliverable-has-sections | Required sections present per command's expectedStructure | error | structural |
| V002 | exit-criteria-complete | All `[x]` checkboxes filled (warn if `[ ]` remains) | warning | regex |
| V003 | requirement-traceability | Each task references at least one `R{n}` or `US-{n}` | warning | regex |
| V004 | file-references-valid | File paths in markdown links exist on disk | warning | filesystem |
| V005 | frontmatter-present | Deliverable has valid YAML frontmatter | error | structural |
| V006 | no-empty-sections | No heading followed by another heading with nothing between | warning | structural |

## When to Load

Loaded by `validate-output.js` and by reviewer agents during Phase review.
