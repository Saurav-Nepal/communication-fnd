/**
 * Converts a camel case string to kebab case.
 *
 * @param {string} value - The camel case string to be converted.
 * @return {string} The kebab case representation of the input string.
 */
export function camelToKebabCase(value: string) {
    return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
