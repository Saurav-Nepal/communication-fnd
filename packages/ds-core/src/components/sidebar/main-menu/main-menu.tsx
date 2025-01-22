import React from 'react';

import { cn } from '@slabs/ds-utils';

type MainMenuProps = {
    borderType?: 'dashed' | 'solid';
    children: React.ReactNode;
    className?: string;
};

export const MainMenu = ({
    borderType,
    children,
    className,
}: MainMenuProps) => {
    return (
        <div
            className={cn(
                'z-20 flex flex-col py-4 border-r border-dashed bg-neutral w-sidebar-width',
                {
                    'border-solid': borderType === 'solid',
                },
                className
            )}
        >
            {children}
        </div>
    );
};
