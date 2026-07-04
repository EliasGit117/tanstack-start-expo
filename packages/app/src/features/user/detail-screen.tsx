import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@repo/ui'
import { useParams, useRouter } from '@repo/navigation'
import { getUser } from '../../lib/users'

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
      <View style={styles.container}>
        <Text style={styles.title}>User not found</Text>
        <Text style={styles.meta}>No user with id “{id}”.</Text>
        <Button variant="secondary" onPress={() => router.back()}>
          Go back
        </Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.meta}>
        {user.role} · {user.email}
      </Text>
      <Text style={styles.bio}>{user.bio}</Text>

      <Button variant="secondary" onPress={() => router.back()}>
        ← Back
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
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
