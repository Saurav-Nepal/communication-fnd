'use client';

import { useEffect } from 'react';

import {
    CLIENT_INVITATION_DATA,
    GetItem,
    navigateToClientOnboarding,
    OPEN_ADD_CLIENT_ONBOARDING,
    PRODUCT_IDENTIFIER,
    StoreEvent,
    useApp,
    useMenu,
    useNotifications,
} from '@finnoto/core';
import { Sidebar } from '@finnoto/design-system';

import Header from '@Components/AdminWrappers/Components/header.component';
import { SpotlightSearch } from '@Components/Spotlight/spotlightSearch.component';

const VendorExpenseWrapper = ({ children }: any) => {
    const { modules, bottomModules } = useMenu();
    const { product_id } = useApp();
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
        <main className='dashboard expense-vendor'>
            <div className='relative flex-1 row-flex'>
                <Sidebar menus={modules} bottomMenus={bottomModules} />
                <article className='dashboard-content'>
                    <Header />
                    {children}
                </article>
            </div>
            <SpotlightSearch
                menus={[...modules, ...bottomModules]}
                queries={['gstin']}
            />
        </main>
    );
};

export default VendorExpenseWrapper;
