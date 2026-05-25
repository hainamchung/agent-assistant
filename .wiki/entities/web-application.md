---
title: Web Application
type: entity
tags: [web, react, frontend, documentation]
created: 2026-05-20
updated: 2026-05-21
---

# Web Application

The Web Application is a React 19 documentation site that provides a visual interface for exploring Agent Assistant's agents, teams, and documentation. It is built with modern frontend tooling and includes interactive visualizations for understanding the system's architecture.

**Source**: `.documents/knowledge-overview/02-tech-stack.md:213-226`, `.documents/knowledge-source-base/02-entry-points.md:82-140`

---

## Definition

- **Framework**: React 19 with Vite 6
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Animations**: Framer Motion 12
- **Diagrams**: ReactFlow 12
- **SEO**: react-helmet-async with structured data
- **PWA**: Progressive Web App with manifest.json
- **Entry Point**: `web/src/main.tsx`
- **Hosting**: Vercel (production URL: https://agent-assistant-ten.vercel.app)

**Source**: `.documents/knowledge-source-base/03-key-modules.md`

---

## Routes

The application defines 12 routes organized into three categories: Home, Features, and Utility pages. All routes use lazy loading for code splitting to optimize initial bundle size.

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with project overview |
| `/features` | OneTimeSetup | Redirects to one-time-setup |
| `/features/one-time-setup` | OneTimeSetup | Global configuration guide |
| `/features/sub-agent-orchestration` | SubAgentOrchestration | Multi-agent coordination |
| `/features/multi-platform-support` | MultiPlatform | Platform compatibility |
| `/features/matrix-skills` | MatrixSkills | Hybrid Skill Orchestration (HSOL) |
| `/features/specialist-agents` | SpecialistAgents | Agent showcase |
| `/features/commands-workflows` | Commands | Slash commands documentation |
| `/features/quality-gates` | QualityGates | Quality assurance workflows |
| `/features/workflow` | Workflow | System architecture diagram |
| `/features/agent-teams` | AgentTeams | Golden Triangle visualization |
| `/installation` | Installation | Setup guide |
| `/docs` | Docs | Documentation browser |
| `*` | NotFound | 404 fallback |

**Source**: `web/src/App.tsx:1-64`

---

## Architecture

### Directory Structure

```
web/src/
├── main.tsx              # React 19 entry point with Suspense
├── App.tsx                # Root component with React Router 7
├── pages/
│   ├── HomePage.tsx       # Landing page
│   ├── Docs.tsx           # Documentation browser with sections
│   ├── Installation.tsx   # Installation guide
│   ├── NotFound.tsx       # 404 page
│   └── features/
│       ├── OneTimeSetup.tsx
│       ├── SubAgentOrchestration.tsx
│       ├── MultiPlatform.tsx
│       ├── MatrixSkills.tsx
│       ├── SpecialistAgents.tsx
│       ├── Commands.tsx
│       ├── QualityGates.tsx
│       ├── Workflow.tsx
│       └── AgentTeams.tsx    # Interactive Golden Triangle visualization
├── components/
│   ├── layout/
│   │   └── Layout.tsx         # AppLayout with Navigation
│   ├── seo/
│   │   ├── SEO.tsx            # Dynamic meta tags
│   │   ├── seo-config.ts      # Pre-configured page SEO
│   │   └── StructuredData.tsx # Schema.org structured data
│   ├── ui/                    # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Section.tsx
│   │   └── SectionHeader.tsx
│   ├── decorations/           # Visual decorations
│   │   ├── PageSideDecorations.tsx
│   │   └── GradientBackground.tsx
│   ├── terminal/              # Terminal component
│   └── ErrorBoundary.tsx      # Error handling with LoadingSpinner
├── data/
│   └── agents.ts              # 21 agent definitions (web/src/data/agents.ts:46-245)
└── public/
    └── manifest.json          # PWA configuration
```

**Source**: `web/src/App.tsx:1-64`, `web/src/pages/Docs.tsx:1-224`, `web/src/pages/features/AgentTeams.tsx:1-491`

### React 19 Architecture

The application leverages React 19 features for optimal performance:

```typescript
// Lazy loading with code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const Docs = lazy(() => import('./pages/Docs'))
const AgentTeams = lazy(() => import('./pages/features/AgentTeams'))

// Suspense boundary for streaming
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      {/* ... more routes */}
    </Route>
  </Routes>
</Suspense>
```

**Key React 19 Patterns**:
- **Lazy Loading**: All page components use dynamic imports for code splitting
- **Suspense**: Fallback spinner while chunks load
- **Error Boundary**: Global error handling with `ErrorBoundary` component
- **Server Components Ready**: Architecture supports future RSC adoption

**Source**: `web/src/App.tsx:1-64`

---

## Component Architecture

### Layout Component

The `Layout` component wraps all routes and provides consistent navigation:

```typescript
import { Layout } from './components/layout'

<Route element={<Layout />}>
  {/* All routes here */}
</Route>
```

**Source**: `web/src/App.tsx:35`

### Navigation Structure

Navigation includes links to:
- Home (`/`)
- Features dropdown (all 10 feature pages)
- Installation (`/installation`)
- Documentation (`/docs`)

### Page Components

#### Docs.tsx

Documentation browser with five main sections:

1. **Documentation Sections Grid** — Three-column responsive grid of topic cards
2. **Quick Reference Table** — Commands with descriptions and variants
3. **Agent Summary** — 21 agents organized by category (Implementation, Architecture, Quality, Planning, Support)
4. **Resources** — External links and community resources
5. **CTA Section** — Installation and GitHub links

Uses Framer Motion for scroll-triggered animations and gradient backgrounds.

**Source**: `web/src/pages/Docs.tsx:1-224`

#### AgentTeams.tsx

Interactive visualization page showcasing the Golden Triangle team architecture:

**Stats Display**:
- 17 Domain Teams
- 51 Specialized Agents
- 3 Roles per Team
- 3 Max Debate Rounds
- 9 Team Commands

**17 Domain Teams**:

| Domain | Tech Lead | Executor | Reviewer Focus |
|--------|-----------|----------|----------------|
| backend | tech-lead | backend-engineer | security + performance |
| frontend | tech-lead | frontend-engineer | design + performance |
| fullstack | tech-lead | backend + frontend | security + performance |
| database | tech-lead | database-architect | security + performance |
| research | researcher | scouter | critical evaluator |
| planning | planner | researcher | feasibility critic |
| qa | tester | tester | security + performance |
| design | designer | frontend-engineer | UX + accessibility |
| debug | debugger | backend-engineer | root-cause validator |
| devops | devops-engineer | backend-engineer | security |
| security | security-engineer | backend-engineer | pen-test mindset |
| game | tech-lead | game-engineer | game arch + performance |
| mobile | tech-lead | mobile-engineer | UX + platform + performance |
| performance | performance-engineer | backend-engineer | measurement validation |
| docs | docs-manager | researcher | accuracy + completeness |
| project | project-manager | business-analyst | technical feasibility |
| report | reporter | scouter | data accuracy + insight |

**Structured Debate Flow**:
1. Executor Implements → delivers implementation
2. Reviewer Critiques → challenges with evidence
3. Executor Defends/Fixes → provides evidence or acknowledges
4. Consensus/Escalation → Tech Lead arbitrates if needed

**Consensus Protocol**:
- **Clean Pass**: Reviewer approves on first review
- **Resolved Pass**: After defense with evidence or fix
- **Arbitrated Pass**: Tech Lead overrides after max 3 rounds

**Source**: `web/src/pages/features/AgentTeams.tsx:1-491`

---

## 20 Specialist Agents

Agents are organized into 5 categories with specific roles and capabilities. Source: `web/src/data/agents.ts:1-309` defines exactly **21 agents**.

### Implementation (4 agents)

| Agent | Role | Capabilities |
|-------|------|-------------|
| Backend Engineer | Principal Backend Architect | REST APIs, GraphQL, Microservices, Security |
| Frontend Engineer | Principal Frontend Architect | React, TypeScript, Accessibility, Performance |
| Mobile Engineer | Mobile Development Lead | React Native, Flutter, iOS, Android |
| Game Engineer | Game Development Specialist | Unity, Unreal, WebGL, Physics |

### Architecture (2 agents)

| Agent | Role | Capabilities |
|-------|------|-------------|
| Tech Lead | Principal Architect | System Design, ADRs, Strategy, Scalability |
| Database Architect | Data Architecture Lead | SQL, NoSQL, Optimization, Migrations |

### Quality (4 agents)

| Agent | Role | Capabilities |
|-------|------|-------------|
| Tester | QA Architect | Unit Tests, E2E, Integration, Coverage |
| Reviewer | Code Quality Guardian | Code Review, Best Practices, Standards, Security |
| Debugger | Root Cause Analyst | Root Cause, Debugging, Profiling, Logs |
| Security Engineer | Application Security Lead | OWASP, Pentesting, Hardening, Compliance |

### Planning (3 agents)

| Agent | Role | Capabilities |
|-------|------|-------------|
| Planner | Implementation Strategist | Planning, Milestones, Estimates, Dependencies |
| Brainstormer | Creative Problem Solver | Ideas, Alternatives, Trade-offs, Innovation |
| Business Analyst | Requirements Engineer | Requirements, User Stories, Analysis, Documentation |

### Support (8 agents)

| Agent | Role | Capabilities |
|-------|------|-------------|
| Designer | UI/UX Architect | UI/UX, Design Systems, Prototypes, Accessibility |
| DevOps Engineer | Platform Engineer | CI/CD, Docker, Kubernetes, Monitoring |
| Docs Manager | Documentation Lead | API Docs, Guides, README, OpenAPI |
| Performance Engineer | Optimization Specialist | Profiling, Optimization, Benchmarks, Load Testing |
| Researcher | Technical Researcher | Research, Analysis, Best Practices, Trends |
| Scouter | Codebase Explorer | Exploration, Dependencies, Patterns, Discovery |
| Project Manager | Delivery Coordinator | Timeline, Resources, Communication, Tracking |
| Reporter | Documentation & Reporting Specialist | Reports, Summaries, Documentation, Templates |

**Source**: `web/src/data/agents.ts:1-309`

---

## SEO System

### SEO Configuration

Pre-configured SEO for all pages via `seo-config.ts`:

```typescript
export const SITE_URL = 'https://agent-assistant-ten.vercel.app'
export const DEFAULT_IMAGE = '/assets/logo.png'
export const SITE_NAME = 'Agent Assistant'

export const pageSEO = {
  home: { title: 'Agent Assistant', description: 'Multi-agent orchestration...' },
  installation: { title: 'Installation Guide', description: 'Install Agent Assistant...' },
  docs: { title: 'Documentation', description: 'Learn Agent Assistant...' },
  specialistAgents: { title: 'Specialist Agents', description: '20 pre-built specialist agents...' },
  commands: { title: 'Commands & Workflows', description: 'Powerful slash commands...' },
  agentTeams: { title: 'Agent Teams — Golden Triangle', description: 'Adversarial collaboration...' },
  // ... more pages
}
```

### Structured Data (Schema.org)

The application includes comprehensive structured data:

1. **SoftwareApplication Schema**:
   - Name: Agent Assistant
   - Category: DeveloperApplication
   - Price: Free (0 USD)
   - Version: 1.0.0
   - Author: NamCH

2. **Organization Schema**:
   - Name: NamCH
   - Logo: SITE_URL/assets/logo.png
   - SameAs: GitHub repository

3. **Website Schema**:
   - Name: Agent Assistant
   - URL: SITE_URL
   - PotentialAction: SearchAction on /docs?q={search_term_string}

4. **FAQ Schema**:
   - Dynamic FAQ page support with Question/Answer pairs

**Source**: `web/src/components/seo/seo-config.ts:1-72`, `web/src/components/seo/StructuredData.tsx:1-164`

### HTML Head Configuration

From `index.html`:
- Meta title, description, keywords, author
- Theme color: #0a0a0a (dark mode)
- Open Graph tags for social sharing
- Twitter card metadata
- Google Fonts: Inter (UI), Fira Code (terminal/code)
- DNS prefetch for external resources

**Source**: `web/index.html:1-74`

---

## PWA Configuration

Complete Progressive Web App setup in manifest.json:

```json
{
  "name": "Agent Assistant",
  "short_name": "Agent Assistant",
  "description": "Multi-agent orchestration framework for AI coding assistants...",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "en",
  "categories": ["developer tools", "productivity", "utilities"],
  "icons": [
    { "src": "/assets/logo.svg", "type": "image/svg+xml", "sizes": "any" },
    { "src": "/assets/logo.png", "type": "image/png", "sizes": "512x512", "purpose": "any maskable" }
  ]
}
```

**Source**: `web/public/manifest.json:1-30`

---

## State Management

The application uses React's built-in state management:

- **React Context**: For shared state (theme, user preferences)
- **Local Component State**: `useState` for component-level state
- **URL State**: React Router for navigation state
- **Server State**: Direct fetches with loading/error states

No external state management library is used; the application favors React 19's native capabilities.

---

## Styling Approach

### Tailwind CSS 4

The application uses Tailwind CSS 4 with CSS variables for theming:

```css
/* CSS Variables for theming */
--color-bg-primary: #0a0a0a
--color-bg-secondary: /* secondary background */
--color-text-primary: #fafafa
--color-text-secondary: /* muted text */
--color-text-accent: /* accent color */
--color-border-primary: /* borders */
--color-gradient-red: /* gradient colors */
--color-gradient-purple: /* gradient colors */
--color-gradient-green: /* gradient colors */
```

### Design System Components

Built-in components for consistency:

- **Button**: Primary, secondary variants with hover states
- **Card**: Elevated, hoverable variants for content containers
- **Badge**: Colored labels for categories and status
- **Section**: Page sections with background variants
- **SectionHeader**: Title and description wrapper

### Animation Strategy

Framer Motion 12 for:
- Page transitions
- Scroll-triggered animations (`whileInView`)
- Hover effects
- Staggered list animations

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering |
| react-router-dom | ^7.0.0 | Client-side routing |
| framer-motion | ^12.0.0 | Animations and transitions |
| @xyflow/react | ^12.0.0 | Interactive diagrams (ReactFlow) |
| react-helmet-async | latest | SEO meta tags |
| lucide-react | latest | Icon library |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| vite | ^6.0.0 | Build tool |
| typescript | ^5.0.0 | Type safety |

**Source**: `.documents/knowledge-source-base/03-key-modules.md`

---

## Development

### Start Development Server

```bash
cd web
npm install
npm run dev
```

The dev server starts on port **5173** with HMR.

### Build for Production

```bash
npm run build
```

Outputs to `web/dist/` optimized for production.

### TypeScript Strict Mode

The web application uses strict TypeScript with:
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

### Type Checking

```bash
npm run lint     # ESLint checks
npm run typecheck # TypeScript checks
```

---

## Related Pages

- [[Configuration Reference]] — Vite, TypeScript, and package.json configurations
- [[Getting Started]] — Installing and running the web app
- [[Agent System]] — 21 specialist agents overview
- [[Team System]] — Golden Triangle team architecture
- [[Skill System]] — 310+ skills across 19 domains
