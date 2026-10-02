import { motion } from 'framer-motion'
import SlideLayout from '../components/SlideLayout.jsx'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

export default function Slide05() {
  return (
    <SlideLayout
      tag="Technique"
      tagVariant="technique"
      title="The Prompting Toolkit — Part 2"
      subtitle="Role Prompting, Constraints &amp; Structured Output"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '1rem' }}
      >
        <div className="three-col" style={{ flex: 1 }}>
          {/* Role Prompting */}
          <motion.div variants={scaleIn} className="tech-card">
            <div className="tech-card-num">01</div>
            <div className="tech-card-name">Role Prompting</div>
            <p className="tech-card-desc">
              Give the model a persona. Models have learned how different roles explain things —
              a doctor vs. a teacher vs. a comedian all write differently.
            </p>
            <div className="tech-example">
              "You are an experienced high school
science teacher. Explain photosynthesis
to a 9th grader."
            </div>
          </motion.div>

          {/* Constraint Prompting */}
          <motion.div variants={scaleIn} className="tech-card">
            <div className="tech-card-num">02</div>
            <div className="tech-card-name">Constraint Prompting</div>
            <p className="tech-card-desc">
              Bound the output. Tell the model exactly how long, what style, and what
              to avoid. More constraints = more predictable results.
            </p>
            <div className="tech-example">
              "In exactly 3 bullet points,
no jargon, under 100 words,
avoid passive voice."
            </div>
          </motion.div>

          {/* Structured Output */}
          <motion.div variants={scaleIn} className="tech-card">
            <div className="tech-card-num">03</div>
            <div className="tech-card-name">Structured Output</div>
            <p className="tech-card-desc">
              Ask for specific formats. Critical in production — if your app expects JSON
              and the model returns prose, your code crashes.
            </p>
            <div className="tech-example">
              "Return as JSON with keys:
  name, age, city

Output a markdown table:
  Feature | Pros | Cons"
            </div>
          </motion.div>
        </div>

        {/* System vs User */}
        <motion.div variants={fadeUp} className="insight insight--accent">
          <div className="insight-label" style={{ color: 'var(--accent)' }}>Bonus — For API Users</div>
          <p>
            <strong>System prompt</strong> = permanent instructions &amp; persona (set by developer) &nbsp;·&nbsp;
            <strong>User prompt</strong> = the actual question (from user).
            System prompts are processed first and carry more weight.
          </p>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
