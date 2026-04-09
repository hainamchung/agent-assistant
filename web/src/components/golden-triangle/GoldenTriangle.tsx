import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TrianglePhase =
  | 'idle'
  | 'decompose'
  | 'execute'
  | 'review-challenge'
  | 'defend'
  | 'consensus'

interface PhaseStep {
  phase: TrianglePhase
  label: string
  description: string
  activeNode: 'tech-lead' | 'executor' | 'reviewer' | 'all'
  edgeHighlight?: 'tl-exec' | 'exec-rev' | 'rev-tl' | 'all'
  color: string
}

const WORKFLOW_STEPS: PhaseStep[] = [
  {
    phase: 'decompose',
    label: 'Decompose',
    description: 'Tech Lead analyzes requirements, breaks task into subtasks',
    activeNode: 'tech-lead',
    edgeHighlight: 'tl-exec',
    color: '#8844ff',
  },
  {
    phase: 'execute',
    label: 'Build',
    description: 'Executor implements the solution following the plan exactly',
    activeNode: 'executor',
    edgeHighlight: 'exec-rev',
    color: '#00d4ff',
  },
  {
    phase: 'review-challenge',
    label: 'Challenge',
    description: 'Reviewer finds issues — FAIL: 2 critical findings',
    activeNode: 'reviewer',
    edgeHighlight: 'exec-rev',
    color: '#ff4444',
  },
  {
    phase: 'defend',
    label: 'Defend',
    description: 'Executor fixes valid issues, defends design decisions',
    activeNode: 'executor',
    edgeHighlight: 'exec-rev',
    color: '#ffb347',
  },
  {
    phase: 'consensus',
    label: 'Consensus',
    description: '✅ CONSENSUS: tech-lead ✓ | executor ✓ | reviewer ✓',
    activeNode: 'all',
    edgeHighlight: 'all',
    color: '#00ff88',
  },
]

// Triangle node positions (equilateral, pointing up)
const NODES = {
  'tech-lead': { x: 200, y: 50, label: 'Tech Lead', icon: '👑', role: 'Decomposes & Arbitrates' },
  executor: { x: 60, y: 310, label: 'Executor', icon: '🛠️', role: 'Builds & Defends' },
  reviewer: { x: 340, y: 310, label: 'Reviewer', icon: '🔍', role: 'Challenges & Validates' },
}

// Edge paths
const EDGES = {
  'tl-exec': { x1: 200, y1: 80, x2: 90, y2: 285 },
  'exec-rev': { x1: 100, y1: 310, x2: 310, y2: 310 },
  'rev-tl': { x1: 320, y1: 285, x2: 200, y2: 80 },
}

export function GoldenTriangle() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const step = WORKFLOW_STEPS[currentStep]

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % WORKFLOW_STEPS.length)
    }, 2500)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const isNodeActive = (nodeId: string) => {
    return step.activeNode === 'all' || step.activeNode === nodeId
  }

  const isEdgeActive = (edgeId: string) => {
    return step.edgeHighlight === 'all' || step.edgeHighlight === edgeId
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section intro — minimal text */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
            Quality Through Structured Conflict
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            The Golden Triangle
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg mx-auto text-sm">
            Output ships only when it survives adversarial review. Not rubber-stamp — real challenge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Triangle visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <svg viewBox="0 0 400 380" className="w-full max-w-md mx-auto" role="img" aria-label="Golden Triangle: three agents collaborating through adversarial review process">
              {/* Edges */}
              {Object.entries(EDGES).map(([id, edge]) => (
                <motion.line
                  key={id}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={isEdgeActive(id) ? step.color : '#1a1a3e'}
                  strokeWidth={isEdgeActive(id) ? 2 : 1}
                  strokeOpacity={isEdgeActive(id) ? 0.8 : 0.3}
                  animate={{
                    stroke: isEdgeActive(id) ? step.color : '#1a1a3e',
                    strokeWidth: isEdgeActive(id) ? 2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* Pulse along active edge */}
              {step.edgeHighlight && step.edgeHighlight !== 'all' && (
                <motion.circle
                  r={4}
                  fill={step.color}
                  initial={{
                    cx: EDGES[step.edgeHighlight].x1,
                    cy: EDGES[step.edgeHighlight].y1,
                    opacity: 0,
                  }}
                  animate={{
                    cx: EDGES[step.edgeHighlight].x2,
                    cy: EDGES[step.edgeHighlight].y2,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Nodes */}
              {Object.entries(NODES).map(([id, node]) => {
                const active = isNodeActive(id)
                const nodeColor =
                  id === 'tech-lead'
                    ? '#8844ff'
                    : id === 'executor'
                      ? '#00d4ff'
                      : '#ff4444'

                return (
                  <g key={id}>
                    {/* Glow ring when active */}
                    {active && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        fill="transparent"
                        stroke={step.phase === 'consensus' ? '#00ff88' : nodeColor}
                        strokeWidth={1.5}
                        initial={{ r: 30, opacity: 0 }}
                        animate={{ r: 40, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    {/* Node background */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={30}
                      fill="#0c0c1a"
                      stroke={active ? (step.phase === 'consensus' ? '#00ff88' : nodeColor) : '#1a1a3e'}
                      strokeWidth={active ? 2 : 1}
                      animate={{
                        stroke: active ? (step.phase === 'consensus' ? '#00ff88' : nodeColor) : '#1a1a3e',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <text
                      x={node.x}
                      y={node.y + 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={18}
                    >
                      {node.icon}
                    </text>

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + 52}
                      textAnchor="middle"
                      fill={active ? '#e0e0f0' : '#6a6a9a'}
                      fontSize={11}
                      fontFamily="var(--font-mono)"
                      fontWeight={active ? 600 : 400}
                    >
                      {node.label}
                    </text>

                    {/* Role subtitle */}
                    <text
                      x={node.x}
                      y={node.y + 66}
                      textAnchor="middle"
                      fill="#6a6a9a"
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                    >
                      {node.role}
                    </text>
                  </g>
                )
              })}
            </svg>
          </motion.div>

          {/* Step description panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Step indicators */}
            <div className="flex gap-1 mb-6">
              {WORKFLOW_STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentStep(i)
                    setIsPlaying(false)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep ? 'w-8' : 'w-3'
                  }`}
                  style={{
                    backgroundColor: i === currentStep ? s.color : '#1a1a3e',
                  }}
                  aria-label={`Step ${i + 1}: ${s.label}`}
                />
              ))}
            </div>

            {/* Active step info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-lg border bg-bg-card"
                style={{ borderColor: `${step.color}33` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                  <span
                    className="font-mono text-sm font-semibold"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Play/Pause control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-4 text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
