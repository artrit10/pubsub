import { useState } from 'react'

export default function ChatBox() {
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setReply('')
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setReply(res.ok ? data.reply : data.error)
    } catch {
      setReply('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Ask your coach..." />
      <button disabled={loading || !message.trim()}>{loading ? 'Thinking...' : 'Ask'}</button>
      {reply && <p style={{ whiteSpace: 'pre-wrap' }}>{reply}</p>}
    </form>
  )
}
