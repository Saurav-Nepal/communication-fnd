import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-use';

import { isEmptyArray, isEmptyObject } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { ORGANIZATION_NAME } from '@/constants/storage.constants';
import useUser from '@/hooks/useUser.hook';
import { MenuService } from '@/services';
import { GetItem } from '@/utils/localStorage.utils';
import { IsProduction } from '@/utils/system.utils';
import { Toast } from '@/utils/toast.utils';
import { GetSettings, GetUserPreferences } from '@/utils/userPreference.utils';
import { useQuery } from '@tanstack/react-query';

import { AdminWrapper } from '../adminWrapper/adminWrapper.component';

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    const [menuUrlMap, setMenuUrlMap] = useState<any>();

    const { user } = useUser();

    const { data: menus, status } = useQuery({
        queryKey: ['menu'],
        retry: 2,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: !!user?.id,
        queryFn: () => MenuService.initMenus(!IsProduction()),
    });

    const { data: preferences, status: prefStatus } = useQuery({
        queryKey: ['user_preferences'],
        retry: 2,
        enabled: !!user?.id,
        queryFn: () => GetUserPreferences(),
    });

    useEffect(() => {
        if (isEmptyObject(menus)) return;

        setMenuUrlMap(getUrlMenuMapping(menus.modules));
    }, [menus]);

    useEffect(() => {
        if (isEmptyArray(preferences)) return;

        const shortCut = GetSettings(['spotLight', 'searchMenu']);

        if (shortCut && shortCut.length) {
            // TO-DO: setup shortcuts
            // shortCut.forEach((key) => {
            //     this.updateKey(key);
            // });
        } else {
            setTimeout(() => {
                Toast.warn({
                    title: 'Note',
                    description:
                        'To bring more control to having shortcut keys in Admin Panel, We had to reset all your previously set short cut keys. Please try setting your shortcut keys again.',
                });
            }, 3000);
        }
    }, [preferences]);

    /**
     * Create url map object
     * contains url path as index against the menu name
     * useful in assigning page title
     * @param  {array} modules
     */
    const getUrlMenuMapping = useCallback(
        (modules: any[]) => {
            const mapping: any = {};
            if (!Array.isArray(modules)) {
                return mapping;
            }
            modules.forEach((module) => {
                module.menus.forEach((menu: any) => {
                    const index = getIndex(menu.url);
                    if (!index) return;

                    mapping[index] = { name: menu.name };
                });
            });
            return mapping;
        },
        [menus]
    );

    /**
     * i/p - /menu/4
     * o/p - menu
     * @param  {string} url
     */
    const getIndex = useCallback(
        (url: string = '') => {
            const urlRegex = /[^\/]+/;
            const matchArry = url.match(urlRegex);
            if (Array.isArray(matchArry)) {
                return matchArry[0];
            }
            return null;
        },
        [menus]
    );

    /**
     * Generates current page title.
     */
    const pageTitle = useMemo(() => {
        const orgName =
            GetItem(ORGANIZATION_NAME, true) || GLOBAL.ORGANIZATION.name;

        let title = '';
        const index = getIndex(location.pathname);
        if (
            index &&
            !isEmptyObject(menuUrlMap) &&
            menuUrlMap[index] &&
            menuUrlMap[index].name
        ) {
            title = ` | ${menuUrlMap[index].name}`;
        }

        return `${orgName || 'Admin'} ${title}`;
    }, [menus, location, menuUrlMap]);

    return (
        <AdminWrapper
            isLoadingMenu={status === 'pending'}
            isLoadingPreferences={prefStatus === 'pending'}
            {...{ menus, preferences, pageTitle }}
        >
            {children}
        </AdminWrapper>
    );
};

export default AdminProvider;
