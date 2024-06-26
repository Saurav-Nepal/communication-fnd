import { forwardRef } from 'react';

import { ModalContainer } from '../../Components';
import { FormBuilder } from '../../Composites';
import { CommonFormProps } from './modal.formutil.dto';
import { useCommonFormHandler } from './useCommonFormHandler.hook';

export const SlidingPanelFormUtilComponent = forwardRef(
    (props: CommonFormProps, ref: any) => {
        const {
            title,
            modalType,
            initialData: initialValue,
            formSchema,
            formBuilderProps,
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
                    className='relative flex-1 p-2 '
                    initValues={getInitialFormData}
                    {...formBuilderProps}
                    withSaveAndNew={!isEdit && formBuilderProps?.withSaveAndNew}
                />
            </ModalContainer>
        );
    }
);
