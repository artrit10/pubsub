import Anthropic from '@anthropic-ai/sdk'

let client
const getClient = () => (client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }))

const SYSTEM = 'You are a friendly, concise coach for software developers.'

export async function askCoach(message) {
  const res = await getClient().messages.create({
    model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-latest',
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{ role: 'user', content: message }],
  })
  return res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n')
}
