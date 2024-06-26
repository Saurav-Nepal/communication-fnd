import { Modal } from '../../../Utils';
import {
    ModalBody,
    ModalContainer,
    ModalFooter,
} from '../../Dialogs/Base/modal.container.component';
import { ShadowDOMContainer } from '../../ShadowDom/shadowDom.component';
import { Button } from '../Button/button.component';

const RichTextPreviewModal = ({ html }: { html: string }) => {
    return (
        <ModalContainer title='Preview'>
            <ModalBody>
                <ShadowDOMContainer
                    className='p-2 rounded-md bg-base-100'
                    body={html}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        Modal.close();
                    }}
                    size='md'
                    appearance='primary'
                >
                    Close
                </Button>
            </ModalFooter>
        </ModalContainer>
    );
};

export default RichTextPreviewModal;
