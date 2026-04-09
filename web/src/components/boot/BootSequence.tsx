import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootLine {
  text: string
  status: 'loading' | 'done' | 'idle'
  delay: number
}

const BOOT_LINES: BootLine[] = [
  { text: 'Initializing Agent Assistant v2.0...', status: 'idle', delay: 0 },
  { text: 'Loading RUNTIME.md — Orchestration Protocol', status: 'idle', delay: 200 },
  { text: 'Registering 21 specialist agents', status: 'idle', delay: 400 },
  { text: 'Mapping 1430+ domain skills across 19 domains', status: 'idle', delay: 600 },
  { text: 'Loading 12 execution topologies', status: 'idle', delay: 800 },
  { text: 'Activating Golden Triangle protocol', status: 'idle', delay: 950 },
  { text: 'All systems operational — Ready.', status: 'idle', delay: 1100 },
]

const TOTAL_DURATION = 1500

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<BootLine[]>(BOOT_LINES)
  const [dismissed, setDismissed] = useState(false)

  const handleComplete = useCallback(() => {
    setDismissed(true)
    setTimeout(onComplete, 400)
  }, [onComplete])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, index) => {
      // Start loading
      timers.push(
        setTimeout(() => {
          setLines(prev =>
            prev.map((l, i) => (i === index ? { ...l, status: 'loading' } : l))
          )
        }, line.delay)
      )
      // Mark done
      timers.push(
        setTimeout(() => {
          setLines(prev =>
            prev.map((l, i) => (i === index ? { ...l, status: 'done' } : l))
          )
        }, line.delay + 150)
      )
    })

    // Auto-dismiss
    timers.push(setTimeout(handleComplete, TOTAL_DURATION))

    return () => timers.forEach(clearTimeout)
  }, [handleComplete])

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-lg px-6">
            {/* Terminal chrome */}
            <div className="rounded-lg border border-border-primary bg-bg-card overflow-hidden shadow-lg shadow-black/50">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border-primary bg-bg-secondary">
                <div className="w-3 h-3 rounded-full bg-gradient-red/60" />
                <div className="w-3 h-3 rounded-full bg-gradient-amber/60" />
                <div className="w-3 h-3 rounded-full bg-gradient-green/60" />
                <span className="ml-2 text-xs text-text-muted font-mono">agent-assistant — boot</span>
              </div>

              {/* Boot output */}
              <div className="p-4 font-mono text-sm space-y-1 min-h-[220px]">
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={
                      line.status !== 'idle'
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -8 }
                    }
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2"
                  >
                    <span className="shrink-0 w-4 text-center">
                      {line.status === 'loading' && (
                        <span className="text-gradient-amber animate-pulse">⠋</span>
                      )}
                      {line.status === 'done' && (
                        <span className="text-text-accent">✓</span>
                      )}
                    </span>
                    <span
                      className={
                        line.status === 'done'
                          ? 'text-text-secondary'
                          : line.status === 'loading'
                            ? 'text-text-primary'
                            : 'text-text-muted'
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-border-secondary">
                  <div className="h-1 w-full rounded-full bg-bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: TOTAL_DURATION / 1000, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skip hint */}
            <motion.p
              className="text-center text-xs text-text-muted mt-3 font-mono cursor-pointer hover:text-text-secondary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleComplete}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleComplete()}
            >
              click to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
