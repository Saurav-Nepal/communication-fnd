import { useEffect } from 'react';

import {
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE,
    FINOPS_EXPENSE_DASHBOARD_ROUTE,
    HOME_ROUTE,
    PRODUCT_IDENTIFIER,
    VENDOR_EXPENSE_DASHBOARD_ROUTE,
} from '../Constants';
import { Navigation } from '../Utils/navigation.utils';
import { useUserHook } from './user.hook';

/**
 * Handle Logged in user.
 * Redirect user to homepage if logged in.
 *
 * Use in auth pages.
 */
export const useUserLoggedInHandler = () => {
    const { user } = useUserHook();

    useEffect(() => {
        if (
            user?.loginCheckDone &&
            user?.id &&
            (user?.business || user?.vendor)
        ) {
            const { auth_attributes } = user;
            switch (auth_attributes?.product_id) {
                case PRODUCT_IDENTIFIER.VENDOR:
                    return Navigation.navigate({
                        url: VENDOR_EXPENSE_DASHBOARD_ROUTE,
                    });
                case PRODUCT_IDENTIFIER.EMPLOYEE:
                    return Navigation.navigate({
                        url: EMPLOYEE_EXPENSE_DASHBOARD_ROUTE,
                    });
                case PRODUCT_IDENTIFIER.FINOPS:
                    return Navigation.navigate({
                        url: FINOPS_EXPENSE_DASHBOARD_ROUTE,
                    });
                default:
                    return Navigation.navigate({
                        url: HOME_ROUTE,
                    });
            }
        }
    }, [user]);
};
