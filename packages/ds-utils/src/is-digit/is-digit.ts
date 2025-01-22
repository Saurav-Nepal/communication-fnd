/**
 * @description Check if a string consists of only digit characters (0-9).
 *
 * @param {string} val - The input string to check.
 * @returns {boolean} Returns true if the string contains only digit characters, false otherwise.
 */

export const isDigit = (val: string): boolean => {
    return /^\d+$/.test(val);
};
