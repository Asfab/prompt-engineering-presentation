import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import { marked } from 'marked'
import { slidesData } from './slides-data.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app        = express()
const httpServer = createServer(app)
const io         = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
})

const PORT         = process.env.PORT || 4000
const TOTAL_SLIDES = slidesData.length
const REMOTE_PIN   = process.env.REMOTE_PIN  // set in Railway variables

// ─── PIN auth helpers ─────────────────────────────────────────────────────────
const COOKIE_NAME   = 'remote_auth'
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'slides-dev-secret'

function makeToken(pin) {
  return crypto.createHmac('sha256', COOKIE_SECRET).update(pin).digest('hex')
}

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || '').split(';').filter(Boolean).map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k.trim(), decodeURIComponent(v.join('='))]
    })
  )
}

function isAuthed(req) {
  if (!REMOTE_PIN) return true
  return parseCookies(req)[COOKIE_NAME] === makeToken(REMOTE_PIN)
}

const PIN_PAGE = (error = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
  <title>Remote — PIN</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100dvh;display:flex;align-items:center;justify-content:center;
         background:#0C0C0E;font-family:-apple-system,'SF Pro Display','Inter',sans-serif;
         -webkit-font-smoothing:antialiased}
    .card{width:min(320px,90vw);display:flex;flex-direction:column;gap:1.25rem}
    h1{color:#FAFAFA;font-size:1.3rem;font-weight:700;text-align:center}
    p.sub{color:#71717A;font-size:0.85rem;text-align:center}
    input{width:100%;padding:1rem;border-radius:12px;border:1px solid #3F3F46;
          background:#18181B;color:#FAFAFA;font-size:1.5rem;font-weight:700;
          letter-spacing:0.3em;text-align:center;outline:none}
    input:focus{border-color:#6366F1}
    button{width:100%;padding:1rem;border-radius:12px;border:none;
           background:#6366F1;color:#fff;font-size:1rem;font-weight:700;cursor:pointer}
    button:active{filter:brightness(0.88)}
    .err{color:#EF4444;font-size:0.85rem;text-align:center}
  </style>
</head>
<body>
  <div class="card">
    <h1>Slide Remote</h1>
    <p class="sub">Enter PIN to continue</p>
    <form method="POST" action="/remote/login">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <input type="password" name="pin" inputmode="numeric" pattern="[0-9]*"
               placeholder="••••" autofocus autocomplete="off"/>
        ${error ? `<p class="err">${error}</p>` : ''}
        <button type="submit">Unlock</button>
      </div>
    </form>
  </div>
</body>
</html>`

// ─── State ───────────────────────────────────────────────────────────────────
let currentSlide = 0

// ─── REST ────────────────────────────────────────────────────────────────────

// Slide metadata (titles + notes) consumed by remote.html
app.get('/api/slides', (_req, res) => {
  res.json(slidesData)
})

// PIN login page
app.get('/remote/login', (_req, res) => {
  res.send(PIN_PAGE())
})

app.post('/remote/login', express.urlencoded({ extended: false }), (req, res) => {
  const { pin } = req.body
  if (pin === REMOTE_PIN) {
    const token = makeToken(REMOTE_PIN)
    res.setHeader('Set-Cookie',
      `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`)
    return res.redirect('/remote')
  }
  res.send(PIN_PAGE('Incorrect PIN — try again'))
})

// Phone remote controller — PIN-protected
app.get('/remote', (req, res) => {
  if (!isAuthed(req)) return res.redirect('/remote/login')
  res.sendFile(path.join(__dirname, 'remote.html'))
})

// Speaker script preview — renders speaker-script.md as styled HTML
app.get('/script', (_req, res) => {
  const mdPath = path.join(__dirname, 'speaker-script.md')
  if (!fs.existsSync(mdPath)) return res.status(404).send('speaker-script.md not found')

  const md   = fs.readFileSync(mdPath, 'utf-8')
  const html = marked.parse(md)

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Speaker Script — Preview</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      background:#0C0C0E;color:#E4E4E7;
      font-family:-apple-system,'SF Pro Text','Inter',system-ui,sans-serif;
      -webkit-font-smoothing:antialiased;
      line-height:1.75;font-size:17px;
      padding:3rem 1.5rem 6rem;
    }
    .wrapper{max-width:720px;margin:0 auto}

    h1{font-size:2rem;font-weight:800;color:#FAFAFA;margin-bottom:2rem;
       padding-bottom:1rem;border-bottom:2px solid #6366F1}
    h2{font-size:1.4rem;font-weight:700;color:#A5B4FC;margin:3rem 0 1rem;
       padding-top:2rem;border-top:1px solid #27272A}
    h3{font-size:1.1rem;font-weight:600;color:#818CF8;margin:1.5rem 0 0.75rem}

    p{margin-bottom:1rem}
    strong{color:#FAFAFA;font-weight:600}
    em{color:#A1A1AA;font-style:italic}

    hr{border:none;border-top:1px solid #27272A;margin:2.5rem 0}

    ul,ol{margin:0.5rem 0 1rem 1.5rem}
    li{margin-bottom:0.4rem}
    li::marker{color:#6366F1}

    blockquote{
      border-left:3px solid #6366F1;margin:1rem 0;padding:0.75rem 1.25rem;
      background:#18181B;border-radius:0 8px 8px 0;color:#A1A1AA;
      font-style:italic;
    }

    code{
      background:#1E1E24;padding:0.15em 0.4em;border-radius:4px;
      font-size:0.92em;color:#C4B5FD;
      font-family:'SF Mono','Fira Code',monospace;
    }
    pre{
      background:#18181B;padding:1.25rem;border-radius:10px;
      overflow-x:auto;margin:1rem 0;border:1px solid #27272A;
    }
    pre code{background:none;padding:0;color:#D4D4D8}

    table{width:100%;border-collapse:collapse;margin:1rem 0}
    th,td{padding:0.6rem 1rem;border:1px solid #27272A;text-align:left;font-size:0.95rem}
    th{background:#18181B;color:#A5B4FC;font-weight:600}

    .nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      background:rgba(12,12,14,0.85);backdrop-filter:blur(12px);
      border-bottom:1px solid #27272A;padding:0.6rem 1.5rem;
      display:flex;align-items:center;justify-content:space-between;
    }
    .nav-title{font-weight:700;font-size:0.95rem;color:#A5B4FC}
    .nav a{color:#6366F1;text-decoration:none;font-size:0.85rem;font-weight:600}
    .nav a:hover{color:#818CF8;text-decoration:underline}
    body{padding-top:4.5rem}

    @media(max-width:600px){
      body{font-size:15px;padding:4rem 1rem 4rem}
      h1{font-size:1.5rem}
      h2{font-size:1.2rem}
    }

    ::selection{background:#6366F1;color:#fff}
  </style>
</head>
<body>
  <nav class="nav">
    <span class="nav-title">Speaker Script</span>
    <a href="/">Back to Slides</a>
  </nav>
  <div class="wrapper">${html}</div>
</body>
</html>`)
})

// Vite production build
app.use(express.static(path.join(__dirname, 'dist')))

// SPA fallback (must be last)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// ─── Socket.io ───────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] ${socket.id} connected  (total: ${io.engine.clientsCount})`)

  // Sync new connection to current state
  socket.emit('slide:sync', { index: currentSlide, total: TOTAL_SLIDES })

  // ── Remote triggers navigation ──────────────────────────────────────────
  socket.on('slide:next', () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      currentSlide++
      io.emit('slide:change', { index: currentSlide, direction: 1 })
    }
  })

  socket.on('slide:prev', () => {
    if (currentSlide > 0) {
      currentSlide--
      io.emit('slide:change', { index: currentSlide, direction: -1 })
    }
  })

  // ── Presentation reports local navigation (keyboard / click) ────────────
  // Use broadcast so the reporting socket doesn't receive its own update
  socket.on('slide:report', ({ index }) => {
    const direction = index > currentSlide ? 1 : -1
    currentSlide = index
    socket.broadcast.emit('slide:change', { index: currentSlide, direction })
  })

  socket.on('disconnect', () => {
    console.log(`[-] ${socket.id} disconnected`)
  })
})

// ─── Start ───────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`\n  Server ready on port ${PORT}\n  Presentation : http://localhost:${PORT}\n  Remote ctrl  : http://localhost:${PORT}/remote\n  Speaker script: http://localhost:${PORT}/script\n`)
})
