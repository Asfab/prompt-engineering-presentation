import { motion } from 'framer-motion'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const scenarios = [
  {
    icon: '🌾',
    topic: 'Agriculture',
    name: 'Wayanad Crop Doctor',
    desc: 'Farmers need disease diagnosis for their crops — in Malayalam',
  },
  {
    icon: '🏫',
    topic: 'Education',
    name: 'Malayalam Tutor',
    desc: 'Students need personalised tutoring in their native medium',
  },
  {
    icon: '🏥',
    topic: 'Health',
    name: 'Drug Advisor',
    desc: 'Village health workers need drug interaction and dosage info',
  },
  {
    icon: '⚖️',
    topic: 'Legal',
    name: 'Contract Helper',
    desc: 'Small business owners need plain-language contract advice',
  },
  {
    icon: '🚌',
    topic: 'Tourism',
    name: 'Local Guide',
    desc: 'Tourists need authentic local experience recommendations',
  },
]

const designQs = [
  'What is your AI product called?',
  'Who exactly is the user — be specific',
  'Which approach: Prompting, Fine-tuning, or RAG? Why?',
  'What data or documents would it need access to?',
  'How would you know if it\'s working well?',
]

export default function Slide14() {
  return (
    <div className="slide slide--exercise">
      <motion.div
        className="flex-col flex-1 flex"
        style={{ minHeight: 0, gap: 0 }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <span className="slide-tag slide-tag--exercise">Take-Home Challenge</span>
          <h1 className="slide-title">Design Your Own AI Product</h1>
          <p className="slide-subtitle">Pick a problem you care about. Sketch the idea. Start building this week.</p>
          <div className="title-line" style={{ background: 'var(--accent)' }} />
        </motion.div>

        <div className="slide-body" style={{ gap: '1rem', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Scenario cards */}
          <motion.div variants={stagger} className="scenario-grid">
            {scenarios.map((s, i) => (
              <motion.div key={i} variants={scaleIn} className="scenario-card">
                <span className="scenario-icon">{s.icon}</span>
                <div className="scenario-topic">{s.topic}</div>
                <div className="scenario-name">{s.name}</div>
                <div className="scenario-desc">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Design questions */}
          <motion.div variants={fadeUp} className="section-heading">Design Framework — Answer These</motion.div>
          <motion.div variants={stagger} className="design-questions">
            {designQs.map((q, i) => (
              <motion.div key={i} variants={fadeUp} className="dq-item">
                <span className="dq-num">{i + 1}.</span>
                <span>{q}</span>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: 'auto' }}>
            <motion.div variants={fadeUp} className="insight insight--accent">
              <div className="insight-label" style={{ color: 'var(--accent)' }}>Free Tools to Start With</div>
              <p>
                <strong>ChatGPT / Gemini / Claude</strong> (free tiers) for prompting ·
                <strong> Groq API</strong> for fast free inference ·
                <strong> Google Colab</strong> for running code
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="insight insight--green">
              <div className="insight-label" style={{ color: 'var(--green)' }}>Where to Start</div>
              <p>
                Don't wait for the perfect idea. Pick any problem from the list,
                write a <strong>system prompt</strong> for it, and see what happens.
                That's step one.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
