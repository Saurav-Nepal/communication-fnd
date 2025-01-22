import React from 'react';

import { cn } from '@slabs/ds-utils';

type MainMenuHeaderProps = {
    children?: React.ReactNode;
    className?: string;
};

export const MainMenuHeader = ({
    children,
    className,
}: MainMenuHeaderProps) => {
    return (
        <div className={cn('flex items-center justify-center px-3', className)}>
            {children}
        </div>
    );
};
