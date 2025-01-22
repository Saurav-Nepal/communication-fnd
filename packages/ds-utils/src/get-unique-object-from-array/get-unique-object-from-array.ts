import { accessNestedObject } from '../access-nested-object/access-nested-object';
import { ObjectDto } from '../types';

/**
 *
 * @param array : array of objects
 * @param key : key to search
 * @returns
 */

export function getUniqueObjectsFromArrayByKey<TObject extends ObjectDto>(
    array: TObject[],
    key: string
) {
    if (!array?.length) return [];

    return Array.from(
        new Map(
            array.map((item) => [accessNestedObject(item, key), item])
        ).values()
    );
}
