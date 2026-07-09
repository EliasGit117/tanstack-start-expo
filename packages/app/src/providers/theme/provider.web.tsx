'use client';

import type { PropsWithChildren } from 'react';
import { ThemeProvider as BetterThemesProvider } from 'better-themes';

// better-themes owns persistence, system detection, and the SSR anti-flash
// script (toggles the `dark` class on <html>, which NativeWind's `.dark:root`
// CSS reads). Mirrors the next-themes API. Requires `suppressHydrationWarning`
// on <html> in the root document.
export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <BetterThemesProvider
      attribute="class"
      storageKey="theme"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </BetterThemesProvider>
  );
}
