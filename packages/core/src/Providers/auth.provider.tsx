import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { IsEmptyArray } from '@finnoto/design-system';

import { ObjectDto } from '../backend/Dtos';
import { MenuController } from '../backend/meta/controllers/menu.controller';
import { MetaBusinessController } from '../backend/meta/controllers/meta.business.controller';
import { PublicRoutes, USER } from '../Constants';
import { useOpenProperties } from '../Hooks';
import { useApp } from '../Hooks/useApp.hook';
import { FetchData } from '../Hooks/useFetchData.hook';
import { useInterval } from '../Hooks/useInterval.hook';
import { useMenu } from '../Hooks/useMenu.hook';
import { useUserHook } from '../Hooks/user.hook';
import { user, USER_DATA } from '../Models';
import { Authentication } from '../Utils/authentication';
import { IsObjectHaveKeys } from '../Utils/common.utils';
import { ExpenseRouteUtils } from '../Utils/expenseRoute.utils';
import { authenticateBusiness } from '../Utils/login.utils';
import { Navigation } from '../Utils/navigation.utils';
import {
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../Utils/stateManager.utils';
import {
    AdminWrapper,
    ArcAdminWrapper,
    ExpenseWrappers,
    PageLoader,
} from '../Utils/ui.utils';

export const AuthProvider = ({ children }: any) => {
    const { isReady, pathname, asPath } = useRouter();

    const [loading, setLoading] = useState(true);
    const [isLoadingMenuDetail, setIsLoadingMenuDetail] = useState(true);

    const { user: userObj } = useUserHook();
    const {
        isArc,
        isExpense,
        expenseType,
        menuDetails,
        basePath,
        setMenuDetails,
    } = useApp();
    const { isLoading: isMenuLoading, original: modules } = useMenu();
    const [validateProductInterval = 60 * 1000] = useOpenProperties<number>(
        'validate.product.interval'
    );

    const validateProduct = useCallback(
        ({
            business_id,
            product_id,
        }: {
            business_id: number;
            product_id: number;
        }) => {
            if (!business_id || !product_id) return;
            FetchData({
                className: MetaBusinessController,
                method: 'validateProduct',
                methodParams: {
                    businessId: business_id,
                    productId: product_id,
                },
            }).then(async ({ success }) => {
                if (success) return;
                let referrer = Navigation.currentRoute()?.path;

                if (isPublicRoute(referrer)) referrer = undefined;

                stopProductValidation();
                await Authentication.logout();
                Navigation.navigate({
                    url: PublicRoutes.LOGIN_ROUTE,
                    queryParam: { referrer },
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [asPath]
    );

    const { start: startProductValidation, stop: stopProductValidation } =
        useInterval(validateProduct, validateProductInterval);

    const removeProductValidation = (userObj: USER_DATA) => {
        if (!userObj.id && userObj.loginCheckDone) {
            stopProductValidation();
        }
    };

    const isPublicRoute = useCallback(
        (pathname) =>
            Object.values(PublicRoutes).some((route) =>
                pathname.startsWith(route)
            ),
        []
    );

    // const alertMenuNotAllowed = () => {
    //     AlertUtil({
    //         title: 'Error',
    //         message: 'This page is not allowed or disabled! Redirecting to home page.',
    //         onOkPress: () => Navigation.navigate({ url: ResolveNavigationRoute('/') }),
    //     });
    // };

    const getMenuId = useCallback(() => {
        let path: any = {};

        console.log({ modules });

        modules.forEach((module: ObjectDto) => {
            if (path?.id) return;
            path = module.menus?.find(
                (subMenu: ObjectDto) =>
                    subMenu.path === pathname && subMenu.active !== false
            );
        });

        if (path?.id) return path?.id;

        // alertMenuNotAllowed();
        return null;
    }, [modules, pathname]);

    const loadMenuDetails = async (menu_id: number) => {
        setIsLoadingMenuDetail(true);
        const { success, response } = await FetchData({
            className: MenuController,
            method: 'show',
            methodParams: menu_id,
        });

        if (success) {
            setMenuDetails(response);
        } else {
            setMenuDetails(null);
        }

        setIsLoadingMenuDetail(false);
    };

    const checkIsSameMenu = useCallback(
        (menu_id: number) => {
            const menuId = getMenuId();
            if (menuId === menu_id) return true;
            return false;
        },
        [getMenuId]
    );

    const checkProductMismatch = useCallback(
        async (business: USER_DATA['business'], product_id: number) => {
            const { success, response } = await FetchData({
                className: MetaBusinessController,
                method: 'getProducts',
                methodParams: business.meta_server_id,
            });

            if (!success) return false;
            if (IsEmptyArray(response)) return false;

            if (response.some((product: any) => product.id === product_id)) {
                await authenticateBusiness(business, {
                    product: { id: product_id },
                    referrer: asPath,
                });
                return true;
            }

            return false;
        },
        [asPath]
    );

    useEffect(() => {
        if (!isReady) return;

        const userObj = user.getUserData();

        if (!PublicRoutes.IGNORE_AUTH_ROUTES.includes(pathname)) {
            setLoading(true);
            if (userObj?.loginCheckDone) {
                return setLoading(false);
            }

            Authentication.loginCheck(true).then(async (data) => {
                if (
                    !isPublicRoute(pathname) &&
                    (!data || !data?.id || !(data.business || data.vendor))
                ) {
                    Navigation.navigate({
                        url: PublicRoutes.LOGIN_ROUTE,
                        queryParam: { referrer: asPath },
                    });
                }

                if (!isPublicRoute(pathname) && data) {
                    startProductValidation({
                        business_id: data.meta_business_id,
                        product_id: data.auth_attributes?.product_id,
                    });

                    const pathProductId =
                        ExpenseRouteUtils.GetPortalTypeId(pathname);

                    if (data.auth_attributes?.product_id !== pathProductId) {
                        if (
                            await checkProductMismatch(
                                data.business,
                                pathProductId
                            )
                        )
                            return;
                    }

                    ExpenseRouteUtils.fixPortalPath(
                        data.auth_attributes?.product_id,
                        pathname
                    );
                }

                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPublicRoute, pathname, asPath, isReady]);

    useEffect(() => {
        if (!(isPublicRoute(pathname) || isMenuLoading || loading)) {
            setIsLoadingMenuDetail(true);

            const menu_id = getMenuId();

            console.log({ menu_id });

            if (menu_id) {
                loadMenuDetails(menu_id);
            } else {
                setIsLoadingMenuDetail(false);
                setMenuDetails(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isMenuLoading, modules, isPublicRoute, getMenuId, loading]);

    useEffect(() => {
        SubscribeToEvent({
            eventName: USER,
            callback: removeProductValidation,
        });
        return () => {
            UnsubscribeEvent({
                eventName: USER,
                callback: removeProductValidation,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isPublicRoute(pathname)) {
        if (!userObj.loginCheckDone || !userObj.id || loading) {
            return <PageLoader />;
        }

        const dashboardChildren =
            !!menuDetails && children ? (
                React.cloneElement(children as any, {
                    menu: checkIsSameMenu(menuDetails.id) ? menuDetails : null,
                })
            ) : (
                <div /> // TO-DO: Add error page for page not found!
            );

        if (isExpense && IsObjectHaveKeys(ExpenseWrappers) && expenseType) {
            const ExpenseWrapper = ExpenseWrappers[expenseType];

            if (ExpenseWrapper) {
                return <ExpenseWrapper>{dashboardChildren}</ExpenseWrapper>;
            }
        }

        if (isArc && ArcAdminWrapper) {
            return <ArcAdminWrapper>{dashboardChildren}</ArcAdminWrapper>;
        }

        return <AdminWrapper>{dashboardChildren}</AdminWrapper>;
    }

    return children;
};
