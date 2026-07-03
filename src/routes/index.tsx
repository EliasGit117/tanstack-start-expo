import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to TanStack Start</h1>
      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}
