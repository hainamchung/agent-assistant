---
description: "Detailed help for a specific command"
version: "1.0"
schema-version: "1.0"
category: support
execution-mode: execute
---

# Command Help

## Protocol

1. Parse `$ARGUMENTS` → extract command name
2. READ `commands/{command}.md` frontmatter → extract description, category, version
3. LIST `commands/{command}/` directory → enumerate variants
4. For each variant: READ frontmatter → extract description
5. Display:

### {Command Name}

**Description**: {from frontmatter}
**Category**: {from frontmatter}
**Version**: {from frontmatter}

### Variants

| Variant | Description |
|---------|-------------|
| {variant name} | {from variant frontmatter} |

### Usage Examples

{from command file body, if present}

### Related Agents

{from command's workflow agent assignments}

## Error Handling

If command not found:
> No command '{name}' found. Run `/help` to see all commands.

<!-- WARNING: Skip variants with invalid frontmatter -->
