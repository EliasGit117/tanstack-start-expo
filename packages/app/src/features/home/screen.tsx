import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@app/components/ui/button';
import { Text } from '@app/components/ui/text';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@app/components/ui/card';
import { TextLink } from '@navigation';
import { m } from '@app/paraglide/messages';
import { isLocale, locales } from '@app/paraglide/runtime';
import { getLocale, setLocale } from '@app/paraglide/runtime';
import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group';
import { TimerResetIcon } from 'lucide-react-native';
import { Icon } from '@app/components/ui/icon';


export function HomeScreen() {
  const [count, setCount] = useState(0);
  const locale = getLocale();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{m['features.home.title']()}</CardTitle>
          <CardDescription>
            {m['features.home.subtitle']({ app: '@app', ui: 'components/ui', navigation: '@navigation' })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-col gap-2">
          <Text>{m['features.home.locale']()}</Text>
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
                aria-label={m['features.home.selectLocale']({ locale: item })}
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
            <Icon as={TimerResetIcon}/>
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
