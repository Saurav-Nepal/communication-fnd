import { useMemo } from 'react';

import {
    AccessManager,
    Ellipsis,
    EmptyFunction,
    FormatDisplayDate,
    GetFileDetails,
} from '@finnoto/core';

import { handleDocumentIcon } from '../../../Composites/Uploader/uploader.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { IconButton } from '../../Inputs/Icon-Button/iconButton.component';

import { DeleteSvgIcon, FileDownloadSvgIcon } from 'assets';

export const ListingCardDocument = ({
    data,
    onHandleDelete = EmptyFunction,
    user,
    isDelete,
}: any) => {
    const name = GetFileDetails(data.document_url || '').name;

    const handleDownload = (data: any) => {
        const link = data.document_url;
        window.location = link;
    };
    const isDeleteOptionShow = useMemo(() => {
        if (!isDelete) return false;
        if (AccessManager.hasRoleIdentifier('ua_document_manager')) return true;

        let activeFile: any = data;
        if (activeFile?.attributes?.no_edit) return false;
        if (!activeFile?.created_by) return true;
        return [user?.business?.owner_id, user?.id].includes(
            activeFile?.created_by
        );
    }, [data, isDelete, user?.business?.owner_id, user?.id]);

    return (
        <div className='flex gap-4 px-4 py-3 border rounded bg-base-200 hover:shadow onHover-show border-base-300'>
            <div>
                <Icon
                    source={handleDocumentIcon(data.document_url)}
                    isSvg
                    size={24}
                    iconColor='text-base-tertiary'
                    className='mt-1'
                />
            </div>
            <div className='flex-1 gap-1 col-flex'>
                <h5 className='text-sm'>
                    {data?.attributes?.comments ||
                        data?.comments ||
                        'No comments Added'}
                </h5>
                <div className='flex items-center gap-2 text-xs text-base-secondary'>
                    <span> {Ellipsis({ text: name })}</span>
                    <span className='block w-1 h-1 rounded-full bg-base-300'></span>

                    <span>
                        Added At :{' '}
                        {FormatDisplayDate(data.created_at || new Date(), true)}
                    </span>
                </div>
            </div>
            <div className='opacity-0 onHover-showChild'>
                <div className='flex items-center gap-1'>
                    <IconButton
                        icon={FileDownloadSvgIcon}
                        size='xs'
                        appearance='ghost'
                        className={
                            'text-base-tertiary hover:bg-primary hover:text-white transition-all'
                        }
                        shape='square'
                        onClick={() => handleDownload(data)}
                    />
                    {isDeleteOptionShow && (
                        <IconButton
                            icon={DeleteSvgIcon}
                            size='xs'
                            appearance='ghost'
                            className={
                                'text-error hover:bg-error hover:text-white transition-all'
                            }
                            shape='square'
                            onClick={onHandleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
