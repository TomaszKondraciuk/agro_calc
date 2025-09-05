import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Currency } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency configurations
export const CURRENCY_CONFIGS = {
  PLN: {
    code: 'PLN' as const,
    symbol: 'zł',
    locale: 'pl-PL'
  },
  EUR: {
    code: 'EUR' as const, 
    symbol: '€',
    locale: 'de-DE'
  },
  UAH: {
    code: 'UAH' as const,
    symbol: '₴', 
    locale: 'uk-UA'
  }
} as const;

// Format currency with PLN as default
export function formatCurrency(amount: number, currency: Currency = 'PLN'): string {
  const config = CURRENCY_CONFIGS[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Convert EUR to other currencies
export function convertCurrency(eurAmount: number, targetCurrency: Currency): number {
  const rates = {
    EUR: 1,
    PLN: 4.45, // EUR/PLN rate
    UAH: 45.20 // EUR/UAH rate
  };
  return eurAmount * rates[targetCurrency];
}

// Format number with locale
export function formatNumber(num: number, locale: string = 'pl-PL'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}