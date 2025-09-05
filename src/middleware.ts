import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Usuń localePrefix z obiektu, jeśli jest undefined, aby pasować do typu parametru.
const {localePrefix, ...rest} = routing;
const routingForMiddleware =
    localePrefix !== undefined ? {...rest, localePrefix} : rest;

export default createMiddleware(routingForMiddleware);

// Matcher minimalny (twój dotychczasowy):
export const config = {
    matcher: ['/', '/(pl|en|uk)/:path*']
};
