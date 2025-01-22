import { parseStringToBooleanOrNumber } from './parse-string-to-boolean-or-number';

describe('@slabs/ds-utils/parse-standard-format-value', () => {
    it('should parse "true" string to true', () => {
        const result = parseStringToBooleanOrNumber('true');
        expect(result).toBe(true);
    });

    it('should parse "false" string to false', () => {
        const result = parseStringToBooleanOrNumber('false');
        expect(result).toBe(false);
    });

    it('should parse numeric string to number', () => {
        const result = parseStringToBooleanOrNumber('42');
        expect(result).toBe(42);
    });

    it('should handle uppercase "TRUE" and "FALSE"', () => {
        const resultTrue = parseStringToBooleanOrNumber('TRUE');
        const resultFalse = parseStringToBooleanOrNumber('FALSE');
        expect(resultTrue).toBe(true);
        expect(resultFalse).toBe(false);
    });

    it('should return original value for non-matching string input', () => {
        const result = parseStringToBooleanOrNumber('abc');
        expect(result).toBe('abc');
    });

    it('should handle numeric string with leading zeros', () => {
        const result = parseStringToBooleanOrNumber('00123');
        expect(result).toBe(123);
    });
});
