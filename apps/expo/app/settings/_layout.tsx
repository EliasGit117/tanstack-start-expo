import { m } from '@app/paraglide/messages'
import { Stack } from 'expo-router'


export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="index" options={{ title: m['features.settings.title']() }} />
    </Stack>
  )
}
