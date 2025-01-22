import { getObjectFromArrayByValue } from './get-object-from-array';

describe('getObjectFromArray', () => {
    it('should return object from array with given key and value', () => {
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

        const expectedResult = {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                country: 'USA',
            },
            phone: null,
            email: undefined,
            hobbies: [],
        };

        const result = getObjectFromArrayByValue(inputArray, 'name', 'John');

        expect(result).toEqual(expectedResult);
    });

    it('should return null if object is not present in array', () => {
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

        const result = getObjectFromArrayByValue(inputArray, '', 'Def');

        expect(result).toEqual(null);
    });

    it('should return null if array is empty', () => {
        const inputArray: [] = [];

        const result = getObjectFromArrayByValue(inputArray, 'name', 'Def');

        expect(result).toEqual(null);
    });

    it('should return first object on city search', () => {
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
                    city: 'New York1',
                    country: 'USA',
                },
                phone: null,
                email: undefined,
                hobbies: [],
            },
        ];
        const result = getObjectFromArrayByValue(
            inputArray,
            ['address', 'city'],
            'New York'
        );

        expect(result).toStrictEqual(inputArray[0]);
    });
});
