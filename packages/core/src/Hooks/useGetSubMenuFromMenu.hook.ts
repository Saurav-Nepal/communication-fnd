import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { GetObjectFromArray } from '../Utils/common.utils';
import { Menu } from '../Utils/menu.utils';
import { IsEmptyArray } from '@finnoto/design-system';

/**
 *
 * @description This will give you the sub menus from menu
 *
 * @param1 give the menu name from with you want to get sub menus
 *
 *
 * @returns {Array[]} Of Menus
 */
export const useGetSubMenuFromMenu = (name: string) => {
    const path = usePathname();

    const menus = useMemo(() => {
        const menus = Menu?.menus?.modules?.filter(
            (val) => val?.label === name
        );

        if (IsEmptyArray(menus)) return [];

        if (menus?.length > 1) {
            return GetObjectFromArray(menus, 'attributes.hide_submenu', true)
                .menus;
        }

        return menus[0].menus;
    }, [name]);
    const sanitizedMenu = useMemo(() => {
        return menus.filter((val) => val?.path !== path);
    }, [path, menus]);

    return {
        sanitizedMenu,
    };
};
