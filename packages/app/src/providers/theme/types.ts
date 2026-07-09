// Platform-neutral theme types. Kept free of native-only imports (e.g.
// expo-secure-store) so the web bundle can import `Theme`/`isTheme` without
// pulling in React Native modules.
export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function isTheme(value: unknown): value is Theme {
  return value === Theme.Light || value === Theme.Dark || value === Theme.System;
}
