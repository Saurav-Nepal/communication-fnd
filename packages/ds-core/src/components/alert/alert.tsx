import React from 'react';

import { cn } from '@slabs/ds-utils';

import {
    PolymorphicComponent,
    polymorphicFactory,
} from '../polymorphic-component/polymorphic-component';
import { AlertProps, AlertVariants, getIcons } from './alert.types';

const Alert = polymorphicFactory<HTMLSpanElement, AlertProps>(
    (
        {
            className,
            variant = 'default',
            type,
            radius,
            size,
            title,
            children,
            icon,
            as = 'span',
            ...props
        },
        ref
    ) => {
        const Icon = getIcons(variant as any);

        return (
            <PolymorphicComponent
                className={cn(
                    AlertVariants({
                        type,
                        variant,
                        size,
                        radius,
                    }),
                    className
                )}
                as={as}
                ref={ref}
                {...props}
            >
                {icon ? <>{icon}</> : <Icon />}
                <div className='flex flex-col flex-1 gap-1'>
                    {title && (
                        <div className='font-semibold w-[70%]'>{title}</div>
                    )}

                    {children && (
                        <div
                            className='w-[90%] flex-wrap pb-2'
                            data-variant={variant}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </PolymorphicComponent>
        );
    }
);

export { Alert };
