import { ReactNode } from 'react';
import { useLocation } from 'react-use';

import { GLOBAL } from '@/constants/global.constants';
import useUser from '@/hooks/useUser.hook';
import { useQuery } from '@tanstack/react-query';

import { GetMenusEndPoint } from '../../constants/api.constants';
import { Get } from '../../services';
import { AdminWrapper } from '../adminWrapper/adminWrapper.component';

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const { user } = useUser();

    const { data: menus, status } = useQuery({
        queryKey: ['menu'],
        retry: 2,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        enabled: !!user?.id,
        queryFn: async () => {
            const { success, response } = await Get({
                urlPrefix: GLOBAL.API_HOST,
                url: GetMenusEndPoint,
            });

            if (!success) return;

            return response;
        },
    });

    console.log(menus);

    return (
        <AdminWrapper
            isLoadingMenu={status === 'pending'}
            {...{ menus, pageTitle: 'Communication' }}
        >
            {children}
        </AdminWrapper>
    );
};

export default AdminProvider;
