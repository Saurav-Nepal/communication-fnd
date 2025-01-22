/**
 * Checks if the given item is an array.
 *
 * @param {unknown} item - The item to be checked.
 * @return {boolean} Returns true if the item is an array, otherwise false.
 */
export function isEmptyArray(value: unknown): value is undefined {
    return !(Array.isArray(value) && value.length > 0);
}
