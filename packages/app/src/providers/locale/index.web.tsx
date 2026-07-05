import type { ReactNode } from 'react';
import { cookieName } from '@repo/app/src/paraglide/runtime';

// Vite plugin handles locale state
export function LocaleProvider({ children }: { children: ReactNode }) {
  return (children);
}

export function resetLocale() {
  document.cookie = `${cookieName}=; path=/; max-age=0`;
  window.location.reload();
}