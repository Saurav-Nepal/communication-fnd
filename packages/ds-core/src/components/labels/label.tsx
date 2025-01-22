import React from 'react';

import { cn } from '@slabs/ds-utils';

import { LabelInterface } from './label.types';

const Label = ({
    label,
    error,
    name,
    required,
    className,
    rightComponent,
    id,
}: LabelInterface) => {
    if (!label) return <></>;
    return (
        <label
            className={cn(
                'text-sm gap-2 whitespace-nowrap text-secondary-foreground',
                {
                    'text-error': error,
                },
                className
            )}
            htmlFor={id || name}
        >
            <span>
                {label} {required && <span className='text-error'>*</span>}
            </span>
            {rightComponent}
        </label>
    );
};

export { Label };
