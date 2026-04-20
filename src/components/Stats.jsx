import { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function Stats() {
  const [movieCount, setMovieCount] = useState(0)
  const [actorCount, setActorCount] = useState(0)

  useEffect(() => {
    const movieToken = PubSub.subscribe(TOPICS.MOVIES_UPDATED, (_msg, data) => {
      console.log('[SUBSCRIBE] Stats received with topic', TOPICS.MOVIES_UPDATED, '→ movieCount =', data.length)
      setMovieCount(data.length)
    })
    const actorToken = PubSub.subscribe(TOPICS.ACTORS_UPDATED, (_msg, data) => {
      console.log('[SUBSCRIBE] Stats received with topic', TOPICS.ACTORS_UPDATED, '→ actorCount =', data.length)
      setActorCount(data.length)
    })

    return () => {
      PubSub.unsubscribe(movieToken)
      PubSub.unsubscribe(actorToken)
    }
  }, [])

  return (
    <div className="stats-card">
      <h2>Stats</h2>
      <div className="stat-row">
        <span>Total Movies:</span>
        <strong>{movieCount}</strong>
      </div>
      <div className="stat-row">
        <span>Total Actors:</span>
        <strong>{actorCount}</strong>
      </div>
      <div className="stat-row">
        <span>Combined:</span>
        <strong>{movieCount + actorCount}</strong>
      </div>
    </div>
  )
}
