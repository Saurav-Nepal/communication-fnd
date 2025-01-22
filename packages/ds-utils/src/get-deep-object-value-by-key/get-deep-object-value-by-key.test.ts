import { getDeepObjectValueByKey } from './get-deep-object-value-by-key';

describe('@slabs/ds-utils/get-deep-object-value-by-key', () => {
    const sampleObject = {
        level1: {
            level2: {
                level3: {
                    level3Key: 'level3Value',
                    1: 'numericValue',
                },
            },
            keyToFind: 'valueInLevel1',
        },
        topKey: 'topValue',
    };

    const duplicateKeyObject = {
        product: {
            id: 123,
            name: 'Product name',
        },
        category: {
            id: 234,
            name: 'Category name',
        },
    };

    it('should return the first value that it finds', () => {
        const result = getDeepObjectValueByKey(duplicateKeyObject, 'name', 1);
        expect(result).toBe('Product name');
    });

    it('should access value for a key nested in multiple levels', () => {
        const result = getDeepObjectValueByKey(sampleObject, 'level3Key');
        expect(result).toBe('level3Value');
    });

    it('should access value for a key at the top level', () => {
        const result = getDeepObjectValueByKey(sampleObject, 'topKey');
        expect(result).toBe('topValue');
    });

    it('should return defaultValue for a key that does not exist', () => {
        const result = getDeepObjectValueByKey(
            sampleObject,
            'nonExistentKey',
            'default'
        );
        expect(result).toBe('default');
    });
});
