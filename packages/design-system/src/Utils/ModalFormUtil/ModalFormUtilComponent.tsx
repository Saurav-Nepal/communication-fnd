import { forwardRef } from 'react';

import { ModalContainer } from '../../Components';
import { FormBuilder } from '../../Composites';
import { FormModalFooter } from './FormModalFooter';
import { CommonFormProps } from './modal.formutil.dto';
import { useCommonFormHandler } from './useCommonFormHandler.hook';

export const ModalFormUtilComponent = forwardRef(
    (props: CommonFormProps, ref: any) => {
        const {
            title,
            initialData: initialValue,
            formSchema,
            formBuilderProps,
            modalType,
            initialValueId,
            ...apiSchema
        } = props;

        const { isEdit, onSubmit, getInitialFormData } = useCommonFormHandler(
            { apiSchema, modalType, formSchema, initialValueId, initialValue },
            ref
        );

        return (
            <ModalContainer title={title}>
                <FormBuilder
                    ref={ref}
                    formSchema={formSchema}
                    onSubmit={onSubmit}
                    className='relative flex-1 '
                    initValues={getInitialFormData}
                    withModalBody
                    saveAndCreateAnotherClassName='hidden'
                    {...formBuilderProps}
                >
                    {(props) => (
                        <FormModalFooter
                            {...props}
                            {...{
                                isEdit,
                                showCreateAnother:
                                    formBuilderProps?.withSaveAndNew,
                            }}
                        />
                    )}
                </FormBuilder>
            </ModalContainer>
        );
    }
);
