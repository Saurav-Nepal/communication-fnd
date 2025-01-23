import React, { useMemo } from 'react';

import { cn } from '@slabs/ds-utils';

import { Tooltip } from '../../tooltip/tooltip';
import { Typography } from '../../typography/typography';
import { useSidebarContext } from '../sidebar.context';
import { MenuItemType } from '../sidebar.types';

export type MainMenuItemType = Pick<MenuItemType, 'icon' | 'title' | 'menus'>;

export const MainMenuItem = ({ icon, title, menus }: MainMenuItemType) => {
    const { setActiveMenu, activeMenu, setIsSidebarOpen } = useSidebarContext();
    const location = window.location.pathname;

    const Icon = icon;

    const isActive = useMemo(() => {
        if (activeMenu?.title === title) return true;
        return menus?.some((val) => val?.href === location);
    }, [activeMenu, location]);

    return (
        <Tooltip
            message={title}
            type='right'
            sideOffset={5}
            delayDuration={150}
            onOpenChange={() => {}}
        >
            <div
                className={cn(
                    'flex justify-center items-center w-10 h-10 rounded transition-all cursor-pointer text-neutral-foreground group/link hover:bg-neutral-foreground hover:text-neutral',
                    {
                        'bg-neutral-foreground text-neutral': isActive,
                    }
                )}
                onClick={() => {
                    setActiveMenu(title);
                    setIsSidebarOpen(true);
                }}
            >
                {icon ? (
                    <Icon
                        className={cn(
                            'transition-all text-foreground group-hover/link:text-primary dark:group-hover/link:text-primary-foreground',
                            {
                                'text-primary dark:text-primary-foreground':
                                    isActive,
                            }
                        )}
                        size={20}
                    />
                ) : (
                    <Typography>
                        {title.charAt(0).toUpperCase() +
                            title.slice(-1).toUpperCase()}
                    </Typography>
                )}
            </div>
        </Tooltip>
    );
};
