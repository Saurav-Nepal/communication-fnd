/**
 * @description Check if two dates are equal, ignoring the time component.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} Returns true if the dates are equal (ignoring time), false otherwise.
 */
export const isDateEqualIgnoringTime = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
};
