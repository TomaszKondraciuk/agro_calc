import { describe, it, expect } from 'vitest';
import { formatCurrency, convertCurrency, debounce } from '@/lib/utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format PLN currency correctly', () => {
      const result = formatCurrency(1234.56, 'PLN');
      expect(result).toMatch(/1[\s ]234,56[\s ]zł/);
    });

    it('should format EUR currency correctly', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toMatch(/1\.234,56[\s ]€/);
    });

    it('should format UAH currency correctly', () => {
      const result = formatCurrency(1234.56, 'UAH');
      expect(result).toMatch(/1[\s ]234,56[\s ]₴/);
    });

    it('should default to PLN', () => {
      const result = formatCurrency(100);
      expect(result).toMatch(/zł/);
    });
  });

  describe('convertCurrency', () => {
    it('should convert EUR to PLN', () => {
      const result = convertCurrency(100, 'PLN');
      expect(result).toBe(445); // 100 * 4.45
    });

    it('should convert EUR to UAH', () => {
      const result = convertCurrency(100, 'UAH');
      expect(result).toBe(4520); // 100 * 45.20
    });

    it('should return same amount for EUR', () => {
      const result = convertCurrency(100, 'EUR');
      expect(result).toBe(100);
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => callCount++, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });
});