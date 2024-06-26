'use client';

import { forwardRef, memo, useCallback } from 'react';

import {
    FormBuilderChildrenProps,
    FormBuilderProps,
    FormLayoutType,
    useApp,
    useFormBuilder,
} from '@finnoto/core';

import {
    Button,
    CheckBox,
    Loading,
    ModalBody,
    ModalFooter,
} from '../../Components';
import { Modal } from '../../Utils';
import { cn } from '../../Utils/common.ui.utils';

/**
 * Renders a form builder component with a customizable layout and validation.
 *
 * @param {Boolean} loading - Whether or not to show a loading spinner.
 * @param {string} className - Classname for the main form container.
 * @param {string} layoutClassName - Classname for the layout container.
 * @param {string} buttonAppearance - The appearance for the submit button.
 * @param {string} buttonLabel - The label for the submit button.
 * @param {string} buttonSize - The size for the submit button.
 * @param {string} layout - The layout of the form.
 * @param {Object} formSchema - The schema for the form.
 * @param {Object} validationSchema - The validation schema for the form.
 * @param {function} onSubmit - The function to be called when the form is submitted.
 * @param {function} onChange - The function to be called when the form changes.
 * @param {function} onReset - The function to be called when the form is reset.
 * @param {Array} initialValues - The initial values for the form.
 * @param {function} renderFormFields - The function to render the form fields.
 * @return {JSX.Element} - The form builder component.
 *
 * @author Rumesh Udash
 */
export const FormBuilder = forwardRef(
    (
        {
            loading,
            className,
            layoutClassName,
            footerClassName,
            buttonAppearance = 'primary',
            buttonLabel = 'Save',
            buttonSize = 'lg',
            layout,
            withModalBody,
            modalBodyClassName,
            children,
            stickySaveButton = true,
            saveAndCreateAnotherClassName,
            ...props
        }: FormBuilderProps,
        ref
    ) => {
        const {
            formSchema,
            isLoading,
            isSubmitting,
            isValidating,
            touched,
            formDataUpdated,
            errors,
            disableSubmit,
            isCreateAnother,
            setCreateAnother,
            getValues,
            handleSubmit,
            handleFormData,
            renderFormFields,
        } = useFormBuilder(props, ref);

        const { isArc } = useApp();
        const values = getValues();

        const renderWithLayout = useCallback(
            (layout: FormLayoutType) => {
                switch (layout) {
                    case 'two-column':
                        return (
                            <LayoutTwoColumn
                                formSchema={formSchema}
                                className={cn(
                                    {
                                        'gap-4': isArc,
                                    },
                                    layoutClassName
                                )}
                                renderFormFields={renderFormFields}
                            />
                        );
                    case 'three-column':
                        return (
                            <LayoutThreeColumn
                                formSchema={formSchema}
                                className={cn(
                                    {
                                        'gap-4': isArc,
                                    },
                                    layoutClassName
                                )}
                                renderFormFields={renderFormFields}
                            />
                        );
                    case 'one-column':
                    default:
                        return (
                            <LayoutOneColumn
                                formSchema={formSchema}
                                className={cn(
                                    {
                                        'gap-4': isArc,
                                    },
                                    layoutClassName
                                )}
                                renderFormFields={renderFormFields}
                            />
                        );
                }
            },
            [formSchema, isArc, layoutClassName, renderFormFields]
        );

        if (loading || isLoading) {
            return (
                <div className='form_builder form_builder__loading col-flex  justify-center items-center flex-1 h-full w-full min-h-[150px] text-blue-700'>
                    <Loading size='md' color='primary' />
                </div>
            );
        }

        return (
            <form
                className={cn(
                    'form_builder form_builder__form col-flex m-form-builder',
                    className
                )}
                onSubmit={handleSubmit}
                noValidate
            >
                {withModalBody ? (
                    <ModalBody className={modalBodyClassName}>
                        {renderWithLayout(layout)}
                    </ModalBody>
                ) : (
                    renderWithLayout(layout)
                )}
                <div
                    className={cn(footerClassName, {
                        'col-flex  modal-background sticky bottom-0 sticky-form-footer':
                            stickySaveButton,
                    })}
                >
                    {props.withSaveAndNew && (
                        <div
                            className={cn(
                                'z-30 pt-2 mt-4 mb-2 border-t m-form-create-another',
                                saveAndCreateAnotherClassName
                            )}
                        >
                            <CheckBox
                                checked={isCreateAnother}
                                onChange={(checked) =>
                                    setCreateAnother(checked)
                                }
                                rightLabel='save and create another'
                            />
                        </div>
                    )}
                    {typeof children === 'function' ? (
                        children({
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            isValidating,
                            disableSubmit,
                            formDataUpdated,
                            handleSubmit,
                            handleFormData,
                            isCreateAnother,
                            setCreateAnother,
                        })
                    ) : (
                        <Button
                            className={cn('m-submit-btn flex-1', {
                                'mt-4': !props.withSaveAndNew,
                            })}
                            appearance={buttonAppearance as any}
                            loading={isSubmitting}
                            disabled={disableSubmit}
                        >
                            {buttonLabel}
                        </Button>
                    )}
                </div>
            </form>
        );
    }
);

const LayoutOneColumn = memo(
    ({ formSchema, className, renderFormFields }: any) => {
        return (
            <div
                className={cn(
                    'gap-2 form_builder__layout__one_column col-flex',
                    className
                )}
            >
                {formSchema &&
                    Object.keys(formSchema).map((elementKey) =>
                        renderFormFields(elementKey, formSchema[elementKey])
                    )}
            </div>
        );
    }
);
const LayoutTwoColumn = memo(
    ({ formSchema, className, renderFormFields }: any) => {
        return (
            <div
                className={cn(
                    'grid grid-cols-2 gap-4 form_builder__layout__one_column',
                    className
                )}
            >
                {formSchema &&
                    Object.keys(formSchema).map((elementKey) => {
                        const colSpan = formSchema[elementKey]?.colSpan;
                        return renderFormFields(
                            elementKey,
                            formSchema[elementKey],
                            {
                                className: cn({
                                    [`col-span-${colSpan}`]: colSpan,
                                }),
                            }
                        );
                    })}
            </div>
        );
    }
);
const LayoutThreeColumn = memo(
    ({ formSchema, className, renderFormFields }: any) => {
        return (
            <div
                className={cn(
                    'grid grid-cols-3 gap-4  form_builder__layout__one_column',
                    className
                )}
            >
                {formSchema &&
                    Object.keys(formSchema).map((elementKey) => {
                        const colSpan = formSchema[elementKey]?.colSpan;
                        return renderFormFields(
                            elementKey,
                            formSchema[elementKey],
                            {
                                className: cn({
                                    [`col-span-${colSpan}`]: colSpan,
                                }),
                            }
                        );
                    })}
            </div>
        );
    }
);

type ModalFormFooterProps = Pick<
    FormBuilderChildrenProps,
    | 'isSubmitting'
    | 'handleSubmit'
    | 'disableSubmit'
    | 'isCreateAnother'
    | 'setCreateAnother'
> & {
    isEdit?: boolean;
    showCreateAnother?: boolean;
};

export const ModalFormFooter = (props: ModalFormFooterProps) => {
    const {
        isEdit,
        isSubmitting,
        handleSubmit,
        disableSubmit,
        setCreateAnother,
        isCreateAnother,
        showCreateAnother = false,
    } = props;

    return (
        <ModalFooter className='items-center'>
            {!isEdit && showCreateAnother && (
                <CheckBox
                    checked={isCreateAnother}
                    onChange={(checked) => setCreateAnother(checked)}
                    rightLabel='save and create another'
                    appearance='polaris-brand'
                    labelClassName='p-0'
                />
            )}

            <div className='flex gap-2 ml-auto'>
                <Button
                    appearance='polaris-white'
                    onClick={() => {
                        Modal.close();
                    }}
                    size='sm'
                    type='reset'
                >
                    Cancel
                </Button>
                <Button
                    disabled={disableSubmit}
                    appearance='polaris-success'
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    size='sm'
                    type='submit'
                    className='min-w-[110px]'
                >
                    Save
                </Button>
            </div>
        </ModalFooter>
    );
};

export const SlidingPaneFooter = (props: ModalFormFooterProps) => {
    const {
        isEdit,
        isSubmitting,
        handleSubmit,
        disableSubmit,
        setCreateAnother,
        isCreateAnother,
        showCreateAnother = false,
    } = props;

    return (
        <ModalFooter>
            <div className='flex flex-col flex-1 gap-4'>
                {!isEdit && showCreateAnother ? (
                    <CheckBox
                        checked={isCreateAnother}
                        onChange={(checked) => setCreateAnother(checked)}
                        rightLabel='save and create another'
                        appearance='polaris-brand'
                        labelClassName='p-0'
                    />
                ) : null}
                <div className='flex flex-row flex-1'>
                    <Button
                        disabled={disableSubmit}
                        appearance='primary'
                        loading={isSubmitting}
                        onClick={handleSubmit}
                        size='md'
                        type='submit'
                        className='w-full px-3'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </ModalFooter>
    );
};
