import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Text, View, StyleSheet } from 'react-native'

const getServerData = createServerFn({ method: 'GET' }).handler(async () => {
  return {
    message: 'Rendered from the server',
    time: new Date().toISOString(),
    node: process.version,
  }
})

export const Route = createFileRoute('/rsc')({
  component: RscTest,
  loader: () => getServerData(),
  preloadStaleTime: 10_000,
  staleTime: 10_000,
})

function RscTest() {
  const data = Route.useLoaderData()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Server Function Test</Text>
      <Text style={styles.line}>{data.message}</Text>
      <Text style={styles.code}>time: {data.time}</Text>
      <Text style={styles.code}>node: {data.node}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    gap: 12,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  line: {
    fontSize: 16,
    color: '#444',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
})
