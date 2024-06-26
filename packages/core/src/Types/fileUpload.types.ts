import { ObjectDto } from '../backend/Dtos';
import { FileUploadSource } from '../Utils/imagePicker.utils';
import { FileData } from './common.types';

export interface MultipleFileUploadInterface {
    title?: string | React.ReactNode;
    disabled?: boolean;
    className?: string;
    maxFiles?: number;
    maxSize?: number;
    accept?: { [x: string]: any[] };
    onFileUpload?: (data: FileData[]) => void;
    icon?: React.ReactNode;
    children?: ({ uploading }: { uploading: boolean }) => React.ReactNode;
    source?: FileUploadSource;
    error?: string;
    value?: FileData[];
    headers?: ObjectDto;
    endpoint?: string;
}
