import React, { forwardRef } from 'react';

import { cn } from '@slabs/ds-utils';

import { SwitchProps, switchVariants } from './switch.types';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            className,
            variant,
            size,
            checked,
            defaultChecked,
            disabled,
            readOnly,
            onChange,
            ...props
        },
        ref
    ) => {
        return (
            <label
                className={cn('inline-flex items-center cursor-pointer', {
                    'pointer-events-none': readOnly,
                })}
            >
                <input
                    type='checkbox'
                    className='sr-only peer'
                    onChange={(e) => onChange?.(e.target.checked)}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    ref={ref}
                    {...props}
                />
                <div
                    className={cn(
                        'bg-amber-400',
                        switchVariants({
                            variant,
                            size,
                            disabled,
                        }),
                        className
                    )}
                ></div>
            </label>
        );
    }
);

export { Switch };
