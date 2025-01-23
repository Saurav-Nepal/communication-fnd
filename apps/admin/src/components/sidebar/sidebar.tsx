import { useMemo } from 'react';
import Link from 'next/link';

import {
    Sidebar as DsSidebar,
    MainMenu,
    MainMenuItem,
    MainMenuTopList,
    MenuItemType,
    SingleSubmenuItem,
    SubMenu,
    SubmenuFooter,
    SubmenuItemType,
    SubMenuList,
    SubMenuTitle,
} from '@slabs/ds-core';
import { cn, isEmptyArray } from '@slabs/ds-utils';

import { communicationWrapperProps, USER_TYPE } from '@/types';
import { Navigation } from '@/utils/navigation.utils';
import { Logout } from '@/utils/user.utils';

const Sidebar = ({
    menus,
    isSidebarExpanded,
    setIsSidebarExpanded,
    user,
}: {
    menus: communicationWrapperProps['menus'];
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: (val: boolean) => void;
    user: USER_TYPE | undefined;
}) => {
    const sidebarMenus = useMemo((): MenuItemType[] => {
        return (
            (menus?.modules
                ?.map((module) => {
                    if (isEmptyArray(module.menus)) return;
                    return {
                        title: module.name,
                        icon: () => <i className={cn('fa', module.image)} />,
                        href: module?.menus?.[0]?.path,
                        menus: module.menus
                            ?.map((menu) => {
                                if (!menu.visibility) return;
                                return {
                                    title: menu.name,
                                    href: `/${menu.path}`,
                                    // icon: () => <i className={cn('fa', menu.image ?? '')} />,
                                };
                            })
                            .filter(Boolean) as SubmenuItemType[],
                    };
                })
                .filter(Boolean) as MenuItemType[]) ?? []
        );
    }, [menus]);

    const logout = () => {
        Logout();
        Navigation.navigate({ url: '/login' });
    };

    return (
        <DsSidebar
            setIsOpen={setIsSidebarExpanded}
            isOpen={isSidebarExpanded}
            menus={sidebarMenus}
        >
            <MainMenu borderType='solid'>
                <div className='flex justify-center items-center px-3'>
                    <img
                        src='https://finnoto.com/SVGs/logo.svg'
                        alt='logo'
                        className='w-8 h-8'
                    />
                </div>
                <MainMenuTopList>
                    {sidebarMenus.map((menu) => (
                        <Link href={menu.href ?? ''}>
                            <MainMenuItem {...menu} key={menu.title} />
                        </Link>
                    ))}
                </MainMenuTopList>
            </MainMenu>
            <SubMenu>
                <SubMenuTitle />
                <SubMenuList className='gap-1 px-2.5'>
                    {(activeMenu) => {
                        return activeMenu?.menus?.map((menu) => (
                            <Link href={menu.href ?? ''}>
                                <SingleSubmenuItem
                                    {...menu}
                                    key={menu.title}
                                    className='px-2 py-2'
                                />
                            </Link>
                        ));
                    }}
                </SubMenuList>
                <SubmenuFooter
                    action={logout}
                    title={user?.name ?? ''}
                    subtitle={user?.email ?? ''}
                />
            </SubMenu>
        </DsSidebar>
    );
};

export default Sidebar;
