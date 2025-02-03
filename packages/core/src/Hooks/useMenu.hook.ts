import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Menu } from '../Utils/menu.utils';
import { useCurrentBusiness } from './useCurrentBusiness.hook';
import { useUserHook } from './user.hook';

export const useMenu = () => {
    const cacheTime = 20; // 20 mins
    const menu = new Menu();

    const { user } = useUserHook();
    const { currentBusiness = {} } = useCurrentBusiness();

    const product_id = useMemo(() => {
        return 1;
    }, []);

    const business_id = useMemo(() => {
        return currentBusiness?.identifier;
    }, [currentBusiness]);

    const {
        data = { modules: [], bottomModules: [], original: [] },
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['menus', 1, business_id],
        enabled: !!product_id,
        staleTime: (cacheTime - 5) * 60 * 1000,
        cacheTime: cacheTime * 60 * 1000,
        retry: 2,
        queryFn: () => menu.init(1),
    });

    return { ...data, isLoading, refetchMenus: refetch };
};
