'use client';

import { useMemo } from 'react';

import { useApp } from '@finnoto/core';

import { ConfirmUtil } from '../../../Utils/confirm.utils';
import { Modal } from '../../../Utils/modal.utils';
import { Dialog, DialogContent } from '../Base/dialog.core';
import { ModalProps } from './modal.types';

import { ErrorSvgIcon } from 'assets';

/**
 * Renders a modal with customizable size and content.
 *
 * @param {object} props - An object containing:
 *   - component: The component to render in the modal
 *   - props: The props to pass to the component
 *   - closable: A boolean indicating whether the modal can be closed
 *   - onClose: A function to be called when the modal is closed
 *   - closeModal: A function to be called when the modal is closed
 *   - containerStyle: An object containing styles to apply to the modal container
 *   - isVisible: A boolean indicating whether the modal is visible
 *   - modalOffset: The offset of the modal
 *   - shouldWarnFormUpdate: A boolean indicating whether the modal should warn of unsaved form updates
 *   - modalSize: A string indicating the size of the modal
 *   - className: A string containing additional classes to apply to the modal
 *
 * @return {JSX.Element} A modal component with the specified content and size
 *
 * @author Rumesh Udash
 */
export const ModalComponent = ({
    component: RenderInner,
    props,
    closable = true,
    onClose = () => {},
    closeModal,
    containerStyle: contStyle,
    // wrapperStyle,
    isVisible,
    // modalOffset,
    closeIcon = true,
    autofocus,
    shouldWarnFormUpdate = false,
    className,
    modalSize = 'md',
    position = 'bottom',
    headingTitle,
    closeClassName,
    closeWarningText,
    withScrollableModal,
}: ModalProps) => {
    const { isFormUpdated, isArc } = useApp();

    const closingMessage = useMemo(() => {
        if (closeWarningText) return closeWarningText;
        if (isArc) return 'Discard unsaved changes?';
        return 'Leave page? All entered details will be deleted.';
    }, [closeWarningText, isArc]);

    const onModalClose = (closeStatus: any) => {
        if (shouldWarnFormUpdate && isFormUpdated) {
            ConfirmUtil({
                title: 'Warning',
                icon: ErrorSvgIcon,
                iconAppearance: isArc ? 'error' : 'warning',
                message: closingMessage,
                onConfirmPress: () => {
                    onClose();
                    Modal.close();
                },
                confirmAppearance: 'polaris-error',
                appearance: 'warning',
                isArc,
            });
            return;
        }

        if (!closable) return;
        if (!closeStatus) {
            if (closeModal) closeModal();
            onClose();
            if (closeModal) return;
        }
        Modal.close();
    };

    return (
        <Dialog open={isVisible} onOpenChange={onModalClose}>
            <DialogContent
                style={contStyle}
                closeable={closable}
                closeIcon={closeIcon}
                mobilePosition={position}
                size={modalSize}
                title={headingTitle}
                onOpenAutoFocus={(e) => {
                    if (!autofocus) e.preventDefault();
                }}
                className={className}
                closeClassName={closeClassName}
                withScrollableModal={withScrollableModal}
            >
                {RenderInner && <RenderInner inModal={true} {...props} />}
            </DialogContent>
        </Dialog>
    );
};
