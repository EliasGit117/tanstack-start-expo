'use client';

import { View } from 'react-native';
import { Button } from '@app/components/ui/button';
import { Text } from '@app/components/ui/text';
import { Theme } from '@app/providers/theme/types';
import { useColorScheme } from '@app/hooks/use-color-scheme';
import { m } from '@app/paraglide/messages';

const OPTIONS: { value: Theme; label: () => string; icon: string }[] = [
  { value: Theme.Light, label: () => m['features.settings.theme.light'](), icon: '☀️' },
  { value: Theme.Dark, label: () => m['features.settings.theme.dark'](), icon: '🌙' },
  { value: Theme.System, label: () => m['features.settings.theme.system'](), icon: '🖥️' },
];

export function ThemeSwitcher() {
  const { theme, colorScheme, setColorScheme, loaded } = useColorScheme();

  // Until mounted, web has no persisted preference (SSR has no storage). Render
  // theme-dependent bits only once `loaded` so server and client HTML match.
  const active = loaded ? theme : undefined;

  return (
    <View className="w-full max-w-[600px] gap-4 rounded-lg border border-border bg-card p-4">
      <View className="items-center gap-1">
        <Text variant="large" className="text-card-foreground">{m['features.settings.theme.appearance']()}</Text>
        <Text variant="muted">
          {m['features.settings.theme.preference']({
            preference: loaded ? theme : '…',
            active: loaded ? colorScheme : '…'
          })}
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        {OPTIONS.map(({ value, label, icon }) => (
          <Button
            key={value}
            variant={active === value ? 'default' : 'outline'}
            onPress={() => setColorScheme(value)}
            testID={`theme-${value}`}
            className="min-w-[96px]"
          >
            <Text className="text-base">{icon}</Text>
            <Text>{label()}</Text>
          </Button>
        ))}
      </View>
    </View>
  );
}
