import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Kalkulator Dopłat Rolnych 2025 | ARiMR',
  description: 'Profesjonalny kalkulator dopłat rolnych na 2025 rok oparty na oficjalnych stawkach ARiMR',
  keywords: [
    'dopłaty rolne', 'ARiMR', '2025', 'kalkulator', 'rolnictwo', 
    'ekoschematy', 'dopłaty bezpośrednie', 'Ministerstwo Rolnictwa'
  ],
  authors: [{ name: 'ARiMR Calculator Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    title: 'Kalkulator Dopłat Rolnych 2025',
    description: 'Oficjalny kalkulator dopłat rolnych na podstawie stawek ARiMR',
    siteName: 'Kalkulator Dopłat Rolnych',
  },
};
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

    export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>; // params w funkcjach async są PROMISE!
}) {
    const { locale } = await params; // MUSISZ await params by nie było błędu!

    // Walidacja locale
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className={inter.variable}>
        <body className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 antialiased">
        <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}