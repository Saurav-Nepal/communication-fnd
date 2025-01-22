import { transformArrayObjectToKeyValueObject } from './transform-array-object-to-key-value-object';

describe('transformArrayObjectToKeyValueObject function', () => {
    it('should transform an array of objects into a key-value pair object', () => {
        const inputArray = [
            { key: '1', name: 'One' },
            { key: '2', name: 'Two' },
            { key: '3', name: 'Three' },
        ];

        const expectedResult = {
            '1': 'One',
            '2': 'Two',
            '3': 'Three',
        };

        const result = transformArrayObjectToKeyValueObject(inputArray);

        expect(result).toEqual(expectedResult);
    });

    it('should use custom label and value keys when provided', () => {
        const inputArray = [
            { id: '1', label: 'Apple', value: 10 },
            { id: '2', label: 'Banana', value: 20 },
            { id: '3', label: 'Orange', value: 30 },
        ];

        const expectedResult = {
            '1': 'Apple',
            '2': 'Banana',
            '3': 'Orange',
        };

        const result = transformArrayObjectToKeyValueObject(
            inputArray,
            'id',
            'label'
        );

        expect(result).toEqual(expectedResult);
    });

    it('should handle objects without the specified label key', () => {
        const inputArray = [
            { id: '1', label: 'Apple', value: 10 },
            { id: '2', value: 20 }, // No label key
            { id: '3', label: 'Orange', value: 30 },
        ];

        const expectedResult = {
            '1': 'Apple',
            '2': null,
            '3': 'Orange',
        };

        const result = transformArrayObjectToKeyValueObject(
            inputArray,
            'id',
            'label'
        );

        expect(result).toEqual(expectedResult);
    });

    it('should default to null for values without the specified value key', () => {
        const inputArray = [
            { id: '1', label: 'Apple', value: 10 },
            { id: '2', label: 'Banana' }, // No value key
            { id: '3', label: 'Orange', value: 30 },
        ];

        const expectedResult = {
            '1': 10,
            '2': null,
            '3': 30,
        };

        const result = transformArrayObjectToKeyValueObject(
            inputArray,
            'id',
            'value'
        );

        expect(result).toEqual(expectedResult);
    });
});
