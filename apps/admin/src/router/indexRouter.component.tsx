'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { RouteProps, Router } from '@slabs/ds-next-router';
import { isEmptyArray } from '@slabs/ds-utils';

import PageNotFound from '@/components/errors/pageNotFound.component';
import { RECENT_STATE } from '@/constants/storage.constants';
import { MenuService } from '@/services';
import { GetItem, SetItem } from '@/utils/localStorage.utils';
import { GetScene } from '@/utils/scene.utils';

import MenuTemplate from '../components/adminWrapper/components/menuTemplate.component';

const IndexRouter = () => {
    const { modules = [] } = MenuService.menuList || {};

    const pathname = usePathname();

    /** set the value in array whatever search in spotlight as well as click in any action   */
    const setData = (location: any) => {
        const url = location.slice(1);

        /** add url variable in data which getting from searching url */
        const data = Object.assign({ url: url });

        // get the data from local storage
        const getData = GetItem(RECENT_STATE) || [];
        const searchMenu = getData.filter(
            (val: { url: string }) => val.url != data.url
        );

        searchMenu.unshift(data);

        // set the data in local storage
        SetItem(RECENT_STATE, searchMenu);
    };

    useEffect(() => {
        setData(pathname);
    }, [pathname]);

    const routes: RouteProps[] = useMemo(() => {
        return modules
            .flatMap((module) => {
                if (!isEmptyArray(module.menus)) {
                    return module.menus.map((menu) => {
                        if (!menu.component?.name) return null;
                        if (!GetScene(menu.component?.name)) return null;

                        return {
                            path: '/' + menu.url,
                            element: (
                                <MenuTemplate
                                    menuId={menu.id}
                                    componentName={menu.component.name}
                                />
                            ),
                        };
                    });
                }
            })
            .filter(Boolean) as RouteProps[];
    }, []);

    return (
        <Router
            routes={routes}
            pathname={pathname}
            pageNotFound={<PageNotFound />}
        />
    );
};

export { IndexRouter };
