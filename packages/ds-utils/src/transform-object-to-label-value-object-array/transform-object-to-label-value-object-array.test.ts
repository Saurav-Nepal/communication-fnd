import { transformObjectToLabelValueObjectArray } from './transform-object-to-label-value-object-array';

type ObjectDto = {
    [x: string]: any;
    [x: number]: any;
};
describe('Transform Object to Label Value Object Array', () => {
    it('should transform an object to a label-value pair array', () => {
        const inputObject: ObjectDto[] = [
            {
                apple: 10,
                banana: 20,
                orange: 30,
            },
        ];

        const expectedResult = [
            {
                label: '0',
                value: {
                    apple: 10,
                    banana: 20,
                    orange: 30,
                },
            },
        ];

        const result = transformObjectToLabelValueObjectArray(inputObject);

        expect(result).toEqual(expectedResult);
    });

    it('should handle number keys in the object', () => {
        const inputObject: ObjectDto[] = [
            {
                1: 'One',
                2: 'Two',
                3: 'Three',
            },
        ];

        const expectedResult = [
            {
                label: '0',
                value: {
                    '1': 'One',
                    '2': 'Two',
                    '3': 'Three',
                },
            },
        ];

        const result = transformObjectToLabelValueObjectArray(inputObject);

        expect(result).toEqual(expectedResult);
    });

    it('should handle mixed string and number keys in the object', () => {
        const inputObject: ObjectDto[] = [
            {
                apple: 10,
                2: 'Two',
                orange: 30,
            },
        ];

        const expectedResult = [
            {
                label: '0',
                value: {
                    '2': 'Two',
                    apple: 10,
                    orange: 30,
                },
            },
        ];

        const result = transformObjectToLabelValueObjectArray(inputObject);

        expect(result).toEqual(expectedResult);
    });

    it('should use custom label and value keys when provided', () => {
        const inputObject = [
            {
                red: 'Apple',
                yellow: 'Banana',
                orange: 'Orange',
            },
        ];

        const expectedResult = [
            {
                customLabel: '0',
                customValue: {
                    orange: 'Orange',
                    red: 'Apple',
                    yellow: 'Banana',
                },
            },
        ];

        const result = transformObjectToLabelValueObjectArray(
            inputObject,
            'customLabel',
            'customValue'
        );

        expect(result).toEqual(expectedResult);
    });

    it('should handle empty object', () => {
        const inputObject: ObjectDto[] = [{}];

        const result = transformObjectToLabelValueObjectArray(inputObject);

        expect(result).toEqual([{ label: '0', value: {} }]);
    });
});
