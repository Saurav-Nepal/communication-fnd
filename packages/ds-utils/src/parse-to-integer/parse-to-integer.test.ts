import { parseToInteger } from './parse-to-integer';

describe('parseInteger function', () => {
    it('should parse a string to an integer', () => {
        const result = parseToInteger('42');
        expect(result).toBe(42);
    });

    it('should handle negative numbers', () => {
        const result = parseToInteger('-123');
        expect(result).toBe(-123);
    });

    it('should handle decimal numbers by truncating the decimal part', () => {
        const result = parseToInteger('78.9');
        expect(result).toBe(78);
    });

    it('should handle non-numeric strings by returning NaN', () => {
        const result = parseToInteger('abc123');
        expect(result).toBe(NaN);
    });
});
