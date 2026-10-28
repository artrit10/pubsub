# PubSub-JS React Demo

A React app demonstrating the **Publish/Subscribe pattern** using the [`pubsub-js`](https://www.npmjs.com/package/pubsub-js) library.

## How It Works

Components communicate through events instead of props or shared state:

| Component | Publishes | Subscribes To |
|-----------|-----------|---------------|
| **MovieForm** | `movies.added` | — |
| **ActorForm** | `actors.added` | — |
| **MovieList** | `movies.updated`, `movies.deleted` | `movies.added` |
| **ActorList** | `actors.updated`, `actors.deleted` | `actors.added` |
| **Stats** | — | `movies.updated`, `actors.updated` |
| **EventLog** | — | `*` (all events) |

## Getting Started

```bash
npm install
npm run dev
```

## Key pubsub-js APIs Used

```js
import PubSub from 'pubsub-js'

// Publish an event
PubSub.publish('topic.name', { some: 'data' })

// Subscribe to an event
const token = PubSub.subscribe('topic.name', (msg, data) => { ... })

// Unsubscribe (important for cleanup in useEffect!)
PubSub.unsubscribe(token)
```

## Dev Coach AI (`server/` and `web/`)

- `server/`: Express API calling Claude. `cd server && npm install && cp .env.example .env` (set `ANTHROPIC_API_KEY`), then `npm run dev` (port 3001).
- `web/`: Vite + React UI, proxies `/api` to the server. `cd web && npm install && npm run dev`.

Only `server/` reads the API key; `.env` is git-ignored.
