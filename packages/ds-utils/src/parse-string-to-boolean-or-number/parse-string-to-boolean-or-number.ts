import { isDigit } from '../is-digit/is-digit';

/**
 * @description Parse and normalize a value to a boolean or number if possible.
 *
 * @param {string} value The input value to parse.
 * @returns {Boolean | Number | String} The parsed value. If the value is not a boolean or number, original value is returned.
 */
export const parseStringToBooleanOrNumber = (
    value: string
): boolean | number | string => {
    const lowerCaseVal = value.toLowerCase();
    if (['true', 'false'].includes(lowerCaseVal)) {
        return lowerCaseVal === 'true';
    }
    if (isDigit(lowerCaseVal)) return Number(value);
    return value;
};
