import React from 'react';

import { cn } from '@slabs/ds-utils';

interface GenericLoaderProps {
    menuDetail: {
        pageName: string;
    };
    loadingAnimation?: boolean;
    mode?: 'boxed' | 'fluid';
}

const GenericLoader = ({
    menuDetail,
    loadingAnimation,
    mode = 'fluid',
}: GenericLoaderProps) => {
    return (
        <div
            className={cn('loading-text', {
                '2xl:container': mode === 'boxed',
            })}
        >
            {!loadingAnimation ? (
                <h6>
                    Loading
                    <span>{menuDetail && menuDetail.pageName}</span>
                </h6>
            ) : (
                <div className='loader-animation'>
                    <div className='linear-activity-head animated faster'>
                        <div className='left'>
                            <div className='dummy-box-head' />
                            <div className='dummy-box-head' />
                        </div>
                        <div className='flex mr-[15px]'>
                            <div className='dummy-box-head-small' />
                            <div className='dummy-box-head-small' />
                            <div className='dummy-box-head-small' />
                            <div className='dummy-box-head-dark' />
                        </div>
                    </div>

                    <div className='linear-box-activity animated faster'>
                        <div className='dummy-box-bar-head' />
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data long' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data long' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data long' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data long' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data long' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data medium' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data medium' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data medium' />
                        </div>
                        <div className='dummy-box-bar'>
                            <div className='dummy-box-bar-data small' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenericLoader;
