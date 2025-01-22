import React from 'react';

import { Modal } from '../../utils';
import { Dialog, DialogContent } from '../dialogs/dialog';
import { ModalProps } from './modal.types';

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
    containerStyle: contStyle,
    isVisible,
    closeIcon = true,
    closeable = true,
    autofocus,
    className,
    modalSize = 'md',
    position = 'bottom',
    headingTitle,
    closeClassName,
    withScrollableModal,
}: ModalProps) => {
    return (
        <Dialog
            open={isVisible}
            onOpenChange={() => {
                if (closeable) Modal.close();
            }}
        >
            <DialogContent
                style={contStyle}
                isCloseable={closeable}
                hideCloseIcon={!closeIcon}
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
