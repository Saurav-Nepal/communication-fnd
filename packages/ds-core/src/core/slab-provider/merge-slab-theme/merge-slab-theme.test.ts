import { DEFAULT_DARK_THEME, DEFAULT_THEME } from '../default-theme';
import { SlabTheme } from '../theme.types';
import { mergeSlabTheme } from './merge-slab-theme';

describe('@slabs/ds-core/merge-slab-theme', () => {
    it('merges theme and override correctly when override is undefined', () => {
        expect(
            mergeSlabTheme(DEFAULT_THEME, DEFAULT_DARK_THEME as SlabTheme)
        ).toStrictEqual({
            darkThemes: { base: DEFAULT_DARK_THEME },
            themes: { base: DEFAULT_THEME },
        });
    });
});
