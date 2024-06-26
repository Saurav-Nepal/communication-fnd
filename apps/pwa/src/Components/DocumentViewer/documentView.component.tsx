/* eslint-disable @next/next/no-img-element */
import { useCallback, useMemo } from 'react';

import {
    AccessManager,
    Ellipsis,
    EmptyFunction,
    FileData,
    FormatDisplayDate,
    GetFileDetails,
    IsEmptyArray,
    IsFunction,
    useUserHook,
} from '@finnoto/core';
import {
    cn,
    ConfirmUtil,
    Icon,
    IconButton,
    ResourceCarouselViewer,
} from '@finnoto/design-system';
import { handleDocumentIcon } from '@finnoto/design-system/src/Composites/Uploader/uploader.utils';

import { openImageViewer } from '@Utils/functions.utils';

import { DeleteSvgIcon } from 'assets';

const DocumentView = ({
    files,
    className,
    onDelete,
    onAddDocument = EmptyFunction,
}: {
    files: any[];
    className?: string;
    onDelete?: (id: number) => void;
    onAddDocument?: ({ files }: { files: FileData[] }) => void;
}) => {
    const { user } = useUserHook();

    const openConfirmDelete = (id: number) => {
        ConfirmUtil({
            title: 'Do you want to delete?',
            message: 'The action you are about to perform is irreversible.',
            iconAppearance: 'error',
            icon: DeleteSvgIcon,
            onConfirmPress: () => {
                onDelete(id);
            },
            confirmAppearance: 'error',
        });
    };

    const getFileDetails = useCallback((file: any) => {
        return file?.document_url
            ? GetFileDetails(file.document_url)
            : ({} as any);
    }, []);

    const { readableFiles, unreadableFiles } = useMemo(() => {
        let unreadableFiles = [];
        const readableFiles = [];

        for (let file of files) {
            const fileDetails = getFileDetails(file);
            if (
                fileDetails.mimeType.startsWith('image') ||
                fileDetails.mimeType.includes('pdf')
            ) {
                readableFiles.push(file);
            } else unreadableFiles.push(file);
        }

        return { readableFiles, unreadableFiles };
    }, [files, getFileDetails]);

    return (
        <div
            className={cn(
                'h-full gap-3 col-flex my-3  mx-4 overflow-y-auto ',
                className
            )}
        >
            {IsEmptyArray(files) ? (
                <ResourceCarouselViewer
                    className='px-2'
                    title={null}
                    files={files}
                    onHandleUpload={(files) => {
                        onAddDocument({ files });
                    }}
                />
            ) : (
                <>
                    {readableFiles?.map((file, idx, files) => {
                        return (
                            <Viewer
                                key={file?.id}
                                {...{
                                    file,
                                    onDelete:
                                        IsFunction(onDelete) && files.length > 1
                                            ? openConfirmDelete
                                            : null,
                                    onOpen: () =>
                                        openImageViewer(readableFiles, {
                                            initialImage: idx,
                                            addedAt: file?.created_at,
                                            addedBy: file?.creator?.name,
                                            popUpOff: true,
                                        }),
                                }}
                            />
                        );
                    })}
                </>
            )}
            <UnreadFiles
                files={unreadableFiles}
                onHandleDelete={
                    IsFunction(onDelete) && files.length > 1
                        ? openConfirmDelete
                        : null
                }
                user={user}
            />
        </div>
    );
};

const UnreadFiles = ({ files = [], onHandleDelete, user }: any) => {
    if (!files?.length) return <></>;
    return (
        <div className='gap-4 col-flex'>
            {files.map((file) => {
                return (
                    <UnreadFileItem
                        key={file?.id}
                        {...{ data: file, user, onHandleDelete }}
                    />
                );
            })}
        </div>
    );
};

const UnreadFileItem = ({
    data,
    isDelete = true,
    user,
    onHandleDelete,
}: any) => {
    const isDeleteOptionShow = useMemo(() => {
        if (!isDelete) return false;
        let activeFile: any = data;

        if (activeFile?.created_by === user?.id) return true;
        return !activeFile?.attributes?.no_edit;
    }, [data, isDelete, user?.id]);
    const name = GetFileDetails(data.document_url || '').name;
    return (
        <div className='gap-2 p-3 rounded col-flex bg-base-100'>
            <div className='justify-between gap-4 row-flex'>
                <div className='items-center gap-2 row-flex'>
                    <Icon
                        source={handleDocumentIcon(data.document_url)}
                        isSvg
                        size={24}
                        iconColor='text-base-tertiary'
                        className='mt-1'
                    />
                    <h5 className='text-sm'>
                        {data?.attributes?.comments ||
                            data?.comments ||
                            'No comments Added'}
                    </h5>
                </div>
                <div className='items-center gap-2 row-flex'>
                    {isDeleteOptionShow && IsFunction(onHandleDelete) && (
                        <IconButton
                            icon={DeleteSvgIcon}
                            appearance='error'
                            size='sm'
                            className={
                                'text-error hover:bg-error hover:text-white transition-all'
                            }
                            outline
                            shape='square'
                            onClick={() =>
                                IsFunction(onHandleDelete) &&
                                onHandleDelete(data?.id)
                            }
                        />
                    )}
                </div>
            </div>
            <div className='gap-1 text-xs col-flex text-base-secondary'>
                <span> {Ellipsis({ text: name })}</span>
                {/* <span className='block w-1 h-1 rounded-full bg-base-300'></span> */}

                <span>
                    Added At :{' '}
                    {FormatDisplayDate(data.created_at || new Date(), true)}
                </span>
            </div>
        </div>
    );
};

const Viewer = ({ file, onDelete, onOpen = () => {} }) => {
    const { user } = useUserHook();
    const fileDetails = GetFileDetails(file.document_url);
    const isDeleteOptionShow = useMemo(() => {
        if (!IsFunction(onDelete)) return false;
        if (AccessManager.hasRoleIdentifier('ua_document_manager')) return true;
        let activeFile: any = file;
        if (activeFile?.attributes?.no_edit) return false;
        if (!activeFile?.created_by) return true;
        return [user?.business?.owner_id, user?.id].includes(
            activeFile?.created_by
        );
    }, [file, onDelete, user?.business?.owner_id, user?.id]);

    return (
        <div className='gap-3 p-3 border rounded-lg border-base-300/50 col-flex bg-base-100 '>
            <div
                className={cn('flex gap-1', {
                    'items-center': !(
                        file.attributes.comments || file?.comments
                    ),
                })}
            >
                <div
                    className={cn(
                        'flex-1 font-medium caption-bottom mt-1 capitalize text-sm'
                    )}
                >
                    {file.attributes.comments || 'No Comments Added'}
                </div>
                {isDeleteOptionShow && (
                    <IconButton
                        icon={DeleteSvgIcon}
                        size='sm'
                        outline
                        appearance='error'
                        onClick={() => onDelete(file?.id)}
                    />
                )}
            </div>
            <div
                className='overflow-hidden border h-[300px] rounded'
                onClick={onOpen}
            >
                {fileDetails.mimeType &&
                fileDetails.mimeType.startsWith('image') ? (
                    <img
                        className='object-contain w-full h-full bg-base-200'
                        src={file?.document_url}
                        alt='data'
                    />
                ) : (
                    <Icon
                        source={handleDocumentIcon(file.document_url)}
                        isSvg
                        size={64}
                        className='h-full'
                        iconColor='text-base-tertiary '
                    />
                )}
            </div>
            <div className='text-sm col-flex'>
                <span className='font-medium'>
                    {Ellipsis({ text: file?.attributes?.name, length: 50 })}
                </span>
                <p className='flex flex-wrap items-center gap-1.5 text-xs '>
                    {/* <span className='inline-block w-2 h-2 rounded bg-base-300'></span> */}
                    {file?.creator?.name && (
                        <>
                            <span>{file?.creator?.name}</span>
                            <span className='inline-block w-1 h-1 bg-black rounded dark:bg-base-100'></span>
                        </>
                    )}

                    <span>
                        {FormatDisplayDate(
                            file?.created_at || new Date(),
                            true
                        )}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DocumentView;
