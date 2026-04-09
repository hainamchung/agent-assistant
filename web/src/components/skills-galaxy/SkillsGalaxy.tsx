import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillDomains } from '../../data/skills'

// Deterministic pseudo-random
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  domain: string
  skillName: string
}

interface Cluster {
  name: string
  count: number
  icon: string
  cx: number
  cy: number
  color: string
  examples: string[]
}

const DOMAIN_COLORS: Record<string, string> = {
  Backend: '#00d4ff',
  Frontend: '#8844ff',
  Architecture: '#ff8844',
  Quality: '#00ff88',
  Security: '#ff4444',
  Design: '#ffb347',
  Planning: '#8844ff',
  DevOps: '#ff8844',
  Data: '#00d4ff',
  Performance: '#ffb347',
  Research: '#00ff88',
  Mobile: '#00d4ff',
  Gaming: '#ff4444',
  Management: '#ff8844',
  'AI/ML': '#8844ff',
  Cloud: '#00d4ff',
  Languages: '#ffb347',
  Tools: '#6a6a9a',
  'MCP & Agents': '#00ff88',
}

export function SkillsGalaxy() {
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const width = 1000
  const height = 700

  // Generate cluster positions — 2-ring spiral layout for maximum spacing
  const clusters: Cluster[] = useMemo(() => {
    const cxCenter = width / 2
    const cyCenter = height / 2
    // Split into 2 concentric rings: inner (7 items) and outer (12 items)
    const innerCount = 7
    const outerCount = skillDomains.length - innerCount

    return skillDomains.map((domain, i) => {
      let angle: number
      let radius: number
      if (i < innerCount) {
        // Inner ring
        angle = (2 * Math.PI * i) / innerCount - Math.PI / 2
        radius = 150
      } else {
        // Outer ring
        const outerIdx = i - innerCount
        angle = (2 * Math.PI * outerIdx) / outerCount - Math.PI / 3
        radius = 280
      }
      return {
        name: domain.name,
        count: domain.count,
        icon: domain.icon,
        cx: cxCenter + radius * Math.cos(angle),
        cy: cyCenter + radius * Math.sin(angle),
        color: DOMAIN_COLORS[domain.name] || '#6a6a9a',
        examples: domain.examples,
      }
    })
  }, [])

  // Generate stars around each cluster — wider spread
  const stars: Star[] = useMemo(() => {
    const result: Star[] = []
    let seedIdx = 0
    clusters.forEach(cluster => {
      const starCount = Math.min(Math.ceil(cluster.count / 2), 20)
      for (let i = 0; i < starCount; i++) {
        seedIdx++
        const angle = seeded(seedIdx) * 2 * Math.PI
        const dist = 20 + seeded(seedIdx + 1000) * 45
        result.push({
          x: cluster.cx + dist * Math.cos(angle),
          y: cluster.cy + dist * Math.sin(angle),
          size: 0.5 + seeded(seedIdx + 2000) * 1.8,
          brightness: 0.3 + seeded(seedIdx + 3000) * 0.7,
          domain: cluster.name,
          skillName: cluster.examples[i % cluster.examples.length] || cluster.name,
        })
      }
    })
    return result
  }, [clusters])

  // Background ambient stars via canvas for performance
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    // Ambient background stars
    for (let i = 0; i < 200; i++) {
      const sx = seeded(i * 13 + 500) * width
      const sy = seeded(i * 17 + 700) * height
      const sr = 0.3 + seeded(i * 11 + 900) * 0.7
      ctx.fillStyle = `rgba(160, 160, 192, ${0.1 + seeded(i * 19 + 1100) * 0.3})`
      ctx.beginPath()
      ctx.arc(sx, sy, sr, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const totalSkills = skillDomains.reduce((sum, d) => sum + d.count, 0)
  const activeCluster = clusters.find(c => c.name === (selectedCluster || hoveredCluster))

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
            Auto-Injected Domain Knowledge
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            <span className="text-text-accent">{totalSkills}+</span> Skills Across{' '}
            <span className="text-gradient-cyan">{skillDomains.length}</span> Domains
          </h2>
          <p className="mt-2 text-text-secondary max-w-lg mx-auto text-sm">
            Each star is a skill. Agents declare their profile — the matrix injects relevant skills automatically.
          </p>
        </motion.div>

        {/* Galaxy visualization */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background canvas (ambient stars) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            style={{ width, height }}
            aria-hidden="true"
          />

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto relative z-10"
            role="img"
            aria-label={`Skills galaxy showing ${totalSkills} skills across ${skillDomains.length} domains`}
          >
            {/* Stars */}
            {stars.map((star, i) => {
              const isActive = !hoveredCluster || star.domain === (selectedCluster || hoveredCluster)
              return (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={star.size}
                  fill={DOMAIN_COLORS[star.domain] || '#6a6a9a'}
                  opacity={isActive ? star.brightness : 0.08}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              )
            })}

            {/* Cluster labels */}
            {clusters.map((cluster) => {
              const isActive = !hoveredCluster || cluster.name === (selectedCluster || hoveredCluster)
              return (
                <g
                  key={cluster.name}
                  onMouseEnter={() => setHoveredCluster(cluster.name)}
                  onMouseLeave={() => setHoveredCluster(null)}
                  onClick={() => setSelectedCluster(prev => prev === cluster.name ? null : cluster.name)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onFocus={() => setHoveredCluster(cluster.name)}
                  onBlur={() => setHoveredCluster(null)}
                  aria-label={`${cluster.name}: ${cluster.count} skills`}
                >
                  {/* Cluster center glow */}
                  <circle
                    cx={cluster.cx}
                    cy={cluster.cy}
                    r={8}
                    fill={cluster.color}
                    opacity={isActive ? 0.6 : 0.15}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                  <circle
                    cx={cluster.cx}
                    cy={cluster.cy}
                    r={20}
                    fill={cluster.color}
                    opacity={isActive ? 0.08 : 0.02}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />

                  {/* Label */}
                  <text
                    x={cluster.cx}
                    y={cluster.cy + 32}
                    textAnchor="middle"
                    fill={isActive ? cluster.color : '#6a6a9a'}
                    fontSize={9}
                    fontFamily="var(--font-mono)"
                    fontWeight={isActive ? 600 : 400}
                    opacity={isActive ? 1 : 0.4}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {cluster.icon} {cluster.name}
                  </text>
                  <text
                    x={cluster.cx}
                    y={cluster.cy + 44}
                    textAnchor="middle"
                    fill="#6a6a9a"
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                    opacity={isActive ? 0.7 : 0.2}
                    style={{ transition: 'opacity 0.3s ease' }}
                  >
                    {cluster.count} skills
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Detail panel when cluster selected  */}
          <AnimatePresence>
            {activeCluster && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg border bg-bg-card/95 backdrop-blur-sm max-w-xs w-full"
                style={{ borderColor: `${activeCluster.color}33` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{activeCluster.icon}</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: activeCluster.color }}>
                    {activeCluster.name}
                  </span>
                  <span className="text-xs text-text-muted ml-auto">{activeCluster.count} skills</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {activeCluster.examples.map(ex => (
                    <span
                      key={ex}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      style={{
                        borderColor: `${activeCluster.color}33`,
                        color: activeCluster.color,
                        backgroundColor: `${activeCluster.color}0a`,
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Screen reader description */}
        <div className="sr-only">
          <h3>Skills by domain:</h3>
          <ul>
            {skillDomains.map(d => (
              <li key={d.name}>{d.name}: {d.count} skills — {d.examples.join(', ')}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
