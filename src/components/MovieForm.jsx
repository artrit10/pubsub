import { useState } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function MovieForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    console.log('[PUBLISH] MovieForm publishing with topic', TOPICS.MOVIE_ADDED, { title: trimmed })
    PubSub.publish(TOPICS.MOVIE_ADDED, { title: trimmed })
    setTitle('')
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Movie title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Movie</button>
    </form>
  )
}
