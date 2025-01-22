import { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { isEmptyObject, isFunction } from '@slabs/ds-utils';

import {
    LOGGED_USER,
    REFRESH_MENU_DETAIL,
    RIGHT_CLICK_DATA,
    TOGGLE_ADVANCED_FILTER,
} from '@/constants/state.constants';
import { queryClient } from '@/lib/react-query';
import { FIELD_COLUMN_TYPE, GENERIC_LISTING_PROPS, USER_TYPE } from '@/types';
import { GetListingRecord } from '@/utils/genericListing.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@/utils/stateManager.utils';
import { useQuery } from '@tanstack/react-query';

import { useFetchParams } from './useFetchParams.hook';

export const useGenericListing = ({
    parentData,
    menuDetail,
    genericData: propsGenericData,
    source,
    propageGenericDataToParent,
    index,
    level,
}: GENERIC_LISTING_PROPS) => {
    const isTab = source ? true : false;

    const [currentUser, setCurrentUser] = useState<USER_TYPE>();
    const { queryString } = useFetchParams();

    const queryKey = useMemo(
        () => [
            'genericListingData',
            menuDetail?.pageName,
            menuDetail?.url,
            menuDetail?.menuId,
            menuDetail?.includes,
            menuDetail?.restricted_query,
            parentData?.id,
            {
                limit: queryString?.limit || 20,
                page: queryString?.page || 1,
                search: queryString?.search,
                order: queryString?.order,
                sort: queryString?.sort,
                jsonquery: queryString?.jsonquery,
                grouping: queryString?.grouping,
            },
        ],
        [queryString, menuDetail, parentData]
    );

    const {
        data = {},
        isLoading,
        refetch,
    } = useQuery({
        initialData: propsGenericData,
        queryKey,
        enabled:
            !isEmptyObject(currentUser) &&
            !isEmptyObject(menuDetail) &&
            menuDetail?.menuId &&
            isEmptyObject(propsGenericData),
        queryFn: async () => {
            // Flag to identify that this is inside a grouped listing
            menuDetail.groupedListing = level ? true : false;

            const listingData = await getListingData();
            onDataFetched(listingData);

            return listingData;
        },
    });

    const getListingData = ({
        withoutIdentifier = false,
        exportVariable = false,
    } = {}) => {
        const { genericData } = data;
        return GetListingRecord({
            configuration: menuDetail,
            data: genericData || {},
            queryString,
            currentUser,
            isTab,
            withoutIdentifier,
            exportVariable,
            index: null,
        });
    };

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: LOGGED_USER,
            callback: onUserDataArrived,
        });
        SubscribeToEvent({
            eventName: REFRESH_MENU_DETAIL,
            callback: resetGenericListing,
        });
        return () => {
            UnsubscribeEvent({
                eventName: LOGGED_USER,
                callback: onUserDataArrived,
            });
            UnsubscribeEvent({
                eventName: REFRESH_MENU_DETAIL,
                callback: resetGenericListing,
            });
        };
    });

    const onUserDataArrived = (user: USER_TYPE) => {
        setCurrentUser(user);
    };

    const onDataFetched = ({ success, genericData, filterContent }: any) => {
        if (success && genericData) {
            if (isFunction(propageGenericDataToParent)) {
                genericData.filterContent = filterContent;
                propageGenericDataToParent(genericData, index);
            }
            if (!isTab) {
                StoreEvent({
                    eventName: RIGHT_CLICK_DATA,
                    data: { menuData: genericData },
                });
            }
        }
    };

    const toggleAdvancedFilter = (payload = {}, state?: boolean) => {
        StoreEvent({
            eventName: TOGGLE_ADVANCED_FILTER,
            data: { isAdvanceFilterExpand: state, ...payload },
            isTemp: true,
        });
    };

    const filterColumn = (column: FIELD_COLUMN_TYPE) => {
        let selected: string | undefined = undefined;

        if (column.path?.split('.').length == 2) {
            // for columns which is child of table itself
            selected = column.path;
        }

        toggleAdvancedFilter({ single: selected }, true);
    };

    const refreshGenericListing = (e?: any) => {
        if (isFunction(e?.preventDefault)) e?.preventDefault();
        refetch();
    };
    const resetGenericListing = (e?: any) => {
        if (isFunction(e?.preventDefault)) e?.preventDefault();
        queryClient.resetQueries({ queryKey });
    };

    const exportGenericListingTable = (e?: any) => {
        if (isFunction(e?.preventDefault)) e?.preventDefault();
        getListingData({ exportVariable: true });
    };

    return {
        isLoading,
        currentUser,
        genericData: data.genericData,
        filterContent: data.filterContent,
        getListingData,
        resetGenericListing,
        refreshGenericListing,
        exportGenericListingTable,
        toggleAdvancedFilter,
        filterColumn,
    };
};
