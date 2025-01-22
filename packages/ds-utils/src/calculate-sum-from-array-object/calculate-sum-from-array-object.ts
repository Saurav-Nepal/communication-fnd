import { isEmptyArray } from '../is-empty-array/is-empty-array';
import { ObjectDto } from '../types';

/**
 *
 * @description Calculate the Sum from array of object
 *
 * @param {TObject[]} objArray
 * @param {string} key
 *
 * @returns {number}
 */
export const calculateSumFromArrObj = <TObject extends ObjectDto = ObjectDto>(
    objArray: TObject[],
    key: keyof TObject = 'amount'
): number => {
    if (isEmptyArray(objArray)) return 0;
    return objArray.reduce((prev, next) => prev + (next[key] || 0), 0);
};
