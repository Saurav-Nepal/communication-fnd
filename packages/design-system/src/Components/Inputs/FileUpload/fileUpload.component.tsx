/**
 * @author Sirjan Tamang
 */

'use client';

import { ReactNode, useCallback, useState } from 'react';
import {
    DropzoneInputProps,
    DropzoneRootProps,
    ErrorCode,
    FileRejection,
    useDropzone,
} from 'react-dropzone';

import { UploadIcon } from '../../../../../assets';
import { Toast } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Loading } from '../../Data-display/Loading/loading.component';
import { Typography } from '../../Data-display/Typography/typography.component';
import { FileUploadInterface, RenderTitleInterface } from './fileUpload.types';

/**
 * FileUpload component for uploading files.
 * @param {Object} props - The component props.
 * @param {string} [props.title='Upload Files'] - The title of the file upload component for default case.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {number} [props.maxFiles=5] - The maximum number of files allowed to be uploaded.
 * @param {number} [props.maxSize] - The maximum size of each file in bytes.
 * @param {Object} [props.accept] - The accepted file types with corresponding extensions.
 * @param {ReactNode} [props.children] - The content to render inside the file upload component.
 * @param {boolean} [props.is_multiple] - Whether multiple files can be uploaded at once.
 * @param {boolean} [props.disabled=false] - Whether the file upload is disabled.
 * @param {Function} props.onDropFile - The function to handle the dropped files.
 * @param {ReactNode} [props.icon] - The custom icon to render in the file upload component.
 * @param {boolean} [props.autoFocus] - Whether the file upload component should be auto-focused.
 * @param {boolean} [props.noDrag] - Whether the file upload component should disable drag and drop functionality.
 * @returns {ReactNode} The rendered FileUpload component.
 */
export const FileUpload = ({
    title = 'Upload Files',
    className,
    maxFiles = 5,
    maxSize = 5,
    accept = {
        'image/jpeg': [],
        'image/png': [],
        'application/pdf': [],
        'application/rtf': [],
        'application/docx': [],
        'application/msword': [], // .doc file
        'application/vnd.ms-excel': [], // .xls file
        'application/vnd.ms-powerpoint': [], // .ppt file
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], // for .xlsx file
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            [], // .docx file
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            [], // .pptx file
        'text/csv': [],
        'text/plain': [],
        // 'xls/xlsx/csv': [],
    },
    children,
    is_multiple,
    disabled = false,
    onDropFile,
    icon,
    autoFocus,
    noDrag,
    wrapperClassName,
    disableRejectedToastError,

    ...rest
}: FileUploadInterface) => {
    const MAX_SIZE = getFileSizeInBits(maxSize); // 5 MB

    const [uploading, setUploading] = useState(false);

    const nextUploading = useCallback(() => setUploading(false), []);

    const onDrop = async (
        acceptedFiles: any[],
        fileRejections: FileRejection[]
    ) => {
        setUploading(true);

        let isLimitCrossed: boolean = false;
        const rejectedFilesWithFormatErrors: any = [];
        if (fileRejections.length > 0) {
            fileRejections.forEach((rejected: any) => {
                rejected?.errors.forEach((error) => {
                    let errorMessage;
                    if (error.code === ErrorCode.FileInvalidType) {
                        errorMessage = `File "${rejected.file.name}" is not supported!`;
                    } else if (error.code === ErrorCode.FileTooLarge) {
                        errorMessage = `File "${
                            rejected.file.name
                        }" is larger than ${convertFileSizeBitToMB(
                            MAX_SIZE
                        )} MB`;
                    } else if (error.code === ErrorCode.TooManyFiles) {
                        isLimitCrossed = true;
                    } else
                        errorMessage = `Something went wrong uploading "${rejected.file.name}" file.`;
                    if (!disableRejectedToastError && !isLimitCrossed)
                        Toast.error({
                            description: errorMessage,
                        });
                    rejectedFilesWithFormatErrors.push({
                        file: rejected?.file,
                        errorMessage,
                    });
                });
            });
        }

        if (isLimitCrossed) {
            Toast.error({
                description: `Too many files (Limit: ${maxFiles})`,
            });
        }

        onDropFile(acceptedFiles, nextUploading, {
            rejectedFiles: rejectedFilesWithFormatErrors,
            isLimitCrossed,
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: is_multiple,
        accept,
        maxFiles: is_multiple ? maxFiles : 1,
        maxSize: MAX_SIZE,
        disabled: disabled || uploading,
        onDrop,
        autoFocus,
        noDrag,
        ...rest,
    });

    return (
        <div className={cn('gap-2 col-flex', className)}>
            {children ? (
                <div {...getRootProps()} className={wrapperClassName}>
                    {children({ uploading })}
                    <input {...getInputProps()} name={rest?.name} />
                </div>
            ) : (
                <DefaultFileUpload
                    {...{
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        uploading,
                        icon,
                        title,
                    }}
                />
            )}
        </div>
    );
};
export const getFileSizeInBits = (fileSize: number): number =>
    fileSize * 1024 * 1024; // fileSize in MB
export const convertFileSizeBitToMB = (fileSize: number): number =>
    fileSize / (1024 * 1024); // fileSize in MB
const DefaultFileUpload = ({
    getRootProps,
    getInputProps,
    isDragActive,
    uploading,
    icon,
    title,
}: {
    getRootProps?: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps?: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
    uploading: boolean;
    icon: ReactNode;
    title?: string | React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'items-center justify-center  border-dashed h-32 text-sm  border-color-100 rounded border  flex flex-col',
                {
                    'bg-base-100 text-base-secondary hover:text-base-primary hover:border-primary transition-colors cursor-pointer':
                        !uploading,
                    ' bg-base-200 cursor-none': uploading,
                }
            )}
            {...getRootProps()}
        >
            <RenderIcon {...{ uploading, icon }} />
            <UploadingImage {...{ uploading }} />
            <input {...getInputProps()} />
            <RenderTitle {...{ uploading, title, isDragActive }} />
        </div>
    );
};

const RenderIcon = ({
    uploading,
    icon,
}: {
    uploading?: boolean;
    icon?: ReactNode;
}) => {
    if (uploading) return <></>;
    if (icon) return <>{icon}</>;
    return (
        <Icon source={UploadIcon} isSvg size={24} iconColor='text-current' />
    );
};

const UploadingImage = ({ uploading }: { uploading?: boolean }) => {
    return uploading ? (
        <div className='items-center gap-2 col-flex'>
            <Typography variant='span' className='text-primary'>
                <Loading color='neutral' size='sm' />
            </Typography>
            <Typography variant='span' className='text-base-secondary'>
                Uploading...
            </Typography>
        </div>
    ) : (
        <></>
    );
};

const RenderTitle = ({
    uploading,
    title,
    isDragActive,
}: RenderTitleInterface) => {
    if (uploading) return <></>;
    if (!isDragActive) return <>{title || null}</>;
    return (
        <Typography variant='span' className='text-disabled-100'>
            Drop here
        </Typography>
    );
};
