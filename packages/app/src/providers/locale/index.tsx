import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { getLocales } from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import {
  baseLocale,
  locales,
  overwriteGetLocale,
  overwriteSetLocale,
  type Locale, isLocale
} from '@app/paraglide/runtime';


const LOCALE_KEY = 'locale';

let currentLocale: Locale = getInitialLocale();
let notify: (locale: Locale) => void = () => null;

overwriteGetLocale(() => currentLocale);
overwriteSetLocale((locale) => {
  currentLocale = locale;
  SecureStore.setItem(LOCALE_KEY, locale);
  notify(locale);
});

export function resetLocale() {
  SecureStore.deleteItemAsync(LOCALE_KEY).catch(() => null);
  currentLocale = getDeviceLocale();
  notify(currentLocale);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  useEffect(() => {
    notify = setLocaleState;

    return () => {
      notify = () => null;
    };
  }, []);

  return (
    <Fragment key={locale}>
      {children}
    </Fragment>
  );
}


function getInitialLocale(): Locale {
  const stored = SecureStore.getItem(LOCALE_KEY);
  if (isLocale(stored))
    return stored;

  return getDeviceLocale();
}

function getDeviceLocale(): Locale {
  const code = getLocales()[0]?.languageCode;
  return locales.find((locale) => locale === code) ?? baseLocale;
}