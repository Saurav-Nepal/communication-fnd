import React from 'react';

import { cn } from '@slabs/ds-utils';

import { Typography } from '../typography/typography';
import {
    BreadCrumbProps,
    breadCrumbVariants,
    separatorVariants,
} from './breadcrumb.variants';

const BreadCrumb = React.forwardRef<HTMLDivElement, BreadCrumbProps>(
    (
        {
            className,
            children,
            separator = '-',
            spacing = 'sm',
            variant = 'sm',
            isMultiline,
            highlightLast = true,
            title,
            ...props
        },
        ref
    ) => {
        const childrenArray = React.Children.toArray(children);
        const totalChildren = childrenArray.length;

        const items = childrenArray.map((child, index) => {
            const isLastItem = index === totalChildren - 1;

            return (
                <li
                    key={child.toString()}
                    className={cn('flex items-center', {
                        'flex-[0_100%] leading-7': isMultiline && isLastItem,
                    })}
                >
                    <div
                        className={cn(
                            breadCrumbVariants({
                                variant,
                            }),
                            {
                                'font-medium text-primary':
                                    isLastItem && highlightLast,
                            }
                        )}
                    >
                        {child}
                    </div>
                    {!isLastItem && (
                        <span
                            className={cn(
                                separatorVariants({
                                    spacing,
                                }),
                                breadCrumbVariants({
                                    variant,
                                })
                            )}
                        >
                            {separator}
                        </span>
                    )}
                </li>
            );
        });

        return (
            <nav
                ref={ref}
                className={className}
                aria-label='Breadcrumb'
                {...props}
            >
                {title && (
                    <Typography variant='heading' as='h1' className='mb-1'>
                        {title}
                    </Typography>
                )}
                <ul
                    className={cn('flex flex-row', {
                        'flex-wrap gap-1': isMultiline,
                    })}
                >
                    {items}
                </ul>
            </nav>
        );
    }
);

export { BreadCrumb };
