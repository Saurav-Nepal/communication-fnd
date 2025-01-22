/**
 *
 * @param {string} string : string to be capitalized
 * @returns  : Capitalized string
 */

export function capitalize(string: string) {
    return (string || '')
        .toLowerCase()
        .replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
}
