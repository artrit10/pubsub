import { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function MovieList() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const token = PubSub.subscribe(TOPICS.MOVIE_ADDED, (_msg, data) => {
      console.log('[SUBSCRIBE] MovieList received with topic', TOPICS.MOVIE_ADDED, data)
      setMovies((prev) => {
        if (prev.some((m) => m.toLowerCase() === data.title.toLowerCase())) {
          console.log('[SKIP] Duplicate movie ignored:', data.title)
          return prev
        }
        const updated = [...prev, data.title].sort()
        // Notify other subscribers that the movie list changed
        setTimeout(() => {
          console.log('[PUBLISH] MovieList publishing with topic', TOPICS.MOVIES_UPDATED, updated)
          PubSub.publish(TOPICS.MOVIES_UPDATED, updated)
        }, 0)
        return updated
      })
    })

    return () => PubSub.unsubscribe(token)
  }, [])

  const handleDelete = (title) => {
    console.log('[PUBLISH] MovieList publishing with topic', TOPICS.MOVIE_DELETED, { title })
    setMovies((prev) => {
      const updated = prev.filter((m) => m !== title)
      setTimeout(() => {
        console.log('[PUBLISH] MovieList publishing with topic', TOPICS.MOVIES_UPDATED, updated)
        PubSub.publish(TOPICS.MOVIES_UPDATED, updated)
      }, 0)
      return updated
    })
    PubSub.publish(TOPICS.MOVIE_DELETED, { title })
  }

  return (
    <div className="list-card">
      <h2>Movies ({movies.length})</h2>
      {movies.length === 0 ? (
        <p className="empty">No movies yet. Add one above!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie}>
              <span>{movie}</span>
              <button className="delete-btn" onClick={() => handleDelete(movie)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
