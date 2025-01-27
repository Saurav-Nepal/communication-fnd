import { useMemo } from 'react';

import { Header, ThemeSwitcher, useSlabTheme } from '@slabs/ds-core';
import { useBoolean } from '@slabs/ds-hooks';
import { capitalize, cn } from '@slabs/ds-utils';

import themesConstants from '@/constants/themes.constants';
import useUser from '@/hooks/useUser.hook';
import { communicationWrapperProps } from '@/types';
import { Navigation } from '@/utils/navigation.utils';
import { GetUserDetail, Logout } from '@/utils/user.utils';

import { DashboardLoader } from '../loader/dashboardLoader.component';
import Sidebar from '../sidebar/sidebar';
import SpotlightSearch from '../spotlightSearch/spotlightSearch';

const AdminWrapper = ({
    children,
    menus,
    isLoadingMenu,
    pageTitle,
}: communicationWrapperProps) => {
    const { setTheme } = useSlabTheme();
    const { user: currentUser } = useUser();

    const user = useMemo(() => {
        if (!currentUser) return undefined;
        return GetUserDetail(currentUser);
    }, [currentUser]);

    const [sideNavExpanded, setSideNavExpanded] = useBoolean(false);

    const logout = () => {
        Logout();
        Navigation.navigate({ url: '/login' });
    };

    return (
        <div className='communication-root'>
            <title>{pageTitle}</title>
            {!isLoadingMenu ? (
                <div className='h-screen app-container'>
                    <div className='min-h-full page-container'>
                        <Sidebar
                            menus={menus}
                            user={currentUser}
                            isSidebarExpanded={sideNavExpanded}
                            setIsSidebarExpanded={setSideNavExpanded}
                        />
                        <main
                            className={cn(
                                'pb-10 h-screen landing-wrapper ml-sidebar-width'
                            )}
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
                                                    name: capitalize(themeKey),
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
                            {children}
                        </main>
                    </div>
                </div>
            ) : (
                <DashboardLoader />
            )}
        </div>
    );
};

export { AdminWrapper };
