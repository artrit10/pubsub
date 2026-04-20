import MovieForm from './components/MovieForm'
import ActorForm from './components/ActorForm'
import MovieList from './components/MovieList'
import ActorList from './components/ActorList'
import Stats from './components/Stats'
import EventLog from './components/EventLog'

function App() {
  return (
    <div className="app">
      <header>
        <h1>PubSub-JS React Demo</h1>
        <p>
          Components communicate via <code>pubsub-js</code> — no props drilling,
          no shared state. Each component independently publishes and subscribes
          to events.
        </p>
      </header>

      <div className="grid">
        <div className="column">
          <MovieForm />
          <MovieList />
        </div>
        <div className="column">
          <ActorForm />
          <ActorList />
        </div>
        <div className="column">
          <Stats />
        </div>
      </div>
      <footer>
        <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </footer>
    </div>
  )
}

export default App
