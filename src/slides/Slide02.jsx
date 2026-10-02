import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const points = [
  { strong: 'LLMs don\'t "think"', rest: ' — they predict the next most likely word' },
  { strong: 'Trained on hundreds of billions', rest: ' of tokens of human text' },
  { strong: 'Pattern matching at massive scale', rest: ' — not magic, not intelligence' },
  { strong: 'No memory between sessions', rest: ' (unless explicitly given one)' },
  { strong: 'Doesn\'t know what\'s true', rest: ' — knows what\'s probable' },
]

export default function Slide02() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="What Even IS an LLM?"
      subtitle="The World's Most Obsessive Autocomplete"
    >
      <div className="two-col" style={{ alignItems: 'stretch' }}>
        {/* Left — bullets */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-col gap-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <ul className="point-list point-list--lg">
            {points.map((p, i) => (
              <motion.li key={i} variants={fadeUp}>
                <strong>{p.strong}</strong>{p.rest}
              </motion.li>
            ))}
          </ul>

          <motion.div variants={fadeUp} className="insight insight--accent" style={{ marginTop: 'auto' }}>
            <div className="insight-label" style={{ color: 'var(--accent)' }}>Key Insight</div>
            <p>
              Hallucinations aren't lies — the model is completing a pattern even when it shouldn't.
              Understanding this ONE thing changes how you prompt.
            </p>
          </motion.div>
        </motion.div>

        {/* Right — demo visualisation */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-col"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <motion.div variants={scaleIn} className="demo-box" style={{ flex: 1 }}>
            <div className="demo-box-header">Live Pattern Demo</div>
            <div className="demo-box-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100% - 2.5rem)' }}>
              <div className="demo-input">
                <span className="token-label">You type</span>
                <span className="token-you">"The capital of France is </span>
                <span className="token-blank">___</span>
                <span className="token-you">"</span>
              </div>

              <div className="demo-arrow">↓</div>

              <div className="demo-result">
                <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Model sees</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[
                    { token: '"Paris"', prob: '97%', primary: true },
                    { token: '"Lyon"', prob: '1.2%', primary: false },
                    { token: '"London"', prob: '0.8%', primary: false },
                  ].map((t) => (
                    <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: t.primary ? 'var(--primary)' : 'var(--text-3)', fontWeight: t.primary ? 600 : 400, minWidth: '4rem' }}>
                        {t.token}
                      </span>
                      <div style={{ flex: 1, height: '6px', background: 'var(--surface-alt)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: t.prob, height: '100%', background: t.primary ? 'var(--primary-mid)' : 'var(--border-strong)', borderRadius: '3px', transition: 'width 1s ease' }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: t.primary ? 'var(--primary-mid)' : 'var(--text-4)', fontWeight: t.primary ? 700 : 400, fontFamily: 'var(--font-heading)' }}>
                        {t.prob}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="demo-arrow">↓</div>

              <div style={{ background: 'var(--primary-dim)', borderRadius: 'var(--r)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Output</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600, color: 'var(--primary)' }}>"Paris"</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="card card--primary">
            <div className="card-label">Analogy</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.55 }}>
              A student who has read every textbook, novel, and Reddit thread —
              and learned the patterns. Extremely well-read, not actually thinking.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
