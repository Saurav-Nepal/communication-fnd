import React from 'react';

import { cn } from '@slabs/ds-utils';

import { useSidebarContext } from '../sidebar.context';

type SubMenuType = {
    children: React.ReactNode;
};

export const SubMenu = ({ children }: SubMenuType) => {
    const { isSidebarOpen, activeMenu } = useSidebarContext();

    return (
        <div
            className={cn(
                'border-r flex absolute start-sidebar-width h-full flex-col bg-card transition-all z-10 -translate-x-sidebar-submenu-width w-sidebar-submenu-width',
                {
                    'translate-x-0': isSidebarOpen && !!activeMenu?.menus,
                }
            )}
        >
            {children}
        </div>
    );
};
