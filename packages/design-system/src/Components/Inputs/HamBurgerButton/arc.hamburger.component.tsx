import React from 'react';

import { useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';

import { MinimizeSvgIcon } from 'assets';

interface ArcHamburgerProps {
    className?: string;
}

export const ArcHamburger = (props: ArcHamburgerProps) => {
    const { isSidebarExpand, toggleSidebarExpand } = useApp();

    return (
        <div
            className={cn(
                'bg-base-100 flex items-center justify-center cursor-pointer shadow-lg border w-7 h-7 rounded',
                props.className
            )}
            onClick={() => toggleSidebarExpand()}
        >
            <Icon
                source={MinimizeSvgIcon}
                size={20}
                isSvg
                className='text-base-primary'
            />
        </div>
    );
};
