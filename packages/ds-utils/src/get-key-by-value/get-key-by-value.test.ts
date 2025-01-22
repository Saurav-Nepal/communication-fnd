import { getKeyByValue } from './get-key-by-value';

describe('@slabs/ds-utils/get-key-by-value', () => {
    const sampleObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
    };

    it('should return the key for an existing value', () => {
        const result = getKeyByValue(sampleObject, 'value2');
        expect(result).toBe('key2');
    });

    it('should return undefined for a non-existing value', () => {
        const result = getKeyByValue(sampleObject, 'nonExistingValue');
        expect(result).toBeUndefined();
    });

    it('should return the first key for a value appearing multiple times', () => {
        const objectWithDuplicateValues = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value2',
        };
        const result = getKeyByValue(objectWithDuplicateValues, 'value2');
        expect(result).toBe('key2');
    });

    it('should handle values of different types', () => {
        const objectWithDifferentTypes = {
            key1: 42,
            key2: '42',
            key3: true,
        };
        const result1 = getKeyByValue(objectWithDifferentTypes, '42');
        const result2 = getKeyByValue(objectWithDifferentTypes, true);
        expect(result1).toBe('key2');
        expect(result2).toBe('key3');
    });

    it('should return undefined for an empty object', () => {
        const result = getKeyByValue({}, 'value');
        expect(result).toBeUndefined();
    });
});
