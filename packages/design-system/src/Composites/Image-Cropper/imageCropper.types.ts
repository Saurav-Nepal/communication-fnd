export interface ImageCropperProps {
    /**
     * The Modal Title.
     */
    title: any;
    /**
     * The image file to be cropped.
     */
    file: any;

    /**
     * Callback function called when the cropper is closed.
     */
    onClose: () => void;

    /**
     * Callback function called when the cropping is complete.
     * It receives the cropped image file as a parameter.
     */
    callback: (_: File) => void;

    /**
     * The shape of the crop area. Can be either 'square' or 'round'.
     */
    cropShape: 'square' | 'round';

    /**
     * Optional. Specifies whether the image can be rotated.
     * If true, rotation controls are shown.
     */
    rotatable?: boolean;

    /**
     * Optional. Specifies whether the aspect ratio lock is enabled.
     * If true, the aspect ratio of the crop area is locked.
     */
    lockable?: boolean;

    /**
     * Optional. Specifies whether the image is automatically cropped
     * when it is loaded. If true, the image is automatically cropped.
     */
    autoCrop?: boolean;

    /**
     * Optional. Specifies whether the crop box can be resized by dragging
     * its edges. If true, the crop box can be resized.
     */
    cropBoxResizable?: boolean;

    /**
     * Optional. Specifies the initial aspect ratio of the crop area.
     * It is defined as the width divided by the height.
     */
    initialAspectRatio?: number;

    /**
     * Optional. Specifies the aspect ratio of the crop area.
     * It is defined as the width divided by the height.
     */
    aspectRatio?: number;

    /**
     * Optional. Specifies whether the zoom slider is hidden.
     * If true, the zoom slider is hidden.
     */
    hideSliderZoom?: boolean;
}
