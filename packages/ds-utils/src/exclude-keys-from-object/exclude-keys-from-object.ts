import { ObjectDto } from '../types';

/**
 * @description Exclude specified keys from an object.
 *
 * @param {string[]} keys - The keys to exclude.
 * @param {ObjectDto} data - The object to exclude keys from.
 * @returns {ObjectDto} A new object with specified keys excluded.
 */
export const excludeKeysFromObject = (
    keys: string[],
    data: ObjectDto = {}
): ObjectDto => {
    let result = {
        ...data,
    };
    for (let key of keys) delete result[key];
    return result;
};
