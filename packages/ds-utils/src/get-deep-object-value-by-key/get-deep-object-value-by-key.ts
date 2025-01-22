import { ObjectDto } from '../types';

/**
 * Finds and retrieves a deeply nested value in an object based on a given key.
 *
 * @param {TObjectDto} obj - The object to search for the key value.
 * @param {string} keyToFind - The key to search for in the object.
 * @param {unknown} defaultValue - The default value to return if the key is not found.
 * @returns {any} The value associated with the key, or the default value if the key is not found.
 */
export function getDeepObjectValueByKey<TObjectDto extends ObjectDto, TValue>(
    obj: TObjectDto,
    keyToFind: string,
    defaultValue?: TValue
): any {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            const result = getDeepObjectValueByKey(obj[key], keyToFind);
            if (result !== undefined) {
                return result;
            }
        } else if (key === keyToFind) {
            return obj[key]?.toString();
        }
    }
    return defaultValue;
}
