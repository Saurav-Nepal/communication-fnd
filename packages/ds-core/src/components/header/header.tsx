import React from 'react';

import { cn } from '@slabs/ds-utils';

import { DropdownAction } from '../dropdown-action/drop-down-action';
import { ActionItemType } from '../dropdown-action/drop-down-action.types';
import { Hamburger } from '../hamburger/hamburger';
import {
    PolymorphicComponent,
    polymorphicFactory,
    PolymorphicProps,
} from '../polymorphic-component/polymorphic-component';
import { Typography } from '../typography/typography';

interface HeaderProps extends Pick<PolymorphicProps, 'as' | 'className'> {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;

    rightComponent?: React.ReactNode;
    leftComponent?: React.ReactNode;
    sticky?: boolean;

    user: {
        title: string;
        subtitle: string;
        image?: string;
        actions?: ActionItemType[];
        customHeader?: React.ReactNode;
        customTrigger?: React.ReactNode;
    };
}

export const Header = polymorphicFactory<HTMLDivElement, HeaderProps>(
    (
        {
            as = 'header',
            className,
            sticky,
            leftComponent,
            rightComponent,
            user,
            isCollapsed,
            setIsCollapsed,
            ...rest
        },
        ref
    ) => {
        return (
            <PolymorphicComponent
                as={as}
                className={cn(
                    'flex justify-between items-center px-5 py-2 border-b bg-card h-header-height',
                    {
                        'sticky top-0 z-30': sticky,
                    },
                    className
                )}
                ref={ref}
                {...rest}
            >
                <div className='flex gap-5'>
                    <Hamburger {...{ isCollapsed, setIsCollapsed }} />
                    {leftComponent}
                </div>

                <div className='flex gap-5'>
                    {rightComponent}

                    <DropdownAction
                        actions={user.actions ?? []}
                        menuLabel={
                            user.customHeader || <UserHeader {...user} />
                        }
                        align='end'
                    >
                        <div className='cursor-pointer'>
                            {user.customTrigger || (
                                <UserAvatar
                                    image={user.image ?? ''}
                                    alt={user.title}
                                />
                            )}
                        </div>
                    </DropdownAction>
                </div>
            </PolymorphicComponent>
        );
    }
);

const UserHeader = ({
    title,
    subtitle,
    image,
}: Omit<HeaderProps['user'], 'customHeader' | 'actions'>) => {
    return (
        <div className='flex items-center gap-2.5'>
            <UserAvatar image={image ?? ''} alt={title} />
            <div className='flex flex-col gap-0.5'>
                <Typography variant='info' weight='medium'>
                    {title}
                </Typography>
                <Typography>{subtitle}</Typography>
            </div>
        </div>
    );
};

const UserAvatar = ({ image, alt }: { image: string; alt: string }) => {
    if (image) {
        return <img src={image} alt={alt} className='w-8 h-8 rounded-full' />;
    }

    return (
        <div className='flex justify-center items-center w-8 h-8 font-bold rounded-full border bg-neutral text-neutral-foreground'>
            {alt[0]}
        </div>
    );
};
