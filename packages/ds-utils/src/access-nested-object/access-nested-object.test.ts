import { accessNestedObject } from './access-nested-object';

describe('accessNestedObject', () => {
    it('should access nested objects with a valid path', () => {
        const obj = {
            user: {
                name: {
                    first: 'John',
                    last: 'Doe',
                },
                age: 25,
            },
            iscommunication: true,
        };

        const path = 'user.name.first';
        const expectedResult = 'John';

        const result = accessNestedObject(obj, path);

        expect(result).toEqual(expectedResult);
    });

    it('should handle accessing nested arrays', () => {
        const obj = {
            data: [
                { id: 1, value: 'One' },
                { id: 2, value: 'Two' },
            ],
        };

        const path = 'data.1.value';
        const expectedResult = 'Two';

        const result = accessNestedObject(obj, path);

        expect(result).toEqual(expectedResult);
    });

    it('should handle accessing arrays with path', () => {
        const obj = [
            { id: '1', value: 'One' },
            { id: '2', value: 'Two' },
        ];

        const path = '1';
        const expectedResult = { id: '2', value: 'Two' };

        const result = accessNestedObject(obj, path);

        expect(result).toEqual(expectedResult);
    });

    it('should handle invalid paths and return default value', () => {
        const obj = {
            user: {
                name: 'John',
            },
        };

        const invalidPath = 'user.age'; // path does not exist
        const defaultValue = 'Not Found';

        const result = accessNestedObject(obj, invalidPath, defaultValue);

        expect(result).toEqual(defaultValue);
    });
    it('should handle invalid paths and return undefined', () => {
        const obj = {
            user: {
                name: 'John',
            },
        };

        const invalidPath = 'user.age'; // path does not exist

        const result = accessNestedObject(obj, invalidPath);

        expect(result).toEqual(undefined);
    });
});
