import { Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from '@repo/app/src/components/ui/button'
import { m } from '@repo/app/src/paraglide/messages'
import { resetLocale } from '@repo/app/src/providers/locale'

/**
 * Cross-platform Settings screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function SettingsScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      {Platform.OS === 'web' && <Text style={styles.title}>{m["features.settings.title"]()}</Text>}
      <Button variant="secondary" onPress={() => resetLocale()}>
        {m["features.settings.resetLocale"]()}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 24 : 16,
    gap: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
