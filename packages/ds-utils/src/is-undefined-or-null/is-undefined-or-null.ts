/**
 * return boolean if given variable is undefined or null
 * @param value
 */
export function isUndefinedOrNull(value: unknown): value is null {
    return typeof value === 'undefined' || value == null;
}
