import { isUndefined } from '@slabs/ds-utils';

import { RouteProps } from './types';

export const matchPath = (
    pathname: string,
    path: string
): Record<string, string | undefined> | null => {
    const pathParts = path.split('/').filter(Boolean);
    const pathnameParts = pathname.split('/').filter(Boolean);

    if (pathParts.length !== pathnameParts.length) {
        return null;
    }

    const params: Record<string, string | undefined> = {};

    for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i]?.startsWith(':')) {
            const paramsKey = pathParts[i]?.slice(1);
            if (isUndefined(paramsKey)) return null;

            params[paramsKey] = pathnameParts[i];
        } else if (pathParts[i] !== pathnameParts[i]) {
            return null;
        }
    }

    return params;
};

export const findMatchingRoute = (
    routes: RouteProps[],
    pathname: string
): { route: RouteProps; params: Record<string, string | undefined> } | null => {
    for (const route of routes) {
        const params = matchPath(pathname, route.path);
        if (params) {
            return { route, params };
        }
        if (route.children) {
            const nestedMatch = findMatchingRoute(route.children, pathname);
            if (nestedMatch) {
                return nestedMatch;
            }
        }
    }
    return null;
};
