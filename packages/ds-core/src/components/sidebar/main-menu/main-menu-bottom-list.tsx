import React from 'react';

import { cn } from '@slabs/ds-utils';

type MainMenuBottomListType = {
    children: React.ReactNode;
    className?: string;
};

export const MainMenuBottomList = ({
    children,
    className,
}: MainMenuBottomListType) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-end gap-3 px-3 mt-auto',
                className
            )}
        >
            {children}
        </div>
    );
};
