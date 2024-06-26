import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import UserNotificationController from '../../backend/common/controllers/user.notification.controller';
import { PRODUCT_IDENTIFIER } from '../../Constants';
import { useApp } from '../useApp.hook';
import { FetchData } from '../useFetchData.hook';

export const useHeaderNotification = ({
    isArchived = undefined,
}: {
    isArchived?: boolean | undefined;
}) => {
    const { product_id } = useApp();
    const isPayment = product_id === PRODUCT_IDENTIFIER.PAYMENT;

    const { data, isInitialLoading: notificationLoading } = useQuery({
        queryKey: ['header_notification', product_id, isArchived],
        refetchInterval: 20000, // Uses Short polling for the header notification
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: UserNotificationController,
                method: 'list',
                classParams: {
                    product_id: product_id,
                    limit: 7,
                    page: 1,
                    is_archived: isArchived,
                },
            });

            if (success) return response;
            throw Promise.reject('Error Fetching the data');
        },
        enabled: !!product_id && !isPayment,
    });

    const notificationData = useMemo(() => {
        return data?.records;
    }, [data?.records]);

    return {
        notificationData,
        notificationLoading,
        totalUnread: data?.metrics?.unread_count,
    };
};
