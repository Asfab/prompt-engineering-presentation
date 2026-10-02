import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100
  return (
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      />
    </div>
  )
}
