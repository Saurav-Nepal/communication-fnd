import { useEffect, useMemo, useState } from 'react';

import {
    Header,
    RightClick,
    ThemeSwitcher,
    useSlabTheme,
} from '@slabs/ds-core';
import { useBoolean } from '@slabs/ds-hooks';
import { capitalize, cn, isEmptyObject } from '@slabs/ds-utils';

import { RIGHT_CLICK_DATA } from '@/constants/state.constants';
import themesConstants from '@/constants/themes.constants';
import useUser from '@/hooks/useUser.hook';
import { AdminWrapperProps } from '@/types';
import { Navigation } from '@/utils/navigation.utils';
import { SubscribeToEvent, UnsubscribeEvent } from '@/utils/stateManager.utils';
import { GetUserDetail, Logout } from '@/utils/user.utils';

import { DashboardLoader } from '../loader/dashboardLoader.component';
import Sidebar from '../sidebar/sidebar';
import SpotlightSearch from '../spotlightSearch/spotlightSearch';

const AdminWrapper = ({
    children,
    menus,
    isLoadingMenu,
    isLoadingPreferences,
    preferences,
    pageTitle,
}: AdminWrapperProps) => {
    const { setTheme } = useSlabTheme();
    const { user: currentUser } = useUser();
    const user = useMemo(() => {
        if (!currentUser) return undefined;
        return GetUserDetail(currentUser);
    }, [currentUser]);

    const [sideNavExpanded, setSideNavExpanded] = useBoolean(false);

    const [menuDetails, setMenuDetails] = useState<any>();

    useEffect(() => {
        SubscribeToEvent({
            eventName: RIGHT_CLICK_DATA,
            callback: setMenuDetails,
        });

        return () => {
            UnsubscribeEvent({
                eventName: RIGHT_CLICK_DATA,
                callback: setMenuDetails,
            });
        };
    }, []);

    const rowOptions = [
        {
            key: 'redirect-menu',
            name: 'Redirect Menu Detail',
            icon: 'fa-deaf',
            onClick: (_, e) => {
                const pageUrl = '/menu/' + menuDetails?.menuData.menuId;
                Navigation.navigate({ url: pageUrl }, e);
            },
        },
        {
            key: 'redirect-model',
            name: 'Redirect Model Detail',
            icon: 'fa-info-circle',
            onClick: (_, e) => {
                const pageUrl =
                    '/model/' +
                    (menuDetails?.menuData.model
                        ? menuDetails?.menuData.model.id
                        : menuDetails?.menuData.modelId);
                Navigation.navigate({ url: pageUrl }, e);
            },
        },
    ];

    /**
     * @param  {object} spotlight
     * @param  {} =>update the short keys of setting page
     */
    // const updateKey = (pref: any) => {
    //     if (pref) {
    //         const keys = pref.value.map((key) => key.key).join('+');
    //         const mapping = { ...keyMap };
    //         mapping[pref.parameter] = keys;
    //         setKeyMap(mapping);
    //     }
    // };

    // useEffect(() => {
    //     const shortCut = GetSettings(['spotLight']);
    //     if (IsEmptyArray(shortCut)) return;

    //     shortCut.forEach((pref) => {
    //         updateKey(pref);
    //     });
    // }, [preferences]);

    const logout = () => {
        Logout();
        Navigation.navigate({ url: '/login' });
    };

    return (
        <div className='admin-root'>
            <title>{pageTitle}</title>
            {!isLoadingMenu && !isLoadingPreferences ? (
                <div className='flex flex-col min-h-screen app-container'>
                    <div className='page-container'>
                        <Sidebar
                            menus={menus}
                            user={currentUser}
                            isSidebarExpanded={sideNavExpanded}
                            setIsSidebarExpanded={setSideNavExpanded}
                        />
                        <main
                            className={cn(
                                'pb-10 h-full landing-wrapper ml-sidebar-width'
                            )}
                        >
                            <RightClick
                                actions={rowOptions}
                                disabled={
                                    isEmptyObject(menuDetails) ||
                                    !user?.hasRole('developer')
                                }
                            >
                                <Header
                                    isCollapsed={sideNavExpanded}
                                    setIsCollapsed={setSideNavExpanded}
                                    user={{
                                        subtitle: user?.email ?? '',
                                        title: user?.name ?? '',
                                        actions: [
                                            {
                                                name: 'Theme',
                                                key: 'theme',
                                                subMenuActions: [
                                                    {
                                                        key: 'base',
                                                        name: 'Default',
                                                        action: () =>
                                                            setTheme('base'),
                                                    },
                                                    ...Object.keys(
                                                        themesConstants
                                                    ).map((themeKey) => ({
                                                        key: themeKey,
                                                        name: capitalize(
                                                            themeKey
                                                        ),
                                                        action: () =>
                                                            setTheme(themeKey),
                                                    })),
                                                ],
                                            },
                                            {
                                                name: 'Logout',
                                                isCancel: true,
                                                key: 'logout',
                                                action: logout,
                                            },
                                        ],
                                    }}
                                    leftComponent={
                                        <SpotlightSearch menus={menus} />
                                    }
                                    rightComponent={<ThemeSwitcher />}
                                    className='dark:bg-neutral'
                                    sticky
                                />
                            </RightClick>
                            {children}
                        </main>
                    </div>
                </div>
            ) : (
                <DashboardLoader />
            )}

            {/* {!isLoadingMenu && !isLoadingPreferences ? (
                <SpotlightSearch
                    menus={menus?.modules}
                    queries={['menus', 'models']}
                />
            ) : null} */}
        </div>
    );
};

export { AdminWrapper };
