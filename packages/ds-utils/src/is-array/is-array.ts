/**
 * Checks if the given item is an array.
 *
 * @param {unknown} item - The item to be checked.
 * @return {boolean} Returns true if the item is an array, otherwise false.
 */
export function isArray(item: unknown): item is [] {
    return !!item && Array.isArray(item);
}
