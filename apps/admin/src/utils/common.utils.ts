import { isDate, isValid, parse } from 'date-fns';

import {
    isEmptyArray,
    isUndefinedOrNull,
    isValidString,
} from '@slabs/ds-utils';

import { ObjectDto } from '@/types';

import { Toast } from './toast.utils';

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

/**
 * Sort Array of Object.
 *
 * @param data `array` Array of object to sort.
 * @param sortKey `string` Key to sort by. `Default: id`
 * @param sortOrder `asc | desc` Sorting order. `Default: 'asc'`
 * @returns `array`
 */
export const SortArrayObjectBy = <TData = any>(
    data: TData[],
    sortKey: string = 'id',
    sortOrder: 'asc' | 'desc' = 'asc',
    isDate?: boolean
) => {
    if (!sortKey || !data || isEmptyArray(data) || data.length < 2) return data;

    let newData = [...data];
    newData.sort((prev: any, next: any) => {
        const prevVal = GetObjectProperty(prev, sortKey) || 0;
        const nextVal = GetObjectProperty(next, sortKey) || 0;

        if (sortOrder === 'asc') {
            if (isDate) {
                if (!prevVal || !nextVal) return 0;
                return GetDateValue(prevVal) - GetDateValue(nextVal);
            }
            if (typeof prevVal === 'string') {
                return prevVal
                    .toString()
                    .toLowerCase()
                    .localeCompare(nextVal.toString().toLowerCase(), 'en', {
                        numeric: true,
                    });
            }
            if (typeof prevVal === 'number') {
                return prevVal - nextVal;
            }
        }

        if (sortOrder === 'desc') {
            if (isDate) {
                if (!prevVal || !nextVal) return 0;
                return GetDateValue(nextVal) - GetDateValue(prevVal);
            }
            if (typeof prevVal === 'string') {
                return nextVal
                    .toString()
                    .toLowerCase()
                    .localeCompare(prevVal.toString().toLowerCase(), 'en', {
                        numeric: true,
                    });
            }
            if (typeof prevVal === 'number') {
                return nextVal - prevVal;
            }
        }

        return 0;
    });
    return newData;
};

export function GetObjectProperty(
    object: any,
    path: string | (string | number)[] = '',
    defVal: any = undefined
) {
    if (typeof path === 'string') path = path.split('.');
    if (Array.isArray(path) && path.length < 1)
        return object[path[0]] || defVal;
    return path.reduce(
        (xs, x) => (xs && xs[x] != undefined ? xs[x] : defVal),
        object
    );
}

export const GetDateValue = (
    date: any,
    format?: string,
    defaultDate?: Date
) => {
    if (!date || isDate(date)) return date;
    if (format) {
        return parse(date, format, new Date());
    }

    if (!isValid(new Date(date))) return defaultDate;

    return new Date(date);
};

/**
 * Transform any given object to label & value pair array.
 *
 * @param obj Object.
 * @param label Label Key
 * @param value Value Key
 * @returns `Label` `Value` pair array
 */
export const TransformObjectToLabelValueObjectArray = (
    obj: ObjectDto,
    label: string = 'label',
    value: string = 'value'
) => {
    return Object.keys(obj).map((objKey: string) => ({
        [label]: objKey,
        [value]: obj[objKey],
    }));
};

/**
 * Finds the group and item index of a given index in a list of groups.
 *
 * @param {ObjectDto[]} groups - List of groups to search within.
 * @param {number} index - Index to find the group and item index for.
 * @param {string} [groupItemKey='options'] - Key of the group item array.
 * @returns {Object} - Object with group and item indices.
 */
export const findGroupAndItemIndex = (
    groups: ObjectDto[],
    index: number,
    groupItemKey: string = 'options'
): { groupIndex: number; itemIndex: number } => {
    let groupIndex = 0;
    let itemIndex = index;

    // Iterate over each group in the list.
    for (const group of groups) {
        // If the itemIndex is less than the length of the group item array,
        // then the groupIndex and itemIndex have been found.
        if (itemIndex < group[groupItemKey].length) {
            return { groupIndex, itemIndex };
        }

        itemIndex -= group[groupItemKey].length;
        groupIndex++;
    }

    return { groupIndex: -1, itemIndex: -1 };
};

export const toastBackendError = (
    response: any,
    setError?: (data) => void,
    defaultMessage: string = 'Something Went Wrong'
) => {
    if (isValidString(response)) {
        return Toast.error({ description: response || defaultMessage });
    }
    if (response?.columns) {
        if (setError) return setError(response?.columns);
        Object.values(response?.columns).forEach((column: any) => {
            for (let error of column) {
                Toast.error({
                    description: error,
                });
            }
        });
    }
};

export const isLetterVariable = (val: string): boolean => {
    if (!val) return false;
    return val.startsWith('{{') && val.endsWith('}}');
};

export const getVariableParamsFromString = (input: string): string[] => {
    const regex = /{{(.*?)}}/g;
    const variables: string[] = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        variables.push(match[1].trim());
    }

    return variables;
};

export const replaceVariablesInString = (
    template: string,
    params: Record<string, string>
): string => {
    const regex = /{{(.*?)}}/g;
    return template.replace(regex, (_, variable) => {
        const trimmedVariable = variable.trim();
        return trimmedVariable in params ? params[trimmedVariable] : _;
    });
};
