/**
 * Checks if the given item is an object.
 *
 * @param {unknown} item - The item to be checked.
 * @return {boolean} Returns true if the item is an object, false otherwise.
 */
export function isObject(item: unknown): item is object {
    return !!item && typeof item === 'object' && !Array.isArray(item);
}
