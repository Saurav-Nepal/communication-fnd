import { useQuery } from '@tanstack/react-query';

import { MetaUserController } from '../../backend/meta/controllers/meta.user.controller';
import { FetchData } from '../useFetchData.hook';

export const useLoggedUserDetails = () => {
    const {
        isLoading: loading,
        data,
        isError,
        isSuccess: success,
    } = useQuery({
        queryKey: ['user_logged_details'],
        retry: 2,
        queryFn: () => {
            return FetchData({
                className: MetaUserController,
                method: 'getLoggedUserDetails',
            });
        },
        onSuccess: ({ response, success }) => {
            return response;
        },
    });

    const { response } = data || {};

    return { loading, error: isError, response, success };
};
