import { useEffect } from 'react';

import { GetMenuDetailEndPoint } from '@/constants/api.constants';
import { GLOBAL } from '@/constants/global.constants';
import {
    REFRESH_MENU_DETAIL,
    RIGHT_CLICK_DATA,
    SHOW_MENU_NAME,
} from '@/constants/state.constants';
import { Get } from '@/services';
import { ConvertMenuDetailForGenericPage } from '@/utils/assistGeneric.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@/utils/stateManager.utils';
import { useQuery } from '@tanstack/react-query';

const useMenuDetail = (menuId: number) => {
    const {
        data: menuDetail,
        isPending,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ['menu_detail', menuId],
        retry: 2,
        queryFn: () => fetchMenuDetails(),
    });

    useEffect(() => {
        SubscribeToEvent({
            eventName: REFRESH_MENU_DETAIL,
            callback: refetch,
        });
        return () => {
            UnsubscribeEvent({
                eventName: REFRESH_MENU_DETAIL,
                callback: refetch,
            });
        };
    }, []);

    const getMenuDetail = async (menuId: number) => {
        const url = GetMenuDetailEndPoint + menuId;

        const { success, response } = await Get({
            url,
            urlPrefix: GLOBAL.API_HOST,
        });

        if (success) {
            return response;
        }
        return null;
    };

    const fetchMenuDetails = async () => {
        const response = await getMenuDetail(menuId);

        if (!response) return null;

        const menuDetail = ConvertMenuDetailForGenericPage(response);

        if (menuDetail.pageName) {
            StoreEvent({
                eventName: SHOW_MENU_NAME,
                data: { menuName: menuDetail.pageName },
            });
            // SKAnalytics.registerEvent(menuDetail.pageName, {
            //     page_url: page_url,
            // });
        }

        StoreEvent({
            eventName: RIGHT_CLICK_DATA,
            data: { menuData: menuDetail },
        });

        return menuDetail;
    };

    return {
        menuDetail,
        isLoading: isPending,
        isError,
        isSuccess,
    };
};

export { useMenuDetail };
