/**
 * Check if 'window' global object is available.
 * The 'window' object is not available on ssr of nextjs.
 *
 * @returns boolean
 */
export const isWindow = (): boolean => {
    return typeof window !== 'undefined';
};
