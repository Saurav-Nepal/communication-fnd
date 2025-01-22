/**
 * Checks if a given value is undefined.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} Returns true if the value is undefined, otherwise false.
 */
export function isUndefined(value: unknown): value is undefined {
    return typeof value === 'undefined';
}
