import { indexOfObjectInArray } from './index-of-object-in-array';

describe('indexOfObjectInArray', () => {
    it('should return index of object in array', () => {
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

        const expectedResult = 1;

        const result = indexOfObjectInArray(inputArray, 'name', 'Abc');

        expect(result).toEqual(expectedResult);
    });
    it('should return -1 if object is not present in array', () => {
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

        const expectedResult = -1;

        const result = indexOfObjectInArray(inputArray, 'name', 'Xyz');

        expect(result).toEqual(expectedResult);
    });
    it('should handle empty array', () => {
        const inputArray: [] = [];

        const result = indexOfObjectInArray(inputArray, 'name', 'Xyz');

        expect(result).toEqual(-1);
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

        const expectedResult = 1;

        const result = indexOfObjectInArray(inputArray, 'name', '');

        expect(result).toEqual(expectedResult);
    });
});
