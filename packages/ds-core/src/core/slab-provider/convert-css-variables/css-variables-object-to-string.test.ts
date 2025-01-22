import { cssVariablesObjectToString } from './css-variables-object-to-string';

describe('@slabs/ds-core/css-variables-object-to-string', () => {
    it('converts object to css variables string', () => {
        expect(
            cssVariablesObjectToString({
                '--primary': '#fff',
                '--primary-foreground': '#000',
            })
        ).toBe('--primary: #fff;--primary-foreground: #000;');
    });
});
