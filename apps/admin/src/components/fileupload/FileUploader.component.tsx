import { useDropzone } from 'react-dropzone';

import { Button } from '@slabs/ds-core';

import { GetItem } from '../../utils/localStorage.utils';

const FileUploaderComponent = ({
    onFileUploadDone,
    accepts,
}: {
    onFileUploadDone?: (files: any) => void;
    accepts?: any;
}) => {
    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const formData = new FormData();
        const file = acceptedFiles[0]; // Only upload the first file
        formData.append('file', file);

        try {
            const response = await fetch(
                'https://sndebug.finnoto.cloud/api/b/upload-files',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${GetItem('ACCESS_TOKEN', false)}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            const data = await response.json();
            onFileUploadDone?.({
                link: data?.[0],
                name: file?.name,
                type: file?.type,
                size: file?.size,
            });

            console.log('File uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accepts,
        multiple: false,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant={'outline'} color={'primary'}>
                Upload Image
            </Button>
        </div>
    );
};

export default FileUploaderComponent;
