import React, { LegacyRef } from 'react';

import { cn } from '@slabs/ds-utils';

import { CircleProps, circleVariants } from './progress.variants';

const CircularProgress = React.forwardRef<
    LegacyRef<SVGSVGElement>,
    CircleProps
>(
    (
        {
            className,
            value,
            color,
            size,
            showValue,
            loading,
            customContent,
            isStripe,
            ...props
        },
        ref
    ) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const progress = circumference - (circumference * value) / 100;

        return (
            <div className='relative'>
                <svg
                    ref={ref as any}
                    className={cn(
                        circleVariants({ color, size }),

                        className,
                        {
                            'animate-spin': loading,
                        }
                    )}
                    {...props}
                    viewBox='0 0 100 100'
                >
                    <circle
                        path-color=''
                        className='text-secondary stroke-secondary'
                        strokeWidth='10'
                        cx='50'
                        cy='50'
                        r={radius}
                        fill='transparent'
                    ></circle>

                    <circle
                        bar-color=''
                        className='stroke-current'
                        strokeWidth='10'
                        strokeLinecap='round'
                        cx='50'
                        cy='50'
                        r={radius}
                        fill='transparent'
                        strokeDasharray={`${circumference}, ${circumference}`}
                        strokeDashoffset={progress}
                        style={{
                            transition: 'stroke-dashoffset 0.35s',
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                        }}
                    ></circle>
                    {showValue && !loading && (
                        <text
                            x='50'
                            y='50'
                            fontSize='16'
                            textAnchor='middle'
                            alignmentBaseline='middle'
                            text-color=''
                        >
                            {customContent || value + `%`}
                        </text>
                    )}
                </svg>
            </div>
        );
    }
);

export { CircularProgress };
