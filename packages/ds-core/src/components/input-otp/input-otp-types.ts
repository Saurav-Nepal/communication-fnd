import { cva, VariantProps } from 'class-variance-authority';
import { OTPInputProps } from 'input-otp';

export const InputSlotVariants = cva(
    'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
    {
        variants: {
            color: {
                default: '',
                primary: 'ring-1 ring-primary',
                secondary: 'ring-1 ring-secondary',
                accent: 'ring-1 ring-accent',
                info: 'ring-1 ring-info',
                success: 'ring-1 ring-success',
                warning: 'ring-1 ring-warning',
                error: 'ring-1 ring-error',
            },
            size: {
                default: '',
                sm: 'h-6 w-6 text-sm',
                md: 'h-9 w-9 text-md',
                lg: 'h-12 w-12 text-lg',
            },
            hasError: {
                true: 'ring-1 ring-error',
            },
        },

        defaultVariants: {
            color: 'primary',
            size: 'md',
        },
    }
);

export interface InputSlotProps
    extends Omit<React.ComponentPropsWithoutRef<'div'>, 'size' | 'color'>,
        VariantProps<typeof InputSlotVariants> {
    index: number;
}
export interface CommonOTPInputProps
    extends Omit<OTPInputProps, 'maxLength' | 'pattern' | 'color' | 'size'> {
    length?: number;
    onOTPChange?: (otp: string) => void;
    regex?: string;
    shouldSeparate?: boolean;
    separatorPosition?: 'between' | 'center';
    color?: InputSlotProps['color'];
    size?: InputSlotProps['size'];
    hasError?: InputSlotProps['hasError'];
}
