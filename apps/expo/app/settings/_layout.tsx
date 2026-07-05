import { Stack } from 'expo-router'
import { m } from '@repo/app'

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="index" options={{ title: m['features.settings.title']() }} />
    </Stack>
  )
}
