import { cva, VariantProps } from 'class-variance-authority';

export const breadCrumbVariants = cva('text-muted-foreground', {
    variants: {
        variant: {
            sm: 'text-xs',
            md: 'text-sm',
            lg: 'text-base',
        },
    },
});

export const separatorVariants = cva('', {
    variants: {
        spacing: {
            xs: 'px-2',
            sm: 'px-4',
            md: 'px-6',
            lg: 'px-8',
            xl: 'px-10',
        },
    },
});

export interface BreadCrumbProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof breadCrumbVariants>,
        VariantProps<typeof separatorVariants> {
    separator?: React.ReactNode | string;
    isMultiline?: boolean;
    highlightLast?: boolean;
    title?: string;
}
