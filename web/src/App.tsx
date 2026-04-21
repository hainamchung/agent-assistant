import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { SEO, DefaultStructuredData, pageSEO } from './components/seo'
import { ErrorBoundary, LoadingSpinner } from './components/ErrorBoundary'

// Lazy loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Installation = lazy(() => import('./pages/Installation'))
const Docs = lazy(() => import('./pages/Docs'))

// Feature pages
const OneTimeSetup = lazy(() => import('./pages/features/OneTimeSetup'))
const SubAgentOrchestration = lazy(() => import('./pages/features/SubAgentOrchestration'))
const MultiPlatform = lazy(() => import('./pages/features/MultiPlatform'))
const MatrixSkills = lazy(() => import('./pages/features/MatrixSkills'))
const SpecialistAgents = lazy(() => import('./pages/features/SpecialistAgents'))
const Commands = lazy(() => import('./pages/features/Commands'))
const QualityGates = lazy(() => import('./pages/features/QualityGates'))
const Workflow = lazy(() => import('./pages/features/Workflow'))
const AgentTeams = lazy(() => import('./pages/features/AgentTeams'))

function App() {
  return (
    <ErrorBoundary>
      {/* Default SEO (can be overridden by page-specific SEO) */}
      <SEO {...pageSEO.home} />
      
      {/* Structured Data for the entire site */}
      <DefaultStructuredData />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            
            {/* Features */}
            <Route path="/features" element={<OneTimeSetup />} />
            <Route path="/features/one-time-setup" element={<OneTimeSetup />} />
            <Route path="/features/sub-agent-orchestration" element={<SubAgentOrchestration />} />
            <Route path="/features/multi-platform-support" element={<MultiPlatform />} />
            <Route path="/features/matrix-skills" element={<MatrixSkills />} />
            <Route path="/features/specialist-agents" element={<SpecialistAgents />} />
            <Route path="/features/commands-workflows" element={<Commands />} />
            <Route path="/features/quality-gates" element={<QualityGates />} />
            <Route path="/features/workflow" element={<Workflow />} />
            <Route path="/features/agent-teams" element={<AgentTeams />} />
            
            {/* Other pages */}
            <Route path="/installation" element={<Installation />} />
            <Route path="/docs" element={<Docs />} />
            
            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
