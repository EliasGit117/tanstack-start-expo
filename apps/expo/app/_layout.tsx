import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Providers, m, THEME, useColorScheme } from '@app';
import '../global.css';

export default function RootLayout() {
  return (
    <Providers>
      <Tabs/>
    </Providers>
  );
}

export function Tabs() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme === 'dark' ? 'dark' : 'light'];


  return (
    <NativeTabs
      tintColor={theme.foreground}
      iconColor={{ default: theme.mutedForeground, selected: theme.primary }}
      backgroundColor={theme.card}
      rippleColor={theme.muted}
      indicatorColor={theme.accent}
    >
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home"/>
        <NativeTabs.Trigger.Label>{m['features.home.tab']()}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(blog)">
        <NativeTabs.Trigger.Icon sf={{ default: 'doc.text', selected: 'doc.text.fill' }} md="article"/>
        <NativeTabs.Trigger.Label>Blog</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} md="settings"/>
        <NativeTabs.Trigger.Label>{m['features.settings.title']()}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
