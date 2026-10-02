import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'
import TypedText from '../components/TypedText.jsx'

// ─── Content ────────────────────────────────────────────────────────────────

const weakPrompt = `"Explain APIs"`

const weakOutput =
  `An API, or Application Programming Interface, is a set of rules that allows different software programs to communicate with each other. APIs are widely used in web development to connect services and exchange data.`

// deliberately generic, short — types out fast and stops

const strongPrompt =
  `"You are a Python tutor. I'm a first-year CS student.

Explain REST APIs using a real-world analogy, then show one Python example using requests.get(). Use 3 numbered steps. Keep it under 120 words."`

const strongOutput =
  `1. The Waiter Analogy
   You (client) tell the waiter (API) what you want.
   The kitchen (server) makes it. You never enter the kitchen.

2. Python Example
   import requests
   r = requests.get("https://api.github.com/users/octocat")
   print(r.json()["name"])  # → "The Octocat"

3. What Happened
   Your code sent an HTTP GET request to GitHub's server.
   The server returned JSON. requests parsed it.
   That is one complete API call.`

// ─── Component ──────────────────────────────────────────────────────────────

export default function SlideWeakStrong() {
  return (
    <SlideLayout
      tag="Live Demo"
      tagVariant="technique"
      title="See the Difference for Yourself"
      subtitle="Same question — completely different results"
    >
      {/* Two panels + thin divider */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0, alignItems: 'stretch' }}
      >

        {/* ── Left: Weak prompt ───────────────────────────────────── */}
        <motion.div variants={scaleIn} className="vs-panel">
          <div className="vs-header">
            <span className="vs-badge vs-badge--weak">Weak Prompt</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-4)' }}>vague, no context</span>
          </div>

          <div className="vs-prompt-box vs-prompt-box--weak">
            {weakPrompt}
          </div>

          <div className="vs-output-box" style={{ flex: 1 }}>
            <div className="vs-output-label vs-output-label--weak">Model output</div>
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {/* starts typing at 700 ms, 22 ms/char  → done in ~4 s */}
              <TypedText text={weakOutput} speed={22} delay={700} />
            </span>
          </div>

          {/* verdict */}
          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--red-dim)',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--r)',
              padding: '0.65rem 1rem',
              fontSize: '0.8rem',
              color: 'var(--red)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            Generic · No structure · Not reusable
          </motion.div>
        </motion.div>

        {/* thin vertical divider */}
        <div className="vs-divider" />

        {/* ── Right: Strong prompt ─────────────────────────────────── */}
        <motion.div variants={scaleIn} className="vs-panel">
          <div className="vs-header">
            <span className="vs-badge vs-badge--strong">Strong Prompt</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-4)' }}>role · context · task · format · constraint</span>
          </div>

          {/* Prompt with component highlights */}
          <div className="vs-prompt-box vs-prompt-box--strong" style={{ whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#4F46E5', fontWeight: 600 }}>"You are a Python tutor."</span>
            <span style={{ color: '#0369A1', fontWeight: 600 }}> "I'm a first-year CS student."</span>
            {'\n\n'}
            <span style={{ color: '#D97706', fontWeight: 600 }}>Explain REST APIs using a real-world analogy, then show one Python example using requests.get().</span>
            <span style={{ color: '#059669', fontWeight: 600 }}> Use 3 numbered steps.</span>
            <span style={{ color: '#7C3AED', fontWeight: 600 }}> Under 120 words."</span>
          </div>

          <div className="vs-output-box" style={{ flex: 1 }}>
            <div className="vs-output-label vs-output-label--strong">Model output</div>
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {/* starts at same time, 14 ms/char, types longer → contrast visible */}
              <TypedText text={strongOutput} speed={14} delay={700} />
            </span>
          </div>

          {/* verdict */}
          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--green-dim)',
              border: '1px solid #A7F3D0',
              borderRadius: 'var(--r)',
              padding: '0.65rem 1rem',
              fontSize: '0.8rem',
              color: 'var(--green)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            Structured · Analogy included · Code example · Reusable template
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Legend for colour codes in the strong prompt */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          gap: '1.25rem',
          marginTop: '0.85rem',
          padding: '0.6rem 1rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r)',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Role',       color: '#4F46E5', bg: '#EEF2FF' },
          { label: 'Context',    color: '#0369A1', bg: '#E0F2FE' },
          { label: 'Task',       color: '#D97706', bg: '#FFFBEB' },
          { label: 'Format',     color: '#059669', bg: '#ECFDF5' },
          { label: 'Constraint', color: '#7C3AED', bg: '#F3E8FF' },
        ].map((t) => (
          <span
            key={t.label}
            style={{
              background: t.bg,
              color: t.color,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.6rem',
              borderRadius: '100px',
            }}
          >
            {t.label}
          </span>
        ))}
        <span style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginLeft: 'auto', alignSelf: 'center' }}>
          Every colour in the strong prompt maps to a building block
        </span>
      </motion.div>
    </SlideLayout>
  )
}
