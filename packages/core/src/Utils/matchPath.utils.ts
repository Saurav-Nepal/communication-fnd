import { pathToRegExp } from './pathToRegExp.utils';

export type Path = RegExp | string;

export interface Match {
    matches: boolean;
    params: Record<string, string> | null;
}

/**
 * Matches a given url against a path.
 */
export const matchPath = (path: Path, url: string): Match => {
    const urlParts = url?.split('?') || [];
    const expression = path instanceof RegExp ? path : pathToRegExp(path);
    const match = expression.exec(urlParts[0]) || false;

    // Matches in strict mode: match string should equal to input (url)
    // Otherwise loose matches will be considered truthy:
    // match('/messages/:id', '/messages/123/users') // true
    const matches =
        path instanceof RegExp ? !!match : !!match && match[0] === match.input;

    return {
        matches,
        params: match && matches ? match.groups || null : null,
    };
};
