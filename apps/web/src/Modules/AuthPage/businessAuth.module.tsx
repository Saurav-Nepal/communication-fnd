import { useFetchParams, validateBusinessToken } from '@finnoto/core';
import { PageLoader } from '@finnoto/design-system';
import { useEffect } from 'react';

const BusinessAuth = () => {
    const { isRouteReady, token, backend, frontend, referrer } =
        useFetchParams();

    useEffect(() => {
        if (!isRouteReady) return;
        validateBusinessToken({ token, backend, frontend, referrer });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRouteReady]);
    return <PageLoader />;
};

export default BusinessAuth;
