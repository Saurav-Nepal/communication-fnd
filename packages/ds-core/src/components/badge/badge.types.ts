import { cva, VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
    'text-center inline-flex w-fit gap-2 items-center whitespace-nowrap rounded',
    {
        variants: {
            variant: {
                error: 'bg-error text-error-foreground',
                warning: 'bg-warning text-warning-foreground',
                primary: 'bg-primary text-primary-foreground',
                success: 'bg-success text-success-foreground',
                accent: 'bg-accent text-accent-foreground',
                info: 'bg-info text-info-foreground',
            },
            type: {
                default: '',
                gradient: '',
                bordered: 'bg-transparent border',
            },
            size: {
                xs: 'py-0.5 px-1 h-4 text-xs',
                sm: 'py-0.5 px-2 h-5 text-xs',
                md: 'py-1 px-3 h-6 text-sm',
                lg: 'py-1.5 px-4 h-7 text-sm',
                xl: 'py-2 px-5 h-8 text-base',
            },
            shape: {
                default: '',
                // circle: 'p-0 rounded-full text-center items-center justify-center',
                square: 'p-0 text-center items-center justify-center',
            },
            radius: {
                xs: 'rounded-xs',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                full: 'rounded-full',
            },
        },
        compoundVariants: [
            // Gradient variants
            {
                type: 'gradient',
                variant: 'error',
                className:
                    'bg-gradient-to-r from-error to-warning text-error-foreground',
            },
            {
                type: 'gradient',
                variant: 'warning',
                className:
                    'bg-gradient-to-r from-warning to-error text-warning-foreground',
            },
            {
                type: 'gradient',
                variant: 'primary',
                className:
                    'bg-gradient-to-r from-primary to-secondary text-primary-foreground',
            },
            {
                type: 'gradient',
                variant: 'success',
                className:
                    'bg-gradient-to-r from-success to-info text-success-foreground',
            },
            {
                type: 'gradient',
                variant: 'accent',
                className:
                    'bg-gradient-to-r from-accent to-primary text-accent-foreground',
            },
            {
                type: 'gradient',
                variant: 'info',
                className:
                    'bg-gradient-to-r from-info to-success text-info-foreground',
            },

            // Bordered variants
            {
                type: 'bordered',
                variant: 'error',
                className: 'border border-error text-error',
            },
            {
                type: 'bordered',
                variant: 'warning',
                className: 'border border-warning text-warning',
            },
            {
                type: 'bordered',
                variant: 'primary',
                className: 'border border-info text-info',
            },
            {
                type: 'bordered',
                variant: 'success',
                className: 'border border-success text-success',
            },
            {
                type: 'bordered',
                variant: 'accent',
                className: 'border border-accent text-accent',
            },
            {
                type: 'bordered',
                variant: 'info',
                className: 'border border-info text-info',
            },

            // Shape Variants
            {
                shape: 'square',
                size: 'xs',
                className: 'h-4 w-4',
            },
            {
                shape: 'square',
                size: 'sm',
                className: 'h-5 w-5',
            },
            {
                shape: 'square',
                size: 'md',
                className: 'h-6 w-6',
            },
            {
                shape: 'square',
                size: 'lg',
                className: 'h-7 w-7',
            },
            {
                shape: 'square',
                size: 'xl',
                className: 'h-8 w-8',
            },
        ],
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {
    /** Content displayed on the left side of the badge label */
    leftSection?: React.ReactNode;

    /** Content displayed on the right side of the badge label */
    rightSection?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClickLeftIcon?: () => void;
    onClickRightIcon?: () => void;
    onClick?: () => void;
}
