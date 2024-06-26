import {
    format,
    formatDistance,
    formatRelative,
    isThisWeek,
    isToday,
} from 'date-fns';
import { useCallback } from 'react';

import { IsUndefinedOrNull, Toast } from '@finnoto/design-system';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import UserNotificationController from '../../backend/common/controllers/user.notification.controller';
import { PRODUCT_IDENTIFIER } from '../../Constants';
import { openSourceDetails } from '../../Utils/source.function.utils';
import { useApp } from '../useApp.hook';
import { FetchData } from '../useFetchData.hook';

export const useHeaderNotificationMethods = (
    data?: any,
    callback?: () => void
) => {
    const id = data?.id;
    const { product_id } = useApp();
    const queryClient = useQueryClient();

    const getHeaderNotification = () => {
        queryClient.invalidateQueries({
            queryKey: ['header_notification', product_id],
        });

        callback?.();
    };

    const { mutate: setNotificationState } = useMutation({
        onSuccess: () => getHeaderNotification(),
        mutationKey: ['header_notification', 'archive_unarchive', product_id],
        mutationFn: async (type: 'archive' | 'unArchive') => {
            const loading = Toast.loading({
                description: ` ${
                    type === 'archive' ? 'archiving' : 'un-archiving'
                }...`,
                position: 'top-right',
            });

            const { success, response } = await FetchData({
                className: UserNotificationController,
                method: type,
                methodParams: +id,
                classParams: {
                    product_id,
                },
            });

            loading.hide();
            if (success) return response;
            return Promise.reject('Error');
        },
    });
    const { mutate: setAcknowledge } = useMutation({
        onSuccess: () => getHeaderNotification(),
        mutationKey: ['header_notification', 'acknowledge', product_id],
        mutationFn: async ({ unread = false }: { unread?: boolean }) => {
            const loading = Toast.loading({
                description: `Making messages ${unread ? 'unread' : 'read'}...`,
                position: 'top-right',
            });

            const { success, response } = await FetchData({
                className: UserNotificationController,
                method: unread ? 'removeAcknowledge' : 'acknowledge',
                methodParams: +id,
                classParams: {
                    product_id,
                },
            });

            loading.hide();

            if (success) return response;
            return Promise.reject('Error setting acknowledge');
        },
    });

    const { mutate: acknowledgeAll } = useMutation({
        onSuccess: () => getHeaderNotification(),
        mutationKey: ['header_notification', product_id, 'acknowledge_all'],
        mutationFn: async () => {
            const loading = Toast.loading({
                description: 'Making all messages read...',
                position: 'top-right',
            });

            const { success, response } = await FetchData({
                className: UserNotificationController,
                method: 'acknowledgeAll',
                classParams: {
                    product_id,
                },
            });
            loading.hide();

            if (success) return response;
            return Promise.reject('Error Checking the data');
        },
    });
    const { mutate: archiveAll } = useMutation({
        onSuccess: () => getHeaderNotification(),
        mutationKey: ['header_notification', product_id, 'archive_all'],
        mutationFn: async () => {
            const loading = Toast.loading({
                description: 'Archiving...',
                position: 'top-right',
            });

            const { success, response } = await FetchData({
                className: UserNotificationController,
                method: 'archiveAll',
                classParams: {
                    product_id,
                },
            });

            loading.hide();

            if (success) return response;
            return Promise.reject('Error Checking the data');
        },
    });

    const contextKey = data?.context && Object.keys(data?.context);
    const isRead = !IsUndefinedOrNull(data?.acknowledged_at);
    const isArchived = !IsUndefinedOrNull(data?.archived_at);

    const actions = [
        {
            name: 'Mark as unread',
            action: () => {
                setAcknowledge({ unread: true });
            },
            visible: isRead,
        },
        {
            name: 'Mark as Read',
            action: () => {
                setAcknowledge({ unread: false });
            },
            visible: !isRead,
        },
        {
            name: 'Archive',
            action: () => {
                setNotificationState('archive');
            },
            visible: !isArchived,
        },
        {
            name: 'Un Archive',
            action: () => {
                setNotificationState('unArchive');
            },
            visible: isArchived,
        },
    ];

    const formatDate = (date: any) => {
        if (isToday(new Date(date)))
            return formatDistance(new Date(date), new Date(), {});

        if (isThisWeek(new Date(date)))
            return formatRelative(new Date(date), new Date());

        return format(new Date(date), 'dd MMM yyyy');
    };

    const handleNavigation = useCallback(() => {
        setAcknowledge({ unread: false });

        openSourceDetails(data?.source_id, data?.source_type, true, {
            product_id: PRODUCT_IDENTIFIER.RECO,
        });
    }, [data?.source_id, data?.source_type, setAcknowledge]);

    return {
        setNotificationState,
        setAcknowledge,
        acknowledgeAll,
        archiveAll,
        contextKey,
        isRead,
        actions,
        formatDate,
        handleNavigation,
    };
};
