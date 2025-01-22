import React, { useMemo } from 'react';

import { RouterProps } from './types';
import { findMatchingRoute } from './utils';

export const Router: React.FC<RouterProps> = ({
    routes,
    pathname,
    pageNotFound,
}) => {
    const match = useMemo(
        () => findMatchingRoute(routes, pathname || '/'),
        [routes, pathname]
    );

    const content = useMemo(() => {
        if (match) {
            return React.cloneElement(
                match.route.element as React.ReactElement,
                { params: match.params }
            );
        } else {
            return pageNotFound ?? <h1>404 - Not Found</h1>;
        }
    }, [match, pageNotFound]);

    return <>{content}</>;
};
