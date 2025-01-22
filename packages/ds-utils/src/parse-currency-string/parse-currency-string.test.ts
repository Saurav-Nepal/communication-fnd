import { parseCurrencyString } from './parse-currency-string';

describe('parseCurrencyString function', () => {
    it('should parse a currency string to a number', () => {
        const result = parseCurrencyString('$42.00');
        expect(result).toBe(42);
    });

    it('should handle negative numbers', () => {
        const result = parseCurrencyString('-$123.00');
        expect(result).toBe(-123);
    });
    it('should handle decimal numbers', () => {
        const result = parseCurrencyString('$78.90');
        expect(result).toBe(78.9);
    });
});
