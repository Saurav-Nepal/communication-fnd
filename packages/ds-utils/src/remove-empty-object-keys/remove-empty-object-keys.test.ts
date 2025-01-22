import { removeEmptyObjectKeys } from './remove-empty-object-keys';

describe('removeEmptyObjectKeys', () => {
    it('should remove empty keys from the object', () => {
        const inputObject = {
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

        const expectedResult = {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                country: 'USA',
            },
        };

        const result = removeEmptyObjectKeys(inputObject);

        expect(result).toEqual(expectedResult);
    });

    it('should handle empty object', () => {
        const inputObject = {};

        const result = removeEmptyObjectKeys(inputObject);

        expect(result).toEqual({});
    });
});
