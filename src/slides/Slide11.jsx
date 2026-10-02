import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const problems = [
  'LLMs have a knowledge cutoff — they don\'t know recent events',
  'They hallucinate facts they\'re uncertain about',
  'Your private company data isn\'t in their training set',
]

const useCases = [
  { icon: '💬', name: 'Customer support bot', desc: '"knows" your product docs' },
  { icon: '⚖️', name: 'Legal assistant', desc: 'grounded in case law' },
  { icon: '🏫', name: 'College advisor', desc: 'knows your institution\'s policies' },
]

const steps = [
  { label: 'User Query', variant: '' },
  { label: 'Embedding Model\n→ Query Vector', variant: 'primary' },
  { label: 'Vector DB Search\n→ Top-K Chunks', variant: 'accent' },
  { label: 'Prompt Assembly\nContext + Question', variant: '' },
  { label: 'LLM', variant: 'primary' },
  { label: 'Grounded Answer', variant: 'green' },
]

export default function Slide11() {
  return (
    <SlideLayout
      tag="Architecture"
      tagVariant="arch"
      title="RAG: When the Model Needs a Library Card"
      subtitle="Retrieval-Augmented Generation"
    >
      <div className="two-col" style={{ alignItems: 'stretch' }}>
        {/* Left — problem + use cases */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <motion.div variants={fadeUp}>
            <div className="section-heading">The Problem</div>
            <ul className="point-list" style={{ marginBottom: '1rem' }}>
              {problems.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="insight insight--green">
            <div className="insight-label" style={{ color: 'var(--green)' }}>The Solution</div>
            <p>
              Retrieve relevant documents <strong>at query time</strong> and inject them into the prompt.
              The model answers using both its training <em>and</em> retrieved context.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="section-heading" style={{ marginTop: '0.5rem' }}>Real-World Use</motion.div>
          <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
            {useCases.map((u, i) => (
              <motion.div key={i} variants={scaleIn} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{u.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>{u.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{u.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — RAG architecture */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.div variants={fadeUp} className="section-heading" style={{ alignSelf: 'flex-start' }}>Architecture Flow</motion.div>

          <motion.div
            variants={stagger}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%' }}
          >
            {steps.map((s, i) => (
              <motion.div key={i} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div
                  className={`flow-box ${s.variant ? `flow-box--${s.variant}` : ''}`}
                  style={{ width: '80%', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4, fontSize: '0.8rem', padding: '0.6rem 1rem' }}
                >
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <div className="flow-arrow-v" style={{ marginTop: '2px', marginBottom: '2px' }} />
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--r)', padding: '0.6rem 1rem', fontSize: '0.78rem', color: 'var(--text-3)', textAlign: 'center', width: '100%' }}>
            Vector DBs: ChromaDB (free/local) · Pinecone · Weaviate
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
