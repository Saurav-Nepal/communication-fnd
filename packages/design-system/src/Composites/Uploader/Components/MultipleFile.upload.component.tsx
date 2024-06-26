'use client';

import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { parseToServerFileFormat } from '@finnoto/core';

import { Icon } from '../../../Components/Data-display/Icon/icon.component';
import { Typography } from '../../../Components/Data-display/Typography/typography.component';
import { Button } from '../../../Components/Inputs/Button/button.component';
import { Label } from '../../../Components/Inputs/InputField/label.component';
import { ConfirmUtil } from '../../../Utils';
import { cn, EmptyFunction } from '../../../Utils/common.ui.utils';
import { MultipleFileUploadInterface } from '../uploader.types';
import { openResourceViewerModal } from '../uploader.utils';
import { CommonFileUploader } from './commonFileUploader.component';
import { UplodedFile } from './uploadFile.component';

import { UploadIcon } from 'assets';

export const MultipleFileUploader = ({
    btnSize = 'sm',
    defaultValueShow,
    ellipse_length = 25,
    title,
    className,
    titleClassName,
    isHideFiles,
    value,
    error,
    onFileUpload = EmptyFunction,
    maxFiles,
    is_multiple = true,
    supportedFileText = 'JPG,PNG or PDF',
    showButton = true,
    ...rest
}: MultipleFileUploadInterface) => {
    const [files, setFiles] = useState(value || []);

    useUpdateEffect(() => {
        onFileUpload(files);
    }, [files]);

    const onRemoveFile = (_, index: number) => {
        const newFiles = files.filter((_, idx) => idx !== index);

        ConfirmUtil({
            title: 'Do you want to delete?',
            message: 'The action you are about to perform is irreversible.',
            confirmText: 'Yes',
            confirmAppearance: 'error',
            onConfirmPress: () => {
                setFiles(newFiles);
            },
        });
    };

    const insertFiles = (value) => {
        const newFiles = (value || [])?.map((file) =>
            parseToServerFileFormat(file)
        );

        setFiles((prev) => {
            return [...prev, ...newFiles];
        });
    };

    return (
        <div className={cn('flex-1 col-flex ', className)}>
            <div className='text-sm col-flex'>
                {title && <Label label={title} />}
                <CommonFileUploader
                    onFileUpload={insertFiles}
                    {...rest}
                    maxFiles={maxFiles || 5}
                    is_multiple={is_multiple}
                >
                    {({ uploading }) => {
                        return (
                            <div
                                className={cn(
                                    'items-center cursor-pointer justify-center h-full gap-4 p-4 py-6 border border-dashed border-base-300 bg-base-100 col-flex',
                                    {
                                        'cursor-none bg-base-200': uploading,
                                    }
                                )}
                            >
                                <Icon source={UploadIcon} isSvg size={30} />
                                <div className='w-full text-sm text-center col-flex'>
                                    <Typography className='text-base-primary'>
                                        Select a file or drag and drop here
                                    </Typography>
                                    <Typography className='text-base-tertiary'>
                                        {supportedFileText}
                                    </Typography>
                                    <Typography className='text-base-tertiary'>
                                        Maximum{' '}
                                        {is_multiple ? maxFiles || 5 : 1} files
                                        allowed to upload
                                    </Typography>
                                </div>
                                {showButton && (
                                    <Button
                                        outline
                                        appearance='primary'
                                        size={btnSize}
                                        disabled={uploading}
                                        type='button'
                                        loading={uploading}
                                    >
                                        Select File
                                    </Button>
                                )}
                            </div>
                        );
                    }}
                </CommonFileUploader>
                {error ? (
                    <Typography
                        variant='span'
                        className='label label-text-alt text-error'
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
        </div>
    );
};
