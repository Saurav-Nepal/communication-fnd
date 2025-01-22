import { isUndefined } from './is-undefined';

describe('@slabs/ds-utils/isObject', () => {
    it('returns true for undefined', () => {
        expect(isUndefined(undefined)).toBeTruthy();
    });
    it('returns false for null', () => {
        expect(isUndefined(null)).toBeFalsy();
    });
    it('returns false for non undefined', () => {
        expect(isUndefined(1)).toBeFalsy();
    });
});
