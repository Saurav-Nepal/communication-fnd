import { isEmptyArray, isUndefinedOrNull } from '@slabs/ds-utils';

import { COLUMN_TYPE } from '@/constants/columnType.constants';
import { FormTypes, ObjectDto } from '@/types';

import { ExtractUrlFromColumnDefinition } from './assistGeneric.utils';

/**
 * Accepts various params as object and prepare url for get call
 * @param  {string} url
 * @param  {object} params
 */
export function BuildUrlForGetCall(url: string, params: ObjectDto) {
    let newUrl = url + '?';
    for (const i in params) {
        const value = params[i];
        if (value) {
            newUrl += i + '=' + value + '&';
        }
    }
    return newUrl.slice(0, -1);
}

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

export const getColumnType = (column): FormTypes => {
    const routeUrl = ExtractUrlFromColumnDefinition(column);

    switch (column.type_id) {
        case COLUMN_TYPE.NUMBER:
            return 'number';

        case COLUMN_TYPE.BOOLEAN:
        case COLUMN_TYPE.CHECKBOX:
            return 'boolean';

        case COLUMN_TYPE.DATE:
            return 'date';

        case COLUMN_TYPE.DATETIME:
            return 'datetime';

        case COLUMN_TYPE.REFERENCE:
            if (!routeUrl) return 'text';
            return 'reference';

        case COLUMN_TYPE.SELECT:
            if (!routeUrl) return 'text';
            return 'select';

        case COLUMN_TYPE.UPLOAD:
            return 'upload';

        case COLUMN_TYPE.TEXT:
        case COLUMN_TYPE.TEXT_AREA:
            return 'textarea';

        case COLUMN_TYPE.SCRIPT:
            return 'script';

        case COLUMN_TYPE.JSON:
            return 'json';

        default:
            return 'text';
    }
};
