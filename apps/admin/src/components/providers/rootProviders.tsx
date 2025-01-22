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
import { GenericDetailScene } from '@/scenes/genericDetail/genericDetail.scene';
import { GenericListingScene } from '@/scenes/genericListing/genericListing.scenes';
import { InitializeStorageUtility } from '@/utils/localStorage.utils';
import { Navigation } from '@/utils/navigation.utils';
import { RegisterScene } from '@/utils/scene.utils';
import { InitializeStateManager } from '@/utils/stateManager.utils';
import { QueryClientProvider } from '@tanstack/react-query';

import AuthProvider from './auth.provider';

let globalModalRef: any;

const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const navigationRef = useRouter();

    Navigation.register(navigationRef);
    Modal.register(globalModalRef);

    InitializeStorageUtility(StorageUtility);
    InitializeStateManager(StateManagerUtility);

    RegisterScene('generic-list', GenericListingScene);
    RegisterScene('generic-detail', GenericDetailScene);

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
