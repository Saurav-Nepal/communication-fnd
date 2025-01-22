import React, { useMemo } from 'react';

import { cn } from '@slabs/ds-utils';

import {
    containerVariants,
    indicatorVariants,
    ProgressProps,
} from './progress.variants';

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            className,
            indicatorClassName,
            size = 'md',
            variant = 'primary',
            background = 'muted',
            radius = 'md',
            value,
            duration,
            animate,
            ...props
        },
        ref
    ) => {
        const containerClassName = containerVariants({
            background,
            className,
            size,
            radius,
        });

        const progressIndicatorClassName = indicatorVariants({
            variant,
        });

        const valueStyles = useMemo(() => {
            const sanitizedProgressValue = Math.min(Math.max(value, 0), 100);

            const styles: React.CSSProperties = {
                width: `${sanitizedProgressValue}%`,
            };

            if (animate)
                styles.backgroundImage =
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)';

            if (duration) styles.transitionDuration = `${duration}ms`;

            return styles;
        }, [duration, value, animate]);

        return (
            <div ref={ref} className={cn(containerClassName)} {...props}>
                <div
                    style={valueStyles}
                    className={cn(
                        {
                            'animate-stripe-slide bg-[length:1.25rem_1.25rem]':
                                animate,
                        },
                        progressIndicatorClassName,
                        indicatorClassName
                    )}
                    role='progressbar'
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                ></div>
            </div>
        );
    }
);

export { Progress };
