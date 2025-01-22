import { useCallback } from 'react';

import { useColorScheme } from '@slabs/ds-hooks';

import { useSlabContext } from '../slab.context';

export function useSlabColorScheme() {
    const { colorScheme, setColorScheme, clearColorScheme } = useSlabContext();

    const osColorScheme = useColorScheme('light', {
        getInitialValueInEffect: false,
    });
    const computedColorScheme =
        colorScheme === 'auto' ? osColorScheme : colorScheme;

    const toggleColorScheme = useCallback(
        () =>
            setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light'),
        [setColorScheme, computedColorScheme]
    );

    return {
        colorScheme,
        setColorScheme,
        clearColorScheme,
        toggleColorScheme,
        computedColorScheme,
    };
}
