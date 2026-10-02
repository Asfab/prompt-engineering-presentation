import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const rlhfSteps = [
  { label: 'SFT\nBase', variant: '' },
  { label: 'Human\nRankings', variant: 'primary' },
  { label: 'Reward\nModel', variant: 'accent' },
  { label: 'RL\nUpdate', variant: '' },
  { label: 'Better\nLLM', variant: 'green' },
]

export default function Slide09() {
  return (
    <SlideLayout
      tag="Technique"
      tagVariant="technique"
      title="Fine-Tuning Techniques"
      subtitle="Not One Method — A Family of Techniques"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1rem' }}
      >
        <div className="three-col" style={{ flex: 1 }}>
          {/* SFT */}
          <motion.div variants={scaleIn} className="tech-card">
            <div className="tech-card-num">01</div>
            <div className="tech-card-name">Supervised Fine-Tuning (SFT)</div>
            <p className="tech-card-desc">
              Show the model (input, ideal_output) pairs. Weights update to mimic ideal outputs.
            </p>
            <ul className="point-list" style={{ fontSize: '0.82rem' }}>
              <li>Requires clean labeled dataset — hundreds to thousands of examples</li>
              <li>Used for style adaptation, domain tasks, instruction following</li>
            </ul>
            <div className="tech-example">{"input: \"Explain X\"\noutput: \"[ideal explanation]\"\n\n→ Model learns to mimic"}</div>
          </motion.div>

          {/* Instruction Tuning */}
          <motion.div variants={scaleIn} className="tech-card">
            <div className="tech-card-num">02</div>
            <div className="tech-card-name">Instruction Tuning</div>
            <p className="tech-card-desc">
              A specific type of SFT using natural language instructions as inputs. Teaches
              the model to follow diverse instructions, not just one task.
            </p>
            <ul className="point-list" style={{ fontSize: '0.82rem' }}>
              <li>Famous datasets: Alpaca, FLAN, Dolly</li>
              <li>Model generalises to new instructions it hasn't seen</li>
              <li>How GPT-3 became ChatGPT</li>
            </ul>
          </motion.div>

          {/* RLHF */}
          <motion.div variants={scaleIn} className="tech-card" style={{ background: 'var(--primary-dim)', borderColor: 'var(--primary-line)' }}>
            <div className="tech-card-num" style={{ color: 'var(--primary-line)' }}>03</div>
            <div className="tech-card-name" style={{ color: 'var(--primary)' }}>RLHF</div>
            <p className="tech-card-desc">
              Reinforcement Learning from Human Feedback — the secret behind ChatGPT, Claude, Gemini.
            </p>
            <ol className="step-list" style={{ fontSize: '0.8rem', gap: '0.5rem' }}>
              {[
                'SFT the model first',
                'Humans rank multiple outputs (A is better than B)',
                'Train a Reward Model on those rankings',
                'Use RL (PPO) to push the LLM toward higher rewards',
              ].map((s, i) => (
                <li key={i}>
                  <span className="step-num" style={{ background: 'var(--primary)', minWidth: '1.4rem', height: '1.4rem', fontSize: '0.65rem' }}>{i + 1}</span>
                  <span style={{ fontSize: '0.8rem' }}>{s}</span>
                </li>
              ))}
            </ol>

            {/* RLHF horizontal flow */}
            <div className="hflow" style={{ marginTop: '0.5rem' }}>
              {rlhfSteps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <div className={`hflow-box ${s.variant ? `hflow-box--${s.variant}` : ''}`} style={{ whiteSpace: 'pre-line', lineHeight: 1.3 }}>
                    {s.label}
                  </div>
                  {i < rlhfSteps.length - 1 && (
                    <span className="hflow-arrow">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="insight">
          <div className="insight-label">Career Note</div>
          <p>
            The humans doing the rankings are <strong>data labelers</strong> — this is a growing job market,
            including demand for multilingual feedback labelers who understand local language nuance.
          </p>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
