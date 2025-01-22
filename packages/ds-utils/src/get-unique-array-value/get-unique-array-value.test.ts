import { getUniqueArrayValues } from './get-unique-array-value';

describe('getUniqueArrayValues', () => {
    it('should return unique values from array', () => {
        const inputArray = [1, 2, 3, 4, 5, 5, 5, 5, 5];

        const expectedResult = [1, 2, 3, 4, 5];

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual(expectedResult);
    });

    it('should return empty array if input array is empty', () => {
        const inputArray: unknown[] = [];

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual([]);
    });

    it('should return empty array if input array is undefined', () => {
        const inputArray = undefined;

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual([]);
    });

    it('should return empty array if input array is null', () => {
        const inputArray = [null];

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual([null]);
    });

    it('Should return unique value from array of null and undefined', () => {
        const inputArray = [null, undefined];

        const expectedResult = [null, undefined];

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual(expectedResult);
    });

    it('Should return unique value from array', () => {
        const inputArray = [null, undefined, null, undefined];

        const expectedResult = [null, undefined];

        const result = getUniqueArrayValues(inputArray);

        expect(result).toEqual(expectedResult);
    });
});
