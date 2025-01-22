import { isEmptyArray, isEmptyObject } from '@slabs/ds-utils';

import { GetMenusEndPoint } from '@/constants/api.constants';
import { GLOBAL } from '@/constants/global.constants';
import { MENU_LIST } from '@/constants/storage.constants';
import { MenuSceneComponentProps, ModuleProps } from '@/types';
import { ArrayToObject } from '@/utils/common.utils';
import { StoreEvent } from '@/utils/stateManager.utils';

import { Get } from './api.service';

class MenuServiceClass {
    private readonly cache_time = 15;

    private static menuServiceInstance: MenuServiceClass;
    public menuList: {
        modules: ModuleProps[];
        pages: MenuSceneComponentProps[];
    } = { modules: [], pages: [] };

    static getInstance() {
        if (!this.menuServiceInstance) {
            this.menuServiceInstance = new MenuServiceClass();
        }
        return this.menuServiceInstance;
    }

    public initMenus = async (force = false) => {
        if (!this.menuList || isEmptyArray(this.menuList?.modules) || force) {
            this.menuList = await this._fetchMenus(force);
        }

        return this.menuList;
    };

    private _fetchMenus = async (force: boolean) => {
        // const localPages = await GetItemAsync(MENU_LIST);

        // if (localPages && !force) return localPages;

        // Network Fetch
        const { success, response: menus } = await Get({
            url: GetMenusEndPoint,
            urlPrefix: GLOBAL.API_HOST,
        });

        if (!success) return Promise.reject({ modules: [], pages: [] });

        // const packageMenus = this._process_package_menu(menus);
        const finalMenus = this._process(menus);

        StoreEvent({ eventName: MENU_LIST, data: finalMenus });
        return menus;
    };

    private _process = (menus: {
        modules: ModuleProps[];
        pages: MenuSceneComponentProps[];
    }) => {
        const { modules, pages } = menus || {};
        const pagesObj = ArrayToObject(pages, 'id');

        if (!modules || !Array.isArray(modules)) return { modules: [], pages };

        const activeModules = modules
            .map((module) => {
                if (isEmptyObject(module)) return;
                module.menus?.map((menu) => {
                    if (pagesObj[menu.page_id]) {
                        menu.component = pagesObj[menu.page_id];
                    }
                });

                return module;
            })
            .filter(Boolean) as ModuleProps[];

        return { modules: this._sort_display(activeModules), pages };
    };

    private _sort_display = <TProps extends ModuleProps>(list: TProps[]) => {
        if (!list || list.length == 0) return [];

        let newList = this._sort(list);
        return newList.map((item) => {
            if (!item.menus || item.menus.length === 0) return item;
            return {
                ...item,
                menus: this._sort(item.menus),
            };
        });
    };

    private _sort = <TProps>(list: TProps[]) => {
        if (!list || list.length == 0) return [];
        return list.sort((a: any, b: any) => a.display_order - b.display_order);
    };

    // private _process_package_menu = (menus: {
    //     modules: ModuleProps[];
    //     pages: any[];
    // }) => {
    //     if (packages.length === 0) return menus;

    //     const newMenus = { ...menus };
    //     packages.forEach((pkg) => {
    //         if (pkg.modules.length === 0) return;

    //         newMenus.modules.push(...pkg.modules);
    //     });

    //     packages.forEach((pkg) => {
    //         if (pkg.menus.length === 0) return;

    //         pkg.menus.forEach((menu) => {
    //             const moduleIndex = menus.modules.findIndex(
    //                 (module) =>
    //                     module.name?.toLowerCase() ===
    //                     menu.module?.toLowerCase()
    //             );

    //             newMenus.modules[moduleIndex].menus = [
    //                 ...(newMenus.modules[moduleIndex].menus || []),
    //                 menu,
    //             ];
    //         });
    //     });
    //     return newMenus;
    // };
}

export const MenuService = MenuServiceClass.getInstance();
