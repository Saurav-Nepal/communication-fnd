import React from 'react';

import { cn } from '@slabs/ds-utils';

import { RadioGroupItem } from './radio';
import { RadioGroupProps } from './radio-group.types';

export const RadioGroup = ({
    name,
    value,
    defaultValue,
    direction = 'horizontal',
    options = [],
    variant = 'default',
    size = 'md',
    readOnly,
    disabled,
    onChange = (_?: string | number | boolean) => {},
    label,
    required,
    error,
    type = 'outline',
    containerClassName,
    composition,
    icon,
    children,
}: RadioGroupProps) => {
    // CSS class for the container element
    const containerClass = cn(
        'form-control gap-4 ',
        {
            'flex flex-row': direction === 'horizontal',
            'flex flex-col': direction === 'vertical',
        },
        containerClassName
    );

    return (
        <div className='flex-col form-control'>
            {label && (
                <span className='text-sm font-semibold'>
                    {label}
                    {required && <span className='text-error'>*</span>}
                </span>
            )}
            <div className={containerClass}>
                {children ??
                    options.map((option, idx) => (
                        <RadioGroupItem
                            key={idx + '' + option.value}
                            name={name}
                            label={option.label}
                            value={option.value}
                            checked={value === option.value}
                            defaultChecked={defaultValue === option.value}
                            type={type}
                            variant={variant}
                            description={option?.description}
                            size={size}
                            readOnly={readOnly}
                            disabled={disabled}
                            composition={composition}
                            error={option?.error}
                            icon={icon}
                            onChange={(e) => {
                                if (e.target.checked && !readOnly) {
                                    onChange(option.value);
                                }
                            }}
                        />
                    ))}
            </div>
            {error && (
                <span className={cn('py-1 text-error text-xs')}>{error}</span>
            )}
        </div>
    );
};
