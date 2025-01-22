import { getArrayDifference } from './get-array-difference';

describe('getArrayDifference', () => {
    it('should return an array with elements that are not present in the other arrays', () => {
        const arr = [1, 2, 3, 4, 5];
        const valuesToRemove = [2, 4];
        const expectedResult = [1, 3, 5];

        const result = getArrayDifference(arr, valuesToRemove);

        expect(result).toEqual(expectedResult);
    });

    it('should handle multiple arrays to exclude values', () => {
        const arr = [1, 2, 3, 4, 5];
        const valuesToRemove1 = [2, 4];
        const valuesToRemove2 = [1, 5];
        const expectedResult = [3];

        const result = getArrayDifference(
            arr,
            valuesToRemove1,
            valuesToRemove2
        );

        expect(result).toEqual(expectedResult);
    });

    it('should handle empty arrays', () => {
        const arr: number[] = [];
        const valuesToRemove: number[] = [];
        const expectedResult: number[] = [];

        const result = getArrayDifference(arr, valuesToRemove);

        expect(result).toEqual(expectedResult);
    });

    it('should handle arrays with different data types', () => {
        const arr = [1, 'two', true, null];
        const valuesToRemove = ['two', false];
        const expectedResult = [1, true, null];

        const result = getArrayDifference(arr, valuesToRemove);

        expect(result).toEqual(expectedResult);
    });
});
