'use client';

import { useMemo, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import {
    Button,
    IconButton,
    ModalBody,
    ModalContainer,
    ModalFooter,
    Range,
} from '../../Components';
import { ImageCropperProps } from './imageCropper.types';

/**
 * ImageCropper component for cropping images.
 *
 *
 * @author Saurav Nepal
 */
export const ImageCropper = ({
    /**
     * The file object representing the image to be cropped.
     */
    file,

    /**
     * Callback function called when the image cropper is closed.
     */
    onClose,

    /**
     * Specifies whether the image can be rotated.
     */
    rotatable,

    /**
     * The shape of the crop area. Can be 'square' or 'round'.
     * Default: 'square'
     */
    cropShape = 'square',

    /**
     * Callback function called when the crop is done.
     * Receives the cropped image file as a parameter.
     */
    callback,

    /**
     * The title of the image cropper modal.
     * Default: 'Crop Image'
     */
    title = 'Crop Image',

    /**
     * The initial aspect ratio of the crop area.
     * Default: 2
     */
    initialAspectRatio = 1,

    /**
     * The aspect ratio of the crop area.
     */
    aspectRatio,

    /**
     * Specifies whether the cropping is lockable.
     */
    lockable,

    /**
     * Specifies whether auto cropping is enabled.
     * Default: true
     */
    autoCrop = true,

    /**
     * Specifies whether the crop box is resizable.
     * Default: true
     */
    cropBoxResizable = true,

    /**
     * Specifies whether to hide the zoom slider.
     * Default: false
     */
    hideSliderZoom = false,
}: ImageCropperProps) => {
    const image = file;
    const cropperRef = useRef<ReactCropperElement | any>(null);
    const [cropper, setCropper] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(0.4);
    const [hasCropperCanvas, setHasCropperCanvas] = useState(false);

    const onRotateRight = () => {
        cropper.rotate(45);
    };

    const onRotateLeft = () => {
        cropper.rotate(-45);
    };

    const onLock = () => {
        cropper.disable();
    };

    const onUnlock = () => {
        cropper.enable();
    };

    const onReset = () => {
        cropper.reset();
    };

    const onCropDone = () => {
        callback(cropper.getCroppedCanvas().toDataURL());
    };

    useUpdateEffect(() => {
        cropper.zoom(zoomLevel);
    }, [zoomLevel]);

    useEffectOnce(() => {
        setCropper(cropperRef.current?.cropper);
    });

    const showReset = useMemo(
        () => rotatable || lockable,
        [lockable, rotatable]
    );

    return (
        <ModalContainer title={title}>
            <ModalBody className='gap-4 col-flex'>
                <Cropper
                    className={cropShape === 'round' ? 'round-cropper' : ''}
                    ref={cropperRef}
                    src={image}
                    style={{ height: 400, width: '100%', borderRadius: '4px' }}
                    autoCrop={autoCrop}
                    initialAspectRatio={initialAspectRatio}
                    aspectRatio={aspectRatio}
                    guides={false}
                    shape={cropShape}
                    rotatable={rotatable}
                    zoomTo={zoomLevel}
                    cropBoxResizable={cropBoxResizable}
                    zoomOnWheel={true}
                    ready={() => setHasCropperCanvas(true)} // check if the image is loaded
                />
                {!hideSliderZoom && (
                    <Range
                        min={0.1}
                        max={3}
                        step={0.1}
                        value={zoomLevel}
                        onChange={(val) => setZoomLevel(val as number)}
                    />
                )}

                <div className='flex gap-2'>
                    {rotatable && (
                        <>
                            <IconButton
                                icon={'rotate_right'}
                                onClick={onRotateRight}
                                appearance='secondary'
                                outline
                            />
                            <IconButton
                                icon={'rotate_left'}
                                onClick={onRotateLeft}
                                appearance='secondary'
                                outline
                            />
                        </>
                    )}
                    {lockable && (
                        <>
                            <IconButton
                                icon={'lock'}
                                onClick={onLock}
                                appearance='secondary'
                            />
                            <div className='flex-1'>
                                <IconButton
                                    icon={'lock_open'}
                                    appearance='secondary'
                                    onClick={onUnlock}
                                />
                            </div>
                        </>
                    )}

                    {showReset && (
                        <div className='ml-auto'>
                            <IconButton
                                icon={'restart_alt'}
                                appearance='secondary'
                                onClick={() => {
                                    setZoomLevel(0.1);
                                    onReset();
                                }}
                            />
                        </div>
                    )}
                </div>
            </ModalBody>
            <ModalFooter className='p-2'>
                <div className='flex justify-end w-full gap-4'>
                    <Button appearance='error' outline onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        appearance='success'
                        onClick={onCropDone}
                        defaultMinWidth
                        disabled={!hasCropperCanvas}
                    >
                        Save
                    </Button>
                </div>
            </ModalFooter>
        </ModalContainer>
    );
};
