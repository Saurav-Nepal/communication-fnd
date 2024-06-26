import { cva, type VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, ReactNode } from 'react';

export const checkBoxVariants = cva('checkbox', {
    variants: {
        size: {
            xs: 'checkbox-xs',
            sm: 'checkbox-sm',
            md: 'checkbox-md',
            lg: 'checkbox-lg',
        },
        appearance: {
            primary: 'checkbox-primary',
            accent: 'checkbox-accent',
            success: 'checkbox-success',
            warning: 'checkbox-warning',
            info: 'checkbox-info',
            error: 'checkbox-error',
            'polaris-brand':
                'polaris-brand checked:bg-polaris-text-brand-on-bg-fill border-polaris-border-brand',
        },
    },
    defaultVariants: {
        appearance: 'primary',
        size: 'sm',
    },
});

export interface CheckBoxInterface
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>,
        VariantProps<typeof checkBoxVariants> {
    leftLabel?: string;
    className?: string;
    labelClassName?: string;
    rightLabel?: string | ReactNode;
    defaultChecked?: boolean;
    onChange?: (data?: boolean) => void;
    key?: string | number;
    subLabel?: string;
    error?: string;
    messageComponent?: string | ReactNode;
}
