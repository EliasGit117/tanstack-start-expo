'use client';

import { useTheme } from 'better-themes';
import { useEffect, useState } from 'react';
import { isTheme, Theme } from '@app/providers/theme/types';
type TColorScheme = 'light' | 'dark';


function toThemeSetting(value: string | undefined): Theme {
  return isTheme(value) ? value : Theme.System;
}

export function useColorScheme() {
  const { theme, setTheme, systemTheme } = useTheme();

  // Prevent hydration mismatch: storage is client-only, so SSR has no preference.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const themeSetting = toThemeSetting(theme);
  const colorScheme: TColorScheme =
    themeSetting === Theme.System ? (systemTheme ?? 'light') : themeSetting;

  const setColorScheme = (next: Theme) => setTheme(next);

  return {
    theme: themeSetting,
    loaded: mounted,
    colorScheme,
    isDarkColorScheme: colorScheme === Theme.Dark,
    setColorScheme,
  };
}
