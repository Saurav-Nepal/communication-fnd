import { ObjectDto } from '../types';

/**
 *
 * @description : Remove empty keys from the object
 *
 * @param {ObjectDto} obj : Object to check the empty keys
 * @returns : Object with empty keys removed
 */
export function removeEmptyObjectKeys<TObject extends ObjectDto>(obj: TObject) {
    return Object.keys(obj)
        .filter(function (k) {
            return (
                obj[k] != null &&
                !(
                    typeof obj[k] === 'object' &&
                    Object.keys(obj[k]).length === 0
                )
            );
        })
        .reduce(function (acc, k) {
            (acc as any)[k] =
                typeof obj[k] === 'object' && !Array.isArray(obj[k])
                    ? removeEmptyObjectKeys(obj[k])
                    : obj[k];
            return acc;
        }, {} as TObject);
}
