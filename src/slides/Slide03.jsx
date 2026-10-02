import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const points = [
  { strong: 'A prompt', rest: ' = the input you give the model' },
  { strong: 'Prompt Engineering', rest: ' = designing inputs to get reliable, high-quality outputs' },
  { strong: 'Part art, part science, part psychology', rest: '' },
  { strong: 'The model takes words literally', rest: ' — garbage in, garbage out' },
  { strong: 'Small wording changes', rest: ' = dramatically different results' },
]

export default function Slide03() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="What is Prompt Engineering?"
      subtitle="The Art of Talking to a Very Literal Genie"
    >
      <div className="two-col two-col--6040" style={{ alignItems: 'stretch' }}>
        {/* Left — key concepts */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
        >
          <ul className="point-list point-list--lg">
            {points.map((p, i) => (
              <motion.li key={i} variants={fadeUp}>
                <strong>{p.strong}</strong>{p.rest}
              </motion.li>
            ))}
          </ul>

          <motion.div variants={fadeUp} className="insight" style={{ marginTop: 'auto' }}>
            <div className="insight-label">Think of it like</div>
            <p>
              Writing a message to someone who will do <strong>exactly</strong> what you say —
              nothing more, nothing less. What would you write?
            </p>
          </motion.div>
        </motion.div>

        {/* Right — before / after */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">Real Example</motion.div>

          <motion.div variants={scaleIn} className="compare-item compare-item--before" style={{ flex: 1 }}>
            <div className="compare-label compare-label--before">Before — Vague</div>
            <div className="compare-prompt">"Write code for login"</div>
            <div className="compare-quality compare-quality--before">
              → Generic, probably wrong, missing context
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="compare-item compare-item--after" style={{ flex: 1 }}>
            <div className="compare-label compare-label--after">After — Specific</div>
            <div className="compare-prompt">
              "Write a <strong>Python Flask</strong> login endpoint using{' '}
              <strong>JWT authentication</strong>. Return JSON. Handle errors
              with appropriate HTTP status codes."
            </div>
            <div className="compare-quality compare-quality--after">
              → Targeted, usable, production-ready
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
