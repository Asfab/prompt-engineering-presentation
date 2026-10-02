import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const failures = [
  { label: 'Ambiguity', example: '"Write something about AI"', fix: 'Too vague — what format, length, audience?' },
  { label: 'Contradictions', example: '"Be brief but comprehensive"', fix: 'Conflicting constraints confuse the model' },
  { label: 'Missing context', example: '"Fix this bug" (no code given)', fix: 'Model can\'t act on what it can\'t see' },
  { label: 'Prompt injection', example: '"Ignore all previous instructions…"', fix: 'User input overrides your system prompt' },
  { label: 'Token limits', example: 'Prompt too long', fix: 'Model truncates or loses focus on instructions' },
]

const fixes = [
  { trigger: 'Output is wrong', action: 'Add more context' },
  { trigger: 'Output is inconsistent', action: 'Add examples (few-shot)' },
  { trigger: 'Output is off-format', action: 'Be explicit about structure' },
  { trigger: 'Model ignores instructions', action: 'Move key instructions to the END' },
]

export default function Slide07() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="Why Prompts Fail"
      subtitle="Debugging Your English"
    >
      <div className="two-col" style={{ alignItems: 'stretch' }}>
        {/* Left — failure modes */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">Common Failure Modes</motion.div>
          {failures.map((f, i) => (
            <motion.div key={i} variants={scaleIn} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--red)' }}>
                  {f.label}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-3)', background: 'var(--surface-alt)', borderRadius: 'var(--r-sm)', padding: '0.3rem 0.6rem' }}>
                {f.example}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', lineHeight: 1.4 }}>{f.fix}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right — debug strategy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <motion.div variants={fadeUp} className="section-heading">Debugging Strategy</motion.div>

          <ol className="step-list">
            {fixes.map((f, i) => (
              <motion.li key={i} variants={fadeUp}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <span style={{ color: 'var(--text-3)' }}>If </span>
                  <strong style={{ color: 'var(--text)' }}>{f.trigger}</strong>
                  <span style={{ color: 'var(--text-3)' }}> → </span>
                  <span style={{ color: 'var(--primary-mid)', fontWeight: 600 }}>{f.action}</span>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div variants={fadeUp} className="insight insight--accent" style={{ marginTop: 'auto' }}>
            <div className="insight-label" style={{ color: 'var(--accent)' }}>Security Note</div>
            <p>
              <strong>Prompt injection</strong> is a real security risk. If users can type
              "Ignore all instructions…" and your bot complies — that's a vulnerability.
              This is why prompt engineering includes <strong>defensive prompting</strong>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
