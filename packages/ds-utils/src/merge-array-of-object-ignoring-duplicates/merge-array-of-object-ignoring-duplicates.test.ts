import { mergeArrayOfObjectIgnoringDuplicates } from './merge-array-of-object-ignoring-duplicates';

describe('@slabs/ds-utils/merge-array-of-object-ignoring-duplicates', () => {
    it('correctly merges two arrays of objects with unique keys', () => {
        const arr1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
        const arr2 = [
            { id: 3, name: 'Charlie' },
            { id: 4, name: 'David', age: 25 },
        ];
        const result = mergeArrayOfObjectIgnoringDuplicates(arr1, arr2, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
            { id: 4, name: 'David', age: 25 },
        ]);
    });

    it('correctly merges two arrays of objects with duplicate keys', () => {
        const arr1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
        const arr2 = [
            { id: 2, name: 'Charlie' },
            { id: 3, name: 'David' },
        ];
        const result = mergeArrayOfObjectIgnoringDuplicates(arr1, arr2, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'David' },
        ]);
    });

    it('correctly merges an empty array with an empty array', () => {
        const arr1: [] = [];
        const arr2: [] = [];
        const result = mergeArrayOfObjectIgnoringDuplicates(arr1, arr2, 'id');
        expect(result).toStrictEqual([]);
    });

    it('correctly merges an empty array with an array of objects', () => {
        const arr1: [] = [];
        const arr2 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
        const result = mergeArrayOfObjectIgnoringDuplicates(arr1, arr2, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ]);
    });

    it('correctly merges an array of objects with an empty array', () => {
        const arr1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
        const arr2: [] = [];
        const result = mergeArrayOfObjectIgnoringDuplicates(arr1, arr2, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ]);
    });
});
