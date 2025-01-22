import { cva, VariantProps } from 'class-variance-authority';

export const containerVariants = cva('overflow-hidden', {
    variants: {
        background: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            success: 'bg-success',
            warning: 'bg-warning',
            destructive: 'bg-destructive',
            info: 'bg-info',
            muted: 'bg-muted',
        },
        size: {
            sm: 'h-2',
            md: 'h-3',
            lg: 'h-4',
        },
        radius: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            none: 'rounded-none',
        },
    },
});

export const indicatorVariants = cva('transition-all h-full', {
    variants: {
        variant: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            success: 'bg-success',
            warning: 'bg-warning',
            destructive: 'bg-destructive',
            info: 'bg-info',
            muted: 'bg-muted',
        },
    },
});

export interface ProgressProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
        VariantProps<typeof containerVariants>,
        VariantProps<typeof indicatorVariants> {
    value: number;
    duration?: number;
    animate?: boolean;
    maxValue?: number;
    minValue?: number;
    indicatorClassName?: string;
}

export const circleVariants = cva('[&_[path-color]]:text-default-200 ', {
    variants: {
        color: {
            primary:
                '[&_[bar-color]]:text-primary [&_[text-color]]:fill-primary',
            dark: '[&_[bar-color]]:text-secondary-foreground  [&_[text-color]]:fill-secondary-foreground',
            error: '[&_[bar-color]]:text-error [&_[text-color]]:fill-error',
            warning:
                '[&_[bar-color]]:text-warning [&_[text-color]]:fill-warning',
            info: '[&_[bar-color]]:text-info [&_[text-color]]:fill-info',
            success:
                '[&_[bar-color]]:text-success [&_[text-color]]:fill-success',
        },
        size: {
            xs: 'h-12 w-12',
            sm: 'h-14 w-14',
            md: 'h-20 w-20',
            lg: ' h-24 h-24',
            xl: 'h-28 w-28',
            micro: 'h-6 w-6',
            mini: 'h-8 w-8',
            small: 'h-10 w-10',
        },
    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
    },
});

export interface CircleProps extends VariantProps<typeof circleVariants> {
    className?: string;
    value: number;
    showValue?: boolean;
    loading?: boolean;
    customContent?: string | React.ReactNode;
    isStripe?: boolean;
}
