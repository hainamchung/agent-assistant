# Matrix Skills Explorer

> 78+ skills across 8 domains. Auto-injected at runtime. No config needed.

## How Skills Work

Skills are Markdown files dropped into domain folders. When an agent declares a profile, the Matrix auto-injects every matching skill. A skill added to the Matrix is instantly available to every relevant agent.

## Skill Categories

| Domain | Icon | Count | Examples |
|--------|------|-------|----------|
| Frontend | :art: | 10 | react-expert, nextjs-developer, angular, ui-ux-pro-max |
| Backend | :gear: | 9 | fastapi-expert, django-pro, nodejs-best-practices, java-pro |
| Architecture | :building_construction: | 6 | backend-architect, database-architect, c4-architecture |
| Quality & DevOps | :white_check_mark: | 11 | debugging, devops-engineer, docker-expert, security-auditor |
| Cloud & Infrastructure | :cloud: | 8 | cloud-devops, cloudflare-expert, kubernetes-architect |
| AI/ML & Data | :robot: | 10 | ai-engineer, rag-architect, langchain-architecture, sql-pro |
| Productivity & Meta | :wrench: | 8 | app-builder, git-pushing, wave-execution, brainstorming |
| Cursor Tools | :electric_plug: | 16 | canvas, babysit, create-skill, sdk, shell |

**Total: 78 skills across 8 domains**

## Adding a New Skill

Skills are discovered at runtime from the `~/.{TOOL}/skills/` directory. To add a new skill:

### Directory Structure

```
~/.{TOOL}/skills/<domain>/<skill-name>/SKILL.md
```

### Skill File Template

```markdown
# <Skill Name>

<One-sentence description of what this skill does.>

## When This Skill Activates

<Describe the trigger conditions: which agents, commands, or contexts activate this skill.>

## Core Principles

1. <Principle 1>
2. <Principle 2>
3. <Principle 3>

## Usage Examples

### Example 1: <Title>

\`\`\`
<Code example>
\`\`\`

### Example 2: <Title>

\`\`\`
<Code example>
\`\`\`
```

## Skill Review Criteria

Before adding a skill to the Matrix, verify:

- [ ] One-sentence description that clearly states the skill's purpose
- [ ] "When This Skill Activates" section explains the trigger conditions
- [ ] 3 core principles that guide skill behavior
- [ ] At least 2 usage examples with real code
- [ ] File follows naming convention: `~/.{TOOL}/skills/<domain>/<name>/SKILL.md`

## Current Skills (as of 2026-05-21)

### Frontend (10 skills)

- react-expert
- nextjs-developer
- nextjs-app-router-patterns
- angular
- ui-ux-pro-max
- react-best-practices
- react-native-expert
- react-flow-architect
- frontend-slides
- frontend-developer

### Backend (8 skills)

- fastapi-expert
- django-pro
- nodejs-best-practices
- java-pro
- python-pro
- cpp-pro
- dotnet-architect
- temporal-python-pro

### Architecture (6 skills)

- backend-architect
- database-architect
- c4-architecture-c4-architecture
- cloud-architect
- multi-cloud-architecture
- graphql-architect

### Quality & DevOps (11 skills)

- debugging
- debug-buttercup
- devops-engineer
- docker-expert
- security-auditor
- sql-pro
- agile-product-owner
- subagent-driven-development
- dispatching-parallel-agents
- confidence-research
- systems-programming-rust-project

### Cloud & Infrastructure (8 skills)

- cloud-devops
- cloudflare-expert
- kubernetes-architect
- devops-engineer
- database-architect
- cloud-architect
- multi-cloud-architecture

### AI/ML & Data (10 skills)

- ai-engineer
- rag-architect
- langchain-architecture
- sql-pro
- data-engineer
- ai-agents-architect
- claude-api
- app-builder
- comfyui-gateway
- wave-execution

### Productivity & Meta (8 skills)

- app-builder
- git-pushing
- wave-execution
- brainstorming
- docs-architect
- wiki-architect
- fresh-context
- create-rule

### Cursor Tools (16 skills)

- canvas
- babysit
- create-skill
- create-hook
- create-rule
- sdk
- statusline
- update-cursor-settings
- split-to-prs
- shell
- go-playwright
- frontend-slides
- artifacts-builder
- docs-architect
- llm-wiki
- wiki-architect

## Finding New Skills

Skills are discovered at runtime from the `~/.{TOOL}/skills/` directory. To add a new skill:

1. Create a skill file in the appropriate domain folder:
   - Frontend skills: `~/.{TOOL}/skills/frontend/<skill-name>/SKILL.md`
   - Backend skills: `~/.{TOOL}/skills/backend/<skill-name>/SKILL.md`
   - ...and so on for each domain

2. The Matrix auto-discovers skills in these directories and injects them into relevant agents.

> **Note**: Dynamic skill discovery via `find-skills` is planned for v1.5. For now, skills are added by dropping a file into the appropriate domain folder.

## Skill Injection Flow

1. **Agent Activated**: When an agent is invoked, the orchestrator reads its profile and inherited domains
2. **Matrix Resolution**: The system loads domain files and resolves matrix skills by relevance and priority (< 10ms)
3. **Skill Injection**: Matrix skills are loaded into the agent context
4. **Execution**: The agent executes with specialized knowledge from its injected skills
