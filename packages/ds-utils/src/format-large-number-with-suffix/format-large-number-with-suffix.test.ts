import { formatLargeNumberWithSuffix } from './format-large-number-with-suffix';

describe('This function will convert integer to string with suffix', () => {
    it('should return String value corresponding to number less than 1000', () => {
        expect(formatLargeNumberWithSuffix(42)).toBe('42');
        expect(formatLargeNumberWithSuffix(999)).toBe('999');
    });
    it('should return the value with string suffix', () => {
        expect(formatLargeNumberWithSuffix(1500)).toBe('1.5K');
        expect(formatLargeNumberWithSuffix(5000000)).toBe('5M');
        expect(formatLargeNumberWithSuffix(1200000000)).toBe('1.2B');
    });

    it('should handle non-numeric characters and format the number', () => {
        expect(formatLargeNumberWithSuffix('abc123')).toBe('123');
        expect(formatLargeNumberWithSuffix('$1,000,000')).toBe('1M');
    });
});
