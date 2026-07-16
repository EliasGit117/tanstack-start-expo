import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@app/providers/theme/context';
import { Theme } from '@app/providers/theme/types';


export function useColorScheme() {
  const { theme, setTheme, hasHydrated } = useThemeContext();
  const [themeHydrated, setThemeHydrated] = useState(false);

  const { colorScheme: nativeWindColorScheme, setColorScheme: setNativewindColorScheme } =
    useNativewindColorScheme();

  const setColorScheme = (colorScheme: Theme) => {
    if (colorScheme === theme) return;

    setTheme(colorScheme);
    setNativewindColorScheme(colorScheme);
  };

  // On hydration, set the color scheme to the persisted theme.
  useEffect(() => {
    if (!hasHydrated) return;

    setNativewindColorScheme(theme);
    setThemeHydrated(true);
  }, [hasHydrated]);

  return {
    theme,
    loaded: themeHydrated,
    colorScheme: nativeWindColorScheme ?? Theme.Dark,
    isDarkColorScheme: nativeWindColorScheme === Theme.Dark,
    setColorScheme,
  };
}
