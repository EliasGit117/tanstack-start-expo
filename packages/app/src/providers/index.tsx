import type { ReactNode } from 'react';
import { LocaleProvider } from './locale';
import { ThemeProvider } from './theme';
import { PortalHost } from '@rn-primitives/portal';

export function Providers({ children }: { children: ReactNode }) {

  return (
    <LocaleProvider>
      <ThemeProvider>
        {children}
        <PortalHost />
      </ThemeProvider>
    </LocaleProvider>
  );
}
