import { Router } from 'express'
import { askCoach } from '../services/claude.js'

const router = Router()

router.post('/', async (req, res) => {
  const { message } = req.body ?? {}
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' })
  }
  try {
    res.json({ reply: await askCoach(message) })
  } catch (err) {
    console.error(err)
    res.status(502).json({ error: 'Failed to get a response from Claude' })
  }
})

export default router
