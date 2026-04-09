# Agent Persona Profiles

Persona profiles override agent personality fields to adjust communication style.

## Available Presets

| Preset | Tone | Verbosity | Style | Humor |
|--------|------|-----------|-------|-------|
| `professional` (default) | formal | concise | analytical | none |
| `casual` | casual | balanced | pragmatic | subtle |
| `mentor` | warm | detailed | methodical | subtle |
| `academic` | formal | detailed | analytical | none |

## Usage

Specify `persona:` in project config or command prefix:
```
persona: mentor
```

The orchestrator loads the corresponding YAML file and overrides agent personality fields.

**Default resolution**: If no `persona:` is specified, the orchestrator uses `professional` as the default persona. Persona names must match `^[a-z0-9-]+$` to prevent path traversal.

## Locale Field

Each persona file includes an optional `locale:` field that links to a locale pack for cultural adaptation:

```yaml
locale: "en-US"  # references personas/locales/en-US.yaml
```

When a locale is specified, the orchestrator loads the matching locale pack to supplement the persona with cultural communication patterns. See `rules/LOCALIZATION.md` for the full resolution protocol.

## Locales Directory

The `locales/` subdirectory contains locale packs that define cultural communication patterns:

| Locale | Language | Region |
|--------|----------|--------|
| `en-US` | English | United States |
| `vi-VN` | Vietnamese | Vietnam |
| `ja-JP` | Japanese | Japan |

Each locale pack defines: formality levels, communication directness, hierarchy awareness, honorific usage, naming conventions, domain glossary, and cultural notes.

### Locale Pack Schema

```yaml
locale: "{lang}-{REGION}"
language: "Language Name"
region: "Region Name"
formality:
  default: professional
  range: [casual, professional, formal]
communication:
  directness: high          # very-high | high | medium | low | very-low
  hierarchy_awareness: low  # very-high | high | medium | low | very-low
  honorifics: false         # boolean
  greeting_style: "first-name"
  feedback_style: "direct-constructive"
domain_glossary: {}
cultural_notes: []
```

## Custom Personas

Create a new `.yaml` file in this directory following the same format.
