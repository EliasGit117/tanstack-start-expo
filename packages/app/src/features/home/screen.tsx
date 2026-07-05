import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@repo/app/src/components/ui/button';
import { Text } from '@repo/app/src/components/ui/text';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@repo/app/src/components/ui/card';
import { TextLink } from '@repo/navigation';
import { m } from '@repo/app/src/paraglide/messages';
import { locales } from '@repo/app/src/paraglide/runtime';
import { getLocale, setLocale } from '@repo/app/src/paraglide/runtime';

/**
 * Cross-platform Home screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function HomeScreen() {
  const [count, setCount] = useState(0);
  const locale = getLocale();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>{m['features.home.title']()}</CardTitle>
          <CardDescription>
            {m['features.home.subtitle']({ app: '@repo/app', ui: 'components/ui', navigation: '@repo/navigation' })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-row gap-2">
          {locales.map((l) => (
            <Button
              key={l}
              size="sm"
              variant={l === locale ? 'default' : 'outline'}
              onPress={() => setLocale(l)}
            >
              <Text>{l.toUpperCase()}</Text>
            </Button>
          ))}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button onPress={() => setCount((c) => c + 1)}>
            <Text>{m['features.home.pressed']({ count })}</Text>
          </Button>
          <Button variant="outline" onPress={() => setCount(0)}>
            <Text>{m['features.home.reset']()}</Text>
          </Button>
        </CardFooter>
      </Card>

      <View className="flex flex-row gap-2 px-2">
        <TextLink href="/users">{m['features.home.viewUsers']()}</TextLink>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 24 : 16,
    gap: 16,
    alignItems: 'flex-start'
  }
});
