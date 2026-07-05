import { createContext, useContext, useState, type ReactNode } from 'react';
import { baseLocale, overwriteGetLocale, type Locale } from '@repo/app/src/paraglide/runtime';


interface ILocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

let currentLocale: Locale = baseLocale;
overwriteGetLocale(() => currentLocale);


const LocaleContext = createContext<ILocaleContextValue>({
  locale: baseLocale,
  setLocale: () => {}
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  const setLocale = (locale: Locale) => {
    currentLocale = locale;
    setLocaleState(locale);
  };

  return (
    <LocaleContext.Provider value={{ locale: locale, setLocale: setLocale, }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context)
    throw new Error('useLocale must be used within LocaleProvider');

  return context;
}