import React, { useCallback } from 'react';

import {
    GenericListingType,
    IsFunction,
    IsValidString,
    Navigation,
    ObjectDto,
    useCustomQueryDetail,
} from '@finnoto/core';
import {
    cn,
    IconButton,
    Modal,
    ModalBody,
    ModalContainer,
    PageLoader,
    Tooltip,
} from '@finnoto/design-system';
import { DialogTitle } from '@finnoto/design-system/src/Components/Dialogs/Base/dialog.core';

import { ExternalLinkSvgIcon } from 'assets';

export interface ArcGenericDetailModalProps {
    type?: GenericListingType;
    title: string | ((detail: ObjectDto) => string);
    detailUrl?: string;
    children?: React.ReactNode | ((data: ObjectDto) => React.ReactNode);
    method?: string;
    id: string;
    classParams?: ObjectDto;
    className?: string;
    noPadding?: boolean;
}

const ArcGenericDetailModal = (props: ArcGenericDetailModalProps) => {
    const {
        type,
        title,
        detailUrl,
        children,
        method = 'show',
        id,
        classParams,
        className,
        noPadding,
    } = props;

    const { data, isLoading } = useCustomQueryDetail({
        type,
        method,
        methodParams: id,
        disableNetwork: !type,
        classParams,
    });

    const getModalTitle = useCallback(() => {
        return (
            <div className='flex items-center gap-4'>
                <DialogTitle className='text-base text-base-content'>
                    {IsFunction(title) ? title(data) : title}
                </DialogTitle>
                {detailUrl && (
                    <Tooltip message='Details' asChild={false}>
                        <IconButton
                            icon={ExternalLinkSvgIcon}
                            appearance='primary'
                            outline
                            size='sm'
                            iconSize={16}
                            onClick={() => {
                                Modal.closeAll();
                                return Navigation.navigate({
                                    url: detailUrl,
                                });
                            }}
                        />
                    </Tooltip>
                )}
            </div>
        );
    }, [data, detailUrl, title]);

    return (
        <ModalContainer
            title={getModalTitle()}
            className={cn('max-h-[80vh]', className)}
        >
            <ModalBody
                className={cn('col-flex modal-background', {
                    'p-0': noPadding,
                })}
            >
                {type && isLoading ? (
                    <PageLoader />
                ) : IsFunction(children) ? (
                    children(data)
                ) : (
                    children
                )}
            </ModalBody>
        </ModalContainer>
    );
};

export default ArcGenericDetailModal;
