import React, { useMemo } from 'react';

import { DismissableLayer } from '@radix-ui/react-dismissable-layer';

import { SidebarProvider } from './sidebar.context';
import { MenuItemType } from './sidebar.types';
import useSidebar from './use-sidebar.hook';

type SidebarProps = {
    menus: MenuItemType[];
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    children: React.ReactNode;
};

export const Sidebar = (props: SidebarProps) => {
    const sidebarProps = useSidebar(props);

    const value = useMemo(() => {
        const {
            activeMenu,
            setActiveMenu,
            pathName,
            isSidebarOpen,
            setIsSidebarOpen,
        } = sidebarProps;

        return {
            activeMenu,
            setActiveMenu,
            pathName,
            isSidebarOpen,
            setIsSidebarOpen,
        };
    }, [sidebarProps]);

    return (
        <SidebarProvider value={value}>
            <DismissableLayer
                onDismiss={() => sidebarProps.setIsSidebarOpen(false)}
            >
                <div className='flex fixed top-0 z-50 h-full start-0'>
                    {props.children}
                </div>
            </DismissableLayer>
        </SidebarProvider>
    );
};
