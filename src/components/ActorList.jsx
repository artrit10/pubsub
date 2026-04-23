import { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function ActorList() {
  const [actors, setActors] = useState([])

  useEffect(() => {
    const token = PubSub.subscribe(TOPICS.ACTOR_ADDED, (_msg, data) => {
      console.log('[SUBSCRIBE] ActorList received with topic', TOPICS.ACTOR_ADDED, data)
      setActors((prev) => {
        if (prev.some((a) => a.toLowerCase() === data.name.toLowerCase())) {
          return prev
        }
        const updated = [...prev, data.name].sort()
          console.log('[PUBLISH] ActorList publishing with topic', TOPICS.ACTORS_UPDATED, updated)
          PubSub.publish(TOPICS.ACTORS_UPDATED, updated)
        return updated
      })
    })

    return () => PubSub.unsubscribe(token)
  }, [])

  const handleDelete = (name) => {
    console.log('[PUBLISH] ActorList publishing with topic', TOPICS.ACTOR_DELETED, { name })
    setActors((prev) => {
      const updated = prev.filter((a) => a !== name)
      console.log('[PUBLISH] ActorList publishing with topic', TOPICS.ACTORS_UPDATED, updated)
      PubSub.publish(TOPICS.ACTORS_UPDATED, updated)
      return updated
    })
    PubSub.publish(TOPICS.ACTOR_DELETED, { name })
  }

  return (
    <div className="list-card">
      <h2>Actors ({actors.length})</h2>
      {actors.length === 0 ? (
        <p className="empty">No actors yet. Add one above!</p>
      ) : (
        <ul>
          {actors.map((actor) => (
            <li key={actor}>
              <span>{actor}</span>
              <button className="delete-btn" onClick={() => handleDelete(actor)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
