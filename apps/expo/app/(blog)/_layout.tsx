import { Stack } from 'expo-router'
import { m } from '@app/paraglide/messages'

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="index" options={{ title: m['features.blog.tab']() }} />
    </Stack>
  )
}
