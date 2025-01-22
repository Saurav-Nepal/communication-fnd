import { Button } from '@slabs/ds-core';
import { Modal, ModalFooter } from '@slabs/ds-dialog';
import { isEmptyArray, isFunction } from '@slabs/ds-utils';

import { useFormCreator } from '@/hooks/useFormCreator.hook';
import { FormCreatorProps } from '@/types';

import { FormConfigurator } from '../configurator/formConfigurator/formConfigurator.component';
import CustomAction from '../customAction/customAction.component';
import { FormBuilder } from '../formBuilder/formBuilder.component';

const FormCreator = ({
    direct,
    disableActions,
    onDismiss,
    ...props
}: FormCreatorProps) => {
    const {
        payload,
        headerActions,
        formSchema,
        hasFormConfigurator,
        handleSubmit,
        layoutChanged,
    } = useFormCreator(props);

    const closeModal = () => {
        if (direct) {
            isFunction(onDismiss) && onDismiss();
        } else {
            Modal.close();
        }
    };

    return (
        <div className='relative form-creator'>
            {!disableActions ? (
                <div className='absolute form-actions -top-12 right-16'>
                    {/* {!IsEmptyArray(layouts) && (
                            <SelectBox
                                // isClearable={false}
                                // onChange={(value) => this.onLayoutChange(value)}
                                value={payload.layout}
                                // field='name'
                                options={payload.layouts}
                            />
                    )} */}

                    {!isEmptyArray(headerActions) ? (
                        <div className='form-ui-actions'>
                            <CustomAction
                                placement='as_header'
                                actions={headerActions}
                                genericData={payload.genericData}
                                formUiActions
                            />
                        </div>
                    ) : null}

                    {payload.dictionary &&
                    // payload.source !== 'form' &&
                    hasFormConfigurator ? (
                        <FormConfigurator
                            source={payload.source}
                            sourceId={payload.formId || payload.modelId}
                            onSubmit={layoutChanged}
                            listName={payload.starter}
                            layout={payload.layout}
                            columns={payload.dictionary}
                        />
                    ) : null}

                    {/* {payload.formId ? (
                            <div className="redirect-to-form">
                                <CustomTooltip
                                    placement="left"
                                    html={
                                        <Button
                                            onClick={(e) => {
                                                Location.navigate(
                                                    {
                                                        url: `/form/${payload.formId}`,
                                                    },
                                                    e
                                                );
                                                ModalManager.closeModal();
                                            }}
                                        >
                                            <i
                                                className="fa fa-pencil"
                                                aria-hidden="true"
                                            ></i>
                                        </Button>
                                    }
                                    title="Redirect to Form"
                                ></CustomTooltip>
                            </div>
                        ) : null} */}
                </div>
            ) : null}

            {payload?.layout ? (
                <FormBuilder
                    className='flex-1'
                    layoutClassName='flex-1 px-6 pb-5 pt-3'
                    formSchema={formSchema}
                    initValues={payload?.data}
                    onSubmit={handleSubmit}
                    payload={payload}
                >
                    {({ isSubmitting, isValidating }) => (
                        <ModalFooter className='justify-end gap-4 border-t'>
                            <Button type='reset' onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                color='primary'
                                isLoading={isSubmitting || isValidating}
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    )}
                </FormBuilder>
            ) : null}
        </div>
    );
};

export { FormCreator };
