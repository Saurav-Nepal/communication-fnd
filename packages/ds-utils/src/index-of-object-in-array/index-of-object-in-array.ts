import { accessNestedObject } from '../access-nested-object/access-nested-object';
import { ObjectDto } from '../types';

/**
 * Returns index of object in array
 * @param  {array} array
 * @param  {string} key
 * @param  {any} value
 */
export function indexOfObjectInArray<TObject extends ObjectDto>(
    array: TObject[],
    key: string | string[],
    value: unknown
) {
    return array.findIndex((obj) => accessNestedObject(obj, key) === value);
}
