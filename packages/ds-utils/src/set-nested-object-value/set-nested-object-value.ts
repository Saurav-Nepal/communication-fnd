import { isUndefinedOrNull } from '../is-undefined-or-null/is-undefined-or-null';
import { ObjectDto } from '../types';

/**
 * Set value of any object included nested Objects.
 *
 * @param obj object
 * @param path String
 * @param value any
 * @returns object
 */
export const setNestedObjectValue = (
    obj: ObjectDto,
    path: string | string[],
    value: any
) => {
    const keys = typeof path === 'string' ? path.split('.') : path;
    const lastKey = keys.pop();
    if (!lastKey) return obj;

    const pointer =
        keys.reduce((accumulator, currentValue) => {
            if (isUndefinedOrNull(accumulator[currentValue]))
                accumulator[currentValue] = {};
            return accumulator[currentValue];
        }, obj) || {};

    pointer[lastKey] = value;

    return obj;
};
