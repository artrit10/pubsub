import ChatBox from '../components/ChatBox.jsx'

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Dev Coach AI</h1>
      <ChatBox />
    </main>
  )
}
