import { deepMerge } from './deep-merge';

describe('@slabs/ds-utils/deep-merge', () => {
    it('should merge two simple objects', () => {
        const target = { a: 1, b: 2 };
        const source = { b: 3, c: 4 };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should handle nested objects', () => {
        const target = { a: { x: 1 }, b: 2 };
        const source = { a: { y: 2 }, c: 3 };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: { x: 1, y: 2 }, b: 2, c: 3 });
    });

    it('should override non-object properties', () => {
        const target = { a: 1, b: { x: 1 } };
        const source = { a: { y: 2 }, b: 2 };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: { y: 2 }, b: 2 });
    });

    it('should handle arrays as non-object properties', () => {
        const target = { a: [1, 2], b: 2 };
        const source = { a: [3, 4], c: 3 };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: [3, 4], b: 2, c: 3 });
    });

    it('should not modify the original target object', () => {
        const target = { a: 1, b: { x: 1 } };
        const source = { b: { y: 2 }, c: 3 };
        const result = deepMerge(target, source);
        expect(target).toEqual({ a: 1, b: { x: 1 } });
        expect(result).not.toBe(target);
    });

    it('should handle null values', () => {
        const target = { a: 1, b: null };
        const source = { b: { x: 1 }, c: null };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: 1, b: { x: 1 }, c: null });
    });

    it('should handle undefined values', () => {
        const target = { a: 1, b: undefined };
        const source = { b: 2, c: undefined };
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: 1, b: 2, c: undefined });
    });

    it('should handle non-object source', () => {
        const target = { a: 1, b: 2 };
        const source = 'not an object';
        const result = deepMerge(target, source);
        expect(result).toEqual({ a: 1, b: 2 });
    });
});
