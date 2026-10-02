import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const steps = [
  { num: '1', text: 'Add a role — who is giving this explanation?' },
  { num: '2', text: 'Add a constraint — length, format, reading level' },
  { num: '3', text: 'Add a format requirement — list, table, prose?' },
  { num: '4', text: 'Optionally: add a few-shot example' },
]

const checkYourself = [
  'Does it produce a consistent, usable output every time?',
  'Is it specific enough that a stranger could follow it?',
  'Could you reuse this prompt for a different topic with one small change?',
]

const freeTools = [
  { name: 'ChatGPT', url: 'chat.openai.com', note: 'Free tier available' },
  { name: 'Google Gemini', url: 'gemini.google.com', note: 'Free with Google account' },
  { name: 'Claude', url: 'claude.ai', note: 'Free tier available' },
]

export default function Slide06() {
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
          <span className="slide-tag slide-tag--exercise">Try at Home</span>
          <h1 className="slide-title">Build a Better Prompt</h1>
          <p className="slide-subtitle">Take-Home Exercise 1 — Open any free AI tool and try this tonight</p>
          <div className="title-line" style={{ background: 'var(--accent)' }} />
        </motion.div>

        <div className="slide-body">
          <div className="two-col two-col--6040" style={{ flex: 1, alignItems: 'stretch' }}>
            {/* Left — challenge */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <motion.div variants={scaleIn} className="challenge-box">
                <div className="challenge-original">
                  <div className="challenge-original-label">Start with this weak prompt</div>
                  <div className="challenge-original-text">"Explain machine learning"</div>
                </div>

                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-3)' }}>
                  Rewrite it using at least 3 of these techniques —
                </div>

                <div className="challenge-steps">
                  {steps.map((s) => (
                    <div key={s.num} className="challenge-step">
                      <div className="challenge-step-num">{s.num}</div>
                      <div>{s.text}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Free tools */}
              <motion.div variants={fadeUp} className="section-heading">Free Tools You Can Use Right Now</motion.div>
              {freeTools.map((t, i) => (
                <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '0.6rem 1rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>{t.name}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-4)', marginLeft: '0.5rem' }}>· {t.url}</span>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 600, color: 'var(--green)', fontFamily: 'var(--font-heading)' }}>{t.note}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Right — self-check */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <motion.div variants={fadeUp} className="section-heading">Check Your Prompt</motion.div>

              {checkYourself.map((c, i) => (
                <motion.div key={i} variants={fadeUp} className="card" style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>?</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{c}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="insight insight--accent">
                <div className="insight-label" style={{ color: 'var(--accent)' }}>The Mindset Shift</div>
                <p>
                  Stop thinking of prompts as questions.
                  Think of them as <strong>precise instructions</strong> to a very literal assistant.
                  The more specific you are, the better the output.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
