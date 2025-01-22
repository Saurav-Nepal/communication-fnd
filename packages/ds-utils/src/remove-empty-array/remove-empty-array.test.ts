import { removeEmptyArray } from './remove-empty-array';

describe('removeEmptyArray', () => {
    it('should remove empty array from the array', () => {
        const inputArray = [
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
                phone: null,
                email: undefined,
                hobbies: [],
            },
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
                phone: null,
                email: undefined,
                hobbies: [],
            },
        ];

        const expectedResult = [
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
            },
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
            },
        ];

        const result = removeEmptyArray(inputArray);

        expect(result).toEqual(expectedResult);
    });
    it('should handle empty array', () => {
        const inputArray: unknown[] = [];

        const result = removeEmptyArray(inputArray);

        expect(result).toEqual([]);
    });
    it('should handle array with empty object', () => {
        const inputArray = [
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
                phone: null,
                email: undefined,
                hobbies: [],
            },
            {},
        ];

        const expectedResult = [
            {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    country: 'USA',
                },
            },
        ];

        const result = removeEmptyArray(inputArray);

        expect(result).toEqual(expectedResult);
    });
});
