import { Icon } from '@finnoto/design-system';
import { NodataSvg } from 'assets';
import React from 'react';

const EmptyList = ({
    extra_content,
    title = 'No records are available',
}: any) => {
    return (
        <div className='items-center justify-center flex-1 py-6 my-auto col-flex'>
            <Icon size={180} source={NodataSvg} isSvg iconClass='!h-[124px] ' />
            <div className='text-lg font-semibold text-base-secondary '>
                {title}
            </div>
            {extra_content ? (
                <div className='text-base-300 dark:text-color-300'>
                    {extra_content}
                </div>
            ) : null}
        </div>
    );
};

export default EmptyList;
