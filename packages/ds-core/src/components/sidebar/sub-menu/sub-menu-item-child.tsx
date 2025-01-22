import React, { useMemo } from 'react';

import { cn } from '@slabs/ds-utils';

import { Accordion } from '../../accordion/accordion';
import { Typography } from '../../typography/typography';
import { useSidebarContext } from '../sidebar.context';
import { SubmenuItemChildType } from '../sidebar.types';
import { isLocationMatch } from '../sidebar.utils';

export const NestedSubmenuChildSingle = ({
    title,
    href,
}: Omit<SubmenuItemChildType, 'menus'>) => {
    const { pathName, setIsSidebarOpen } = useSidebarContext();

    const isMenuActive = isLocationMatch(href ?? '', pathName);

    return (
        <div
            className={cn('ml-8 first:mt-2', {
                'before:absolute before:z-50 before:w-[2px] before:h-full before:transition-all relative before:-left-4 before:bg-primary':
                    isMenuActive,
            })}
            onClick={() => setIsSidebarOpen(false)}
        >
            <Typography className='text-sm font-medium'>{title}</Typography>
        </div>
    );
};

export const NestedSubmenuChildNested = (
    props: SubmenuItemChildType & {
        children: React.ReactNode;
    }
) => {
    const { pathName } = useSidebarContext();

    const { title, menus, children } = props;

    const isSubmenuActive = useMemo(() => {
        return menus?.some((menu) => {
            return isLocationMatch(menu.href, pathName);
        });
    }, [menus]);

    return (
        <Accordion
            type='multiple'
            items={[
                {
                    trigger: (
                        <Typography variant='info' weight='medium'>
                            {title}
                        </Typography>
                    ),
                    content: (
                        <div>
                            <div className='space-y-3'>{children}</div>
                        </div>
                    ),
                    key: '1',
                },
            ]}
            className='ml-8'
            itemClassName='overflow-visible'
            triggerClassName={cn(
                'relative pr-3 before:top-0 before:-left-4 data-[state=open]:before:bg-primary before:absolute before:z-50 before:w-[2px] before:h-full before:transition-all',
                {
                    'before:bg-primary': isSubmenuActive,
                }
            )}
            arrowSize={12}
            isUnstyled
            defaultValue={isSubmenuActive ? ['1'] : undefined}
        />
    );
};

export const NestedSubmenuChildNestedChild = ({
    href,
    title,
}: {
    title: string;
    href: string;
}) => {
    const { pathName, setIsSidebarOpen } = useSidebarContext();

    return (
        <div
            className='flex items-center gap-2 ml-2 first:pt-3'
            key={title}
            onClick={() => setIsSidebarOpen(false)}
        >
            <span
                className={cn(
                    'inline-flex w-2 h-2 border rounded-full border-default-500',
                    {
                        'bg-primary ring-primary/30 ring-2 border-primary':
                            isLocationMatch(href, pathName),
                    }
                )}
            ></span>
            <Typography className='text-sm font-medium'>{title}</Typography>
        </div>
    );
};
