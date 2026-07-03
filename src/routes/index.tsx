import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native inside TanStack Start</Text>
      <Text style={styles.subtitle}>
        Rendered via react-native-web. Edit <Text style={styles.code}>src/routes/index.tsx</Text>.
      </Text>

      <Pressable style={styles.button} onPress={() => setCount((c) => c + 1)}>
        <Text style={styles.buttonText}>Pressed {count} times</Text>
      </Pressable>
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
  code: {
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
