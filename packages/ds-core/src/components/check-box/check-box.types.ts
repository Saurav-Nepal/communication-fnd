import { cva, VariantProps } from 'class-variance-authority';
import { SetNonNullable } from 'type-fest';

export const checkboxVariants = cva('cursor-pointer relative peer', {
    variants: {
        variant: {
            default:
                'bg-secondary-foreground border border-secondary-foreground text-secondary-foreground',
            error: 'bg-error border-error text-error',
            warning: 'bg-warning border-warning text-warning',
            success: 'bg-success border-success text-success',
            info: 'bg-info border-info text-info ',
        },
        type: {
            filled: 'border outline-none text-secondary',
            outlined: 'border bg-transparent ',
        },
        size: {
            sm: 'w-3 h-3',
            md: 'w-4 h-4',
            lg: 'w-5 h-5',
        },
        radius: {
            square: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full',
        },
        labelSize: {
            sm: 'text-xs',
            md: 'text-sm',
            lg: 'text-base',
        },
        disabled: {
            true: 'cursor-not-allowed opacity-50',
            false: '',
        },
        readOnly: {
            true: 'pointer-events-none',
            false: '',
        },
    },

    defaultVariants: {
        variant: 'default',
        type: 'outlined',
        size: 'md',
        labelSize: 'sm',
        radius: 'square',
        disabled: false,
        readOnly: false,
    },
});

export interface CheckboxProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'onChange' | 'size' | 'disabled' | 'type'
        >,
        SetNonNullable<VariantProps<typeof checkboxVariants>> {
    checked: boolean;
    className?: string;
    onChange: (checked: boolean) => void;
    defaultChecked?: boolean;
    isIndeterminate?: boolean;
    Icon?: React.ReactElement;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string;
    description?: string;
    error?: string;
}
