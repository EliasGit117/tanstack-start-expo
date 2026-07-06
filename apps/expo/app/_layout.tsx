import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { StatusBar } from 'expo-status-bar';
import { Providers, m } from '@repo/app';
import '../global.css';

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="dark"/>
      <Tabs/>
    </Providers>
  );
}

export function Tabs() {

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home"/>
        <NativeTabs.Trigger.Label>{m['features.home.tab']()}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(blog)">
        <NativeTabs.Trigger.Icon sf="doc.text.fill" md="article"/>
        <NativeTabs.Trigger.Label>Blog</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gearshape.fill" md="settings"/>
        <NativeTabs.Trigger.Label>{m['features.settings.title']()}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
