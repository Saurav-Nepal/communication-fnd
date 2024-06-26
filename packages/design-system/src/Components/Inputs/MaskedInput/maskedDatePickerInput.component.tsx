'use client';

import { format, isValid } from 'date-fns';
import { forwardRef, useCallback } from 'react';

import {
    DEFAULT_DATE_FORMAT,
    EmptyFunction,
    GetDateValue,
    isDateEqual,
} from '@finnoto/core';

import { Icon } from '../../Data-display/Icon/icon.component';
import { Button } from '../Button/button.component';
import { DatePicker } from '../DatePicker';
import { MaskedInput } from './maskedInput.component';
import { MaskedDatePickerInputProps } from './maskInput.types';

import { CalendarSvgIcon } from 'assets';

export const MaskedDatePickerInput = forwardRef(
    (
        {
            value,
            disabled = false,
            inputClassName = '',
            groupClassName = '',
            label,
            inputValue,
            placeholder,
            error,
            bordered = false,
            isRequired,
            translate = true,
            calender_icon = true,
            size,
            dateFormat = DEFAULT_DATE_FORMAT,
            onChange = EmptyFunction,
            onBlur,
            hideClear,
            warning,
            message,
            ...props
        }: MaskedDatePickerInputProps,
        ref: any
    ) => {
        const renderClearBtn = useCallback(() => {
            if (hideClear) return null;
            return (
                !isRequired &&
                !!value && (
                    <Button
                        onClick={() => onChange(null)}
                        appearance='error'
                        size='xs'
                        outline
                    >
                        Clear
                    </Button>
                )
            );
        }, [hideClear, isRequired, onChange, value]);
        return (
            <DatePicker
                offsetY={20}
                value={value}
                {...props}
                onChange={onChange}
                disabled={disabled}
            >
                <MaskedInput
                    className={props?.className}
                    mask={dateFormat}
                    name={props?.name || 'date'}
                    label={label}
                    inputAddOnClassName={props?.inputAddOnClassName}
                    addonStart={
                        <Icon
                            isSvg
                            className='cursor-pointer'
                            source={CalendarSvgIcon}
                            size={20}
                        />
                    }
                    value={
                        isValid(GetDateValue(value, dateFormat))
                            ? format(
                                  GetDateValue(value, dateFormat),
                                  dateFormat
                              )
                            : ''
                    }
                    disabled={disabled}
                    inputClassName={`${inputClassName} cursor-pointer`}
                    groupClassName={groupClassName}
                    placeholder={placeholder}
                    error={error}
                    required={isRequired}
                    size={size}
                    onBlur={onBlur}
                    onChange={(newValue) => {
                        if (
                            value &&
                            isDateEqual(
                                GetDateValue(value, dateFormat),
                                GetDateValue(newValue, dateFormat)
                            )
                        )
                            return;

                        onChange(
                            newValue
                                ? GetDateValue(newValue, dateFormat)
                                : newValue
                        );
                    }}
                    ref={ref}
                    addonEnd={renderClearBtn()}
                    warning={warning}
                    message={message}
                />
            </DatePicker>
        );
    }
);
