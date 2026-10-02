import { useState, useEffect, useRef } from 'react'

/**
 * Simulates LLM-style character-by-character typing.
 * @param {string}  text   - the full text to type out
 * @param {number}  speed  - ms per character
 * @param {number}  delay  - ms to wait before starting
 * @param {boolean} active - set false to pause/skip (default true)
 */
export default function TypedText({ text, speed = 18, delay = 0, active = true }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)
  const indexRef  = useRef(0)
  const iRef      = useRef(null)
  const startRef  = useRef(null)

  useEffect(() => {
    if (!active) {
      setDisplayed(text)
      setDone(true)
      return
    }

    // reset on each mount / text change
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    startRef.current = setTimeout(() => {
      iRef.current = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))
        if (indexRef.current >= text.length) {
          clearInterval(iRef.current)
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startRef.current)
      clearInterval(iRef.current)
    }
  }, [text, speed, delay, active])

  return (
    <>
      {displayed}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.95em',
            background: 'currentColor',
            marginLeft: '1px',
            verticalAlign: 'text-bottom',
            animation: 'blink 0.65s steps(1) infinite',
          }}
        />
      )}
    </>
  )
}
