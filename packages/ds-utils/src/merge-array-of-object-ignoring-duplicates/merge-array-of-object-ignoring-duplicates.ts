import { MergeDeep } from 'type-fest/source/merge-deep';

import { ObjectDto } from '../types';

/**
 * Merge two arrays of objects while ignoring duplicates based on a unique key.
 *
 * @param {TObject[]} arr1 - The first array of objects. `Priority is given to this array`.
 * @param {TObject2[]} arr2 - The second array of objects
 * @param {keyof TObject} uniqueKey - The unique key to identify duplicates
 * @return {TObject[]} The merged array of objects
 */
export const mergeArrayOfObjectIgnoringDuplicates = <
    TObject extends ObjectDto,
    TObject2 extends ObjectDto = TObject,
>(
    arr1: TObject[],
    arr2: TObject2[],
    uniqueKey: string
): MergeDeep<TObject[], TObject2[]> => {
    // Create a set of unique identifiers from objects in arr1
    const uniqueIds = new Set(arr1.map((obj) => obj[uniqueKey]));

    // Filter out objects from arr2 that already exist in arr1
    const filteredArr2 = arr2.filter((obj) => !uniqueIds.has(obj[uniqueKey]));

    // Concatenate the filteredArr2 with arr1
    return [...arr1, ...filteredArr2];
};
