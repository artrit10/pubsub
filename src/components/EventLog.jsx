import { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import { TOPICS } from '../topics'

export default function EventLog() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // Subscribe to ALL topics using a wildcard-like approach:
    // subscribing to empty string matches every published message
    const token = PubSub.subscribe('', (msg, data) => {
      console.log('[SUBSCRIBE] EventLog captured with topic', msg, data)
      setLogs((prev) => [
        { id: Date.now() + Math.random(), topic: msg, data: JSON.stringify(data) },
        ...prev.slice(0, 19), // keep last 20
      ])
    })

    return () => PubSub.unsubscribe(token)
  }, [])

  return (
    <div className="log-card">
      <h2>Event Log</h2>
      <p className="log-description">
        All PubSub events flowing through the system (most recent first):
      </p>
      {logs.length === 0 ? (
        <p className="empty">No events yet...</p>
      ) : (
        <ul className="log-list">
          {logs.map((log) => (
            <li key={log.id}>
              <code className="topic">{log.topic}</code>
              <span className="data">{log.data}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
