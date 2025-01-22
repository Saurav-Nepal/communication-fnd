import { getUniqueObjectsFromArrayByKey } from './get-unique-object-from-array';

describe('getUniqueObjectsFromArrayByKey', () => {
    it('should return unique objects from array', () => {
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
                phone: null,
                email: undefined,
                hobbies: [],
            },
        ];

        const result = getUniqueObjectsFromArrayByKey(inputArray, 'name');

        expect(result).toEqual(expectedResult);
    });

    it('should return empty array if input array is empty', () => {
        const inputArray: [] = [];

        const result = getUniqueObjectsFromArrayByKey(inputArray, 'name');

        expect(result).toEqual([]);
    });
});
