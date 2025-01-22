import { cva, VariantProps } from 'class-variance-authority';

import * as SliderPrimitive from '@radix-ui/react-slider';

export const sliderVariants = cva(
    'relative flex w-full touch-none select-none items-center',
    {
        variants: {
            color: {
                default:
                    '[&_[data-slider-thumb]]:bg-secondary-foreground [&_[data-slider-range]]:bg-secondary-foreground',
                primary:
                    '[&_[data-slider-thumb]]:bg-primary [&_[data-slider-range]]:bg-primary',
                secondary:
                    '[&_[data-slider-thumb]]:bg-secondary [&_[data-slider-range]]:bg-secondary',
                success:
                    '[&_[data-slider-thumb]]:bg-success [&_[data-slider-range]]:bg-success',
                error: '[&_[data-slider-thumb]]:bg-error [&_[data-slider-range]]:bg-error',
                warning:
                    '[&_[data-slider-thumb]]:bg-warning [&_[data-slider-range]]:bg-warning',
                info: '[&_[data-slider-thumb]]:bg-info [&_[data-slider-range]]:bg-info',
            },
            size: {
                sm: '[&_[data-slider-track]]:h-1.5 [&_[data-slider-thumb]]:h-3 [&_[data-slider-thumb]]:w-3',
                md: '[&_[data-slider-track]]:h-2.5 [&_[data-slider-thumb]]:h-4 [&_[data-slider-thumb]]:w-4',
                lg: '[&_[data-slider-track]]:h-3.5 [&_[data-slider-thumb]]:h-5 [&_[data-slider-thumb]]:w-5',
            },
            radius: {
                sm: '[&_[data-slider-track]]:rounded-sm [&_[data-slider-thumb]]:rounded-sm',
                md: '[&_[data-slider-track]]:rounded-md [&_[data-slider-thumb]]:rounded-md',
                lg: '[&_[data-slider-track]]:rounded-lg [&_[data-slider-thumb]]:rounded-lg',
                xl: '[&_[data-slider-track]]:rounded-xl [&_[data-slider-thumb]]:rounded-xl',
                none: '[&_[data-slider-track]]:rounded-none [&_[data-slider-thumb]]:rounded-none',
            },
        },
        defaultVariants: {
            color: 'error',
            size: 'lg',
            radius: 'sm',
        },
    }
);

export interface SliderInterface
    extends Omit<
            React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
            'size' | 'color'
        >,
        VariantProps<typeof sliderVariants> {}
