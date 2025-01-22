import { cva, VariantProps } from 'class-variance-authority';
import { SetNonNullable } from 'type-fest';

import { PopoverContentProps } from '@radix-ui/react-popover';
import { TooltipProps as RadixTooltipProps } from '@radix-ui/react-tooltip';

export const tooltipVariants = cva(
    'z-10 px-2 py-1 shadow animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground',
                error: 'bg-red-600 text-primary-foreground',
                warning: 'bg-yellow-600 text-primary-foreground',
                success: 'bg-green-600 text-primary-foreground',
                accent: 'bg-accent text-accent-foreground',
                info: 'bg-blue-600 text-primary-foreground',
            },
            radius: {
                none: '',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            radius: 'sm',
        },
    }
);
export const tooltipArrowVariants = cva('z-10', {
    variants: {
        variant: {
            default: 'fill-primary',
            error: 'fill-red-600 ',
            warning: 'fill-yellow-600',
            success: 'fill-green-600',
            accent: 'fill-accent',
            info: 'fill-blue-600',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TooltipProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'size'>,
        SetNonNullable<VariantProps<typeof tooltipVariants>>,
        RadixTooltipProps {
    message: React.ReactNode | string;
    arrow?: boolean;
    type?: PopoverContentProps['side'];
    position?: PopoverContentProps['align'];
    sideOffset?: PopoverContentProps['sideOffset'];
}
