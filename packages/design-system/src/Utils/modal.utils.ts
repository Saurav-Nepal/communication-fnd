import { DialogBaseUtil } from '../Components/Dialogs/Base/base.utils';
import { ModalProps } from '../Components/Dialogs/Modal/modal.types';

/**
 * A class representing a modal that can be registered and opened globally.
 *
 * @author Rumesh Udash
 */
export class Modal extends DialogBaseUtil {
    static open(args: ModalProps) {
        super.open(args);
    }

    static getOpenModalCount() {
        if ((this as any)._currentGlobalLoader) {
            return (this as any)._currentGlobalLoader.getOpenCount();
        }
    }
}
