import { isValidString } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { HOME_ROUTE } from '@/constants/routeName.constants';
import { Authentication, Post } from '@/services';
import { Navigation } from '@/utils/navigation.utils';
import { Toast } from '@/utils/toast.utils';
import { StoreUserToken } from '@/utils/user.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useLogin = () => {
    const queryClient = useQueryClient();

    const {
        status,
        isPending,
        isSuccess,
        mutateAsync: login,
    } = useMutation({
        networkMode: 'always',
        mutationFn: (data) => {
            if (!isValidString(GLOBAL.ROUTE_URL)) {
                return Promise.resolve({
                    success: false,
                    response: 'No Backend URL Set!',
                } as any);
            }

            return Post({
                url: 'user-auth/login',
                urlPrefix: GLOBAL.ROUTE_URL,
                data,
            });
        },
        onSuccess: (data) => {
            const { success, response, status } = data;

            if (success) {
                StoreUserToken(response);
                queryClient.invalidateQueries({ queryKey: ['auth_user'] });
                Navigation.navigate({ url: HOME_ROUTE });
                return;
            }

            if (status === 403) {
                Toast.error({
                    title: 'Error',
                    description: 'Please Enter A Valid Email and Password.',
                });
                return;
            }

            Toast.error({
                title: 'Error',
                description: response,
            });
        },
    });

    return { login, status, isLoading: isPending, isSuccess };
};

const useAuth = () => {
    const {
        data: user,
        isFetching,
        isLoading,
    } = useQuery({
        enabled: Authentication.fetchAccessToken() !== null,
        queryKey: ['auth_user'],
        retry: 1,
        initialData: {},
        queryFn: Authentication.loginCheck,
    });

    return { user, loading: isFetching || isLoading };
};

export { useAuth, useLogin };
