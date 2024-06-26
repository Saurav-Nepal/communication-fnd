import React, { createContext, useCallback, useMemo } from 'react';
import { useList } from 'react-use';
import { NotificationContextProps, NotificationData } from '../Types/app.types';
import { IndexOfObjectInArray } from '../Utils/common.utils';

/**
 * Notification Context.
 */
export const NotificationContext = createContext<NotificationContextProps>({
    notifications: [],
    setNotifications: () => {},
    addNotification: () => {},
    removeNotification: () => {},
});

export const NotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [notifications, { set: setNotifications, push, updateAt, removeAt }] =
        useList<NotificationData>([]);

    const addNotification = useCallback(
        (notification: NotificationData) => {
            const notificationIdx = IndexOfObjectInArray(
                notifications,
                'key',
                notification.key
            );

            if (notificationIdx > -1) {
                updateAt(notificationIdx, notification);
                return;
            }

            push(notification);
        },
        [notifications, push, updateAt]
    );

    const removeNotification = useCallback(
        (key: string | number) => {
            const notificationIdx = IndexOfObjectInArray(
                notifications,
                'key',
                key
            );

            if (notificationIdx > -1) {
                removeAt(notificationIdx);
            }
        },
        [notifications, removeAt]
    );

    const value = useMemo(
        () => ({
            notifications,
            setNotifications,
            addNotification,
            removeNotification,
        }),
        [notifications, addNotification, removeNotification, setNotifications]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
