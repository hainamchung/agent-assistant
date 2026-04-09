import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { agents } from '../../data/agents'

// ===== TYPES =====

interface AgentNode {
  id: string
  name: string
  category: string
  x: number
  y: number
  color: string
}

interface SystemModule {
  id: string
  name: string
  color: string
  symbol: string
  x: number
  y: number
}

interface CommandNode {
  id: string
  name: string
  color: string
  x: number
  y: number
}

// ===== CONSTANTS =====

const CATEGORY_COLORS: Record<string, string> = {
  Implementation: '#00d4ff',
  Architecture: '#8844ff',
  Quality: '#ff4444',
  Planning: '#00ff88',
  Support: '#ff8844',
}

const SYSTEM_MODULES_DATA = [
  { id: 'guardrails', name: 'Guardrails', color: '#ff4444', symbol: '🛡' },
  { id: 'skills', name: 'Skills', color: '#00d4ff', symbol: '⚡' },
  { id: 'personas', name: 'Personas', color: '#ff8844', symbol: '🎭' },
  { id: 'topologies', name: 'Topologies', color: '#8844ff', symbol: '🔀' },
  { id: 'rules', name: 'Rules', color: '#00ff88', symbol: '📏' },
  { id: 'memory', name: 'Memory', color: '#44bbff', symbol: '🧠' },
]

const COMMANDS_DATA = [
  { id: 'cook', name: '/cook', color: '#ff8844' },
  { id: 'code', name: '/code', color: '#00d4ff' },
  { id: 'fix', name: '/fix', color: '#ff4444' },
  { id: 'test', name: '/test', color: '#00ff88' },
  { id: 'plan', name: '/plan', color: '#44bbff' },
  { id: 'review', name: '/review', color: '#8844ff' },
  { id: 'debug', name: '/debug', color: '#ff6644' },
  { id: 'design', name: '/design', color: '#bb44ff' },
]

const CYCLE_DURATION = 8000

const CROSS_LINK_PAIRS = [
  [0, 5], [1, 8], [3, 12], [6, 15], [9, 18],
  [2, 10], [4, 14], [7, 17], [11, 19], [13, 20],
]

// ===== HELPERS =====

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

// ===== MAIN COMPONENT =====

export function MissionControlHero() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const [activeWorkflow, setActiveWorkflow] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)

  const width = 900
  const height = 680
  const cx = width / 2
  const cy = 380

  // Command nodes — horizontal row at top
  const commandNodes: CommandNode[] = useMemo(
    () => COMMANDS_DATA.map((cmd, i) => ({
      ...cmd,
      x: 90 + (i * (width - 180)) / (COMMANDS_DATA.length - 1),
      y: 42,
    })),
    [width]
  )

  // System module nodes — inner ring around orchestrator
  const moduleNodes: SystemModule[] = useMemo(
    () => SYSTEM_MODULES_DATA.map((mod, i) => {
      const angle = (2 * Math.PI * i) / SYSTEM_MODULES_DATA.length - Math.PI / 2
      return { ...mod, x: cx + 100 * Math.cos(angle), y: cy + 85 * Math.sin(angle) }
    }),
    [cx, cy]
  )

  // Agent nodes — outer elliptical ring
  const agentNodes: AgentNode[] = useMemo(
    () => agents.map((agent, i) => {
      const angle = (2 * Math.PI * i) / agents.length - Math.PI / 2
      return {
        id: agent.id,
        name: agent.name,
        category: agent.category,
        x: cx + 320 * Math.cos(angle),
        y: cy + 235 * Math.sin(angle),
        color: CATEGORY_COLORS[agent.category] || '#00ff88',
      }
    }),
    [cx, cy]
  )

  // Cross-links for ambient agent-to-agent flows
  const crossLinks = useMemo(() =>
    CROSS_LINK_PAIRS
      .filter(([a, b]) => agentNodes[a] && agentNodes[b])
      .map(([a, b]) => ({
        from: agentNodes[a],
        to: agentNodes[b],
        color: agentNodes[a].color,
      })),
    [agentNodes]
  )

  // Primary storytelling cycle (8s)
  useEffect(() => {
    const timer = setInterval(() => setCycleIndex(c => c + 1), CYCLE_DURATION)
    return () => clearInterval(timer)
  }, [])

  // Active elements for this cycle
  const activeCommand = commandNodes[cycleIndex % commandNodes.length]
  const activeModule = moduleNodes[cycleIndex % moduleNodes.length]
  const activeAgentTargets = useMemo(() => [
    agentNodes[(cycleIndex * 5) % agentNodes.length],
    agentNodes[(cycleIndex * 5 + 7) % agentNodes.length],
    agentNodes[(cycleIndex * 5 + 14) % agentNodes.length],
  ], [cycleIndex, agentNodes])

  // Label positioning: outside the ring (above for top-half, below for bottom-half)
  const getLabelY = (nodeY: number) => nodeY < cy ? nodeY - 34 : nodeY + 14
  const getLabelTextY = (nodeY: number) => nodeY < cy ? nodeY - 20 : nodeY + 28

  const triggerWorkflow = () => {
    setActiveWorkflow(true)
    setTimeout(() => setActiveWorkflow(false), 3000)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 800px 500px at 50% 50%, rgba(0, 255, 136, 0.03), transparent)',
        }}
      />

      {/* ===== MULTI-LAYER NEURAL PIPELINE ===== */}
      <div className="relative w-full max-w-4xl mx-auto" aria-label="Agent Assistant neural pipeline — commands flow through processing modules to specialist agents">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
        >
          {/* ===== SECTION LABELS ===== */}
          <text x={cx} y={18} textAnchor="middle" fill="#ffffff"
            fontSize={7} fontFamily="var(--font-mono)" opacity={0.2} letterSpacing="3">
            COMMANDS
          </text>
          <text x={cx} y={cy - 120} textAnchor="middle" fill="#ffffff"
            fontSize={6.5} fontFamily="var(--font-mono)" opacity={0.15} letterSpacing="3">
            PROCESSING GATES
          </text>

          {/* ===== LAYER 1: STATIC CONNECTIONS ===== */}

          {/* Commands → Center (faint) */}
          {commandNodes.map((cmd) => (
            <line key={`cmd-conn-${cmd.id}`}
              x1={cmd.x} y1={cmd.y + 12} x2={cx} y2={cy}
              stroke={cmd.color} strokeOpacity={0.04} strokeWidth={0.5}
            />
          ))}

          {/* Center → Modules (faint) */}
          {moduleNodes.map((mod) => (
            <line key={`mod-conn-${mod.id}`}
              x1={cx} y1={cy} x2={mod.x} y2={mod.y}
              stroke={mod.color} strokeOpacity={0.06} strokeWidth={0.5}
            />
          ))}

          {/* Center → Agents (faint) */}
          {agentNodes.map((node) => (
            <line key={`edge-${node.id}`}
              x1={cx} y1={cy} x2={node.x} y2={node.y}
              stroke={node.color}
              strokeOpacity={hoveredAgent === node.id ? 0.5 : 0.06}
              strokeWidth={hoveredAgent === node.id ? 1.2 : 0.4}
              style={{ transition: 'all 0.3s ease' }}
            />
          ))}

          {/* Cross-links between agents (faint dashed) */}
          {crossLinks.map((link, i) => (
            <line key={`cross-${i}`}
              x1={link.from.x} y1={link.from.y} x2={link.to.x} y2={link.to.y}
              stroke={link.color} strokeOpacity={0.04} strokeWidth={0.4}
              strokeDasharray="3 8"
            />
          ))}

          {/* ===== LAYER 2: COMMAND NODES ===== */}
          {commandNodes.map((cmd) => (
            <g key={`cmd-${cmd.id}`}>
              <motion.rect
                x={cmd.x - 24} y={cmd.y - 11}
                width={48} height={22} rx={5}
                fill="#0a0a18" stroke={cmd.color}
                strokeWidth={activeCommand.id === cmd.id ? 1.2 : 0.6}
                strokeOpacity={activeCommand.id === cmd.id ? 0.9 : 0.3}
                animate={activeCommand.id === cmd.id ? {
                  strokeOpacity: [0.3, 1, 0.6],
                } : undefined}
                transition={activeCommand.id === cmd.id ? { duration: 1.2 } : undefined}
              />
              <text x={cmd.x} y={cmd.y + 3} textAnchor="middle" dominantBaseline="central"
                fill={cmd.color} fontSize={8.5} fontFamily="var(--font-mono)" fontWeight={500}
                opacity={activeCommand.id === cmd.id ? 1 : 0.6}>
                {cmd.name}
              </text>
              {/* Active command glow */}
              {activeCommand.id === cmd.id && (
                <motion.rect
                  key={`cmd-glow-${cycleIndex}`}
                  x={cmd.x - 28} y={cmd.y - 15}
                  width={56} height={30} rx={8}
                  fill="transparent" stroke={cmd.color} strokeWidth={0.8}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </g>
          ))}

          {/* ===== LAYER 3: SYSTEM MODULE NODES ===== */}
          {moduleNodes.map((mod) => (
            <g key={`mod-${mod.id}`}>
              <circle cx={mod.x} cy={mod.y} r={20}
                fill="#0a0a1a" stroke={mod.color} strokeWidth={0.7} strokeOpacity={0.25}
              />
              <text x={mod.x} y={mod.y + 1} textAnchor="middle" dominantBaseline="central"
                fontSize={11}>
                {mod.symbol}
              </text>
              <text x={mod.x} y={mod.y + 30} textAnchor="middle"
                fill={mod.color} fontSize={7} fontFamily="var(--font-mono)" opacity={0.45}>
                {mod.name}
              </text>
              {/* Active module glow */}
              {activeModule.id === mod.id && (
                <motion.circle
                  key={`mod-glow-${cycleIndex}`}
                  cx={mod.x} cy={mod.y} r={20}
                  fill="transparent" stroke={mod.color} strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0], r: [20, 28, 20] }}
                  transition={{ duration: 1.5, delay: 1.3 }}
                />
              )}
            </g>
          ))}

          {/* ===== LAYER 4: ORCHESTRATOR CENTER ===== */}
          <motion.circle
            cx={cx} cy={cy} r={32}
            fill="#080812" stroke="#00ff88" strokeWidth={2}
            animate={{
              filter: [
                'drop-shadow(0 0 8px rgba(0,255,136,0.3))',
                'drop-shadow(0 0 20px rgba(0,255,136,0.5))',
                'drop-shadow(0 0 8px rgba(0,255,136,0.3))',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
            fill="#00ff88" fontSize={11} fontFamily="var(--font-mono)" fontWeight={600}>
            ORCH
          </text>

          {/* ===== LAYER 5: AGENT NODES ===== */}
          {agentNodes.map((node) => (
            <g key={node.id}
              onMouseEnter={() => setHoveredAgent(node.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              className="cursor-pointer" role="button" tabIndex={0}
              onFocus={() => setHoveredAgent(node.id)}
              onBlur={() => setHoveredAgent(null)}
              aria-label={`${node.name} — ${node.category}`}
            >
              {/* Hover glow ring */}
              {hoveredAgent === node.id && (
                <motion.circle
                  cx={node.x} cy={node.y} r={16}
                  fill="transparent" stroke={node.color} strokeWidth={1} strokeOpacity={0.5}
                  initial={{ r: 10, opacity: 0 }} animate={{ r: 16, opacity: 1 }}
                />
              )}
              {/* Node circle */}
              <circle cx={node.x} cy={node.y}
                r={hoveredAgent === node.id ? 8 : 5}
                fill={node.color}
                opacity={hoveredAgent === node.id ? 1 : 0.6}
                style={{ transition: 'all 0.2s ease' }}
              />
              {/* Ambient pulse */}
              <motion.circle
                cx={node.x} cy={node.y} r={5}
                fill={node.color} opacity={0}
                animate={{ r: [5, 13], opacity: [0.3, 0] }}
                transition={{
                  duration: 2.5 + seededRandom(agentNodes.indexOf(node) + 100),
                  repeat: Infinity,
                  delay: seededRandom(agentNodes.indexOf(node) + 200) * 4,
                }}
              />
              {/* Hover label */}
              {hoveredAgent === node.id && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <rect
                    x={node.x - 55} y={node.y < cy ? node.y - 28 : node.y + 12}
                    width={110} height={18} rx={4}
                    fill="#0f0f1e" stroke={node.color} strokeWidth={0.5} strokeOpacity={0.6}
                  />
                  <text
                    x={node.x} y={node.y < cy ? node.y - 16 : node.y + 24}
                    textAnchor="middle" fill={node.color}
                    fontSize={8.5} fontFamily="var(--font-mono)">
                    {node.name}
                  </text>
                </motion.g>
              )}
            </g>
          ))}

          {/* ===== LAYER 6: PRIMARY FLOW ANIMATION (per cycle) ===== */}

          {/* 6a: Path glow — command → active module */}
          <motion.line
            key={`path-cmd-${cycleIndex}`}
            x1={activeCommand.x} y1={activeCommand.y + 12}
            x2={activeModule.x} y2={activeModule.y}
            stroke={activeCommand.color} strokeWidth={1.2}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 2, delay: 0.2 }}
          />

          {/* 6b: Particle — command → active module */}
          <motion.circle
            key={`p-cmd-mod-${cycleIndex}`}
            r={3} fill={activeCommand.color}
            initial={{ cx: activeCommand.x, cy: activeCommand.y + 12, opacity: 0 }}
            animate={{
              cx: [activeCommand.x, activeModule.x],
              cy: [activeCommand.y + 12, activeModule.y],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          />

          {/* 6c: Path glow — module → center */}
          <motion.line
            key={`path-mod-ctr-${cycleIndex}`}
            x1={activeModule.x} y1={activeModule.y}
            x2={cx} y2={cy}
            stroke={activeModule.color} strokeWidth={1.2}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.2, delay: 1.5 }}
          />

          {/* 6d: Particle — module → center */}
          <motion.circle
            key={`p-mod-ctr-${cycleIndex}`}
            r={2.5} fill={activeModule.color}
            initial={{ cx: activeModule.x, cy: activeModule.y, opacity: 0 }}
            animate={{
              cx: [activeModule.x, cx],
              cy: [activeModule.y, cy],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1, delay: 1.6, ease: 'easeInOut' }}
          />

          {/* 6e: Center dispatch pulse */}
          <motion.circle
            key={`dispatch-pulse-${cycleIndex}`}
            cx={cx} cy={cy} r={32}
            fill="transparent" stroke="#00ff88" strokeWidth={1.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0], r: [32, 55, 32] }}
            transition={{ duration: 1, delay: 2.5 }}
          />

          {/* 6f: Sequential agent dispatch — path + particle + name + glow + return */}
          {activeAgentTargets.map((agent, i) => {
            const baseDelay = 3.0 + i * 1.1
            const midX = (cx + agent.x) / 2 + (seededRandom(cycleIndex * 3 + i) - 0.5) * 25
            const midY = (cy + agent.y) / 2 + (seededRandom(cycleIndex * 3 + i + 10) - 0.5) * 20
            const labelY = getLabelY(agent.y)
            const textY = getLabelTextY(agent.y)

            return (
              <g key={`dispatch-group-${cycleIndex}-${i}`}>
                {/* Path glow: center → agent */}
                <motion.line
                  x1={cx} y1={cy} x2={agent.x} y2={agent.y}
                  stroke={agent.color} strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 1.8, delay: baseDelay }}
                />

                {/* Particle: center → agent (curved) */}
                <motion.circle
                  r={2.8} fill={agent.color}
                  initial={{ cx: cx, cy: cy, opacity: 0 }}
                  animate={{
                    cx: [cx, midX, agent.x],
                    cy: [cy, midY, agent.y],
                    opacity: [0, 1, 0.7, 0],
                  }}
                  transition={{ duration: 1.5, delay: baseDelay + 0.1, ease: 'easeOut' }}
                />

                {/* Agent activation glow ring */}
                <motion.circle
                  cx={agent.x} cy={agent.y} r={5}
                  fill="transparent" stroke={agent.color} strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0], r: [5, 24, 5] }}
                  transition={{ duration: 2, delay: baseDelay + 0.5 }}
                />

                {/* ★ AGENT NAME BADGE — prominent, clear ★ */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.8,
                    delay: baseDelay + 0.4,
                    times: [0, 0.1, 0.72, 1],
                    ease: 'easeInOut',
                  }}
                >
                  <rect
                    x={agent.x - 62} y={labelY}
                    width={124} height={24} rx={6}
                    fill="#0a0a18" stroke={agent.color} strokeWidth={1.2}
                    style={{ filter: `drop-shadow(0 0 8px ${agent.color}50)` }}
                  />
                  <text
                    x={agent.x} y={textY}
                    textAnchor="middle" dominantBaseline="central"
                    fill={agent.color} fontSize={10.5}
                    fontFamily="var(--font-mono)" fontWeight={600}
                  >
                    {agent.name}
                  </text>
                </motion.g>

                {/* Return particle: agent → center */}
                <motion.circle
                  r={1.8} fill="#00ff88"
                  initial={{ cx: agent.x, cy: agent.y, opacity: 0 }}
                  animate={{
                    cx: [agent.x, midX, cx],
                    cy: [agent.y, midY, cy],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 1.5, delay: baseDelay + 2, ease: 'easeIn' }}
                />
              </g>
            )
          })}

          {/* ===== LAYER 7: AMBIENT BACKGROUND FLOWS ===== */}

          {/* Ambient: module ↔ center exchange */}
          {moduleNodes.slice(0, 3).map((mod, i) => (
            <motion.circle
              key={`amb-mod-${i}`}
              r={1.2} fill={mod.color}
              animate={{
                cx: [mod.x, cx],
                cy: [mod.y, cy],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                delay: i * 2.5,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Ambient: cross-link agent ↔ agent flows */}
          {crossLinks.slice(0, 5).map((link, i) => (
            <g key={`amb-cross-${i}`}>
              <motion.circle
                r={1} fill={link.color}
                animate={{
                  cx: [link.from.x, link.to.x],
                  cy: [link.from.y, link.to.y],
                  opacity: [0, 0.18, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  delay: i * 1.8,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                r={1} fill={link.color}
                animate={{
                  cx: [link.to.x, link.from.x],
                  cy: [link.to.y, link.from.y],
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: i * 1.8 + 2.5,
                  ease: 'easeInOut',
                }}
              />
            </g>
          ))}

          {/* Ambient: center → random agents (subtle dispatch echoes) */}
          {agentNodes.slice(0, 6).map((node, i) => (
            <motion.circle
              key={`amb-out-${i}`}
              r={1} fill={node.color}
              animate={{
                cx: [cx, node.x],
                cy: [cy, node.y],
                opacity: [0, 0.12, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatDelay: 4 + seededRandom(i + 50) * 3,
                delay: i * 1.2 + seededRandom(i + 30) * 2,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Flash on manual workflow trigger via terminal */}
          {activeWorkflow &&
            agentNodes.slice(0, 10).map((node, i) => (
              <motion.circle
                key={`wf-pulse-${node.id}`}
                r={3} fill={node.color}
                initial={{ cx: cx, cy: cy, opacity: 0 }}
                animate={{
                  cx: [cx, node.x],
                  cy: [cy, node.y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.2, delay: i * 0.1, repeat: 1 }}
              />
            ))}
        </svg>
      </div>

      {/* Project Identity */}
      <motion.div
        className="relative z-10 text-center mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="font-mono text-sm text-text-muted tracking-widest uppercase mb-2">
          Agent Assistant
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto">
          <span className="text-text-accent">21 agents</span> ·{' '}
          <span className="text-gradient-cyan">1430+ skills</span> ·{' '}
          <span className="text-gradient-purple">12 topologies</span> ·{' '}
          <span className="text-gradient-amber">6 platforms</span>
        </p>
      </motion.div>

      {/* Interactive terminal */}
      <motion.div
        className="relative z-10 w-full max-w-xl mx-auto mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <HeroTerminal onExecute={triggerWorkflow} />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-text-muted font-mono">scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

/** Interactive terminal in the hero */
function HeroTerminal({ onExecute }: { onExecute: () => void }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const DEMO_COMMANDS: Record<string, string[]> = {
    '/cook:team': [
      '🔺 Activating Golden Triangle...',
      '   Tech Lead → decomposing tasks',
      '   Frontend Engineer → implementing',
      '   Reviewer → adversarial review',
      '✅ CONSENSUS: tech-lead ✓ | frontend-engineer ✓ | reviewer ✓',
    ],
    '/fix': [
      '🔍 Debugger activated — analyzing error...',
      '   Root cause: null reference in ProductList at line 42',
      '   Backend Engineer → patching',
      '   Reviewer → validating fix',
      '✅ Fix verified — 0 regressions',
    ],
    '/test': [
      '🧪 Tester activated — generating test suites...',
      '   Unit tests: 12 generated',
      '   Integration tests: 4 generated',
      '   Security Engineer → validating edge cases',
      '✅ Coverage: 94% — all tests pass',
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRunning || !input.trim()) return

    const cmd = input.trim()
    const matchedKey = Object.keys(DEMO_COMMANDS).find(k => cmd.startsWith(k))
    const lines = matchedKey ? DEMO_COMMANDS[matchedKey] : [
      `⚡ Routing command: ${cmd}`,
      '   Orchestrator → analyzing request...',
      '   Delegating to specialist agents...',
      '✅ Workflow complete',
    ]

    setIsRunning(true)
    setOutput([])
    onExecute()

    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line])
        if (i === lines.length - 1) {
          setIsRunning(false)
        }
      }, (i + 1) * 500)
    })

    setInput('')
  }

  return (
    <div className="rounded-lg border border-border-primary bg-bg-card overflow-hidden terminal-glow">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border-secondary bg-bg-secondary/50">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-red/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-amber/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-green/50" />
        <span className="ml-2 text-[10px] text-text-muted font-mono">agent-assistant</span>
      </div>

      {/* Output area */}
      {output.length > 0 && (
        <div className="px-4 pt-3 pb-1 space-y-1 font-mono text-xs">
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.startsWith('✅')
                  ? 'text-text-accent'
                  : line.startsWith('   ')
                    ? 'text-text-muted'
                    : 'text-text-secondary'
              }
            >
              {line}
            </motion.div>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-4 py-3">
        <span className="text-text-accent font-mono text-sm mr-2 select-none">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='/cook:team "build authentication system"'
          className="flex-1 bg-transparent text-sm font-mono text-text-primary outline-none placeholder:text-text-muted/50"
          disabled={isRunning}
          aria-label="Enter a command to see the orchestration flow"
        />
        {isRunning && (
          <span className="text-gradient-amber text-xs font-mono animate-pulse">running...</span>
        )}
      </form>
    </div>
  )
}
