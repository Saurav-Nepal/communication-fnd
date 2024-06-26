import { useApp } from '@finnoto/core';

import { CommentConfirmModal } from '../Components/Dialogs/CommentConfirmModal/commentConfirmModal.component';
import { ConfirmUtilProps } from '../Components/Dialogs/ConfirmModal/confirmModal.types';
import { Modal } from './modal.utils';

/**
 * Creates a confirmation modal with customizable title, message, and actions.
 *
 * @param {object} ConfirmUtilProps - Object that contains properties for the confirmation modal.
 * @param {string} [title='Confirm'] - The title of the modal.
 * @param {string} [message='action_confirm_msg'] - The message to display in the modal.
 * @param {function} [onCancelPress=() => {}] - Function to call when cancel button is pressed.
 * @param {function} [onConfirmPress=() => {}] - Function to call when confirm button is pressed.
 * @param {string} [confirmText='Yes'] - Text to display on the confirm button.
 * @param {string} [cancelText='No'] - Text to display on the cancel button.
 * @param {boolean} [translateMessage=true] - Whether or not to translate the message.
 * @param {boolean} [cancelable=true] - Whether or not the modal can be cancelled.
 * @param {boolean} [noHeader] - Whether or not to display the modal header.
 * @param {boolean} [isReverseAction=false] - Whether or not to reverse the order of the actions.
 * @param {ReactNode} [icon] - Icon to display in the modal header.
 * @param {string} [confirmAppearance] - Appearance of the confirm button.
 * @param {string} [iconAppearance] - Appearance of the icon.
 * @param {boolean} [required] - Whether or not the comment is required.
 *
 * @author Rumesh Udash
 */
export function CommentConfirmUtil({
    title = 'Confirm',
    message = 'action_confirm_msg',
    onCancelPress = () => {},
    onConfirmPress = () => {},
    confirmText = 'Yes',
    cancelText = 'No',
    translateMessage = true,
    cancelable = true,
    noHeader,
    isReverseAction = false,
    icon,
    confirmAppearance,
    iconAppearance,
    required,
}: ConfirmUtilProps & { required?: boolean }) {
    /* actions for confirm modal */
    const actions = [
        {
            actionText: cancelText,
            actionClick: () => {
                Modal.close();
                onCancelPress();
            },
            appearance: 'base',
            type: 'cancel',
        },
        {
            actionText: confirmText,
            actionClick: (comment: string) => {
                Modal.close();
                onConfirmPress(comment);
            },
            appearance: confirmAppearance || 'success',
            type: 'success',
        },
    ];

    Modal.open({
        component: CommentConfirmModal,
        modalSize: 'sm',
        closable: cancelable,
        props: {
            title,
            icon,
            message,
            translateMessage,
            actions: isReverseAction ? [...actions].reverse() : actions,
            noHeader,
            isReverseAction,
            iconAppearance,
            required,
        },
        onClose: onCancelPress,
    });
}
