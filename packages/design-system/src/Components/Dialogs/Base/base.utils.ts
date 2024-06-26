import React from 'react';
import { DialogOpenParams } from './dialog.types';

/**
 * A utility class for working with dialog base components.
 *
 * @class
 * @author Rumesh Udash
 */
export class DialogBaseUtil {
    _currentGlobalLoader = null;

    /**
     * Registers a React ref to the current global loader.
     *
     * @param {React.Ref<any>} ref - The React ref to be registered.
     */
    static register(ref: React.Ref<any>) {
        (this as any)._currentGlobalLoader = ref;
    }

    /**
     * Opens a dialog with the specified parameters.
     *
     * @param {DialogOpenParams} args - An object containing parameters for opening the dialog.
     */
    static open({ ...args }: DialogOpenParams) {
        if ((this as any)._currentGlobalLoader) {
            (this as any)._currentGlobalLoader.open({ ...args });
        }
    }

    /**
     * Updates the props of a dialog at the specified index.
     *
     * @param {object} props - An object containing props to update.
     * @param {number} index - The index of the global loader to update.
     */
    static updateProps({ ...props }, index: number) {
        if ((this as any)._currentGlobalLoader) {
            (this as any)._currentGlobalLoader.updateProps({ ...props }, index);
        }
    }

    /**
     * Closes the dialog with an optional index.
     *
     * @param {number} index - An optional index to specify which loader to close.
     */
    static close(index?: number) {
        if ((this as any)._currentGlobalLoader) {
            (this as any)._currentGlobalLoader.close(index);
        }
    }

    /**
     * Closes all dialogs if they exist.
     */
    static closeAll() {
        if ((this as any)._currentGlobalLoader) {
            (this as any)._currentGlobalLoader.closeAll();
        }
    }

    /**
     * Retrieves the number of open instances of the current dialog.
     *
     * @return {number} The number of open instances.
     */
    static getOpenCount() {
        if ((this as any)._currentGlobalLoader) {
            return (this as any)._currentGlobalLoader.getOpenCount();
        }
    }
}
