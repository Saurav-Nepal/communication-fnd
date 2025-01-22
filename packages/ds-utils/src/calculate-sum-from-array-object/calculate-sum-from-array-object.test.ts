import { calculateSumFromArrObj } from './calculate-sum-from-array-object';

describe('@slabs/ds-utils/calculate-sum-from-array-object', () => {
    it('should return 0 for an empty array', () => {
        const emptyArray = [] as any[];
        expect(calculateSumFromArrObj(emptyArray)).toBe(0);
    });

    it('should calculate the sum of numeric values using the default key "amount"', () => {
        const numericArray = [{ amount: 10 }, { amount: 20 }, { amount: 30 }];
        expect(calculateSumFromArrObj(numericArray)).toBe(60);
    });

    it('should calculate the sum of numeric values using a specified key', () => {
        const customKeyArray = [{ value: 5 }, { value: 10 }, { value: 15 }];
        expect(calculateSumFromArrObj(customKeyArray, 'value')).toBe(30);
    });

    it('should calculate the sum of numeric values even if key is missing in some object', () => {
        const customKeyArray = [
            { value: 15, total: 20 },
            { value: 10, total: 15 },
            { total: 5 },
        ];
        expect(calculateSumFromArrObj(customKeyArray, 'value')).toBe(25);
    });
});
