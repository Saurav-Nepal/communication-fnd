/**
 *
 * @description : Check whether the object is empty or not
 *
 * @param {unknown} object : object to check Whether it is empty or not
 * @returns {boolean} : true if object is empty else false
 */

export function isEmptyObject(object: unknown): object is undefined {
    return !(object && Object.keys(object).length);
}
