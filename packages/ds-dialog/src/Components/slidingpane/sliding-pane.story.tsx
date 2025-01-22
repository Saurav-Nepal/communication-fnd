import React, { useEffect } from 'react';

import { Button } from '@slabs/ds-core';

import type { Meta } from '@storybook/react';

import { Modal } from '../../utils';
import { ModalBody, ModalContainer } from '../modal/modal.container';
import { SlidingPaneWrapper } from './slidingpanewrapper';

let globalModalRef: any;

const InnerModal = () => {
    return (
        <ModalContainer>
            <ModalBody>
                <p>Content</p>
            </ModalBody>
        </ModalContainer>
    );
};
/**
 * @description Upload the file and see the image cropper
 *
 *
 */

const ShowModal = () => {
    useEffect(() => {
        Modal.register(globalModalRef);
    }, []);
    const handleFileUpload = () => {
        Modal.open({
            component: InnerModal,
            modalSize: 'md',
            closable: true,
            // modalSize: 'lg',
        });
    };
    return (
        <div>
            <SlidingPaneWrapper
                ref={(ref) => {
                    globalModalRef = ref;
                }}
            />

            <Button onClick={handleFileUpload}>Click Me</Button>
        </div>
    );
};

const meta: Meta<typeof ShowModal> = {
    title: 'Component/SlidingPane',
    component: ShowModal,
    tags: ['autodocs'],
};

export const Normal = {};
export default meta;
