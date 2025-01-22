'use client';

import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@slabs/ds-utils';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

export const avatarVariants = cva(
    'relative flex shrink-0 h-10 w-10 bg-primary text-primary-foreground   overflow-hidden rounded-full',
    {
        variants: {
            size: {
                xs: 'h-8 w-8 text-xs',
                sm: 'h-9 w-9 text-sm',
                md: 'h-10 w-10',
                lg: 'h-11 w-11 text-lg',
                xl: ' h-12 w-12 text-xl',
            },
            radius: {
                xs: 'rounded-xs',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                full: 'rounded-full',
            },
            variant: {
                outline: 'border',
                light: 'bg-base-200',
                filled: 'bg-neutral/40',
            },
            appearance: {
                default: 'bg-primary text-primary-foreground',
                error: 'bg-destructive text-destructive-foreground',
                warning: 'bg-yellow-100 text-yellow-800',
                primary: 'bg-blue-100 text-blue-800',
                success: 'bg-green-100 text-green-800',
                accent: 'bg-purple-100 text-purple-800',
                info: 'bg-blue-100 text-blue-800',
            },
        },
    }
);
export interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
        VariantProps<typeof avatarVariants> {}
const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(
    (
        { className, size, radius, variant, appearance = 'default', ...props },
        ref
    ) => (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                avatarVariants({ size, radius, variant, appearance }),
                className
            )}
            asChild
            {...props}
        />
    )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted',
            className
        )}
        {...props}
    />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
