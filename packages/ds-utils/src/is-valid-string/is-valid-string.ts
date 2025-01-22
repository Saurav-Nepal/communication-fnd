/**
 * Checking value is valid string or not
 *
 * @param value any
 * @returns boolean
 */
export function isValidString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0;
}
