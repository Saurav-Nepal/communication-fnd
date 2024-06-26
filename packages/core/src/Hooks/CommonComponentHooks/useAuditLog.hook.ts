import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import { LISTING_CONTROLLER_ROUTER } from '../../Constants';
import { GenericListingType } from '../../Types';
import { IsObject } from '../../Utils/filter.utils';
import { FetchData } from '../useFetchData.hook';

export const useAuditLog = ({
    id,
    type,
    controller,
}: {
    id: number;
    type?: GenericListingType;
    controller?: any;
}) => {
    const className = controller || LISTING_CONTROLLER_ROUTER[type];

    const { data, isInitialLoading } = useQuery<ObjectDto[]>({
        queryKey: ['audit_log', type, id],
        enabled: !!id,
        queryFn: async () => {
            const { success, response } = await FetchData({
                className,
                method: 'getAuditLog',
                methodParams: id,
            });
            if (success) return response;
            return [];
            // return new Promise(async (resolve, reject) => {
            //     const { success, response } = await FetchData({
            //         className,
            //         method: 'getAuditLog',
            //         methodParams: id,
            //     });

            //     if (success) {
            //         resolve(response);
            //     } else {
            //         reject(new Error('Something is wrong'));
            //     }
            // });
        },
    });

    const auditTabs = useMemo(() => {
        if (!data || Array.isArray(data)) return null;
        if (!IsObject(data)) return null;

        return Object.keys(data);
    }, [data]);

    const auditData = useMemo(() => {
        if (!data) return [];

        return data;
    }, [data]);

    return { auditTabs, auditData, isInitialLoading };
};
