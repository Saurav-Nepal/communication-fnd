import { useMemo, useState } from 'react';

import { useUncontrolled } from '@slabs/ds-hooks';
import { isUndefinedOrNull } from '@slabs/ds-utils';

import { SidebarReturnType, SidebarType } from './sidebar.types';
import { isLocationMatch } from './sidebar.utils';

const useSidebar = ({
    menus: topMenus,
    bottomMenus,
    isOpen,
    setIsOpen,
}: {
    menus: SidebarType['menus'];
    bottomMenus?: SidebarType['bottomMenus'];
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}): SidebarReturnType => {
    const pathName =
        // eslint-disable-next-line no-undef
        typeof window !== 'undefined' ? window.location.pathname : '';

    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

    const [isSidebarOpen, setIsSidebarOpen] = useUncontrolled({
        value: isOpen,
        onChange: setIsOpen,
        defaultValue: false,
    });

    const defaultActiveMenu = useMemo(() => {
        const menus = [...topMenus, ...(bottomMenus ?? [])];

        return menus.find((menu) => {
            if (menu.href) {
                return isLocationMatch(pathName, menu.href);
            }

            return menu.menus?.some((submenu) => {
                if (submenu.href) {
                    return isLocationMatch(pathName, submenu.href);
                }

                return submenu.menus?.some((nestedSubmenu) => {
                    if (nestedSubmenu.href)
                        return isLocationMatch(pathName, nestedSubmenu.href);

                    return nestedSubmenu.menus?.some((nestedSubmenu) => {
                        return isLocationMatch(pathName, nestedSubmenu.href);
                    });
                });
            });
        });
    }, [pathName, topMenus, bottomMenus]);

    const menus = useMemo(
        () => [...topMenus, ...(bottomMenus ?? [])],
        [topMenus, bottomMenus]
    );

    const activeMenu = useMemo(() => {
        if (!isUndefinedOrNull(activeMenuIndex)) return menus[activeMenuIndex];
        if (!isUndefinedOrNull(defaultActiveMenu)) return defaultActiveMenu;
        return undefined;
    }, [activeMenuIndex, menus, defaultActiveMenu]);

    const setActiveMenu = (title: string) => {
        const index = menus.findIndex((menu) => menu.title === title);
        setActiveMenuIndex(index);
    };

    return {
        activeMenu,
        setActiveMenu,
        isSidebarOpen,
        setIsSidebarOpen,
        pathName,
    };
};

export default useSidebar;
