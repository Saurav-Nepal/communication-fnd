import { ObjectDto } from '../types';

/**
 * Checks if object having key
 * @param  {Object} obj
 * @param  {PropertyKey} key
 *
 * @returns boolean
 */
export function isKeyInObject<TObject extends ObjectDto>(
    obj: TObject,
    key: PropertyKey
): boolean {
    return obj && typeof obj === 'object' && Object.hasOwn(obj, key);
}
