import { motion } from 'framer-motion'
import { stagger, fadeUp, scaleIn } from '../components/animations.js'

const points = [
  {
    num: '01',
    title: 'Superpower unlocked',
    desc: 'LLMs are the most powerful tools your generation gets to start with',
  },
  {
    num: '02',
    title: 'Raw power without skill',
    desc: 'A hammer in a carpenter\'s hands vs. a toddler\'s — same tool, very different results',
  },
  {
    num: '03',
    title: 'The gap is real',
    desc: 'Most people use ChatGPT like Google Search — and miss 90% of its capability',
  },
  {
    num: '04',
    title: 'Today\'s goal',
    desc: 'Learn to use the hammer properly — close that gap, right now',
  },
]

export default function Slide01() {
  return (
    <div className="slide slide--hero">
      {/* Left — coloured panel */}
      <motion.div
        className="hero-left"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className="hero-workshop-tag">
          Workshop · Prompt Engineering &amp; LLMs
        </motion.p>

        <motion.h1 variants={fadeUp} className="hero-title">
          You Now Have a
          <span className="hero-title-accent">Superpower.</span>
          <span className="hero-title-sub">Are You Using It Right?</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="hero-desc">
          By the end of this session, you'll think about AI tools completely differently.
        </motion.p>
      </motion.div>

      {/* Right — key points */}
      <motion.div
        className="hero-right"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {points.map((p) => (
          <motion.div key={p.num} variants={scaleIn} className="hero-point">
            <div className="hero-point-num">{p.num}</div>
            <div>
              <div className="hero-point-title">{p.title}</div>
              <div className="hero-point-desc">{p.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
