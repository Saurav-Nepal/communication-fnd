import { useState } from 'react';
import Image from 'next/image';

import { Input, RadioGroup } from '@slabs/ds-core';
import { isUndefinedOrNull } from '@slabs/ds-utils';

import FileUploaderComponent from '../../../../components/fileupload/FileUploader.component';
import PdfViewer from '../../../../components/reactPdf/pdf.viewer';

const YourTemplateEditorBroadcast = ({
    getCurrentValue,
    defaultValue,
}: {
    getCurrentValue: (data: any) => void;
    defaultValue: any;
}) => {
    const [value, setValue] = useState<{
        type: RenderTitleFieldType;
        value: string;
    }>(defaultValue || { type: 'text', value: ' ' });

    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-medium'>Broadcast Title</h4>
            <div className='flex flex-col gap-2'>
                <RadioGroup
                    size='sm'
                    type='default'
                    defaultValue={value?.type}
                    value={value?.type}
                    onChange={(value: any) => {
                        setValue({ type: value, value: '' });

                        if (value === 0)
                            getCurrentValue({ type: 'none', value: '' });
                    }}
                    options={[
                        { label: 'None', value: 0 },
                        { label: 'Text', value: 'text' },
                        // { label: 'Image', value: 'image' },
                        // { label: 'Video', value: 'video' },
                        // { label: 'Document', value: 'document' },
                    ]}
                />
                <RenderTitleField
                    value={value}
                    onValueChange={getCurrentValue}
                />
            </div>
        </div>
    );
};

export default YourTemplateEditorBroadcast;

type RenderTitleFieldType = 'text' | 'none' | 'document' | 'video' | 'image';

const RenderTitleField = ({
    value,
    onValueChange,
}: {
    value: { type: RenderTitleFieldType; value: string };
    onValueChange: (data: any) => void;
}) => {
    switch (value.type) {
        case 'text':
            return (
                <div className='mt-3'>
                    <Input
                        defaultValue={value?.value}
                        onChange={(e) => {
                            const value = e.target.value;
                            onValueChange({ type: 'text', value: value });
                        }}
                        placeholder='Enter title'
                    />
                </div>
            );
        case 'image':
            return (
                <RenderImageField
                    defaultValue={value?.value}
                    onValueChange={onValueChange}
                />
            );
        case 'document':
            return <RenderDocumentField onValueChange={onValueChange} />;
        default:
            break;
    }
};

const RenderImageField = ({
    onValueChange,
    defaultValue,
}: {
    onValueChange: (data: any) => void;
    defaultValue: string;
}) => {
    const [file, setFile] = useState<any>(undefined);

    return (
        <div className='mt-3'>
            {!isUndefinedOrNull(file) && (
                <div>
                    <Image
                        src={defaultValue || file?.link}
                        height={400}
                        width={400}
                        alt='uploaded'
                    />
                </div>
            )}

            <div className='flex gap-7 items-start mt-3'>
                <div className='flex flex-col flex-1'>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!value.length)
                                return onValueChange({
                                    type: 'image',
                                    value: file?.link,
                                });
                            onValueChange({ type: 'image', value: value });
                        }}
                        defaultValue={defaultValue}
                        placeholder='Add the image url'
                    />

                    <p className='mt-2 text-sm'>
                        To add a variable, use the format{' '}
                        <strong> {'{{image_url}}'}</strong>.
                    </p>
                </div>
                <span>Or</span>
                <FileUploaderComponent
                    accepts={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    onFileUploadDone={(data) => {
                        setFile(data);
                        onValueChange({ type: 'image', value: data?.link });
                    }}
                />
            </div>
        </div>
    );
};

const RenderDocumentField = ({
    onValueChange,
}: {
    onValueChange: (data: any) => void;
}) => {
    const [file, setFile] = useState<any>(undefined);
    return (
        <div className='mt-3'>
            {!isUndefinedOrNull(file) && (
                <div className='overflow-hidden w-60 h-60 border'>
                    <PdfViewer url={file?.link} />
                </div>
            )}

            <div className='flex gap-7 items-start mt-3'>
                <div className='flex flex-col flex-1'>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!value.length)
                                return onValueChange({
                                    type: 'document',
                                    value: file?.link,
                                });
                            onValueChange({ type: 'document', value: value });
                        }}
                        placeholder='Add the PDF/Document Url'
                    />
                    <p className='mt-2 text-sm'>
                        To add a variable, use the format{' '}
                        <strong> {'{{document_url}}'}</strong>.
                    </p>
                </div>
                <span>Or</span>
                <FileUploaderComponent
                    accepts={{ 'application/pdf': ['.pdf'] }}
                    onFileUploadDone={(data) => {
                        setFile(data);
                        onValueChange({ type: 'document', value: data?.link });
                    }}
                />
            </div>
        </div>
    );
};
