import '../global.css'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { StatusBar } from 'expo-status-bar'
import { Providers, m } from '@repo/app'

export default function RootLayout() {
  return (
    <Providers>
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
          <NativeTabs.Trigger.Label>{m['features.home.tab']()}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Icon sf="gearshape.fill" md="settings" />
          <NativeTabs.Trigger.Label>{m['features.settings.title']()}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
      <StatusBar style="dark" />
    </Providers>
  )
}
