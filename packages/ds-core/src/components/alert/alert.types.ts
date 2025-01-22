import { cva, VariantProps } from 'class-variance-authority';

import { CheckedIcon, InfoIcon, WarningIcon } from './alert.icon';

export const AlertVariants = cva('flex p-4 leading-5', {
    variants: {
        variant: {
            default: 'text-foreground border',
            warning: 'text-warning',
            error: 'text-error',
            success: 'text-success',
            info: 'text-info',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-base',
            xl: 'text-lg',
        },

        type: {
            default: '',
            light: '',
            outlined: 'border border-current',
            topAccent: 'border-t-4',
            leftAccent: 'border-l-4',
            transparent: 'bg-transparent',
        },
        radius: {
            xs: 'rounded-xs',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
        },
    },
    compoundVariants: [
        // Type: default
        {
            type: 'default',
            variant: 'warning',
            className: 'bg-orange-100 border-orange-100',
        },
        {
            type: 'default',
            variant: 'error',
            className: 'bg-red-100',
        },
        {
            type: 'default',
            variant: 'success',
            className: 'bg-green-100',
        },
        {
            type: 'default',
            variant: 'info',
            className: 'bg-blue-100',
        },
        // type: light
        {
            type: 'light',
            variant: 'warning',
            className: 'bg-orange-50',
        },
        {
            type: 'light',
            variant: 'error',
            className: 'bg-red-50',
        },
        {
            type: 'light',
            variant: 'success',
            className: 'bg-green-50',
        },
        {
            type: 'light',
            variant: 'info',
            className: 'bg-blue-50',
        },
        // type: outlined
        {
            type: 'outlined',
            variant: 'default',
            className: 'border-inherit',
        },
        // type:leftAccent
        {
            type: 'leftAccent',
            variant: 'warning',
            className: 'bg-orange-100 border-orange-600',
        },
        {
            type: 'leftAccent',
            variant: 'error',
            className: 'bg-red-100 border-red-600',
        },
        {
            type: 'leftAccent',
            variant: 'success',
            className: 'bg-green-100 border-green-600',
        },
        {
            type: 'leftAccent',
            variant: 'info',
            className: 'bg-blue-100 border-blue-600',
        },
        // type:topAccent
        {
            type: 'topAccent',
            variant: 'warning',
            className: 'bg-orange-100 border-orange-600',
        },
        {
            type: 'topAccent',
            variant: 'error',
            className: 'bg-red-100 border-red-600',
        },
        {
            type: 'topAccent',
            variant: 'success',
            className: 'bg-green-100 border-green-600',
        },
        {
            type: 'topAccent',
            variant: 'info',
            className: 'bg-blue-100 border-blue-600',
        },
    ],
    defaultVariants: {
        variant: 'default',
        type: 'default',
        radius: 'sm',
        size: 'sm',
    },
});

export interface AlertProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof AlertVariants> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClose?: () => void;
    closeIcon?: React.ReactNode;
    withClose?: boolean;
    title?: string;
}

export type VariantType = 'warning' | 'error' | 'success' | 'info';

const STATUS = {
    default: { icon: InfoIcon },
    info: { icon: InfoIcon },
    warning: { icon: WarningIcon },
    success: { icon: CheckedIcon },
    error: { icon: WarningIcon },
};

export const getIcons = (variant: VariantType) => {
    return STATUS[variant].icon;
};
