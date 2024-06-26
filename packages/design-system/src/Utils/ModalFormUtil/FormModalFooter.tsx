import { FormBuilderChildrenProps, useApp } from '@finnoto/core';

import { Button, CheckBox, ModalFooter } from '../../Components';
import { Modal } from '../modal.utils';

export const FormModalFooter = (
    props: Partial<FormBuilderChildrenProps> & {
        isEdit?: boolean;
        showCreateAnother?: boolean;
    }
) => {
    const {
        isEdit,
        isSubmitting,
        handleSubmit,
        disableSubmit,
        setCreateAnother,
        isCreateAnother,
        showCreateAnother,
    } = props;

    const { isArc } = useApp();

    return (
        <ModalFooter className='items-center'>
            {!isEdit && showCreateAnother ? (
                <CheckBox
                    checked={isCreateAnother}
                    onChange={(checked) => setCreateAnother?.(checked)}
                    rightLabel='save and create another'
                    appearance={isArc ? 'polaris-brand' : 'primary'}
                    labelClassName='p-0'
                />
            ) : null}

            <div className='flex gap-2 ml-auto'>
                <Button
                    appearance={isArc ? 'polaris-white' : 'errorHover'}
                    onClick={() => {
                        Modal.close();
                    }}
                    size='md'
                    type='reset'
                >
                    Cancel
                </Button>
                <Button
                    disabled={disableSubmit}
                    appearance={isArc ? 'polaris-success' : 'primary'}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    size='md'
                    type='submit'
                    className='min-w-[110px]'
                >
                    Save
                </Button>
            </div>
        </ModalFooter>
    );
};
