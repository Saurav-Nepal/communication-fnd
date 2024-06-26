'use client';

import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { useUpdateEffect } from 'react-use';

import {
    AccessManager,
    FileUploadSource,
    GetFileDetails,
    ObjectDto,
    parseToServerFileFormat,
    useApp,
    useUserHook,
} from '@finnoto/core';

import { CommonFileUploader } from '../../../Composites/Uploader/Components/commonFileUploader.component';
import { Modal } from '../../../Utils';
import {
    cn,
    EmptyFunction,
    IsEmptyArray,
} from '../../../Utils/common.ui.utils';
import { ConfirmModal } from '../../Dialogs/ConfirmModal/confirmModal.component';
import { Button } from '../../Inputs/Button/button.component';
import { IconButton } from '../../Inputs/Icon-Button/iconButton.component';
import { ListingCardDocument } from '../../Surfaces/Cards/listCardDocumentList.component';
import { ImageViewer } from '../ImageViewer/Imageviewer.component';
import { ResourceFilesProps, ResourceViewer } from './resourceViewer.component';
import { openImageCropper } from './resourceViewer.utils';

import {
    ArrowRightSvgIcon,
    DeleteSvgIcon,
    DocumentViewSvgIcon,
    EditSvgIcon,
    FileDownloadSvgIcon,
    fullSizeView,
    TableViewExpensesSvgIcon,
    ZoomSvgIcon,
} from 'assets';

export const ResourceCarouselViewer = forwardRef(
    (
        {
            files,
            className = '',
            noDocumentActionComponent = null,
            actionComponent = () => null,
            onActiveIndexChange = () => {},
            title = 'Documents',
            onHandleUpload = EmptyFunction,
            onHandleEdit = EmptyFunction,
            onHandleDelete = EmptyFunction,
            showHeader = true,
            isEdit = false,
            isFullView = false,
            isDelete = false,
            isCrop = false,
            hideUpload = false,
            disableZoom = false,
            documentClassName = '',
            source,
            headerClassName,
            resourceViewerClassName,
            titleClassName,
            tableViewClassName,
        }: {
            files: ResourceFilesProps[];
            className?: string;
            actionComponent?: (props: {
                activeIndex: number;
                fileDetails: {
                    name: string;
                    extension: string;
                    mimeType: string | false;
                };
                fileUrl: string;
            }) => React.ReactNode;
            noDocumentActionComponent?: React.ReactNode;
            onActiveIndexChange?: (index: number) => void;
            title?: string;
            onHandleUpload?: (files: any) => void;
            onHandleEdit?: (files: any, activeFile: ObjectDto) => void;
            onHandleFullView?: (files: any) => void;
            onHandleDelete?: (
                files: any,
                index: number,
                activeFile?: ObjectDto
            ) => void;
            showHeader?: boolean;
            isFullView?: boolean;
            isEdit?: boolean;
            isDelete?: boolean;
            isCrop?: boolean;
            hideUpload?: boolean;
            disableZoom?: boolean;
            documentClassName?: string;
            source?: FileUploadSource;
            headerClassName?: string;
            resourceViewerClassName?: string;
            titleClassName?: string;
            tableViewClassName?: string;
        },
        ref
    ) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [zoomEffect, setZoomEffect] = useState<boolean>(false);
        const [tableView, setTableView] = useState(false);

        const { user } = useUserHook();
        const { isArc } = useApp();
        /**
         * Deletes the currently active file from the list of files and opens a confirmation modal to confirm the delete action.
         */
        const handleDeleteFile = (
            currentIndex?: number,
            fileList?: ResourceFilesProps[]
        ) => {
            const newFiles = [...(fileList || files || [])].filter(
                (_, idx) => idx !== (currentIndex || activeIndex)
            );

            Modal.open({
                modalSize: 'sm',
                component: () =>
                    ConfirmModal({
                        title: 'Do you want to delete this document?',
                        message: 'This action can’t be undone',
                        icon: DeleteSvgIcon,
                        iconAppearance: 'error',
                        actions: [
                            {
                                actionText: 'Yes',
                                appearance: 'error',
                                actionClick: () => {
                                    const activeFile =
                                        files[currentIndex || activeIndex];

                                    onHandleDelete(
                                        newFiles,
                                        currentIndex || activeIndex,
                                        activeFile
                                    );

                                    Modal.close();
                                },
                            },
                            {
                                actionText: 'No',
                                actionClick: () => Modal.close(),
                                appearance: 'base',
                            },
                        ],
                    }),
            });
        };

        const openImageEdit = () => {
            const activeFileId = (files[activeIndex] as any).id;

            openImageCropper(
                files[activeIndex]?.document_url || null,
                { rotatable: true },
                (file) => {
                    const newFile = {
                        ...file,

                        document_url: file.serverUrl,
                        attributes: {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                        },
                    };

                    const newFiles = [...(files || [])];
                    newFiles[activeIndex] = newFile;
                    let rest_params = {};
                    if (activeFileId) {
                        rest_params['id'] = activeFileId;
                    }

                    onHandleEdit(newFiles, { ...newFile, ...rest_params });
                }
            );
        };

        const fileDetails = useMemo(
            () =>
                files && files[activeIndex]?.document_url
                    ? GetFileDetails(files[activeIndex].document_url)
                    : ({} as any),
            [activeIndex, files]
        );

        useUpdateEffect(() => {
            if (activeIndex <= files.length - 1) return;
            setActiveIndex(0);
        }, [files]);

        useUpdateEffect(() => {
            onActiveIndexChange(activeIndex);
        }, [activeIndex]);

        const goTo = (index: number) => {
            setActiveIndex(index);
        };

        const goToNext = useCallback(() => {
            let newIndex = activeIndex + 1;
            if (newIndex > files.length - 1) return;
            setActiveIndex(newIndex);
        }, [files, activeIndex]);

        const goToPrev = useCallback(() => {
            let newIndex = activeIndex - 1;
            if (newIndex < 0) return;
            setActiveIndex(newIndex);
        }, [activeIndex]);

        const goToFirst = () => {
            setActiveIndex(0);
        };

        const goToLast = useCallback(() => {
            setActiveIndex(files.length - 1);
        }, [files]);

        useImperativeHandle(
            ref,
            () => ({
                goTo,
                goToFirst,
                goToLast,
                goToNext,
                goToPrev,
            }),
            [goToLast, goToNext, goToPrev]
        );

        const isDeleteOptionShow = useMemo(() => {
            if (!isDelete) return false;
            let activeFile: any = files[activeIndex];
            if (activeFile?.attributes?.no_delete) return false;
            if (AccessManager.hasRoleIdentifier('ua_document_manager'))
                return true;
            if (activeFile?.attributes?.no_edit) return false;
            if (!activeFile?.created_by) return true;
            return [user?.business?.owner_id, user?.id].includes(
                activeFile?.created_by
            );
        }, [activeIndex, files, isDelete, user?.business?.owner_id, user?.id]);

        const isZoomEnabled = useMemo(() => {
            if (!files.length || disableZoom) return false;

            return !fileDetails?.mimeType?.includes('pdf');
        }, [disableZoom, fileDetails?.mimeType, files.length]);

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
                    fileDetails?.mimeType?.startsWith('image') ||
                    fileDetails?.mimeType?.includes('pdf')
                ) {
                    readableFiles.push(file);
                } else unreadableFiles.push(file);
            }
            return { readableFiles, unreadableFiles };
        }, [files, getFileDetails]);

        const isReadableFilesShow = useMemo(() => {
            if (!files?.length) return true;
            return !tableView && readableFiles?.length > activeIndex;
        }, [activeIndex, files?.length, readableFiles?.length, tableView]);

        const isUnreadableFileShows = useMemo(() => {
            if (tableView) return false;
            return (
                activeIndex > readableFiles?.length - 1 &&
                files?.length > activeIndex
            );
        }, [activeIndex, files?.length, readableFiles?.length, tableView]);

        const totalPagination = useMemo(() => {
            if (unreadableFiles?.length) return readableFiles?.length + 1;
            return readableFiles?.length;
        }, [readableFiles?.length, unreadableFiles?.length]);

        const buttonAppearance = useMemo(
            () => (isArc ? 'polaris-tertiary' : 'primary'),
            [isArc]
        );

        const buttonSize = useMemo(() => (isArc ? 'md' : 'sm'), [isArc]);

        return (
            <div
                className={cn(
                    'h-full relative gap-4 overflow-hidden col-flex',
                    className
                )}
            >
                {showHeader && (
                    <div
                        className={cn(
                            'justify-between gap-2 row-flex',
                            headerClassName
                        )}
                    >
                        <div
                            className={cn(
                                'font-medium text-base-primary',
                                {
                                    'flex items-center': isArc,
                                },
                                titleClassName
                            )}
                        >
                            {title}
                        </div>

                        <div className='items-center gap-2 row-flex'>
                            {!hideUpload && !!files?.length && (
                                <CommonFileUploader
                                    onFileUpload={(files) => {
                                        let newFiles = files.map((file) =>
                                            parseToServerFileFormat(file)
                                        );

                                        onHandleUpload(newFiles);
                                    }}
                                    source={source}
                                    is_multiple
                                >
                                    {({ uploading }) => (
                                        <Button
                                            size={buttonSize}
                                            outline
                                            appearance={buttonAppearance}
                                            defaultMinWidth
                                            disabled={uploading}
                                            loading={uploading}
                                        >
                                            + Upload Document
                                        </Button>
                                    )}
                                </CommonFileUploader>
                            )}
                            {actionComponent({
                                activeIndex: IsEmptyArray(files)
                                    ? -1
                                    : activeIndex,
                                fileDetails,
                                fileUrl:
                                    files[activeIndex]?.document_url || null,
                            })}
                            {files?.length > 0 && isFullView && (
                                <IconButton
                                    name={'Full View'}
                                    icon={fullSizeView}
                                    onClick={() => {
                                        openFullViewImage(files, activeIndex);
                                    }}
                                    shape='square'
                                    size={buttonSize}
                                    outline
                                    appearance={buttonAppearance}
                                />
                            )}
                            {files?.length > 0 && (
                                <IconButton
                                    name={
                                        tableView
                                            ? 'Document View'
                                            : 'Table View'
                                    }
                                    icon={
                                        tableView
                                            ? DocumentViewSvgIcon
                                            : TableViewExpensesSvgIcon
                                    }
                                    onClick={() => {
                                        setTableView((prev) => !prev);
                                    }}
                                    shape='square'
                                    size={buttonSize}
                                    outline
                                    appearance={buttonAppearance}
                                />
                            )}

                            {files?.length > 0 && !tableView && (
                                <>
                                    {isEdit &&
                                        isCrop &&
                                        ['jpg', 'jpeg', 'png'].includes(
                                            fileDetails.extension
                                        ) && (
                                            <IconButton
                                                name='Edit'
                                                icon={EditSvgIcon}
                                                shape='square'
                                                size={buttonSize}
                                                outline
                                                appearance={buttonAppearance}
                                                onClick={openImageEdit}
                                            />
                                        )}

                                    {isZoomEnabled && (
                                        <IconButton
                                            name='Zoom'
                                            icon={ZoomSvgIcon}
                                            onClick={() =>
                                                setZoomEffect(!zoomEffect)
                                            }
                                            shape='square'
                                            size={buttonSize}
                                            outline={!zoomEffect}
                                            appearance={buttonAppearance}
                                        />
                                    )}

                                    <IconButton
                                        name='Download'
                                        icon={FileDownloadSvgIcon}
                                        onClick={() => {
                                            window.location = files[activeIndex]
                                                ?.document_url as any;
                                        }}
                                        shape='square'
                                        size={buttonSize}
                                        outline
                                        appearance={buttonAppearance}
                                    />

                                    {isDeleteOptionShow && (
                                        <IconButton
                                            name='Delete'
                                            icon={DeleteSvgIcon}
                                            onClick={() => handleDeleteFile()}
                                            shape='square'
                                            size={buttonSize}
                                            outline
                                            appearance='error'
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
                {/* TODO: Enable after documents list done */}
                {tableView && files?.length > 0 && (
                    <TableViewDocument
                        data={files}
                        onDeleteDocument={(fileList, index) => {
                            handleDeleteFile(index, fileList);
                        }}
                        isDelete={isDelete}
                        addDocument={(files) => {
                            onHandleUpload(files);
                        }}
                        className={tableViewClassName}
                    />
                )}
                {isReadableFilesShow && (
                    <ResourceViewer
                        className={cn('flex-1', resourceViewerClassName)}
                        zoomEnabled={zoomEffect && isZoomEnabled}
                        file={readableFiles[activeIndex] || null}
                        noDocumentActionComponent={noDocumentActionComponent}
                        hideUpload={hideUpload}
                        onUploadDocument={
                            !hideUpload && files?.length <= 0
                                ? onHandleUpload
                                : EmptyFunction
                        }
                        documentClassName={documentClassName}
                    />
                )}
                {isUnreadableFileShows && (
                    <TableViewDocument
                        data={unreadableFiles}
                        onDeleteDocument={(fileList, index) =>
                            handleDeleteFile(index, fileList)
                        }
                        isDelete={isDelete}
                        addDocument={(files) => {
                            onHandleUpload(files);
                        }}
                        className={tableViewClassName}
                    />
                )}

                {files?.length > 1 && !tableView && (
                    <div className='absolute z-10 gap-2 bottom-6 right-8 row-flex '>
                        <IconButton
                            iconClass='rotate-180'
                            icon={ArrowRightSvgIcon}
                            shape='square'
                            size='sm'
                            outline
                            appearance='primary'
                            onClick={goToPrev}
                            disabled={activeIndex === 0}
                            data-title={'resource_pagination_prev'}
                        />
                        {files?.length ? (
                            <div
                                data-title='resource_pagination'
                                className='items-center justify-center h-8 px-3 text-sm rounded row-flex bg-base-100'
                            >
                                {`${activeIndex + 1}/${totalPagination}`}
                            </div>
                        ) : null}

                        <IconButton
                            icon={ArrowRightSvgIcon}
                            shape='square'
                            size='sm'
                            outline
                            appearance='primary'
                            onClick={goToNext}
                            disabled={activeIndex === readableFiles?.length}
                            data-title={'resource_pagination_next'}
                        />
                    </div>
                )}
            </div>
        );
    }
);

export const TableViewDocument = ({
    data = [],
    addDocument,
    onDeleteDocument,
    isDelete = true,
    className,
}: any) => {
    return (
        <div
            className={cn('h-full gap-4 overflow-hidden col-flex ', className)}
        >
            {data.map((item, index) => {
                return (
                    <ListingCardDocument
                        key={item?.id}
                        data={item}
                        addDocument={addDocument}
                        onHandleDelete={() => onDeleteDocument(data, index)}
                        isDelete={isDelete}
                    />
                );
            })}
        </div>
    );
};

export const openFullViewImage = (
    files: ResourceFilesProps[],
    index: number
) => {
    Modal.open({
        component: ImageViewer,
        modalSize: 'full',
        className: 'bg-black/60',
        closeClassName: 'text-white',
        props: {
            images: files,
            initialImage: index,
            zoomIn: true,
        },
    });
};
