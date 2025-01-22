import { cva, VariantProps } from 'class-variance-authority';
import { SetNonNullable } from 'type-fest';

import { RadioIconProps } from './radio-icon';

export const RadioGroupVariants = cva(
    'rounded-full flex items-center justify-center',
    {
        variants: {
            variant: {
                default: 'border-input bg-secondary-foreground',
                primary: 'bg-primary border-primary text-primary',
                error: 'bg-error border-error text-error',
                warning: 'bg-warning border-warning text-warning',
                success: 'bg-success  border-success text-success',
                accent: 'bg-accent border-accent text-accent',
                info: 'bg-info border-info text-info',
            },
            type: {
                default: '',
                outline: 'bg-transparent border',
            },

            size: {
                sm: 'w-5 h-5 ',
                md: 'w-6 h-6 ',
                lg: 'w-7 h-7 ',
            },
            disabled: {
                true: 'cursor-not-allowed opacity-50',
                false: '',
            },
        },

        defaultVariants: {
            type: 'outline',
            variant: 'default',
            size: 'md',
            disabled: false,
        },
    }
);

export const radioBallVariants = cva('rounded-full', {
    variants: {
        size: {
            sm: 'w-2 h-2',
            md: 'w-2.5 h-2.5',
            lg: 'w-3 h-3',
        },
        variant: {
            default: 'bg-secondary-foreground',
            primary: 'bg-primary',
            error: 'bg-error',
            warning: 'bg-warning',
            success: 'bg-success',
            accent: 'bg-accent',
            info: 'bg-info',
        },
        type: {
            default: 'bg-card',
            outline: '',
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'default',
        type: 'default',
    },
});

export const labelVariants = cva(
    'flex flex-row gap-2 items-center bg-card border border-muted rounded-sm ',
    {
        variants: {
            size: {
                sm: 'text-xs p-2',
                md: 'text-sm p-3',
                lg: 'text-lg p-4',
            },
            checked: {
                true: 'border-current',
            },
            variant: {
                default: '',
                primary: '',
                error: '',
                warning: '',
                success: '',
                accent: '',
                info: '',
            },
        },
        compoundVariants: [
            {
                checked: true,
                variant: 'default',
                className: 'border-secondary-foreground',
            },
            {
                checked: true,
                variant: 'primary',
                className: 'border-primary',
            },
            {
                checked: true,
                variant: 'error',
                className: 'border-error',
            },
            {
                checked: true,
                variant: 'warning',
                className: 'border-warning',
            },
            {
                checked: true,
                variant: 'success',
                className: 'border-success',
            },
            {
                checked: true,
                variant: 'accent',
                className: 'border-accent',
            },
            {
                checked: true,
                variant: 'info',
                className: 'border-info',
            },
        ],

        defaultVariants: {
            size: 'md',
        },
    }
);

export const textLabelVariants = cva('', {
    variants: {
        variant: {
            default: 'text-secondary-foreground',
            primary: 'text-primary',
            error: 'text-error',
            warning: 'text-warning',
            success: 'text-success',
            accent: 'text-accent',
            info: 'text-info',
        },
    },
});

export const IconSizeVariant = cva('', {
    variants: {
        size: {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export interface RadioGroupProps
    extends SetNonNullable<VariantProps<typeof RadioGroupVariants>> {
    value?: string | number;
    defaultValue?: string | number;
    name?: string;
    direction?: 'horizontal' | 'vertical';
    options?: RadioGroupOption[];
    composition?: boolean;
    readOnly?: boolean;
    onChange?: (value: string | number | boolean) => void;
    label?: string | React.ReactNode;
    error?: string;
    required?: boolean;
    containerClassName?: string;
    icon?: React.FC<RadioIconProps>;
    children?: React.ReactNode;
}

export interface RadioGroupOption {
    value: string | number;
    label: string;
    description?: string;
    error?: string;
}

export interface RadioProps
    extends Omit<
        RadioGroupProps,
        'options' | 'value' | 'defaultValue' | 'direction' | 'onChange'
    > {
    className?: string;
    value: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
    description?: string;
    readOnly?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}
