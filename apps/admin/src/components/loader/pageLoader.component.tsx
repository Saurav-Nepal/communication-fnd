import React from 'react';

import { PageLoaderProps } from '@/types';

import { Loader } from './loader.component';

const PageLoader = ({ screenHeight = true, className }: PageLoaderProps) => {
    return (
        <div
            className={`flex items-center justify-center ${
                screenHeight ? 'h-screen' : 'h-full'
            } ${className ?? ''} text-blue-700`}
        >
            <Loader thikness={4} size={64} backColor='rgba(0,0,0,.1)' />
        </div>
    );
};

export { PageLoader };
