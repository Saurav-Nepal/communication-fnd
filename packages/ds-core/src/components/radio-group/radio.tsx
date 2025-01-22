import React from 'react';

import { cn } from '@slabs/ds-utils';

import {
    IconSizeVariant,
    labelVariants,
    radioBallVariants,
    RadioGroupVariants,
    RadioProps,
    textLabelVariants,
} from './radio-group.types';

export const RadioGroupItem = ({
    name,
    label,
    value,
    checked,
    defaultChecked,
    readOnly,
    disabled,
    type = 'outline',
    variant = 'default',
    size = 'sm',
    className,
    description,
    icon: Icon,
    error,
    onChange = (_?: any) => {},

    composition,
}: RadioProps) => {
    // CSS class for the radio element

    const idName = value?.toString();

    const classes = cn(
        'cursor-pointer',
        RadioGroupVariants({
            type: checked ? type : 'outline',
            variant,
            size,
            disabled,
        }),
        { 'pointer-events-none': readOnly },
        className
    );

    const labelVariant = cn(
        '',
        labelVariants({
            size,
            variant,
            checked,
        })
    );

    const radioBallClasses = cn('', radioBallVariants({ type, variant, size }));

    const IconSize = cn(
        '',
        IconSizeVariant({
            size,
        })
    );

    return (
        <label
            htmlFor={idName}
            className={
                composition
                    ? labelVariant
                    : 'flex flex-row gap-2 items-center text-md'
            }
        >
            <input
                type='radio'
                className={'hidden'}
                name={name}
                value={value}
                id={idName}
                checked={checked}
                defaultChecked={defaultChecked}
                readOnly={readOnly}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e);
                }}
            />
            <div className={classes}>
                {checked && (
                    <>
                        {Icon ? (
                            <Icon className={IconSize} />
                        ) : (
                            <div className={radioBallClasses}></div>
                        )}
                    </>
                )}
            </div>

            <div
                className={cn(
                    'flex flex-col gap-0.5',
                    textLabelVariants({ variant })
                )}
            >
                <span>{label}</span>
                {description && <span className='text-xs'>{description}</span>}
                {error && <span className='text-xs text-error'>{error}</span>}
            </div>
        </label>
    );
};
