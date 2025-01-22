import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useEffectOnce } from 'react-use';

import { isValidString } from '@slabs/ds-utils';

import { GLOBAL, setRouteUrl } from '@/constants/global.constants';
import { HOME_ROUTE, LOGIN_ROUTE } from '@/constants/routeName.constants';
import { BACKEND_URL, ORGANIZATION_NAME } from '@/constants/storage.constants';
import { useAuth } from '@/hooks/auth.hooks';
import { isPublicPage } from '@/utils/isPublicPage.utils';
import { GetItem } from '@/utils/localStorage.utils';
import { Navigation } from '@/utils/navigation.utils';

import { PageLoader } from '../loader';
import AdminProvider from './admin.provider';

const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const { user, loading: loadingUser } = useAuth();
    const isLoadingAuth = !isPublicPage(pathname) && loadingUser;

    useEffectOnce(() => {
        const backend_url = GetItem(BACKEND_URL, true);
        const org_name = GetItem(ORGANIZATION_NAME, true);

        if (!isValidString(GLOBAL.ROUTE_URL) && !backend_url) {
            return;
        }

        if (!backend_url) return;
        setRouteUrl(backend_url, org_name);
    });

    useEffect(() => {
        if (loadingUser) return;
        if (user.id) {
            if (pathname === LOGIN_ROUTE) {
                Navigation.navigate({ url: HOME_ROUTE });
                return;
            }
            return setLoading(false);
        }
        if (isPublicPage(pathname) || pathname === LOGIN_ROUTE)
            return setLoading(false);

        Navigation.navigate({ url: LOGIN_ROUTE });
    }, [isPublicPage(pathname), user, loadingUser]);

    if (loading || isLoadingAuth) return <PageLoader />;

    if (!isPublicPage(pathname)) {
        return <AdminProvider>{children}</AdminProvider>;
    }

    return children;
};

export default AuthProvider;
