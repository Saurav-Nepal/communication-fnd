'use client';

import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { useUpdateEffect } from 'react-use';

import { GetFileDetails } from '@finnoto/core';

import { IsEmptyArray } from '../../../Utils/common.ui.utils';
import {
    ModalBody,
    ModalContainer,
} from '../../Dialogs/Base/modal.container.component';
import { IconButton } from '../../Inputs/Icon-Button/iconButton.component';
import { ResourceFilesProps, ResourceViewer } from './resourceViewer.component';

import { ArrowRightSvgIcon } from 'assets';

/**
 * A modal that displays an image viewer with a carousel of multiple resource files.
 *
 * @param {ResourceFilesProps[]} files - An array of resource files.
 * @param {string} [className=''] - A string of class names to customize the component's styling.
 * @param {(props: { activeIndex: number; fileDetails: { name: string; extension: string; mimeType: string | false; }; fileUrl: string; }) => React.ReactNode} [actionComponent=()=>null] - A function that returns a React component to be used as the image viewer's action component.
 * @param {React.ReactNode} [noDocumentActionComponent=null] - A React component to be used as the image viewer's action component if there are no documents.
 * @param {(index: number) => void} [onActiveIndexChange=()=>{}] - A function to be called when the active index changes.
 * @return {JSX.Element} The ResourceCarouselModalViewer component.
 */
export const ResourceCarouselModalViewer = forwardRef(
    (
        {
            files,
            className = '',
            noDocumentActionComponent = null,
            actionComponent = () => null,
            onActiveIndexChange = () => {},
            hideEmptyUploadButton,
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
            hideEmptyUploadButton?: boolean;
        },
        ref
    ) => {
        const [activeIndex, setActiveIndex] = useState(0);

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

        return (
            <ModalContainer title='Image Viewer' className={`${className} `}>
                <ModalBody className='h-[700px]'>
                    <ResourceViewer
                        className='h-full'
                        file={files[activeIndex] || null}
                        noDocumentActionComponent={noDocumentActionComponent}
                        hideUpload={hideEmptyUploadButton}
                    />
                    <div className='items-center justify-between gap-2 row-flex'>
                        <div className='gap-2 row-flex'>
                            {actionComponent({
                                activeIndex: IsEmptyArray(files)
                                    ? -1
                                    : activeIndex,
                                fileDetails,
                                fileUrl:
                                    files[activeIndex]?.document_url || null,
                            })}
                        </div>
                        {files?.length > 1 && (
                            <div className='gap-2 mt-4 row-flex'>
                                {files?.length ? (
                                    <div className='items-center px-3 text-sm rounded row-flex bg-base-200'>
                                        {`${activeIndex + 1}/${files.length}`}
                                    </div>
                                ) : null}

                                <IconButton
                                    iconClass='rotate-180'
                                    icon={ArrowRightSvgIcon}
                                    shape='square'
                                    size='sm'
                                    outline
                                    appearance='primary'
                                    onClick={goToPrev}
                                    disabled={activeIndex === 0}
                                />

                                <IconButton
                                    icon={ArrowRightSvgIcon}
                                    shape='square'
                                    size='sm'
                                    outline
                                    appearance='primary'
                                    onClick={goToNext}
                                    disabled={activeIndex === files?.length - 1}
                                />
                            </div>
                        )}
                    </div>
                </ModalBody>
            </ModalContainer>
        );
    }
);
