/**
 *
 * @param string : string to be capitalized
 * @returns  : Capitalized string
 */

export function capitalizeFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
