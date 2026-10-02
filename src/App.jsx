import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { io } from 'socket.io-client'
import slides from './slides/index.js'
import ProgressBar from './components/ProgressBar.jsx'

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '3%' : '-3%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir < 0 ? '3%' : '-3%',
    opacity: 0,
    transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function App() {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)

  // Keep a ref in sync so socket event handlers always read the latest value
  // without needing to be re-registered on every state change.
  const currentRef = useRef(current)
  useEffect(() => { currentRef.current = current }, [current])

  // ── Socket.io ───────────────────────────────────────────────────────────
  const socketRef = useRef(null)

  useEffect(() => {
    // Connect to same origin. In dev with the Vite proxy this forwards to
    // the Node server on port 3001. Fails silently if server isn't running.
    const socket = io({
      reconnectionAttempts: 10,
      reconnectionDelay: 1500,
      timeout: 8000,
    })
    socketRef.current = socket

    // Server sends current state when we first connect
    socket.on('slide:sync', ({ index }) => {
      setDirection(0)
      setCurrent(index)
    })

    // Remote (phone) triggered a navigation — move the presentation
    socket.on('slide:change', ({ index, direction: dir }) => {
      setDirection(dir ?? (index > currentRef.current ? 1 : -1))
      setCurrent(index)
    })

    return () => socket.disconnect()
  }, []) // runs once on mount

  // ── Navigation ──────────────────────────────────────────────────────────
  // These run locally AND report to the server (which broadcasts to phone/remote).
  const goNext = useCallback(() => {
    if (currentRef.current < slides.length - 1) {
      const next = currentRef.current + 1
      setDirection(1)
      setCurrent(next)
      socketRef.current?.emit('slide:report', { index: next })
    }
  }, [])

  const goPrev = useCallback(() => {
    if (currentRef.current > 0) {
      const prev = currentRef.current - 1
      setDirection(-1)
      setCurrent(prev)
      socketRef.current?.emit('slide:report', { index: prev })
    }
  }, [])

  // ── Keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault(); goNext()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  // ── Click zones ─────────────────────────────────────────────────────────
  const handleClick = (e) => {
    if (e.clientX > window.innerWidth / 2) goNext()
    else goPrev()
  }

  const SlideComponent = slides[current]

  return (
    <div className="deck" onClick={handleClick}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="slide-wrapper"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      <ProgressBar current={current} total={slides.length} />

      <div className="slide-counter">
        <span className="counter-current">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span style={{ color: 'var(--text-4)' }}> / </span>
        <span style={{ color: 'var(--text-4)' }}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className="nav-hint">
        <span>← →</span>
        <span>navigate</span>
      </div>
    </div>
  )
}
