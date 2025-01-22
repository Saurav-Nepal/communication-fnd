import { cva } from 'class-variance-authority';

export const cardVariants = cva(
    'bg-card text-card-foreground overflow-hidden',
    {
        variants: {
            radius: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                none: '',
            },
            elevation: {
                sm: 'shadow-sm',
                md: 'shadow-md',
                lg: 'shadow-lg',
                xl: 'shadow-xl',
                none: '',
            },
            variant: {
                default: '',
                compact: '',
            },
            noBorder: {
                false: 'border',
            },
        },
        defaultVariants: {
            variant: 'default',
            radius: 'sm',
            elevation: 'sm',
            noBorder: false,
        },
    }
);
