import { Stack } from 'expo-router'
import { m } from '@repo/app'

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: m['features.settings.title']() }} />
    </Stack>
  )
}
