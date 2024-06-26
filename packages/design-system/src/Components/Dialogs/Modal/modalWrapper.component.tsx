import { BaseWrapper } from '../Base/baseWrapper.component';
import { ModalComponent } from './modal.component';
import { ModalProps } from './modal.types';

/**
 * Component representing a modal wrapper.
 *
 * @extends {BaseWrapper<ModalProps>}
 *
 * @author Rumesh Udash
 */
export class ModalWrapper extends BaseWrapper<ModalProps> {
    /**
     * Renders the dialogs and returns them as an array of ModalComponent elements.
     *
     * @return {Array<ModalComponent>} An array of ModalComponent elements representing the rendered dialogs.
     */
    renderDialogs() {
        const { dialogs } = this.state;
        const modalsElement = dialogs.map((sheet, index: number) => {
            return (
                <ModalComponent
                    key={sheet.id + '' + index}
                    closeModal={this.close}
                    {...sheet}
                />
            );
        });
        return modalsElement;
    }
}
