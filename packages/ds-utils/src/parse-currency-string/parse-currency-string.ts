/**
 * Parse currency string to number
 * @param  {string} currencyString
 * @returns {number}
 */
export function parseCurrencyString(currencyString: string): number {
    // Remove any non-numeric characters from the string
    const numericString = currencyString.replace(/[^0-9.-]+/g, '');

    // Parse the numeric string to a number
    const number = parseFloat(numericString);

    return number;
}
