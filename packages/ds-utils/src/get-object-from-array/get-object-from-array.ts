import { indexOfObjectInArray } from '../index-of-object-in-array/index-of-object-in-array';
import { ObjectDto } from '../types';

/**
 *
 * @param array  array of objects
 * @param key key to search
 * @param value value to search
 * @returns
 */

export function getObjectFromArrayByValue<TObject extends ObjectDto>(
    array: TObject[],
    key: string | string[],
    value: unknown
) {
    const objectIndex = indexOfObjectInArray(array, key, value);
    return objectIndex > -1 ? array[objectIndex] : null;
}
