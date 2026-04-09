import { motion } from 'framer-motion'

interface SectionDividerProps {
  color?: string
}

export function SectionDivider({ color = '#1a1a3e' }: SectionDividerProps) {
  return (
    <motion.div
      className="relative py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}
