import { EmptyFunction, IsFunction, ProcessUploadData } from '@finnoto/core';

import { FileUpload } from '../../../Components/Inputs/FileUpload/fileUpload.component';
import { FileDropRestOption } from '../../../Components/Inputs/FileUpload/fileUpload.types';
import { Toast } from '../../../Utils';
import { CommonFileUploderInterface } from '../uploader.types';

export const CommonFileUploader = ({
    endpoint,
    source = 'business',
    headers,
    onFileUpload = EmptyFunction,
    children,
    classParams,
    ...rest
}: CommonFileUploderInterface) => {
    const handleDropFile = async (
        acceptedFiles: File[],
        nextUploading: () => void,
        { rejectedFiles, isLimitCrossed }: FileDropRestOption
    ) => {
        if (
            !isLimitCrossed &&
            !rejectedFiles?.length &&
            acceptedFiles?.length > 0
        ) {
            const uploadedFiles = await ProcessUploadData({
                images: acceptedFiles,
                resolve: true,
                uploadFile: true,
                source,
                headers,
                endpoint,
                classParams,
            });
            nextUploading();
            if (uploadedFiles?.length) {
                Toast.success({
                    description: `${acceptedFiles?.length} files uploaded `,
                });
                IsFunction(onFileUpload) && onFileUpload(uploadedFiles);
            }

            return;
        }
        nextUploading();
    };

    return (
        <FileUpload {...{ onDropFile: handleDropFile, ...rest }}>
            {children}
        </FileUpload>
    );
};
