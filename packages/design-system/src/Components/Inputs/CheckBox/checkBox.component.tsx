/**
 * @author Sirjan Tamang
 */
'use client';

import { forwardRef, useCallback, useEffect, useState } from 'react';

import { cn, IsFunction, IsUndefined } from '../../../Utils/common.ui.utils';
import { Typography } from '../../Data-display/Typography/typography.component';
import { CheckBoxInterface, checkBoxVariants } from './checkBox.types';

/**
 * Represents a CheckBox component.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.leftLabel - The label displayed to the left of the checkbox.
 * @param {boolean} props.checked - The current checked state of the checkbox.
 * @param {boolean} props.defaultChecked - The default checked state of the checkbox.
 * @param {Function} props.onChange - The callback function called when the checkbox is changed.
 * @param {boolean} props.disabled - Specifies if the checkbox is disabled.
 * @param {string} props.size - The size of the checkbox. Can be 'sm', 'md', or 'lg'.
 * @param {string} props.rightLabel - The label displayed to the right of the checkbox.
 * @param {string} props.appearance - The appearance style of the checkbox. Can be 'primary', 'secondary', etc.
 *
 * @returns {JSX.Element} The rendered CheckBox component.
 */
export const CheckBox = forwardRef(
    (
        {
            leftLabel,
            checked: checkedProps,
            labelClassName,
            defaultChecked,
            onChange,
            disabled,
            size,
            rightLabel,
            appearance,
            subLabel,
            className,
            ...rest
        }: CheckBoxInterface,
        ref
    ) => {
        const [checked, setChecked] = useState<boolean>(
            defaultChecked || false
        );

        const classes = cn(
            checkBoxVariants({
                size,
                appearance,
            })
        );

        useEffect(() => {
            if (IsUndefined(checkedProps)) return;
            setChecked(checkedProps);
        }, [checkedProps]);

        const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
            const isChecked = e.target.checked;
            IsFunction(onChange) && onChange(isChecked);
            setChecked(isChecked);
        };
        const renderLabel = useCallback(
            (label) => {
                if (!label) return <></>;
                if (!subLabel)
                    return (
                        <Typography className='label-text '>{label}</Typography>
                    );
                return (
                    <Typography className='label-text'>
                        <div className='col-flex'>
                            <div className=''>{label}</div>
                            <div className='text-xs text-base-tertiary'>
                                {subLabel}
                            </div>
                        </div>
                    </Typography>
                );
            },
            [subLabel]
        );
        return (
            <div className={cn('form-control', className)}>
                <label
                    className={cn(
                        'gap-2 cursor-pointer m-static row-flex justify-start',
                        {
                            label: leftLabel || rightLabel, // if there is label then only it will take label class
                        },
                        labelClassName
                    )}
                >
                    {renderLabel(leftLabel)}

                    <input
                        type='checkbox'
                        checked={checked}
                        className={classes}
                        onChange={handleChecked}
                        {...{
                            disabled,
                        }}
                        {...rest}
                    />
                    {renderLabel(rightLabel)}
                </label>
                {rest?.error && (
                    <div className='pl-2 text-xs text-error'>{rest?.error}</div>
                )}
            </div>
        );
    }
);
