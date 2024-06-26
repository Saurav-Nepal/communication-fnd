/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
    Debounce,
    EmptyFunction,
    FileData,
    ProcessUploadData,
} from '@finnoto/core';
import { IconButton, cn } from '@finnoto/design-system';
import {
    ArrowRightDirectionSvgIcon,
    CameraSvgIcon,
    CrossSvgIcon,
} from 'assets';
import { X } from 'lucide-react';
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useList } from 'react-use';
import Webcam from 'react-webcam';

const videoConstraints = {
    facingMode: 'environment',
    height: 400,
    width: 400,
};
interface WebCameraInterface {
    callback?: (files: FileData[]) => void;
    onClosePress?: () => void;
}
const WebCamera = forwardRef((props: WebCameraInterface, ref) => {
    const { onClosePress = EmptyFunction, callback = EmptyFunction } =
        props || {};
    const webRef = useRef<any>();
    const [images, { push, removeAt, set }] = useList([]);
    const [currentImage, setCurrentImage] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>();

    const handleOpen = useCallback(() => {
        setIsLoading(true);
        setOpen(true);
        set([]);
    }, [set]);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    useImperativeHandle(
        ref,
        () => {
            return {
                handleClose,
                handleOpen,
            };
        },
        [handleClose, handleOpen]
    );

    const onNext = useCallback(
        async (next = EmptyFunction, e: any) => {
            e.stopPropagation();
            if (!images?.length) return;
            setProcessing(true);
            let filesObjects = [];
            for (let image of images) {
                const file = dataURLtoFile(
                    image,
                    `camera-${Math.floor(
                        Math.random() * 1000
                    )}-${new Date().toDateString()}.png`
                );
                filesObjects.push(file);
            }
            const uploadedFiles = await ProcessUploadData({
                images: filesObjects,
                resolve: true,
                uploadFile: true,
                source: 'business',
            });
            setProcessing(false);
            callback(uploadedFiles);
        },
        [callback, images]
    );

    const onCapture = useCallback(async () => {
        const imageContent = webRef.current.getScreenshot();
        setCurrentImage(imageContent);
        Debounce(() => setCurrentImage(null), 100)();
        push(imageContent);
    }, [push]);

    const onUserMedia = (data) => {
        setIsLoading(false);
    };
    if (!open) return <></>;
    return (
        <div
            className={cn(
                'fixed top-0  bottom-0  left-0 right-0 flex-1 z-[9999] bg-black/95'
            )}
        >
            {processing && (
                <div className='z-[9999] bg-black/50 h-full w-full items-center justify-center flex'>
                    <div className='text-primary-content'>Processing...</div>
                </div>
            )}
            <div className='relative w-full h-full '>
                <Webcam
                    className='webcam '
                    audio={false}
                    screenshotFormat='image/jpeg'
                    ref={webRef}
                    onUserMedia={onUserMedia}
                    imageSmoothing={true}
                    videoConstraints={videoConstraints}
                />
                <div className='absolute left-0 right-0 z-50 justify-around w-full gap-4 px-10 row-flex bottom-24'>
                    <IconButton
                        appearance='error'
                        icon={CrossSvgIcon}
                        onClick={() => {
                            onClosePress();
                            setOpen(false);
                        }}
                        iconSize={14}
                        shape='circle'
                        size='lg'
                        // disabled={!!currentImage || isLoading}
                    />
                    <IconButton
                        appearance='accent'
                        shape='circle'
                        icon={CameraSvgIcon}
                        onClick={onCapture}
                        size='lg'
                        disabled={!!currentImage || isLoading}
                    />
                    <IconButton
                        appearance='success'
                        className={cn({
                            'bg-success/20 border border-success/20 text-white/20':
                                isLoading || !images?.length,
                        })}
                        icon={ArrowRightDirectionSvgIcon}
                        onClick={onNext}
                        size='lg'
                        shape='circle'
                        // disabled={isLoading || !images?.length}
                        // disabled={!!currentImage || isLoading}
                    />
                </div>

                <div className='absolute right-0 z-50 h-[80px] items-center w-full gap-2 overflow-x-auto  left-1 bottom-1 row-flex'>
                    {images.map((el, index: number) => {
                        return (
                            <div className='relative  h-[60px] ' key={el}>
                                <X
                                    size={18}
                                    className='absolute border rounded-full -top-2 -right-2 text-error border-error'
                                    onClick={() => removeAt(index)}
                                />

                                <img
                                    src={el}
                                    alt={el?.name}
                                    className='object-contain rounded w-[60px] h-[60px]'
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
//@todo rumesh sir please see once this function which convert base 64 file to file object
function dataURLtoFile(dataUrl: any, filename) {
    const [, mime, bstr] = dataUrl.match(/^data:(.*?);base64,(.*)$/) || [];
    const byteArray = Uint8Array.from(
        // Buffer.from(bstr, 'base64').toString('base64'),
        atob(bstr),
        (char) => char.charCodeAt(0)
    );
    return new File([byteArray], filename, { type: mime });
}

export default WebCamera;
