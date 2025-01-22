import React from 'react';

const DashboardLoader = () => {
    return (
        <div className='loading-elements' id='loading-div'>
            <div className='border-r loading-sidebar'>
                <div className=''>
                    <div className='flex items-center justify-center pt-4'>
                        <img
                            src='https://finnoto.com/SVGs/logo.svg'
                            alt='logo'
                            className='w-8 h-8'
                        />
                    </div>
                    <div className='dummy-box-container vertical'>
                        <div className='dummy-box-dark' />
                        <div className='dummy-box-dark' />
                        <div className='dummy-box-dark' />
                        <div className='dummy-box-dark' />
                        <div className='dummy-box-dark' />
                        <div className='dummy-box-dark' />
                    </div>
                </div>
            </div>
            <div className='loader-animation'>
                <div className='loading-header'>
                    <div className='dummy-box-container horizontal'>
                        <div className='left'>
                            <div className='dummy-box' />
                            <div className='!w-[200px] dummy-box' />
                        </div>
                        <div className='right'>
                            <div className='dummy-box-uat' />
                            <div className='dummy-box' />
                            <div className='dummy-box' />
                        </div>
                    </div>
                </div>
                <div className='loader-line' />
            </div>
        </div>
    );
};

export { DashboardLoader };
