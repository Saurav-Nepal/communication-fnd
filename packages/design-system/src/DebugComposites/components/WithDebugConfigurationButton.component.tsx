import React from 'react';

import { DebugConfigurationButton } from './DebugConfigurationButton.component';

export const WithDebugConfigurationButton = ({
    slug,
    refetchFn,
    children,
}: {
    slug: string | string[];
    refetchFn?: () => void;
    children: any;
}) => {
    return (
        <div className='relative'>
            <DebugConfigurationButton
                slug={slug}
                position='bottomRight'
                options={{ callback: refetchFn }}
            />
            {children}
        </div>
    );
};
