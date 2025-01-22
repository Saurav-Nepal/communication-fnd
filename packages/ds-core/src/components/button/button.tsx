import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@slabs/ds-utils';

import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
    'inline-flex items-center hover:shadow-md transition-all duration-200 ease-in-out justify-center shrink-0 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50',
    {
        variants: {
            color: {
                primary:
                    'bg-primary text-primary-foreground hover:bg-primary/80',
                error: 'bg-error text-error-foreground hover:bg-error/80',
                success:
                    'bg-success text-success-foreground hover:bg-success/80',
                info: 'bg-info text-info-foreground hover:bg-info/80',
                warning:
                    'bg-warning text-warning-foreground hover:bg-warning/80',
                secondary:
                    'bg-secondary text-muted-foreground dark:text-default-950 hover:bg-secondary/80',
                default:
                    'bg-secondary-foreground text-secondary hover:bg-secondary-foreground/80',
            },
            variant: {
                default: '',
                outline:
                    'border border-current bg-transparent hover:text-primary-foreground hover:shadow-md transition-colors duration-200 ',
                ghost: 'bg-transparent text-current hover:text-primary-foreground',
                plain: 'bg-transparent hover:bg-transparent',
            },
            size: {
                default: 'h-10 px-4 py-[10px]',
                sm: 'h-8 rounded px-3',
                lg: 'h-11 rounded px-[18px] py-[10px] text-base',
                xl: 'h-12 rounded px-6 py-3 text-base',
                md: 'h-9 rounded px-4 py-2',
                xs: 'h-7 rounded px-2 py-1',
            },
            shape: {
                default: '',
                circle: 'rounded-full',
                square: 'rounded-none',
            },
        },
        compoundVariants: [
            {
                variant: 'outline',
                color: 'error',
                className:
                    'text-error hover:text-error-foreground hover:border-error hover:bg-error',
            },
            {
                variant: 'outline',
                color: 'success',
                className:
                    'text-success hover:text-success-foreground hover:border-success hover:bg-success',
            },
            {
                variant: 'outline',
                color: 'info',
                className:
                    'text-info hover:text-info-foreground hover:border-info hover:bg-info',
            },
            {
                variant: 'outline',
                color: 'warning',
                className:
                    'text-warning hover:text-warning-foreground hover:border-warning hover:bg-warning',
            },
            {
                variant: 'outline',
                color: 'default',
                className:
                    'text-secondary-foreground border-secondary-foreground bg-transparent hover:bg-secondary-foreground',
            },
            {
                variant: 'outline',
                color: 'secondary',
                className:
                    'text-muted-foreground hover:text-secondary-foreground dark:bg-transparent dark:hover:bg-secondary/50 border-secondary hover:bg-secondary/80',
            },
            {
                variant: 'outline',
                color: 'primary',
                className: 'text-primary hover:text-primary-foreground',
            },

            {
                variant: 'ghost',
                color: 'default',
                className:
                    'text-secondary-foreground hover:text-primary-foreground hover:bg-secondary-foreground/80 ',
            },
            {
                variant: 'ghost',
                color: 'secondary',
                className:
                    'text-muted-foreground hover:text-secondary-foreground dark:bg-transparent dark:hover:bg-secondary/70 border-input hover:bg-secondary/80',
            },
            {
                variant: 'ghost',
                color: 'success',
                className:
                    'text-success hover:text-success-foreground  hover:bg-success/80 ',
            },
            {
                variant: 'ghost',
                color: 'info',
                className:
                    'text-info hover:text-info-foreground  hover:bg-info/80  ',
            },
            {
                variant: 'ghost',
                color: 'warning',
                className:
                    'text-warning hover:text-warning-foreground  hover:bg-warning/80 ',
            },
            {
                variant: 'ghost',
                color: 'error',
                className:
                    'text-error  hover:text-error-foreground hover:bg-error/80  ',
            },

            {
                variant: 'plain',
                color: 'success',
                className: 'text-success',
            },
            {
                variant: 'plain',
                color: 'error',
                className: 'text-error',
            },
            {
                variant: 'plain',
                color: 'info',
                className: 'text-info',
            },
            {
                variant: 'plain',
                color: 'warning',
                className: 'text-warning',
            },
            {
                variant: 'plain',
                color: 'default',
                className: 'text-secondary-foreground',
            },
            {
                variant: 'plain',
                color: 'primary',
                className: 'text-primary',
            },
            {
                variant: 'plain',
                color: 'secondary',
                className: 'text-secondary-foreground',
            },
        ],

        defaultVariants: {
            color: 'default',
            size: 'default',
            shape: 'default',
            variant: 'default',
        },
    }
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    tag?: React.ElementType;
    isLoading?: boolean;
    fullWidth?: boolean;
    clickEffect?: boolean; // for  button up-down effect
    btnPressEffect?: boolean; // for button ease out effect
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            tag = 'button',
            color = 'default',
            shape = 'default',
            asChild = false,
            isLoading = false,
            disabled = false,
            fullWidth,
            clickEffect,
            btnPressEffect,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : tag;

        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        className,
                        color,
                        shape,
                    }),
                    {
                        'opacity-50 cursor-progress': isLoading,
                        'opacity-50 cursor-not-allowed': disabled,
                        'w-full': fullWidth,
                        btn: clickEffect,
                        'btn-press': btnPressEffect,
                    }
                )}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className='flex gap-2 justify-between items-center'>
                        <Loader2 className='w-4 h-4 animate-spin ltr:mr-2 rtl:ml-2' />

                        {props.children}
                    </div>
                ) : (
                    props.children
                )}
            </Comp>
        );
    }
);

export { Button, buttonVariants };
