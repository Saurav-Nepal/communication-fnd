import React, { forwardRef, useImperativeHandle } from 'react';

import { Label, SelectBox } from '@slabs/ds-core';

import DraftTextEditor from '../../../../components/draftTextEditor/DraftTextEditor.component';
import { WhatsappTemplateCategoryEnum } from '../../../../enums/whatsapp.template.category.enum';
import { useFormBuilder } from '../../../../hooks/useFormBuilder.hook';
import {
    FormBuilderFormSchema,
    FormBuilderSubmitType,
} from '../../../../types';
import { YourTemplatesPreview } from './YourTemplatesPriview.component';

const YourTemplateEditor = forwardRef(
    (
        {
            onSubmit,
            defaultValues,
        }: { onSubmit?: FormBuilderSubmitType; defaultValues?: any },
        ref
    ) => {
        const formSchema: FormBuilderFormSchema = {
            name: {
                type: 'text',
                placeholder: 'Template Name',
                label: 'Template Name',
                required: true,
            },
            title: {
                type: 'text',
                placeholder: 'Enter Text',
                label: 'Title',
                required: false,
            },
            footer: {
                type: 'text',
                placeholder: 'Enter Footer',
                label: 'Footer',
                required: false,
            },
            body: {
                type: 'text',
                required: true,
            },
            category_id: {
                type: 'select',
                placeholder: 'Template Name',
                label: 'Template Name',
            },
            language_id: {
                type: 'se',
                placeholder: 'Template Name',
                label: 'Template Name',
            },
        };

        const {
            renderFormFields,
            handleFormData,
            watch,
            disableSubmit,
            errors,
            handleSubmit,
            hasError,
        } = useFormBuilder({
            initValues: {
                category_id: WhatsappTemplateCategoryEnum.MARKETING,
                language_id: 1,
                ...defaultValues,
            },
            formSchema: formSchema,
            onSubmit,
        });

        useImperativeHandle(ref, () => ({
            disableSubmit,
            handleSubmit,
        }));

        return (
            <div className='flex flex-1 gap-7 w-full border-red-500'>
                <div className='flex flex-col flex-1 gap-4 p-4 w-full h-full bg-white rounded-sm'>
                    <div className='grid grid-cols-3 gap-4'>
                        {renderFormFields('name')}
                        <div className='flex flex-col gap-2'>
                            <Label label='Category' required />
                            <SelectBox
                                isSearchable={false}
                                value={watch?.('category_id')}
                                onOptionChange={(opt) => {
                                    handleFormData('category_id', opt?.data);
                                }}
                                options={[
                                    {
                                        label: 'Marketing',
                                        value: WhatsappTemplateCategoryEnum.MARKETING,
                                    },
                                    {
                                        label: 'Authentication',
                                        value: WhatsappTemplateCategoryEnum.AUTHENTICATION,
                                    },
                                    {
                                        label: 'Utility',
                                        value: WhatsappTemplateCategoryEnum.UTILITY,
                                    },
                                ]}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label label='Language' required />
                            <SelectBox
                                disabled
                                isSearchable={false}
                                defaultValue='english'
                                options={[
                                    {
                                        label: 'English (en)',
                                        value: 'english',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>{renderFormFields('title')}</div>
                        <div>{renderFormFields('footer')}</div>
                    </div>
                    <div>
                        <DraftTextEditor
                            defaultValue={
                                watch?.('body') || defaultValues?.body
                            }
                            onValueChange={(html) =>
                                handleFormData('body', html)
                            }
                            labelProps={{ label: 'Body', required: true }}
                        />
                        {hasError('body') && (
                            <Label
                                label={errors['body']}
                                name='body'
                                error={errors['body']}
                            />
                        )}
                    </div>
                </div>
                <YourTemplatesPreview
                    footer={watch?.('footer')}
                    title={watch?.('title')}
                    body={watch?.('body')}
                />
            </div>
        );
    }
);

export default YourTemplateEditor;

export const ConvertRawApiDataIntoFormSuitable = (apiResponse: any) => {
    return {
        category_id: apiResponse?.category_id,
        language_id: apiResponse?.language_id,
        name: apiResponse.name,
        body: apiResponse.body?.script,
        footer: apiResponse.footer?.script,
        title: apiResponse?.title,
    };
};
