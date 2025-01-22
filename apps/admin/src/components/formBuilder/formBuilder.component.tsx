import { forwardRef, memo } from 'react';
import clsx from 'clsx';

import { Button } from '@slabs/ds-core';
import { ModalBody } from '@slabs/ds-dialog';
import { cn } from '@slabs/ds-utils';

import { useFormBuilder } from '@/hooks/useFormBuilder.hook';
import {
    FormBuilderFormSchema,
    FormBuilderProps,
    FormSchemaValues,
} from '@/types';

import { Loader } from '../loader';

const FormBuilderComponent = forwardRef(
    (
        {
            loading,
            className,
            layoutClassName,
            buttonAppearance = 'primary',
            buttonLabel = 'Submit',
            buttonSize = 'lg',
            withModalBody,
            modalBodyClassName,
            children,
            ...props
        }: FormBuilderProps,
        ref
    ) => {
        const { formSchema } = props;
        const {
            isLoading,
            isSubmitting,
            isValidating,
            disableSubmit,
            hasError,
            touched,
            errors,
            handleSubmit,
            handleFormData,
            renderFormFields,
            getValues,
        } = useFormBuilder(props, ref);

        const formData = getValues();

        if (loading || isLoading) {
            return (
                <div className='form_builder form_builder__loading flex flex-col items-center justify-center flex-1 h-full w-full min-h-[150px] text-blue-700'>
                    <Loader thikness={3} size={42} backColor='rgba(0,0,0,.1)' />
                </div>
            );
        }

        return (
            <form
                className={cn(
                    'form_builder form_builder__form flex flex-col',
                    className
                )}
                onSubmit={handleSubmit}
                noValidate
            >
                {withModalBody ? (
                    <ModalBody className={modalBodyClassName}>
                        <FormBuilderLayout
                            className={layoutClassName}
                            formSchema={formSchema}
                            renderFormFields={renderFormFields}
                        />
                    </ModalBody>
                ) : (
                    <FormBuilderLayout
                        className={layoutClassName}
                        formSchema={formSchema}
                        renderFormFields={renderFormFields}
                    />
                )}

                {typeof children === 'function' ? (
                    children({
                        isSubmitting,
                        isValidating,
                        errors,
                        disableSubmit,
                        values: formData,
                        touched,
                        handleFormData,
                        handleSubmit,
                    })
                ) : (
                    <Button
                        className='mt-4'
                        size={buttonSize as any}
                        color={buttonAppearance as any}
                        disabled={hasError() || isSubmitting || isValidating}
                    >
                        {buttonLabel}
                    </Button>
                )}
            </form>
        );
    }
);

const FormBuilder = memo(FormBuilderComponent);
export { FormBuilder };

const FormBuilderLayout = memo(
    ({
        className,
        formSchema,
        renderFormFields,
    }: {
        className?: string;
        formSchema?: FormBuilderFormSchema;
        renderFormFields: (
            elementKey: string,
            schema: FormSchemaValues,
            handleData?: (key: string, value: any) => void,
            validationKey?: string
        ) => any;
    }) => {
        let isSplitStart = false;

        return (
            <div
                className={clsx(
                    'form_builder__layout flex flex-wrap gap-4',
                    className
                )}
            >
                {formSchema &&
                    Object.keys(formSchema).map((elementKey) => {
                        const schema = formSchema[elementKey];
                        if (schema.type === 'hidden') return null;

                        if (schema.type === 'split') {
                            isSplitStart = !isSplitStart;
                            return null;
                        }

                        return (
                            <div
                                key={elementKey}
                                className={clsx('form-input w-full', {
                                    'sm:w-[calc(50%-0.75rem)]': isSplitStart,
                                })}
                            >
                                {renderFormFields(elementKey, schema)}
                            </div>
                        );
                    })}
            </div>
        );
    }
);
