import { useQuery } from '@tanstack/react-query';

import { LoggedUtilityController } from '../backend/ap/utility/controllers/logged.utility.controller';
import { FetchData } from './useFetchData.hook';

export const useGetUserRoles = () => {
    const { data: userRolesList } = useQuery({
        queryKey: ['user_profile', 'user_role'],
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: LoggedUtilityController,
                method: 'getProductRoles',
            });

            if (success) {
                return response;
            }
            return [];
        },
    });
    return { userRolesList };
};
