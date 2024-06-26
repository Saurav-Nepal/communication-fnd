import { MutableRefObject } from 'react';

import { ProcessUploadData, ProcessUploadDataType } from '@finnoto/core';

export const useLargeFileUploader = (
    uploadingCountRef: MutableRefObject<number>,
    concurrentApiLimit: number = 2
) => {
    const upload = async (params: ProcessUploadDataType) => {
        params?.onProgressComplete(0);
        try {
            while (
                uploadingCountRef.current >= concurrentApiLimit &&
                uploadingCountRef.current > 0
            ) {
                await new Promise((resolve) => setTimeout(resolve, 300));
            }

            uploadingCountRef.current++;
            return await ProcessUploadData(params);
        } finally {
            uploadingCountRef.current--;
        }
    };
    return { upload };
};
