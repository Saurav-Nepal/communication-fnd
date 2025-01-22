/**
 * Converts a value to pixels.
 *
 * @param {unknown} value - The value to be converted.
 * @return {number} The converted value in pixels.
 */
export function px(value: unknown) {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        if (value.includes('calc') || value.includes('var')) {
            return value;
        }

        if (value.includes('px')) {
            return Number(value.replace('px', ''));
        }

        if (value.includes('rem')) {
            return Number(value.replace('rem', '')) * 16;
        }

        if (value.includes('em')) {
            return Number(value.replace('em', '')) * 16;
        }

        return Number(value);
    }

    return NaN;
}
