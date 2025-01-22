import { isArray } from './is-array';

describe('@slabs/ds-utils/isArray', () => {
    it('returns true for array', () => {
        expect(isArray([])).toBeTruthy();
    });
    it('returns false for non array', () => {
        expect(isArray('dddd')).toBeFalsy();
    });
});
