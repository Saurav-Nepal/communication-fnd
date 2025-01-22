import { isKeyInObject } from './is-key-in-object';

describe('isKeyInObject', () => {
    it('should return true if object has the key', () => {
        const inputObject = {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                country: 'USA',
            },
        };

        expect(isKeyInObject(inputObject, 'name')).toBeTruthy();
    });

    it('should return false if object does not have the key', () => {
        const inputObject = {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                country: 'USA',
            },
        };

        expect(isKeyInObject(inputObject, 'email')).toBeFalsy();
    });
});
