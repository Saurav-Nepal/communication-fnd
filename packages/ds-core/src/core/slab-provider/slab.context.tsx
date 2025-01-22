import { createContext, useContext } from 'react';

import { SlabColorScheme } from './theme.types';

export interface SlabContextValue {
    /** The current color scheme */
    colorScheme: SlabColorScheme;

    /** Sets the color scheme */
    setColorScheme: (colorScheme: SlabColorScheme) => void;

    /** Clears the color scheme */
    clearColorScheme: () => void;

    /** Gets the root element where the theme is applied */
    getRootElement: () => HTMLElement | undefined;

    /** The CSS selector used to apply the theme */
    cssVariablesSelector: string;
}

export const SlabContext = createContext<SlabContextValue | null>(null);

/**
 * Retrieves the Slab context from the React context tree.
 *
 * @throws {Error} If SlabProvider is not found in the tree.
 * @return The Slab context value.
 */
export function useSlabContext() {
    const ctx = useContext(SlabContext);

    if (!ctx) {
        throw new Error('[@slabs/ds-core] SlabProvider was not found in tree');
    }

    return ctx;
}

// export function useSlabCssVariablesResolver() {
//     return useSlabContext().cssVariablesResolver;
// }

// export function useSlabClassNamesPrefix() {
//     return useSlabContext().classNamesPrefix;
// }
