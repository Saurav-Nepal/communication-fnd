import { hexToHsl, hexToHslString } from './hex-to-hsl';

describe('@slabs/ds-utils/hex-to-hsl/hexToHsl', () => {
    it('converts hex string to hsl array', () => {
        expect(hexToHsl('#ffffff')).toStrictEqual([0, 0, 100]);
        expect(hexToHsl('#000000')).toStrictEqual([0, 0, 0]);
        expect(hexToHsl('#FF0000')).toStrictEqual([0, 100, 50]);
    });

    it('returns empty array if value cannot be parsed', () => {
        expect(hexToHsl('')).toStrictEqual([]);
        expect(hexToHsl('0')).toStrictEqual([]);
        expect(hexToHsl('red')).toStrictEqual([]);
    });
});
describe('@slabs/ds-utils/hex-to-hsl/hexToHslString', () => {
    it('converts hex string to hsl string', () => {
        expect(hexToHslString('#ffffff')).toBe('0 0% 100%');
        expect(hexToHslString('#000000')).toBe('0 0% 0%');
        expect(hexToHslString('#FF0000')).toBe('0 100% 50%');
    });

    it('returns undefined if value cannot be parsed', () => {
        expect(hexToHslString('')).toBe(undefined);
        expect(hexToHslString('0')).toBe(undefined);
        expect(hexToHslString('red')).toBe(undefined);
    });
});
