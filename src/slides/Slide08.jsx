import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const limitations = [
  'Your company\'s specific style or tone',
  'Domain-specific vocabulary (medical, legal, regional)',
  'A consistent format across thousands of API calls',
  'Faster, cheaper inference than few-shot prompting',
]

export default function Slide08() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="When Prompts Aren't Enough"
      subtitle="Enter: Fine-Tuning"
    >
      <div className="two-col two-col--4060" style={{ alignItems: 'stretch' }}>
        {/* Left — when to use it */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Prompting works great for general tasks. But sometimes you need the model to consistently handle:
            </p>
            <ul className="point-list point-list--lg">
              {limitations.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="insight" style={{ marginTop: 'auto' }}>
            <div className="insight-label">Definition</div>
            <p>
              <strong>Fine-tuning</strong> = taking a pre-trained model and training it further on <em>your</em> data.
              Not building from scratch — redirecting existing knowledge.
            </p>
          </motion.div>
        </motion.div>

        {/* Right — analogy visual */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">The Intern Analogy</motion.div>

          <motion.div variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
            {/* Pre-trained */}
            <div className="card card--primary" style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.1rem' }}>🎓</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>Pre-trained Model</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>Day 0</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.55 }}>
                A brilliant intern, fresh from university. Knowledgeable, eager, but unfamiliar with
                your company's specific way of doing things.
              </p>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: 'var(--text-4)', fontSize: '1.25rem' }}>↓</div>

            {/* Fine-tuned */}
            <div className="card card--green" style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.1rem' }}>💼</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--green)' }}>Fine-tuned Model</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>6 months in</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.55 }}>
                That same intern after 6 months at your company. Knows your style, your terminology,
                your clients. Same intelligence, company-specific expertise.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--r)', padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--text-3)', textAlign: 'center' }}>
            Transfer learning — we redirect existing knowledge, not build from zero
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
