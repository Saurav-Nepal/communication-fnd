'use client';

import { AccessManager, UserBusiness } from '@finnoto/core';
import { DropdownMenu, Icon, Typography } from '@finnoto/design-system';
import { UplodedFileProps } from '@finnoto/design-system/src/Composites/Uploader/uploader.types';
import { handleDocumentIcon } from '@finnoto/design-system/src/Composites/Uploader/uploader.utils';
import { MoreIcon } from 'assets';
import { useMemo } from 'react';

const MobileUploadFile = ({
    file,

    handleRemoveFile,
    imageViwer,
    hideDelete,
}: UplodedFileProps) => {
    const isDeleteOptionShow = useMemo(() => {
        if (file?.id && hideDelete) return false;
        if (AccessManager.hasRoleIdentifier('ua_document_manager')) return true;
        let activeFile: any = file;
        if (activeFile?.attributes?.no_edit) return false;
        if (!activeFile?.created_by) return true;
        const business = UserBusiness.getCurrentBusiness();
        const loggedUserObj: any = UserBusiness.getIdObject();

        if (!business?.owner_id || !loggedUserObj?.user_id) return true; //business information initially not set
        return (
            AccessManager.isAuthUser(activeFile?.created_by) ||
            AccessManager.isBusinessOwner(activeFile?.created_by)
        );
    }, [file, hideDelete]);
    const actions = [
        { name: 'View', action: imageViwer },
        {
            name: 'delete',
            action: handleRemoveFile,
            isCancel: true,
            visible: isDeleteOptionShow,
        },
    ];

    return (
        <div className='flex items-center justify-between gap-4 px-4 py-3 overflow-hidden text-xs border rounded bg-base-100 border-base-300 '>
            <div className='flex items-center gap-3 overflow-hidden '>
                <Icon
                    source={handleDocumentIcon(
                        file?.document_url || file?.serverUrl
                    )}
                    isSvg
                    size={24}
                    iconColor='text-base-tertiary -mt-1'
                />
                <div className='overflow-hidden font-medium text-left col-flex text-base-primary'>
                    <span className='max-w-[250px] overflow-hidden text-sm font-medium truncate text-ellipsis'>
                        {file?.attributes?.name}
                    </span>

                    <Typography className='text-xs font-normal uppercase text-base-tertiary '>
                        {Math.round(file?.attributes?.size / 1024)}KB
                    </Typography>
                </div>
            </div>

            <DropdownMenu hideOnNoAction={false} actions={actions}>
                <div className='btn btn-square btn-ghost btn-xs hover:bg-primary/10 hover:text-primary'>
                    <Icon source={MoreIcon} size={22} isSvg />
                </div>
            </DropdownMenu>
        </div>
    );
};
export default MobileUploadFile;
