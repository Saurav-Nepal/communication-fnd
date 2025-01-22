import { ConfirmModal } from '../../Components/confirm/confirm';
import { Modal } from '../modal/modal.utils';
import { ConfirmUtilProps } from './confirm.types';

/**
 * Executes a confirm modal with customizable title, message, actions, and appearance.
 *
 * @param {ConfirmUtilProps} props - An object containing the following properties:
 *   @param {string} [title='Confirm'] - The title of the confirm modal.
 *   @param {string} [message=''] - The message to display in the confirm modal.
 *   @param {function} [onCancelPress=() => {}] - Function to execute when cancel is pressed.
 *   @param {function} [onConfirmPress=() => {}] - Function to execute when confirm is pressed.
 *   @param {string} [confirmText='Yes!'] - The text to display on the confirm button.
 *   @param {string} [cancelText='No'] - The text to display on the cancel button.
 *   @param {boolean} [translateMessage=true] - Whether or not to translate the message.
 *   @param {boolean} [cancelable=true] - Whether or not the modal can be cancelled.
 *   @param {boolean} [noHeader] - Whether or not to display the modal header.
 *   @param {boolean} [isReverseAction=false] - Whether or not to reverse the order of the actions.
 *   @param {string} [confirmAppearance] - The appearance of the confirm button.
 *   @param {ReactNode} [icon] - The icon to display in the modal header.
 *   @param {string} [iconAppearance='primary'] - The appearance of the icon.
 *
 */
export function ConfirmUtil({
    title = 'Confirm',
    message = '',
    onCancelPress = () => {},
    onConfirmPress = () => {},
    confirmText = 'Yes!',
    cancelText = 'No',
    translateMessage = true,
    cancelable = true,
    noHeader,
    isReverseAction = false,
    confirmAppearance,
    icon,
    iconAppearance = 'primary',
    disableCloseModal,
    cancelAppearance,
    customContent,
    footerButtonsType,
    hideCancel,
    hideIcon,
    appearance,
}: ConfirmUtilProps) {
    /* actions for confirm modal */
    const actions = [
        {
            actionText: confirmText ?? 'Yes, confirm',
            actionClick: () => {
                if (!disableCloseModal) Modal.close();
                onConfirmPress();
            },
            appearance: confirmAppearance,
        },
        {
            actionText: cancelText ?? 'No, cancel',
            actionClick: () => {
                Modal.close();
                onCancelPress();
            },
            appearance: cancelAppearance ?? 'secondary',
        },
    ];

    if (hideCancel) actions.pop();

    Modal.open({
        component: ConfirmModal,
        modalSize: 'sm',
        closable: cancelable,
        props: {
            title,
            message,
            translateMessage,
            actions: isReverseAction ? [...actions].reverse() : actions,
            noHeader,
            icon,
            iconAppearance,
            isReverseAction,
            closable: cancelable,
            onClose: onCancelPress,
            customContent,
            footerButtonsType,
            hideIcon,
            appearance,
        },
        onClose: onCancelPress,
    });
}
