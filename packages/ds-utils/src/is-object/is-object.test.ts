import { isObject } from './is-object';

describe('@slabs/ds-utils/isObject', () => {
    it('returns true for object', () => {
        expect(isObject({})).toBeTruthy();
    });
    it('returns false for non object', () => {
        expect(isObject([])).toBeFalsy();
    });
    it('returns false for string', () => {
        expect(isObject('test')).toBeFalsy();
    });
    it('returns false for number', () => {
        expect(isObject(12)).toBeFalsy();
    });
});
