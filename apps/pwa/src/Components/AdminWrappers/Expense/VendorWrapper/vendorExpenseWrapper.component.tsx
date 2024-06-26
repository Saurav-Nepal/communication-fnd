'use client';

import {
    AdminWrapperProps,
    CLIENT_INVITATION_DATA,
    GetItem,
    navigateToClientOnboarding,
    OPEN_ADD_CLIENT_ONBOARDING,
    PRODUCT_IDENTIFIER,
    StoreEvent,
    useApp,
    useNotifications,
} from '@finnoto/core';
import { cn } from '@finnoto/design-system';
import { useEffect } from 'react';

const VendorExpenseWrapper = ({ children }: AdminWrapperProps) => {
    const { product_id, showBottomNav } = useApp();
    const { addNotification } = useNotifications();

    useEffect(() => {
        if (product_id === PRODUCT_IDENTIFIER.VENDOR) {
            const clientData = GetItem(CLIENT_INVITATION_DATA);

            if (clientData && clientData?.client_id) {
                addNotification({
                    key: 'client_id',
                    title: (
                        <span>
                            Your client invitation is pending.{' '}
                            {clientData?.client_name ? (
                                <b>From {clientData?.client_name}.</b>
                            ) : null}
                        </span>
                    ),
                    type: 'warning',
                    data: clientData,
                    action: (notification) => {
                        const { data } = notification;
                        navigateToClientOnboarding(data);
                        StoreEvent({
                            eventName: OPEN_ADD_CLIENT_ONBOARDING,
                            data: { identifier: clientData?.client_id },
                            isTemp: true,
                        });
                    },
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_id]);

    return (
        <main className='dashboard'>
            <article
                className={cn('dashboard-content', {
                    'with-bottom-nav': showBottomNav,
                })}
            >
                {children}
            </article>
        </main>
    );
};

export default VendorExpenseWrapper;
