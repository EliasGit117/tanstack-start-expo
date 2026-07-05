import { Stack } from 'expo-router'
import { m } from '@repo/app'

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="index" options={{ title: m['features.home.tab']() }} />
      <Stack.Screen name="users/index" options={{ title: m['features.users.title']() }} />
      <Stack.Screen name="users/[id]" options={{ title: m['features.users.title']() }} />
    </Stack>
  )
}
