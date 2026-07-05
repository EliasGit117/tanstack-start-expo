import type { ReactNode } from 'react';
import { LocaleProvider } from './locale';

export function Providers({ children }: { children: ReactNode }) {

  return (
    <LocaleProvider>
      {children}
    </LocaleProvider>
  );
}
