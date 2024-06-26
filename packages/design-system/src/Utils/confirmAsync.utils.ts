import { ConfirmUtilProps } from '../Components/Dialogs/ConfirmModal/confirmModal.types';
import { ConfirmUtil } from './confirm.utils';

/**
 * Asynchronously confirms user input by returning a promise that resolves
 * with a boolean indicating whether the user confirmed or cancelled.
 *
 * @param {object} props - An object containing all the props of ConfirmUtil except
 * onConfirmPress and onCancelPress.
 * @return {Promise<boolean>} - A Promise that resolves with a boolean indicating
 * whether the user confirmed or cancelled.
 *
 * @author Rumesh Udash
 */
export async function ConfirmAsyncUtil({
    ...props
}: Omit<ConfirmUtilProps, 'onConfirmPress' | 'onCancelPress'>) {
    return new Promise<boolean>((resolve, reject) => {
        ConfirmUtil({
            ...props,
            onConfirmPress: () => {
                resolve(true);
            },
            onCancelPress: () => {
                resolve(false);
            },
        });
    });
}
