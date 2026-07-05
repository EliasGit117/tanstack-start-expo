import { ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from '@repo/app/src/components/ui/button'
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
        <Text style={styles.title}>{m["features.users.notFound"]()}</Text>
        <Text style={styles.meta}>{m["features.users.noUserWithId"]({ id })}</Text>
        <Button variant="secondary" onPress={() => router.back()}>
          {m["features.users.goBack"]()}
        </Button>
      </ScrollView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.meta}>
        {user.role} · {user.email}
      </Text>
      <Text style={styles.bio}>{user.bio}</Text>

      <Button variant="secondary" onPress={() => router.back()}>
        {m["features.users.back"]()}
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 16,
    color: '#666',
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 480,
  },
})
