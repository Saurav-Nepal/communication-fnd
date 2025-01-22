/**
 *
 * @param array : array of Values
 * @returns : array of unique values
 */

export function getUniqueArrayValues<TValue>(array: TValue[] = []) {
    return [...new Set(array)];
}
