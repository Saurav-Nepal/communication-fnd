import { ObjectDto, ProcessUploadData } from '@finnoto/core';
import { ImageCropper } from '../../../Composites/Image-Cropper/imageCropper.composite';
import { Modal, Toast } from '../../../Utils';

export const openImageCropper = (
    file_url: string,
    options: Partial<Omit<any, 'file' | 'onClose' | 'callback'>>,
    callback = (_: ObjectDto) => {}
) => {
    Modal.open({
        component: ImageCropper,
        modalSize: 'sm',
        props: {
            file: file_url,
            ...options,
            onClose: () => {
                Modal.close();
            },
            callback: async (data) => {
                const { hide = () => {} } = Toast.loading({
                    description: 'Saving...',
                });
                const file = await fetch(data)
                    .then((res) => res.blob())
                    .then((blob) => {
                        return new File(
                            [blob],
                            String(generateRandomNumber(8)) + '.png',
                            {
                                type: 'image/png',
                            }
                        );
                    });

                const uploadedImages = await ProcessUploadData({
                    images: [file],
                    resolve: true,
                    uploadFile: true,
                });

                hide();

                if (uploadedImages.length > 0) {
                    callback(uploadedImages[0]);
                    Modal.close();
                }
            },
        },
    });
};
export const generateRandomNumber = (digits: number = 16): number => {
    const min = Math.ceil(Math.pow(10, digits - 1));
    const max = Math.ceil(Math.pow(10, digits) - 1);

    return Math.floor(Math.random() * (max - min)) + min;
};
