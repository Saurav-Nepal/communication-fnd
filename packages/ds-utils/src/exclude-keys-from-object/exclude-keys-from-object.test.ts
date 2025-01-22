import { excludeKeysFromObject } from './exclude-keys-from-object';

describe('@slabs/ds-utils/exclude-key-from-object', () => {
    it('should exclude specified keys from the object', () => {
        const inputObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const excludedKeys = ['key1', 'key3'];
        const result = excludeKeysFromObject(excludedKeys, inputObject);
        expect(result).toStrictEqual({ key2: 'value2' });
    });

    it('should handle empty keys array and return the original object', () => {
        const inputObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const result = excludeKeysFromObject([], inputObject);
        expect(result).toStrictEqual(inputObject);
    });

    it('should handle non-existent key and return the original object', () => {
        const inputObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const result = excludeKeysFromObject(['nonExistentKey'], inputObject);
        expect(result).toStrictEqual(inputObject);
    });

    it('should handle empty object and return an empty object', () => {
        const result = excludeKeysFromObject(['key1', 'key2']);
        expect(result).toEqual({});
    });

    it('should not modify the original object', () => {
        const inputObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const excludedKeys = ['key1', 'key3'];
        excludeKeysFromObject(excludedKeys, inputObject);
        expect(inputObject).toStrictEqual({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        });
    });
});
