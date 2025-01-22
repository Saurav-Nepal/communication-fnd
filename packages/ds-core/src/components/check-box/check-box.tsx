import React, { forwardRef } from 'react';

import { cn } from '@slabs/ds-utils';

import { CheckboxIcon } from './check-box-icons';
import { CheckboxProps, checkboxVariants } from './check-box.types';

const CheckBox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            variant = 'info',
            type = 'outlined',
            size = 'md',
            radius = 'square',
            disabled,
            checked,
            onChange,
            defaultChecked,
            isIndeterminate,
            Icon,
            readOnly,
            label,
            description,
            error,
        },
        ref
    ) => {
        const labelVariant = cn(
            '',
            checkboxVariants({
                labelSize: size,
            })
        );

        return (
            <div className='flex flex-row gap-2'>
                <label className='inline-flex items-center cursor-pointer'>
                    <input
                        ref={ref}
                        type='checkbox'
                        className='sr-only peer'
                        checked={checked}
                        onChange={(e) => {
                            onChange?.(e.target.checked);
                        }}
                        defaultChecked={defaultChecked}
                    />
                    <div
                        className={cn(
                            checkboxVariants({
                                variant,
                                type: checked ? type : 'outlined',
                                size,
                                radius,
                                disabled,
                                readOnly,
                            }),
                            'flex items-center justify-center ',
                            className
                        )}
                    >
                        <CheckboxIcon
                            isChecked={checked}
                            isIndeterminate={isIndeterminate}
                            Icon={Icon}
                            style={{
                                width: size === 'lg' ? '24px' : '16px',
                                height: size === 'lg' ? '24px' : '16px',
                            }}
                        />
                    </div>
                </label>

                <div className='flex flex-col '>
                    {label && (
                        <label className={labelVariant} htmlFor='checkbox'>
                            {label}
                        </label>
                    )}
                    {description && (
                        <span className='text-xs text-secondary'>
                            {description}
                        </span>
                    )}
                    {error && (
                        <span className='text-xs text-error'>{error}</span>
                    )}
                </div>
            </div>
        );
    }
);

export { CheckBox };
