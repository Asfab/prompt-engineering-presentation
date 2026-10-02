import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp } from '../components/animations.js'

const rows = [
  { scenario: 'One-off tasks', prompt: true, fine: false },
  { scenario: 'Consistent style across 1M+ calls', prompt: false, fine: true },
  { scenario: 'Domain-specific vocabulary', prompt: 'maybe', fine: true },
  { scenario: 'Fast iteration / prototyping', prompt: true, fine: false },
  { scenario: 'No training data available', prompt: true, fine: false },
  { scenario: 'Cost optimisation at scale', prompt: false, fine: true },
  { scenario: 'Adding new factual knowledge', prompt: false, fine: false, note: 'Use RAG' },
]

function Check({ v }) {
  if (v === 'maybe')
    return <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Maybe</span>
  if (v === true)
    return <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '1rem' }}>✓</span>
  if (v === false)
    return <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: '1rem' }}>✗</span>
  return null
}

export default function Slide10() {
  return (
    <SlideLayout
      tag="Comparison"
      tagVariant="compare"
      title="Prompting vs. Fine-Tuning"
      subtitle="The Decision Framework"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem', minHeight: 0 }}
      >
        <motion.div variants={fadeUp} className="table-wrap" style={{ flex: 1 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Scenario</th>
                <th style={{ textAlign: 'center', width: '20%' }}>Use Prompting</th>
                <th style={{ textAlign: 'center', width: '20%' }}>Use Fine-Tuning</th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={i} variants={fadeUp}>
                  <td style={{ fontWeight: 500, color: 'var(--text)' }}>{r.scenario}</td>
                  <td style={{ textAlign: 'center' }}><Check v={r.prompt} /></td>
                  <td style={{ textAlign: 'center' }}><Check v={r.fine} /></td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>{r.note || ''}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <motion.div variants={fadeUp} className="insight">
            <div className="insight-label">Key Distinction</div>
            <p>
              Fine-tuning changes <strong>behaviour</strong>. It does NOT reliably add new knowledge.
              For "what to know" — use <strong>RAG</strong>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="insight insight--accent">
            <div className="insight-label" style={{ color: 'var(--accent)' }}>Chef Analogy</div>
            <p>
              Fine-tuning = training a chef in your restaurant's style.
              RAG = giving the chef today's menu before service begins.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </SlideLayout>
  )
}
