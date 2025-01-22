import { ObjectDto } from '../types';

/**
 * @description Get the first key in an object whose corresponding value matches the specified value.
 *
 * @param {Record<string, unknown>} object - The object to search.
 * @param {unknown} value - The value to search for.
 * @returns {string | undefined} The key corresponding to the specified value, or undefined if not found.
 */
export function getKeyByValue<TObject extends ObjectDto>(
    object: TObject,
    value: unknown
): keyof TObject | undefined {
    return Object.keys(object).find((key) => object[key] === value);
}
