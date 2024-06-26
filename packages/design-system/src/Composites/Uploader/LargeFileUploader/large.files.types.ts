import { ButtonSizeType } from '@finnoto/core';

import { CommonFileUploderInterface } from '../uploader.types';

export interface LargeFileUploadInterface extends CommonFileUploderInterface {
    fileSupportText?: string;
    btnSize?: ButtonSizeType;
    onUploadingFile?: (File: any) => void;
    onSave?: (files: File[]) => void;
    onSkip?: () => void;
    isMultiple?: boolean;
}

export type FileStatusType = 'pending' | 'completed' | 'error';
export type FileState = {
    status?: FileStatusType;
    slug: string;
    file: File;
    errorMessage?: string;
    completedPercentage?: number;
};
