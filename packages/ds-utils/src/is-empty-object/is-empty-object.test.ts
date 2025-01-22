import { isEmptyObject } from './is-empty-object';

describe('This test case will check is object is empty or not', () => {
    it('should return true if object is empty', () => {
        expect(isEmptyObject({})).toBe(true);
    });

    it('should return false if object is not empty', () => {
        expect(isEmptyObject({ a: 1 })).toBe(false);
    });
});
