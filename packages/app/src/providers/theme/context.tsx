'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Theme, isTheme } from './types';


const STORAGE_KEY = 'theme';

// Native theme persistence (web theme is owned by better-themes). Raw string value.
function readStored(): Theme | null {
  try {
    const raw = SecureStore.getItem(STORAGE_KEY);
    return isTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

function persist(theme: Theme): void {
  try {
    SecureStore.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore write failures
  }
}

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // `false` until the persisted preference is read.
  hasHydrated: boolean;
}

const ThemeContext = createContext<IThemeContext>({
  theme: Theme.System,
  setTheme: () => null,
  hasHydrated: false
});

export function useThemeContext(): IThemeContext {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(Theme.System);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored)
      setThemeState(stored);

    setHasHydrated(true);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    persist(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hasHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
}
