'use client';

import Image from 'next/image';

import { Icon } from '../../../Components/Data-display/Icon/icon.component';
import { Button } from '../../../Components/Inputs/Button/button.component';
import { ProfileUploaderInterface } from '../uploader.types';
import { CommonFileUploader } from './commonFileUploader.component';

export const ProfileUploader = ({
    onFileUpload,
    value,
    className,
    onSingleFileUpload,
    ...rest
}: ProfileUploaderInterface) => {
    if (value)
        return (
            <UploadImageShow
                {...{ file: (value as any)?.serverUrl, onFileUpload }}
            />
        );
    return (
        <CommonFileUploader
            {...rest}
            onFileUpload={(files: any) =>
                onSingleFileUpload(files[0]?.serverUrl)
            }
        />
    );
};

const UploadImageShow = ({ file, onFileUpload }: any) => {
    return (
        <div className='relative    h-[100px] rounded-full w-[100px]  mt-2'>
            <div className='w-full h-full overflow-hidden border rounded-full bg-base-100'>
                <Image
                    src={file}
                    alt='upload file image'
                    height={100}
                    width={100}
                    unoptimized
                />
            </div>

            <div className='absolute -right-2 -top-2 '>
                <Button
                    shape='circle'
                    appearance='error'
                    size='sm'
                    onClick={() => {
                        onFileUpload('');
                    }}
                >
                    <Icon source={'close'} iconColor='text-base-100' />
                </Button>
            </div>
        </div>
    );
};
