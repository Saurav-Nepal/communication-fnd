import React from 'react';

import { cn } from '@slabs/ds-utils';

import {
    PolymorphicComponent,
    polymorphicFactory,
} from '../polymorphic-component/polymorphic-component';
import { TypographyProps, typographyVariants } from './typography.types';

const Typography = polymorphicFactory<HTMLParagraphElement, TypographyProps>(
    (
        {
            className,
            children,
            as = 'p',
            variant = 'subInfo',
            size,
            weight,
            transform,
            fontStyle,
            color,
            ...props
        },
        ref
    ) => {
        const classes = cn(
            'text-foreground',
            typographyVariants({
                variant,
                color,
                size,
                weight,
                transform,
                fontStyle,
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
                {children}
            </PolymorphicComponent>
        );
    }
);

export { Typography };

Typography.displayName = 'Typography';
