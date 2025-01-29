import { forwardRef, useImperativeHandle, useState } from 'react';

import { Label, SelectBox } from '@slabs/ds-core';

import DraftTextEditor from '../../../../components/draftTextEditor/DraftTextEditor.component';
import { WhatsappTemplateCategoryEnum } from '../../../../enums/whatsapp.template.category.enum';
import { useFormBuilder } from '../../../../hooks/useFormBuilder.hook';
import {
    FormBuilderFormSchema,
    FormBuilderSubmitType,
} from '../../../../types';
import YourTemplateEditorButton from './YourTemplateEditor.button.component';
import YourTemplateEditorDisplaySampleContent from './YourTemplateEditor.display.sample.content';
import YourTemplateEditorBroadcast from './YourTemplateEditorBroadcastTitle';
import { YourTemplatesPreview } from './YourTemplatesPriview.component';

const YourTemplateEditor = forwardRef(
    (
        {
            onSubmit,
            defaultValues,
        }: { onSubmit?: FormBuilderSubmitType; defaultValues?: any },
        ref
    ) => {
        const [title, setTitle] = useState<any>({
            type: defaultValues?.title?.type || 'text',
            value: defaultValues?.title?.value || '',
        });
        const [sampleContent, setSampleContent] = useState<any>(
            defaultValues?.sample_contents || {}
        );
        const [configuration, setConfiguration] = useState<any>(
            defaultValues?.button_configurations
        );

        const formSchema: FormBuilderFormSchema = {
            name: {
                type: 'text',
                placeholder: 'Template Name',
                label: 'Template Name',
                required: true,
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
                language_id: 1,
                category_id: WhatsappTemplateCategoryEnum.MARKETING,
                ...defaultValues,
            },
            formSchema: formSchema,
            onSubmit: async (value: any, opt) => {
                return onSubmit?.(
                    {
                        ...value,
                        title,
                        button_configurations: configuration,
                        sample_contents: sampleContent,
                    },
                    opt
                );
            },
        });

        useImperativeHandle(ref, () => ({
            disableSubmit,
            handleSubmit,
        }));

        return (
            <div className='flex overflow-hidden flex-1 gap-7 w-full h-full border-red-500'>
                <div className='flex overflow-y-auto flex-col flex-1 gap-4 p-4 w-full h-full bg-white rounded-sm'>
                    <div className='grid grid-cols-3 gap-4'>
                        {renderFormFields('name')}
                        <div className='flex flex-col gap-2'>
                            <Label label='Category' required />
                            <SelectBox
                                isSearchable={false}
                                value={watch?.('category_id')}
                                onOptionChange={(opt) => {
                                    handleFormData('category_id', opt?.value);
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
                    <div className='flex flex-col gap-2'>
                        <hr className='my-4 border-t border-gray-300' />
                        <YourTemplateEditorBroadcast
                            defaultValue={title}
                            getCurrentValue={(data) => {
                                setTitle(data);
                            }}
                        />
                    </div>

                    <div>
                        <hr className='my-4 border-t border-gray-300' />
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
                    <div>
                        <hr className='my-4 border-t border-gray-300' />
                        {renderFormFields('footer')}
                    </div>

                    <YourTemplateEditorButton
                        configuration={configuration}
                        setConfiguration={setConfiguration}
                    />
                    <div className='flex flex-col'></div>
                    <YourTemplateEditorDisplaySampleContent
                        defaultVal={sampleContent}
                        title={title}
                        body={watch?.('body') || defaultValues?.body}
                        onBodyChange={(key, value) => {
                            setSampleContent((prev) => ({
                                ...prev,
                                [key]: value,
                            }));
                        }}
                    />
                </div>
                <YourTemplatesPreview
                    sampleContent={sampleContent}
                    footer={watch?.('footer')}
                    title={title}
                    body={watch?.('body')}
                    configuration={configuration}
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
        button_configurations: apiResponse?.button_configurations,
        sample_contents: apiResponse?.sample_contents,
        id: apiResponse?.id,
    };
};
