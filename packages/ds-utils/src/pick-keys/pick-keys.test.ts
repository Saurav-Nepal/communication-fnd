import { pickKeys } from './pick-keys';

describe('@slabs/ds-utils/pick-keys/pickKeys', () => {
    it('should pick keys from an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = pickKeys(obj, ['a', 'c']);
        expect(result).toStrictEqual({ a: 1, c: 3 });
    });

    it('should pick nested keys from an object', () => {
        const obj = { a: 1, b: { c: 2, d: 3 } };
        const result = pickKeys(obj, ['a', 'b.c']);
        expect(result).toStrictEqual({ a: 1, b: { c: 2 } });
    });

    it('should return an empty object if no keys are provided', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = pickKeys(obj, []);
        expect(result).toStrictEqual({});
    });

    it('should return an empty object if the object is empty', () => {
        const obj = {};
        const result = pickKeys(obj, ['a', 'b']);
        expect(result).toStrictEqual({});
    });

    it('should return an empty object if the object is null', () => {
        const obj = null;
        const result = pickKeys(obj, ['a', 'b']);
        expect(result).toStrictEqual({});
    });

    it('should return an empty object if the object is undefined', () => {
        const obj = undefined;
        const result = pickKeys(obj, ['a', 'b']);
        expect(result).toStrictEqual({});
    });
});
