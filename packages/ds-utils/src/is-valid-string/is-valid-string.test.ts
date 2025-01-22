import { isValidString } from './is-valid-string';

describe('@slabs/ds-utils/isValidString', () => {
    it('returns true for valid string', () => {
        expect(isValidString('abc')).toBeTruthy();
        expect(isValidString('123')).toBeTruthy();
    });
    it('returns false for invalid string', () => {
        expect(isValidString(123)).toBeFalsy();
        expect(isValidString('')).toBeFalsy();
        expect(isValidString(true)).toBeFalsy();
    });
});
