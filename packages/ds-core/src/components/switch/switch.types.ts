import { cva, VariantProps } from 'class-variance-authority';
import { SetNonNullable } from 'type-fest';

export const switchVariants = cva(
    [
        'relative bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full transition-all',
        "after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:after:border-white",
    ],
    {
        variants: {
            variant: {
                default: 'peer-checked:bg-primary',
                error: 'peer-checked:bg-red-600',
                warning: 'peer-checked:bg-yellow-600',
                success: 'peer-checked:bg-green-600',
                accent: 'peer-checked:bg-accent-600',
                info: 'peer-checked:bg-blue-600',
            },
            size: {
                sm: 'w-9 h-5 after:h-4 after:w-4',
                md: 'w-11 h-6 after:h-5 after:w-5',
                lg: 'w-14 h-7 after:h-6 after:w-6',
            },
            disabled: {
                true: 'cursor-not-allowed opacity-50',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            disabled: false,
        },
    }
);

export interface SwitchProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'onChange' | 'size'
        >,
        SetNonNullable<VariantProps<typeof switchVariants>> {
    checked: boolean;
    className?: string;
    onChange: (checked: boolean) => void;
    defaultChecked?: boolean;
}
