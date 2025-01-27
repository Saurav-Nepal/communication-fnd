import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = (props: { rows?: number; [x: string]: any }) => {
    return (
        <div className='grid grid-cols-5 gap-3 justify-center items-center mx-2 h-6'>
            <div className='w-full h-4 bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='w-full h-4 bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='w-full h-4 bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='w-full h-4 bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='w-full h-4 bg-gray-200 rounded-lg animate-pulse'></div>
        </div>
    );
};

export { TableLoader };
