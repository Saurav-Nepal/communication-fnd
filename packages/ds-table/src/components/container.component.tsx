import React, { ReactNode } from 'react';

import { cn } from '@slabs/ds-utils';

interface ContainerWrapperProps {
    /** The content to be rendered inside the container. */
    children: ReactNode;

    /** Additional CSS class name(s) to be applied to the container. */
    className?: string;

    /** The title of the page. */
    pageTitle?: string;

    /** Determines whether the container should be rendered with or without an offset container. */
    offContainer?: boolean;
}

export const Container = ({
    children,
    className,
    offContainer = false,
}: ContainerWrapperProps) => {
    return (
        <div
            className={cn(
                offContainer ? 'px-4' : 'container mx-auto',
                className
            )}
        >
            {children}
        </div>
    );
};
