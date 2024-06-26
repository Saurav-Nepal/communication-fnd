import { EmptyFunction, parseToServerFileFormat } from '@finnoto/core';
import {
    CommonFileUploader,
    ConfirmUtil,
    Icon,
    Modal,
    Typography,
    cn,
} from '@finnoto/design-system';
import { SmallMultipleFileUploadInterface } from '@finnoto/design-system/src/Composites/Uploader/uploader.types';

import { openImageViewer } from '@Utils/functions.utils';
import { UploadFileSvgIcon } from 'assets';
import MobileUploadFile from './mobileUploadFile.component';

export const MobileMultipleFileUpload = ({
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
    ...rest
}: SmallMultipleFileUploadInterface) => {
    const onRemoveFile = (_, index: number, isPopup = true) => {
        const newFiles = files.filter((_, idx) => idx !== index);
        if (!isPopup) return onFileUpload(newFiles);
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
        <div className={cn('flex-1 gap-4 col-flex ', className)}>
            <CommonFileUploader
                onFileUpload={insertFiles}
                {...rest}
                maxFiles={5}
                is_multiple
            >
                {({ uploading }) => {
                    return (
                        <div
                            className={cn(
                                'col-flex rounded-lg gap-3 active:border-info active:border-2  h-[205px]  text-xs border border-dashed items-center justify-center  p-4 bg-base-200/50 ',
                                { 'cursor-pointer': !uploading }
                            )}
                        >
                            <Icon
                                iconColor='text-base-primary'
                                size={35}
                                source={UploadFileSvgIcon}
                                isSvg
                            />
                            <div className='items-center col-flex'>
                                <div className='text-sm font-medium text-base-primary'>
                                    {title || 'Select and upload file'}
                                </div>
                                <div className='text-xs col-flex text-base-secondary'>
                                    .jpeg .png .pdf and .xsl etc
                                </div>
                            </div>
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
                <div className='gap-3 mt-2 col-flex'>
                    <h2 className='text-base font-medium'>Uploaded Files</h2>
                    <div className='gap-2 col-flex'>
                        {(files || [])?.map((file, index) => {
                            return (
                                <MobileUploadFile
                                    hideDelete={rest?.hideDelete}
                                    key={`${file?.serverUrl}-${index}`}
                                    file={file}
                                    handleRemoveFile={() => {
                                        onRemoveFile(file, index);
                                    }}
                                    imageViwer={() =>
                                        openImageViewer(files, {
                                            initialImage: index,

                                            onClickToDelete: (data) => {
                                                onRemoveFile(
                                                    data,
                                                    index,
                                                    false
                                                );
                                                Modal.close();
                                            },
                                        })
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
