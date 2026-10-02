import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const pipeline = [
  { label: 'User Input', sub: '', variant: '' },
  { label: 'Input Validation & Safety', sub: 'guardrails', variant: '' },
  { label: 'Prompt Template Engine', sub: 'dynamic, versioned', variant: 'primary' },
  { label: 'RAG: Vector DB Lookup', sub: 'ChromaDB / Pinecone', variant: 'accent' },
  { label: 'LLM API Call', sub: 'OpenAI · Gemini · Claude · OSS', variant: 'primary' },
  { label: 'Output Parser & Validator', sub: 'Pydantic · guardrails', variant: '' },
  { label: 'Response + Logging', sub: 'LangSmith · Helicone', variant: '' },
  { label: 'User Output', sub: '', variant: 'green' },
]

const components = [
  { label: 'Prompt Templates', desc: 'Dynamic, versioned, tested' },
  { label: 'Embedding Pipeline', desc: 'Text → vectors for semantic search' },
  { label: 'Vector Store', desc: 'ChromaDB, Pinecone, Weaviate' },
  { label: 'LLM API', desc: 'OpenAI, Google, Anthropic, OSS' },
  { label: 'Output Validation', desc: 'Pydantic, guardrails' },
  { label: 'Observability', desc: 'LangSmith, Helicone' },
]

export default function Slide12() {
  return (
    <SlideLayout
      tag="Architecture"
      tagVariant="arch"
      title="The Full Architecture"
      subtitle="How a Production AI App Actually Works"
    >
      <div className="two-col" style={{ alignItems: 'stretch' }}>
        {/* Left — pipeline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
        >
          <motion.div variants={fadeUp} className="section-heading" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
            Request Pipeline
          </motion.div>

          {pipeline.map((item, i) => (
            <motion.div key={i} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
              <div
                className={`arch-box ${item.variant ? `arch-box--${item.variant}` : ''}`}
                style={{ width: '100%' }}
              >
                {item.label}
                {item.sub && (
                  <div className="arch-box-sub">{item.sub}</div>
                )}
              </div>
              {i < pipeline.length - 1 && (
                <div className="flow-arrow-v" style={{ margin: '2px 0' }} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Right — components + insight */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">Key Components</motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
            {components.map((c, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '0.65rem 1rem', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-mid)', flexShrink: 0, marginTop: '0.45em' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>{c.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '0.1rem' }}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="insight">
            <div className="insight-label">What separates a hobbyist from an AI engineer</div>
            <p>
              You already know Python and APIs — this is just <strong>connecting components</strong>.
              The new skills: prompt design, embedding pipeline, and evaluation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
