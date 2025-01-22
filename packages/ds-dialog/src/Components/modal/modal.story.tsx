import React, { useEffect } from 'react';

import { Button, Typography } from '@slabs/ds-core';

import type { Meta } from '@storybook/react';

import { Modal } from '../../utils';
import {
    ModalBody,
    ModalContainer,
    ModalFooter,
    ModalTitle,
} from './modal.container';
import { ModalWrapper } from './modalwrapper';

let globalModalRef: any;

const InnerModal = () => {
    return (
        <ModalContainer>
            <ModalTitle title='Modal Title' subtitle='Modal Subtitle' />
            <ModalBody>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus, sunt!
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus, sunt!
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus, sunt!
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus, sunt!
                </Typography>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        Modal.close();
                    }}
                >
                    Close
                </Button>
            </ModalFooter>
        </ModalContainer>
    );
};

const ShowModal = () => {
    useEffect(() => {
        Modal.register(globalModalRef);
    }, []);
    const openModal = () => {
        Modal.open({
            component: InnerModal,
            modalSize: 'md',
            closable: true,
        });
    };
    return (
        <div>
            <ModalWrapper
                ref={(ref) => {
                    globalModalRef = ref;
                }}
            />

            <Button onClick={openModal}>Open Modal</Button>
        </div>
    );
};

const meta: Meta<typeof ShowModal> = {
    title: 'Component/Modal',
    component: ShowModal,
    tags: ['autodocs'],
};

export const Normal = {};
export default meta;
