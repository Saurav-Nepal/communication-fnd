import { isEmptyArray, isUndefinedOrNull } from '@slabs/ds-utils';

import { ObjectDto } from '@/types';

/**
 * Converts array to object
 * @param  {Array} array
 * @param  {string} key (optional)
 */
export const ArrayToObject = (array: ObjectDto[], key: string) => {
    const obj = {};

    array.forEach((element, index) => {
        if (element && typeof element == 'object' && element[key]) {
            obj[key ? element[key] : index] = element;
        }
    });
    return obj;
};

/**
 * query params in generic utils methods have by default ' and ' prefix
 * this method remove that prefix
 * Used Before making api call,
 * @param  {object} options
 */
export function TrimQueryString(options) {
    if (options.query && typeof options.query == 'string') {
        options.query = options.query.replace(/^ and /, '');
        options.query = encodeURI(options.query);
    } else {
        delete options.query;
    }
    return options;
}

/**
 * returns matched option from array against mentioned attribute value(in case of array of objects)
 * or element(in case of plain array)
 * @param  {array} hayStack - array
 * @param  {} needle - value
 * @param  {string} element - attribute name
 * @param  {int} defaultElement - if element not found, returns element of default index
 */
export function SelectFromOptions(
    hayStack,
    needle,
    element: any = null,
    defaultElement: any = null,
    shouldNotSendDefaultElement = false
) {
    defaultElement = defaultElement || 0;
    const isArray = isUndefinedOrNull(element);
    for (const i in hayStack) {
        if (isArray) {
            if (hayStack[i] == needle) return hayStack[i];
        } else {
            if (hayStack[i][element] == needle) return hayStack[i];
        }
    }

    if (!shouldNotSendDefaultElement) {
        const finalElement = hayStack[defaultElement];

        return finalElement || hayStack[0];
    }
    return null;
}

/**
 * Sort array by key
 *
 * @param collection array
 * @param index index
 * @param order sort order
 * @returns array
 */
export const orderBy = <T>(
    collection: T[],
    key: string,
    order: 'asc' | 'desc' = 'asc'
): T[] => {
    const result = collection.slice(0);

    if (!isEmptyArray(collection) && collection[0][key]) {
        result.sort(function (a, b) {
            const x =
                typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            const y =
                typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }

    if (order === 'desc') {
        result.reverse();
    }

    return result;
};

export const groupBy = <T>(
    collection: T[] | object,
    iteratee: string | any
) => {
    if (!isEmptyArray(collection)) {
        let arr: T[];
        if (typeof collection === 'object') {
            arr = Object.values(collection);
        } else {
            arr = collection;
        }
        return arr.reduce(function (obj, item) {
            const key =
                typeof iteratee === 'function'
                    ? iteratee(item)
                    : item[iteratee];

            if (!obj.hasOwnProperty(key)) {
                obj[key] = [];
            }

            obj[key].push(item);

            return obj;
        }, {});
    } else {
        return {};
    }
};
