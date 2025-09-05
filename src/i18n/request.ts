import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
    // Zgodnie z v3.22+ używamy async requestLocale z fallbackiem.
    let locale = (await requestLocale) as Locale | undefined;

    // Walidacja i fallback na defaultLocale (zalecane przez maintainerów).
    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale as Locale;
    }

    return {
        // W v3.22+/v4 zwracamy `locale`, aby utrzymać spójność w RSC.
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
