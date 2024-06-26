'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../../Utils/common.ui.utils';
import {
    backgroundColors,
    indicatorColors,
    ProgressProps,
    progressSizes,
} from './progress.types';

/**
 *
 * @author Saurav Nepal
 *
 * @description This is the progress component. that will show the progress information
 */
export const Progress = ({
    backgroundColor = 'accent',
    indicatorColor = 'primary',
    size = 'sm',
    value,
    animation,
    className,
    showValue,
    indicatorClassName,
}: ProgressProps) => (
    // Root container for the progress bar
    <ProgressPrimitive.Root
        className={cn(
            'relative w-full overflow-hidden rounded ',
            backgroundColors[backgroundColor], // Applying background color based on the provided prop
            progressSizes[size], // Applying size based on the provided prop,
            className
        )}
    >
        {showValue && (
            <div className='absolute left-0 right-0 z-10 text-xs font-medium text-white centralize'>
                {value}%
            </div>
        )}

        {/* Indicator for the progress value */}
        <ProgressPrimitive.Indicator
            className={cn(
                'flex-1 w-full h-full transition-all',
                indicatorColors[indicatorColor], // Applying indicator color based on the provided prop
                {
                    'animate-pulse': animation, // Applying the pulse animation if the animation prop is true
                },
                indicatorClassName
            )}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Adjusting the indicator's width based on the value prop
        />
    </ProgressPrimitive.Root>
);
