import React from 'react';

import { useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';

interface SkeletonProps {
    className?: string;
    isCircle?: boolean;
    children?: React.ReactNode;
}

const Skeleton = (props: SkeletonProps) => {
    const { isArc } = useApp();

    return (
        <div
            className={cn(
                'animate-pulse rounded-lg',
                {
                    rounded: isArc,
                    'rounded-full': props.isCircle,
                },
                props.className
            )}
        >
            {props.children}
        </div>
    );
};

export default Skeleton;
