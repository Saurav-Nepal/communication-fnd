import { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { isEmptyObject, isFunction } from '@slabs/ds-utils';

import { REFRESH_MENU_DETAIL } from '@/constants/state.constants';
import { queryClient } from '@/lib/react-query';
import { GENERIC_DETAIL_PROPS } from '@/types';
import { RemoveStarterFromThePath } from '@/utils/assistGeneric.utils';
import { GetDetailRecord } from '@/utils/genericDetail.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@/utils/stateManager.utils';
import { useQuery } from '@tanstack/react-query';

import { useFetchParams } from './useFetchParams.hook';
import useUser from './useUser.hook';

export const useGenericDetail = ({ menuDetail }: GENERIC_DETAIL_PROPS) => {
    const [parentData, setParentData] = useState<any>();
    const { queryString } = useFetchParams();

    const { user: currentUser } = useUser();

    const queryKey = [
        'genericDetailData',
        menuDetail?.pageName,
        menuDetail?.url,
        menuDetail?.menuId,
        queryString?.all,
        {
            limit: queryString?.limit || 20,
            page: queryString?.page || 1,
        },
    ];

    const queryEnabled =
        !isEmptyObject(currentUser) && !isEmptyObject(menuDetail);

    const { data, isPending, isPlaceholderData, refetch } = useQuery<any>({
        placeholderData: {},
        queryKey,
        enabled: queryEnabled,
        queryFn: () => getDetailData(),
    });

    const getDetailData = async ({ withoutIdentifier = false } = {}) => {
        const response = await GetDetailRecord({
            configuration: menuDetail,
            data: {},
            urlParameter: { id: queryString?.all[1] },
            withoutIdentifier,
        });

        if (!response) return {};

        onDataFetched(response);
        return response;
    };

    const onDataFetched = ({ portlet }) => {
        const parentData: any = RemoveStarterFromThePath({
            data: portlet.data,
            starter: portlet.starter,
        });

        parentData.refreshContent = refetch;
        setParentData(parentData);

        const rightClickOptions = {
            modelId: portlet.model.id,
            menuId: menuDetail.menuId,
        };
        StoreEvent({
            eventName: 'rightClickData',
            data: { menuData: rightClickOptions },
        });
    };

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: REFRESH_MENU_DETAIL,
            callback: resetGenericDetail,
        });
        return () => {
            UnsubscribeEvent({
                eventName: REFRESH_MENU_DETAIL,
                callback: resetGenericDetail,
            });
        };
    });

    const resetGenericDetail = (e?: any) => {
        if (isFunction(e?.preventDefault)) e?.preventDefault();
        queryClient.invalidateQueries({ queryKey });
    };

    return {
        isLoading: isPending || isPlaceholderData,
        currentUser,
        parentData,
        portlet: data?.portlet,
        tabDetail: { ...(data?.tabDetail || {}), refreshContent: refetch },
        resetGenericDetail,
    };
};
