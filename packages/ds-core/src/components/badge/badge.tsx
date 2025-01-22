import React from 'react';

import { cn } from '@slabs/ds-utils';

import {
    PolymorphicComponent,
    polymorphicFactory,
} from '../polymorphic-component/polymorphic-component';
import { BadgeProps, badgeVariants } from './badge.types';

const Badge = polymorphicFactory<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            type = 'default',
            radius = 'sm',
            shape,
            leftIcon,
            rightIcon,
            leftSection,
            rightSection,
            children,
            as = 'span',
            ...props
        },
        ref
    ) => {
        const classes = cn(
            badgeVariants({
                type,
                variant,
                size,
                radius,
                shape,
            }),
            className
        );
        return (
            <PolymorphicComponent
                className={classes}
                as={as}
                ref={ref}
                {...props}
            >
                {leftIcon || leftSection ? (
                    <div className='flex flex-row items-center space-x-2'>
                        {leftIcon}
                        {leftSection}
                    </div>
                ) : null}

                {children}

                {rightIcon || rightSection ? (
                    <div className='flex flex-row items-center space-x-2'>
                        {rightSection}
                        {rightIcon}
                    </div>
                ) : null}
            </PolymorphicComponent>
        );
    }
);

export { Badge };

Badge.displayName = 'Badge';
