import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en', 'uk'],

  // Used when no locale matches
  defaultLocale: 'pl',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    '/': '/',
    '/calculator': {
      pl: '/kalkulator',
      en: '/calculator', 
      uk: '/калькулятор'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];