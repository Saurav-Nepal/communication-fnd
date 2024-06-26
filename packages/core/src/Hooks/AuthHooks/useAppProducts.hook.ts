import { useQuery } from '@tanstack/react-query';

import { MetaBusinessController } from '../../backend/meta/controllers/meta.business.controller';
import { ProductPayload } from '../../Types';
import { SortArrayObjectBy } from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';
import { useUserHook } from '../user.hook';

export const useAppProducts = () => {
    const { user } = useUserHook();
    const { meta_business_id } = user;

    const { data: products = [] } = useQuery<ProductPayload[]>({
        queryKey: ['app_products', meta_business_id],
        enabled: !!meta_business_id,
        staleTime: 10 * 60 * 1000, // 10 mins
        cacheTime: 15 * 60 * 1000, // 15 mins
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: MetaBusinessController,
                method: 'getProducts',
                methodParams: meta_business_id,
            });

            if (!success) return [];
            return SortArrayObjectBy(response, 'id');
        },
    });

    return { products };
};
