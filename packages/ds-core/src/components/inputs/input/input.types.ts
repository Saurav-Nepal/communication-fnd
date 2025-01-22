/**
 * Input Flied Types and Interface
 */
import { InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
    'w-full bg-card px-3 h-9 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium aria-disabled:cursor-not-allowed aria-disabled:opacity-50 transition duration-300 ',
    {
        variants: {
            color: {
                default:
                    'ring-input border-input text-secondary-foreground focus:outline-none focus-within:border-primary aria-disabled:bg-input/30 aria-disabled:placeholder:text-input  placeholder:text-secondary-foreground/70 ',
                primary:
                    'border-primary/50 text-primary focus:outline-none focus-within:border-primary aria-disabled:bg-primary/30 aria-disabled:placeholder:text-primary  placeholder:text-primary/70  ',
                info: 'border-info/50 text-info focus:outline-none focus-within:border-info aria-disabled:bg-info/30 aria-disabled:placeholder:text-info  placeholder:text-info/70 ',
                warning:
                    'border-warning/50 text-warning focus-within:border-warning focus:outline-none aria-disabled:bg-warning/30 aria-disabled:placeholder:text-info  placeholder:text-warning/70 ',
                success:
                    'border-success/50 text-success focus-within:border-success focus:outline-none aria-disabled:bg-success/30 aria-disabled:placeholder:text-info  placeholder:text-success/70 ',
                error: 'border-error/50 focus-within:border-error text-error focus:outline-none aria-disabled:bg-error/30 aria-disabled:placeholder:text-error  placeholder:text-error/70',
            },
            variant: {
                flat: 'bg-secondary/30 read-only:bg-secondary/30',
                underline: 'border-b',
                bordered: 'border',
                faded: 'border',
                ghost: 'border border-transparent bg-transparent',
                'flat-underline': 'bg-secondary/50 border-b',
            },
            shadow: {
                none: '',
                sm: 'shadow-sm',
                md: 'shadow-md',
                lg: 'shadow-lg',
                xl: 'shadow-xl',
                '2xl': 'shadow-2xl',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded',
                md: 'rounded-lg',
                lg: 'rounded-xl',
                xl: 'rounded-[20px]',
            },
            size: {
                sm: 'h-8 text-xs leading-8',
                md: 'h-9 text-sm leading-9',
                lg: 'h-10 text-sm leading-10',
                xl: 'h-12 text-base leading-[48px]',
            },
            hasError: {
                true: 'border-error/30 text-error focus-within:border-error aria-disabled:bg-error/30 aria-disabled:placeholder:text-error placeholder:text-error/70 hover:text-error/70',
            },
        },
        compoundVariants: [
            {
                variant: 'flat',
                color: 'primary',
                className: 'bg-primary/10 read-only:bg-primary/10',
            },
            {
                variant: 'flat',
                color: 'info',
                className: 'bg-info/10 read-only:bg-info/10',
            },
            {
                variant: 'flat',
                color: 'warning',
                className: 'bg-warning/10 read-only:bg-warning/10',
            },
            {
                variant: 'flat',
                color: 'success',
                className: 'bg-success/10 read-only:bg-success/10',
            },
            {
                variant: 'flat',
                color: 'default',
                className: '',
            },
            {
                variant: 'flat',
                color: 'error',
                className: 'bg-error/10 read-only:bg-error/10',
            },
            {
                variant: 'faded',
                color: 'primary',
                className:
                    'bg-primary/10 read-only:bg-primary/10 border-primary/30 text-primary/80',
            },
            {
                variant: 'faded',
                color: 'info',
                className: 'bg-info/10 border-info/30 text-info/80',
            },
            {
                variant: 'faded',
                color: 'warning',
                className: 'bg-warning/10 border-warning/30 text-warning/80',
            },
            {
                variant: 'faded',
                color: 'success',
                className: 'bg-success/10 border-success/30 text-success/80',
            },
            {
                variant: 'faded',
                color: 'error',
                className: 'bg-error/10 border-error/30 text-error/80',
            },

            {
                variant: 'flat-underline',
                color: 'error',
                className: 'bg-error/10 border-b border-error/50',
            },
            {
                variant: 'flat-underline',
                color: 'success',
                className: 'bg-success/10 border-b border-success/50',
            },
            {
                variant: 'flat-underline',
                color: 'info',
                className: 'bg-info/10 border-b border-info/50',
            },
            {
                variant: 'flat-underline',
                color: 'warning',
                className: 'bg-warning/10 border-b border-warning/50',
            },
            {
                variant: 'flat-underline',
                color: 'primary',
                className: 'bg-primary/10 border-b border-primary/50',
            },

            {
                hasError: true,
                variant: 'faded',
                className: 'bg-error/10 text-error',
            },
            {
                hasError: true,
                variant: 'flat',
                className: 'bg-error/10 text-error',
            },
            {
                hasError: true,
                variant: 'flat-underline',
                className: 'bg-error/10 border-b border-error/50',
            },
        ],

        defaultVariants: {
            color: 'default',
            size: 'md',
            variant: 'bordered',
            radius: 'sm',
        },
    }
);
export interface InputProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            | 'onChange'
            | 'autoComplete'
            | 'prefix'
            | 'size'
            | 'max'
            | 'min'
            | 'value'
            | 'disabled'
            | 'error'
            | 'placeholder'
            | 'color'
        >,
        VariantProps<typeof inputVariants> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max?: number;
    value?: string;
    placeholder?: string;
    className?: string;
    readonly?: boolean;
    required?: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    removeWrapper?: boolean;
    disabled?: boolean;
}
