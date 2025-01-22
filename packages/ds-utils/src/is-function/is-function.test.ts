import { isFunction } from './is-function';

describe('@slabs/ds-utils/isArray', () => {
    it('returns true for function', () => {
        expect(isFunction(() => {})).toBeTruthy();
    });
    it('returns false for non function', () => {
        expect(isFunction('dddd')).toBeFalsy();
    });
});
