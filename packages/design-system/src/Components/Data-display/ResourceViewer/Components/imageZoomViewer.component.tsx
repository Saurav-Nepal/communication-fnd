'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useSetState } from 'react-use';

interface ImageZoomViewerProps {
    imgSrc: string;
    transitionTime?: number;
    zoomScale?: number;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * Renders an image zoom viewer component that displays an image and allows the user
 * to zoom in and out of the image using the mouse.
 *
 * @param {string} imgSrc - the source URL of the image to display
 * @param {number} transitionTime - the time it takes for the image to transition between zoom levels
 * @param {number} zoomScale - the amount to scale the image when zooming in
 * @param {object} style - the CSS styles to apply to the outer div of the component
 * @param {string} className - the CSS class name to apply to the outer div of the component
 * @return {JSX.Element} the image zoom viewer component
 */
export const ImageZoomViewer = ({
    imgSrc,
    transitionTime = 0.1,
    zoomScale = 1.5,
    style,
    className,
}: ImageZoomViewerProps) => {
    const imageRef = useRef<HTMLDivElement>(null);

    const [zoom, setZoom] = useState(false);
    const [mousePos, setMousePos] = useSetState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const handleMouseOver = () => {
        setZoom(true);
    };

    const handleMouseOut = () => {
        setZoom(false);
    };

    const handleMouseMovement = (e) => {
        const {
            left: offsetLeft,
            top: offsetTop,
            height,
            width,
        } = imageRef.current.getBoundingClientRect();

        const x = ((e.pageX - offsetLeft) / width) * 100;
        const y = ((e.pageY - offsetTop) / height) * 100;
        setMousePos({ x, y });
    };

    const outerDivStyle = useMemo(
        () => ({
            ...style,
            height: `100%`,
            width: `100%`,
            overflow: 'hidden',
            borderRadius: '4px',
        }),
        [style]
    );

    const innerDivStyle = useMemo(
        () => ({
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            transition: `transform ${transitionTime}s ease-out`,
            backgroundImage: `url('${imgSrc}')`,
        }),
        [imgSrc, transitionTime]
    );

    const transform = useMemo(
        () => ({
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
        }),
        [mousePos]
    );

    return (
        <div
            className={className}
            style={outerDivStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseMove={handleMouseMovement}
            ref={imageRef}
        >
            <div
                style={{
                    ...transform,
                    ...innerDivStyle,
                    transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
                    willChange: 'transform',
                }}
            />
        </div>
    );
};
