---
schema-version: "1.0"
name: evolution-protocol
description: Schema evolution governance — breaking/non-breaking change taxonomy and migration rules
category: meta
---

# Evolution Protocol

## Purpose
Governs how frontmatter schemas and protocol files evolve across versions.
Loaded via RUNTIME.md §LOAD ON DEMAND → "Evolving schema".

## Breaking Change Taxonomy

| Change Type | Breaking? | Required Action |
|-------------|:---------:|-----------------|
| Remove required field | YES | 2-version sunset period + migration guide |
| Rename required field | YES | Alias during transition (min 1 schema-version cycle) |
| Change field type | YES | Migration guide required |
| Add optional field | No | Announce in changelog |
| Add new file to agents/, commands/ | No | No action required |
| Extend enum values (e.g., category) | No | Update linter config |
| Change field default | No | Document in changelog |

## Non-Breaking Change Rules

### Safe Changes (no migration needed)
1. Adding a new optional frontmatter field
2. Adding a new file in any directory
3. Extending enum values (new categories, new personality traits)
4. Adding new sections to a protocol file
5. Adding new lint rules for new fields

### Requires Announcement Only
1. Changing a field's default value
2. Deprecating a field (see Deprecation Lifecycle below)
3. Adding a new directory

## Migration Protocol

### When Breaking Change Required
1. **Document**: Create entry in CHANGELOG.md under "Breaking Changes"
2. **Alias Period**: Old field name → new field name alias. Minimum 1 schema-version cycle.
3. **Migration Guide**: Document in EVOLUTION.md's Migrations section:
   - Old format → New format examples
   - Affected files listed
   - Linter rule for migration (if applicable)
4. **Sunset**: After alias period, old name deprecated (see Deprecation Lifecycle)

### Migration Guide Template

| Field | Value |
|-------|-------|
| **Migration ID** | MIG-XXX |
| **Breaking Change** | (describe) |
| **Affected Files** | (list or glob) |
| **Old Format** | (example) |
| **New Format** | (example) |
| **Alias Period** | schema-version X.Y → X.Z |
| **Linter Rule** | (if applicable) |

## Version Compatibility Matrix

| Current Version | Supports Legacy | Notes |
|:--------------:|:--------------:|-------|
| 1.0 | — | Initial version |
| 1.1 (future) | 1.0 | Alias period for any renamed fields |

## Migrations

(empty section — populated as migrations occur)

## Deprecation Lifecycle

### States
```
current → deprecated → sunset → removed
```

| State | Description | Action Required |
|-------|-------------|-----------------|
| `current` | Active, fully supported | None |
| `deprecated` | Marked for removal, still functional | Use replacement; update new code |
| `sunset` | Removed from docs, linter warns on use | Migrate immediately |
| `removed` | Gone from schema, linter errors | Must have migrated |

### Timeline Rules
- **Minimum**: 2 schema-version cycles between `deprecated` and `removed`
- **Maximum**: No upper bound (can remain deprecated indefinitely)
- **Un-deprecation**: If a deprecation is reversed, remove the `deprecated:` frontmatter block and note the reversal in CHANGELOG.md. The field returns to `current` state.
- **Announcement**: Deprecation notice in CHANGELOG.md at deprecation time
- **Warning**: Linter produces warning for deprecated fields (R103)

### Frontmatter Deprecation Format
When deprecating a field in a file's frontmatter:
```yaml
deprecated:
  field: "old_field_name"
  since: "1.0"
  replacement: "new_field_name"
  sunset: "3.0"
```

### Examples

#### Example 1: Renaming `tone` to `personality`
```yaml
# In agent's frontmatter
deprecated:
  field: "tone"
  since: "1.0"
  replacement: "personality"
  sunset: "3.0"

# During alias period, both are accepted:
tone: "professional"
personality: "professional"
```

#### Example 2: Removing `max-tokens` field
```yaml
deprecated:
  field: "max-tokens"
  since: "1.1"
  replacement: null
  sunset: "3.0"
```
