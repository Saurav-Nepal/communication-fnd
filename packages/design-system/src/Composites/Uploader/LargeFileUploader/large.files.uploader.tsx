import { UploadCloud } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';

import {
    fetchDocumentList,
    IsUndefined,
    parseToServerFileFormat,
    useApp,
} from '@finnoto/core';

import {
    Button,
    FileUpload,
    ModalBody,
    ModalContainer,
    ModalFooter,
    Progress,
    Typography,
} from '../../../Components';
import { FileDropRestOption } from '../../../Components/Inputs/FileUpload/fileUpload.types';
import { cn, EmptyFunction, IsFunction } from '../../../Utils/common.ui.utils';
import { generateSlug } from '../../Filter';
import { LargeFileUploadItem } from './large.file.upload.item';
import { FileState, LargeFileUploadInterface } from './large.files.types';
import { useLargeFileUploader } from './useLargeFileUploader.hook';

let signalControllers = [];

const onAbortApiRequest = () => {
    signalControllers.forEach((controller) => {
        controller?.abort();
    });
    signalControllers = [];
};
export const LargeFilesUploader = ({
    endpoint,
    source = 'business',
    headers,
    onFileUpload = EmptyFunction,
    children,
    btnSize,
    title,
    onUploadingFile,
    onSave,
    onSkip,
    isMultiple,
    ...rest
}: LargeFileUploadInterface) => {
    const uploadingCountRef = useRef<number>(0);

    const [files, setFiles] = useState<FileState[] | null>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[] | null>([]);
    const { upload: onUploadFile } = useLargeFileUploader(uploadingCountRef);

    const { toggleFormUpdated } = useApp();

    useEffectOnce(() => {
        // SubscribeToEvent({
        //     eventName: CANCEL_API_REQUEST,
        //     callback: onAbortApiRequest,
        // });
        // return () => {
        //     UnsubscribeEvent({
        //         eventName: CANCEL_API_REQUEST,
        //         callback: onAbortApiRequest,
        //     });
        // };
    });

    const updateFileProgress = useCallback(
        (slug: string, status: FileState['status'], percentage?: number) => {
            setFiles((fileStates) => {
                const newFileStates = structuredClone(fileStates);
                const fileState = newFileStates.find(
                    (fileState) => fileState.slug === slug
                );
                if (fileState) {
                    fileState.status = status;
                    if (!IsUndefined(percentage))
                        fileState.completedPercentage = percentage;
                }
                return newFileStates;
            });
        },
        []
    );

    const handleDropFile = useCallback(
        async (
            acceptedFiles: File[],
            nextUploading: () => void,
            { rejectedFiles, isLimitCrossed }: FileDropRestOption
        ) => {
            const sanitizedRejectedFiles = rejectedFiles.map(
                (rejected: any, i) => {
                    rejected.status = 'error';
                    rejected.slug = `${generateSlug(4)}-${
                        i + 1 + files?.length
                    }`;
                    return rejected;
                }
            );
            if (!isLimitCrossed && acceptedFiles?.length > 0) {
                const addedFiles = acceptedFiles.map((file: any, i) => {
                    return {
                        file,
                        slug: `${generateSlug(4)}-${i + 1 + files?.length}`,
                    };
                });

                setFiles([...files, ...sanitizedRejectedFiles, ...addedFiles]);
                toggleFormUpdated();
                await Promise.all(
                    addedFiles.map(async (file: FileState) => {
                        // const controller = new AbortController();
                        // signalControllers.push(controller);
                        try {
                            const res: any = await onUploadFile({
                                images: [file?.file],
                                resolve: true,
                                uploadFile: true,
                                source,
                                headers,
                                endpoint,
                                // signal: controller?.signal,
                                onProgressComplete: (percentage) => {
                                    if (percentage >= 100) {
                                        signalControllers.shift();
                                        updateFileProgress(
                                            file.slug,
                                            'completed'
                                        );
                                        return;
                                    }

                                    if (percentage > 0)
                                        updateFileProgress(
                                            file.slug,
                                            'pending',
                                            percentage
                                        );
                                },
                            });

                            onUploadingFile?.(
                                parseToServerFileFormat(res.pop())
                            );
                            return res;
                        } catch (err) {
                            updateFileProgress(file.slug, 'error');
                        }
                    })
                ).then((value) => {
                    toggleFormUpdated();
                    fetchDocumentList();
                    setUploadedFiles((prev) => [...prev, ...value]);
                });

                nextUploading();
            } else {
                setFiles([...files, ...sanitizedRejectedFiles]);
                nextUploading();
            }
        },
        [
            endpoint,
            files,
            headers,
            onUploadFile,
            onUploadingFile,
            source,
            toggleFormUpdated,
            updateFileProgress,
        ]
    );
    const errorsFiles = useMemo(
        () => files?.filter((file) => file?.status === 'error'),
        [files]
    );
    const completedPercentage = useMemo(() => {
        const completedFiles = files.filter(
            (file) => file?.status === 'completed'
        );
        const withOutError = Math.abs(files?.length - errorsFiles?.length);
        if (withOutError <= 0) return 0;

        return Math.round((completedFiles?.length / withOutError) * 100);
    }, [errorsFiles?.length, files]);

    return (
        <ModalContainer title={title}>
            <ModalBody className='w-full gap-4 col-flex'>
                <div className='h-[500px] overflow-hidden w-full gap-4 row-flex'>
                    <FileUpload
                        {...{ onDropFile: handleDropFile, ...rest }}
                        is_multiple={isMultiple ?? true}
                        maxFiles={rest?.maxFiles || 50}
                        wrapperClassName='h-full  flex-1'
                        className='flex-1 p-4 rounded bg-base-100'
                        disableRejectedToastError
                    >
                        {({ uploading }) => {
                            return (
                                <div
                                    className={cn(
                                        'items-center justify-center  h-full w-full p-6 transition-all border border-dashed rounded cursor-pointer    bg-base-200  col-flex',
                                        {
                                            'cursor-not-allowed': uploading,
                                            'hover:border-primary': !uploading,
                                        }
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'col-flex gap-6 bg-base-200 items-center justify-center ',
                                            {
                                                'cursor-none bg-base-200':
                                                    uploading,
                                            }
                                        )}
                                    >
                                        <UploadCloud
                                            className='text-base-secondary'
                                            size={48}
                                        />
                                        <div className='w-full text-center col-flex'>
                                            <Typography className='text-base font-medium text-base-primary'>
                                                Select a file or drag and drop
                                                here
                                            </Typography>
                                            <Typography className='text-sm text-base-tertiary'>
                                                {rest?.fileSupportText ||
                                                    'JPG,PNG or PDF'}
                                            </Typography>
                                            <Typography className='text-base-tertiary'>
                                                Maximum {rest?.maxFiles || 50}{' '}
                                                files allowed to upload
                                            </Typography>
                                            <Typography className='text-base-tertiary'>
                                                Maximum {rest?.maxSize || 5}
                                                {' MB '}
                                                file size allowed to upload
                                            </Typography>
                                        </div>
                                        <Button
                                            outline
                                            appearance='primary'
                                            size={btnSize}
                                            disabled={
                                                uploading ||
                                                files.length === rest.maxFiles
                                            }
                                            type='button'
                                            loading={uploading}
                                            loadingAppear='primary'
                                        >
                                            Select File
                                        </Button>
                                    </div>
                                </div>
                            );
                        }}
                    </FileUpload>
                    {files?.length > 0 && (
                        <div className='flex-1 h-[500px] overflow-y-auto rounded bg-base-100 col-flex'>
                            <div className=' bg-base-100 col-flex'>
                                <div className='items-center justify-between p-4 text-sm text-base-primary row-flex'>
                                    <div className='font-medium'>
                                        {files?.length} Documents Uploaded
                                    </div>
                                    <div className='font-medium'>
                                        {completedPercentage + '%'} Upload
                                        Completed
                                    </div>
                                </div>
                                <Progress
                                    value={completedPercentage}
                                    className='h-[6px] rounded-none'
                                    backgroundColor='base'
                                    indicatorColor='success'
                                />
                            </div>

                            <div className='h-full overflow-y-auto col-flex'>
                                {files?.map((file) => (
                                    <LargeFileUploadItem
                                        key={file.slug}
                                        status={file?.status}
                                        file={file?.file}
                                        errorMessage={file?.errorMessage}
                                        slug={file?.slug}
                                        completedPercentage={
                                            file?.completedPercentage
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </ModalBody>
            <ModalFooter className='items-center justify-between w-full sm:justify-between row-flex'>
                <div className='text-sm text-error'>
                    {errorsFiles?.length > 0 &&
                        `${errorsFiles?.length} Files Failed to Upload`}
                </div>

                <div className='flex flex-row gap-3'>
                    {IsFunction(onSkip) && (
                        <Button
                            outline
                            defaultMinWidth
                            onClick={() => onSkip?.()}
                        >
                            Skip
                        </Button>
                    )}

                    <Button
                        disabled={!files?.length || completedPercentage < 100}
                        defaultMinWidth
                        onClick={() => onSave?.(uploadedFiles)}
                    >
                        Done
                    </Button>
                </div>
            </ModalFooter>
        </ModalContainer>
    );
};
