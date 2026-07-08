import { ScrollView, View } from 'react-native'
import { TextLink } from '@navigation'
import { m } from '@app/paraglide/messages'
import { USERS } from '@app/lib/users'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Text } from '@app/components/ui/text'

export function UserListScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 32, gap: 24, alignItems: 'stretch' }}
    >
      <Text variant="h3">{m["features.users.title"]()}</Text>

      <View className="flex-col gap-3">
        {USERS.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>
                {user.role} · {user.email}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <TextLink href={`/users/${user.id}`}>{m["features.users.details"]()}</TextLink>
            </CardFooter>
          </Card>
        ))}
      </View>

      <TextLink href="/" dismissTo>
        {m["features.users.backHome"]()}
      </TextLink>
    </ScrollView>
  )
}
