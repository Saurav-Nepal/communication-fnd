import { getArrayFromObjArray } from './get-array-from-object-array';

describe('getArrayFromObjArray', () => {
    it('should return array of values from object array with given key', () => {
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
                name: 'Abc',
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

        const expectedResult = ['John', 'Abc'];

        const result = getArrayFromObjArray(inputArray, 'name');

        expect(result).toEqual(expectedResult);
    });
    it('should handle empty array', () => {
        const inputArray: unknown[] = [];

        const result = getArrayFromObjArray(inputArray, 'name');

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
            {
                name: '',
            },
        ];

        const expectedResult = ['John', ''];

        const result = getArrayFromObjArray(inputArray, 'name');

        expect(result).toEqual(expectedResult);
    });
    it('Should handle key with undefined value', () => {
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
                name: undefined,
            },
        ];

        const expectedResult = ['John', undefined];

        const result = getArrayFromObjArray(inputArray, 'name');

        expect(result).toEqual(expectedResult);
    });
});
