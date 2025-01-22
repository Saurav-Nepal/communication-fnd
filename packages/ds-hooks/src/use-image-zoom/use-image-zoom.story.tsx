import React from 'react';

import useImageZoom from './use-image-zoom';

export default { title: 'Hooks/Utils/useImageZoom' };

export const ImageZoomComponent = () => {
    const { imageRef, scale, zoomIn, zoomOut, resetZoom } = useImageZoom();

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button onClick={zoomOut}>-</button>
                <button onClick={resetZoom}>Reset</button>
                <button onClick={zoomIn}>+</button>
            </div>
            <div
                style={{
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    ref={imageRef}
                    src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    alt='Zoomable'
                    style={{
                        transform: `scale(${scale})`,
                        transition: 'transform 0.2s',
                    }}
                />
            </div>
        </div>
    );
};
