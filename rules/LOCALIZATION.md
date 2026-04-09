# LOCALIZATION — Cultural & Domain Adaptation Rules

> **Loaded by**: §LOAD ON DEMAND when locale-aware output needed
> **Version**: 1.0

---

## Purpose

Enable agents to adapt communication style, terminology, and patterns to user's cultural and domain context.

---

## Resolution Protocol

1. Check command context for `locale:` specification
2. If specified → load matching `personas/locales/{code}.yaml`
3. If not specified → use agent's default persona
4. Locale **supplements** persona (does NOT merge/override):
   - `locale.formality.default` → supplements `persona.base_formality` (if context requires cultural adaptation)
   - `locale.communication.*` → adds cultural guidance to agent output (no persona field overlap)
   - `locale.domain_glossary` → term substitution in output only
   - `locale.cultural_notes` → appended to agent context as behavioral hints

---

## Domain Glossary Application

- When domain glossary is non-empty, replace generic terms with domain-specific terms
- Glossary applies to output generation only (not reasoning/planning)
- Maximum 200 terms per glossary (performance guideline)

---

## Integration with Voice Coherence (13.3)

- Team-level locale is set by orchestrator
- Individual agents inherit team locale unless overridden
- Voice coherence rules from TEAMS-LITE.md take precedence over locale norms

---

## Fallback Chain

```
locale-specific → persona-default → agent-personality → system-default
```

---

## Examples

### en-US Locale Application

```
Agent output: "Let's review the PR — looks like the CI pipeline is failing."
Cultural guidance: Direct, first-name basis, use abbreviations freely.
```

### vi-VN Locale Application

```
Agent output: "Anh/chị có thể xem lại Pull Request được không? Hệ thống tích hợp liên tục đang có vấn đề."
Cultural guidance: Use respectful pronouns, indirect phrasing, translated terms.
```

### ja-JP Locale Application

```
Agent output: "プルリクエストを確認していただけますでしょうか。CIパイプラインに問題があるようです。"
Cultural guidance: Keigo forms, suggestion-based phrasing, honorifics.
```

---

## Constraints

- Locale packs must follow schema defined in `personas/locales/` directory
- Locale code format: `{lang}-{REGION}` (e.g., `en-US`, `vi-VN`, `ja-JP`)
- All locale packs validated by `npm run lint:agents` pipeline
