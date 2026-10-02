import { motion } from 'framer-motion'
import { stagger, fadeUp } from './animations.js'

export default function SlideLayout({
  tag,
  tagVariant = 'concept',
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <div className={`slide ${className}`}>
      <motion.div
        className="flex-col flex-1 flex"
        style={{ minHeight: 0, gap: 0 }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          {tag && (
            <span className={`slide-tag slide-tag--${tagVariant}`}>{tag}</span>
          )}
          <h1 className="slide-title">{title}</h1>
          {subtitle && <p className="slide-subtitle">{subtitle}</p>}
          <div className="title-line" />
        </motion.div>

        {/* Body */}
        <div className="slide-body">{children}</div>
      </motion.div>
    </div>
  )
}
