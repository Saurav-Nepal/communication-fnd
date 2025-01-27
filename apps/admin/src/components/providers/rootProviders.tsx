'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import * as StateManagerUtility from 'state-manager-utility';
import * as StorageUtility from 'storage-utility';

import { SlabProvider } from '@slabs/ds-core';
import { Modal, ModalWrapper } from '@slabs/ds-dialog';

import themesConstants from '@/constants/themes.constants';
import { queryClient } from '@/lib/react-query';
import { InitializeStorageUtility } from '@/utils/localStorage.utils';
import { Navigation } from '@/utils/navigation.utils';
import { InitializeStateManager } from '@/utils/stateManager.utils';
import { QueryClientProvider } from '@tanstack/react-query';

import { Toast } from '../../utils/toast.utils';
import AuthProvider from './auth.provider';

let globalModalRef: any;

const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const navigationRef = useRouter();

    Navigation.register({
        ...navigationRef,
        navigate: (url: string) => navigationRef.push(url),
    });

    Modal.register(globalModalRef);
    Toast.register();

    InitializeStorageUtility(StorageUtility);
    InitializeStateManager(StateManagerUtility);

    return (
        <QueryClientProvider client={queryClient}>
            <SlabProvider themes={themesConstants}>
                <AuthProvider>
                    {children}
                    <ToastContainer />
                    <ModalWrapper
                        ref={(ref: any) => {
                            Modal.register(ref);
                        }}
                    />
                </AuthProvider>
            </SlabProvider>
        </QueryClientProvider>
    );
};

export default RootProvider;
