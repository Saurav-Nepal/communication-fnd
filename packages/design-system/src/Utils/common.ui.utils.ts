import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

let timeout: NodeJS.Timeout;

/**
 * Checks if the input value is a non-empty string.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} A boolean indicating whether the input value is a non-empty string.
 */
export function IsValidString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0;
}

/**
 * Returns a merged string of class names using the tailwindcss `tw` function.
 *
 * @param {ClassValue[]} inputs - An array of class names to be merged.
 * @return {string} - A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Debounce
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
export function Debounce(func, wait, immediate?: boolean) {
    return function a(_?: any) {
        const context = this;
        const args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Checking value is valid function or not
 *
 * @param data any
 * @returns boolean
 */
export function IsFunction(data: unknown): data is Function {
    return typeof data === 'function';
}

/**
 * return boolean if given variable is undefined only
 * @param value
 */
export function IsUndefined(value: unknown): value is undefined {
    return typeof value === 'undefined';
}

/**
 * return boolean if given variable is undefined or null
 * @param value
 */
export function IsUndefinedOrNull(value: unknown): value is null {
    return typeof value === 'undefined' || value == null;
}

/**
 * Parses a string into an integer using base 10.
 *
 * @param {string} number - The number to parse.
 * @return {number} The parsed integer value.
 */
export const ParseInteger = (number): number => {
    return parseInt(number, 10);
};

/**
 * return boolean if give variable is empty object or not
 * @param object
 * @returns boolean
 */
export function IsEmptyObject(object: unknown) {
    return !(object && Object.keys(object).length);
}

/**
<<<<<<< HEAD
 * Returns true if object is having keys
 * false if object is empty
 * @param  {Object} obj
 */
export function IsObjectHaveKeys(obj) {
    return obj && typeof obj === 'object' && Object.keys(obj).length;
}

/**

Checks if the given value is an empty array.
@param {unknown} value - The value to be checked.
@returns {boolean} Returns true if the value is an empty array, false otherwise.
*/
export function IsEmptyArray(value: unknown) {
    return !(Array.isArray(value) && value.length > 0);
}

/**
 * Returns the value of a nested property within an object or array, given a path of properties.
 *
 * @param {object | T[]} obj - The object or array to access.
 * @param {string | string[]} path - The path of properties to access within the object or array.
 * @param {any} [valueNotFound=undefined] - The value to return if the property is not found.
 * @return {T} The value of the nested property, or the valueNotFound parameter if the property is not found.
 */
export function AccessNestedObject<T>(
    obj: object | T[],
    path: string | string[],
    valueNotFound: any = undefined
): T {
    if (
        !(
            (Array.isArray(path) ||
                typeof path == 'string' ||
                typeof path == 'number') &&
            obj &&
            typeof obj == 'object'
        )
    ) {
        return valueNotFound;
    }

    if (typeof path == 'number') {
        path = String(path);
    }

    if (typeof path == 'string') {
        path = path.split('.');
    }

    return path.reduce(
        (xs: any, x: string) =>
            xs && xs[x] != undefined ? xs[x] : valueNotFound,
        obj
    );
}

/**
 * Returns the index of the first object in the array that has a property
 * with the specified key and value.
 * @param {any[]} array - The array to search through.
 * @param {string} key - The key of the property to search for.
 * @param {any} value - The value to search for.
 * @return {number} - The index of the first object with the specified
 * property key and value. Returns -1 if no such object is found.
 */
export function IndexOfObjectInArray(array: any[], key: string, value: any) {
    return array.findIndex((obj) => AccessNestedObject(obj, key) === value);
}

/**
 * Returns the object from an array of objects that matches the given key and value. If not found, returns null.
 *
 * @param {any[]} array - the array of objects to search through
 * @param {string} key - the key to search for in the objects
 * @param {any} value - the value to search for in the objects under the key
 * @return {any|null} - the object that matches the key-value pair, or null if not found
 */
export function GetObjectFromArray(array: any[] = [], key: string, value: any) {
    const objectIndex = IndexOfObjectInArray(array, key, value);
    return objectIndex > -1 ? array[objectIndex] : null;
}

/**
 * Checks if the given parameter is an object
 *
 * @param {any} value - The value to check
 * @returns {boolean} - Returns true if the value is an object, else false
 */
export function IsObject(value: any): boolean {
    return typeof value === 'object';
}
export function IsBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

/**
 * Returns the value of a property within an object, given a path to the property.
 * If the path is not found, it returns the default value.
 *
 * @param {any} object - The object to search for the property.
 * @param {string | (string | number)[]} path - The path to the property.
 * @param {any} [defVal=undefined] - The default value to return if the property is not found.
 * @return {any} - The value of the property or the default value.
 *
 * @author Rumesh Udash
 */
export function GetObjectProperty(
    object: any,
    path: string | (string | number)[],
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

/**
 * An empty function with no logic.
 *
 * @return {void} This function does not return a value.
 */
export const EmptyFunction = () => {
    //empty function
};

export const IsNumber = (variable: unknown): variable is number => {
    return typeof variable === 'number';
};

/**
 * Transform any given array to label & value pair array.
 *
 * @param arr Array of string or number.
 * @param label Label Key
 * @param value Value Key
 * @returns `Label` `Value` pair array
 */
export const TransformArrayToLabelValue = (
    arr: string[] | number[],
    label: string = 'label',
    value: string = 'value'
) => {
    return arr.map((str) => ({ [label]: str, [value]: str }));
};
