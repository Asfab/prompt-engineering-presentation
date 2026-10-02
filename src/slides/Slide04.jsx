import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const techniques = [
  {
    num: '01',
    name: 'Zero-Shot',
    desc: 'Just ask — no examples needed. Works well for simple, common tasks.',
    example: '"Translate to Malayalam:\n\'Good morning\'"',
    when: 'Simple, straightforward tasks',
  },
  {
    num: '02',
    name: 'Few-Shot',
    desc: 'Show examples before asking. Guides the model toward your intended pattern.',
    example: '"Positive: Great food! → Happy\nNegative: Terrible service → Sad\nNeutral: It was okay → ___"',
    when: 'Pattern-matching tasks',
  },
  {
    num: '03',
    name: 'Chain-of-Thought',
    desc: 'Ask the model to reason step by step. Dramatically improves complex problem solving.',
    example: '"Solve this. Think step by step\nbefore giving your final answer."',
    when: 'Complex reasoning tasks',
  },
]

export default function Slide04() {
  return (
    <SlideLayout
      tag="Technique"
      tagVariant="technique"
      title="The Prompting Toolkit — Part 1"
      subtitle="Zero-Shot → Few-Shot → Chain of Thought"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <div className="three-col" style={{ flex: 1 }}>
          {techniques.map((t) => (
            <motion.div key={t.num} variants={scaleIn} className="tech-card">
              <div className="tech-card-num">{t.num}</div>
              <div className="tech-card-name">{t.name} Prompting</div>
              <p className="tech-card-desc">{t.desc}</p>
              <div className="tech-example">{t.example}</div>
            </motion.div>
          ))}
        </div>

        {/* Rule of thumb bar */}
        <motion.div variants={fadeUp} className="rule-bar">
          {techniques.map((t) => (
            <div key={t.num} className="rule-item">
              <div className="rule-dot" />
              <div className="rule-text">
                <strong>{t.name}:</strong> {t.when}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
