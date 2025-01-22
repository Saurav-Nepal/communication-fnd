'use client';

import * as React from 'react';

import { cn } from '@slabs/ds-utils';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { SliderInterface, sliderVariants } from './slider.types';

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderInterface
>(({ className, color, size, radius, ...props }, ref) => {
    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(sliderVariants({ color, size, radius }), className)}
            {...props}
        >
            <SliderPrimitive.Track
                data-slider-track
                className='relative w-full overflow-hidden grow bg-card'
            >
                <SliderPrimitive.Range
                    data-slider-range
                    className='absolute h-full'
                />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                data-slider-thumb
                className='block transition-colors rounded-full shadow cursor-pointer border-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
            />
        </SliderPrimitive.Root>
    );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
