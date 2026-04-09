# 🎯 SKILLS — Tag-Based Lookup

> **VERSION**: 2.0 | **LOAD**: When resolving skills for agents
>
> Full HSOL specification archived in `rules/archive/SKILLS.md`.

---

## RESOLUTION

1. READ agent's `profile:` field from frontmatter (e.g., `"backend:api"`)
2. MATCH tags to `matrix-skills/*.yaml` filenames (e.g., `backend` → `backend.yaml`)
3. SCAN matched YAML for relevant skill entries
4. LOAD up to 3 matched `SKILL.md` files from `~/.{TOOL}/skills/`
5. If no match → agent operates on base knowledge (report gap to user)

## SKILL SOURCES

| Source | Location | Trust |
|--------|----------|-------|
| Matrix Skills | `matrix-skills/*.yaml` | Pre-curated, always trusted |
| Dynamic Skills | `npx skills find "{query}"` | Verify before use |

## DYNAMIC DISCOVERY

```bash
npx skills find "{keywords}"    # Search
npx skills add {id} -g -y       # Install
```

Trigger discovery only when matrix has no relevant match AND task is complex.
Confirm with user before installing low-trust skills.

## EDGE CASES

- Network timeout → proceed with matrix only
- No skills found → report gap, use base knowledge
- Installation fails → rollback, offer matrix alternative

## INTELLIGENCE PROTOCOLS

> Load on demand — these files extend skill resolution with advanced routing and degradation.

| Protocol | File | Load When |
|----------|------|----------|
| Skill Degradation | `rules/SKILL-DEGRADATION.md` | Context budget enters Yellow/Red zone |
| Skill Conflicts | `rules/SKILL-CONFLICTS.md` | ≥2 matched skills overlap or contradict |

## Task-Scoped Skill Profiles

> Default skill assignments by task type. Override per agent if needed.

| Task Type | Default Skills | Load From |
|-----------|---------------|----------|
| REST API | backend, security, data | backend.yaml, security.yaml, data.yaml |
| React UI | frontend, design | frontend.yaml, design.yaml |
| Database | data, backend, security | data.yaml, backend.yaml, security.yaml |
| DevOps | devops, cloud, tools | devops.yaml, cloud.yaml, tools.yaml |
| Mobile App | mobile, frontend, design | mobile.yaml, frontend.yaml, design.yaml |
| AI/ML | ai-ml, data, backend | ai-ml.yaml, data.yaml, backend.yaml |
| Game | gaming, frontend, performance | gaming.yaml, frontend.yaml, performance.yaml |
| Planning | planning, management | planning.yaml, management.yaml |
