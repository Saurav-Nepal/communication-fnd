/**
 * List of files that should not have use client directive at the top of the output file
 * @see https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html
 */
export const ROLLUP_EXCLUDE_USE_CLIENT = [
    'index.*',
    'ds-utils/**',
    'core/slab-provider/convert-css-variables/*.ts',
    'core/slab-provider/create-theme/*.ts',
    'core/slab-provider/merge-slab-theme/*.ts',
    'core/slab-provider/slab-css-variables/*.ts',
    'core/slab-provider/*.ts',
    'core/slab-provider/color-scheme-script/color-scheme-script.tsx',
];
