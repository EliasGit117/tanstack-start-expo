import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@repo/app/src/components/ui/button'
import { TextLink } from '@repo/navigation'
import { m } from '@repo/app/src/paraglide/messages'
import { locales } from '@repo/app/src/paraglide/runtime'
import { getLocale, setLocale } from '@repo/app/src/paraglide/runtime';

/**
 * Cross-platform Home screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function HomeScreen() {
  const [count, setCount] = useState(0)
  const locale= getLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{m["features.home.title"]()}</Text>
      <Text style={styles.subtitle}>
        {m["features.home.subtitle"]({ app: '@repo/app', ui: 'components/ui', navigation: '@repo/navigation' })}
      </Text>

      <View style={styles.row}>
        {locales.map((l) => (
          <Button
            key={l}
            variant={l === locale ? 'primary' : 'secondary'}
            onPress={() => setLocale(l)}
          >
            {l.toUpperCase()}
          </Button>
        ))}
      </View>

      <Button onPress={() => setCount((c) => c + 1)}>{m["features.home.pressed"]({ count })}</Button>
      <Button variant="secondary" onPress={() => setCount(0)}>
        {m["features.home.reset"]()}
      </Button>

      <TextLink href="/users">{m["features.home.viewUsers"]()}</TextLink>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
})
