import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { EmptyFunction } from '@finnoto/design-system';

export const useRouteChange = ({
    onRouteChangeComplete,
    onRouteChangeError = EmptyFunction,
}: {
    onRouteChangeComplete: () => void;
    onRouteChangeError?: () => void;
}) => {
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeComplete', onRouteChangeComplete);
        router.events.on('routeChangeError', onRouteChangeError);
        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete);
            router.events.on('routeChangeError', onRouteChangeError);
        };
    }, [router.events, onRouteChangeComplete, onRouteChangeError]);

    const onForceRouteChangeError = useCallback(() => {
        router.events.emit('routeChangeError');
    }, [router.events]);

    return { onForceRouteChangeError };
};
