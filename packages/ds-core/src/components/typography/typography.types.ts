import { cva, VariantProps } from 'class-variance-authority';

export const typographyVariants = cva('', {
    variants: {
        variant: {
            title: 'text-xl font-bold',
            heading: 'text-lg font-semibold',
            subHeading: 'text-base font-medium',
            info: 'text-sm font-normal',
            subInfo: 'text-xs',
        },
        color: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            destructive: 'text-destructive',
            warning: 'text-warning',
            success: 'text-success',
            accent: 'text-accent',
            info: 'text-info',
            muted: 'text-muted',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },
        transform: {
            uppercase: 'uppercase',
            lowercase: 'lowercase',
            capitalize: 'capitalize',
            none: 'normal-case',
        },
        fontStyle: {
            italic: 'italic',
            normal: 'not-italic',
        },
    },
});

export interface TypographyProps
    extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
        VariantProps<typeof typographyVariants> {}
