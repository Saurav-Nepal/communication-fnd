import { MenuController } from '../backend/meta/controllers/menu.controller';
import {
    ARC_HOME_ROUTE,
    DASHBOARD_ROUTE,
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE,
    FINOPS_EXPENSE_DASHBOARD_ROUTE,
    PAYMENT_HOME_ROUTE,
    PRODUCT_IDENTIFIER,
    PublicRoutes,
    VENDOR_EXPENSE_DASHBOARD_ROUTE,
} from '../Constants';
import { FetchData } from '../Hooks/useFetchData.hook';
import { IsEmptyArray } from './common.utils';
import { GetItemAsync, SetItem } from './localStorage.utils';
import { matchPath } from './matchPath.utils';

export class Menu {
    protected product_id: number;
    private static STORE: string = 'MENUS';

    public static menus: {
        modules: any[];
        bottomModules: any[];
        original: any[];
    } = { modules: [], bottomModules: [], original: [] };

    public init(product_id: number) {
        this.product_id = product_id;
        return this._fetchPages();
    }

    public static isMenuAvailable = (url: string) => {
        const { original: modules } = Menu.menus;
        if (IsEmptyArray(modules)) return true;

        if (Object.values(PublicRoutes).includes(url)) return true;

        return modules.some((module) => {
            return module.menus?.some((subMenu) => {
                if (!subMenu.path) return false;

                if (subMenu.path === url && subMenu.active !== false)
                    return true;

                const match = matchPath(subMenu.path, url);
                return match.matches;
            });
        });
    };

    private _fetchPages = async () => {
        if (this.product_id) {
            const product_id = this.product_id;

            async function callApi() {
                const { success, response } = await FetchData({
                    className: MenuController,
                    method: 'list',
                    attachSessionId: true,
                });

                if (!success)
                    return Promise.reject(
                        new Error(
                            response?.message ||
                                'Something went wrong while fetching menus!'
                        )
                    );

                SetItem(
                    Menu.STORE,
                    { modules: response.modules, product_id },
                    { span: 15 } // 15 mins
                );
                return response;
            }

            let data = await GetItemAsync(Menu.STORE);
            if (!data?.modules || data?.product_id !== product_id) {
                data = await callApi();
            }

            const sortedModules = this._sort_display(data.modules);
            const routePrefixedModules =
                this._product_url_prefixing(sortedModules);
            const categorizedModules =
                this._categorizeModules(routePrefixedModules);

            Menu.menus = categorizedModules;
            return categorizedModules;
        }

        return Promise.reject(new Error('No Product ID'));
    };

    private _sort_display = (list: any[]) => {
        if (!list || list.length == 0) return [];

        let newList = this._sort(list);
        newList = newList
            .map((item: any) => {
                if (!item.menus || item.menus.length === 0) return item;
                return {
                    ...item,
                    menus: this._sort(item.menus),
                };
            })
            .filter((item) => {
                if (['logout'].includes(item?.name?.toLowerCase())) return item;
                if (item.menus?.length !== 0) return item;
            });
        return newList;
    };

    private _sort = (list: any[]) => {
        if (!list || list.length == 0) return [];
        return list.sort(
            (a: any, b: any) => a?.display_order - b?.display_order
        );
    };

    private _product_url_prefixing = (list: any[]) => {
        const newList: any[] = [];
        list.forEach((item: any) => {
            const tempItem = { ...item };
            if (item.root_path) {
                tempItem.root_path = this._getBasePath() + tempItem.root_path;
                if (tempItem.root_path.endsWith('/')) {
                    tempItem.root_path = tempItem.root_path.slice(0, -1);
                }
            }

            if (item.path) {
                tempItem.path = this._getBasePath() + tempItem.path;

                if (tempItem.path.endsWith('/')) {
                    tempItem.path = tempItem.path.slice(0, -1);
                }
            }
            if (IsEmptyArray(item.menus)) {
                newList.push(tempItem);
                return;
            }

            newList.push({
                ...tempItem,
                menus: this._product_url_prefixing(item.menus),
            });
        });
        return newList;
    };

    private _categorizeModules = (list: any[]) => {
        const modules: any[] = [];
        const bottomModules: any[] = [];

        list.forEach((module) => {
            if (
                ['settings', 'logout'].includes(module.name.toLowerCase()) ||
                module.attributes?.isBottomMenu === true
            ) {
                const newModule = { ...module };

                bottomModules.push(newModule);
                return;
            }

            modules.push(module);
        });

        return { modules, bottomModules, original: list };
    };

    private _getBasePath = () => {
        switch (this.product_id) {
            case PRODUCT_IDENTIFIER.VENDOR:
                return VENDOR_EXPENSE_DASHBOARD_ROUTE;
            case PRODUCT_IDENTIFIER.EMPLOYEE:
                return EMPLOYEE_EXPENSE_DASHBOARD_ROUTE;
            case PRODUCT_IDENTIFIER.FINOPS:
                return FINOPS_EXPENSE_DASHBOARD_ROUTE;
            case PRODUCT_IDENTIFIER.ARC:
                return ARC_HOME_ROUTE;
            case PRODUCT_IDENTIFIER.PAYMENT:
                return PAYMENT_HOME_ROUTE;
            default:
                return '/' + DASHBOARD_ROUTE;
        }
    };
}
