import { isUndefinedOrNull } from './is-undefined-or-null';

describe('@slabs/ds-utils/is-undefined-or-null', () => {
    it('returns true for undefined', () => {
        expect(isUndefinedOrNull(undefined)).toBeTruthy();
    });
    it('returns true for null', () => {
        expect(isUndefinedOrNull(null)).toBeTruthy();
    });
    it('returns false for string value', () => {
        expect(isUndefinedOrNull('abc')).toBeFalsy();
        expect(isUndefinedOrNull('123')).toBeFalsy();
        expect(isUndefinedOrNull('')).toBeFalsy();
    });
    it('returns false for number value', () => {
        expect(isUndefinedOrNull(123)).toBeFalsy();
        expect(isUndefinedOrNull(0)).toBeFalsy();
    });
    it('returns false for non-empty object', () => {
        const objectVal = { a: 1, b: 2 };
        expect(isUndefinedOrNull(objectVal)).toBeFalsy();
    });
    it('returns false for empty object', () => {
        const emptyObject = {};
        expect(isUndefinedOrNull(emptyObject)).toBeFalsy();
    });
    it('returns false for empty array', () => {
        const emptyArray = [] as unknown[];
        expect(isUndefinedOrNull(emptyArray)).toBeFalsy();
    });
});
