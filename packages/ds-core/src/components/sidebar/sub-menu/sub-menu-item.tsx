import React, { useMemo } from 'react';

import { cn } from '@slabs/ds-utils';

import { Accordion } from '../../accordion/accordion';
import { useSidebarContext } from '../sidebar.context';
import { SubmenuItemType } from '../sidebar.types';
import { isLocationMatch } from '../sidebar.utils';

const COLLAPSE_KEY = 'SUBMENU_COLLAPSE_KEY';

export const SingleSubmenuItem = (props: SubmenuItemType) => {
    const { pathName, setIsSidebarOpen } = useSidebarContext();

    const { title, icon, href, menus } = props;

    const Icon = icon;

    const isActive = isLocationMatch(href ?? '', pathName);

    return (
        <div
            className={cn(
                'px-2.5 py-2.5 flex gap-3 text-foreground group-data-[state=open]/trigger:text-primary-foreground rounded w-full',
                {
                    'bg-primary text-primary-foreground': isActive,
                },
                props.className
            )}
            onClick={() => {
                if (menus) return;
                setIsSidebarOpen(false);
            }}
        >
            {Icon ? <Icon size={20} className='' /> : null}
            <p className='text-sm font-medium'>{title}</p>
        </div>
    );
};

export const NestedSubmenuItem = (
    props: SubmenuItemType & {
        children: React.ReactNode;
    }
) => {
    const { pathName } = useSidebarContext();

    const { menus, children } = props;

    const isSubmenuActive = useMemo(() => {
        return menus?.some((menu) => {
            if (menu.href) return isLocationMatch(menu.href, pathName);

            return menu.menus?.some((submenu) => {
                return isLocationMatch(submenu.href, pathName);
            });
        });
    }, [menus]);

    return (
        <Accordion
            type='multiple'
            items={[
                {
                    trigger: <SingleSubmenuItem {...props} href='' />,
                    content: (
                        <div>
                            <div className='space-y-3 before:absolute before:left-4 before:top-0 before:h-full before:w-[2px] before:bg-primary/10'>
                                {children}
                            </div>
                        </div>
                    ),
                    key: COLLAPSE_KEY,
                },
            ]}
            contentClassName='relative'
            triggerClassName='p-0 rounded group/trigger data-[state=open]:bg-primary pr-3 data-[state=open]:text-primary-foreground'
            arrowClassName='group-data-[state=open]/trigger:text-primary-foreground'
            isUnstyled
            arrowSize={12}
            defaultValue={isSubmenuActive ? [COLLAPSE_KEY] : undefined}
        />
    );
};
