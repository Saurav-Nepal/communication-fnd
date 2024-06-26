'use client';

import { useMemo, useState } from 'react';

import { GetFileDetails, parseToServerFileFormat } from '@finnoto/core';

import { CommonFileUploader } from '../../../Composites/Uploader/Components/commonFileUploader.component';
import { handleDocumentIcon } from '../../../Composites/Uploader/uploader.utils';
import { cn } from '../../../Utils/common.ui.utils';
import { Button } from '../../Inputs/Button/button.component';
import { Icon } from '../Icon/icon.component';
import { ImageZoomViewer } from './Components/imageZoomViewer.component';
import { PdfViewer } from './Components/pdfViewer.component';

import { BigNoDocumentSvgIcon } from 'assets';

interface ResourceViewerProps {
    file: ResourceFilesProps;
    className?: string;
    noDocumentActionComponent?: React.ReactNode;
    children?: React.ReactNode;
    zoomEnabled?: boolean;
    onUploadDocument?: (files: any) => void;
    hideUpload?: boolean;
    documentClassName?: string;
    noDataFounds?: {
        hideDescription?: boolean;
    };
}

export interface ResourceFilesProps {
    document_url: string;
    attributes?: {
        name?: string;
        size?: number;
        type?: string;
    };
}

/**
 * Renders a view for a given resource file, including functionality for zooming in on image and PDF files.
 *
 * @param {Object} ResourceViewerProps - An object containing props for the ResourceViewer component, including:
 *  - className: string representing additional CSS classes for the main container
 *  - noDocumentActionComponent: optional React component to render when no document is found
 *  - file: object representing the resource file to view
 *  - children: optional React children to render within the main container
 *  - zoomEnabled: optional boolean indicating whether zooming is enabled (default true)
 *  - onUploadDocument: optional function to handle document upload
 * @return {JSX.Element} The React component for rendering the resource viewer
 *
 * @author Rumesh Udash
 */
export const ResourceViewer = ({
    className,
    noDocumentActionComponent,
    file,
    children,
    zoomEnabled = true,
    onUploadDocument,
    hideUpload,
    documentClassName,
    noDataFounds,
}: ResourceViewerProps) => {
    const allowedFiles = ['image/jpeg', 'image/png', 'application/pdf'];
    const [zoomScale, setZoomScale] = useState(1);
    const containerClassNames = cn(
        'h-full p-3 border rounded-md relative bg-base-200 overflow-hidden max-h-fill border-base-300',
        className
    );

    const fileDetails = useMemo(
        () =>
            file?.document_url
                ? GetFileDetails(file.document_url)
                : ({} as any),
        [file]
    );
    const renderViewer = () => {
        if (!fileDetails.mimeType) return null;
        if (fileDetails.mimeType.startsWith('image')) {
            return (
                <ImageZoomViewer
                    imgSrc={file.document_url}
                    zoomScale={zoomEnabled ? zoomScale : 1}
                />
            );
        }
        if (fileDetails.mimeType.includes('pdf')) {
            return (
                <PdfViewer
                    key={file?.document_url}
                    fileUrl={file.document_url}
                    zoomScale={1}
                    documentClassName={documentClassName}
                />
            );
        }
        return null;
    };

    if (!file)
        return (
            <NoDocumentFound
                noDocumentActionComponent={noDocumentActionComponent}
                onUploadDocument={onUploadDocument}
                hideUploadBtn={hideUpload}
                hideDescription={noDataFounds?.hideDescription}
            />
        );

    if (!allowedFiles.includes(fileDetails.mimeType))
        return (
            <div className={containerClassNames}>
                Cannot preview, to download{' '}
                <a
                    className='link link-hover'
                    href={file?.document_url}
                    download={fileDetails.name}
                >
                    click here
                </a>
            </div>
        );

    return (
        <div className={containerClassNames}>
            {file && (
                <div
                    className={cn(
                        'absolute left-0 right-0 -top-1 z-20 flex items-center justify-center h-20 bottom-0 gap-4 p-1 bg-resource-view'
                    )}
                >
                    {file.attributes?.name ? (
                        <div className='max-w-[200px] absolute left-4 bottom-4 p-1 text-xs  text-primary-content  rounded col-flex '>
                            <div
                                data-title={file.attributes?.name}
                                className='overflow-hidden font-medium overflow-ellipsis whitespace-nowrap'
                            >
                                {file.attributes?.name}
                            </div>
                            <div>
                                {(
                                    Number(file.attributes?.size || 0) / 1024
                                ).toFixed(2)}
                                KB
                            </div>
                        </div>
                    ) : null}

                    <div className='absolute right-4 bottom-5'>
                        <Icon
                            source={handleDocumentIcon(file.document_url)}
                            isSvg
                            size={32}
                            iconColor='text-base-tertiary '
                        />
                    </div>
                </div>
            )}
            {zoomEnabled && (
                <div className='absolute z-50 flex items-center justify-center p-2 rounded bottom-6 left-4 bg-base-100'>
                    <span className='mr-2 text-xs text-base-secondary'>
                        Zoom:
                    </span>
                    <input
                        type='range'
                        min='1'
                        max='3'
                        value={zoomScale}
                        onChange={(e) => setZoomScale(+e.target.value)}
                        className='range range-secondary range-xs'
                    />
                </div>
            )}

            {renderViewer()}
            {children}
        </div>
    );
};

export const NoDocumentFound = ({
    noDocumentActionComponent,
    onUploadDocument,
    hideUploadBtn,
    hideDescription,
}: {
    noDocumentActionComponent?: any;
    onUploadDocument?: (files: any[]) => void;
    hideUploadBtn?: boolean;
    hideDescription?: boolean;
}) => {
    return (
        <div className='items-center justify-center w-full h-full gap-8 col-flex '>
            <Icon
                source={BigNoDocumentSvgIcon}
                isSvg
                size={160}
                iconClass='ml-8'
            />

            <div className='gap-3 text-center col-flex'>
                <p className='text-lg font-medium'>
                    There is no document here !
                </p>
                {!hideDescription && (
                    <span className='text-sm text-base-tertiary'>
                        Maximum 5 files allowed to upload
                    </span>
                )}

                {noDocumentActionComponent}
                {!hideUploadBtn && (
                    <CommonFileUploader
                        onFileUpload={(files) =>
                            onUploadDocument(
                                files.map((file) =>
                                    parseToServerFileFormat(file)
                                )
                            )
                        }
                        is_multiple
                    >
                        {({ uploading }) => (
                            <Button
                                size='sm'
                                outline
                                appearance='primary'
                                defaultMinWidth
                                disabled={uploading}
                                loading={uploading}
                            >
                                + Upload Document
                            </Button>
                        )}
                    </CommonFileUploader>
                )}
                {/* TODO: Enable after single file upload done */}
                {/* {onUploadDocument && (
                    <SingleFileUpload
                        onFileUpload={(files) => {
                            const newFiles = [...(files || [])].map(
                                (file: any) => {
                                    let newFile = {
                                        ...file,
                                        document_url: file.serverUrl,
                                        attributes: {
                                            name: file.name,
                                            type: file.type,
                                            size: file.size,
                                        },
                                    };
                                    return newFile;
                                }
                            );
                            onUploadDocument(newFiles);
                        }}
                    >
                        {({ uploading }) => {
                            return (
                                <Button
                                    size='sm'
                                    outline
                                    appearance='primary'
                                    defaultMinWidth
                                    disabled={uploading}
                                    loading={uploading}
                                >
                                    + Upload Document
                                </Button>
                            );
                        }}
                    </SingleFileUpload>
                )} */}
            </div>
        </div>
    );
};
