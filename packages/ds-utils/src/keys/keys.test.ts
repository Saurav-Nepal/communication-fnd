import { keys } from './keys';

describe('@slabs/ds-utils/keys/keys', () => {
    it('converts object to key strings', () => {
        expect(keys({ key1: 'value1', key2: 'value2', 0: 1000 })).toStrictEqual(
            ['0', 'key1', 'key2']
        );
    });

    it('return empty array for empty object', () => {
        expect(keys({})).toStrictEqual([]);
        expect(keys([])).toStrictEqual([]);
    });
});
