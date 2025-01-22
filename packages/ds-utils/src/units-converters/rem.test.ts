import { em, rem } from './rem';

describe('@slabs/units-converters/rem', () => {
    it('returns undefined if input is undefined', () => {
        expect(rem(undefined)).toBe(undefined);
    });

    it('handles 0 correctly', () => {
        expect(rem(0)).toBe('0');
        expect(rem('0')).toBe('0');
    });

    it('converts numbers to rem', () => {
        expect(rem(16)).toBe('1rem');
        expect(rem(-32)).toBe('-2rem');
    });

    it('converts string px to rems', () => {
        expect(rem('32px')).toBe('2rem');
    });

    it('scales rem values', () => {
        expect(rem('2rem')).toBe('2rem');
    });

    it('does not modify other values', () => {
        expect(rem('10%')).toBe('10%');
        expect(rem('5vh')).toBe('5vh');
    });

    it('does not modify scaled values', () => {
        expect(rem('2rem')).toBe('2rem');
    });

    it('does not modify calc, var, clamp and other functions', () => {
        expect(rem('calc(2rem + 10px)')).toBe('calc(2rem + 10px)');
        expect(rem('var(--slab-size-xs)')).toBe('var(--slab-size-xs)');
        expect(rem('clamp(10px, 2rem, 20px)')).toBe('clamp(10px, 2rem, 20px)');
    });

    it('converts values separated by space', () => {
        expect(rem('10px 5px')).toBe('0.625rem 0.3125rem');

        expect(rem('1rem 0.5rem')).toBe('1rem 0.5rem');

        expect(rem('16px solid var(--slab-color-primary)')).toBe(
            '1rem solid var(--slab-color-primary)'
        );
    });
});

describe('@slabs/units-converters/em', () => {
    it('converts numbers to em', () => {
        expect(em(0)).toBe('0');
        expect(em(16)).toBe('1em');
        expect(em(-32)).toBe('-2em');
    });

    it('converts string px to ems', () => {
        expect(em('32px')).toBe('2em');
    });

    it('does not modify other values', () => {
        expect(em('2em')).toBe('2em');
        expect(em('10%')).toBe('10%');
        expect(em('5vh')).toBe('5vh');
    });
});
