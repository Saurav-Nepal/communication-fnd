import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

import { loadingColor } from '../../Data-display/Loading/loading.types';

export const buttonVariants = cva('btn group font-medium', {
    variants: {
        outline: {
            true: 'btn-outline',
        },
        wide: { true: 'btn-wide' },
        block: { true: 'btn-block' },
        dashed: { true: 'border-dashed' },

        size: {
            xs: 'btn-xs', // Extra small button size class
            sm: 'btn-sm', // Small button size class
            md: 'btn-md', // Medium button size class
            lg: 'btn-lg',
        },
        shape: {
            square: 'btn-square',
            circle: 'btn-circle',
        },
        appearance: {
            primary: 'btn-primary', // Primary appearance class
            secondary: 'btn-secondary', // Secondary appearance class
            accent: 'btn-accent', // Accent appearance class
            info: 'btn-info', // Info appearance class
            success: 'btn-success', // Success appearance class
            warning: 'btn-warning', // Warning appearance class
            error: 'btn-error', // Error appearance class
            base: 'bg-[#F1F1F1] text-base-primary border-0 hover:bg-[#F1F1F1] hover:shadow-none font-normal dark:text-base-100', // Base appearance class
            ghost: 'bg-transparent border-none hover:bg-base-200/10', // ghost type only active on hover
            link: 'btn-link text-[#2485E8]', // Link appearance class
            primary_light:
                'bg-primary/10 text-primary hover:bg-primary hover:text-primary-content border-0', // primary Light
            errorHover:
                'bg-base-100 btn-outline border-base-300 hover:btn-error ', // Error Hover
            plain: 'bg-transparent border-0 hover:shadow-none', // Error Hover
            hold: 'bg-party-status-hold border-party-status-hold text-white hover:bg-party-status-hold',
            'polaris-black':
                'bg-polaris-bg-fill-brand border-0 text-polaris-text-brand-on-bg-fill hover:bg-polaris-bg-fill-brand hover:text-polaris-text-brand-on-bg-fill-hover shadow-polaris-shadow-button-primary hover:shadow-polaris-shadow-button-primary',
            'polaris-white':
                'bg-polaris-bg-fill hover:bg-polaris-bg-fill-hover focus:bg-polaris-bg-fill-active focus:border-polaris-border-hover text-polaris-text hover:text-polaris-text shadow-polaris-shadow-button hover:shadow-polaris-shadow-button border-none',
            'polaris-white-active':
                'bg-polaris-bg-surface-active hover:bg-polaris-bg-surface-hover text-polaris-text shadow-polaris-shadow-button hover:shadow-polaris-shadow-button border-none',
            'polaris-tertiary':
                'bg-polaris-bg-fill-tertiary hover:bg-polaris-bg-fill-tertiary-hover text-polaris-text border-none hover:text-polaris-text',
            'polaris-transparent':
                'bg-transparent hover:bg-polaris-bg-fill-tertiary text-polaris-text border-none hover:text-polaris-text',
            'polaris-error-outline':
                'bg-transparent border-polaris-border-critical text-polaris-text-critical hover:bg-transparent hover:border-polaris-border-critical',
            'polaris-error':
                'bg-polaris-bg-fill-critical text-polaris-text-critical-on-bg-fill hover:bg-polaris-bg-fill-critical-hover hover:text-polaris-text-critical-on-bg-fill-hover',
            'polaris-success':
                'bg-polaris-bg-fill-success text-polaris-text-success-on-bg-fill hover:bg-polaris-bg-fill-success-hover hover:text-polaris-text-success-on-bg-fill-hover',
            'polaris-secondary':
                'bg-polaris-bg-fill-secondary text-polaris-text-secondary-on-bg-fill hover:bg-polaris-bg-fill-secondary-hover hover:text-polaris-text-secondary-on-bg-fill-hover',
            'polaris-info':
                'bg-polaris-bg-fill-info text-polaris-text-info-on-bg-fill hover:bg-polaris-bg-fill-info-hover hover:text-polaris-text-info-on-bg-fill-hover hover:shadow-none border-none',
            'polaris-warning':
                'bg-polaris-bg-fill-warning text-polaris-text-warning-on-bg-fill hover:bg-polaris-bg-fill-warning-hover hover:text-polaris-text-warning-on-bg-fill-hover',
        },
        defaultMinWidth: {
            true: `min-w-[150px]`,
        },
        noAnimation: {
            false: 'no-animation',
        },
        noHover: {
            false: 'hover:shadow-none',
        },
    },
    defaultVariants: {
        appearance: 'primary',
        size: 'md',
        noHover: false,
        defaultMinWidth: false,
    },
});

export interface ButtonProps
    extends Omit<
            ButtonHTMLAttributes<HTMLButtonElement>,
            'onClick' | 'onKeyDown'
        >,
        VariantProps<typeof buttonVariants> {
    children?: React.ReactNode;
    addTimeout?: boolean;
    buttonIcon?: any;
    title?: string;
    progress?: boolean;
    loading?: boolean;
    onClick?: (...args: any) => void;
    handleKeyDown?: (...args: any) => void;
    buttonIconAlign?: 'left' | 'right';
    loadingAppear?: keyof typeof loadingColor;
}
