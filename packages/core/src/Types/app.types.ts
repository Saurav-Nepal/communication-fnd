import { ReactNode } from 'react';

import { ObjectDto } from '../backend/Dtos';
import { PRODUCT_IDENTIFIER } from '../Constants/product.constant';

export interface AppState {
    isExpense: boolean;
    isArc: boolean;
    isSidebarExpand: boolean;
    isProductAvailable: boolean;
    isFormUpdated: boolean;
    isPublicSignedIn: boolean;
    basePath: string;
    expenseType: string | null;
    product_id: PRODUCT_IDENTIFIER | -1;
    menuDetails: ObjectDto | null;
    showBottomNav: boolean;
    setMenuDetails: (menuDetails: ObjectDto | null) => void;
    toggleSidebarExpand: (state?: boolean) => void;
    toggleBottomNav: (state?: boolean) => void;
    toggleFormUpdated: (state?: boolean) => void;
    setIsPublicSignedIn: (state?: boolean) => void;
}

export interface NotificationContextProps {
    notifications: NotificationData[];
    setNotifications: (notifications: NotificationData[]) => void;
    addNotification: (notification: NotificationData) => void;
    removeNotification: (key: string | number) => void;
}

export interface NotificationData {
    key: string | number;
    title: string | ReactNode;
    type?: 'info' | 'warning' | 'success' | 'error';
    icon?: any;
    message?: string | ReactNode;
    date_time?: Date | string;
    data?: any;
    action?: (notification: NotificationData) => void;
}
