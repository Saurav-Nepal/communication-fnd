/**
 * Converts an integer number to a string with a suffix.
 *
 * @param {any} num - The numeric and non-numeric to convert.
 * @return {string} The string representation of the numeric value with a suffix.
 */
export const formatLargeNumberWithSuffix = (num: any) => {
    num = num.toString().replace(/[^0-9.]/g, '');

    if (num < 1000) {
        return num;
    }

    let si = [
        { v: 1e3, s: 'K' },
        { v: 1e6, s: 'M' },
        { v: 1e9, s: 'B' },
        { v: 1e12, s: 'T' },
        { v: 1e15, s: 'P' },
        { v: 1e18, s: 'E' },
    ];

    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (si[index] && num >= (si[index]?.v ?? 1)) {
            break;
        }
    }

    return (
        (num / (si[index]?.v ?? 1))
            .toFixed(2)
            .replace(/\.0+$|(\.\d*[1-9])0+$/, '$1') + si[index]?.s
    );
};
