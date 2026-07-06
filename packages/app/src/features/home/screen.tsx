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
import { isLocale, locales } from '@repo/app/src/paraglide/runtime';
import { getLocale, setLocale } from '@repo/app/src/paraglide/runtime';
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group';

/**
 * Cross-platform Home screen. Rendered by the TanStack Start route on web
 * (via react-native-web) and by the Expo app natively via expo-router.
 */
export function HomeScreen() {
  const [count, setCount] = useState(0);
  const locale = getLocale();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{m['features.home.title']()}</CardTitle>
          <CardDescription>
            {m['features.home.subtitle']({ app: '@repo/app', ui: 'components/ui', navigation: '@repo/navigation' })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-col gap-2">
          <Text>Locale</Text>
          <ToggleGroup
            variant="outline"
            type="single"
            value={locale}
            onValueChange={(newValue) => {
              if (!isLocale(newValue))
                return;

              setLocale(newValue);
            }}
          >
            {locales.map((item, index) => (
              <ToggleGroupItem
                value={item}
                aria-label={`Select "${item}"`}
                isLast={index === locales.length - 1}
                isFirst={index === 0}
                key={item}
              >
                <Text>{item.toUpperCase()}</Text>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onPress={() => setCount((c) => c + 1)}>
            <Text>{m['features.home.pressed']({ count })}</Text>
          </Button>
          <Button className="w-full" variant="outline" onPress={() => setCount(0)}>
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
