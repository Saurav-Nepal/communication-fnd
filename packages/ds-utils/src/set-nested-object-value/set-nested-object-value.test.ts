import { setNestedObjectValue } from './set-nested-object-value';

describe('setNestedObjectValue', () => {
    it('should set value of any object included nested Objects', () => {
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
            phone: null,
            email: undefined,
            hobbies: [],
            company: {
                name: 'Google',
            },
        };

        const result = setNestedObjectValue(
            inputObject,
            'company.name',
            'Google'
        );

        expect(result).toEqual(expectedResult);
    });

    it('should handle empty object', () => {
        const inputObject = {};

        const result = setNestedObjectValue(
            inputObject,
            'company.name',
            'Google'
        );

        expect(result).toEqual({
            company: {
                name: 'Google',
            },
        });
    });
});
