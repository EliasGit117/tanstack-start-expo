import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="users/index" options={{ title: 'Users' }} />
        <Stack.Screen name="users/[id]" options={{ title: 'User' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
