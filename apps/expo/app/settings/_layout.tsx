import { Stack } from 'expo-router'
import { m } from '@app'

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="index" options={{ title: m['features.settings.title']() }} />
    </Stack>
  )
}
