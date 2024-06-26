import { useEffectOnce } from 'react-use';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import { MetaBusinessController } from '../../backend/meta/controllers/meta.business.controller';
import { SortArrayObjectBy } from '../../Utils/common.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../../Utils/stateManager.utils';
import { FetchData } from '../useFetchData.hook';
import { useUserHook } from '../user.hook';

const REFETCH_BUSINESS_LIST = 'REFETCH_BUSINESS_LIST';

export const useAppBusinesses = () => {
    const { user } = useUserHook();
    const { meta_business_id } = user;

    const { data: businesses = [], refetch: fetchBusinesses } = useQuery<any[]>(
        {
            queryKey: ['app_businesses', meta_business_id],
            // enabled: !!meta_business_id,
            staleTime: 10 * 60 * 1000, // 10 mins
            cacheTime: 15 * 60 * 1000, // 15 mins
            queryFn: async () => {
                const { success, response } = await FetchData({
                    className: MetaBusinessController,
                    method: 'list',
                });

                if (!success) return [];
                return SortArrayObjectBy(response, 'id');
            },
        }
    );

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: REFETCH_BUSINESS_LIST,
            callback: fetchBusinesses,
        });
        return () => {
            UnsubscribeEvent({
                eventName: REFETCH_BUSINESS_LIST,
                callback: fetchBusinesses,
            });
        };
    });

    return { businesses, invitations: (user as ObjectDto)?.invitations || [] };
};
export const fetchBusinesses = () => {
    StoreEvent({
        eventName: REFETCH_BUSINESS_LIST,
    });
};
