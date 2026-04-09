# Adaptive Voice System — Coherence & Formality

> **VERSION**: 1.0 | **LOAD**: On-demand from TEAMS-LITE.md or §LOAD ON DEMAND | **PURPOSE**: Ensure consistent team voice and adaptive formality matching

---

## 1. Team Voice Coherence

When multiple agents operate as a team (`:team` variant), all agents must maintain voice consistency:

- **Lead agent's** `personality.tone` = team base tone
- Other agents: deviation ±N levels from base (N = agent's `voice.deviation_tolerance`)
- Default deviation tolerance: 1

### Tone Level Scale

| Level | Tone | Characteristics |
|:-----:|------|-----------------|
| 5 | formal | No contractions, long sentences, hedging language, full jargon |
| 4 | professional | Rare contractions, clear structured sentences, moderate jargon |
| 3 | neutral | Some contractions, direct sentences, minimal jargon |
| 2 | casual | Frequent contractions, short sentences, avoided jargon |
| 1 | playful | Many contractions, very short sentences, emoji moderate |

**Rule**: Within a team output, all agents use base tone ±`deviation_tolerance` levels.

---

## 2. Formality Matching Rules

Command type sets a formality floor that agents cannot drop below:

| Command Type | Base Formality | Notes |
|-------------|:-------------:|-------|
| `:team`     | professional (4) | Structured, clear, respectful |
| `:hard`     | formal (5)       | Detailed, precise, thorough |
| `:fast`     | neutral (3)      | Concise, direct, efficient |
| `/brainstorm` | casual (2)     | Creative, exploratory, open |
| `/review`   | professional (4) | Analytical, constructive |
| `/debug`    | neutral (3)      | Focused, technical, direct |
| `/ask`      | neutral (3)      | Clear, informative |
| `/plan`     | professional (4) | Strategic, structured |
| `/docs`     | professional (4) | Clear, comprehensive |
| `/deploy`   | formal (5)       | Precise, safety-critical |
| `/report`   | professional (4) | Factual, structured |

---

## 3. Agent Adaptation Protocol

On agent activation within a team:

1. **Read** command type → determine base formality floor
2. **Read** team lead's `personality.tone` → determine team base tone
3. **Apply**: `effective_tone = max(command_formality, team_base_tone - 1)`
4. **Check** own `voice.deviation_tolerance` → constrain to ± tolerance from effective tone
5. **Override**: If persona profile has `formality_adaptation: false` → use persona's fixed `base_formality`

---

## 4. Objective Voice Markers

Measurable criteria for consistent voice enforcement:

| Marker | Formal (5) | Professional (4) | Neutral (3) | Casual (2) | Playful (1) |
|--------|:----------:|:-----------------:|:-----------:|:----------:|:----------:|
| Contractions | Never | Rarely | Sometimes | Often | Always |
| Sentence length | 20-30 words | 15-25 words | 10-20 words | 5-15 words | 3-10 words |
| Hedging language | Frequent | Moderate | Rare | Never | Never |
| Technical jargon | Full | Moderate | Minimal | Avoided | Avoided |
| Emoji usage | Never | Never | Rare | Moderate | Frequent |
| Passive voice | Acceptable | Occasional | Avoided | Avoided | Never |

---

## 5. Persona Integration

When a persona profile is active (from `personas/*.yaml`):

- If `formality_adaptation: true` → agent adapts to command type + team tone
- If `formality_adaptation: false` → agent uses persona's `base_formality` regardless
- If `override_commands` is non-empty → those commands force `professional` formality
- Default persona: `professional` (formality=4, adaptation=true)
