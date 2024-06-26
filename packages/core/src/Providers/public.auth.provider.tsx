import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useApp, useFetchParams, useUserHook } from '../Hooks';
import { validatePublicToken } from '../Utils/login.utils';
import { PageLoader } from '../Utils/ui.utils';

export const PublicAuthProvider = ({
    scope,
    source,
    children,
    referrer,
}: {
    scope: string[];
    source: string;
    children: React.ReactNode;
    referrer?: string;
}): any => {
    const { setIsPublicSignedIn } = useApp();
    const { token, isRouteReady } = useFetchParams();

    const { user: userObj } = useUserHook();
    const { isLoading, isError, error } = useQuery({
        queryKey: ['public-user', scope, source, token],
        enabled: isRouteReady,
        queryFn: () =>
            validatePublicToken({
                token,
                scope,
                source,
                referrer,
            }),
    });

    useEffect(() => {
        setIsPublicSignedIn(true);
    }, [setIsPublicSignedIn]);

    if (!userObj.loginCheckDone || isLoading) {
        return <PageLoader />;
    }

    if (isError || error) return (error as string) || 'Error';

    return children;
};
