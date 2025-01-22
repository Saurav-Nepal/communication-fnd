import { publicPages } from '@/constants/publicRoutes';

/**
 * Checks if a given path corresponds to a public page.
 * @param path The path to check.
 * @returns True if the path is public, false otherwise.
 */
export function isPublicPage(path: string): boolean {
    return publicPages.some((publicPath) => {
        // Check for exact match
        if (publicPath === path) return true;

        // Check for dynamic routes
        if (publicPath.includes('[') && publicPath.includes(']')) {
            const regexString =
                '^' + publicPath.replace(/\[.*?\]/g, '[^/]+') + '$';
            const regex = new RegExp(regexString);
            return regex.test(path);
        }

        return false;
    });
}
