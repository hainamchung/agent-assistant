import { useEffect, useRef } from 'react'

// ===== Configuration =====

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 120
const STREAM_COUNT = 5
const STREAM_PARTICLE_COUNT = 12

const BRAND_COLORS = [
  { r: 136, g: 68, b: 255 },   // purple
  { r: 0, g: 212, b: 255 },    // cyan
  { r: 0, g: 255, b: 136 },    // green
  { r: 255, g: 68, b: 68 },    // red
  { r: 255, g: 136, b: 68 },   // orange
]

// ===== Types =====

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  colorIdx: number
  layer: number // 0 = far, 1 = mid, 2 = near
}

interface StreamParticle {
  progress: number // 0-1 along the stream path
  speed: number
  offset: number // perpendicular offset
  size: number
  opacity: number
}

interface Stream {
  // Bezier control points (normalized 0-1)
  x0: number; y0: number
  x1: number; y1: number
  x2: number; y2: number
  x3: number; y3: number
  colorIdx: number
  particles: StreamParticle[]
  drift: number // slow horizontal drift
  driftSpeed: number
}

interface GlowZone {
  x: number
  y: number
  radius: number
  colorIdx: number
  phase: number
  speed: number
}

// ===== Helpers =====

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function createParticle(w: number, h: number, i: number): Particle {
  const layer = i % 3
  const speedMultiplier = layer === 0 ? 0.15 : layer === 1 ? 0.3 : 0.5
  return {
    x: seededRandom(i * 7 + 1) * w,
    y: seededRandom(i * 7 + 2) * h,
    vx: (seededRandom(i * 7 + 3) - 0.5) * speedMultiplier,
    vy: (seededRandom(i * 7 + 4) - 0.5) * speedMultiplier,
    size: layer === 0 ? 0.8 : layer === 1 ? 1.2 : 1.8,
    opacity: layer === 0 ? 0.15 : layer === 1 ? 0.25 : 0.4,
    colorIdx: i % BRAND_COLORS.length,
    layer,
  }
}

function createStream(idx: number): Stream {
  const fromLeft = idx % 2 === 0
  const yBand = (idx + 0.5) / STREAM_COUNT

  return {
    x0: fromLeft ? -0.1 : 1.1,
    y0: yBand + (seededRandom(idx * 13 + 1) - 0.5) * 0.3,
    x1: fromLeft ? 0.25 : 0.75,
    y1: yBand + (seededRandom(idx * 13 + 2) - 0.5) * 0.4,
    x2: fromLeft ? 0.65 : 0.35,
    y2: yBand + (seededRandom(idx * 13 + 3) - 0.5) * 0.4,
    x3: fromLeft ? 1.1 : -0.1,
    y3: yBand + (seededRandom(idx * 13 + 4) - 0.5) * 0.3,
    colorIdx: idx % BRAND_COLORS.length,
    particles: Array.from({ length: STREAM_PARTICLE_COUNT }, (_, j) => ({
      progress: j / STREAM_PARTICLE_COUNT,
      speed: 0.0004 + seededRandom(idx * 100 + j) * 0.0003,
      offset: (seededRandom(idx * 100 + j + 50) - 0.5) * 30,
      size: 1 + seededRandom(idx * 100 + j + 80) * 2,
      opacity: 0.15 + seededRandom(idx * 100 + j + 90) * 0.2,
    })),
    drift: 0,
    driftSpeed: 0.00003 + seededRandom(idx * 31) * 0.00004,
  }
}

// ===== Component =====

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = document.documentElement.scrollHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    // Create entities
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
      createParticle(w, h, i)
    )

    const streams: Stream[] = Array.from({ length: STREAM_COUNT }, (_, i) =>
      createStream(i)
    )

    const glowZones: GlowZone[] = Array.from({ length: 4 }, (_, i) => ({
      x: 0.2 + seededRandom(i * 17 + 1) * 0.6,
      y: 0.15 + seededRandom(i * 17 + 2) * 0.7,
      radius: 200 + seededRandom(i * 17 + 3) * 200,
      colorIdx: i % BRAND_COLORS.length,
      phase: seededRandom(i * 17 + 4) * Math.PI * 2,
      speed: 0.0002 + seededRandom(i * 17 + 5) * 0.0003,
    }))

    let lastTime = performance.now()

    // Animation loop
    const draw = (now: number) => {
      const dt = Math.min(now - lastTime, 32) // Cap delta for tab-away
      lastTime = now

      ctx.clearRect(0, 0, w, h)

      // === Layer 0: Glow zones ===
      glowZones.forEach(zone => {
        zone.phase += zone.speed * dt
        const pulseX = zone.x * w + Math.sin(zone.phase) * 60
        const pulseY = zone.y * h + Math.cos(zone.phase * 0.7) * 40
        const c = BRAND_COLORS[zone.colorIdx]
        const grad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, zone.radius)
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.04)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(pulseX - zone.radius, pulseY - zone.radius, zone.radius * 2, zone.radius * 2)
      })

      // === Layer 1: Constellation particles + connections ===

      // Update particles
      particles.forEach(p => {
        p.x += p.vx * dt * 0.06
        p.y += p.vy * dt * 0.06

        // Wrap around
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      })

      // Draw connections (only between same/adjacent layers)
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          if (Math.abs(a.layer - b.layer) > 1) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.08
            const c = BRAND_COLORS[a.colorIdx]
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        const c = BRAND_COLORS[p.colorIdx]
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // === Layer 2: Flowing streams ===
      streams.forEach(stream => {
        stream.drift += stream.driftSpeed * dt
        const c = BRAND_COLORS[stream.colorIdx]

        stream.particles.forEach(sp => {
          sp.progress += sp.speed * dt
          if (sp.progress > 1) sp.progress -= 1

          const t = sp.progress
          const sx = bezierPoint(t, stream.x0, stream.x1, stream.x2, stream.x3) * w
          const sy = bezierPoint(t, stream.y0, stream.y1, stream.y2, stream.y3) * h + sp.offset

          // Tangent for perpendicular offset computation is already baked into sp.offset
          const yDrift = Math.sin(stream.drift + t * 4) * 15

          // Glow
          const grad = ctx.createRadialGradient(sx, sy + yDrift, 0, sx, sy + yDrift, sp.size * 4)
          grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${sp.opacity * 0.5})`)
          grad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = grad
          ctx.fillRect(sx - sp.size * 4, sy + yDrift - sp.size * 4, sp.size * 8, sp.size * 8)

          // Core dot
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${sp.opacity})`
          ctx.beginPath()
          ctx.arc(sx, sy + yDrift, sp.size, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    // Debounced resize
    let resizeTimer: number
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 200)
    }
    window.addEventListener('resize', handleResize)

    // Resize on content change (MutationObserver on body height)
    const ro = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight
      if (Math.abs(newH - h) > 50) resize()
    })
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
