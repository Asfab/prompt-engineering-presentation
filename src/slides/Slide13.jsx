import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp } from '../components/animations.js'

const methods = [
  { method: 'Human Eval', desc: 'Humans rate output quality — gold standard but slow' },
  { method: 'LLM-as-Judge', desc: 'Use a powerful model to grade another — scalable' },
  { method: 'BLEU / ROUGE', desc: 'Metric-based — for summarisation and translation' },
  { method: 'Exact Match', desc: 'For structured tasks (JSON, code, classification)' },
  { method: 'Consistency Check', desc: 'Same question → same answer every time?' },
  { method: 'Adversarial Testing', desc: 'Intentionally try to break it' },
]

const metrics = [
  { label: 'Accuracy', sub: 'Factual correctness' },
  { label: 'Relevance', sub: 'Did it answer the question?' },
  { label: 'Tone & Style', sub: 'Matches your brand/persona' },
  { label: 'Latency', sub: 'Time to first token' },
  { label: 'Cost', sub: 'Per-call & aggregate' },
  { label: 'Failure Rate', sub: 'Refusals & hallucinations' },
]

export default function Slide13() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="Evaluation: How Do You Know It's Working?"
      subtitle="You Can't Improve What You Don't Measure"
    >
      <div className="two-col" style={{ alignItems: 'stretch' }}>
        {/* Left — methods */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">Evaluation Methods</motion.div>

          <motion.div variants={fadeUp} className="insight insight--accent">
            <div className="insight-label" style={{ color: 'var(--accent)' }}>Why It's Hard</div>
            <p>
              There's rarely a single "correct" answer. Human preferences vary.
              The model can sound <strong>confident and be wrong</strong>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="table-wrap" style={{ flex: 1 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m, i) => (
                  <motion.tr key={i} variants={fadeUp}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)', whiteSpace: 'nowrap' }}>{m.method}</td>
                    <td style={{ fontSize: '0.85rem' }}>{m.desc}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* Right — what to measure */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">What to Measure</motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', flex: 1 }}>
            {metrics.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>{m.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{m.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="insight insight--green">
            <div className="insight-label" style={{ color: 'var(--green)' }}>Tooling</div>
            <p>
              <strong>RAGAS</strong> (RAG evaluation) · <strong>DeepEval</strong> · <strong>LangSmith</strong>.
              Build evaluation <em>before</em> you deploy — not after users complain.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--r)', padding: '0.75rem 1rem', fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.5 }}>
            LLM-as-Judge: use GPT-4 to evaluate GPT-3.5's outputs. Use a powerful model
            to grade a cheaper one at scale — this is modern eval.
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
