/**
 * Returns an array of the keys from the given object.
 *
 * @param {TObject} object - The object to retrieve the keys from.
 * @return {TKeys[]} An array of the keys from the object.
 */
export function keys<TObject extends object, TKeys extends keyof TObject>(
    object: TObject
): TKeys[] {
    return Object.keys(object) as TKeys[];
}
