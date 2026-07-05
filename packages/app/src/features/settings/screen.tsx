import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@repo/app/src/components/ui/button'
import { m } from '@repo/app/src/paraglide/messages'
import { resetLocale } from '@repo/app/src/providers/locale'

/**
 * Cross-platform Settings screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{m["features.settings.title"]()}</Text>
      <Button variant="secondary" onPress={() => resetLocale()}>
        {m["features.settings.resetLocale"]()}
      </Button>
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
})
