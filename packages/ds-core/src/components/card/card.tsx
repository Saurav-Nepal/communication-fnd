import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

import { cn } from '@slabs/ds-utils';

import {
    PolymorphicComponent,
    polymorphicFactory,
} from '../polymorphic-component/polymorphic-component';
import { CardProvider, useCardContext } from './card.context';
import { cardVariants } from './card.variants';

const Card = polymorphicFactory<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(
    (
        {
            className,
            variant = 'default',
            radius = 'sm',
            elevation = 'sm',
            noBorder = false,
            children,
            ...props
        },
        ref
    ) => {
        const hasHeader = React.useMemo(() => {
            return React.Children.toArray(children).some(
                (child: any) => child.type?.displayName === 'CardHeader'
            );
        }, [children]);
        const hasFooter = React.useMemo(() => {
            return React.Children.toArray(children).some(
                (child: any) => child.type?.displayName === 'CardFooter'
            );
        }, [children]);

        return (
            <CardProvider
                value={{
                    variant,
                    radius,
                    elevation,
                    noBorder,
                    hasHeader,
                    hasFooter,
                }}
            >
                <PolymorphicComponent<HTMLDivElement>
                    ref={ref}
                    className={cn(
                        cardVariants({
                            variant,
                            radius,
                            elevation,
                            noBorder,
                            className,
                        })
                    )}
                    {...props}
                >
                    {children}
                </PolymorphicComponent>
            </CardProvider>
        );
    }
);
Card.displayName = 'Card';

const CardHeader = polymorphicFactory<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant } = useCardContext();

    return (
        <PolymorphicComponent<HTMLDivElement>
            ref={ref}
            className={cn(
                'flex flex-col space-y-1.5 p-6',
                { 'p-4': variant === 'compact' },
                className
            )}
            {...props}
        />
    );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = polymorphicFactory<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, as = 'h3', ...props }, ref) => (
    <PolymorphicComponent<HTMLHeadingElement>
        as={as}
        ref={ref}
        className={cn('font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = polymorphicFactory<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, as = 'p', ...props }, ref) => (
    <PolymorphicComponent<HTMLParagraphElement>
        as={as}
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = polymorphicFactory<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant, hasHeader } = useCardContext();

    return (
        <PolymorphicComponent<HTMLDivElement>
            ref={ref}
            className={cn(
                'p-6',
                { 'p-4': variant === 'compact' },
                { 'pt-0': hasHeader },
                className
            )}
            {...props}
        />
    );
});
CardContent.displayName = 'CardContent';

const CardFooter = polymorphicFactory<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant } = useCardContext();

    return (
        <PolymorphicComponent<HTMLDivElement>
            ref={ref}
            className={cn(
                'flex items-center p-6 pt-0',
                { 'p-4 pt-0': variant === 'compact' },
                className
            )}
            {...props}
        />
    );
});
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};
