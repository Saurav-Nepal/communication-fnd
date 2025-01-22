import { isDigit } from './is-digit';

describe('@slabs/ds-utils/is-digit', () => {
    it('should return true for a string consisting of only digits', () => {
        expect(isDigit('12345')).toBe(true);
    });

    it('should return true for a single-digit string', () => {
        expect(isDigit('5')).toBe(true);
    });

    it('should return false for a string containing non-digit characters', () => {
        expect(isDigit('123abc')).toBe(false);
    });

    it('should return true for a string with leading zeros', () => {
        expect(isDigit('00123')).toBe(true);
    });

    it('should return false for a string with trailing spaces', () => {
        expect(isDigit('123   ')).toBe(false);
    });

    it('should return false for a string with leading and trailing spaces', () => {
        expect(isDigit('   123   ')).toBe(false);
    });
});
