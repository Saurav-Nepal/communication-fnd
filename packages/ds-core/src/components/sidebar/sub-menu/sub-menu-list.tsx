import React from 'react';

import { cn } from '@slabs/ds-utils';

import { ScrollArea } from '../../scroll-area/scroll-area';
import { useSidebarContext } from '../sidebar.context';
import { MenuItemType } from '../sidebar.types';

type SubMenuListType = {
    children: (activeMenu: MenuItemType | undefined) => React.ReactNode;
    className?: string;
};

export const SubMenuList = ({ children, className }: SubMenuListType) => {
    const { activeMenu } = useSidebarContext();

    return (
        <ScrollArea>
            <div className={cn('flex flex-col gap-2 px-4', className)}>
                {children(activeMenu)}
            </div>
        </ScrollArea>
    );
};
