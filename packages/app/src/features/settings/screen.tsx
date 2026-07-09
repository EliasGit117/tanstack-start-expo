import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@app/components/ui/button'
import { Text } from '@app/components/ui/text'
import { m } from '@app/paraglide/messages'
import { resetLocale } from '@app/providers/locale'
import { ThemeSwitcher } from './theme-switcher'
/**
 * Cross-platform Settings screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function SettingsScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      {Platform.OS === 'web' && <Text variant="h3">{m["features.settings.title"]()}</Text>}
      <ThemeSwitcher />

      <Button variant="outline" onPress={() => resetLocale()}>
        <Text>{m["features.settings.resetLocale"]()}</Text>
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
})
