import { useEffect, useRef, useState } from 'react';

const useImageZoom = (
    initialScale = 1,
    scaleStep = 0.1,
    minScale = 0.5,
    maxScale = 3
) => {
    const [scale, setScale] = useState(initialScale);
    const imageRef = useRef<HTMLImageElement>(null);

    // Handle mouse wheel scroll
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            if (event.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        };

        const imageElement = imageRef.current;
        if (imageElement) {
            imageElement.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (imageElement) {
                imageElement.removeEventListener('wheel', handleWheel);
            }
        };
    }, [scale]);

    const zoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + scaleStep, maxScale));
    };

    const zoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - scaleStep, minScale));
    };

    const resetZoom = () => {
        setScale(initialScale);
    };

    return { imageRef, scale, zoomIn, zoomOut, resetZoom };
};

export default useImageZoom;
