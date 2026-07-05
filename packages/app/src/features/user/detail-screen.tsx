import { ScrollView, StyleSheet } from 'react-native'
import { Button } from '@repo/app/src/components/ui/button'
import { Text } from '@repo/app/src/components/ui/text'
import { useParams, useRouter } from '@repo/navigation'
import { m } from '@repo/app/src/paraglide/messages'
import { getUser } from '@repo/app/src/lib/users'

/**
 * Cross-platform user detail. Reads the `id` route param via
 * @repo/navigation — `$id` on web (TanStack Router), `[id]` on native
 * (expo-router).
 */
export function UserDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const user = getUser(id)

  if (!user) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
        <Text variant="h3">{m["features.users.notFound"]()}</Text>
        <Text variant="muted">{m["features.users.noUserWithId"]({ id })}</Text>
        <Button variant="outline" onPress={() => router.back()}>
          <Text>{m["features.users.goBack"]()}</Text>
        </Button>
      </ScrollView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text variant="h3">{user.name}</Text>
      <Text variant="muted">
        {user.role} · {user.email}
      </Text>
      <Text className="max-w-[480px] leading-6">{user.bio}</Text>

      <Button variant="outline" onPress={() => router.back()}>
        <Text>{m["features.users.back"]()}</Text>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    alignItems: 'flex-start',
  },
})
