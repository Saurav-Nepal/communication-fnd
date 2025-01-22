import { convertCssVariables } from './convert-css-variables';

const result = [
    '.slab-test{--color-filled: blue;}',
    '.slab-test[data-slab-color-scheme="dark"]{--color-filled: red;}',
];

describe('@slabs/ds-core/convert-css-variables', () => {
    it('converts object to css variables string', () => {
        expect(
            convertCssVariables(
                {
                    dark: {
                        '--color-filled': 'red',
                    },
                    light: {
                        '--color-filled': 'blue',
                    },
                },
                '.slab-test'
            )
        ).toBe(result.join(''));
    });
});
