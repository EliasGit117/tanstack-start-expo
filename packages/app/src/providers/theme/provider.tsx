import type { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as NavThemeProvider } from 'expo-router/react-navigation';
import { ThemeContextProvider } from './context';
import { useColorScheme } from '@app/hooks/use-color-scheme';
import { NAV_THEME } from '@app/providers/theme/theme';

// Native theme provider. NativeWind drives the `dark` class from the persisted
// preference (via ThemeContextProvider + useColorScheme); here we feed the
// resolved scheme to React Navigation (screen/header/border colors) and sync
// the StatusBar.
export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeContextProvider>
      <ThemedNavigation>{children}</ThemedNavigation>
    </ThemeContextProvider>
  );
}

function ThemedNavigation({ children }: PropsWithChildren) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <NavThemeProvider value={isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light}>
      {children}
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}
