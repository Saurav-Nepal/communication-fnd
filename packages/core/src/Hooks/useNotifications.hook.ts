import { NotificationContext } from '../Providers/notification.provider';
import { NotificationContextProps } from '../Types/app.types';
import { useContext } from 'react';

export const useNotifications = () => {
    const notification =
        useContext<NotificationContextProps>(NotificationContext);
    return notification;
};
