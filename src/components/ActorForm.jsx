import { useState } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function ActorForm() {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    console.log('[PUBLISH] ActorForm publishing with topic', TOPICS.ACTOR_ADDED, { name: trimmed })
    PubSub.publish(TOPICS.ACTOR_ADDED, { name: trimmed })
    setName('')
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add Actor</h2>
      <input
        type="text"
        placeholder="Actor name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Actor</button>
    </form>
  )
}
