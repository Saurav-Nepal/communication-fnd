/**
 * Checks if the given data is a function.
 *
 * @param {unknown} data - The data to be checked.
 * @return {boolean} Returns true if the data is a function, false otherwise.
 */
export function isFunction(data: unknown): data is Function {
    return typeof data === 'function';
}
