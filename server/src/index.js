import express from 'express'
import cors from 'cors'
import coach from './routes/coach.js'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/coach', coach)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
