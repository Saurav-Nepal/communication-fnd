/* eslint-disable react/no-unknown-property */
import React from 'react';

import { LoaderProps } from '@/types';

/* Spinner for waiting */
const Loader = ({
    size = 16,
    thikness = 3,
    backColor = 'rgba(255, 255, 255, 0.2)',
}: LoaderProps) => {
    return (
        <div className='loader'>
            <style jsx={true}>{`
                .loader {
                    border: ${thikness}px solid ${backColor};
                    border-left: ${thikness}px solid;
                    animation: load 1s infinite linear;
                    border-radius: 50%;
                    width: ${size}px;
                    height: ${size}px;
                }
                @keyframes load {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export { Loader };
