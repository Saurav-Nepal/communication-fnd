import { forwardRef } from 'react';

import { EmptyFunction, parseToServerFileFormat } from '@finnoto/core';

import { Typography } from '../../../Components/Data-display/Typography/typography.component';
import { ConfirmUtil } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { SmallMultipleFileUploadInterface } from '../uploader.types';
import { openResourceViewerModal } from '../uploader.utils';
import { CommonFileUploader } from './commonFileUploader.component';
import { UplodedFile } from './uploadFile.component';

const SmallMultipleFileUploader = forwardRef(
    (
        {
            defaultValueShow,
            ellipse_length = 25,
            title,
            className,
            titleClassName,
            isHideFiles,
            value: files = [],
            error,
            onFileUpload = EmptyFunction,
            required,
            is_multiple = true,
            ...rest
        }: SmallMultipleFileUploadInterface,
        ref: any
    ) => {
        const onRemoveFile = (_, index: number) => {
            const newFiles = files.filter((_, idx) => idx !== index);

            ConfirmUtil({
                title: 'Do you want to delete?',
                message: 'The action you are about to perform is irreversible.',
                confirmText: 'Yes',
                confirmAppearance: 'error',
                onConfirmPress: () => {
                    onFileUpload(newFiles);
                },
            });
        };
        const insertFiles = (value) => {
            const newFiles = (value || [])?.map((file) =>
                parseToServerFileFormat(file)
            );
            onFileUpload([...files, ...newFiles]);
        };

        return (
            <div className={cn('flex-1 col-flex ', className)} ref={ref}>
                {title && (
                    <div className='flex items-center justify-between'>
                        {' '}
                        <Typography
                            className={cn(
                                'text-xs text-base-primary mb-2 pl-2 mt-2 font-medium ',
                                titleClassName,
                                {
                                    'text-error': error,
                                }
                            )}
                        >
                            {title}{' '}
                            {required && <span className='text-error'>*</span>}
                        </Typography>
                        {rest?.rightLabel}
                    </div>
                )}
                <CommonFileUploader
                    onFileUpload={insertFiles}
                    {...rest}
                    maxFiles={5}
                    is_multiple={is_multiple}
                >
                    {({ uploading }) => {
                        return (
                            <div
                                className={cn(
                                    'row-flex text-xs border border-dashed items-center justify-between gap-4 p-4 bg-base-200 rounded',
                                    { 'cursor-pointer': !uploading }
                                )}
                            >
                                {uploading ? (
                                    <div className='text-base-tertiary'>
                                        Document Uploading ...
                                    </div>
                                ) : (
                                    <div className='text-info '>
                                        +Upload Documents
                                    </div>
                                )}
                                <div>Max file size: 5MB</div>
                            </div>
                        );
                    }}
                </CommonFileUploader>
                {error ? (
                    <Typography
                        variant='span'
                        className='text-xs font-normal label label-text-alt text-error'
                    >
                        {error}
                    </Typography>
                ) : null}

                {!!files?.length && (
                    <div className='gap-2 mt-2 col-flex'>
                        {(files || [])?.map((file, index) => {
                            return (
                                <UplodedFile
                                    key={`${file?.serverUrl}-${index}`}
                                    file={file}
                                    handleRemoveFile={() => {
                                        onRemoveFile(file, index);
                                    }}
                                    hideDelete={rest?.hideDelete}
                                    imageViwer={() =>
                                        openResourceViewerModal(files, file)
                                    }
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
);

export default SmallMultipleFileUploader;
