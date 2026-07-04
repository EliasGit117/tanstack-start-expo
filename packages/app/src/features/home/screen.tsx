import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@repo/ui'
import { TextLink } from '@repo/navigation'

/**
 * Cross-platform Home screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function HomeScreen() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared screen, every platform</Text>
      <Text style={styles.subtitle}>
        <Text style={styles.code}>@repo/app</Text> screens, <Text style={styles.code}>@repo/ui</Text>{' '}
        components, <Text style={styles.code}>@repo/navigation</Text> links.
      </Text>

      <Button onPress={() => setCount((c) => c + 1)}>Pressed {count} times</Button>
      <Button variant="secondary" onPress={() => setCount(0)}>
        Reset
      </Button>

      <TextLink href="/users">View users →</TextLink>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
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
})
