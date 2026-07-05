import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextLink } from '@repo/navigation'
import { m } from '@repo/app/src/paraglide/messages'
import { USERS } from '@repo/app/src/lib/users'

/** Cross-platform user list. Each row links to the detail screen. */
export function UserListScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text style={styles.title}>{m["features.users.title"]()}</Text>

      <View style={styles.list}>
        {USERS.map((user) => (
          <View key={user.id} style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.meta}>
                {user.role} · {user.email}
              </Text>
            </View>
            <TextLink href={`/users/${user.id}`}>{m["features.users.details"]()}</TextLink>
          </View>
        ))}
      </View>

      <TextLink href="/" dismissTo>
        {m["features.users.backHome"]()}
      </TextLink>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 24,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  rowText: {
    gap: 2,
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
    color: '#666',
  },
})
