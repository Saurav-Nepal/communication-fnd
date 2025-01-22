import { cva, VariantProps } from 'class-variance-authority';

export const textareaVariants = cva(
    'flex flex-1 border-input w-full min-h-[80px]  px-3 py-[10px] text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium   disabled:cursor-not-allowed disabled:opacity-50  transition duration-300 ',
    {
        variants: {
            color: {
                default:
                    ' focus:outline-none focus:border-primary disabled:bg-default-200  placeholder:text-accent-foreground/50',
                primary:
                    'border-primary text-primary focus:outline-none focus:border-primary-700 disabled:bg-primary/30 disabled:placeholder:text-primary  placeholder:text-primary/70',
                info: 'border-info/50 text-info focus:outline-none focus:border-info-700 disabled:bg-info/30 disabled:placeholder:text-info  placeholder:text-info/70',
                warning:
                    'border-warning/50 text-warning focus:outline-none focus:border-warning-700 disabled:bg-warning/30 disabled:placeholder:text-info  placeholder:text-warning/70',
                success:
                    'border-success/50 text-success focus:outline-none focus:border-success-700 disabled:bg-success/30 disabled:placeholder:text-info  placeholder:text-success/70',
                error: 'border-error/50 text-error focus:outline-none focus:border-error-700 disabled:bg-error/30 disabled:placeholder:text-error  placeholder:text-error/70',
            },
            variant: {
                flat: 'bg-default-100 read-only:bg-default-100',
                underline: 'border-b',
                bordered: 'border',
                faded: 'border border-default-300 bg-default-100',
                ghost: 'border-0 focus:border',
                'flat-underline': 'bg-default-100 border-b',
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
                md: 'rounded-md',
                lg: 'rounded-xl',
                xl: 'rounded-[20px]',
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
                color: 'error',
                className: 'bg-error/10 read-only:bg-error/10',
            },
            {
                variant: 'faded',
                color: 'primary',
                className:
                    'bg-primary/10 border-primary/30 read-only:bg-primary/10 ',
            },
            {
                variant: 'faded',
                color: 'info',
                className: 'bg-info/10 border-info/30',
            },
            {
                variant: 'faded',
                color: 'warning',
                className: 'bg-warning/10 border-warning/30',
            },
            {
                variant: 'faded',
                color: 'success',
                className: 'bg-success/10 border-success/30',
            },
            {
                variant: 'faded',
                color: 'error',
                className: 'bg-error/10 border-error/30',
            },
        ],

        defaultVariants: {
            color: 'default',
            variant: 'bordered',
            radius: 'md',
        },
    }
);

export interface TextAreaProps
    extends Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            'color' | 'size'
        >,
        VariantProps<typeof textareaVariants> {}
