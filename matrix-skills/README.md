# Matrix Skills

Pre-curated skill domains for the Hybrid Skill Orchestration Layer (HSOL).

## Structure

| File | Skills | Description |
|------|:------:|-------------|
| `_index.yaml` | — | Central registry and HSOL configuration |
| `_dynamic.yaml` | — | Community-installed skills (dynamic layer) |
| `ai-ml.yaml` | AI/ML | Machine learning, NLP, computer vision |
| `architecture.yaml` | Architecture | System design, patterns, microservices |
| `backend.yaml` | Backend | APIs, services, server-side logic |
| `cloud.yaml` | Cloud | AWS, GCP, Azure, serverless |
| `data.yaml` | Data | Databases, ETL, data modeling |
| `design.yaml` | Design | UI/UX, design systems, accessibility |
| `devops.yaml` | DevOps | CI/CD, Docker, Kubernetes, infrastructure |
| `frontend.yaml` | Frontend | React, CSS, components, state management |
| `gaming.yaml` | Gaming | Game engines, physics, rendering |
| `languages.yaml` | Languages | Language-specific patterns and idioms |
| `management.yaml` | Management | Project management, agile, reporting |
| `mcp.yaml` | MCP | Model Context Protocol integrations |
| `mobile.yaml` | Mobile | iOS, Android, React Native, Flutter |
| `performance.yaml` | Performance | Profiling, optimization, benchmarking |
| `planning.yaml` | Planning | Architecture planning, roadmaps |
| `quality.yaml` | Quality | Testing, code review, security |
| `research.yaml` | Research | External research, benchmarking |
| `security.yaml` | Security | OWASP, authentication, authorization |

## How Skills Are Resolved

1. Agent declares `profile:` in frontmatter (e.g., `"backend:execution"`)
2. HSOL matches profile tags to domain YAML files
3. Relevant skills from matched domains are injected into agent context
4. Dynamic discovery (`_dynamic.yaml`) enhances with community skills

See `rules/SKILLS-LITE.md` for the resolution protocol and `_index.yaml` for full HSOL configuration.

## Total: 1430+ skills across 19 domains
