import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { fadeUp } from '../components/animations.js'

// Each component gets its own colour pair: [text, bg, border]
const components = [
  {
    label: 'Role',
    value: 'You are a Python expert and a patient teacher',
    colors: { badge: '#4F46E5', badgeBg: '#EEF2FF', line: '#4F46E5', lineBg: '#EEF2FF' },
  },
  {
    label: 'Context',
    value: "I'm a first-year CS student, new to web development",
    colors: { badge: '#0369A1', badgeBg: '#E0F2FE', line: '#0369A1', lineBg: '#F0F9FF' },
  },
  {
    label: 'Task',
    value: 'Explain how REST APIs work',
    colors: { badge: '#D97706', badgeBg: '#FFFBEB', line: '#D97706', lineBg: '#FFFBEB' },
  },
  {
    label: 'Format',
    value: 'Use numbered steps with one short code example',
    colors: { badge: '#059669', badgeBg: '#ECFDF5', line: '#059669', lineBg: '#F0FDF4' },
  },
  {
    label: 'Constraint',
    value: 'Max 150 words — no jargon',
    colors: { badge: '#7C3AED', badgeBg: '#F3E8FF', line: '#7C3AED', lineBg: '#FAF5FF' },
  },
]

// stagger each child by 0.35 s so the build-up is visible
const buildStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
}

const assembleItem = {
  hidden: { opacity: 0, scaleX: 0.9, originX: 0 },
  show:   { opacity: 1, scaleX: 1,   transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

export default function SlidePromptAnatomy() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="Anatomy of a Great Prompt"
      subtitle="Five building blocks — combine them to get reliable results every time"
    >
      <div className="two-col two-col--6040" style={{ alignItems: 'stretch' }}>

        {/* Left — component cards stagger in */}
        <motion.div
          variants={buildStagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', justifyContent: 'center' }}
        >
          {components.map((c) => (
            <motion.div key={c.label} variants={slideLeft} className="anatomy-component">
              <span
                className="anatomy-badge"
                style={{ color: c.colors.badge, background: c.colors.badgeBg }}
              >
                {c.label}
              </span>
              <span className="anatomy-value">"{c.value}"</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right — assembled prompt, each line synced to left stagger */}
        <motion.div
          variants={buildStagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">
            Assembled Prompt
          </motion.div>

          <div className="anatomy-assembled">
            <div className="anatomy-assembled-header">Complete prompt sent to the model →</div>

            {components.map((c) => (
              <motion.span
                key={c.label}
                variants={assembleItem}
                className="anatomy-line"
                style={{
                  color: c.colors.line,
                  background: c.colors.lineBg,
                  display: 'block',
                }}
              >
                {c.value}.
              </motion.span>
            ))}
          </div>

          <motion.div variants={fadeUp} className="insight">
            <div className="insight-label">Why it works</div>
            <p>
              Each component removes ambiguity. The model knows <strong>who it is</strong>,{' '}
              <strong>who it's talking to</strong>, <strong>what to do</strong>,{' '}
              <strong>how to format it</strong>, and <strong>what limits to respect</strong>.
              Nothing is left to chance.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </SlideLayout>
  )
}
