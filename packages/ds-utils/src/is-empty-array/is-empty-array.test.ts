import { isEmptyArray } from './is-empty-array';

describe('@slabs/ds-utils/isArray', () => {
    it('returns true for empty array', () => {
        expect(isEmptyArray([])).toBeTruthy();
    });
    it('returns false for non-empty array', () => {
        expect(isEmptyArray(['abc', 123])).toBeFalsy();
    });
    it('returns true for non-array value', () => {
        expect(isEmptyArray('abc')).toBeTruthy();
    });
});
