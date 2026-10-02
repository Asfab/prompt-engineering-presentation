import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, scaleIn, fadeUp } from '../components/animations.js'

const cards = [
  {
    color: 'indigo',
    title: 'Write & Edit',
    examples: [
      'Draft your internship cover letter in seconds',
      'Improve grammar and tone of your reports',
      'Summarise a 30-page paper into 5 bullet points',
    ],
  },
  {
    color: 'sky',
    title: 'Learn Anything',
    examples: [
      'Get a concept re-explained until you actually get it',
      'Create a custom quiz for your exam syllabus',
      'Ask "why does this work?" not just "what is it?"',
    ],
  },
  {
    color: 'emerald',
    title: 'Code & Debug',
    examples: [
      'Explain what a cryptic error message actually means',
      'Generate boilerplate so you can focus on the logic',
      'Ask it to write test cases for your function',
    ],
  },
  {
    color: 'amber',
    title: 'Analyze & Research',
    examples: [
      'Extract key arguments from a research paper',
      'Compare two technologies side by side',
      'Ask "what are the weaknesses of this approach?"',
    ],
  },
  {
    color: 'violet',
    title: 'Brainstorm & Create',
    examples: [
      'Generate 10 final-year project ideas in your domain',
      'Explore different approaches to a design problem',
      'Create a system prompt for a bot idea you have',
    ],
  },
  {
    color: 'rose',
    title: 'Plan & Organise',
    examples: [
      'Break a big assignment into a daily task list',
      'Build a study schedule around your exam dates',
      'Ask it to be your accountability partner',
    ],
  },
]

export default function SlideUseCases() {
  return (
    <SlideLayout
      tag="Concept"
      tagVariant="concept"
      title="What Can You Actually Do With This?"
      subtitle="You already have free access — here's how to make it useful today"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '0.85rem' }}
      >
        <div className="usecase-grid">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={scaleIn}
              className={`usecase-card usecase-card--${c.color}`}
            >
              <div className="usecase-title">{c.title}</div>
              <ul className="usecase-examples">
                {c.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="insight insight--accent">
          <div className="insight-label" style={{ color: 'var(--accent)' }}>The one rule</div>
          <p>
            None of this requires coding, API keys, or any setup. Open any free tool, apply what you
            learned today, and try one task from each category. <strong>Start tonight.</strong>
          </p>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
